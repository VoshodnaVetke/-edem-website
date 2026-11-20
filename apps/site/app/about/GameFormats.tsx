"use client";

import { Button, Card, Grid, Heading, Text } from "@edem/ui";
import deployment from "../../config/deployment.json";
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
    icon: "chamber",
    summary: "Интриги, политика, экономика и игровые механики.",
    description: [
      "Наш основной формат для тех, кто любит погружаться в интриги, политику, экономику и сложные игровые механики. Переговоры, союзы и конфликты интересов переплетаются в одну историю, а решения персонажей меняют расстановку сил.",
      "Обычно наши кабинки проходят в Москве и длятся 2–3 часа.",
    ],
  },
  {
    id: "field",
    title: "Полигонные ролевые игры",
    icon: "field",
    summary: "Боёвка, тактика и командные задачи.",
    description: [
      "Игры с упором на боёвку, тактику и активные действия: перестрелки, захват точек и противостояние группировок в рамках игрового сюжета.",
      "Проводим как короткие игры на полигонах Москвы и Подмосковья, так и многодневные выезды. В том числе организуем страйкбольные и пейнтбольные игры.",
    ],
  },
  {
    id: "tabletop",
    title: "Настольные ролевые игры (НРИ)",
    icon: "tabletop",
    summary: "Приключения и развитие персонажей.",
    description: [
      "Приключения с ведущим в духе D&D, где можно глубже раскрыть своего персонажа, исследовать мир и прожить собственную историю.",
      "В играх по вселенной Эдема развитие персонажа и принятые решения могут отразиться на его положении в других играх и повлиять на события общего мира.",
    ],
  },
  {
    id: "ball",
    title: "Ролевые балы",
    icon: "ball",
    summary: "Танцы, общение и атмосфера.",
    description: [
      "Возможность провести вечер в образе своего персонажа: потанцевать, пообщаться, сделать красивые фотографии и погрузиться в атмосферу игрового мира.",
      "Здесь меньше сложных механик и напряжённых интриг. Главное — провести время в компании, насладиться атмосферой и непринуждённым отыгрышем.",
    ],
  },
] as const;

type FormatId = (typeof formats)[number]["id"];
const initialDelay = 250;
const rotationDelay = 9000;
const layoutMotion = {
  duration: 580,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
};
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
  const [focused, setFocused] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const group = useRef<HTMLDivElement>(null);
  const cards = useRef(new Map<FormatId, HTMLElement>());
  const previousGroupHeight = useRef<number | undefined>(undefined);
  const previousRects = useRef(new Map<FormatId, DOMRect>());
  const focusedToggle = useRef<HTMLButtonElement | null>(null);

  const active = multiColumn && formats.find(({ id }) => id === openId);
  const ordered = active
    ? [active, ...formats.filter(({ id }) => id !== active.id)]
    : formats;

  const open = useCallback((id: FormatId | null) => {
    previousRects.current.clear();
    previousGroupHeight.current = undefined;
    if (window.matchMedia(motionQuery).matches) {
      previousGroupHeight.current =
        group.current?.getBoundingClientRect().height;
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
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !motionAllowed || !inView || focused) return;
    const timeout = window.setTimeout(
      () => {
        const index = formats.findIndex(({ id }) => id === openId);
        open(formats[(index + 1) % formats.length].id);
      },
      openId === null ? initialDelay : rotationDelay,
    );
    return () => window.clearTimeout(timeout);
  }, [playing, motionAllowed, inView, focused, open, openId]);

  function toggle(id: FormatId, button: HTMLButtonElement) {
    setPlaying(false);
    focusedToggle.current = document.activeElement === button ? button : null;
    open(openId === id ? null : id);
  }

  useLayoutEffect(() => {
    // Moving a focused disclosure in the DOM can drop native focus.
    focusedToggle.current?.focus({ preventScroll: true });
    focusedToggle.current = null;

    const container = group.current;
    const fromHeight = previousGroupHeight.current;
    const toHeight = container?.getBoundingClientRect().height;
    previousGroupHeight.current = undefined;

    // Read the new layout before starting any animations that change its size.
    const cardsToMove = [...cards.current].flatMap(([id, card]) => {
      const from = previousRects.current.get(id);
      return from ? [{ card, from, to: card.getBoundingClientRect() }] : [];
    });
    const animations: Animation[] = [];
    for (const { card, from, to } of cardsToMove) {
      const x = from.left - to.left;
      const y = from.top - to.top;
      const widthChanged = Math.abs(from.width - to.width) > 1;
      const heightChanged = Math.abs(from.height - to.height) > 1;
      if (!widthChanged && !heightChanged && Math.abs(x) < 1 && Math.abs(y) < 1)
        continue;

      animations.push(
        card.animate(
          [
            {
              transform: `translate(${x}px, ${y}px)`,
              inlineSize: `${from.width}px`,
              blockSize: `${from.height}px`,
              overflow: "clip",
            },
            {
              transform: "none",
              inlineSize: `${to.width}px`,
              blockSize: `${to.height}px`,
              overflow: "clip",
            },
          ],
          layoutMotion,
        ),
      );
    }
    if (
      container &&
      fromHeight !== undefined &&
      toHeight !== undefined &&
      Math.abs(fromHeight - toHeight) > 1
    ) {
      animations.push(
        container.animate(
          { blockSize: [`${fromHeight}px`, `${toHeight}px`] },
          layoutMotion,
        ),
      );
    }
    previousRects.current.clear();
    return () => animations.forEach((animation) => animation.cancel());
  }, [multiColumn, openId]);

  return (
    <div ref={group}>
      <div className={styles.formatToolbar}>
        <Heading id="about-formats" className={styles.sectionTitle}>
          Что мы проводим
        </Heading>
        {motionAllowed && (
          <Button
            className={styles.rotation}
            size="sm"
            selected={playing}
            onClick={() => setPlaying((current) => !current)}
          >
            Автопоказ
          </Button>
        )}
      </div>
      <Grid
        className={styles.formats}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        {ordered.map(({ id, title, icon, summary, description }) => {
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
                    <span className={styles.formatIcon} aria-hidden="true">
                      <picture>
                        <source
                          media="(prefers-reduced-motion: reduce)"
                          srcSet={`${deployment.basePath}/images/about/${icon}.png`}
                        />
                        <img
                          src={`${deployment.basePath}/images/about/${icon}.gif`}
                          alt=""
                          width={80}
                          height={80}
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    </span>
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
