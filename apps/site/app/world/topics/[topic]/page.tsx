import { notFound } from "next/navigation";
import { PageShell } from "../../../../components/layout/PageShell";
import deployment from "../../../../config/deployment.json";
import { siteHref } from "../../../../config/site-href";
import {
  worldArticleEntries,
  worldArticleGroups,
  worldArticleHref,
  worldArticlesHref,
} from "../../../../config/world-articles";
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
        <PageShell eyebrow="СТАТЬИ ВСЕЛЕННОЙ" title="Мир и география">
          <a href={destination}>К списку статей</a>
        </PageShell>
      </>
    );
  }

  const currentTopic = topic === legacyTopic ? "technology" : topic;
  const group = worldArticleGroups.find(({ slug }) => slug === currentTopic);
  if (!group) notFound();
  const articles = worldArticleEntries.filter(
    (article) =>
      article.status !== "merged" &&
      (topic === legacyTopic
        ? article.slug === "neurochip"
        : article.topic === group.slug),
  );
  const fallbackThumbnail = `${deployment.basePath}/images/world/article-thumbnails/${group.slug}.webp`;

  return (
    <PageShell eyebrow="СТАТЬИ ВСЕЛЕННОЙ" title={group.title}>
      <ul className={styles.articles} role="list">
        {articles.map((article) => {
          const { slug, title } = article;
          const thumbnail =
            "thumbnail" in article
              ? `${deployment.basePath}/images/world/articles/${article.thumbnail}`
              : fallbackThumbnail;
          const descriptionId = `article-${slug}-description`;
          return (
            <li key={slug} className={styles.article}>
              <div className={styles.thumbnail}>
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
                  <div id={descriptionId} className={styles.summary}>
                    {article.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p id={descriptionId} className={styles.status}>
                    Статья в разработке
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <a className={styles.back} href={siteHref("/world")}>
        К обзору мира
      </a>
    </PageShell>
  );
}
