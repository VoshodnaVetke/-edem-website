"use client";

import { Card, Grid, Heading, Layout, Text } from "@edem/ui";
import { SiteSectionRail } from "../../components/layout/SiteSectionRail";
import deployment from "../../config/deployment.json";
import { siteHref } from "../../config/site-href";
import layout from "../../styles/page-layout.module.css";
import styles from "./world.module.css";

const firstImpressions = [
  {
    id: "cyberpunk",
    title: "Киберпанк",
    description: "Импланты. Нейрочипы. Корпорации. Технологии будущего.",
  },
  {
    id: "rating",
    title: "Социальный рейтинг",
    description:
      "Твоя репутация измеряется баллами. И от них зависит твоё место в обществе.",
  },
  {
    id: "faith",
    title: "Адам и вера",
    description:
      "Верховный понтифик. Государственная религия. Власть, основанная на вере и контроле.",
  },
  {
    id: "conflict",
    title: "Неидеальный мир",
    description:
      "Криминальные группировки. Борьба за влияние. Люди, не согласные с системой.",
  },
] as const;

interface WorldTopic {
  id: string;
  frame: "double" | "system" | "asym";
  title: string;
  description: string;
  link?: { path: string; label: string; id?: string };
}

const topics: readonly WorldTopic[] = [
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
      "Во главе Эдема стоит Верховный понтифик Адам. Государственная религия связана с властью, которая обещает гражданам порядок и процветание.",
  },
  {
    id: "daily-life",
    frame: "asym",
    title: "Повседневная жизнь",
    description:
      "Нейрочип удостоверяет личность гражданина, а социальный рейтинг влияет на его права и разрешения.",
    link: {
      id: "first-reading",
      path: "/world/neurochip",
      label: "Читать статью «Социальный рейтинг и нейрочип»",
    },
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
    link: {
      path: "/games/parad-tehnologiy",
      label: "О «Параде технологий»",
    },
  },
  {
    id: "stories",
    frame: "double",
    title: "Борьба за влияние",
    description:
      "В Помпеях пересекаются интересы государства, преступных группировок и людей, которые хотят жить по своим правилам.",
    link: {
      path: "/games/kazn-ognya-vechnogo",
      label: "О Помпеях в «Казни Огня Вечного»",
    },
  },
];

const sections = [
  { id: "page-title", label: "Вселенная Эдем" },
  { id: "world-topics", label: "Как устроен мир" },
  { id: "knowledge", label: "О знаниях и спойлерах" },
] as const;

export default function WorldPage() {
  return (
    <main id="main-content" tabIndex={-1} className={layout.page}>
      <SiteSectionRail sections={sections} />
      <Layout>
        <section className={styles.hero} aria-labelledby="page-title">
          <div className={styles.introduction}>
            <div className={styles.title}>
              <Text variant="system" className={styles.eyebrow}>
                ВСЕЛЕННАЯ ЭДЕМ
              </Text>
              <Heading level={1} id="page-title">
                Добро пожаловать <span>в Эдем.</span>
              </Heading>
            </div>
            <div className={styles.premise}>
              <Text variant="lead" className={styles.subtitle}>
                Город будущего. Высокие технологии.{" "}
                <strong>Социальный рейтинг. Религия, ставшая властью.</strong>
              </Text>
              <Text className={styles.summary}>
                За тобой следят технологии, твою репутацию измеряют цифрами, а
                государством правит Верховный понтифик Адам. Он обещает порядок
                и процветание. Но не все согласны с его представлением об
                идеальном обществе.
              </Text>
            </div>
          </div>

          <Grid className={styles.impressions}>
            {firstImpressions.map(({ id, title, description }) => (
              <Card
                key={id}
                className={`edem-span--half ${styles.impression}`}
                cover={
                  <div className={styles.artwork} data-topic={id}>
                    <img
                      src={`${deployment.basePath}/images/world/${id}.webp`}
                      alt=""
                      decoding="async"
                    />
                    {id === "rating" && (
                      <div className={styles.citizenProfile}>
                        ПРОФИЛЬ ГРАЖДАНИНА
                        <span />
                      </div>
                    )}
                  </div>
                }
              >
                <div className={styles.cardCopy}>
                  <Heading level={2} className={styles.cardTitle}>
                    {title}
                  </Heading>
                  <Text>{description}</Text>
                </div>
              </Card>
            ))}
          </Grid>
        </section>

        <section className={layout.section} aria-labelledby="world-topics">
          <Heading
            level={2}
            id="world-topics"
            className={layout.sectionHeading}
          >
            Как устроен мир
          </Heading>
          <Grid>
            {topics.map(({ id, title, description, frame, link }) => (
              <Card
                telemetry
                key={id}
                frame={frame}
                className="edem-span--third"
                reveal={false}
              >
                <div className={layout.cardBody}>
                  <Heading level={3} id={id}>
                    {title}
                  </Heading>
                  <Text>{description}</Text>
                  {link && (
                    <a
                      id={link.id}
                      href={siteHref(link.path)}
                      className={styles.topicLink}
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </Grid>
        </section>

        <section
          aria-labelledby="knowledge"
          className={`${layout.stack} ${styles.knowledge}`}
        >
          <Heading level={2} id="knowledge">
            О знаниях и спойлерах
          </Heading>
          <Text>
            Сведения, которые вы прочитали как игрок, могут быть неизвестны
            вашему персонажу. На игре ориентируйтесь на его материалы и
            договорённости с организаторами.
          </Text>
        </section>
      </Layout>
    </main>
  );
}
