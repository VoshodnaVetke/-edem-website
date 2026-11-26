"use client";

import { Heading } from "@edem/ui";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { WorldArticleFooter } from "../WorldArticleFooter";
import { WorldArticleShell } from "../WorldArticleShell";
import { WorldArticleReading } from "../WorldArticleReading";

export default function LobosLiberesArticle() {
  return (
    <WorldArticleShell
      slug="lobos-libres"
      eyebrow="ВСЕЛЕННАЯ / ОРГАНИЗАЦИИ И ГРУППИРОВКИ"
      title="Lobus Liberos"
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <WorldArticleReading slug="lobos-libres">
          <p>
            Lobus Liberos — панк-группа, которую создали музыкант К-рок и
            Мелисса Морган, дочь главы{" "}
            <a href={worldArticleHref("innovatx")}>InnovatX</a>. Группа пела о
            свободе, спорила с порядком Адама и требовала покончить с властью
            корпораций. Эти песни звучали особенно резко в исполнении Мелиссы:
            одну из крупнейших корпораций Эдема возглавлял её отец.
          </p>
          <section aria-labelledby="founding">
            <Heading level={2} id="founding">
              Как собралась группа
            </Heading>
            <p>
              Создать группу предложил К-рок, гитарист и телохранитель Эшли
              Харрингтон, работавший на{" "}
              <a href={worldArticleHref("myanmar")}>наркокартель «Мьянма»</a>.
              Мелисса стала вокалисткой и лидером группы. Вместе с ними играли
              Честейн Олдвуд, сотрудница борделя Мокси, и Страж, защитник{" "}
              <a href={worldArticleHref("technology-triumph-cult")}>
                Культа Триумфа Технологий
              </a>
              . Где Мелисса познакомилась с остальными участниками группы,
              неизвестно.
            </p>
          </section>
          <section aria-labelledby="songs">
            <Heading level={2} id="songs">
              О чём они пели
            </Heading>
            <p>
              В песнях Lobus Liberos звучала мысль, что человек вправе сам
              решать, как ему жить. Группа призывала отказываться от правил,
              навязанных обществом, и открыто выступала против действующей
              власти. Эти темы перекликались с лозунгами{" "}
              <a href={worldArticleHref("freedom")}>«Свободы»</a>. Ходили слухи,
              что Мелисса поддерживает группировку.
            </p>
          </section>
          <section aria-labelledby="breakup">
            <Heading level={2} id="breakup">
              После распада
            </Heading>
            <p>
              После событий в{" "}
              <a href={worldArticleHref("moxi-brothel")}>борделе Мокси</a>{" "}
              К-рока и Честейн Олдвуд задержали и направили в{" "}
              <a href={worldArticleHref("rehabilitation-institutions")}>УВБ</a>.
              Группа распалась. Из прежнего состава продолжили выступать только
              Мелисса и Страж, уже дуэтом.
            </p>
          </section>
        </WorldArticleReading>

        <WorldArticleFooter slug="lobos-libres" />
      </article>
    </WorldArticleShell>
  );
}
