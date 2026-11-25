"use client";

import { ButtonLink } from "@edem/ui";
import { siteHref } from "../../../../config/site-href";
import { useReturnHref, worldOverviewParam } from "../../article-list-state";
import { WorldBackLink } from "../../WorldBackLink";

const overviewPath = siteHref("/world");

export function WorldOverviewBackLink({
  compact = false,
}: {
  compact?: boolean;
}) {
  const href =
    useReturnHref(worldOverviewParam, overviewPath) ??
    overviewPath + "#world-topics";
  const label = "К разделам энциклопедии";

  if (compact)
    return (
      <nav aria-label="Разделы вселенной">
        <WorldBackLink href={href} label={label} />
      </nav>
    );

  return (
    <ButtonLink href={href}>
      <span aria-hidden="true">←</span> {label}
    </ButtonLink>
  );
}
