import type { ComponentProps } from "react";
import { PageShell } from "../../components/layout/PageShell";
import type { WorldArticleSlug } from "../../config/world-articles";
import { WorldArticleNavigation } from "./WorldArticleNavigation";

export function WorldArticleShell({
  slug,
  ...props
}: ComponentProps<typeof PageShell> & { slug: WorldArticleSlug }) {
  return (
    <PageShell
      {...props}
      beforeHeading={<WorldArticleNavigation slug={slug} position="top" />}
    />
  );
}
