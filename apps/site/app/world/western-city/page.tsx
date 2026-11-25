"use client";

import { Heading, Reading } from "@edem/ui";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { WorldArticleFooter } from "../WorldArticleFooter";
import { WorldArticleShell } from "../WorldArticleShell";
import { WorldArticleReading } from "../WorldArticleReading";

export default function WesternCityArticle() {
  return (
    <WorldArticleShell
      slug="western-city"
      eyebrow="ВСЕЛЕННАЯ / МИР И ГЕОГРАФИЯ"
      title="Западный город"
      intro={
        <WorldArticleReading slug="western-city">
          <p>
            Знакомство с Западным городом можно начать с центра. Среди светлых
            фасадов, стекла и голограмм стоит Головной офис Эдема. Отсюда
            управляют всей страной, а сам Западный — крупнейший по площади из{" "}
            <a href={worldArticleHref("world-geography")}>трёх городов Эдема</a>
            .
          </p>
        </WorldArticleReading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <section aria-labelledby="head-office">
            <Heading level={2} id="head-office">
              Главная башня Эдема
            </Heading>
            <p>
              Главная башня Головного офиса расширяется книзу, как пирамида. На
              верхнем этаже живёт Адам. Ниже государство отводит квартиры{" "}
              <a href={worldArticleHref("beacons") + "#privileges"}>Светочам</a>
              . Под жилыми этажами размещаются отделы Эдема. Чем важнее
              ведомство, тем выше его кабинеты. Нижние уровни занимают
              министерства и другие государственные учреждения.
            </p>
            <p>
              У подножия башни раскинулась большая площадь. Вокруг неё стоят
              отдельные здания министерств и государственных отделов. Башня,
              площадь и ведомственные здания образуют самый охраняемый комплекс
              в Эдеме.
            </p>
          </section>
          <section aria-labelledby="district-ratings">
            <Heading level={2} id="district-ratings">
              Районы и их рейтинг
            </Heading>
            <p>
              По номеру района можно судить о его положении в городском
              рейтинге. На оценку влияют близость к центру, благоустройство и
              инфраструктура. Смотрят, есть ли в районе школы, больницы,
              торговые центры, парки и скверы. Учитывают и{" "}
              <a href={worldArticleHref("neurochip")}>социальный рейтинг</a>{" "}
              самих жителей. В городе есть и отдельные промышленные районы.
            </p>
          </section>
          <section aria-labelledby="transport">
            <Heading level={2} id="transport">
              Как передвигаются по городу
            </Heading>
            <p>
              Над улицами и под землёй ходят скоростные поезда, по воде — речные
              трамваи. Можно и вызвать гиперкар на автопилоте. Такая поездка
              обходится дороже общественного транспорта.
            </p>
          </section>
          <section aria-labelledby="pompeii">
            <Heading level={2} id="pompeii">
              Помпеи
            </Heading>
            <p>
              В <a href={worldArticleHref("pompeii")}>Помпеях</a> яркие неоновые
              вывески горят среди полуразрушенных домов. Этот бедный район
              полностью захвачен{" "}
              <a href={worldArticleHref("criminal-organizations")}>
                преступными группировками
              </a>
              . Люди тут живут в нищете, если, конечно, не состоят в одной из
              банд. На местном нелегальном рынке продают в том числе
              нелицензированные протезы.
            </p>
            <p>
              А ещё сюда приезжают развлечься, и среди гостей бывают люди, чей
              рейтинг намного выше нуля. Здесь находится{" "}
              <a href={worldArticleHref("moxi-brothel")}>«Бордель Мокси»</a>, в
              состав которого вошло{" "}
              <a href={worldArticleHref("mephisto-casino")}>казино Мефиса</a>.
            </p>
          </section>
        </Reading>

        <WorldArticleFooter slug="western-city" />
      </article>
    </WorldArticleShell>
  );
}
