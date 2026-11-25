"use client";

import { SiteTriangle } from "../../components/layout/SiteTriangle";
import { ButtonLink } from "@edem/ui";
import styles from "./article-navigation.module.css";

export function WorldBackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <ButtonLink
      className={styles.backIcon}
      size="sm"
      href={href}
      aria-label={label}
    >
      <SiteTriangle direction="left" />
    </ButtonLink>
  );
}
