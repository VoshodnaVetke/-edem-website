# Эдем · React UI

Библиотека интерфейсных компонентов мастерской группы «Эдем» и живой каталог из 37 утверждённых образцов. Компоненты, токены и актуальные правила находятся в одном месте — [packages/ui](packages/ui/README.md).

## Запуск

Нужен Node.js 22.12+.

```sh
npm ci
npm run dev
```

Каталог откроется на `http://localhost:5173`. Изменения компонентов и CSS подхватываются без ручной сборки.

Отдельный сайт: `npm run dev:site` (сначала сборка UI, затем Next.js на `http://localhost:3000`). Команда `npm run build:site` собирает UI и сайт.

## Сборка и проверки

```sh
npm run build
npm test
npx playwright install --with-deps chromium
npm run test:browser
npm run typecheck
```

`npm run check` выполняет проверку типов, unit/SSR-тесты, сборку пакета, каталога и каркаса сайта, браузерные тесты каталога. `CHROMIUM_PATH` позволяет использовать установленный системный Chromium.

## Использование

Внутри workspace:

```tsx
import { Button, Card, Heading, Text } from '@edem/ui';
import '@edem/ui/styles.css';
import '@edem/ui/fonts.css'; // локальные шрифты, по необходимости

export function Example() {
  return (
    <Card frame="system">
      <Heading level={3}>Заголовок</Heading>
      <Text>Содержимое передаётся приложением.</Text>
      <Button onClick={() => console.log('action')}>Действие</Button>
    </Card>
  );
}
```

Для другого проекта создать установочный архив:

```sh
npm run build
npm pack -w @edem/ui --pack-destination .
# В другом проекте:
npm install /path/to/edem-ui-0.1.0.tgz
```

Пакет ещё не опубликован в npm. React 18.3 и React 19 — peer dependencies. Шрифты загружаются локально; сетевые CDN не требуются. Three.js загружается отдельно при `TreeBackground renderer="webgl"`; без WebGL остаётся SVG.

## Структура

- `packages/ui` — библиотека, типы, SVG-геометрия, CSS-токены, состояния и доступность.
- `apps/catalog` — текущие React-примеры и код подключения.
- `apps/site` — каркас публичного сайта на Next.js, использующий `@edem/ui`.
- `tests/unit` — поведение API, SSR, отмена запросов и очистка ресурсов.
- `tests/browser` — адаптивность, touch, фокус, диалоги, шрифты и WCAG A/AA.
- [Архитектура сайта](docs/ARCHITECTURE.md) и [решения о продукте](docs/DECISIONS.md) — отдельные задачи сайта.

Предыдущие HTML-атласы, версии демонстраций и документы об элементах удалены из рабочей версии. Текущие API и визуальные правила описаны в библиотеке, без параллельных спецификаций. Каталог содержит демонстрационный контент; это не главная страница сайта.
