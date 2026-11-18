"use client";

import { Button, ButtonLink, Gallery } from "@edem/ui";
import { useRef, useState } from "react";
import layout from "../../../styles/page-layout.module.css";
import styles from "../games.module.css";

const oneArchive = {
  "ad-na-zemle": "1TbiFYoUMrNNuXxbYz1vAl5-pIfGbV8hf",
  "kazino-mefisa": "1ExHcSsyM2R-5S1q1NhD9ZRsnnrhubkiG",
  "parad-tehnologiy": "1qw0QXaWZ97yKEaE20K0cnjmoWr5kNVTD",
  "teni-vostochnogo-goroda": "1HjLxMeg577g0-Gt05aa1oKdd2IpSNQWo",
} as const;

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
  const photo = (index: number) =>
    `${folder}/${String(index).padStart(4, "0")}`;
  const description = (index: number) => `«${title}», фото ${index}`;
  const move = (step: number) =>
    setNumber((current) => ((current - 1 + step + count) % count) + 1);

  // The two original archives were imported in photographer order.
  const archive =
    slug === "kazn-ognya-vechnogo"
      ? number <= 537
        ? "1y63PtFqK2Ebd2UN1H7aVUjC5gFX3oFX1"
        : "1l_i1Vi31mpF_QmIkZAqp5YfzPajM6_M0"
      : oneArchive[slug as keyof typeof oneArchive];

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
          <Button size="sm" onClick={() => dialog.current?.close()}>
            Закрыть
          </Button>
        </div>
        <img
          key={number}
          src={`${photo(number)}.webp`}
          loading="lazy"
          alt={description(number)}
          className={styles.viewerPhoto}
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
            if (Math.abs(distance) >= 50) move(distance < 0 ? 1 : -1);
          }}
        />
        <div className={layout.actions}>
          <Button size="sm" onClick={() => move(-1)}>
            Назад
          </Button>
          <Button size="sm" onClick={() => move(1)}>
            Вперёд
          </Button>
          <ButtonLink
            size="sm"
            href={`${photo(number)}.webp`}
            download={`${slug}-${number}.webp`}
          >
            Скачать фото
          </ButtonLink>
          {archive && (
            <ButtonLink
              size="sm"
              href={`https://drive.google.com/file/d/${archive}/view`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Архив оригиналов на Google Диске
            </ButtonLink>
          )}
        </div>
      </dialog>
    </>
  );
}
