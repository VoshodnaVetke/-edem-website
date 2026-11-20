import { siteHref } from "./site-href";

export const worldArticleGroups = [
  {
    slug: "power",
    title: "Государство и власть",
    articles: [
      { path: "/world/government", title: "Государственное устройство Эдема" },
    ],
  },
  {
    slug: "daily-life",
    title: "Социальный рейтинг и повседневная жизнь",
    articles: [
      { path: "/world/neurochip", title: "Социальный рейтинг и нейрочип" },
    ],
  },
  { slug: "geography", title: "Города и территории", articles: [] },
  { slug: "corporations", title: "Корпорации и технологии", articles: [] },
  { slug: "stories", title: "Конфликты и противостояния", articles: [] },
] as const;

export type WorldArticleTopic = (typeof worldArticleGroups)[number]["slug"];

export function worldArticlesHref(topic: WorldArticleTopic): string {
  return siteHref(`/world/topics/${topic}`);
}
