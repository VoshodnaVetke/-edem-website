import type { NavigationItem } from "@edem/ui";
import { siteHref } from "./site-href";

/** Only working, public routes. Future detail pages are intentionally absent. */
const home: NavigationItem = { label: "Главная", href: siteHref("/") };
const events: NavigationItem = { label: "Афиша", href: siteHref("/events") };
const games: NavigationItem = { label: "Наши игры", href: siteHref("/games") };
const world: NavigationItem = { label: "Вселенная", href: siteHref("/world") };
const account: NavigationItem = {
  label: "Личный кабинет",
  href: siteHref("/account"),
};
const order: NavigationItem = {
  label: "Заказать игру",
  href: siteHref("/order"),
};
const about: NavigationItem = {
  label: "О мастерской группе",
  href: siteHref("/about"),
};
const collaboration: NavigationItem = {
  label: "Сотрудничество",
  href: siteHref("/collaboration"),
};

/** Menu and footer use the same canonical list of live public routes. */
export const siteNavigation: readonly NavigationItem[] = [
  home,
  events,
  games,
  world,
  order,
  about,
  collaboration,
  account,
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
  { label: "Игры", href: games.href, icon: "book" },
];
