"use client";

import { getGameTag, Grid, Heading, LinkCard, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { games, photoPath } from "../../config/past-games";
import { siteHref } from "../../config/site-href";
import styles from "./games.module.css";

const previewMeta = (["chamber", "moscow", "16-plus"] as const)
  .map(getGameTag)
  .map((tag) => tag.shortLabel ?? tag.label)
  .join(" · ");

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
              <Text variant="system" className={styles.previewMeta}>
                {previewMeta}
              </Text>
            </div>
          </LinkCard>
        ))}
      </Grid>
    </PageShell>
  );
}
