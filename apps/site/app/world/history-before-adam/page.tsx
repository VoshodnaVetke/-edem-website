import { ButtonLink, Heading, Reading } from "@edem/ui";
import { PageShell } from "../../../components/layout/PageShell";
import { siteHref } from "../../../config/site-href";
import styles from "../../../styles/page-layout.module.css";

export default function HistoryBeforeAdamArticle() {
  return (
    <PageShell
      eyebrow="ВСЕЛЕННАЯ / ИСТОРИЯ"
      title="История мира до Адама"
      intro={
        <Reading>
          <p>
            До возникновения Эдема человечество было разделено на независимые
            государства, отличавшиеся языками, религиями, политическими
            устройствами и интересами. Межгосударственная конкуренция и войны
            предшествовали глобальному кризису, который завершился разрушением
            прежнего мирового порядка.
          </p>
        </Reading>
      }
    >
      <article aria-labelledby="page-title" className={styles.stack}>
        <Reading>
          <section aria-labelledby="war">
            <Heading level={2} id="war">
              Пандемия и мировая война
            </Heading>
            <p>
              Пандемия COVID предшествовала мировой ядерной войне 2026 года.
              Официальная история Эдема описывает эти события как следствие
              человеческой разобщённости и нравственного упадка, придавая им
              религиозное объяснение.
            </p>
          </section>

          <section aria-labelledby="aftermath">
            <Heading level={2} id="aftermath">
              Послевоенные катастрофы
            </Heading>
            <p>
              После войны мир пережил голод и масштабные природные катастрофы,
              продолжавшиеся многие годы. В государственном учебнике особо
              выделено десятилетие, когда землетрясения, ураганы и наводнения
              вынуждали выживших объединяться в общины. Люди продолжали жить
              среди руин прежней цивилизации.
            </p>
          </section>

          <section aria-labelledby="first-adam">
            <Heading level={2} id="first-adam">
              Появление Первого Адама
            </Heading>
            <p>
              В официальной истории Первый Адам появляется среди общин выживших
              и начинает объединять людей вокруг идеи общего порядка, единства и
              справедливости. Так возникает Эдем, постепенно превращающийся в
              государство. Религиозное предание{" "}
              <a href={siteHref("/world/higher-path") + "#star-child"}>
                Высшего Пути
              </a>{" "}
              дополняет эту историю рассказом о Звёздном Дитя и Орионе.
            </p>
          </section>
        </Reading>

        <section aria-labelledby="related" className={styles.stack}>
          <Heading level={2} id="related">
            Связанные статьи
          </Heading>
          <div className={styles.actions}>
            <ButtonLink href={siteHref("/world/higher-path")}>
              Высший Путь
            </ButtonLink>
            <ButtonLink href={siteHref("/world/government")}>
              Государственное устройство Эдема
            </ButtonLink>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
