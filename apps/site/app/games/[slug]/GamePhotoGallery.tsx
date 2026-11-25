"use client";

import { SiteTriangle } from "../../../components/layout/SiteTriangle";
import { ButtonLink, Gallery } from "@edem/ui";
import { useRef, useState } from "react";
import adNaZemleOrder from "../../../config/ad-na-zemle-photo-order.json";
import kazinoMefisaOrder from "../../../config/kazino-mefisa-photo-order.json";
import kaznOgnyaVechnogoOrder from "../../../config/kazn-ognya-vechnogo-photo-order.json";
import paradTehnologiyOrder from "../../../config/parad-tehnologiy-photo-order.json";
import teniVostochnogoGorodaOrder from "../../../config/teni-vostochnogo-goroda-photo-order.json";
import layout from "../../../styles/page-layout.module.css";
import styles from "../games.module.css";

const photoOrders: Partial<Record<string, number[]>> = {
  "ad-na-zemle": adNaZemleOrder,
  "kazino-mefisa": kazinoMefisaOrder,
  "kazn-ognya-vechnogo": kaznOgnyaVechnogoOrder,
  "parad-tehnologiy": paradTehnologiyOrder,
  "teni-vostochnogo-goroda": teniVostochnogoGorodaOrder,
};

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
  const order = photoOrders[slug];
  const photo = (index: number) => {
    const originalIndex = order ? order[index - 1] : index;
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
            <SiteTriangle direction="left" />
          </button>
          <button
            type="button"
            className={styles.viewerNext}
            aria-label="Следующее фото"
            onClick={() => move(1)}
          >
            <SiteTriangle direction="right" />
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
