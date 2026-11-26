"use client";

import { Heading, Reading } from "@edem/ui";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { WorldArticleFooter } from "../WorldArticleFooter";
import { WorldArticleShell } from "../WorldArticleShell";
import { WorldSourceExcerpt } from "../WorldSourceExcerpt";
import { paradeOfTechnologyArticle } from "../parade-of-technology-article";
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
            В Эдеме техника давно стала частью повседневной жизни. После{" "}
            <a href={worldArticleHref("history-before-adam")}>ядерной войны</a>{" "}
            часть научных знаний и данных была утрачена. Большую часть
            утраченного со временем удалось восстановить. На этой основе Эдем
            продолжил исследования и по многим направлениям далеко ушёл от
            возможностей XXI века.
          </p>
        </WorldArticleReading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <p>
            В клиниках ставят кибернетические протезы, а по улицам{" "}
            <a href={worldArticleHref("western-city")}>Западного города</a>{" "}
            ездят гиперкары на автопилоте. Если сесть за руль самому, машина
            сначала проверит{" "}
            <a href={worldArticleHref("licenses")}>водительскую лицензию</a>.
            Для этого она считывает данные{" "}
            <a href={worldArticleHref("neurochip")}>нейрочипа</a>, который
            устанавливают каждому гражданину при рождении.
          </p>
          <section aria-labelledby="computing">
            <Heading level={2} id="computing">
              Визор вместо домашнего компьютера
            </Heading>
            <p>
              Из-за нехватки ресурсов домашний компьютер могут позволить себе
              немногие. Компьютеры чаще стоят на рабочих местах в компаниях и
              государственных учреждениях. В том числе их используют для
              хранения данных внутри организации. Одно из направлений прикладных
              исследований в Эдеме — сокращение расхода сырья и затрат на
              производство техники.
            </p>
            <p>
              Большинство жителей обходятся визором. Это небольшой встроенный
              имплант, который выполняет примерно ту же роль, что смартфон в XXI
              веке. Через него выходят на связь, пользуются интернетом и даже
              играют. Для игр и других требовательных программ обычно используют
              облачные сервисы: вычисления идут на удалённых серверах, а визор
              получает результат.
            </p>
            <p>
              Для задач, которые нужно выполнять на собственном устройстве,
              нетраннеры, операторы дронов и инженеры часто используют{" "}
              <a
                href={
                  worldArticleHref("cybernetics-and-implants") + "#cyberdeck"
                }
              >
                кибердеку
              </a>
              . Для неё нужно разрешение. Обычные визоры, другие бытовые
              импланты и нейрочип работают без лицензии.
            </p>
          </section>
          <section aria-labelledby="ecology">
            <Heading level={2} id="ecology">
              Земля для посевов и пастбищ
            </Heading>
            <p>
              После ядерной войны большая часть земель оказалась загрязнена
              радиацией. На таких участках нельзя выращивать продовольствие или
              пасти скот. Поэтому развитие экологии как науки стало для Эдема
              одной из ключевых задач. Государство и корпорации уже применяют{" "}
              <a href={worldArticleHref("neutral-lands") + "#recovery"}>
                технологии очистки почвы
              </a>
              . Обработка требует больших затрат, зато даёт возможность вернуть
              землю под посевы и пастбища.
            </p>
          </section>
          <section aria-labelledby="everyday-technology">
            <Heading level={2} id="everyday-technology">
              Кто занимается исследованиями
            </Heading>
            <p>
              Технику для быта и промышленности выпускают{" "}
              <a href={worldArticleHref("corporations")}>корпорации</a>{" "}
              InnovatX, Holland Industries и Enigma. Например, InnovatX
              использовала на одной из экологических акций дронов, которые
              распознавали мусор с помощью нейросети. У государства есть свой
              Научный отдел, а за значимый вклад в исследования начисляют баллы
              социального рейтинга.
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
              На Параде технологий 2214 года InnovatX представила новые
              устройства, в том числе протезы рук и ног. Аметист Жорн рассказала
              об этой презентации в «Эдеме 24».
            </p>
            <WorldSourceExcerpt {...paradeOfTechnologyArticle} />
            <p>
              За время между выставкой и выходом устройства на рынок обещанную
              прочность ещё предстоит проверить. В клиниках{" "}
              <a href={worldArticleHref("cybernetics-and-implants")}>
                кибернетические протезы
              </a>{" "}
              заменяют утраченные конечности и помогают вернуть подвижность.
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
