"use client";

import {
  ButtonLink,
  Card,
  Grid,
  Heading,
  Text,
  type CardProps,
} from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import { siteHref } from "../../config/site-href";
import styles from "../../styles/page-layout.module.css";

const archive: {
  title: string;
  frame: CardProps["frame"];
  albums: string[];
  summary?: string;
}[] = [
  {
    title: "Ад на земле",
    frame: "asym",
    albums: ["https://vk.ru/album-224149467_309547135"],
  },
  {
    title: "Тени Восточного города",
    frame: "system",
    albums: ["https://vk.ru/album-224149467_308118503"],
  },
  {
    title: "Парад технологий",
    frame: "double",
    albums: ["https://vk.ru/album-224149467_305437371"],
    summary:
      "Изобретатели представляют разработки, а корпорации ищут перспективные проекты и договариваются о сделках. В центре игры — инвестиции, переговоры и соперничество за право заняться новым проектом.",
  },
  {
    title: "Казино Мефиса",
    frame: "asym",
    albums: ["https://vk.ru/album-224149467_303755489"],
  },
  {
    title: "Казнь Огня Вечного",
    frame: "system",
    albums: [
      "https://vk.ru/album-224149467_300790782",
      "https://vk.ru/album-224149467_299694271",
    ],
  },
];

export default function GamesPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / АРХИВ"
      title="Наши игры"
      description="Проведённые игры мастерской и ссылки на фотографии в ВК."
    >
      <section aria-labelledby="archive">
        <Heading level={2} id="archive" className={styles.sectionHeading}>
          Архив проектов
        </Heading>
        <Grid>
          {archive.map(({ title, summary, frame, albums }) => (
            <Card
              key={title}
              frame={frame}
              className="edem-span--half"
              reveal={false}
            >
              <div className={styles.cardBody}>
                <Text variant="system">Кабинетная ролевая игра</Text>
                <Heading level={3}>{title}</Heading>
                {summary && <Text>{summary}</Text>}
                <div className={styles.actions}>
                  {albums.map((href, index) => {
                    const label =
                      albums.length === 1
                        ? "Фото в ВК"
                        : `Альбом ${index + 1} в ВК`;
                    return (
                      <ButtonLink
                        key={href}
                        href={href}
                        size="sm"
                        aria-label={`${label} — «${title}»`}
                      >
                        {label}
                      </ButtonLink>
                    );
                  })}
                </div>
              </div>
            </Card>
          ))}
        </Grid>
      </section>

      <section aria-labelledby="next-game" className={styles.stack}>
        <Heading level={2} id="next-game">
          Хотите попасть на следующую игру?
        </Heading>
        <Text>
          Следите за афишей. В анонсах появятся даты и условия записи.
        </Text>
        <div className={styles.actions}>
          <ButtonLink href={siteHref("/events")}>Посмотреть афишу</ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
