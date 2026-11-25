"use client";

import { SiteTriangle } from "../../../../components/layout/SiteTriangle";
import { ButtonLink } from "@edem/ui";
import { useWorldOverviewHref } from "../../article-list-state";
import { WorldBackLink } from "../../WorldBackLink";

export function WorldOverviewBackLink({
  compact = false,
}: {
  compact?: boolean;
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
    <ButtonLink href={href}>
      <SiteTriangle direction="left" /> {label}
    </ButtonLink>
  );
}
