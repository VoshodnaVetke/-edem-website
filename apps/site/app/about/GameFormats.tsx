"use client";

import { Button, Card, Grid, Heading, Text } from "@edem/ui";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import styles from "./about.module.css";

const formats = [
  {
    id: "chamber",
    title: "Кабинетные ролевые игры",
    symbol:
      "M3 9h18v6H3zM8 9V7a2 2 0 0 1 4 0v2m0 6v2a2 2 0 0 0 4 0v-2M5 15v4m14-4v4",
    summary: "Интриги, политика, экономика и игровые механики.",
    description: [
      "Наш основной формат для тех, кто любит погружаться в интриги, политику, экономику и сложные игровые механики. Переговоры, союзы и конфликты интересов переплетаются в одну историю, а решения персонажей меняют расстановку сил.",
      "Обычно наши кабинки проходят в Москве и длятся 2–3 часа.",
    ],
  },
  {
    id: "field",
    title: "Полигонные ролевые игры",
    symbol:
      "m2 6 6-3 8 3 6-3v15l-6 3-8-3-6 3zM8 3v15m8-12v15M5 14l5-4 5 3 4-5m-3 0h3v3",
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
const rotationDelay = 9000;
const motionQuery = "(prefers-reduced-motion: no-preference)";
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
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const group = useRef<HTMLDivElement>(null);
  const cards = useRef(new Map<FormatId, HTMLElement>());
  const previousRects = useRef(new Map<FormatId, DOMRect>());
  const focusedToggle = useRef<HTMLButtonElement | null>(null);

  const active = multiColumn && formats.find(({ id }) => id === openId);
  const ordered = active
    ? [active, ...formats.filter(({ id }) => id !== active.id)]
    : formats;

  const open = useCallback((id: FormatId | null) => {
    previousRects.current.clear();
    if (window.matchMedia(motionQuery).matches) {
      for (const [key, card] of cards.current) {
        previousRects.current.set(key, card.getBoundingClientRect());
      }
    }
    setOpenId(id);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia(motionQuery);
    const sync = () => setMotionAllowed(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = group.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !motionAllowed || !inView || hovered || focused) return;
    const timeout = window.setTimeout(() => {
      const index = formats.findIndex(({ id }) => id === openId);
      open(formats[(index + 1) % formats.length].id);
    }, rotationDelay);
    return () => window.clearTimeout(timeout);
  }, [playing, motionAllowed, inView, hovered, focused, open, openId]);

  function toggle(id: FormatId, button: HTMLButtonElement) {
    setPlaying(false);
    focusedToggle.current = document.activeElement === button ? button : null;
    open(openId === id ? null : id);
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
      const keyframes = [
        { transform: start, inlineSize: `${from.width}px` },
        { transform: "none", inlineSize: `${to.width}px` },
      ];
      animations.push(
        card.animate(keyframes, {
          duration: 660,
          easing: "cubic-bezier(0.35, 0, 0.2, 1)",
        }),
      );
    }
    previousRects.current.clear();
    return () => animations.forEach((animation) => animation.cancel());
  }, [multiColumn, openId]);

  return (
    <div ref={group}>
      {motionAllowed && (
        <div className={styles.rotation}>
          <Button size="sm" onClick={() => setPlaying(!playing)}>
            {playing ? "Остановить автопоказ" : "Включить автопоказ"}
          </Button>
        </div>
      )}
      <Grid
        className={styles.formats}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        {ordered.map(({ id, title, symbol, summary, description }) => {
          const expanded = openId === id;
          const label = `format-${id}`;
          return (
            <div
              key={id}
              className={styles.formatSlot}
              data-expanded={expanded}
            >
              <Card
                ref={(card) => {
                  if (card) cards.current.set(id, card);
                  else cards.current.delete(id);
                }}
                className={styles.formatCard}
                accent={id === "field" || id === "ball" ? "violet" : "cyan"}
                telemetry
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
    </div>
  );
}
