"use client";

import { ButtonLink, Heading } from "@edem/ui";
import type { ReactNode } from "react";
import {
  relatedWorldArticleSlugs,
  worldArticleHref,
  worldArticleRegistry,
  type WorldArticleSlug,
} from "../../config/world-articles";
import styles from "../../styles/page-layout.module.css";
import { WorldArticleNavigation } from "./WorldArticleNavigation";

export function WorldArticleFooter({
  slug,
  children,
}: {
  slug: WorldArticleSlug;
  children?: ReactNode;
}) {
  return (
    <div className={styles.stack}>
      <WorldArticleNavigation slug={slug} position="bottom" />
      <section aria-labelledby="related" className={styles.stack}>
        <Heading level={2} id="related">
          Связанные статьи
        </Heading>
        <div className={styles.actions}>
          {relatedWorldArticleSlugs(slug).map((relatedSlug) => (
            <ButtonLink key={relatedSlug} href={worldArticleHref(relatedSlug)}>
              {worldArticleRegistry[relatedSlug].title}
            </ButtonLink>
          ))}
          {children}
        </div>
      </section>
    </div>
  );
}
