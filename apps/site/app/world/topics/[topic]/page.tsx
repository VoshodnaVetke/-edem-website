import { notFound } from "next/navigation";
import { PageShell } from "../../../../components/layout/PageShell";
import deployment from "../../../../config/deployment.json";
import {
  worldArticleGroups,
  worldArticleHref,
  worldArticleRegistry,
  worldArticlesHref,
  worldTopicArticles,
} from "../../../../config/world-articles";
import imageStyles from "../../world-article-image.module.css";
import { WorldArticleList } from "./WorldArticleList";
import { WorldBreadcrumbs } from "../../WorldBreadcrumbs";
import { WorldOverviewBackLink } from "./WorldOverviewBackLink";
import styles from "./articles.module.css";

export const dynamicParams = false;

const legacyTopic = "daily-life";

export function generateStaticParams() {
  return [
    ...worldArticleGroups.map(({ slug }) => ({ topic: slug })),
    { topic: legacyTopic },
    { topic: "locations" },
  ];
}

export default async function WorldArticlesPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  if (topic === "locations") {
    const destination = worldArticlesHref("geography");
    return (
      <>
        <meta httpEquiv="refresh" content={`0;url=${destination}`} />
        <PageShell
          eyebrow="СТАТЬИ ВСЕЛЕННОЙ"
          title="Мир и география"
          breadcrumbs={<WorldBreadcrumbs topic="geography" />}
        >
          <a href={destination}>К списку статей</a>
        </PageShell>
      </>
    );
  }

  const currentTopic = topic === legacyTopic ? "technology" : topic;
  const groupIndex = worldArticleGroups.findIndex(
    ({ slug }) => slug === currentTopic,
  );
  const group = worldArticleGroups[groupIndex];
  if (!group) notFound();
  const nextGroup = worldArticleGroups[groupIndex + 1];
  const articles =
    topic === legacyTopic
      ? [{ slug: "neurochip" as const, ...worldArticleRegistry.neurochip }]
      : worldTopicArticles(group.slug);
  const fallbackThumbnail = `${deployment.basePath}/images/world/article-thumbnails/${group.slug}.webp`;

  return (
    <PageShell
      eyebrow="СТАТЬИ ВСЕЛЕННОЙ"
      title={group.title}
      beforeHeading={<WorldOverviewBackLink compact />}
      breadcrumbs={<WorldBreadcrumbs topic={group.slug} />}
    >
      <WorldArticleList className={styles.articles}>
        {articles.map((article) => {
          const { slug, title } = article;
          const thumbnail =
            "thumbnail" in article
              ? `${deployment.basePath}/images/world/articles/${article.thumbnail}`
              : fallbackThumbnail;
          const descriptionId = `article-${slug}-description`;
          return (
            <li key={slug} className={styles.article} data-world-article-card>
              <div className={`${imageStyles.frame} ${imageStyles.thumbnail}`}>
                <img src={thumbnail} alt="" loading="lazy" decoding="async" />
              </div>
              <div className={styles.copy}>
                <h2 className={`edem-type-h2 ${styles.heading}`}>
                  <a
                    className={styles.link}
                    href={worldArticleHref(slug)}
                    aria-describedby={descriptionId}
                  >
                    {title}
                  </a>
                </h2>
                {article.status === "published" ? (
                  <p id={descriptionId} className={styles.summary}>
                    {article.summary}
                  </p>
                ) : (
                  <p id={descriptionId} className={styles.status}>
                    Статья в разработке
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </WorldArticleList>
      <WorldOverviewBackLink
        nextSection={
          nextGroup && {
            href: worldArticlesHref(nextGroup.slug),
            title: nextGroup.title,
          }
        }
      />
    </PageShell>
  );
}
