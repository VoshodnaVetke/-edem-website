import { notFound } from "next/navigation";
import { PageShell } from "../../../../components/layout/PageShell";
import { siteHref } from "../../../../config/site-href";
import { worldArticleGroups } from "../../../../config/world-articles";
import styles from "./articles.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return worldArticleGroups.map(({ slug }) => ({ topic: slug }));
}

export default async function WorldArticlesPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const group = worldArticleGroups.find(({ slug }) => slug === topic);
  if (!group) notFound();

  return (
    <PageShell eyebrow="СТАТЬИ ВСЕЛЕННОЙ" title={group.title}>
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
