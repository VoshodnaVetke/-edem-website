"use client";

import { ButtonLink, Card, Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { siteHref } from "../../config/site-href";
import styles from "../../styles/page-layout.module.css";

const sections = [
  ["my-games", "Мои игры"],
  ["characters", "Персонажи"],
  ["notes", "Заметки"],
  ["results", "Итоги игр"],
];

export default function AccountPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / УЧАСТНИК"
      title="Личный кабинет"
      description="Ваши игры, персонажи и личные заметки. Вход в кабинет пока недоступен, а афиша и архив открыты всем."
    >
      <nav aria-label="Разделы кабинета" className={styles.actions}>
        {sections.map(([id, label]) => (
          <ButtonLink href={`#${id}`} key={id}>
            {label}
          </ButtonLink>
        ))}
      </nav>

      <section aria-labelledby="my-games">
        <Heading level={2} id="my-games" className={styles.sectionHeading}>
          Мои игры
        </Heading>
        <Card frame="double" reveal={false}>
          <div className={styles.cardBody}>
            <Heading level={3}>Ближайшая игра</Heading>
            <Text>
              Анонсы и способы записи доступны в афише. Для просмотра личных
              заявок и статусов участия потребуется вход в кабинет.
            </Text>
            <div className={styles.actions}>
              <ButtonLink href={siteHref("/events")}>Открыть афишу</ButtonLink>
            </div>
          </div>
        </Card>
      </section>

      <section aria-labelledby="characters" className={styles.stack}>
        <Heading level={2} id="characters">
          Мои персонажи
        </Heading>
        <Text>
          В этом разделе предусмотрены роли и выданные организаторами квенты.
          Перед игрой полезно сверить цели персонажа, его связи и сведения,
          которыми он располагает.
        </Text>
      </section>

      <section aria-labelledby="notes" className={styles.stack}>
        <Heading level={2} id="notes">
          Личные заметки
        </Heading>
        <Text>
          Для подготовки удобно записать, чего хочет персонаж, о чём уже
          договорился и что стоит уточнить у организаторов. Пока кабинет
          недоступен, ведите эти записи отдельно.
        </Text>
      </section>

      <section aria-labelledby="results" className={styles.stack}>
        <Heading level={2} id="results">
          Итоги игр
        </Heading>
        <Text>
          В открытом архиве собраны проведённые игры и ссылки на фотоальбомы.
        </Text>
        <div className={styles.actions}>
          <ButtonLink href={siteHref("/games")}>Открыть архив игр</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
