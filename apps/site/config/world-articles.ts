import { siteHref } from "./site-href";

export const worldArticleGroups = [
  {
    slug: "power",
    title: "Государство и общество",
    heading: "Во славу Адама!",
    description:
      "Эдемом правит Верховный понтифик Адам. Социальный рейтинг определяет права и возможности каждого гражданина.",
    artwork: "faith",
  },
  {
    slug: "geography",
    title: "Мир и география",
    heading: "От небоскрёбов до пустошей",
    description:
      "Западный, Восточный и Северный города образуют Эдем. За их пределами лежат пустоши и другие государства.",
    artwork: "outskirts",
  },
  {
    slug: "history",
    title: "История",
    heading: "Мир после конца света",
    description:
      "Ядерная война разрушила прежнюю цивилизацию. Первый Адам объединил выживших и основал Эдем.",
    artwork: null,
  },
  {
    slug: "technology",
    title: "Наука и технологии",
    heading: "Будущее на каждом шагу",
    description:
      "Нейрочипы, импланты, искусственный интеллект и невероятные изобретения. В Эдеме высокие технологии давно стали частью повседневной жизни.",
    artwork: "civic-profile",
  },
  {
    slug: "corporations",
    title: "Корпорации",
    heading: "У будущего есть владельцы",
    description:
      "InnovatX, Holland Industries и Enigma создают технологии будущего и соперничают за влияние.",
    artwork: "cyberpunk-expo",
  },
  {
    slug: "stories",
    title: "Организации и группировки",
    heading: "Не все согласны с правилами",
    description:
      "Преступные группировки, независимые организации и тайные объединения ведут собственную игру.",
    artwork: "pompeii-uprising",
  },
] as const;

export type WorldArticleTopic = (typeof worldArticleGroups)[number]["slug"];

export function worldArticlesHref(topic: WorldArticleTopic): string {
  return siteHref(`/world/topics/${topic}`);
}

type WorldArticle = {
  title: string;
  topic: WorldArticleTopic;
  status: "planned" | "published";
  related: readonly string[];
};

export const worldArticleRegistry = {
  government: {
    title: "Государственное устройство Эдема",
    topic: "power",
    status: "published",
    related: ["beacons", "higher-path", "justice", "neurochip"],
  },
  neurochip: {
    title: "Социальный рейтинг и нейрочип",
    topic: "power",
    status: "published",
    related: [
      "beacons",
      "licenses",
      "offences",
      "science-and-technology",
      "government",
      "justice",
      "higher-path",
    ],
  },
  "higher-path": {
    title: "Высший Путь",
    topic: "power",
    status: "published",
    related: [
      "beacons",
      "government",
      "founding-of-edem",
      "history-before-adam",
      "criminal-organizations",
    ],
  },
  beacons: {
    title: "Светочи",
    topic: "power",
    status: "published",
    related: ["government", "neurochip", "higher-path"],
  },
  licenses: {
    title: "Лицензии",
    topic: "power",
    status: "published",
    related: [
      "neurochip",
      "science-and-technology",
      "cybernetics-and-implants",
    ],
  },
  offences: {
    title: "Свод правонарушений Эдема",
    topic: "power",
    status: "planned",
    related: [
      "justice",
      "neurochip",
      "licenses",
      "rehabilitation-institutions",
    ],
  },
  justice: {
    title: "Правосудие и исправительная система",
    topic: "power",
    status: "planned",
    related: [
      "government",
      "offences",
      "rehabilitation-institutions",
      "neurochip",
    ],
  },
  "rehabilitation-institutions": {
    title: "Учреждения по восстановлению благонадёжности",
    topic: "power",
    status: "planned",
    related: ["justice", "offences", "northern-city", "neurochip"],
  },
  "world-geography": {
    title: "География мира",
    topic: "geography",
    status: "planned",
    related: [
      "western-city",
      "eastern-city",
      "northern-city",
      "neutral-lands",
      "skeos",
      "atlanta",
    ],
  },
  "western-city": {
    title: "Западный город",
    topic: "geography",
    status: "planned",
    related: [
      "pompeii",
      "world-geography",
      "government",
      "criminal-organizations",
    ],
  },
  "eastern-city": {
    title: "Восточный город",
    topic: "geography",
    status: "planned",
    related: [
      "world-geography",
      "myanmar",
      "criminal-organizations",
      "government",
    ],
  },
  "northern-city": {
    title: "Северный город",
    topic: "geography",
    status: "planned",
    related: [
      "world-geography",
      "rehabilitation-institutions",
      "science-and-technology",
    ],
  },
  pompeii: {
    title: "Помпеи",
    topic: "geography",
    status: "planned",
    related: [
      "western-city",
      "criminal-organizations",
      "myanmar",
      "mephisto-casino",
      "freedom",
    ],
  },
  "neutral-lands": {
    title: "Нейтральные земли",
    topic: "geography",
    status: "planned",
    related: [
      "world-geography",
      "skeos",
      "corporations",
      "history-before-adam",
    ],
  },
  skeos: {
    title: "Скеос",
    topic: "geography",
    status: "planned",
    related: [
      "world-geography",
      "neutral-lands",
      "modern-chronology",
      "cybernetics-and-implants",
    ],
  },
  atlanta: {
    title: "Атланта",
    topic: "geography",
    status: "planned",
    related: ["world-geography", "history-before-adam", "skeos"],
  },
  "science-and-technology": {
    title: "Наука и технологии Эдема",
    topic: "technology",
    status: "planned",
    related: ["cybernetics-and-implants", "corporations", "licenses", "skeos"],
  },
  "cybernetics-and-implants": {
    title: "Кибернетика и импланты",
    topic: "technology",
    status: "planned",
    related: [
      "neurochip",
      "science-and-technology",
      "licenses",
      "innovatx",
      "holland-industries",
    ],
  },
  corporations: {
    title: "Корпорации Эдема",
    topic: "corporations",
    status: "planned",
    related: [
      "innovatx",
      "holland-industries",
      "enigma",
      "corporate-races",
      "science-and-technology",
    ],
  },
  innovatx: {
    title: "InnovatX",
    topic: "corporations",
    status: "planned",
    related: ["corporations", "holland-industries", "corporate-races"],
  },
  "holland-industries": {
    title: "Holland Industries",
    topic: "corporations",
    status: "planned",
    related: [
      "corporations",
      "innovatx",
      "science-and-technology",
      "corporate-races",
    ],
  },
  enigma: {
    title: "Enigma",
    topic: "corporations",
    status: "planned",
    related: ["corporations", "corporate-races"],
  },
  "corporate-races": {
    title: "Корпоративные гонки",
    topic: "corporations",
    status: "planned",
    related: [
      "innovatx",
      "holland-industries",
      "enigma",
      "science-and-technology",
    ],
  },
  "criminal-organizations": {
    title: "Криминальные организации Эдема",
    topic: "stories",
    status: "planned",
    related: [
      "pompeii",
      "myanmar",
      "freedom",
      "mephisto-casino",
      "technology-triumph-cult",
    ],
  },
  myanmar: {
    title: "Мьянма",
    topic: "stories",
    status: "planned",
    related: [
      "criminal-organizations",
      "eastern-city",
      "pompeii",
      "modern-chronology",
    ],
  },
  freedom: {
    title: "Свобода",
    topic: "stories",
    status: "planned",
    related: ["criminal-organizations", "pompeii", "modern-chronology"],
  },
  "mephisto-casino": {
    title: "Казино Мефиса",
    topic: "stories",
    status: "planned",
    related: ["pompeii", "criminal-organizations", "modern-chronology"],
  },
  "technology-triumph-cult": {
    title: "Культ Триумфа Технологий",
    topic: "stories",
    status: "planned",
    related: [
      "criminal-organizations",
      "science-and-technology",
      "modern-chronology",
    ],
  },
  "lobos-libres": {
    title: "Lobos Libres",
    topic: "stories",
    status: "planned",
    related: ["criminal-organizations", "freedom", "modern-chronology"],
  },
  "history-before-adam": {
    title: "История мира до Адама",
    topic: "history",
    status: "published",
    related: [
      "founding-of-edem",
      "history-of-edem",
      "world-geography",
      "neutral-lands",
      "higher-path",
      "government",
    ],
  },
  "founding-of-edem": {
    title: "Основание Эдема",
    topic: "history",
    status: "planned",
    related: ["history-before-adam", "higher-path", "history-of-edem"],
  },
  "history-of-edem": {
    title: "История Эдема",
    topic: "history",
    status: "planned",
    related: ["founding-of-edem", "higher-path", "modern-chronology"],
  },
  "modern-chronology": {
    title: "Хронология современных событий",
    topic: "history",
    status: "planned",
    related: [
      "history-of-edem",
      "mephisto-casino",
      "myanmar",
      "freedom",
      "skeos",
    ],
  },
} as const satisfies Record<string, WorldArticle>;

export type WorldArticleSlug = keyof typeof worldArticleRegistry;

export const worldArticleEntries = (
  Object.keys(worldArticleRegistry) as WorldArticleSlug[]
).map((slug) => ({ slug, ...worldArticleRegistry[slug] }));

export function worldArticleHref(slug: WorldArticleSlug): string {
  return siteHref(`/world/${slug}`);
}
