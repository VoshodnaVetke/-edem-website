"use client";

import { Card, Grid, Heading, LinkCard, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { SiteSectionRail } from "../../components/layout/SiteSectionRail";
import { siteHref } from "../../config/site-href";
import styles from "../../styles/page-layout.module.css";

const topics = [
  {
    id: "history",
    frame: "double",
    title: "После катастрофы",
    description:
      "После Ядерной войны большие участки суши стали радиоактивной пустошью. Города и другие крупные центры оказались разделены обширными малонаселёнными территориями.",
  },
  {
    id: "power",
    frame: "system",
    title: "Власть и государство",
    description:
      "Во главе Эдема стоит Адам. Выборы в Совет Светочей — завязка предстоящей кабинетной игры.",
  },
  {
    id: "daily-life",
    frame: "asym",
    title: "Повседневная жизнь",
    description:
      "Нейрочип удостоверяет личность гражданина, а социальный рейтинг влияет на его права и разрешения.",
  },
  {
    id: "geography",
    frame: "system",
    title: "Города и пустошь",
    description:
      "Эдем объединяет Западный, Восточный и Северный города-территории. В пустоши за пределами городов есть дороги, промышленные объекты и небольшие поселения.",
  },
  {
    id: "corporations",
    frame: "asym",
    title: "Корпорации",
    description:
      "Крупнейшие компании развивают технологии и конкурируют за проекты. На «Параде технологий» изобретатели представляют свои разработки, а корпорации ищут, во что вложиться.",
  },
  {
    id: "stories",
    frame: "double",
    title: "Люди и истории",
    description:
      "Государство, технологии и соперничество становятся личными, когда участники принимают решения за своих персонажей.",
  },
] as const;

const sections = [
  { id: "page-title", label: "Вселенная «Эдем»" },
  { id: "first-reading", label: "Впервые в Эдеме?" },
  { id: "world-topics", label: "Как устроен мир" },
  { id: "knowledge", label: "О знаниях и спойлерах" },
] as const;

export default function WorldPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / НАЧАЛО ЗНАКОМСТВА"
      title="Вселенная «Эдем»"
      description="Государство после катастрофы. Здесь технологии входят в повседневную жизнь, а социальный рейтинг влияет на возможности граждан."
    >
      <section aria-labelledby="first-reading">
        <SiteSectionRail sections={sections} />
        <LinkCard telemetry href={siteHref("/world/neurochip")} frame="asym">
          <div className={styles.cardBody}>
            <Heading level={2} id="first-reading">
              Впервые в Эдеме?
            </Heading>
            <Text>
              Начните с того, с чем сталкивается каждый гражданин. Что такое
              нейрочип и какие права даёт социальный рейтинг?
            </Text>
            <Text variant="system">
              Читать статью «Социальный рейтинг и нейрочип»
            </Text>
          </div>
        </LinkCard>
      </section>

      <section aria-labelledby="world-topics">
        <Heading level={2} id="world-topics" className={styles.sectionHeading}>
          Как устроен мир
        </Heading>
        <Grid>
          {topics.map(({ id, title, description, frame }) => (
            <Card
              telemetry
              key={id}
              frame={frame}
              className="edem-span--third"
              reveal={false}
            >
              <div className={styles.cardBody}>
                <Heading level={3} id={id}>
                  {title}
                </Heading>
                <Text>{description}</Text>
              </div>
            </Card>
          ))}
        </Grid>
      </section>

      <section aria-labelledby="knowledge" className={styles.stack}>
        <Heading level={2} id="knowledge">
          О знаниях и спойлерах
        </Heading>
        <Text>
          Сведения, которые вы прочитали как игрок, могут быть неизвестны вашему
          персонажу. На игре ориентируйтесь на его материалы и договорённости с
          организаторами.
        </Text>
      </section>
    </PageShell>
  );
}
