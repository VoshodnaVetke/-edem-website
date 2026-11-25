import type { ComponentProps } from "react";
import { PageShell } from "../../components/layout/PageShell";
import type { WorldArticleSlug } from "../../config/world-articles";
import { WorldArticleNavigation } from "./WorldArticleNavigation";
import styles from "./article-text.module.css";

export function WorldArticleShell({
  slug,
  className,
  ...props
}: ComponentProps<typeof PageShell> & { slug: WorldArticleSlug }) {
  return (
    <PageShell
      {...props}
      className={[styles.article, className].filter(Boolean).join(" ")}
      beforeHeading={<WorldArticleNavigation slug={slug} position="top" />}
    />
  );
}
