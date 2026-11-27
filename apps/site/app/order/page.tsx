"use client";

import { Card, Grid, Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import styles from "../../styles/page-layout.module.css";

const formats = [
  [
    "Кабинетная игра",
    "Ролевая игра в помещении. Участники ведут переговоры, разыгрывают сцены и принимают решения за своих персонажей.",
    "asym",
  ],
  [
    "Полигонная игра",
    "Игра на площадке под открытым небом. При подготовке важно обсудить территорию, продолжительность и условия на месте.",
    "system",
  ],
  [
    "D&D",
    "Настольное приключение с ведущим. Можно заранее описать состав группы, игровой опыт и желаемую продолжительность.",
    "double",
  ],
  [
    "Ролевой бал",
    "Событие, в котором танцы и общение становятся частью истории. Опишите, какую роль должны играть костюмы, танцевальная программа и сюжет.",
    "asym",
  ],
] as const;

export default function OrderPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / ИГРЫ ПОД ЗАКАЗ"
      title="Заказать игру"
      description="Начните с повода, участников и истории, которую хотите прожить вместе. Эти детали помогут подобрать формат ролевого события."
    >
      <section aria-labelledby="formats">
        <Heading level={2} id="formats" className={styles.sectionHeading}>
          От идеи до игры
        </Heading>
        <Grid>
          {formats.map(([name, detail, frame]) => (
            <Card
              telemetry
              key={name}
              frame={frame}
              className="edem-span--half"
              reveal={false}
            >
              <div className={styles.cardBody}>
                <Heading level={3}>{name}</Heading>
                <Text>{detail}</Text>
              </div>
            </Card>
          ))}
        </Grid>
      </section>

      <section aria-labelledby="brief" className={styles.stack}>
        <Heading level={2} id="brief">
          Расскажите о своей идее
        </Heading>
        <Text>Ответьте на несколько вопросов, чтобы подготовить запрос.</Text>
        <ol className={styles.steps}>
          <li>
            <strong>Повод и аудитория.</strong> Для кого игра, сколько будет
            участников и есть ли у них опыт ролевых игр?
          </li>
          <li>
            <strong>Формат и атмосфера.</strong> Какой истории или впечатления
            вы хотите? Если с форматом ещё не определились, опишите саму идею.
          </li>
          <li>
            <strong>Дата и площадка.</strong> Укажите город, желаемое время,
            продолжительность и что уже известно о месте проведения.
          </li>
          <li>
            <strong>Связь.</strong> Подготовьте удобный контакт для обсуждения.
          </li>
        </ol>
        <Text>Отправка запросов с этой страницы пока недоступна.</Text>
      </section>
    </PageShell>
  );
}
