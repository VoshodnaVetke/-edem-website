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

type Format = (typeof formats)[number];
type FormatId = Format["id"];
const initialDelay = 250;
const rotationDelay = 9000;
const fadeOutDuration = 120;
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
  const [mobileFeaturedId, setMobileFeaturedId] = useState<FormatId | null>(
    null,
  );
  const [inView, setInView] = useState(false);
  const [focused, setFocused] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const group = useRef<HTMLDivElement>(null);
  const firstSlot = useRef<HTMLDivElement>(null);
  const featuredCopy = useRef<HTMLDivElement>(null);
  const cards = useRef(new Map<FormatId, HTMLElement>());
  const previousGroupHeight = useRef<number | undefined>(undefined);
  const previousRects = useRef(new Map<FormatId, DOMRect>());
  const focusedToggle = useRef<HTMLButtonElement | null>(null);

  const mobileAutoplay = !multiColumn && motionAllowed && playing;
  const featuredId = mobileAutoplay
    ? (openId ?? mobileFeaturedId ?? formats[0].id)
    : mobileFeaturedId;
  const firstId = multiColumn ? openId : featuredId;
  const first = formats.find(({ id }) => id === firstId);
  const ordered = first
    ? [first, ...formats.filter(({ id }) => id !== first.id)]
    : formats;
  const expandedId = mobileAutoplay ? featuredId : openId;
  const keepMobileSlots =
    !multiColumn &&
    (mobileAutoplay || (featuredId !== null && expandedId === featuredId));

  const open = useCallback(
    (id: FormatId | null) => {
      previousRects.current.clear();
      previousGroupHeight.current = undefined;
      if (multiColumn && window.matchMedia(motionQuery).matches) {
        previousGroupHeight.current =
          group.current?.getBoundingClientRect().height;
        for (const [key, card] of cards.current) {
          previousRects.current.set(key, card.getBoundingClientRect());
        }
      }
      setOpenId(id);
    },
    [multiColumn],
  );

  useEffect(() => {
    const preference = window.matchMedia(motionQuery);
    const sync = () => setMotionAllowed(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = multiColumn ? group.current : firstSlot.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const minimumVisible = multiColumn ? 0 : 0.4;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(
          entry.isIntersecting && entry.intersectionRatio >= minimumVisible,
        );
      },
      { threshold: minimumVisible },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [multiColumn]);

  useEffect(() => {
    if (!playing || !motionAllowed || !inView || focused) return;
    let swap: number | undefined;
    let fade: Animation | undefined;
    const timeout = window.setTimeout(
      () => {
        const index = formats.findIndex(({ id }) => id === expandedId);
        const next = formats[(index + 1) % formats.length].id;
        if (mobileAutoplay && featuredCopy.current) {
          fade = featuredCopy.current.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            {
              duration: fadeOutDuration,
              easing: "ease-in",
              fill: "forwards",
            },
          );
          swap = window.setTimeout(() => open(next), fadeOutDuration);
        } else {
          open(next);
        }
      },
      expandedId === null ? initialDelay : rotationDelay,
    );
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(swap);
      fade?.cancel();
    };
  }, [
    playing,
    motionAllowed,
    inView,
    focused,
    open,
    expandedId,
    mobileAutoplay,
  ]);

  function toggle(id: FormatId, button: HTMLButtonElement) {
    if (mobileAutoplay) setMobileFeaturedId(featuredId);
    setPlaying(false);
    focusedToggle.current = document.activeElement === button ? button : null;
    open(expandedId === id ? null : id);
  }

  function toggleAutoplay() {
    if (mobileAutoplay) {
      setMobileFeaturedId(featuredId);
      setOpenId(expandedId);
    }
    setPlaying(!playing);
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
            onClick={toggleAutoplay}
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
        {ordered.map((format, index) => {
          const { id, title, icon, summary } = format;
          const expanded = expandedId === id;
          const featured = mobileAutoplay && index === 0;
          const label = `format-${id}`;
          return (
            <div
              key={multiColumn ? id : index}
              ref={index === 0 ? firstSlot : undefined}
              className={styles.formatSlot}
              data-expanded={expanded}
            >
              <Card
                ref={
                  multiColumn
                    ? (card) => {
                        if (card) cards.current.set(id, card);
                        else cards.current.delete(id);
                      }
                    : undefined
                }
                className={styles.formatCard}
                telemetry
              >
                <div
                  className={keepMobileSlots ? styles.formatLayers : undefined}
                >
                  {keepMobileSlots && (
                    <FormatSizeGuide expanded={index === 0} />
                  )}
                  <div
                    key={id}
                    ref={featured ? featuredCopy : undefined}
                    className={featured ? styles.featuredCopy : undefined}
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
                      <FormatDescription format={format} />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </Grid>
    </div>
  );
}

// Size the slots against every format at the current width and text size.
function FormatSizeGuide({ expanded }: { expanded: boolean }) {
  return (
    <div
      className={`${styles.formatLayers} ${styles.formatSizeGuide}`}
      aria-hidden="true"
    >
      {formats.map((format) => (
        <div key={format.id}>
          <Heading level={3} className={styles.formatHeading}>
            <span className={styles.toggle}>
              <span className={styles.formatIcon} />
              <span>{format.title}</span>
            </span>
          </Heading>
          <Text className={styles.summary}>{format.summary}</Text>
          <div hidden={!expanded} className={styles.panel}>
            {expanded && <FormatDescription format={format} />}
          </div>
        </div>
      ))}
    </div>
  );
}

function FormatDescription({ format }: { format: Format }) {
  return format.description.map((paragraph) => (
    <Text key={paragraph}>{paragraph}</Text>
  ));
}
