"use client";

import { Grid, Heading, LinkCard } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { games, photoPath } from "../../config/past-games";
import { siteHref } from "../../config/site-href";
import { GameTagList } from "./GameTagList";
import styles from "./games.module.css";

const previewTagIds = ["chamber", "moscow", "16-plus"] as const;

export default function GamesPage() {
  return (
    <PageShell title="Наши игры">
      <Grid>
        {games.map(({ slug, title, frame }) => (
          <LinkCard
            key={slug}
            href={siteHref(`/games/${slug}`)}
            frame={frame}
            reveal={false}
            className={`edem-span--half ${styles.gameCard}`}
            cover={
              <div className={styles.cover}>
                <img src={`${photoPath}/${slug}.webp`} alt="" />
              </div>
            }
          >
            <div className={styles.caption}>
              <Heading level={2}>{title}</Heading>
              <GameTagList tagIds={previewTagIds} compact />
            </div>
          </LinkCard>
        ))}
      </Grid>
    </PageShell>
  );
}
