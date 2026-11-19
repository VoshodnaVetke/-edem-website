"use client";

import {
  ButtonLink,
  Card,
  Frame,
  Grid,
  Heading,
  LinkCard,
  Text,
} from "@edem/ui";
import { useId } from "react";
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
  const teamPhotoClip = useId();

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
        <Card
          frame="double"
          className={styles.teamCard}
          telemetry
          reveal={false}
        >
          <Grid>
            <div className={`edem-span--half ${styles.teamPhoto}`}>
              <img
                src={`${photoPath}/kazn-ognya-vechnogo/0973.webp`}
                alt="Кадр с игры «Казнь Огня Вечного»"
                loading="lazy"
                style={{ clipPath: `url("#${teamPhotoClip}")` }}
              />
              <Frame variant="asym" mediaClipId={teamPhotoClip} />
            </div>
            <div
              className={`edem-span--half ${layout.cardBody} ${styles.teamCopy}`}
            >
              <Heading id="games-team">За историями стоят люди</Heading>
              <Text>
                Мы пишем сценарии, придумываем персонажей и создаём правила, по
                которым живёт Эдем.
              </Text>
              <div className={layout.actions}>
                <ButtonLink href={siteHref("/about")} size="lg">
                  Познакомиться с мастерской группой{" "}
                  <span aria-hidden="true">→</span>
                </ButtonLink>
              </div>
            </div>
          </Grid>
        </Card>
      </section>
    </PageShell>
  );
}
