"use client";

import { ButtonLink } from "@edem/ui";
import { useEffect, useState } from "react";
import { siteHref } from "../../config/site-href";
import {
  worldArticleHref,
  worldArticleRegistry,
  worldArticlesHref,
  worldTopicArticles,
  type WorldArticleSlug,
} from "../../config/world-articles";
import { articleListParam } from "./article-list-state";
import styles from "./article-navigation.module.css";

export function WorldArticleNavigation({
  slug,
  position,
}: {
  slug: WorldArticleSlug;
  position: "top" | "bottom";
}) {
  const { topic } = worldArticleRegistry[slug];
  const listHref = worldArticlesHref(topic);
  const [returnHref, setReturnHref] = useState<string | null>(null);

  useEffect(() => {
    const source = new URLSearchParams(window.location.search).get(
      articleListParam,
    );
    if (!source) return;
    let url: URL;
    try {
      url = new URL(source, window.location.origin);
    } catch {
      return;
    }
    const legacyList =
      topic === "power" &&
      url.pathname === siteHref("/world/topics/daily-life");
    if (
      url.origin === window.location.origin &&
      (url.pathname === listHref || legacyList)
    ) {
      setReturnHref(url.pathname + url.search);
    }
  }, [listHref, topic]);

  const backHref = returnHref ?? listHref;
  const backLabel = (
    <>
      <span aria-hidden="true">←</span> К статьям раздела
    </>
  );

  if (position === "top") {
    return (
      <nav aria-label="Раздел статьи">
        <a className={styles.link} href={backHref}>
          {backLabel}
        </a>
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
      {next ? (
        <ButtonLink
          className={styles.next}
          href={readingHref(next.slug)}
          rel="next"
        >
          <span>
            Следующая статья <span aria-hidden="true">→</span>
          </span>
          <span>{next.title}</span>
        </ButtonLink>
      ) : (
        <ButtonLink href={backHref}>{backLabel}</ButtonLink>
      )}
      <div className={styles.links}>
        {previous && (
          <a
            className={styles.link}
            href={readingHref(previous.slug)}
            rel="prev"
          >
            <span aria-hidden="true">←</span> Предыдущая статья
          </a>
        )}
        {next && (
          <a className={styles.link} href={backHref}>
            {backLabel}
          </a>
        )}
      </div>
    </nav>
  );
}
