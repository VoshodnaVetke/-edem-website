"use client";

import { ButtonLink, Card, Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { siteHref } from "../../config/site-href";
import styles from "../../styles/page-layout.module.css";

export default function EventsPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / ПРЕДСТОЯЩИЕ СОБЫТИЯ"
      title="Афиша игр"
      description="Выберите историю, в которой хотите принять участие. Здесь публикуются анонсы и условия записи на предстоящие игры."
    >
      <section aria-labelledby="upcoming">
        <Heading level={2} id="upcoming" className={styles.sectionHeading}>
          Ближайшие события
        </Heading>
        <Card frame="asym" reveal={false}>
          <div className={styles.cardBody}>
            <Heading level={3}>Открытых наборов сейчас нет</Heading>
            <Text>
              Подтверждённые даты и условия участия появятся в анонсах.
            </Text>
          </div>
        </Card>
      </section>

      <section aria-labelledby="choose" className={styles.stack}>
        <Heading level={2} id="choose">
          Как выбрать игру
        </Heading>
        <ol className={styles.steps}>
          <li>
            <strong>Сверьте формат, дату и город.</strong> По формату можно
            понять, где проходит игра, как в неё играют и сколько времени нужно
            выделить.
          </li>
          <li>
            <strong>Прочитайте завязку и условия.</strong> Обратите внимание на
            требования к подготовке и на то, подойдёт ли игра новичкам.
          </li>
          <li>
            <strong>Проверьте статус набора.</strong> Способ записи и условия
            участия указаны в анонсе конкретной игры.
          </li>
        </ol>
      </section>

      <section aria-labelledby="explore" className={styles.stack}>
        <Heading level={2} id="explore">
          Пока вы ждёте анонс
        </Heading>
        <Text>
          Посмотрите, какие игры уже провела мастерская, или познакомьтесь с
          миром, в котором они проходят.
        </Text>
        <div className={styles.actions}>
          <ButtonLink href={siteHref("/games")}>
            Посмотреть проведённые игры
          </ButtonLink>
          <ButtonLink href={siteHref("/world")}>Открыть вселенную</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
