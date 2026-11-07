import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type HTMLAttributes,
  type RefObject,
} from "react";
import { Button, ButtonLink } from "./Button";
import { TextField } from "./TextField";
import { SketchPlate } from "./Sketch";
import { cx } from "./utils";
export interface NavigationItem {
  label: string;
  href: string;
  /** Optional icon for the fixed mobile destinations. */
  icon?: "calendar" | "globe" | "book";
}
export interface SearchResult extends NavigationItem {
  description?: string;
}
export interface NavigationProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  brand: ReactNode;
  brandHref?: string;
  items: readonly NavigationItem[];
  desktopItems?: readonly NavigationItem[];
  bottomItems?: readonly NavigationItem[];
  currentHref?: string;
  account?: NavigationItem;
  onSearch?: (
    query: string,
    signal: AbortSignal,
  ) => Promise<readonly SearchResult[]> | readonly SearchResult[];
}
function useDialog(
  open: boolean,
  dialog: RefObject<HTMLDialogElement | null>,
  returnFocus: RefObject<HTMLButtonElement | null>,
) {
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    if (!open && element.open) {
      element.close();
      returnFocus.current?.focus();
    }
  }, [open, dialog, returnFocus]);
}
function NavigationDialog({
  dialogRef,
  id,
  label,
  close,
  afterClose,
  children,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
  id: string;
  label: string;
  close: () => void;
  afterClose: () => void;
  children: ReactNode;
}) {
  return (
    <dialog
      ref={dialogRef}
      id={id}
      className="edem-dialog"
      aria-label={label}
      onCancel={close}
      onClose={afterClose}
      onKeyDownCapture={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          close();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <SketchPlate />
      <div className="edem-dialog__body">
        <div className="edem-dialog__head">
          <h2 className="edem-type-h3">{label}</h2>
          <Button onClick={close}>Закрыть</Button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
function BottomIcon({ icon }: { icon: NonNullable<NavigationItem["icon"]> }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className="edem-navigation__bottom-icon"
      {...common}
    >
      {icon === "calendar" && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="1.5" />
          <path d="M7 3v4M17 3v4M3 10h18M8 14h3M8 17h7" />
        </>
      )}
      {icon === "globe" && (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5c-4 4-4 15 0 19M12 2.5c4 4 4 15 0 19" />
        </>
      )}
      {icon === "book" && (
        <>
          <path d="M12 6c-2.8-1.6-5.9-1.8-9-1v13c3.2-.8 6.4-.6 9 1 2.6-1.6 5.8-1.8 9-1V5c-3.1-.8-6.2-.6-9 1Z" />
          <path d="M12 6v13" />
        </>
      )}
    </svg>
  );
}

/** Navigation C: approved visual pattern; all routes and search data are supplied by the host. */
export function Navigation({
  brand,
  brandHref = "/",
  items,
  desktopItems,
  bottomItems = [],
  currentHref,
  account,
  onSearch,
  className,
  ...props
}: NavigationProps) {
  const menuId = useId(),
    searchId = useId();
  const [open, setOpen] = useState<"menu" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<readonly SearchResult[]>([]);
  const [searchState, setSearchState] = useState<
    "idle" | "loading" | "done" | "error"
  >("idle");
  const menu = useRef<HTMLDialogElement>(null),
    search = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null),
    searchButton = useRef<HTMLButtonElement>(null);
  useDialog(open === "menu", menu, menuButton);
  useDialog(open === "search", search, searchButton);
  useEffect(() => {
    if (open !== "search" || !onSearch || !query.trim()) {
      setResults([]);
      setSearchState("idle");
      return;
    }
    const abort = new AbortController();
    setSearchState("loading");
    const timer = setTimeout(() => {
      Promise.resolve()
        .then(() => onSearch(query.trim(), abort.signal))
        .then((value) => {
          if (!abort.signal.aborted) {
            setResults(value);
            setSearchState("done");
          }
        })
        .catch(() => {
          if (!abort.signal.aborted) {
            setResults([]);
            setSearchState("error");
          }
        });
    }, 180);
    return () => {
      clearTimeout(timer);
      abort.abort();
    };
  }, [query, open, onSearch]);
  const close = () => setOpen(null);
  const links = (entries: readonly NavigationItem[], mobile = false) =>
    entries.map((item) => {
      const active =
        item.href === currentHref ||
        (item.href !== "/" && currentHref?.startsWith(`${item.href}/`));
      return (
        <a
          key={item.href}
          href={item.href}
          aria-current={active ? "page" : undefined}
          onClick={close}
        >
          {mobile && item.icon && <BottomIcon icon={item.icon} />}
          <span>{item.label}</span>
        </a>
      );
    });
  return (
    <header {...props} className={cx("edem-navigation", className)}>
      <div className="edem-navigation__bar">
        <a className="edem-navigation__brand" href={brandHref}>
          {brand}
        </a>
        <nav
          className="edem-navigation__desktop"
          aria-label="Основная навигация"
        >
          {links(desktopItems ?? items)}
        </nav>
        <div className="edem-navigation__actions">
          <Button
            ref={menuButton}
            aria-controls={menuId}
            aria-expanded={open === "menu"}
            aria-haspopup="dialog"
            onClick={() => setOpen("menu")}
          >
            Меню
          </Button>
          {onSearch && (
            <Button
              ref={searchButton}
              aria-controls={searchId}
              aria-expanded={open === "search"}
              aria-haspopup="dialog"
              onClick={() => {
                setQuery("");
                setOpen("search");
              }}
            >
              Поиск
            </Button>
          )}
          {account && (
            <ButtonLink href={account.href}>{account.label}</ButtonLink>
          )}
        </div>
      </div>
      {bottomItems.length > 0 && (
        <nav className="edem-navigation__bottom" aria-label="Быстрая навигация">
          {links(bottomItems, true)}
        </nav>
      )}
      <NavigationDialog
        dialogRef={menu}
        id={menuId}
        label="Меню"
        close={close}
        afterClose={() => setOpen((v) => (v === "menu" ? null : v))}
      >
        <nav className="edem-navigation__menu" aria-label="Все разделы">
          {links(items)}
        </nav>
      </NavigationDialog>
      {onSearch && (
        <NavigationDialog
          dialogRef={search}
          id={searchId}
          label="Поиск"
          close={close}
          afterClose={() => setOpen((v) => (v === "search" ? null : v))}
        >
          <TextField
            label="Поисковый запрос"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            type="search"
          />
          <p role="status" className="edem-type-system">
            {searchState === "loading"
              ? "Поиск…"
              : searchState === "done" && results.length === 0
                ? "Ничего не найдено"
                : searchState === "error"
                  ? "Не удалось выполнить поиск"
                  : ""}
          </p>
          <ul className="edem-navigation__results">
            {results.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  {item.label}
                </a>
                {item.description && <p>{item.description}</p>}
              </li>
            ))}
          </ul>
        </NavigationDialog>
      )}
    </header>
  );
}
