"use client";

import { Heading, Text } from "@edem/ui";
import { PageShell } from "../../components/layout/PageShell";
import styles from "../../styles/page-layout.module.css";

export default function OrderPage() {
  return (
    <PageShell
      eyebrow="ЭДЕМ / ИГРЫ ПОД ЗАКАЗ"
      title="Заказать игру"
      description="Разработка ролевого события под ваш запрос."
    >
      <Heading level={2} className={styles.sectionHeading}>
        Расскажите о своей идее
      </Heading>
      <Text>
        Форма заявки и способы связи будут добавлены после согласования
        организационного процесса. Сейчас отправка запросов через сайт
        недоступна.
      </Text>
    </PageShell>
  );
}
