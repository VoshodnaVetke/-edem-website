"use client";

import { Card, Grid, Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import styles from "../../styles/page-layout.module.css";

const archive = ["Парад технологий", "Совет светочей"];

export default function GamesPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / АРХИВ"
      title="Наши игры"
      description="Игры и истории, над которыми работала мастерская группа."
    >
      <Heading level={2} className={styles.sectionHeading}>
        Проведённые игры
      </Heading>
      <Grid>
        {archive.map((title) => (
          <Card key={title} className="edem-span--half" reveal={false}>
            <div className={styles.cardBody}>
              <Heading level={3}>{title}</Heading>
              <Text>
                Описание, фотографии и материалы будут добавлены после
                подготовки публичной версии.
              </Text>
            </div>
          </Card>
        ))}
      </Grid>
    </PageShell>
  );
}
