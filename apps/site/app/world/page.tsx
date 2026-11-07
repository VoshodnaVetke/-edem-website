"use client";

import { ButtonLink, Card, Grid, Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import styles from "../../styles/page-layout.module.css";

const topics = [
  "После катастрофы",
  "Власть и государство",
  "Повседневная жизнь",
  "Города и пустошь",
  "Корпорации",
  "Люди и истории",
];

export default function WorldPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / НАЧАЛО ЗНАКОМСТВА"
      title="Вселенная «Эдем»"
      description="Знакомство с устройством авторского мира. Опубликованные материалы отделяются от мастерских секретов и сюжетных спойлеров."
    >
      <Heading level={2} className={styles.sectionHeading}>
        Как устроен мир
      </Heading>
      <Grid>
        {topics.map((topic) => (
          <Card key={topic} className="edem-span--third" reveal={false}>
            <div className={styles.cardBody}>
              <Heading level={3}>{topic}</Heading>
              <Text variant="system">РАЗДЕЛ В ПОДГОТОВКЕ</Text>
            </div>
          </Card>
        ))}
      </Grid>
      <div className={styles.content}>
        <ButtonLink href="/wiki">Перейти в энциклопедию</ButtonLink>
      </div>
    </PageShell>
  );
}
