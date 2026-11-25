"use client";

import { Reading } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { RelatedWorldArticles } from "../RelatedWorldArticles";
import { WorldArticleIllustration } from "../WorldArticleIllustration";

export default function AtlantaArticle() {
  return (
    <PageShell
      eyebrow="ВСЕЛЕННАЯ / МИР И ГЕОГРАФИЯ"
      title="Атланта"
      intro={
        <Reading>
          <p>
            В{" "}
            <a href={worldArticleHref("world-geography")}>
              географических описаниях Эдема
            </a>{" "}
            рассказ об Атланте умещается в несколько строк. Это далёкий остров.
            Возможно, там существует своя цивилизация.
          </p>
        </Reading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <WorldArticleIllustration slug="atlanta" />
        <Reading>
          <p>
            Если захочется узнать, кто живёт на острове и как там устроена
            жизнь, открытые источники точного ответа не дадут. Официального
            представительства Атланты в Эдеме тоже нет.
          </p>
        </Reading>

        <RelatedWorldArticles slug="atlanta" />
      </article>
    </PageShell>
  );
}
