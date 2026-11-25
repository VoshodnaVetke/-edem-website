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

export function RelatedWorldArticles({
  slug,
  children,
}: {
  slug: WorldArticleSlug;
  children?: ReactNode;
}) {
  return (
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
  );
}
