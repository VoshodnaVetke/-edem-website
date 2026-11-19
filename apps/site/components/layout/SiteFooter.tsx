"use client";

import { Grid, Heading, Layout, SignalDivider, Text } from "@edem/ui";
import { usePathname } from "next/navigation";
import { siteNavigation } from "../../config/navigation";
import { siteFooterDivider } from "../../config/site-dividers";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const pathname = usePathname();
  const variant = siteFooterDivider(pathname);
  return (
    <footer className={styles.footer} aria-label="Подвал сайта">
      <SignalDivider
        className={styles.divider}
        label="ЭДЕМ / СВЯЗЬ УСТАНОВЛЕНА"
        pulse="once"
        variant={variant}
        variationSeed={variant ? undefined : `footer.${pathname}`}
        fillBelow
      />
      <div className={styles.body}>
        <Layout>
          <Grid>
            <div className={`edem-span--intro ${styles.intro}`}>
              <Text variant="system">ЭДЕМ / МАСТЕРСКАЯ ГРУППА</Text>
              <Heading level={2}>Эдем</Heading>
              <Text>
                Авторская вселенная кабинетных и текстовых ролевых игр.
              </Text>
            </div>
            <nav
              className={`edem-span--aside ${styles.navigation}`}
              aria-label="Навигация в подвале"
            >
              <Text variant="system">Разделы сайта</Text>
              <ul className={styles.links}>
                {siteNavigation.map((page) => (
                  <li key={page.href}>
                    <a href={page.href}>{page.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </Grid>
          <Text variant="system" className={styles.signature}>
            Мастерская группа Эдема · Публичный сайт
          </Text>
        </Layout>
      </div>
    </footer>
  );
}
