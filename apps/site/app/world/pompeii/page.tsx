"use client";

import { Heading, Reading } from "@edem/ui";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { WorldArticleFooter } from "../WorldArticleFooter";
import { WorldArticleShell } from "../WorldArticleShell";
import { WorldArticleReading } from "../WorldArticleReading";

export default function PompeiiArticle() {
  return (
    <WorldArticleShell
      slug="pompeii"
      eyebrow="ВСЕЛЕННАЯ / МИР И ГЕОГРАФИЯ"
      title="Помпеи"
      intro={
        <WorldArticleReading slug="pompeii">
          <p>
            В Помпеях неоновые вывески горят среди полуразрушенных домов.
            Когда-то это были бедные кварталы{" "}
            <a href={worldArticleHref("western-city")}>Западного города</a>. По
            мере того как у <a href={worldArticleHref("freedom")}>«Свободы»</a>{" "}
            становилось больше сторонников, кварталы обособлялись. Со временем
            их стали называть Помпеями.
          </p>
        </WorldArticleReading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <p>
            Власти Эдема пытаются вернуть район под свой контроль, и на его
            границе до сих пор случаются перестрелки. Внутри Помпей укрепились{" "}
            <a href={worldArticleHref("criminal-organizations")}>
              преступные группировки
            </a>
            . Одни помогают «Свободе» деньгами и оружием. Другие, среди них{" "}
            <a href={worldArticleHref("myanmar")}>наркокартель «Мьянма»</a>,
            соперничают с ней за самые прибыльные заведения. Здесь же работает
            чёрный рынок, на который приезжают и из благополучных кварталов.
          </p>
          <section aria-labelledby="market">
            <Heading level={2} id="market">
              Зачем сюда приезжают
            </Heading>
            <p>
              На местном рынке легко понять, зачем ехать в район с такой
              репутацией. Некоторую технику в Эдеме продают и используют по{" "}
              <a href={worldArticleHref("licenses")}>лицензии</a>. В Помпеях
              можно найти протезы, для которых разрешение не спросят.
            </p>
            <p>
              Приезжают и ради вечера за игровым столом или в компании, которую
              в центре ещё нужно поискать. Некоторые заведения Помпей стали
              известны далеко за пределами района.
            </p>
          </section>
          <section aria-labelledby="venues">
            <Heading level={2} id="venues">
              Казино Мефиса и бордель Мокси
            </Heading>
            <p>
              За яркой вывеской{" "}
              <a href={worldArticleHref("mephisto-casino")}>казино Мефиса</a>{" "}
              открывались роскошные залы. Между столами сновали сотрудники в
              красных и чёрных рубашках, жилетах и перчатках. Сюда ехали и
              наследники состоятельных семей, и сотрудники корпораций, которым
              хотелось испытать удачу вдали от привычного круга. Примерно через
              год после открытия Мефис поступил на работу к Мокси, а казино
              стало частью её заведения.
            </p>
            <p>
              В <a href={worldArticleHref("moxi-brothel")}>борделе Мокси</a>{" "}
              вечер вполне может начаться с хорошего разговора. Сотрудников
              узнают по переливающимся тканям, неоновым деталям и яркому
              макияжу. Мокси сколотила на нём состояние и стала одной из самых
              влиятельных фигур в Помпеях.
            </p>
          </section>
          <p>
            Бедность и преступность никуда не делись. И всё же состоятельные
            жители Западного города до сих пор приезжают в Помпеи и предпочитают
            оставлять свои деньги именно в местных заведениях.
          </p>
        </Reading>

        <WorldArticleFooter slug="pompeii" />
      </article>
    </WorldArticleShell>
  );
}
