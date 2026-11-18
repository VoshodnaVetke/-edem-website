"use client";

import { Grid, Heading, Layout, SignalDivider, Text } from "@edem/ui";
import { usePathname } from "next/navigation";
import { siteNavigation } from "../../config/navigation";
import { siteDividers } from "../../config/site-dividers";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const pathname = usePathname();
  const { footer } = siteDividers(pathname);
  return (
    <footer className={styles.footer} aria-label="Подвал сайта">
      <SignalDivider
        className="site-content-divider site-content-divider--footer"
        label="ЭДЕМ / СВЯЗЬ УСТАНОВЛЕНА"
        pulse="once"
        variant={footer}
        variationSeed={footer ? undefined : `footer.${pathname}`}
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
