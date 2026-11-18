"use client";

import { Grid, Heading, LinkCard, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { games } from "../../config/past-games";
import { siteHref } from "../../config/site-href";
import styles from "./games.module.css";

export default function GamesPage() {
  return (
    <PageShell title="Наши игры">
      <Grid>
        {games.map(({ slug, title, frame, photos }) => (
          <LinkCard
            key={slug}
            href={siteHref(`/games/${slug}`)}
            frame={frame}
            reveal={false}
            className={`edem-span--half ${styles.gameCard}`}
            action="Об игре"
            cover={
              photos?.[0] && (
                <div className={styles.cover}>
                  <img src={photos[0].src} alt="" />
                </div>
              )
            }
          >
            <div className={styles.caption}>
              <Heading level={2}>{title}</Heading>
              <Text variant="system">Кабинетная ролевая игра</Text>
            </div>
          </LinkCard>
        ))}
      </Grid>
    </PageShell>
  );
}
