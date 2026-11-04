"use client";

import { Heading, Layout, TerminalPanel, Text } from "@edem/ui";
import pageLayout from "../styles/page-layout.module.css";
import styles from "./FoundationScreen.module.css";

export function FoundationScreen() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`${pageLayout.page} ${styles.foundation}`}
    >
      <section aria-labelledby="foundation-title" className={pageLayout.section}>
        <Layout>
          <div className={`${pageLayout.stack} ${styles.content}`}>
            <Text variant="system">ЭДЕМ / SITE FOUNDATION</Text>
            <Heading level={1} id="foundation-title">
              Мастерская группа Эдема
            </Heading>
            <Text variant="lead">
              Основа сайта подключена. Страницы и содержание будут
              разрабатываться отдельно от библиотеки компонентов.
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
      </section>
    </main>
  );
}
