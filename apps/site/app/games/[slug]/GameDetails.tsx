"use client";

import { ButtonLink, Heading, GameFocusDisplay } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
import { SiteSectionRail } from "../../../components/layout/SiteSectionRail";
import { photoPath, type games } from "../../../config/past-games";
import layout from "../../../styles/page-layout.module.css";
import { GameTagList } from "../GameTagList";
import { GamePhotoGallery } from "./GamePhotoGallery";

export function GameDetails({
  game,
  photoCount,
}: {
  game: (typeof games)[number];
  photoCount: number;
}) {
  const sections = [
    { id: "page-title", label: game.title },
    { id: "game-focus", label: "Игровые акценты" },
    { id: "game-photos", label: "Фотографии" },
  ];
  return (
    <PageShell
      title={game.title}
      description={game.summary}
      titleDetails={<GameTagList tagIds={game.tagIds} />}
    >
      {photoCount > 0 && <SiteSectionRail sections={sections} />}
      <div className={layout.stack}>
        <section className={layout.stack} aria-labelledby="game-focus">
          <Heading level={2} id="game-focus">
            Игровые акценты
          </Heading>
          <GameFocusDisplay focus={game.focus} />
        </section>
        {photoCount > 0 && (
          <section className={layout.stack} aria-labelledby="game-photos">
            <Heading level={2} id="game-photos">
              Фотографии
            </Heading>
            <GamePhotoGallery
              title={game.title}
              slug={game.slug}
              folder={`${photoPath}/${game.slug}`}
              count={photoCount}
            />
          </section>
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
