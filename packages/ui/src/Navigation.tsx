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
}
export interface SearchResult extends NavigationItem {
  description?: string;
}
export interface NavigationProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  brand: ReactNode;
  brandHref?: string;
  items: readonly NavigationItem[];
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
/** Navigation C: the visual pattern is preliminary; all routes and search data are supplied by the host. */
export function Navigation({
  brand,
  brandHref = "/",
  items,
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
  const links = (entries: readonly NavigationItem[]) =>
    entries.map((item) => (
      <a
        key={item.href}
        href={item.href}
        aria-current={item.href === currentHref ? "page" : undefined}
        onClick={close}
      >
        {item.label}
      </a>
    ));
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
          {links(items)}
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
          {links(bottomItems)}
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
