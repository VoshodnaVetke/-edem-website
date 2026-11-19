"use client";

import { Card, Grid, Heading, Text } from "@edem/ui";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./about.module.css";

const formats = [
  {
    id: "chamber",
    title: "Кабинетные ролевые игры",
    symbol: "M4 8h16v10H4zM8 18v3m8-3v3M7 4h4m2 0h4M8 12h8m-6 3h4",
    summary: "Интриги, политика, экономика и игровые механики.",
    description: [
      "Наш основной формат для тех, кто любит погружаться в интриги, политику, экономику и сложные игровые механики. Переговоры, союзы и конфликты интересов переплетаются в одну историю, а решения персонажей меняют расстановку сил.",
      "Обычно наши кабинки проходят в Москве и длятся 2–3 часа.",
    ],
  },
  {
    id: "field",
    title: "Полигонные ролевые игры",
    symbol: "M12 2v5m0 10v5M2 12h5m10 0h5M5 5h14v14H5zM9 12l3-3 3 3-3 3z",
    summary: "Боёвка, тактика и командные задачи.",
    description: [
      "Игры с упором на боёвку, тактику и активные действия: перестрелки, захват точек и противостояние группировок в рамках игрового сюжета.",
      "Проводим как короткие игры на полигонах Москвы и Подмосковья, так и многодневные выезды. В том числе организуем страйкбольные и пейнтбольные игры.",
    ],
  },
  {
    id: "tabletop",
    title: "Настольные ролевые игры (НРИ)",
    symbol: "m12 2 9 5v10l-9 5-9-5V7zM3 7l9 15 9-15H3l9-5 9 5M3 17h18",
    summary: "Приключения и развитие персонажей.",
    description: [
      "Приключения с ведущим в духе D&D, где можно глубже раскрыть своего персонажа, исследовать мир и прожить собственную историю.",
      "В играх по вселенной Эдема развитие персонажа и принятые решения могут отразиться на его положении в других играх и повлиять на события общего мира.",
    ],
  },
  {
    id: "ball",
    title: "Ролевые балы",
    symbol:
      "M12 2c0 6 4 10 10 10-6 0-10 4-10 10 0-6-4-10-10-10 6 0 10-4 10-10zM19 3v4m-2-2h4",
    summary: "Танцы, общение и атмосфера.",
    description: [
      "Возможность провести вечер в образе своего персонажа: потанцевать, пообщаться, сделать красивые фотографии и погрузиться в атмосферу игрового мира.",
      "Здесь меньше сложных механик и напряжённых интриг. Главное — провести время в компании, насладиться атмосферой и непринуждённым отыгрышем.",
    ],
  },
] as const;

type FormatId = (typeof formats)[number]["id"];
const multiColumnQuery = "(min-width: 41rem)";

function subscribeToGrid(change: () => void) {
  const media = window.matchMedia(multiColumnQuery);
  media.addEventListener("change", change);
  return () => media.removeEventListener("change", change);
}

export function GameFormats() {
  const [openId, setOpenId] = useState<FormatId | null>(null);
  const multiColumn = useSyncExternalStore(
    subscribeToGrid,
    () => window.matchMedia(multiColumnQuery).matches,
    () => false,
  );
  const cards = useRef(new Map<FormatId, HTMLElement>());
  const previousRects = useRef(new Map<FormatId, DOMRect>());
  const focusedToggle = useRef<HTMLButtonElement | null>(null);

  const active = multiColumn && formats.find(({ id }) => id === openId);
  const ordered = active
    ? [active, ...formats.filter(({ id }) => id !== active.id)]
    : formats;

  function toggle(id: FormatId, button: HTMLButtonElement) {
    focusedToggle.current = document.activeElement === button ? button : null;
    previousRects.current.clear();
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      for (const [key, card] of cards.current) {
        previousRects.current.set(key, card.getBoundingClientRect());
      }
    }
    setOpenId(openId === id ? null : id);
  }

  useLayoutEffect(() => {
    // Moving a focused disclosure in the DOM can drop native focus.
    focusedToggle.current?.focus({ preventScroll: true });
    focusedToggle.current = null;

    const animations: Animation[] = [];
    for (const [id, card] of cards.current) {
      const from = previousRects.current.get(id);
      if (!from) continue;

      const to = card.getBoundingClientRect();
      const x = from.left - to.left;
      const y = from.top - to.top;
      const widthChanged = Math.abs(from.width - to.width) > 1;
      if (!widthChanged && Math.abs(x) < 1 && Math.abs(y) < 1) continue;

      const start = `translate(${x}px, ${y}px)`;
      // Compact cards crossing a row break slide out to the right and enter from the left.
      const keyframes =
        multiColumn && openId && !widthChanged && y < -1
          ? [
              { transform: start, opacity: 1 },
              {
                transform: `translate(${x + 12}px, ${y}px)`,
                opacity: 0,
                offset: 0.4,
              },
              { transform: "translateX(-12px)", opacity: 0, offset: 0.55 },
              { transform: "none", opacity: 1 },
            ]
          : [
              { transform: start, inlineSize: `${from.width}px` },
              { transform: "none", inlineSize: `${to.width}px` },
            ];
      animations.push(
        card.animate(keyframes, {
          duration: 340,
          easing: "cubic-bezier(0.2, 0.75, 0.25, 1)",
        }),
      );
    }
    previousRects.current.clear();
    return () => animations.forEach((animation) => animation.cancel());
  }, [multiColumn, openId]);

  return (
    <Grid className={styles.formats}>
      {ordered.map(({ id, title, symbol, summary, description }) => {
        const expanded = openId === id;
        const label = `format-${id}`;
        return (
          <div key={id} className={styles.formatSlot} data-expanded={expanded}>
            <Card
              ref={(card) => {
                if (card) cards.current.set(id, card);
                else cards.current.delete(id);
              }}
              className={styles.formatCard}
            >
              <Heading level={3} className={styles.formatHeading}>
                <button
                  type="button"
                  className={styles.toggle}
                  id={`${label}-toggle`}
                  aria-expanded={expanded}
                  aria-controls={`${label}-panel`}
                  aria-labelledby={label}
                  aria-describedby={`${label}-summary`}
                  onClick={(event) => toggle(id, event.currentTarget)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden="true"
                  >
                    <path d={symbol} />
                  </svg>
                  <span id={label}>{title}</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={styles.indicator}
                    aria-hidden="true"
                  >
                    <path d="M3 8h10" />
                    <path d="M8 3v10" className={styles.indicatorVertical} />
                  </svg>
                </button>
              </Heading>
              <Text id={`${label}-summary`} className={styles.summary}>
                {summary}
              </Text>
              <div
                id={`${label}-panel`}
                hidden={!expanded}
                className={styles.panel}
              >
                {description.map((paragraph) => (
                  <Text key={paragraph}>{paragraph}</Text>
                ))}
              </div>
            </Card>
          </div>
        );
      })}
    </Grid>
  );
}
