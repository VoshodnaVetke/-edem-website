"use client";

import { ButtonLink, Card, Grid, Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { siteHref } from "../../config/site-href";
import styles from "../../styles/page-layout.module.css";

const archive = [
  {
    title: "Парад технологий",
    frame: "double",
    summary:
      "Изобретатели представляют разработки, а корпорации ищут перспективные проекты и договариваются о сделках. В центре игры — инвестиции, переговоры и соперничество за право заняться новым проектом.",
  },
  {
    title: "Совет Светочей",
    frame: "asym",
    summary:
      "Кандидаты участвуют в выборах в Совет Светочей. Игроки обсуждают решения о будущем Эдема, ищут союзников и договариваются о том, кто войдёт в Совет.",
  },
] as const;

export default function GamesPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / АРХИВ"
      title="Наши игры"
      description="Истории, которые мы уже прожили вместе. В архиве собраны завязки проведённых игр."
    >
      <section aria-labelledby="archive">
        <Heading level={2} id="archive" className={styles.sectionHeading}>
          Архив проектов
        </Heading>
        <Grid>
          {archive.map(({ title, summary, frame }) => (
            <Card
              key={title}
              frame={frame}
              className="edem-span--half"
              reveal={false}
            >
              <div className={styles.cardBody}>
                <Text variant="system">Кабинетная ролевая игра</Text>
                <Heading level={3}>{title}</Heading>
                <Text>{summary}</Text>
              </div>
            </Card>
          ))}
        </Grid>
      </section>

      <section aria-labelledby="next-game" className={styles.stack}>
        <Heading level={2} id="next-game">
          Хотите попасть на следующую игру?
        </Heading>
        <Text>
          Следите за афишей. В анонсах появятся даты и условия записи.
        </Text>
        <div className={styles.actions}>
          <ButtonLink href={siteHref("/events")}>Посмотреть афишу</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
