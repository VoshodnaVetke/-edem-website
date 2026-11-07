"use client";

import { ButtonLink, Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import styles from "../../styles/page-layout.module.css";

export default function EventsPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / ПРЕДСТОЯЩИЕ СОБЫТИЯ"
      title="Афиша игр"
      description="Анонсы предстоящих игр мастерской группы «Эдем»."
    >
      <Heading level={2} className={styles.sectionHeading}>
        Ближайшие события
      </Heading>
      <Text className={styles.note}>
        Подтверждённых дат и открытых наборов для публикации пока нет.
        Информация появится после согласования с организаторами.
      </Text>
      <ButtonLink href="/games">Посмотреть проведённые игры</ButtonLink>
    </PageShell>
  );
}
