"use client";

import { Heading, Layout, Text } from "@edem/ui";
import type { ReactNode } from "react";
import styles from "../../styles/page-layout.module.css";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  beforeHeading?: ReactNode;
  titleDetails?: ReactNode;
  intro?: ReactNode;
  headerClassName?: string;
  className?: string;
  children?: ReactNode;
}

/** Page composition using approved library components, not a new UI primitive. */
export function PageShell({
  eyebrow,
  title,
  description,
  beforeHeading,
  titleDetails,
  intro,
  headerClassName,
  className,
  children,
}: PageShellProps) {
  const heading = (
    <>
      {beforeHeading}
      {eyebrow && <Text variant="system">{eyebrow}</Text>}
      <Heading level={1} id="page-title">
        {title}
      </Heading>
    </>
  );

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={[styles.page, className].filter(Boolean).join(" ")}
    >
      <section className={styles.section} aria-labelledby="page-title">
        <Layout>
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
