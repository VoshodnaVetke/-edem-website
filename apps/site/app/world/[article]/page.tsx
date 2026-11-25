import { notFound } from "next/navigation";
import { PageShell } from "../../../components/layout/PageShell";
import {
  worldArticleEntries,
  worldArticleHref,
} from "../../../config/world-articles";
import { WorldArticleFooter } from "../WorldArticleFooter";
import { WorldArticleShell } from "../WorldArticleShell";

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
    <WorldArticleShell
      slug={entry.slug}
      eyebrow="ЭНЦИКЛОПЕДИЯ ЭДЕМА"
      title={entry.title}
      description="Статья в подготовке."
    >
      <WorldArticleFooter slug={entry.slug} />
    </WorldArticleShell>
  );
}
