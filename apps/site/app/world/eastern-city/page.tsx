"use client";

import { Heading, Reading } from "@edem/ui";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { WorldArticleFooter } from "../WorldArticleFooter";
import { WorldArticleShell } from "../WorldArticleShell";
import { WorldSourceExcerpt } from "../WorldSourceExcerpt";
import { WorldArticleReading } from "../WorldArticleReading";

export default function EasternCityArticle() {
  return (
    <WorldArticleShell
      slug="eastern-city"
      eyebrow="ВСЕЛЕННАЯ / МИР И ГЕОГРАФИЯ"
      title="Восточный город"
      intro={
        <WorldArticleReading slug="eastern-city">
          <p>
            В Восточном городе ещё можно увидеть, что осталось от довоенной
            Азии. Здесь сохранились старые здания, статуи и памятники, а
            традиционные силуэты и узоры живут в современной уличной моде.
            Восточный занимает меньшую площадь, чем{" "}
            <a href={worldArticleHref("western-city")}>Западный город</a>, и
            заселён плотнее.
          </p>
        </WorldArticleReading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <section aria-labelledby="city-districts">
            <Heading level={2} id="city-districts">
              Городские кварталы
            </Heading>
            <p>
              Чёрный и красный задают тон местной моде. Рядом с одеждой
              современного кроя здесь можно встретить кимоно, хаори и ципао.
              Традиционные мотивы видны и в деталях — в узорах на ткани, масках,
              шпильках для волос и веерах.
            </p>
            <p>
              Восточный город — одна из трёх крупных административных территорий{" "}
              <a href={worldArticleHref("world-geography")}>Эдема</a>. У города
              есть свои районы и местные органы власти. Они ведают местными
              делами и выполняют задачи, которые передаёт им центральная власть.
            </p>
          </section>
          <section aria-labelledby="myanmar">
            <Heading level={2} id="myanmar">
              Картель «Мьянма»
            </Heading>
            <p>
              Влияние преступных организаций в Восточном городе сильнее, чем в
              Западном. Одна из действующих здесь группировок — наркокартель{" "}
              <a href={worldArticleHref("myanmar")}>«Мьянма»</a>.
            </p>
            <WorldSourceExcerpt
              title={
                "Шаг в борьбе с наркотиками. Итоги операции в Восточном городе."
              }
              paragraphs={[
                "Шельма парк с новостями из криминального мира.",
                "Сегодня в ходе антинаркотической операции органы правопорядка вступили в перестрелку с преступной группировкой известной как Наркокартель “Мьянма”. После непродолжительного боя нарушители правопорядка сдались и согласились работать со следствием. Возможно, в будущем это позволит покончить с бандитской организацией и сильно уменьшить наркооборот в стране.",
              ]}
              credit={"«Эдем 24», Шельма Парк, 02.07.2234"}
            />
          </section>
        </Reading>

        <WorldArticleFooter slug="eastern-city" />
      </article>
    </WorldArticleShell>
  );
}
