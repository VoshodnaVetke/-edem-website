import { notFound } from "next/navigation";
import { PageShell } from "../../../../components/layout/PageShell";
import { siteHref } from "../../../../config/site-href";
import {
  worldArticleEntries,
  worldArticleGroups,
  worldArticleHref,
} from "../../../../config/world-articles";
import styles from "./articles.module.css";

export const dynamicParams = false;

const legacyTopic = "daily-life";

export function generateStaticParams() {
  return [
    ...worldArticleGroups.map(({ slug }) => ({ topic: slug })),
    { topic: legacyTopic },
  ];
}

export default async function WorldArticlesPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
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

  return (
    <PageShell eyebrow="СТАТЬИ ВСЕЛЕННОЙ" title={group.title}>
      <ul className={styles.articles} role="list">
        {articles.map(({ slug, title, status }) => {
          const pendingId = status === "planned" ? `${slug}-status` : undefined;
          return (
            <li key={slug}>
              <a
                className={styles.article}
                href={worldArticleHref(slug)}
                aria-describedby={pendingId}
              >
                <span>{title}</span>
                {pendingId && (
                  <span
                    id={pendingId}
                    className={styles.status}
                    aria-hidden="true"
                  >
                    В подготовке
                  </span>
                )}
              </a>
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
