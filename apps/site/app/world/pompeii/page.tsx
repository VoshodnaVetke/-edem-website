"use client";

import { Heading, Reading } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { RelatedWorldArticles } from "../RelatedWorldArticles";
import { WorldArticleReading } from "../WorldArticleReading";

export default function PompeiiArticle() {
  return (
    <PageShell
      eyebrow="ВСЕЛЕННАЯ / МИР И ГЕОГРАФИЯ"
      title="Помпеи"
      intro={
        <WorldArticleReading slug="pompeii">
          <p>
            В Помпеях неоновые вывески горят среди полуразрушенных домов. Это
            бедный район{" "}
            <a href={worldArticleHref("western-city")}>Западного города</a>,
            полностью захваченный{" "}
            <a href={worldArticleHref("criminal-organizations")}>
              преступными группировками
            </a>
            . Люди тут живут в нищете, если, конечно, не состоят в одной из
            банд.
          </p>
        </WorldArticleReading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <section aria-labelledby="market">
            <Heading level={2} id="market">
              Зачем сюда приезжают
            </Heading>
            <p>
              Одни приезжают за товарами, которые трудно достать в обычной
              продаже. В Эдеме доступ к части техники зависит от{" "}
              <a href={worldArticleHref("licenses")}>лицензий</a> и баллов, а на
              нелегальном рынке Помпей можно найти протезы без лицензии.
            </p>
            <p>
              Другие заходят сюда просто хорошо провести время. И приходится
              признать, что индустрия развлечений здесь развита отлично. Среди
              гостей бывают даже те, чей{" "}
              <a href={worldArticleHref("neurochip")}>социальный рейтинг</a>{" "}
              намного выше нуля.
            </p>
          </section>
          <section aria-labelledby="venues">
            <Heading level={2} id="venues">
              Казино Мефиса и «Бордель Мокси»
            </Heading>
            <p>
              В <a href={worldArticleHref("mephisto-casino")}>казино Мефиса</a>{" "}
              приезжали даже из обеспеченных кварталов Западного города.
              Примерно через год после открытия казино вошло в состав борделя
              Мокси, а сам Мефис стал работать у неё.
            </p>
            <p>
              <a href={worldArticleHref("moxi-brothel")}>«Бордель Мокси»</a>{" "}
              остаётся одним из самых известных заведений Помпей. Здесь умеют
              занять гостя беседой и развлечь его, а яркие, необычные наряды
              сотрудников стали частью антуража. На своём заведении Мокси
              сколотила состояние и стала влиятельной фигурой в районе.
            </p>
          </section>
          <section aria-labelledby="moxi-birthday">
            <Heading level={2} id="moxi-birthday">
              День рождения Мокси
            </Heading>
            <p>
              7 марта 2236 года местная газета «Вулкан» писала о предстоящем дне
              рождения Мокси. Вестник видел в празднике возможность познакомить
              людей, готовых поддержать{" "}
              <a href={worldArticleHref("freedom")}>«Свободу»</a>.
            </p>
            <p>
              Три дня спустя газета «Эдем 24» сообщила о рейде в борделе и
              задержаниях. В тот же день «Град» задался вопросом, какую роль
              сыграли влиятельные знакомства некоторых гостей.
            </p>
          </section>
        </Reading>

        <RelatedWorldArticles slug="pompeii" />
      </article>
    </PageShell>
  );
}
