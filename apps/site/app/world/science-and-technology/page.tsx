"use client";

import { Heading, Reading } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { RelatedWorldArticles } from "../RelatedWorldArticles";
import { WorldArticleReading } from "../WorldArticleReading";

export default function ScienceAndTechnologyArticle() {
  return (
    <PageShell
      eyebrow="ВСЕЛЕННАЯ / НАУКА И ТЕХНОЛОГИИ"
      title="Наука и технологии Эдема"
      intro={
        <WorldArticleReading slug="science-and-technology">
          <p>
            В <a href={worldArticleHref("western-city")}>Западном городе</a>{" "}
            скоростные поезда идут над улицами. Для поездки можно вызвать и
            гиперкар на автопилоте. А если вы сами садитесь за руль, машина
            проверит водительскую лицензию ещё до того, как тронется с места.
          </p>
        </WorldArticleReading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <p>
            Разрешение привязано к{" "}
            <a href={worldArticleHref("neurochip")}>нейрочипу</a>, который
            каждому гражданину устанавливают при рождении. По этому же чипу
            государственные службы подтверждают личность человека. С чипом
            связан и социальный рейтинг, от которого зависит доступ к некоторым
            устройствам. Так что с{" "}
            <a href={worldArticleHref("licenses")}>проверкой лицензии</a> можно
            столкнуться и дома, за компьютером или при использовании визора,
            кибердеки и некоторых видов бытовой техники.
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
              , которые заменяют утраченные конечности. Здесь снова имеет
              значение рейтинг. Он может дать льготы на лечение и доступ к
              высококлассным клиникам. Даже с такими льготами лечение тяжёлых
              заболеваний может обходиться дорого.
            </p>
          </section>
        </Reading>

        <RelatedWorldArticles slug="science-and-technology" />
      </article>
    </PageShell>
  );
}
