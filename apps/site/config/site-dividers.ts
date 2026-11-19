import { games } from "./past-games";

const variants = ["circuit", "channel", "scan"] as const;
const leadingSections = ["/", "/world"];

export function siteFooterDivider(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  const sectionIndex = leadingSections.indexOf(path);
  const gameIndex = games.findIndex(({ slug }) => path === `/games/${slug}`);
  const index = sectionIndex >= 0 ? sectionIndex : gameIndex;
  return index < 0 ? undefined : variants[(index + 1) % variants.length];
}
