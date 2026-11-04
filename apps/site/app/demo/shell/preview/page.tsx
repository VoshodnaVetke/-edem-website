"use client";

import { Card, Heading, Layout, Text } from "@edem/ui";
import pageLayout from "../../../../styles/page-layout.module.css";
import styles from "./ShellPreview.module.css";

export default function ShellPreviewPage() {
  return (
    <main id="main-content" tabIndex={-1} className={pageLayout.page}>
      <section className={pageLayout.section} aria-labelledby="preview-title">
        <Layout>
          <div className={`${pageLayout.stack} ${styles.content}`}>
            <Text variant="system">ЭДЕМ / ПРИМЕР ОБОЛОЧКИ</Text>
            <Heading level={1} id="preview-title">
              Структура страницы
            </Heading>
            <Text variant="lead">
              Одинаковые компоненты шапки и подвала на любом экране.
            </Text>
            <Card frame="double" reveal={false}>
              <Heading level={3}>Содержимое страницы</Heading>
              <Text>
                Это демонстрационный блок между общими компонентами. Он не
                содержит игровых событий, заявок или закрытого лора.
              </Text>
            </Card>
          </div>
        </Layout>
      </section>
    </main>
  );
}
