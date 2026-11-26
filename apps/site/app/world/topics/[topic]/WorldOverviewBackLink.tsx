"use client";

import { SiteTriangle } from "../../../../components/layout/SiteTriangle";
import { ButtonLink } from "@edem/ui";
import { useWorldOverviewHref } from "../../article-list-state";
import { WorldBackLink } from "../../WorldBackLink";
import styles from "./articles.module.css";

export function WorldOverviewBackLink({
  compact = false,
  nextSection,
}: {
  compact?: boolean;
  nextSection?: { href: string; title: string };
}) {
  const href = useWorldOverviewHref();
  const label = "К разделам энциклопедии";

  if (compact)
    return (
      <nav aria-label="Разделы вселенной">
        <WorldBackLink href={href} label={label} />
      </nav>
    );

  return (
    <nav aria-label="Навигация по разделам" className={styles.sectionActions}>
      <ButtonLink href={href}>
        <SiteTriangle direction="left" /> {label}
      </ButtonLink>
      {nextSection && (
        <ButtonLink
          href={nextSection.href}
          rel="next"
          title={nextSection.title}
        >
          Следующий раздел <SiteTriangle direction="right" />
        </ButtonLink>
      )}
    </nav>
  );
}
