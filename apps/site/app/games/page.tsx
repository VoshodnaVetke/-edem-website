"use client";

import {
  GameFocusDisplay,
  GameTagBadge,
  Grid,
  Heading,
  LinkCard,
  Text,
} from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { gameFormat, games, photoPath } from "../../config/past-games";
import { siteHref } from "../../config/site-href";
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
              {slug === "parad-tehnologiy" && tagIds && focus ? (
                <div className={styles.paradeMeta}>
                  <div className={styles.paradeTags} aria-label="Теги игры">
                    {tagIds.map((id) => (
                      <GameTagBadge key={id} tag={id} />
                    ))}
                  </div>
                  <GameFocusDisplay focus={focus} />
                </div>
              ) : (
                <Text variant="system">{gameFormat}</Text>
              )}
            </div>
          </LinkCard>
        ))}
      </Grid>
    </PageShell>
  );
}
