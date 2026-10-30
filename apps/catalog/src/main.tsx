import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Gallery, Heading, Layout, Text, TextField } from "@edem/ui";
import { samples } from "./examples";
import "@edem/ui/styles.css";
import "@edem/ui/fonts.css";
import "./catalog.css";
function Copy({ value }: { value: string }) {
  const [label, set] = useState("Копировать");
  return (
    <Button
      size="sm"
      onClick={() => {
        void navigator.clipboard.writeText(value).then(
          () => set("Скопировано"),
          () => set("Копирование недоступно"),
        );
      }}
    >
      {label}
    </Button>
  );
}
function App() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const visible = samples.filter(
    (s) =>
      (status === "all" ||
        Boolean(s.preliminary) === (status === "preliminary")) &&
      (s.title + " " + s.group)
        .toLocaleLowerCase("ru")
        .includes(query.toLocaleLowerCase("ru")),
  );
  return (
    <>
      <a className="skip" href="#catalog">
        Перейти к компонентам
      </a>
      <Layout>
        <header className="catalog-header">
          <Text variant="system">ЭДЕМ / REACT UI · 0.1.0</Text>
          <Heading level={1}>Библиотека компонентов</Heading>
          <Text variant="lead">
            Живые примеры, состояния и код подключения.
          </Text>
        </header>
        <section id="usage" className="catalog-usage" aria-label="Подключение">
          <Heading level={2}>Подключение</Heading>
          <pre>
            <code>
              {
                'import { Button, Card } from "@edem/ui";\nimport "@edem/ui/styles.css";\nimport "@edem/ui/fonts.css";'
              }
            </code>
          </pre>
          <Text>
            Все маршруты, содержимое и результаты операций передаются
            приложением. Навигация и три образца семейства кнопок сохраняют
            предварительный статус.
          </Text>
        </section>
        <main id="catalog">
          <div className="catalog-filters">
            <TextField
              label="Найти компонент"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="demo-actions">
              {[
                ["all", "Все"],
                ["approved", "Утверждённые"],
                ["preliminary", "Предварительные"],
              ].map(([value, label]) => (
                <Button
                  key={value}
                  selected={status === value}
                  onClick={() => setStatus(value)}
                >
                  {label}
                </Button>
              ))}
            </div>
            <p role="status">
              {visible.length} / {samples.length}
            </p>
          </div>
          <Gallery className="catalog-gallery">
            {visible.map((sample) => (
              <section
                key={sample.id}
                id={sample.id}
                className="catalog-sample"
                data-sample={sample.id}
              >
                <div className="catalog-sample__meta">
                  {sample.group} ·{" "}
                  {sample.preliminary ? "PRELIMINARY" : "APPROVED"}
                </div>
                <Heading level={2}>{sample.title}</Heading>
                <div className="catalog-preview">{sample.render()}</div>
                <details>
                  <summary>React API и пример</summary>
                  <pre>
                    <code>{sample.example}</code>
                  </pre>
                  <Copy value={sample.example} />
                </details>
              </section>
            ))}
          </Gallery>
        </main>
        <footer>
          <Text variant="system">
            37 образцов / 33 approved / 4 preliminary
          </Text>
        </footer>
      </Layout>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
