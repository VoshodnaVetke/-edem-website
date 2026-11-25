"use client";

import { Heading, Layout, Text } from "@edem/ui";
import type { ReactNode } from "react";
import styles from "../../styles/page-layout.module.css";
import { SiteBreadcrumbs } from "./SiteBreadcrumbs";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  beforeHeading?: ReactNode;
  breadcrumbs?: ReactNode;
  titleDetails?: ReactNode;
  intro?: ReactNode;
  headerClassName?: string;
  children?: ReactNode;
}

/** Page composition using approved library components, not a new UI primitive. */
export function PageShell({
  eyebrow,
  title,
  description,
  beforeHeading,
  breadcrumbs,
  titleDetails,
  intro,
  headerClassName,
  children,
}: PageShellProps) {
  const heading = (
    <>
      {eyebrow && <Text variant="system">{eyebrow}</Text>}
      <Heading level={1} id="page-title">
        {title}
      </Heading>
    </>
  );

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section className={styles.section} aria-labelledby="page-title">
        <Layout>
          <div className={styles.breadcrumbRow}>
            {beforeHeading}
            {breadcrumbs ?? <SiteBreadcrumbs current={title} />}
          </div>
          <div
            className={[
              titleDetails ? styles.splitHeader : styles.stack,
              headerClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {titleDetails ? (
              <div className={styles.stack}>
                {heading}
                {titleDetails}
              </div>
            ) : (
              heading
            )}
            {description && <Text variant="lead">{description}</Text>}
            {intro}
          </div>
          {children && <div className={styles.content}>{children}</div>}
        </Layout>
      </section>
    </main>
  );
}
