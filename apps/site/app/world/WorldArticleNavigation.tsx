"use client";

import { ButtonLink } from "@edem/ui";
import { SiteTriangle } from "../../components/layout/SiteTriangle";
import {
  worldArticleHref,
  worldArticleRegistry,
  worldArticlesHref,
  worldTopicArticles,
  type WorldArticleSlug,
} from "../../config/world-articles";
import { articleListParam, useArticleListHref } from "./article-list-state";
import styles from "./article-navigation.module.css";
import { WorldBackLink } from "./WorldBackLink";

const shortTitles: Partial<Record<WorldArticleSlug, string>> = {
  government: "Устройство Эдема",
  neurochip: "Рейтинг и нейрочип",
  justice: "Правосудие",
  "rehabilitation-institutions": "Учреждения УВБ",
  "science-and-technology": "Наука и технологии",
  "criminal-organizations": "Криминал Эдема",
  "cybernetics-and-implants": "Кибернетика",
  "history-before-adam": "История до Адама",
  "technology-triumph-cult": "Культ Триумфа",
};

export function WorldArticleNavigation({
  slug,
  position,
}: {
  slug: WorldArticleSlug;
  position: "top" | "bottom";
}) {
  const { topic } = worldArticleRegistry[slug];
  const returnHref = useArticleListHref(topic);
  const backHref = returnHref ?? worldArticlesHref(topic);
  const backLabel = "К статьям раздела";

  if (position === "top") {
    return (
      <nav aria-label="Раздел статьи">
        <WorldBackLink href={backHref} label={backLabel} />
      </nav>
    );
  }

  const articles = worldTopicArticles(topic);
  const index = articles.findIndex((article) => article.slug === slug);
  const previous = articles[index - 1];
  const next = articles[index + 1];
  const readingHref = (article: WorldArticleSlug) =>
    worldArticleHref(article) +
    (returnHref
      ? `?${new URLSearchParams({ [articleListParam]: returnHref })}`
      : "");

  return (
    <nav aria-label="Навигация по статьям" className={styles.navigation}>
      {(previous || next) && (
        <div className={styles.neighbors}>
          {previous && (
            <ButtonLink
              className={`${styles.neighbor} ${styles.previous}`}
              size="sm"
              href={readingHref(previous.slug)}
              rel="prev"
              title={previous.title}
            >
              <SiteTriangle direction="left" />
              <span className={styles.neighborTitle}>
                {shortTitles[previous.slug] ?? previous.title}
              </span>
            </ButtonLink>
          )}
          {next && (
            <ButtonLink
              className={`${styles.neighbor} ${styles.next}`}
              size="sm"
              href={readingHref(next.slug)}
              rel="next"
              title={next.title}
            >
              <span className={styles.neighborTitle}>
                {shortTitles[next.slug] ?? next.title}
              </span>
              <SiteTriangle direction="right" />
            </ButtonLink>
          )}
        </div>
      )}
      <ButtonLink href={backHref} size="lg">
        <SiteTriangle direction="left" /> {backLabel}
      </ButtonLink>
    </nav>
  );
}
