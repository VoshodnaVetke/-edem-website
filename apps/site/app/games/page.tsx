"use client";

import { GameFocusDisplay, Grid, Heading, LinkCard } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { games, photoPath } from "../../config/past-games";
import { siteHref } from "../../config/site-href";
import { GameTagList } from "./GameTagList";
import styles from "./games.module.css";

export default function GamesPage() {
  return (
    <PageShell title="Наши игры">
      <Grid>
        {games.map(({ slug, title, frame, tagIds, focus }) => (
          <LinkCard
            key={slug}
            href={siteHref(`/games/${slug}`)}
            frame={frame}
            reveal={false}
            className={`edem-span--half ${styles.gameCard}`}
            action="Об игре"
            cover={
              <div className={styles.cover}>
                <img src={`${photoPath}/${slug}.webp`} alt="" />
              </div>
            }
          >
            <div className={styles.caption}>
              <Heading level={2}>{title}</Heading>
              <div className={styles.gameMeta}>
                <GameTagList tagIds={tagIds} />
                <GameFocusDisplay focus={focus} />
              </div>
            </div>
          </LinkCard>
        ))}
      </Grid>
    </PageShell>
  );
}
