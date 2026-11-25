"use client";

import { Heading, Reading } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
import { worldArticleHref } from "../../../config/world-articles";
import styles from "../../../styles/page-layout.module.css";
import { RelatedWorldArticles } from "../RelatedWorldArticles";
import { WorldArticleReading } from "../WorldArticleReading";

export default function SkeosArticle() {
  return (
    <PageShell
      eyebrow="ВСЕЛЕННАЯ / МИР И ГЕОГРАФИЯ"
      title="Скеос"
      intro={
        <WorldArticleReading slug="skeos">
          <p>
            За{" "}
            <a href={worldArticleHref("neutral-lands")}>Нейтральными землями</a>{" "}
            лежит Скеос, самостоятельное государство с холодными равнинами и
            горными районами. В местной одежде часто встречаются кожаные куртки,
            шапки и большие очки. Детали имплантов здесь нередко оставляют на
            виду, а шестерёнки носят как украшения.
          </p>
        </WorldArticleReading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <section aria-labelledby="corporate-government">
            <Heading level={2} id="corporate-government">
              Власть корпораций
            </Heading>
            <p>
              Полное название страны — Корпоративная Технократическая Федерация
              Скеос. Ею управляет совет руководителей корпораций. Большую часть
              государственных функций передали частным компаниям. В самой
              Федерации считают, что свободная конкуренция между ними двигает
              общество вперёд. Двойное кольцо на государственном гербе
              символизирует единство корпораций и государства.
            </p>
            <p>
              В Скеосе добывают руду, минералы и драгоценные металлы. Здесь
              развиты оружейное дело, инженерия и кибернетика. Часть своих
              разработок скеосийцы называют техномагией. С ней связаны широко
              распространённые в стране{" "}
              <a href={worldArticleHref("cybernetics-and-implants")}>
                импланты-коннекторы
              </a>
              .
            </p>
          </section>
          <section aria-labelledby="genetic-passport">
            <Heading level={2} id="genetic-passport">
              Генетический паспорт
            </Heading>
            <p>
              На въезде в Скеос иностранцев ждут генетические проверки. Их объём
              зависит от цели поездки. У каждого гражданина Скеоса есть
              генетический паспорт.
            </p>
            <p>
              Евгеника — открытая часть государственной политики Федерации.
              Государство и корпорации участвуют в регулировании рождаемости.
              Для отдельных категорий граждан действуют ограничения на право
              иметь детей. Базовая генетическая коррекция будущих детей
              обязательна и бесплатна, а за выбор дополнительных характеристик,
              например внешности, приходится платить.
            </p>
          </section>
          <section aria-labelledby="women">
            <Heading level={2} id="women">
              Положение женщин
            </Heading>
            <p>
              В Скеосе от женщин обычно не ждут, что они будут устраиваться на
              работу, поэтому большинство из них остаётся дома. Закон
              ограничивает для женщин доступ к работе в шахтах, военным и
              политическим должностям.
            </p>
            <p>Эдем резко осуждает неравное положение женщин в Федерации.</p>
          </section>
          <section aria-labelledby="relations-with-edem">
            <Heading level={2} id="relations-with-edem">
              Отношения с Эдемом
            </Heading>
            <p>
              Отношения между Эдемом и Скеосом напряжённые. Государства
              сохраняют торговые связи через Нейтральные земли. Для въезда в
              Эдем гражданам Скеоса требуется разрешение. Чтобы его получить,
              они должны обосновать причину поездки. Передвигаться по территории
              Эдема им разрешено только в сопровождении.
            </p>
          </section>
        </Reading>

        <RelatedWorldArticles slug="skeos" />
      </article>
    </PageShell>
  );
}
