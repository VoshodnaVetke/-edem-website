"use client";

import { SiteBreadcrumbs } from "../../components/layout/SiteBreadcrumbs";
import {
  worldArticleGroups,
  worldArticlesHref,
  type WorldArticleTopic,
} from "../../config/world-articles";
import { useArticleListHref, useWorldOverviewHref } from "./article-list-state";

export function WorldBreadcrumbs({
  topic,
  articleTitle,
}: {
  topic: WorldArticleTopic;
  articleTitle?: string;
}) {
  const listHref = useArticleListHref(topic);
  const overviewHref = useWorldOverviewHref(
    articleTitle ? listHref : undefined,
  );
  const group = worldArticleGroups.find(({ slug }) => slug === topic)!;
  const world = { href: overviewHref, label: "Вселенная" };

  return (
    <SiteBreadcrumbs
      current={articleTitle ?? group.title}
      parents={
        articleTitle
          ? [
              world,
              {
                href: listHref ?? worldArticlesHref(topic),
                label: group.title,
              },
            ]
          : [world]
      }
    />
  );
}
