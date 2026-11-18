/** Central game-tag registry. Approved names and HEX values: docs/GAME_TAGS.md v1.3. */
export const GAME_TAG_COLORS = {
  cyan: "#25F4FF",
  violet: "#BC5CFF",
  pink: "#FF00B8",
  yellow: "#FFF000",
  green: "#39FF14",
  orange: "#FF5A00",
  blue: "#0066FF",
  red: "#FF1744",
} as const;

const C = GAME_TAG_COLORS;

export const GAME_TAGS = {
  format: [
    {
      id: "chamber",
      label: "Кабинетная ролевая игра",
      shortLabel: "Кабинетная",
      color: C.violet,
    },
    { id: "field", label: "Полигонная ролевая игра", color: C.green },
    { id: "stage", label: "Сценическая ролевая игра", color: C.pink },
    { id: "tabletop", label: "Настольная ролевая игра", color: C.cyan },
  ],
  roles: [
    { id: "elite", label: "Элита", color: C.cyan },
    { id: "corporations", label: "Корпорации", color: C.pink },
    { id: "criminal-groups", label: "Преступные группировки", color: C.red },
    { id: "government", label: "Государственные структуры", color: C.blue },
  ],
  location: [
    { id: "edem", label: "Эдем", color: C.cyan },
    { id: "west-city", label: "Западный город", color: C.violet },
    { id: "east-city", label: "Восточный город", color: C.pink },
    { id: "north-city", label: "Северный город", color: C.blue },
    { id: "pompeii", label: "Помпеи", color: C.red },
    { id: "skeos", label: "Скеос", color: C.green },
    { id: "neutral-lands", label: "Нейтральные земли", color: C.yellow },
  ],
  theme: [
    { id: "political-intrigue", label: "Политические интриги", color: C.pink },
    { id: "criminal-conflict", label: "Криминальные разборки", color: C.red },
    {
      id: "corporate-rivalry",
      label: "Корпоративная конкуренция",
      color: C.yellow,
    },
    {
      id: "tech-conflict",
      label: "Технологическое противостояние",
      color: C.cyan,
    },
    { id: "conspiracies", label: "Тайны и заговоры", color: C.violet },
    { id: "magic-mysteries", label: "Магические тайны", color: C.violet },
    { id: "survival", label: "Борьба за выживание", color: C.green },
  ],
  players: [
    { id: "up-to-20", label: "До 20 игроков", color: C.cyan },
    { id: "20-to-40", label: "20–40 игроков", color: C.violet },
    { id: "over-40", label: "40+ игроков", color: C.orange },
  ],
  age: [
    { id: "12-plus", label: "12+", color: C.green },
    { id: "14-plus", label: "14+", color: C.cyan },
    { id: "16-plus", label: "16+", color: C.violet },
    { id: "18-plus", label: "18+", color: C.red },
  ],
  experience: [
    { id: "beginner", label: "Новичкам", color: C.green },
    { id: "experienced", label: "Опытным игрокам", color: C.violet },
  ],
  attendance: [
    { id: "moscow", label: "В Москве", shortLabel: "Москва", color: C.cyan },
    { id: "offsite", label: "С выездом", color: C.orange },
    { id: "online", label: "Онлайн", color: C.violet },
  ],
  status: [
    { id: "development", label: "В разработке", color: C.blue },
    { id: "announced", label: "Анонсирована", color: C.violet },
    { id: "registration-open", label: "Открыта запись", color: C.green },
    { id: "registration-closed", label: "Набор закрыт", color: C.yellow },
    { id: "completed", label: "Завершена", color: C.cyan },
    { id: "cancelled", label: "Отменена", color: C.red },
  ],
} as const;

export type GameTagCategory = keyof typeof GAME_TAGS;
export type GameTagId = {
  [K in GameTagCategory]: (typeof GAME_TAGS)[K][number]["id"];
}[GameTagCategory];

export type GameTag = {
  readonly id: GameTagId;
  readonly category: GameTagCategory;
  readonly label: string;
  readonly shortLabel?: string;
  readonly color: string;
};

/** Include category in ID lookups to keep data modelling unambiguous. */
export const ALL_GAME_TAGS: readonly GameTag[] = (
  Object.keys(GAME_TAGS) as GameTagCategory[]
).flatMap((category) =>
  GAME_TAGS[category].map((tag) => ({ ...tag, category })),
);

export function getGameTag(id: GameTagId): GameTag {
  const tag = ALL_GAME_TAGS.find((item) => item.id === id);
  if (!tag) throw new Error(`Unknown game tag: ${id}`);
  return tag;
}

/** Relative game emphasis: three integers, each 0–5, summing to exactly ten. */
export const GAME_FOCUS = {
  social: { label: "Социалка", color: C.violet, code: "SOC" },
  combat: { label: "Боёвка", color: C.orange, code: "CMB" },
  systems: { label: "Механики", color: C.cyan, code: "SYS" },
} as const;

export type GameFocus = Readonly<{
  social: number;
  combat: number;
  systems: number;
}>;

export function isValidGameFocus(value: GameFocus): boolean {
  const points = [value.social, value.combat, value.systems];
  return (
    points.every((n) => Number.isInteger(n) && n >= 0 && n <= 5) &&
    points.reduce((sum, n) => sum + n, 0) === 10
  );
}
