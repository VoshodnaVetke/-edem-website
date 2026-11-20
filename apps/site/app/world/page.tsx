"use client";

import { ButtonLink, Card, Grid, Heading, Layout, Text } from "@edem/ui";
import { SiteSectionRail } from "../../components/layout/SiteSectionRail";
import deployment from "../../config/deployment.json";
import { siteHref } from "../../config/site-href";
import layout from "../../styles/page-layout.module.css";
import styles from "./world.module.css";

const firstImpressions = [
  {
    id: "cyberpunk",
    topic: "corporations",
    title: "Киберпанк",
    description: "Импланты. Нейрочипы. Корпорации. Технологии будущего.",
  },
  {
    id: "rating",
    topic: "daily-life",
    title: "Социальный рейтинг",
    description:
      "Твоя репутация измеряется баллами. И от них зависит твоё место в обществе.",
  },
  {
    id: "faith",
    topic: "power",
    title: "Адам и вера",
    description:
      "Верховный понтифик. Государственная религия. Власть, основанная на вере и контроле.",
  },
  {
    id: "conflict",
    topic: "stories",
    title: "Социальное расслоение",
    description:
      "Криминальные группировки. Борьба за влияние. Люди, не согласные с системой.",
  },
] as const;

interface WorldTopic {
  id: string;
  frame: "double" | "system" | "asym";
  placement: "leading" | "trailing" | "panorama" | "compact";
  title: string;
  description: string;
  images: readonly string[];
  articles?: readonly { path: string; title: string }[];
}

const topics: readonly WorldTopic[] = [
  {
    id: "power",
    frame: "asym",
    placement: "leading",
    title: "Во славу Адама",
    description:
      "Эдемом правит Верховный понтифик Адам. Его власть объединяет государство и религию, а Совет светочей помогает управлять обществом. Для одних Адам — символ стабильности и процветания. Для других — воплощение системы, которая контролирует слишком многое.",
    images: ["faith"],
    articles: [
      { path: "/world/government", title: "Государственное устройство Эдема" },
    ],
  },
  {
    id: "daily-life",
    frame: "system",
    placement: "trailing",
    title: "Жизнь под контролем",
    description:
      "В Эдеме порядок поддерживают не только полиция и законы. Каждый гражданин обладает социальным рейтингом, а нейрочипы связывают людей с государственной системой. Высокий рейтинг открывает новые возможности, низкий может ограничить привычные права. И практически каждое действие может иметь последствия.",
    images: ["rating"],
    articles: [
      { path: "/world/neurochip", title: "Социальный рейтинг и нейрочип" },
    ],
  },
  {
    id: "geography",
    frame: "system",
    placement: "panorama",
    title: "За пределами идеального города",
    description:
      "За сияющими фасадами Эдема скрывается совсем другая жизнь. В Помпеях действуют криминальные группировки, борющиеся за влияние и территории. А за пределами государства существуют другие города, страны и общества со своими законами, порядками и интересами.",
    images: ["cyberpunk", "conflict"],
  },
  {
    id: "corporations",
    frame: "system",
    placement: "compact",
    title: "Будущее принадлежит не только государству",
    description:
      "Технологии определяют жизнь Эдема, но далеко не все разработки принадлежат государству. Крупные корпорации создают новые устройства, конкурируют за влияние и преследуют собственные интересы. Иногда их решения способны изменить жизнь общества не меньше, чем решения самого Адама.",
    images: ["laboratory"],
  },
  {
    id: "stories",
    frame: "system",
    placement: "compact",
    title: "Не все согласны с правилами",
    description:
      "Эдем стремится поддерживать порядок, но интересы государства, корпораций, криминальных организаций и обычных граждан далеко не всегда совпадают. Здесь заключают союзы, борются за власть, нарушают законы и пытаются изменить существующую систему. И не каждый конфликт делит участников на правых и виноватых.",
    images: ["district"],
  },
];

const sections = [
  { id: "page-title", label: "Вселенная Эдем" },
  { id: "world-topics", label: "Загляни глубже" },
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
            {firstImpressions.map(({ id, title, description, topic }) => (
              <div
                key={id}
                className={`edem-span--half ${styles.impressionSlot}`}
              >
                <Card
                  className={styles.impression}
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
                <ButtonLink
                  size="sm"
                  href={`#${topic}`}
                  aria-label={`Читать статьи — ${title}`}
                >
                  Читать статьи
                </ButtonLink>
              </div>
            ))}
          </Grid>
        </section>

        <section className={layout.section} aria-labelledby="world-topics">
          <div className={`${layout.stack} ${styles.topicIntro}`}>
            <Heading level={2} id="world-topics">
              Загляни глубже
            </Heading>
            <Text variant="lead">
              За блестящими фасадами Эдема скрывается мир, в котором технологии,
              вера, власть и человеческие амбиции тесно переплетены. Узнай, как
              он устроен.
            </Text>
          </div>
          <Grid className={styles.topicGrid}>
            {topics.map(
              ({
                id,
                title,
                description,
                frame,
                placement,
                images,
                articles,
              }) => (
                <Card
                  telemetry
                  key={id}
                  frame={frame}
                  className={`edem-span--${placement === "compact" ? "half" : "full"} ${styles.topic}`}
                  data-placement={placement}
                  aria-labelledby={id}
                  cover={
                    <div className={styles.topicArt}>
                      {images.map((image) => (
                        <img
                          key={image}
                          src={`${deployment.basePath}/images/world/${image}.webp`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      ))}
                    </div>
                  }
                >
                  <div className={`${layout.cardBody} ${styles.topicCopy}`}>
                    <Heading level={3} id={id}>
                      {title}
                    </Heading>
                    <Text>{description}</Text>
                    {articles && (
                      <ul
                        className={styles.topicLinks}
                        id={id === "daily-life" ? "first-reading" : undefined}
                      >
                        {articles.map(({ path, title }) => (
                          <li key={path}>
                            <a href={siteHref(path)}>{title}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Card>
              ),
            )}
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
