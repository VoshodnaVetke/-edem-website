"use client";

import { ButtonLink, Card, GlitchText, Heading, Reading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import deployment from "../../config/deployment.json";
import { siteHref } from "../../config/site-href";
import layout from "../../styles/page-layout.module.css";
import { GameFormats } from "./GameFormats";
import styles from "./about.module.css";

interface TeamMember {
  name: string;
  role: string;
  portrait?: string;
  quote?: string;
  restricted?: boolean;
}

const team: readonly TeamMember[] = [
  { name: "Восход", role: "ГМ · Госпожа с Помпей" },
  { name: "Найт", role: "Квентовик · Журналист" },
  { name: "Алина", role: "Продюсер" },
  { name: "Лина", role: "Художник" },
  {
    name: "Соня",
    role: "Механик · Разработчик приложения и базы данных Эдема",
    restricted: true,
  },
];

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

export default function AboutPage() {
  return (
    <PageShell
      title="Мастерская группа «Эдем»"
      headerClassName={styles.hero}
      intro={
        <Reading className={styles.intro}>
          <Text variant="lead">
            Мы создаём и проводим ролевые игры, в которых свобода действий
            сочетается с проработанными механиками.
          </Text>
          <Text>
            Для нас механики — не просто дополнение к отыгрышу, а полноценная
            часть игрового мира. Мы разрабатываем собственные системы и даже
            создали приложение, позволяющее реализовать всё: от имплантов и
            технологий до экономики и торговли акциями.
          </Text>
        </Reading>
      }
    >
      <section aria-labelledby="about-formats">
        <GameFormats />
      </section>

      <section aria-labelledby="about-team">
        <Heading id="about-team" className={styles.sectionTitle}>
          Наша команда
        </Heading>
        <div className={layout.stack}>
          {team.map(({ name, role, portrait, quote, restricted }) => (
            <Card
              key={name}
              className={styles.member}
              telemetry
              accent={restricted ? "violet" : "cyan"}
            >
              {restricted ? (
                <div className={styles.restrictedPortrait}>
                  <span className={styles.interference} aria-hidden="true">
                    <PortraitSymbol />
                  </span>
                  <GlitchText className={styles.errorCode}>
                    ERROR 403
                  </GlitchText>
                  <Text variant="system">
                    Доступ к внешности владельца ограничен.
                  </Text>
                </div>
              ) : (
                <div className={styles.portrait} aria-hidden="true">
                  {portrait ? (
                    <img
                      src={`${deployment.basePath}${portrait}`}
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <PortraitSymbol />
                  )}
                </div>
              )}
              <div className={styles.profile}>
                <Heading level={3}>{name}</Heading>
                <Text>{role}</Text>
                {quote && (
                  <blockquote className={styles.quote}>
                    <Text>{quote}</Text>
                  </blockquote>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="about-contact">
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
