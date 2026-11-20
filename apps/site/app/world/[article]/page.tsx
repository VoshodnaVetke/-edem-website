import { notFound } from "next/navigation";
import { PageShell } from "../../../components/layout/PageShell";
import {
  worldArticleEntries,
  worldArticlesHref,
} from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { RelatedWorldArticles } from "../RelatedWorldArticles";

export const dynamicParams = false;

const plannedArticles = worldArticleEntries.filter(
  ({ status }) => status === "planned",
);

export function generateStaticParams() {
  return plannedArticles.map(({ slug }) => ({ article: slug }));
}

export default async function PlannedWorldArticle({
  params,
}: {
  params: Promise<{ article: string }>;
}) {
  const { article } = await params;
  const entry = plannedArticles.find(({ slug }) => slug === article);
  if (!entry) notFound();

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
