"use client";

import { Heading, Layout, Text } from "@edem/ui";
import type { ReactNode } from "react";
import styles from "../../styles/page-layout.module.css";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  titleDetails?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}

/** Page composition using approved library components, not a new UI primitive. */
export function PageShell({
  eyebrow,
  title,
  description,
  titleDetails,
  intro,
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
          <div className={titleDetails ? styles.splitHeader : styles.stack}>
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
