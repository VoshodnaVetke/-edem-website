"use client";

import { ButtonLink, Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import styles from "../../styles/page-layout.module.css";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / МАСТЕРСКАЯ ГРУППА"
      title="О мастерской группе"
      description="Авторы и организаторы ролевых игр во вселенной «Эдем»."
    >
      <Heading level={2} className={styles.sectionHeading}>
        Чем мы занимаемся
      </Heading>
      <Text className={styles.note}>
        Мы разрабатываем игровые сценарии, персонажей и системы, а также
        организуем кабинетные и текстовые ролевые игры.
      </Text>
      <ButtonLink href="/collaboration">Сотрудничество</ButtonLink>
    </PageShell>
  );
}
