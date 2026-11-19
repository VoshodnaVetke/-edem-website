"use client";

import { ButtonLink, Card, Grid, Heading, LinkCard, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import deployment from "../../config/deployment.json";
import { games, photoPath } from "../../config/past-games";
import { siteHref } from "../../config/site-href";
import { upcomingGame } from "../../config/upcoming-game";
import layout from "../../styles/page-layout.module.css";
import { GameTagList } from "./GameTagList";
import styles from "./games.module.css";

const previewTagIds = ["chamber", "moscow", "16-plus"] as const;

export default function GamesPage() {
  return (
    <PageShell
      title="Истории, которые мы пишем вместе"
      description="Мы создаём мир, его правила и конфликты, но не решаем, чем всё закончится. Здесь каждый персонаж может изменить ход истории, независимо от своего положения, а решения игроков оставляют след в мире и определяют его будущее."
    >
      {upcomingGame && (
        <section aria-labelledby="upcoming-game">
          <Heading id="upcoming-game" className={layout.sectionHeading}>
            Ближайшая игра
          </Heading>
          <Card telemetry reveal={false}>
            <Grid>
              <img
                className={`edem-span--half ${styles.announcementCover}`}
                src={`${deployment.basePath}${upcomingGame.coverPath}`}
                alt=""
              />
              <div className={`edem-span--half ${layout.cardBody}`}>
                <Heading level={3}>{upcomingGame.title}</Heading>
                <Text variant="system">
                  <time dateTime={upcomingGame.date.iso}>
                    {upcomingGame.date.label}
                  </time>
                  {` · ${upcomingGame.venue}`}
                </Text>
                <Text>{upcomingGame.description}</Text>
                <div className={layout.actions}>
                  <ButtonLink href={upcomingGame.participationHref}>
                    Участвовать
                  </ButtonLink>
                </div>
              </div>
            </Grid>
          </Card>
        </section>
      )}

      <section aria-labelledby="past-games">
        <Heading id="past-games" className={layout.sectionHeading}>
          Прошедшие игры
        </Heading>
        <Grid>
          {games.map(({ slug, title, frame }) => (
            <LinkCard
              telemetry
              key={slug}
              href={siteHref(`/games/${slug}`)}
              frame={frame}
              reveal={false}
              className={`edem-span--half ${styles.gameCard}`}
              cover={
                <div className={styles.cover}>
                  <img
                    src={
                      slug === "parad-tehnologiy"
                        ? `${photoPath}/${slug}/0073.webp`
                        : `${photoPath}/${slug}.webp`
                    }
                    alt=""
                  />
                </div>
              }
            >
              <div className={styles.caption}>
                <h3 className="edem-type-h2">{title}</h3>
                <GameTagList tagIds={previewTagIds} compact />
              </div>
            </LinkCard>
          ))}
        </Grid>
      </section>

      <section aria-labelledby="games-team">
        <Heading id="games-team" className={layout.sectionHeading}>
          За историями стоят люди
        </Heading>
        <div className={layout.actions}>
          <ButtonLink href={siteHref("/about")}>
            Познакомиться с мастерской группой <span aria-hidden="true">→</span>
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
