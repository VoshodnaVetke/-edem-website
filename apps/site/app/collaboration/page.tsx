"use client";

import { Card, Grid, Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import styles from "../../styles/page-layout.module.css";

export default function CollaborationPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / СОТРУДНИЧЕСТВО"
      title="Сотрудничество"
      description="Возможности взаимодействия с авторами игр и организаторами мероприятий."
    >
      <Heading level={2} className={styles.sectionHeading}>
        Направления сотрудничества
      </Heading>
      <Grid>
        <Card className="edem-span--half" reveal={false}>
          <div className={styles.cardBody}>
            <Heading level={3}>Создание игр</Heading>
            <Text>Совместная разработка игровых проектов.</Text>
          </div>
        </Card>
        <Card className="edem-span--half" reveal={false}>
          <div className={styles.cardBody}>
            <Heading level={3}>Совместные проекты</Heading>
            <Text>Сотрудничество с мастерскими группами и организаторами.</Text>
          </div>
        </Card>
      </Grid>
      <Text className={styles.note}>
        Форма предложения пока не подключена.
      </Text>
    </PageShell>
  );
}
