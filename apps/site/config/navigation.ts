import type { NavigationItem } from "@edem/ui";
import { siteHref } from "./site-href";

/** Only working, public routes. Future detail pages are intentionally absent. */
const home: NavigationItem = { label: "Главная", href: siteHref("/") };
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
  games,
  world,
  order,
  about,
  collaboration,
  account,
];

/** Primary desktop navigation from the Figma UX map. */
export const desktopSiteNavigation: readonly NavigationItem[] = [
  games,
  world,
  about,
];

/** Fixed mobile destinations for Navigation C. */
export const mobileSiteNavigation: readonly NavigationItem[] = [
  { label: "Мир", href: world.href, icon: "globe" },
  { label: "Игры", href: games.href, icon: "book" },
];
