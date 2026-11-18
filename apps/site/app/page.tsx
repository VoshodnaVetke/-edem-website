"use client";

import {
  ButtonLink,
  Grid,
  Heading,
  Layout,
  LinkCard,
  Text,
  TreeBackground,
} from "@edem/ui";
import { siteHref } from "../config/site-href";
import layout from "../styles/page-layout.module.css";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className={layout.page}>
      <Layout className={styles.home}>
        <section className={styles.hero} aria-labelledby="page-title">
          <div className={layout.stack}>
            <Text variant="system" className={styles.accent}>
              МАСТЕРСКАЯ РОЛЕВЫХ ИГР / ВХОД В ЭДЕМ
            </Text>
            <Heading level={1} id="page-title" className={styles.heroTitle}>
              Миры, в которые
              <br />
              можно войти.
            </Heading>
            <Text variant="lead">
              Станьте частью истории, в которой каждое решение имеет значение.
            </Text>
            <div className={styles.heroActions}>
              <ButtonLink href={siteHref("/world")} size="lg">
                Открыть мир Эдема{" "}
                <span className={styles.actionArrow} aria-hidden="true">
                  ↗
                </span>
              </ButtonLink>
              <ButtonLink href={siteHref("/events")}>
                Ближайшие игры{" "}
                <span className={styles.actionArrow} aria-hidden="true">
                  →
                </span>
              </ButtonLink>
            </div>
          </div>
          <TreeBackground className={styles.heroArtwork} />
        </section>

        <section aria-labelledby="first-visit">
          <LinkCard href={siteHref("/world")} frame="asym">
            <div className={layout.cardBody}>
              <Heading level={2} id="first-visit" className={styles.cardTitle}>
                Впервые в Эдеме?
              </Heading>
              <Text>
                Не нужно знать весь лор, чтобы начать. Познакомьтесь с основами
                мира.
              </Text>
              <Text variant="system" className={styles.accent}>
                НАЧАТЬ ЗНАКОМСТВО <span aria-hidden="true">↗</span>
              </Text>
            </div>
          </LinkCard>
        </section>

        <section aria-labelledby="participate">
          <Heading level={2} id="participate" className={layout.sectionHeading}>
            Станьте частью истории
          </Heading>
          <Grid>
            <LinkCard href={siteHref("/events")} className="edem-span--half">
              <div className={layout.cardBody}>
                <Heading level={3}>Ближайшие игры</Heading>
                <Text>Анонсы предстоящих игр и информация об участии.</Text>
                <Text variant="system" className={styles.accent}>
                  К АФИШЕ <span aria-hidden="true">↗</span>
                </Text>
              </div>
            </LinkCard>
            <LinkCard href={siteHref("/order")} className="edem-span--half">
              <div className={layout.cardBody}>
                <Heading level={3}>Игра под заказ</Heading>
                <Text>Ролевое событие под ваш запрос.</Text>
                <Text variant="system" className={styles.accent}>
                  ПОДРОБНЕЕ О ЗАКАЗЕ <span aria-hidden="true">↗</span>
                </Text>
              </div>
            </LinkCard>
          </Grid>
        </section>

        <section aria-labelledby="people">
          <Heading level={2} id="people" className={layout.sectionHeading}>
            За историями стоят люди
          </Heading>
          <Grid>
            <LinkCard href={siteHref("/games")} className="edem-span--half">
              <Heading level={3} className={styles.cardTitle}>
                Проведённые игры
              </Heading>
            </LinkCard>
            <LinkCard href={siteHref("/about")} className="edem-span--half">
              <Heading level={3} className={styles.cardTitle}>
                Наша команда
              </Heading>
            </LinkCard>
          </Grid>
        </section>
      </Layout>
    </main>
  );
}
