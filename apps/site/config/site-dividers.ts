import { games } from "./past-games";

const variants = ["circuit", "channel", "scan"] as const;
const leadingSections = ["/", "/world", "/events"];

export function siteDividers(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  const sectionIndex = leadingSections.indexOf(path);
  const gameIndex = games.findIndex(({ slug }) => path === `/games/${slug}`);
  const index = sectionIndex >= 0 ? sectionIndex : gameIndex;
  if (index < 0) return {};

  return {
    content: variants[index % variants.length],
    footer: variants[(index + 1) % variants.length],
  };
}
