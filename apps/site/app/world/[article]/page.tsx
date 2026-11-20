import { notFound } from "next/navigation";
import { PageShell } from "../../../components/layout/PageShell";
import {
  worldArticleEntries,
  worldArticleHref,
  worldArticlesHref,
} from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { RelatedWorldArticles } from "../RelatedWorldArticles";

export const dynamicParams = false;

const articlePages = worldArticleEntries.filter(
  ({ status }) => status !== "published",
);

export function generateStaticParams() {
  return articlePages.map(({ slug }) => ({ article: slug }));
}

export default async function WorldArticlePage({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  const entry = articlePages.find(({ slug }) => slug === article);
  if (!entry) notFound();

  if (entry.status === "merged") {
    const destination = worldArticleHref(entry.slug);
    return (
      <>
        <meta httpEquiv="refresh" content={`0;url=${destination}`} />
        <PageShell eyebrow="ЭНЦИКЛОПЕДИЯ ЭДЕМА" title={entry.title}>
          <p>
            Материал вошёл в <a href={destination}>объединённую статью</a>.
          </p>
        </PageShell>
      </>
    );
  }

  return (
    <PageShell
      eyebrow="ЭНЦИКЛОПЕДИЯ ЭДЕМА"
      title={entry.title}
      description="Статья в подготовке."
    >
      <div className={styles.stack}>
        <RelatedWorldArticles slug={entry.slug} />
        <ul className={styles.jumpLinks}>
          <li>
            <a href={worldArticlesHref(entry.topic)}>К списку статей</a>
          </li>
        </ul>
      </div>
    </PageShell>
  );
}
