"use client";

import { Card, Grid, Heading, LinkCard, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { siteHref } from "../../config/site-href";
import styles from "../../styles/page-layout.module.css";

const topics = [
  {
    id: "history",
    title: "После катастрофы",
    description:
      "После Ядерной войны большие участки суши стали радиоактивной пустошью. Города и другие крупные центры оказались разделены обширными малонаселёнными территориями.",
  },
  {
    id: "power",
    title: "Власть и государство",
    description:
      "Во главе Эдема стоит Адам. Выборы в Совет Светочей стали завязкой одной из кабинетных игр.",
  },
  {
    id: "daily-life",
    title: "Повседневная жизнь",
    description:
      "Нейрочип удостоверяет личность гражданина, а социальный рейтинг влияет на его права и разрешения.",
  },
  {
    id: "geography",
    title: "Города и пустошь",
    description:
      "Эдем объединяет Западный, Восточный и Северный города-территории. В пустоши за пределами городов есть дороги, промышленные объекты и небольшие поселения.",
  },
  {
    id: "corporations",
    title: "Корпорации",
    description:
      "Крупнейшие компании развивают технологии и конкурируют за проекты. На «Параде технологий» изобретатели представляют свои разработки, а корпорации ищут, во что вложиться.",
  },
  {
    id: "stories",
    title: "Люди и истории",
    description:
      "Государство, технологии и соперничество становятся личными, когда участники принимают решения за своих персонажей.",
  },
];

export default function WorldPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / НАЧАЛО ЗНАКОМСТВА"
      title="Вселенная «Эдем»"
      description="Государство после катастрофы. Здесь технологии входят в повседневную жизнь, а социальный рейтинг влияет на возможности граждан."
    >
      <section aria-labelledby="first-reading">
        <LinkCard href={siteHref("/world/neurochip")} frame="asym">
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
          {topics.map(({ id, title, description }) => (
            <Card key={id} className="edem-span--third" reveal={false}>
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
