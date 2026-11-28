import type { ComponentProps } from "react";
import { PageShell } from "../../components/layout/PageShell";
import {
  worldArticleRegistry,
  type WorldArticleSlug,
  type WorldArticleTopic,
} from "../../config/world-articles";
import decor from "../../styles/lunatic-decor.module.css";
import { WorldArticleNavigation } from "./WorldArticleNavigation";
import { WorldBreadcrumbs } from "./WorldBreadcrumbs";

const topicDecals: Partial<Record<WorldArticleTopic, string>> = {
  power: decor.registry,
  stories: decor.serial,
};

export function WorldArticleShell({
  slug,
  headerClassName,
  ...props
}: ComponentProps<typeof PageShell> & { slug: WorldArticleSlug }) {
  const { topic } = worldArticleRegistry[slug];
  const decal = topicDecals[topic];

  return (
    <PageShell
      {...props}
      articlePage
      headerClassName={[decal && decor.header, decal, headerClassName]
        .filter(Boolean)
        .join(" ")}
      breadcrumbs={
        <WorldBreadcrumbs topic={topic} articleTitle={props.title} />
      }
      beforeHeading={<WorldArticleNavigation slug={slug} position="top" />}
    />
  );
}
