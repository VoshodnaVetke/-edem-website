"use client";

import { Heading } from "@edem/ui";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { WorldArticleFooter } from "../WorldArticleFooter";
import { WorldArticleShell } from "../WorldArticleShell";
import { WorldArticleReading } from "../WorldArticleReading";

export default function MephistoCasinoArticle() {
  return (
    <WorldArticleShell
      slug="mephisto-casino"
      eyebrow="ВСЕЛЕННАЯ / МИР И ГЕОГРАФИЯ"
      title="Казино Мефиса"
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <WorldArticleReading slug="mephisto-casino">
          <p>
            Мефис открыл своё казино в{" "}
            <a href={worldArticleHref("pompeii")}>Помпеях</a>, в{" "}
            <a href={worldArticleHref("western-city")}>Западном городе</a>.
            Яркая вывеска освещала серую улицу, а за игровыми столами
            встречались местные жители и гости из обеспеченных кварталов. У
            заведения быстро появилась известность за пределами Помпей.
          </p>
          <section aria-labelledby="visitors">
            <Heading level={2} id="visitors">
              Кто приезжал в казино
            </Heading>
            <p>
              В Помпеях казино выделялось роскошью залов. Сотрудников можно было
              узнать по красным и чёрным рубашкам, жилетам и перчаткам.
            </p>
            <p>
              Среди гостей были молодые люди из состоятельных семей, пришедшие
              потратить родительские деньги, и сотрудники корпораций, которым
              захотелось пощекотать нервы. В Помпеях к{" "}
              <a href={worldArticleHref("neurochip")}>социальному рейтингу</a>{" "}
              относились куда спокойнее, чем в остальном Западном городе. Для
              приезжих это было частью притягательности района.
            </p>
          </section>
          <section aria-labelledby="disappearances">
            <Heading level={2} id="disappearances">
              Исчезновения
            </Heading>
            <p>
              Когда поблизости стали пропадать люди, по городу пошли слухи, что
              казино к этому причастно. Желающих заглянуть внутрь от этих
              разговоров только прибавилось.
            </p>
          </section>
          <section aria-labelledby="moxi">
            <Heading level={2} id="moxi">
              Как казино перешло к Мокси
            </Heading>
            <p>
              Примерно через год после открытия Мефис, основатель и владелец
              казино, поступил на работу к Мокси. Его заведение вошло в состав{" "}
              <a href={worldArticleHref("moxi-brothel")}>«Борделя Мокси»</a>. По
              числу гостей можно было предположить, что казино приносило
              неплохой доход. На каких условиях оно перешло к Мокси и почему
              Мефис согласился у неё работать, так и осталось неизвестно.
            </p>
          </section>
        </WorldArticleReading>

        <WorldArticleFooter slug="mephisto-casino" />
      </article>
    </WorldArticleShell>
  );
}
