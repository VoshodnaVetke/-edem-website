"use client";

import { ButtonLink, Heading, Layout, Text } from "@edem/ui";
import pageLayout from "../../../styles/page-layout.module.css";
import styles from "./ShellDemo.module.css";

export default function ShellDemoPage() {
  return (
    <main id="main-content" tabIndex={-1} className={pageLayout.page}>
      <section className={pageLayout.section} aria-labelledby="demo-title">
        <Layout>
          <div className={`${pageLayout.stack} ${styles.intro}`}>
            <Text variant="system">ЭДЕМ / UI SHELL / STEP 04</Text>
            <Heading level={1} id="demo-title">
              Шапка, навигация и подвал
            </Heading>
            <Text variant="lead">
              Одна оболочка для всех страниц. Оба образца ниже используют
              утверждённый Navigation C из @edem/ui; мобильная версия не
              воспроизводится отдельным компонентом.
            </Text>
            <Text>
              Меню, поиск по доступным страницам, клавиатурная навигация и
              ссылки работают внутри каждого окна. Горизонтальная прокрутка
              десктопного окна нужна только при узком экране просмотра.
            </Text>
            <div className={styles.actions}>
              <ButtonLink href="/demo/shell/preview">
                Открыть оболочку на весь экран
              </ButtonLink>
            </div>
          </div>
          <div className={styles.examples}>
            <section
              className={styles.desktopExample}
              aria-labelledby="desktop-title"
            >
              <Heading level={2} id="desktop-title">
                Десктоп · 960 px
              </Heading>
              <div className={styles.viewport}>
                <iframe
                  className={styles.desktopFrame}
                  src="/demo/shell/preview"
                  title="Демонстрация шапки, навигации и подвала на десктопе"
                  loading="lazy"
                />
              </div>
            </section>
            <section
              className={styles.mobileExample}
              aria-labelledby="mobile-title"
            >
              <Heading level={2} id="mobile-title">
                Телефон · 390 px
              </Heading>
              <div className={styles.viewport}>
                <iframe
                  className={styles.mobileFrame}
                  src="/demo/shell/preview"
                  title="Демонстрация мобильной навигации и подвала"
                  loading="lazy"
                />
              </div>
            </section>
          </div>
        </Layout>
      </section>
    </main>
  );
}
