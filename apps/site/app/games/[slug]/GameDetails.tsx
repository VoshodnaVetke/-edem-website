"use client";

import { ButtonLink, Gallery, GameFocusDisplay } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
import { photoPath, type games } from "../../../config/past-games";
import layout from "../../../styles/page-layout.module.css";
import { GameTagList } from "../GameTagList";
import styles from "../games.module.css";

export function GameDetails({
  game,
  photoCount,
}: {
  game: (typeof games)[number];
  photoCount: number;
}) {
  return (
    <PageShell
      title={game.title}
      description={game.summary}
      titleDetails={<GameTagList tagIds={game.tagIds} />}
    >
      <div className={layout.stack}>
        <section className={styles.gameFocus} aria-label="Игровые акценты">
          <GameFocusDisplay focus={game.focus} />
        </section>
        {photoCount > 0 && (
          <Gallery className={styles.gallery} aria-label="Фотографии с игры">
            {Array.from({ length: photoCount }, (_, index) => {
              const number = index + 1;
              const photo = `${photoPath}/${game.slug}/${String(number).padStart(4, "0")}`;
              return (
                <a key={photo} href={`${photo}.webp`}>
                  <img
                    src={`${photo}-thumb.webp`}
                    alt={`«${game.title}», фото ${number}`}
                    loading="lazy"
                    decoding="async"
                    className={styles.photo}
                  />
                </a>
              );
            })}
          </Gallery>
        )}
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
