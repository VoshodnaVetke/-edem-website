import type { ComponentProps } from "react";
import { PageShell } from "../../components/layout/PageShell";
import {
  worldArticleRegistry,
  type WorldArticleSlug,
} from "../../config/world-articles";
import { WorldArticleNavigation } from "./WorldArticleNavigation";
import { WorldBreadcrumbs } from "./WorldBreadcrumbs";

export function WorldArticleShell({
  slug,
  ...props
}: ComponentProps<typeof PageShell> & { slug: WorldArticleSlug }) {
  return (
    <PageShell
      {...props}
      breadcrumbs={
        <WorldBreadcrumbs
          topic={worldArticleRegistry[slug].topic}
          articleTitle={props.title}
        />
      }
      beforeHeading={<WorldArticleNavigation slug={slug} position="top" />}
    />
  );
}
