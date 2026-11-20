"use client";

import { ButtonLink, Card, Grid, Heading, Layout, Text } from "@edem/ui";
import { SiteSectionRail } from "../../components/layout/SiteSectionRail";
import deployment from "../../config/deployment.json";
import {
  worldArticleGroups,
  worldArticlesHref,
} from "../../config/world-articles";
import layout from "../../styles/page-layout.module.css";
import styles from "./world.module.css";

const sections = [
  { id: "page-title", label: "Вселенная Эдем" },
  { id: "world-topics", label: "Разделы энциклопедии" },
] as const;

export default function WorldPage() {
  return (
    <main id="main-content" tabIndex={-1} className={layout.page}>
      <SiteSectionRail sections={sections} />
      <Layout className={styles.world}>
        <header className={styles.introduction}>
          <Heading level={1} id="page-title" className={styles.title}>
            Добро пожаловать <span>в Эдем.</span>
          </Heading>
          <div className={styles.premise}>
            <Text variant="lead" className={styles.subtitle}>
              Мир будущего. Высокие технологии.{" "}
              <strong>Социальный рейтинг. Религия, ставшая властью.</strong>
            </Text>
            <Text className={styles.summary}>
              За тобой следят технологии, твою репутацию измеряют цифрами, а
              государством правит Верховный понтифик Адам. Он обещает порядок и
              процветание. Но не все согласны с его представлением об идеальном
              обществе.
            </Text>
          </div>
        </header>

        <section aria-labelledby="world-topics">
          <Heading level={2} id="world-topics" className={styles.sectionTitle}>
            Разделы энциклопедии
          </Heading>
          <Grid className={styles.directory}>
            {worldArticleGroups.map(
              ({ slug, title, heading, description, artwork }, index) => (
                <Card
                  key={slug}
                  className={styles.topic}
                  aria-labelledby={slug}
                  reveal={false}
                  cover={
                    <div className={styles.artwork} data-artwork={artwork}>
                      <img
                        src={`${deployment.basePath}/images/world/${artwork}.webp`}
                        alt=""
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>
                  }
                >
                  <div className={styles.cardCopy}>
                    <Text variant="system" className={styles.category}>
                      {title}
                    </Text>
                    <Heading level={3} id={slug} className={styles.cardTitle}>
                      {heading}
                    </Heading>
                    <Text className={styles.description}>{description}</Text>
                    <ButtonLink
                      className={styles.readArticles}
                      size="sm"
                      href={worldArticlesHref(slug)}
                      aria-label={`Читать статьи — ${title}`}
                    >
                      Читать статьи <span aria-hidden="true">→</span>
                    </ButtonLink>
                  </div>
                </Card>
              ),
            )}
          </Grid>
        </section>
      </Layout>
    </main>
  );
}
