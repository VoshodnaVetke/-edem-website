"use client";

import { Card, Grid, Heading, LinkCard, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import decor from "../../styles/lunatic-decor.module.css";
import styles from "../../styles/page-layout.module.css";

export default function CollaborationPage() {
  return (
    <PageShell
      headerClassName={`${decor.header} ${decor.signal} ${decor.fullHeader}`}
      eyebrow="ЭДЕМ / СОТРУДНИЧЕСТВО"
      title="Сотрудничество"
      description="Для авторов ролевых игр, мастерских групп и организаторов, которые хотят сделать совместный проект."
    >
      <section aria-labelledby="partnerships">
        <Heading level={2} id="partnerships" className={styles.sectionHeading}>
          Варианты сотрудничества
        </Heading>
        <Grid>
          <LinkCard
            telemetry
            href="#proposal"
            frame="double"
            className="edem-span--half"
          >
            <div className={styles.cardBody}>
              <Heading level={3}>Создавайте игры</Heading>
              <Text>
                Если у вас есть идея, сценарий или механика, расскажите, на
                какой стадии работа и в чём хотите объединить усилия.
              </Text>
              <Text variant="system">Подготовить предложение об игре</Text>
            </div>
          </LinkCard>
          <LinkCard
            telemetry
            href="#proposal"
            frame="asym"
            className="edem-span--half"
          >
            <div className={styles.cardBody}>
              <Heading level={3}>Совместные проекты</Heading>
              <Text>
                Для фестивалей, команд и площадок. Если вы ищете партнёров для
                события, опишите его аудиторию и предполагаемую роль мастерской.
              </Text>
              <Text variant="system">
                Подготовить предложение о партнёрстве
              </Text>
            </div>
          </LinkCard>
        </Grid>
      </section>

      <section aria-labelledby="proposal">
        <Heading level={2} id="proposal" className={styles.sectionHeading}>
          Обсудим сотрудничество
        </Heading>
        <Card telemetry reveal={false}>
          <div className={styles.cardBody}>
            <Text>
              В предложении укажите, кто вы и какой результат хотите получить
              вместе.
            </Text>
            <ul className={styles.steps}>
              <li>Ваше имя или название команды и удобный способ связи.</li>
              <li>Краткое описание идеи и то, что уже готово.</li>
              <li>Что вы готовы взять на себя и какая помощь вам нужна.</li>
              <li>Ориентировочные сроки и площадку, если они известны.</li>
            </ul>
            <Text>Отправка предложений с этой страницы пока недоступна.</Text>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
