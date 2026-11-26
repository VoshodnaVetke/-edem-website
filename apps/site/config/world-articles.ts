import { siteHref } from "./site-href";

export const worldArticleGroups = [
  {
    slug: "power",
    title: "Государство и общество",
    heading: "Во славу Адама!",
    description:
      "Эдемом правит Верховный понтифик Адам. Социальный рейтинг определяет права и возможности каждого гражданина.",
    artwork: "cathedral-statue",
  },
  {
    slug: "geography",
    title: "Мир и география",
    heading: "От небоскрёбов до пустошей",
    description:
      "Западный, Восточный и Северный города образуют Эдем. За их пределами лежат пустоши и другие государства.",
    artwork: "city-to-wasteland",
  },
  {
    slug: "history",
    title: "История",
    heading: "Мир после конца света",
    description:
      "После ядерной войны Первый Адам собрал выживших в общину, из которой при Втором Адаме выросла империя.",
    artwork: "wasteland-traveler",
  },
  {
    slug: "technology",
    title: "Наука и технологии",
    heading: "Будущее внутри нас",
    description:
      "Нейрочипы, импланты, искусственный интеллект и невероятные изобретения. В Эдеме высокие технологии давно стали частью повседневной жизни.",
    artwork: "cybernetic-arm",
  },
  {
    slug: "corporations",
    title: "Корпорации",
    heading: "Хозяева будущего",
    description:
      "InnovatX, Holland Industries и Enigma создают технологии будущего и соперничают за влияние.",
    artwork: "corporate-atrium",
  },
  {
    slug: "stories",
    title: "Организации и группировки",
    heading: "Несогласные с порядком",
    description:
      "Преступные группировки, независимые организации и тайные объединения ведут собственную игру.",
    artwork: "freedom-rally",
  },
] as const;

export type WorldArticleTopic = (typeof worldArticleGroups)[number]["slug"];

export function worldArticlesHref(topic: WorldArticleTopic): string {
  return siteHref(`/world/topics/${topic}`);
}

type WorldArticle = {
  title: string;
  topic: WorldArticleTopic;
  related: readonly string[];
  thumbnail?: string;
} & (
  | { status: "planned" | "hidden" }
  | { status: "published"; summary: string }
  | { status: "merged"; target: { slug: string; section: string } }
);

export const worldArticleRegistry = {
  government: {
    title: "Государственное устройство Эдема",
    topic: "power",
    status: "published",
    summary: "Кто управляет Эдемом и как устроены его государственные органы.",
    related: ["beacons", "higher-path", "justice", "neurochip"],
  },
  neurochip: {
    title: "Социальный рейтинг и нейрочип",
    thumbnail: "neurochip.jpg",
    topic: "power",
    status: "published",
    summary: "Что такое социальный рейтинг, как он работает и на что влияет.",
    related: [
      "beacons",
      "licenses",
      "science-and-technology",
      "government",
      "justice",
      "higher-path",
    ],
  },
  "higher-path": {
    title: "Высший Путь",
    thumbnail: "higher-path.jpg",
    topic: "power",
    status: "published",
    summary:
      "Государственная религия Эдема связывает духовное развитие с наукой и технологиями. Здесь собраны её заповеди и предание о Первом Адаме.",
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
    thumbnail: "beacons.jpg",
    topic: "power",
    status: "published",
    summary:
      "Светочи занимают особое положение в обществе Эдема. В статье описано, как получают этот статус и какие права он даёт.",
    related: ["government", "neurochip", "higher-path"],
  },
  licenses: {
    title: "Лицензии",
    topic: "power",
    status: "published",
    summary:
      "Лицензии в Эдеме — цифровые разрешения. Для каких действий они нужны, от чего зависят и как их получают.",
    related: [
      "neurochip",
      "science-and-technology",
      "cybernetics-and-implants",
    ],
  },
  offences: {
    title: "Свод правонарушений Эдема",
    topic: "power",
    status: "merged",
    target: { slug: "justice", section: "offences" },
    related: [
      "justice",
      "neurochip",
      "licenses",
      "rehabilitation-institutions",
    ],
  },
  justice: {
    title: "Правосудие и исправительная система",
    thumbnail: "justice.jpg",
    topic: "power",
    status: "published",
    summary:
      "Как устроено правосудие в Эдеме и какую роль в нём играет социальный рейтинг.",
    related: [
      "government",
      "neurochip",
      "licenses",
      "rehabilitation-institutions",
    ],
  },
  "rehabilitation-institutions": {
    title: "Учреждения по восстановлению благонадёжности",
    thumbnail: "rehabilitation-institutions.jpg",
    topic: "power",
    status: "published",
    summary:
      "Учреждения, где жители Эдема проходят курс исправления и восстанавливают социальный рейтинг.",
    related: ["justice", "northern-city", "neurochip"],
  },
  "world-geography": {
    title: "География мира",
    thumbnail: "world-geography.jpg",
    topic: "geography",
    status: "published",
    summary: "Города Эдема, соседние государства и земли за их пределами.",
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
    thumbnail: "western-city.jpg",
    topic: "geography",
    status: "published",
    summary: "Столица Эдема, её районы и достопримечательности.",
    related: [
      "pompeii",
      "world-geography",
      "government",
      "criminal-organizations",
    ],
  },
  "eastern-city": {
    title: "Восточный город",
    thumbnail: "eastern-city.jpg",
    topic: "geography",
    status: "published",
    summary: "Один из самых криминальных и загадочных городов Эдема.",
    related: [
      "world-geography",
      "myanmar",
      "criminal-organizations",
      "government",
    ],
  },
  "northern-city": {
    title: "Северный город",
    thumbnail: "northern-city.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Самая засекреченная территория Эдема, где находятся тюрьмы, колонии и научные лаборатории.",
    related: [
      "world-geography",
      "rehabilitation-institutions",
      "science-and-technology",
    ],
  },
  pompeii: {
    title: "Помпеи",
    thumbnail: "pompeii.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Бедные кварталы Западного города, захваченные криминальными группировками. Здесь описано, как устроена жизнь в районе.",
    related: [
      "western-city",
      "criminal-organizations",
      "myanmar",
      "mephisto-casino",
      "moxi-brothel",
      "freedom",
    ],
  },
  "mephisto-casino": {
    title: "Казино Мефиса",
    thumbnail: "mephisto-casino.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Одно из самых известных казино Помпей. Оно просуществовало недолго.",
    related: ["pompeii", "moxi-brothel", "modern-chronology"],
  },
  "moxi-brothel": {
    title: "Бордель Мокси",
    thumbnail: "moxi-brothel.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Самый известный бордель Помпей, куда приходили и преступники, и благонадёжные граждане.",
    related: ["pompeii", "mephisto-casino", "freedom", "lobos-libres"],
  },
  "neutral-lands": {
    title: "Нейтральные земли",
    thumbnail: "neutral-lands.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Радиоактивная пустошь между Эдемом и Скеосом. Здесь живут независимые общины и работают предприятия.",
    related: [
      "world-geography",
      "skeos",
      "corporations",
      "history-before-adam",
    ],
  },
  skeos: {
    title: "Скеос",
    thumbnail: "skeos.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Соседнее с Эдемом государство, где власть принадлежит корпорациям.",
    related: [
      "world-geography",
      "neutral-lands",
      "modern-chronology",
      "cybernetics-and-implants",
    ],
  },
  atlanta: {
    title: "Атланта",
    thumbnail: "atlanta.jpg",
    topic: "geography",
    status: "published",
    summary: "Далёкий и загадочный остров в океане.",
    related: ["world-geography", "history-before-adam", "skeos"],
  },
  "science-and-technology": {
    title: "Наука и технологии Эдема",
    thumbnail: "science-and-technology.jpg",
    topic: "technology",
    status: "published",
    summary: "Нейрочипы, роботы и протезы в повседневной жизни Эдема.",
    related: ["cybernetics-and-implants", "corporations", "licenses", "skeos"],
  },
  "cybernetics-and-implants": {
    title: "Кибернетика и импланты",
    thumbnail: "cybernetics-and-implants.jpg",
    topic: "technology",
    status: "published",
    summary:
      "Виды имплантов, устройство кибердеки и управление дронами. В статье также описаны производители имплантов и риски их применения.",
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
    thumbnail: "corporations.jpg",
    topic: "corporations",
    status: "published",
    summary: "Крупнейшие игроки рынка Эдема, их продукция и соперничество.",
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
    thumbnail: "innovatx.jpg",
    topic: "corporations",
    status: "published",
    summary:
      "Одна из ведущих технологических корпораций Эдема, известная быстрыми чипами и имплантами.",
    related: ["corporations", "holland-industries", "corporate-races"],
  },
  "holland-industries": {
    title: "Holland Industries",
    thumbnail: "holland-industries.jpg",
    topic: "corporations",
    status: "published",
    summary:
      "Крупнейшая корпорация Эдема, которая делает ставку на безопасность и надёжность техники.",
    related: [
      "corporations",
      "innovatx",
      "science-and-technology",
      "corporate-races",
    ],
  },
  enigma: {
    title: "Enigma",
    thumbnail: "enigma.jpg",
    topic: "corporations",
    status: "published",
    summary:
      "Молодая корпорация, возникшая из союза трёх компаний. Она выпускает технику и товары для повседневной жизни.",
    related: ["corporations", "corporate-races"],
  },
  "corporate-races": {
    title: "Корпоративные гонки",
    thumbnail: "corporate-races.jpg",
    topic: "corporations",
    status: "published",
    summary:
      "Популярные в Эдеме гонки, на которых независимые команды могут заработать и найти спонсоров.",
    related: [
      "innovatx",
      "holland-industries",
      "enigma",
      "science-and-technology",
    ],
  },
  "criminal-organizations": {
    title: "Криминальные организации Эдема",
    thumbnail: "criminal-organizations.jpg",
    topic: "stories",
    status: "published",
    summary: "Преступные группировки Эдема, их занятия и борьба за влияние.",
    related: [
      "pompeii",
      "myanmar",
      "freedom",
      "organization-v",
      "history-of-edem",
      "technology-triumph-cult",
    ],
  },
  myanmar: {
    title: "Мьянма",
    thumbnail: "myanmar.jpg",
    topic: "stories",
    status: "published",
    summary:
      "Крупный наркокартель, который контролирует часть Помпей. В статье описаны его становление и борьба за власть внутри картеля.",
    related: [
      "criminal-organizations",
      "eastern-city",
      "pompeii",
      "modern-chronology",
    ],
  },
  freedom: {
    title: "Свобода",
    thumbnail: "freedom.jpg",
    topic: "stories",
    status: "published",
    summary:
      "Подпольное движение, выступающее против власти Адама и социального рейтинга.",
    related: ["criminal-organizations", "pompeii", "modern-chronology"],
  },
  "organization-v": {
    title: "Организация V",
    thumbnail: "organization-v.jpg",
    topic: "stories",
    status: "published",
    summary:
      "Подпольная организация, которую связывают с публикацией запрещённых материалов и подменой цифровых профилей.",
    related: ["criminal-organizations", "freedom", "skeos", "neurochip"],
  },
  "technology-triumph-cult": {
    title: "Культ Триумфа Технологий",
    thumbnail: "technology-triumph-cult.jpg",
    topic: "stories",
    status: "published",
    summary:
      "Сообщество, для которого развитие технологий стало частью веры. Его участники начинали с кустарного производства имплантов.",
    related: [
      "criminal-organizations",
      "science-and-technology",
      "modern-chronology",
    ],
  },
  "lobos-libres": {
    title: "Lobus Liberos",
    thumbnail: "lobos-libres.jpg",
    topic: "stories",
    status: "published",
    summary:
      "Панк-группа, которая выступала против власти и превратила свои песни в форму протеста.",
    related: ["criminal-organizations", "freedom", "modern-chronology"],
  },
  "history-before-adam": {
    title: "История мира до Адама",
    thumbnail: "history-before-adam.jpg",
    topic: "history",
    status: "published",
    summary:
      "Мир до ядерной войны 2026 года, причины катастрофы и жизнь выживших до основания Эдема.",
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
    thumbnail: "founding-of-edem.jpg",
    topic: "history",
    status: "published",
    summary: "Как из общины выживших возникло государство Эдем.",
    related: ["history-before-adam", "higher-path", "history-of-edem"],
  },
  "history-of-edem": {
    title: "История Эдема",
    thumbnail: "history-of-edem.jpg",
    topic: "history",
    status: "published",
    summary:
      "Реформы, которые изменили жизнь Эдема, и протесты, которые они вызвали.",
    related: [
      "founding-of-edem",
      "pompeii",
      "neurochip",
      "freedom",
      "modern-chronology",
    ],
  },
  "white-swan": {
    title: "Революция «Белый лебедь»",
    topic: "history",
    status: "merged",
    target: { slug: "history-of-edem", section: "white-swan" },
    related: ["modern-chronology", "freedom", "criminal-organizations"],
  },
  "modern-chronology": {
    title: "Хронология современных событий",
    topic: "history",
    status: "hidden",
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
)
  .map((slug) => ({ slug, ...worldArticleRegistry[slug] }))
  .filter(({ status }) => status !== "hidden");

export function relatedWorldArticleSlugs(slug: WorldArticleSlug) {
  return worldArticleRegistry[slug].related.filter(
    (relatedSlug) => worldArticleRegistry[relatedSlug].status !== "hidden",
  );
}

export function worldTopicArticles(topic: WorldArticleTopic) {
  return worldArticleEntries.filter(
    (article) => article.status !== "merged" && article.topic === topic,
  );
}

export function worldArticleHref(slug: WorldArticleSlug): string {
  const article = worldArticleRegistry[slug];
  if (article.status === "merged") {
    return (
      siteHref(`/world/${article.target.slug}`) + `#${article.target.section}`
    );
  }
  return siteHref(`/world/${slug}`);
}
