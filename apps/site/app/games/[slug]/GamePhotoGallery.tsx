"use client";

import { ButtonLink, Gallery } from "@edem/ui";
import { useRef, useState } from "react";
import layout from "../../../styles/page-layout.module.css";
import styles from "../games.module.css";

// Editorial display order for Casino Mefisa; original filenames remain unchanged.
const kazinoMefisaOrder: readonly number[] = [
  100, 248, 250, 130, 199, 251, 97, 84, 156, 133, 121, 255, 200, 220,
  108, 268, 74, 162, 124, 239, 203, 211, 76, 176, 131, 158, 240, 138,
  266, 90, 217, 188, 201, 243, 102, 270, 39, 87, 193, 185, 163, 238,
  117, 257, 192, 232, 261, 29, 141, 86, 98, 33, 41, 55, 63, 68,
  71, 75, 78, 82, 83, 88, 92, 94, 101, 105, 111, 114, 119, 123,
  127, 128, 132, 136, 137, 139, 145, 146, 151, 153, 161, 166, 168, 174,
  178, 179, 180, 184, 190, 196, 204, 209, 223, 225, 230, 233, 236, 241,
  242, 244, 253, 256, 258, 259, 262, 265, 269, 275, 279, 280, 286, 288,
  2, 13, 22, 27, 32, 42, 46, 70, 80, 107, 112, 116, 140, 152,
  154, 160, 167, 187, 202, 207, 221, 231, 235, 249, 260, 264, 273, 277,
  283, 293,
];

export function GamePhotoGallery({
  title,
  folder,
  slug,
  count,
}: {
  title: string;
  folder: string;
  slug: string;
  count: number;
}) {
  const [number, setNumber] = useState(1);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement>(null);
  const touchStart = useRef<number | null>(null);
  const photo = (index: number) => {
    const originalIndex = slug === "kazino-mefisa" ? kazinoMefisaOrder[index - 1] : index;
    return `${folder}/${String(originalIndex).padStart(4, "0")}`;
  };
  const description = (index: number) => `«${title}», фото ${index}`;
  const move = (step: number) =>
    setNumber((current) => ((current - 1 + step + count) % count) + 1);

  return (
    <>
      <Gallery className={styles.gallery} aria-label="Фотографии с игры">
        {Array.from({ length: count }, (_, index) => {
          const current = index + 1;
          return (
            <a
              key={current}
              href={`${photo(current)}.webp`}
              aria-haspopup="dialog"
              onClick={(event) => {
                if (
                  event.ctrlKey ||
                  event.metaKey ||
                  event.shiftKey ||
                  event.altKey ||
                  !dialog.current?.showModal
                )
                  return;
                event.preventDefault();
                opener.current = event.currentTarget;
                setNumber(current);
                dialog.current.showModal();
              }}
            >
              <img
                src={`${photo(current)}-thumb.webp`}
                alt={description(current)}
                loading="lazy"
                decoding="async"
                className={styles.photo}
              />
            </a>
          );
        })}
      </Gallery>
      <dialog
        ref={dialog}
        className={styles.photoViewer}
        aria-label="Просмотр фотографий"
        onClose={() => opener.current?.focus()}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className={styles.viewerHeader}>
          <span aria-live="polite">
            {number} / {count}
          </span>
          <button
            type="button"
            className={styles.viewerClose}
            aria-label="Закрыть"
            onClick={() => dialog.current?.close()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div
          className={styles.viewerStage}
          onTouchStart={(event) => {
            touchStart.current = event.touches[0].clientX;
          }}
          onTouchCancel={() => {
            touchStart.current = null;
          }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance =
              event.changedTouches[0].clientX - touchStart.current;
            touchStart.current = null;
            if (Math.abs(distance) < 50) return;
            event.preventDefault();
            move(distance < 0 ? 1 : -1);
          }}
        >
          <img
            key={number}
            src={`${photo(number)}.webp`}
            loading="lazy"
            alt={description(number)}
            className={styles.viewerPhoto}
          />
          <button
            type="button"
            className={styles.viewerPrevious}
            aria-label="Предыдущее фото"
            onClick={() => move(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={styles.viewerNext}
            aria-label="Следующее фото"
            onClick={() => move(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className={layout.actions}>
          <ButtonLink
            softOutline
            size="sm"
            href={`${photo(number)}.webp`}
            download={`${slug}-${number}.webp`}
          >
            Скачать фото
          </ButtonLink>
        </div>
      </dialog>
    </>
  );
}
