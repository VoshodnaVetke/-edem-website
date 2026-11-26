"use client";

import { Heading, Reading } from "@edem/ui";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { WorldArticleFooter } from "../WorldArticleFooter";
import { WorldArticleShell } from "../WorldArticleShell";
import { WorldArticleReading } from "../WorldArticleReading";

export default function ScienceAndTechnologyArticle() {
  return (
    <WorldArticleShell
      slug="science-and-technology"
      eyebrow="ВСЕЛЕННАЯ / НАУКА И ТЕХНОЛОГИИ"
      title="Наука и технологии Эдема"
      intro={
        <WorldArticleReading slug="science-and-technology">
          <p>
            В Эдеме техника давно стала частью повседневной жизни. Дома работают
            роботы-уборщики, а в клиниках ставят кибернетические протезы. В{" "}
            <a href={worldArticleHref("western-city")}>Западном городе</a>{" "}
            скоростные поезда идут над улицами, а для поездки можно вызвать
            гиперкар на автопилоте. Если сесть за руль самому, машина сначала
            проверит{" "}
            <a href={worldArticleHref("licenses")}>водительскую лицензию</a>.
          </p>
        </WorldArticleReading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <p>
            Машина проверяет разрешение по{" "}
            <a href={worldArticleHref("neurochip")}>нейрочипу</a>, который
            устанавливают каждому гражданину при рождении. По тому же чипу
            государственные службы подтверждают личность владельца. С ним связан
            социальный рейтинг, от которого зависит доступ к некоторым
            устройствам. Проверка разрешения бывает нужна и дома, чтобы
            воспользоваться компьютером, визором или другой техникой.
          </p>
          <section aria-labelledby="everyday-technology">
            <Heading level={2} id="everyday-technology">
              Как техника входит в обиход
            </Heading>
            <p>
              Обычного робота-уборщика можно купить в магазине. Похожую работу
              поручают машинам и за порогом дома. На одной из экологических
              акций InnovatX отправила на уборку дронов, которые распознавали
              мусор с помощью нейросети.
            </p>
            <p>
              Технику для повседневной жизни выпускают{" "}
              <a href={worldArticleHref("corporations")}>корпорации</a>{" "}
              InnovatX, Holland Industries и Enigma. У государства есть свой
              Научный отдел, а за значимый вклад в науку в Эдеме начисляют баллы
              рейтинга. Когда компании готовят новые разработки к выпуску,
              горожане узнают о них на выставках и из газет.
            </p>
            <p>
              Часть исследований связана с промышленностью. В{" "}
              <a href={worldArticleHref("northern-city")}>Северном городе</a>{" "}
              научные центры изучают местные ресурсы и способы добычи. Там же
              ведут закрытые исследования, о результатах которых государство
              публично не сообщает.
            </p>
          </section>
          <section aria-labelledby="from-exhibition-to-clinic">
            <Heading level={2} id="from-exhibition-to-clinic">
              От выставки до клиники
            </Heading>
            <p>
              После «Парада технологий» газета «Эдем 24» рассказала о новых
              визорах и кибердеках. Среди анонсов были и протезы рук и ног.
              Разработчики обещали повысить их прочность.
            </p>
            <p>
              В клиниках уже применяют{" "}
              <a href={worldArticleHref("cybernetics-and-implants")}>
                кибернетические протезы
              </a>
              , которые заменяют утраченные конечности.
            </p>
            <p>
              Когда новая разработка доходит до клиники, перед пациентом встаёт
              вопрос о цене лечения. Высокий социальный рейтинг может дать
              льготы и доступ к хорошо оснащённым клиникам. При тяжёлой болезни
              даже льготное лечение может обойтись дорого.
            </p>
          </section>
        </Reading>

        <WorldArticleFooter slug="science-and-technology" />
      </article>
    </WorldArticleShell>
  );
}
