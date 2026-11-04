"use client";

import { Heading, Layout, TerminalPanel, Text } from "@edem/ui";
import styles from "./FoundationScreen.module.css";

export function FoundationScreen() {
  return (
    <main id="main-content" className={styles.foundation}>
      <Layout>
        <div className={styles.content}>
          <Text variant="system">ЭДЕМ / SITE FOUNDATION</Text>
          <Heading level={1}>Мастерская группа Эдема</Heading>
          <Text variant="lead">
            Основа сайта подключена. Страницы и содержание будут разрабатываться
            отдельно от библиотеки компонентов.
          </Text>
          <TerminalPanel
            className={styles.panel}
            code="SYSTEM / SITE"
            status="READY"
            footer="UI LIBRARY CONNECTED"
            reveal={false}
          >
            <Heading level={3}>Интерфейсная библиотека активна</Heading>
            <Text>
              Карточки, типографика и цвета используют общую систему @edem/ui.
            </Text>
          </TerminalPanel>
        </div>
      </Layout>
    </main>
  );
}
