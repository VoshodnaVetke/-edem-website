"use client";

import { Grid, Heading, LinkCard, Text } from "@edem/ui";
import { PageShell } from "../components/layout/PageShell";
import styles from "../styles/page-layout.module.css";

export default function HomePage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / МАСТЕРСКАЯ ГРУППА"
      title="Мастерская группа Эдема"
      description="Авторская вселенная кабинетных и текстовых ролевых игр."
    >
      <Heading level={2} className={styles.sectionHeading}>
        Исследуйте Эдем
      </Heading>
      <Grid>
        <LinkCard href="/world" className="edem-span--half">
          <div className={styles.cardBody}>
            <Heading level={3}>Вселенная</Heading>
            <Text>Знакомство с миром, в котором разворачиваются игры.</Text>
            <Text variant="system">ОТКРЫТЬ МИР</Text>
          </div>
        </LinkCard>
        <LinkCard href="/events" className="edem-span--half">
          <div className={styles.cardBody}>
            <Heading level={3}>Афиша</Heading>
            <Text>Предстоящие игры и информация об участии.</Text>
            <Text variant="system">К АФИШЕ</Text>
          </div>
        </LinkCard>
        <LinkCard href="/games" className="edem-span--half">
          <div className={styles.cardBody}>
            <Heading level={3}>Наши игры</Heading>
            <Text>Архив проведённых игровых проектов.</Text>
            <Text variant="system">СМОТРЕТЬ ИГРЫ</Text>
          </div>
        </LinkCard>
        <LinkCard href="/order" className="edem-span--half">
          <div className={styles.cardBody}>
            <Heading level={3}>Заказать игру</Heading>
            <Text>
              Информация о разработке игры по индивидуальному запросу.
            </Text>
            <Text variant="system">ПОДРОБНЕЕ</Text>
          </div>
        </LinkCard>
      </Grid>
    </PageShell>
  );
}
