import type { NavigationItem } from "@edem/ui";

/** Only working, public routes. Future detail pages are intentionally absent. */
const home: NavigationItem = { label: "Главная", href: "/" };
const events: NavigationItem = { label: "Афиша", href: "/events" };
const games: NavigationItem = { label: "Наши игры", href: "/games" };
const world: NavigationItem = { label: "Вселенная", href: "/world" };
const wiki: NavigationItem = { label: "Энциклопедия", href: "/wiki" };
const order: NavigationItem = { label: "Заказать игру", href: "/order" };
const about: NavigationItem = { label: "О мастерской группе", href: "/about" };
const collaboration: NavigationItem = {
  label: "Сотрудничество",
  href: "/collaboration",
};

/** Menu and footer use the same canonical list of live public routes. */
export const siteNavigation: readonly NavigationItem[] = [
  home,
  events,
  games,
  world,
  wiki,
  order,
  about,
  collaboration,
];

/** Primary desktop navigation from the Figma UX map. */
export const desktopSiteNavigation: readonly NavigationItem[] = [
  events,
  games,
  world,
  about,
];

/** Approved Navigation C v1.2: three fixed mobile destinations. */
export const mobileSiteNavigation: readonly NavigationItem[] = [
  { label: "Афиша", href: events.href, icon: "calendar" },
  { label: "Мир", href: world.href, icon: "globe" },
  { label: "Энциклопедия", href: wiki.href, icon: "book" },
];
