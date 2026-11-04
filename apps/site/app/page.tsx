"use client";

import { Heading, Layout, Text } from "@edem/ui";
import pageLayout from "../styles/page-layout.module.css";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className={pageLayout.page}>
      <section className={pageLayout.section} aria-labelledby="home-title">
        <Layout>
          <div className={pageLayout.stack}>
            <Heading level={1} id="home-title">
              Мастерская группа Эдема
            </Heading>
            <Text variant="lead">
              Авторская вселенная кабинетных и текстовых ролевых игр.
            </Text>
          </div>
        </Layout>
      </section>
    </main>
  );
}
