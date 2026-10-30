import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import {
  Button,
  ButtonLink,
  Chip,
  GlitchText,
  Heading,
  LinkCard,
  Loader,
  Navigation,
  Progress,
  Rail,
  Reading,
  SignalDivider,
  SignalStrip,
  StatusPanel,
  SystemOrb,
  TerminalPanel,
  Text,
  TextField,
  TreeBackground,
  type FrameVariant,
  type AsyncState,
} from "@edem/ui";
export type Sample = {
  id: string;
  title: string;
  group: string;
  preliminary?: boolean;
  example: string;
  render: () => ReactNode;
};
function ToggleExample() {
  const [selected, set] = useState(false);
  return (
    <Chip selected={selected} onClick={() => set(!selected)}>
      Рубрика {selected ? "выбрана" : ""}
    </Chip>
  );
}
function FieldExample() {
  const [value, set] = useState("");
  const [submitted, submit] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(true);
      }}
    >
      <TextField
        label="Название"
        value={value}
        onChange={(e) => set(e.target.value)}
        error={submitted && !value.trim() ? "Введите название" : undefined}
        success={submitted && value.trim() ? "Значение принято" : undefined}
        description="Демонстрация валидации"
      />
      <Button type="submit">Проверить</Button>
    </form>
  );
}
function ButtonStates() {
  const [state, set] = useState<AsyncState>("idle");
  return (
    <>
      <div className="demo-actions">
        <Button state={state}>
          {state === "loading" ? "Загрузка…" : "Действие"}
        </Button>
        <Button disabled>Недоступно</Button>
      </div>
      <div className="demo-actions">
        {(["idle", "loading", "success", "error"] as const).map((value) => (
          <Button
            key={value}
            selected={state === value}
            onClick={() => set(value)}
            size="sm"
          >
            {value}
          </Button>
        ))}
      </div>
      <Text variant="system">Пример состояния: {state}</Text>
    </>
  );
}
function PanelStates() {
  const [state, set] = useState<
    "idle" | "loading" | "success" | "error" | "disabled"
  >("idle");
  const labels = {
    idle: "Ожидание команды",
    loading: "Загрузка данных",
    success: "Данные получены",
    error: "Не удалось получить данные",
    disabled: "Модуль отключён",
  };
  return (
    <>
      <StatusPanel state={state} statusLabel={labels[state]}>
        <p>Состояние задаётся приложением.</p>
      </StatusPanel>
      <div className="demo-actions">
        {(["idle", "loading", "success", "error", "disabled"] as const).map(
          (value) => (
            <Button
              key={value}
              selected={state === value}
              onClick={() => set(value)}
              size="sm"
            >
              {value}
            </Button>
          ),
        )}
      </div>
    </>
  );
}
function TransferExample() {
  const [transfer, setTransfer] = useState({ value: 0, packets: 0 }),
    [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0,
      start: number | undefined;
    function finish() {
      cancelAnimationFrame(raf);
      setTransfer({ value: 100, packets: 100 });
      setRunning(false);
    }
    function motion() {
      if (reduced.matches) finish();
    }
    function frame(time: number) {
      start ??= time;
      const t = Math.min(1, (time - start) / 4200);
      setTransfer({ value: t * t * (3 - 2 * t) * 100, packets: t * 100 });
      if (t < 1) raf = requestAnimationFrame(frame);
      else finish();
    }
    if (reduced.matches) finish();
    else raf = requestAnimationFrame(frame);
    reduced.addEventListener("change", motion);
    return () => {
      cancelAnimationFrame(raf);
      reduced.removeEventListener("change", motion);
    };
  }, [running]);
  return (
    <>
      <Progress
        label="DATA LOSS / передача"
        value={transfer.value}
        style={
          { "--edem-packet-progress": `${transfer.packets}%` } as CSSProperties
        }
      />
      <div className="demo-actions">
        <Button
          disabled={running}
          onClick={() => {
            setTransfer({ value: 0, packets: 0 });
            setRunning(true);
          }}
        >
          {running ? "ПЕРЕДАЧА…" : "ПЕРЕДАТЬ СИГНАЛ ↗"}
        </Button>
      </div>
      <Text variant="system">
        Демонстрация анимации · 4,2 с. В приложении прогресс задаётся реальной
        операцией.
      </Text>
    </>
  );
}
const navItems = [
  { label: "Каталог", href: "#catalog" },
  { label: "Документация", href: "#usage" },
  { label: "Состояния", href: "#states" },
];
const search = (query: string) =>
  navItems.filter((item) =>
    item.label.toLocaleLowerCase("ru").includes(query.toLocaleLowerCase("ru")),
  );
function NavigationExample() {
  return (
    <Navigation
      brand="ЭДЕМ"
      items={navItems}
      bottomItems={navItems}
      currentHref="#catalog"
      account={{ label: "Кабинет", href: "#usage" }}
      onSearch={search}
    />
  );
}
function TreeExample() {
  const [renderer, set] = useState<"svg" | "webgl">("svg");
  return (
    <>
      <TreeBackground renderer={renderer} />
      <Button
        selected={renderer === "webgl"}
        onClick={() => set(renderer === "svg" ? "webgl" : "svg")}
      >
        WebGL
      </Button>
    </>
  );
}
export const samples: Sample[] = [
  {
    id: "tree",
    title: "Дерево Эдема",
    group: "Основа",
    example: "<TreeBackground />",
    render: () => <TreeExample />,
  },
  {
    id: "intro",
    title: "Вводная композиция",
    group: "Основа",
    example:
      "<Heading level={1}><GlitchText>SIGNAL SPLIT</GlitchText></Heading>",
    render: () => (
      <>
        <Heading level={1}>
          <GlitchText>SIGNAL SPLIT</GlitchText>
        </Heading>
        <Text variant="lead">React-компоненты цифрового архива.</Text>
      </>
    ),
  },
  {
    id: "reading",
    title: "Длинный текст",
    group: "Основа",
    example: "<Reading><p>Содержательный текст…</p></Reading>",
    render: () => (
      <Reading>
        <Heading level={3}>Образец длинного текста</Heading>
        <p>
          Onest предназначен для содержательных материалов. Размер текста и
          длина строки адаптируются к доступному пространству, сохраняя
          спокойный ритм чтения.
        </p>
        <p>Содержание этого каталога — демонстрационные подписи.</p>
      </Reading>
    ),
  },
  {
    id: "rail",
    title: "Вертикальный акцент",
    group: "Основа",
    example: "<Rail><Text>Вводное пояснение</Text></Rail>",
    render: () => (
      <Rail>
        <Text>
          Тёмная тема, белые рукописные контуры и технологичная типографика.
        </Text>
      </Rail>
    ),
  },
  {
    id: "orb",
    title: "Системная орбита",
    group: "Основа",
    example: '<SystemOrb label="Связь активна" />',
    render: () => <SystemOrb label="Пример активного сигнала" />,
  },
  {
    id: "colors",
    title: "Цветовые токены",
    group: "Основа",
    example:
      "background: var(--edem-color-background); color: var(--edem-color-text-primary);",
    render: () => (
      <div className="demo-palette">
        {[
          ["Фон", "#05070C"],
          ["Поверхность", "#141923"],
          ["Текст", "#EAF0FA"],
          ["Белый", "#FFFFFF"],
          ["Циан", "#25F4FF"],
          ["Фиолетовый", "#BC5CFF"],
          ["Успех", "#7CE7C1"],
          ["Ошибка", "#FF8295"],
        ].map(([name, color]) => (
          <div key={name}>
            <span style={{ background: color }} />
            <b>{name}</b>
            <code>{color}</code>
          </div>
        ))}
      </div>
    ),
  },
  ...Array.from({ length: 9 }, (_, i): Sample => {
    const frame = (["system", "double", "asym"] as FrameVariant[])[i % 3];
    return {
      id: `card-${i + 1}`,
      title: `Карточка ${i + 1} / ${frame}`,
      group: "Карточки",
      example: `<TerminalPanel frame="${frame}" code="EDEN / MODULE"><Heading level={3}>Заголовок</Heading><Text>Содержимое</Text></TerminalPanel>`,
      render: () => (
        <TerminalPanel
          frame={frame}
          code={`EDEN / MODULE_${String(i + 1).padStart(2, "0")}`}
          accent={i % 2 ? "violet" : "cyan"}
          footer="AWAITING INPUT"
          channel={
            i % 3 === 0 ? (
              <>
                <Text variant="system">LINK // 03</Text>
                <SystemOrb label="Пример сигнала" code="CHANNEL" />
              </>
            ) : undefined
          }
        >
          <Heading level={3}>Заголовок {i + 1}</Heading>
          <Text>
            Карточка растёт по содержимому. Геометрия рамки выбирается
            независимо от типа материала.
          </Text>
          {i > 5 && (
            <div className="demo-actions">
              <Button>Действие</Button>
              <ButtonLink href="#usage">Подробнее</ButtonLink>
            </div>
          )}
        </TerminalPanel>
      ),
    };
  }),
  {
    id: "cta",
    title: "Основное и вторичное действия",
    group: "Кнопки",
    example:
      '<Button>Действие</Button><ButtonLink href="/games">Игры</ButtonLink>',
    render: () => (
      <div className="demo-actions">
        <Button>Действие</Button>
        <ButtonLink href="#usage">Подробнее ↗</ButtonLink>
      </div>
    ),
  },
  {
    id: "states",
    title: "Состояния кнопки",
    group: "Кнопки",
    example: "<Button state={state}>Действие</Button>",
    render: () => <ButtonStates />,
  },
  {
    id: "family",
    title: "Семейство кнопок",
    group: "Кнопки",
    preliminary: true,
    example:
      '<Button variant="text">Текст</Button><Button variant="icon" aria-label="Поиск">⌕</Button>',
    render: () => (
      <div className="demo-actions">
        <Button>Обычная</Button>
        <Button variant="text">Текстовая</Button>
        <Button variant="icon" aria-label="Поиск">
          ⌕
        </Button>
      </div>
    ),
  },
  {
    id: "sizes",
    title: "Размеры кнопок",
    group: "Кнопки",
    preliminary: true,
    example:
      '<Button size="sm">S</Button><Button size="md">M</Button><Button size="lg">L</Button>',
    render: () => (
      <div className="demo-actions">
        <Button size="sm">S / 44</Button>
        <Button size="md">M / 48</Button>
        <Button size="lg">L / 52</Button>
      </div>
    ),
  },
  {
    id: "async-buttons",
    title: "Асинхронные состояния кнопок",
    group: "Кнопки",
    preliminary: true,
    example: '<Button state="loading">Загрузка…</Button>',
    render: () => <ButtonStates />,
  },
  {
    id: "chips",
    title: "Рубрики и выбор",
    group: "Управление",
    example: "<Chip selected={selected} onClick={toggle}>Рубрика</Chip>",
    render: () => <ToggleExample />,
  },
  {
    id: "link",
    title: "Карточка-ссылка",
    group: "Управление",
    example:
      '<LinkCard href="/games"><Heading level={3}>Игры</Heading><Text>Архив</Text></LinkCard>',
    render: () => (
      <LinkCard href="#usage">
        <Heading level={3}>Карточка-ссылка ↗</Heading>
        <Text>
          Наведение приподнимает карточку и подсвечивает контур. Тёмная заливка
          сохраняется.
        </Text>
      </LinkCard>
    ),
  },
  {
    id: "field",
    title: "Поле и валидация",
    group: "Управление",
    example:
      '<TextField label="Название" error={error} value={value} onChange={onChange} />',
    render: () => <FieldExample />,
  },
  {
    id: "panel",
    title: "Асинхронная панель",
    group: "Управление",
    example:
      "<StatusPanel state={state} statusLabel={label}>Содержимое</StatusPanel>",
    render: () => <PanelStates />,
  },
  ...(["orbital", "matrix", "pulse", "circle"] as const).map(
    (variant): Sample => ({
      id: `loader-${variant}`,
      title: {
        orbital: "ORBITAL FRAME",
        matrix: "SEGMENT MATRIX",
        pulse: "PULSE CORE",
        circle: "SYSTEM CIRCLE",
      }[variant],
      group: "Загрузка",
      example: `<Loader variant="${variant}" label="Загрузка данных" />`,
      render: () => <Loader variant={variant} label="Демонстрация загрузки" />,
    }),
  ),
  {
    id: "progress",
    title: "DATA LOSS / передача",
    group: "Загрузка",
    example: '<Progress label="Передача данных" value={progress} />',
    render: () => <TransferExample />,
  },
  {
    id: "divider",
    title: "CHANNEL LINK",
    group: "Детали",
    example: "<SignalDivider />",
    render: () => <SignalDivider />,
  },
  {
    id: "strip",
    title: "LINK STATUS",
    group: "Детали",
    example: '<SignalStrip label="EDEN / LINK" status="CONNECTED" />',
    render: () => (
      <SignalStrip label="EDEN / LINK STATUS" status="Пример связи" />
    ),
  },
  {
    id: "glitch",
    title: "SIGNAL SPLIT",
    group: "Детали",
    example: '<GlitchText as="h2">EDEN.EXE</GlitchText>',
    render: () => <GlitchText as="h2">EDEN.EXE</GlitchText>,
  },
  {
    id: "telemetry",
    title: "Телеметрия карточки",
    group: "Детали",
    example:
      '<TerminalPanel code="EDEN / MODULE" channel={<SystemOrb label="Связь" />}>Содержимое</TerminalPanel>',
    render: () => (
      <TerminalPanel
        code="EDEN / MODULE"
        channel={<SystemOrb label="Пример сигнала" />}
      >
        <Heading level={3}>Системная панель</Heading>
        <Text>
          Наведите мышь для локальных бликов и сканирования. Текст остаётся
          стабильным.
        </Text>
      </TerminalPanel>
    ),
  },
  {
    id: "navigation",
    title: "Гибридная навигация C",
    group: "Навигация",
    preliminary: true,
    example:
      '<Navigation brand="ЭДЕМ" items={items} bottomItems={bottomItems} onSearch={search} />',
    render: () => <NavigationExample />,
  },
  ...[4, 8, 12].map(
    (columns): Sample => ({
      id: `grid-${columns}`,
      title: `Сетка / ${columns} колонок`,
      group: "Сетка",
      example:
        '<Layout><Grid><div className="edem-span--full">Содержимое</div></Grid></Layout>',
      render: () => (
        <div
          className="demo-grid"
          style={{ gridTemplateColumns: `repeat(${columns},minmax(0,1fr))` }}
        >
          {Array.from({ length: columns }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
      ),
    }),
  ),
];
