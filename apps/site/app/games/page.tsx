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
            className="edem-span--half"
          >
            <div className={photos?.length ? styles.withCover : undefined}>
              {photos?.[0] && (
                <img className={styles.cover} src={photos[0].src} alt="" />
              )}
              <div className={styles.caption}>
                <Heading level={2}>{title}</Heading>
                <Text variant="system">Кабинетная ролевая игра</Text>
                <Text className={styles.action}>Об игре</Text>
              </div>
            </div>
          </LinkCard>
        ))}
      </Grid>
    </PageShell>
  );
}
