"use client";

import { Heading, Layout, Text } from "@edem/ui";
import type { ReactNode } from "react";
import styles from "../../styles/page-layout.module.css";

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

/** Page composition using approved library components, not a new UI primitive. */
export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section className={styles.section} aria-labelledby="page-title">
        <Layout>
          <div className={styles.stack}>
            <Text variant="system">{eyebrow}</Text>
            <Heading level={1} id="page-title">
              {title}
            </Heading>
            <Text variant="lead">{description}</Text>
          </div>
          {children && <div className={styles.content}>{children}</div>}
        </Layout>
      </section>
    </main>
  );
}
