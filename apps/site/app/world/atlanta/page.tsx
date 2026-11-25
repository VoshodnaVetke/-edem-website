"use client";

import { Reading } from "@edem/ui";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { WorldArticleFooter } from "../WorldArticleFooter";
import { WorldArticleShell } from "../WorldArticleShell";
import { WorldArticleReading } from "../WorldArticleReading";

export default function AtlantaArticle() {
  return (
    <WorldArticleShell
      slug="atlanta"
      eyebrow="ВСЕЛЕННАЯ / МИР И ГЕОГРАФИЯ"
      title="Атланта"
      intro={
        <WorldArticleReading slug="atlanta">
          <p>
            В{" "}
            <a href={worldArticleHref("world-geography")}>
              географических описаниях Эдема
            </a>{" "}
            рассказ об Атланте умещается в несколько строк. Это далёкий остров.
            Возможно, там существует своя цивилизация.
          </p>
        </WorldArticleReading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <p>
            Если захочется узнать, кто живёт на острове и как там устроена
            жизнь, открытые источники точного ответа не дадут. Официального
            представительства Атланты в Эдеме тоже нет.
          </p>
        </Reading>

        <WorldArticleFooter slug="atlanta" />
      </article>
    </WorldArticleShell>
  );
}
