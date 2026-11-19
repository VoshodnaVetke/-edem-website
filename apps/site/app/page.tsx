"use client";

import { ButtonLink, Grid, Heading, Layout, LinkCard, Text } from "@edem/ui";
import { siteHref } from "../config/site-href";
import layout from "../styles/page-layout.module.css";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className={layout.page}>
      <Layout className={styles.home}>
        <section aria-labelledby="page-title">
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
              <ButtonLink href={siteHref("/games")}>
                Наши игры{" "}
                <span className={styles.actionArrow} aria-hidden="true">
                  →
                </span>
              </ButtonLink>
            </div>
          </div>
        </section>

        <section aria-labelledby="first-visit">
          <LinkCard telemetry href={siteHref("/world")} frame="asym">
            <div className={layout.cardBody}>
              <Heading level={2} id="first-visit">
                Впервые в Эдеме?
              </Heading>
              <Text>
                Для первой игры достаточно знать основы мира. Начните с обзора
                Эдема и узнайте, как социальный рейтинг влияет на повседневную
                жизнь его граждан.
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
          <LinkCard telemetry href={siteHref("/order")} frame="double">
            <div className={layout.cardBody}>
              <Heading level={3}>Игра под заказ</Heading>
              <Text>Ролевое событие под ваш запрос.</Text>
              <Text variant="system" className={styles.accent}>
                ПОДРОБНЕЕ О ЗАКАЗЕ <span aria-hidden="true">↗</span>
              </Text>
            </div>
          </LinkCard>
        </section>

        <section aria-labelledby="people">
          <Heading level={2} id="people" className={layout.sectionHeading}>
            За историями стоят люди
          </Heading>
          <Grid>
            <LinkCard
              telemetry
              href={siteHref("/games")}
              frame="asym"
              className="edem-span--half"
            >
              <div className={layout.cardBody}>
                <Heading level={3}>Проведённые игры</Heading>
                <Text>Архив мастерской и фотоальбомы с игр.</Text>
              </div>
            </LinkCard>
            <LinkCard
              telemetry
              href={siteHref("/about")}
              className="edem-span--half"
            >
              <div className={layout.cardBody}>
                <Heading level={3}>Наша команда</Heading>
                <Text>
                  Авторы сценариев, персонажей и правил ролевых игр «Эдема».
                </Text>
              </div>
            </LinkCard>
          </Grid>
        </section>
      </Layout>
    </main>
  );
}
