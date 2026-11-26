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

const topicDecals = {
  power: decor.registry,
  geography: decor.industrial,
  history: decor.signal,
  technology: decor.bioInterface,
  corporations: decor.modular,
  stories: decor.serial,
} satisfies Record<WorldArticleTopic, string>;

export function WorldArticleShell({
  slug,
  headerClassName,
  ...props
}: ComponentProps<typeof PageShell> & { slug: WorldArticleSlug }) {
  const { topic } = worldArticleRegistry[slug];

  return (
    <PageShell
      {...props}
      articlePage
      headerClassName={[decor.header, topicDecals[topic], headerClassName]
        .filter(Boolean)
        .join(" ")}
      breadcrumbs={
        <WorldBreadcrumbs topic={topic} articleTitle={props.title} />
      }
      beforeHeading={<WorldArticleNavigation slug={slug} position="top" />}
    />
  );
}
