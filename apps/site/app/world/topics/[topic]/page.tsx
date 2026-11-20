import { notFound } from "next/navigation";
import { PageShell } from "../../../../components/layout/PageShell";
import { siteHref } from "../../../../config/site-href";
import { worldArticleGroups } from "../../../../config/world-articles";
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

  return (
    <PageShell
      eyebrow="СТАТЬИ ВСЕЛЕННОЙ"
      title={group.title}
      description={
        group.articles.length === 0
          ? "Статьи этого раздела в подготовке."
          : undefined
      }
    >
      {group.articles.length > 0 && (
        <ul className={styles.articles} role="list">
          {group.articles.map(({ path, title }) => (
            <li key={path}>
              <a className={styles.article} href={siteHref(path)}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <a className={styles.back} href={siteHref("/world")}>
        К обзору мира
      </a>
    </PageShell>
  );
}
