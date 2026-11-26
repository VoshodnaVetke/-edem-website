"use client";

import { ButtonLink } from "@edem/ui";
import { SiteTriangle } from "../../components/layout/SiteTriangle";
import {
  worldArticleHref,
  worldArticleGroups,
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
  const topicIndex = worldArticleGroups.findIndex(
    (group) => group.slug === topic,
  );
  const readingHref = (article: WorldArticleSlug) =>
    worldArticleHref(article) +
    (returnHref
      ? `?${new URLSearchParams({ [articleListParam]: returnHref })}`
      : "");
  const neighbor = (direction: -1 | 1) => {
    const article = articles[index + direction];
    if (article) {
      return {
        href: readingHref(article.slug),
        title: article.title,
        label: shortTitles[article.slug] ?? article.title,
      };
    }
    const group = worldArticleGroups[topicIndex + direction];
    if (group) {
      return {
        href: worldArticlesHref(group.slug),
        title: group.title,
        label: group.title,
      };
    }
  };
  const previous = neighbor(-1);
  const next = neighbor(1);

  return (
    <nav aria-label="Навигация по статьям" className={styles.navigation}>
      {(previous || next) && (
        <div className={styles.neighbors}>
          {previous && (
            <ButtonLink
              className={`${styles.neighbor} ${styles.previous}`}
              size="sm"
              href={previous.href}
              rel="prev"
              title={previous.title}
            >
              <SiteTriangle direction="left" />
              <span className={styles.neighborTitle}>{previous.label}</span>
            </ButtonLink>
          )}
          {next && (
            <ButtonLink
              className={`${styles.neighbor} ${styles.next}`}
              size="sm"
              href={next.href}
              rel="next"
              title={next.title}
            >
              <span className={styles.neighborTitle}>{next.label}</span>
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
