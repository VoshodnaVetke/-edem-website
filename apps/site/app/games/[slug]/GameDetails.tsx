"use client";

import { ButtonLink, Gallery } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
import type { games } from "../../../config/past-games";
import layout from "../../../styles/page-layout.module.css";
import styles from "../games.module.css";

export function GameDetails({ game }: { game: (typeof games)[number] }) {
  return (
    <PageShell title={game.title} description={game.summary}>
      <div className={layout.stack}>
        {game.photos?.length ? (
          <Gallery aria-label="Фотографии с игры">
            {game.photos.map(({ src, alt }) => (
              <a key={src} href={src}>
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className={styles.photo}
                />
              </a>
            ))}
          </Gallery>
        ) : null}
        <div className={layout.actions}>
          {game.albums.map((href, index) => (
            <ButtonLink key={href} href={href}>
              {game.albums.length === 1
                ? "Фото в ВК"
                : `Альбом ${index + 1} в ВК`}
            </ButtonLink>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
