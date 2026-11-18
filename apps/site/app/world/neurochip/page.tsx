"use client";

import { ButtonLink, Card, Grid, Heading, Reading, Text } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
import { siteHref } from "../../../config/site-href";
import styles from "../../../styles/page-layout.module.css";

const contents = [
  ["chip", "Что такое нейрочип"],
  ["rating", "Как работает социальный рейтинг"],
  ["rights", "Права и ограничения"],
  ["related", "Связанные темы"],
];

export default function NeurochipArticle() {
  return (
    <PageShell
      eyebrow="ВСЕЛЕННАЯ / ОБЩЕСТВО"
      title="Социальный рейтинг и нейрочип"
      description="Как в Эдеме удостоверяют личность и какие возможности зависят от социального рейтинга. Общеизвестные сведения о мире."
    >
      <Grid>
        <nav aria-label="Оглавление статьи" className="edem-span--aside">
          <Card telemetry frame="double" reveal={false}>
            <div className={styles.cardBody}>
              <Heading level={2}>На этой странице</Heading>
              <ul className={styles.jumpLinks}>
                {contents.map(([id, label]) => (
                  <li key={id}>
                    <a href={`#${id}`}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </nav>

        <article
          aria-label="Социальный рейтинг и нейрочип"
          className={`edem-span--intro ${styles.stack}`}
        >
          <Reading>
            <section aria-labelledby="chip">
              <Heading level={2} id="chip">
                Что такое нейрочип
              </Heading>
              <p>
                Каждому гражданину Эдема при рождении имплантируют нейрочип. Он
                удостоверяет цифровую личность, помогает пользоваться
                государственной инфраструктурой и связывает гражданина с
                системой социального рейтинга.
              </p>
            </section>

            <section aria-labelledby="rating">
              <Heading level={2} id="rating">
                Как работает социальный рейтинг
              </Heading>
              <p>
                При обнаружении административного нарушения, которое распознаёт
                система, рейтинг меняется автоматически. Гражданин может
                обжаловать взыскание.
              </p>
              <ul className={styles.steps}>
                <li>
                  <strong>300 баллов</strong> дают право голосовать.
                </li>
                <li>
                  <strong>700 баллов</strong> дают право избираться.
                </li>
              </ul>
            </section>

            <section aria-labelledby="rights">
              <Heading level={2} id="rights">
                Права и ограничения
              </Heading>
              <p>
                Лицензии на транспорт и некоторые устройства привязаны к
                цифровой личности. При недостаточном рейтинге разрешение могут
                отозвать.
              </p>
            </section>
          </Reading>

          <Card telemetry frame="asym" reveal={false}>
            <div className={styles.cardBody}>
              <Heading level={2}>Что известно персонажу</Heading>
              <Text>
                В статье собраны общие правила Эдема. Осведомлённость
                конкретного персонажа определяют материалы его игры.
              </Text>
            </div>
          </Card>

          <section aria-labelledby="related" className={styles.stack}>
            <Heading level={2} id="related">
              Связанные темы
            </Heading>
            <div className={styles.actions}>
              <ButtonLink href={siteHref("/world") + "#power"}>
                Власть и государство
              </ButtonLink>
              <ButtonLink href={siteHref("/world") + "#daily-life"}>
                Повседневная жизнь
              </ButtonLink>
              <ButtonLink href={siteHref("/world")}>К обзору мира</ButtonLink>
            </div>
          </section>
        </article>
      </Grid>
    </PageShell>
  );
}
