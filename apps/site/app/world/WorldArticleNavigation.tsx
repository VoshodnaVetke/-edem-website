"use client";

import { ButtonLink } from "@edem/ui";
import { siteHref } from "../../config/site-href";
import {
  worldArticleHref,
  worldArticleRegistry,
  worldArticlesHref,
  worldTopicArticles,
  type WorldArticleSlug,
} from "../../config/world-articles";
import { articleListParam, useReturnHref } from "./article-list-state";
import styles from "./article-navigation.module.css";
import { WorldBackLink } from "./WorldBackLink";

export function WorldArticleNavigation({
  slug,
  position,
}: {
  slug: WorldArticleSlug;
  position: "top" | "bottom";
}) {
  const { topic } = worldArticleRegistry[slug];
  const listHref = worldArticlesHref(topic);
  const returnHref = useReturnHref(
    articleListParam,
    listHref,
    topic === "power" ? siteHref("/world/topics/daily-life") : undefined,
  );
  const backHref = returnHref ?? listHref;
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
              className={styles.previous}
              size="sm"
              href={readingHref(previous.slug)}
              rel="prev"
            >
              <span aria-hidden="true">←</span> Предыдущая статья
            </ButtonLink>
          )}
          {next && (
            <ButtonLink
              className={styles.next}
              size="sm"
              href={readingHref(next.slug)}
              rel="next"
            >
              <span>
                Следующая статья <span aria-hidden="true">→</span>
              </span>
              <span className={styles.nextTitle}>{next.title}</span>
            </ButtonLink>
          )}
        </div>
      )}
      <ButtonLink href={backHref} size="lg">
        <span aria-hidden="true">←</span> {backLabel}
      </ButtonLink>
    </nav>
  );
}
