"use client";

import { ButtonLink } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
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
  return (
    <PageShell
      title={game.title}
      description={game.summary}
      titleDetails={<GameTagList tagIds={game.tagIds} />}
    >
      <div className={layout.stack}>
        {photoCount > 0 && (
          <GamePhotoGallery
            title={game.title}
            slug={game.slug}
            folder={`${photoPath}/${game.slug}`}
            count={photoCount}
          />
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
