"use client";

import { ButtonLink, Heading, Reading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import styles from "../../styles/page-layout.module.css";

export default function WikiPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / ПУБЛИЧНЫЕ ЗНАНИЯ"
      title="Энциклопедия"
      description="Публичный каталог сведений о вселенной «Эдем»."
    >
      <Heading level={2} className={styles.sectionHeading}>
        Каталог статей
      </Heading>
      <Text className={styles.note}>
        Статьи появятся здесь после редакционной проверки и согласования
        материалов для публикации.
      </Text>
      <Reading>
        <p>
          Некоторые сведения о мире могут содержать спойлеры. Знания игрока не
          обязательно совпадают со знаниями его персонажа. Закрытые мастерские
          материалы в публичную энциклопедию не включаются.
        </p>
      </Reading>
      <div className={styles.content}>
        <ButtonLink href="/world">К знакомству с миром</ButtonLink>
      </div>
    </PageShell>
  );
}
