import type { NavigationItem, SearchResult } from "@edem/ui";

/** Only implemented public routes. Add new destinations after the page exists. */
export const sitePages: readonly SearchResult[] = [
  {
    label: "Главная",
    href: "/",
    description: "Стартовая страница мастерской группы",
  },
  {
    label: "Оболочка сайта",
    href: "/demo/shell",
    description: "Демонстрация шапки, навигации и подвала",
  },
];

export const primaryNavigation: readonly NavigationItem[] = sitePages;
export const mobileNavigation: readonly NavigationItem[] = sitePages;

/** Real search among implemented pages, not a mock search of unpublished lore. */
export function searchAvailablePages(
  query: string,
  signal: AbortSignal,
): readonly SearchResult[] {
  if (signal.aborted) return [];
  const normalized = query.trim().toLocaleLowerCase("ru");
  if (!normalized) return [];
  return sitePages.filter((item) =>
    [item.label, item.description ?? ""].some((text) =>
      text.toLocaleLowerCase("ru").includes(normalized),
    ),
  );
}
