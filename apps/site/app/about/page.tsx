"use client";

import {
  ButtonLink,
  Card,
  Frame,
  GlitchText,
  Heading,
  Reading,
  Text,
} from "@edem/ui";
import { useId } from "react";
import { PageShell } from "../../components/layout/PageShell";
import deployment from "../../config/deployment.json";
import { siteHref } from "../../config/site-href";
import decor from "../../styles/lunatic-decor.module.css";
import layout from "../../styles/page-layout.module.css";
import { GameFormats } from "./GameFormats";
import styles from "./about.module.css";

type TeamStory =
  | { type: "single"; text: string }
  | {
      type: "dialogue";
      lines: readonly { speaker: string; text: string }[];
    }
  | { type: "epitaph"; text: string };

interface TeamMember {
  name: string;
  role: string;
  roleNote?: string;
  portrait?: string;
  portraitPosition?: string;
  story: TeamStory;
  restricted?: boolean;
  vkHref?: string;
}

const team: readonly TeamMember[] = [
  {
    name: "Найт",
    role: "Квентовик · Журналист",
    roleNote: "10% МГ",
    portrait: "/images/games/kazino-mefisa/0141-thumb.webp",
    story: {
      type: "dialogue",
      lines: [
        {
          speaker: "Восход",
          text: "Дело в том, что перед игрой вымерло 90% МГ.",
        },
        { speaker: "Найт", text: "Я не умер…" },
        { speaker: "Восход", text: "Ну так вот, все кроме тебя." },
        { speaker: "Найт", text: "Я 10%? 🥲" },
      ],
    },
  },
  {
    name: "Алина",
    role: "Продюсер",
    portrait: "/images/games/parad-tehnologiy/0064-thumb.webp",
    portraitPosition: "center 33%",
    story: {
      type: "dialogue",
      lines: [
        { speaker: "Восход", text: "Это пиздец, мы отменяем игру." },
        {
          speaker: "Алина",
          text: "Мы не отменяем игру, я уже волосы накрутила!",
        },
      ],
    },
  },
  {
    name: "Лина",
    role: "Художник",
    portrait: "/images/games/kazn-ognya-vechnogo/0587-thumb.webp",
    portraitPosition: "center 43%",
    story: {
      type: "single",
      text: "Давайте без доведения до самоубийства, у нас всё ещё игра 16+.",
    },
  },
  {
    name: "Соня",
    role: "Разработчик приложения, базы данных и экономики Эдема",
    restricted: true,
    story: {
      type: "dialogue",
      lines: [
        { speaker: "Соня", text: "Что такое дефляция?" },
        {
          speaker: "Найт",
          text: "БЛЯТЬ СОНЯЯЯЯ ЗА ЧТО ТЫ ТАК НЕНАВИДИШЬ ЭТО МГ И ЭТИХ ИГРОКОВ???????????????????????????????????????????",
        },
      ],
    },
  },
  {
    name: "Восход",
    role: "ГМ · Госпожа с Помпей",
    portrait: "/images/games/kazino-mefisa/0136-thumb.webp",
    story: { type: "epitaph", text: "САША ЕК" },
    vkHref: "https://vk.ru/alyapyatnitskaya",
  },
];

function MemberStory({ story }: { story: TeamStory }) {
  if (story.type === "epitaph") {
    return (
      <div className={styles.epitaph}>
        <span>{story.text}</span>
      </div>
    );
  }

  return (
    <blockquote className={styles.story}>
      {story.type === "single" ? (
        <p className={styles.storySingle}>{story.text}</p>
      ) : (
        story.lines.map(({ speaker, text }, index) => (
          <p
            key={`${speaker}-${index}`}
            className={`${styles.storyLine} ${index === story.lines.length - 1 ? styles.storyPunchline : ""}`}
          >
            <strong>{speaker}:</strong> {text}
          </p>
        ))
      )}
    </blockquote>
  );
}

function VkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.71 13.95h-1.36c-.51 0-.66-.41-1.58-1.32-.8-.78-1.15-.88-1.35-.88-.27 0-.35.08-.35.46v1.23c0 .33-.11.53-.98.53-1.44 0-3.05-.87-4.17-2.49-1.69-2.36-2.15-4.13-2.15-4.49 0-.2.08-.38.47-.38h1.36c.35 0 .48.15.61.51.67 1.94 1.79 3.63 2.25 3.63.17 0 .25-.08.25-.5v-1.95c-.05-.89-.52-.96-.52-1.27 0-.15.13-.3.34-.3h2.14c.29 0 .38.15.38.49v2.63c0 .29.13.38.2.38.17 0 .32-.09.64-.41.98-1.1 1.69-2.79 1.69-2.79.09-.2.25-.38.6-.38h1.36c.41 0 .49.21.41.49-.17.8-1.83 3.13-1.83 3.13-.15.24-.2.34 0 .6.15.2.62.61.94.99.58.65 1.03 1.2 1.15 1.57.12.38-.08.57-.48.57z" />
    </svg>
  );
}

function PortraitSymbol() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="24" cy="17" r="6" />
      <path d="M11 37a13 13 0 0 1 26 0M3 13V3h10m22 0h10v10m0 22v10H35m-22 0H3V35" />
    </svg>
  );
}

function MemberPortrait({
  src,
  position,
}: {
  src?: string;
  position?: string;
}) {
  const clipId = useId();
  return (
    <figure className={styles.portrait} aria-hidden="true">
      <div
        className={styles.portraitMedia}
        style={{ clipPath: `url("#${clipId}")` }}
      >
        {src ? (
          <img
            src={`${deployment.basePath}${src}`}
            alt=""
            loading="lazy"
            decoding="async"
            style={position ? { objectPosition: position } : undefined}
          />
        ) : (
          <PortraitSymbol />
        )}
      </div>
      <Frame variant="asym" mediaClipId={clipId} />
    </figure>
  );
}

export default function AboutPage() {
  return (
    <PageShell
      title="Мастерская группа «Эдем»"
      headerClassName={styles.hero}
      intro={
        <>
          <Frame />
          <Reading className={styles.intro}>
            <Text variant="lead">
              Мы создаём и проводим ролевые игры, в которых{" "}
              <strong className={styles.introAccent}>свобода действий</strong>{" "}
              сочетается с проработанными механиками.
            </Text>
            <Text>
              Для нас механики — не просто дополнение к отыгрышу, а полноценная
              часть игрового мира. Мы разрабатываем{" "}
              <strong>собственные системы</strong> и даже создали приложение,
              позволяющее реализовать всё: от имплантов и технологий до
              экономики и торговли акциями.
            </Text>
          </Reading>
        </>
      }
    >
      <section aria-labelledby="about-formats">
        <GameFormats />
      </section>

      <section
        aria-labelledby="about-team"
        className={`${decor.backdrop} ${decor.modular}`}
      >
        <Heading id="about-team" className={styles.sectionTitle}>
          Наша команда
        </Heading>
        <div className={`${layout.stack} ${styles.teamList}`}>
          {team.map(
            ({
              name,
              role,
              roleNote,
              portrait,
              portraitPosition,
              story,
              restricted,
              vkHref,
            }) => (
              <Card
                key={name}
                className={`${styles.member} ${restricted ? styles.restrictedMember : ""}`}
                telemetry
                frame="asym"
              >
                {restricted ? (
                  <div className={styles.restrictedPortrait}>
                    <GlitchText className={styles.errorCode}>
                      ERROR 403
                    </GlitchText>
                    <Text variant="system">
                      Доступ к внешности владельца ограничен.
                    </Text>
                    <Frame variant="asym" />
                  </div>
                ) : (
                  <MemberPortrait src={portrait} position={portraitPosition} />
                )}
                <div className={styles.profile}>
                  <Heading level={3}>{name}</Heading>
                  <div className={styles.roleLine}>
                    <Text>{role}</Text>
                    {roleNote && (
                      <span className={styles.roleNote}>{roleNote}</span>
                    )}
                  </div>
                  <MemberStory story={story} />
                  {vkHref && (
                    <a
                      className={styles.vkLink}
                      href={vkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Саша Пятницкая во ВКонтакте (новая вкладка)"
                    >
                      <VkIcon />
                      <span>Саша Пятницкая</span>
                    </a>
                  )}
                </div>
              </Card>
            ),
          )}
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="about-contact">
        <Frame />
        <Heading id="about-contact" className={styles.sectionTitle}>
          Создадим игру вместе
        </Heading>
        <div className={layout.actions}>
          <ButtonLink href={siteHref("/order")}>Заказать игру</ButtonLink>
          <ButtonLink href={siteHref("/collaboration")}>
            Сотрудничество
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
