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
    summary: "Кто управляет Эдемом и как устроены его государственные органы?",
    related: ["beacons", "higher-path", "justice", "neurochip"],
  },
  neurochip: {
    title: "Социальный рейтинг и нейрочип",
    thumbnail: "neurochip.jpg",
    topic: "power",
    status: "published",
    summary: "Что такое социальный рейтинг, как он работает и на что влияет?",
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
      "Кто такие Светочи и чем они отличаются от остальных жителей Эдема?",
    related: ["government", "neurochip", "higher-path"],
  },
  licenses: {
    title: "Лицензии",
    topic: "power",
    status: "published",
    summary:
      "Что в Эдеме можно делать только с лицензией и как устроена система разрешений?",
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
      "Как в Эдеме решают, что считать нарушением, и какие последствия ждут нарушителя?",
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
      "Кого направляют на исправление, как оно проходит и от чего зависит возвращение домой?",
    related: ["justice", "northern-city", "neurochip"],
  },
  "world-geography": {
    title: "География мира",
    thumbnail: "world-geography.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Где находятся города Эдема и что известно о землях за его границами?",
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
    summary: "Чем различается жизнь в районах Западного города?",
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
    summary:
      "Как прошлое Восточного города сохранилось в его облике и привычках жителей?",
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
      "Что находится на закрытом севере Эдема и почему туда нельзя свободно попасть?",
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
      "Как живёт район, который государство перестало контролировать, и что приводит сюда приезжих?",
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
      "Что сделало казино Мефиса известным и почему о нём ходило столько слухов?",
    related: ["pompeii", "moxi-brothel", "modern-chronology"],
  },
  "moxi-brothel": {
    title: "Бордель Мокси",
    thumbnail: "moxi-brothel.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Чем запомнилось заведение Мокси и как его хозяйка стала влиятельной фигурой?",
    related: ["pompeii", "mephisto-casino", "freedom", "lobos-libres"],
  },
  "neutral-lands": {
    title: "Нейтральные земли",
    thumbnail: "neutral-lands.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Как живут общины за пределами крупных государств и кто претендует на эти земли?",
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
      "Как устроено соседнее с Эдемом государство, где власть принадлежит корпорациям?",
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
    summary: "Что в Эдеме знают о далёком острове Атланта?",
    related: ["world-geography", "history-before-adam", "skeos"],
  },
  "science-and-technology": {
    title: "Наука и технологии Эдема",
    thumbnail: "science-and-technology.jpg",
    topic: "technology",
    status: "published",
    summary:
      "Как наука и технологии изменили повседневную жизнь жителей Эдема?",
    related: ["cybernetics-and-implants", "corporations", "licenses", "skeos"],
  },
  "cybernetics-and-implants": {
    title: "Кибернетика и импланты",
    thumbnail: "cybernetics-and-implants.jpg",
    topic: "technology",
    status: "published",
    summary:
      "Какие возможности дают импланты и с какими рисками сталкиваются их владельцы?",
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
    summary:
      "Чем занимаются крупнейшие корпорации Эдема и как они соперничают между собой?",
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
      "Как InnovatX вышла в число крупнейших корпораций и за что ценят её технику?",
    related: ["corporations", "holland-industries", "corporate-races"],
  },
  "holland-industries": {
    title: "Holland Industries",
    thumbnail: "holland-industries.jpg",
    topic: "corporations",
    status: "published",
    summary:
      "Как Holland Industries выросла из семейного дела в крупнейшую корпорацию Эдема?",
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
      "Как Enigma вошла в число крупных производителей и чем привлекла покупателей?",
    related: ["corporations", "corporate-races"],
  },
  "corporate-races": {
    title: "Корпоративные гонки",
    thumbnail: "corporate-races.jpg",
    topic: "corporations",
    status: "published",
    summary:
      "Зачем крупные компании выставляют команды на гонки и что для них значит победа на трассе?",
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
    summary:
      "Какие группировки действуют в Эдеме, чем они занимаются и за что борются?",
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
      "Как наркокартель набрал силу и кто боролся за власть внутри него?",
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
      "Чего добивается «Свобода» и почему её идеи нашли отклик в рабочих кварталах Эдема?",
    related: ["criminal-organizations", "pompeii", "modern-chronology"],
  },
  "organization-v": {
    title: "Организация V",
    thumbnail: "organization-v.jpg",
    topic: "stories",
    status: "published",
    summary:
      "Что известно об организации V и подпольной сети, с которой связывают её имя?",
    related: ["criminal-organizations", "freedom", "skeos", "neurochip"],
  },
  "technology-triumph-cult": {
    title: "Культ Триумфа Технологий",
    thumbnail: "technology-triumph-cult.jpg",
    topic: "stories",
    status: "published",
    summary:
      "Во что верят участники Культа и как их разработки дошли до серийного производства?",
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
      "О чём пела панк-группа, выступавшая против власти, и как сложилась её судьба?",
    related: ["criminal-organizations", "freedom", "modern-chronology"],
  },
  "history-before-adam": {
    title: "История мира до Адама",
    thumbnail: "history-before-adam.jpg",
    topic: "history",
    status: "published",
    summary: "Каким был мир до ядерной войны и как люди жили после катастрофы?",
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
    summary: "Как община выживших выросла в государство?",
    related: ["history-before-adam", "higher-path", "history-of-edem"],
  },
  "history-of-edem": {
    title: "История Эдема",
    thumbnail: "history-of-edem.jpg",
    topic: "history",
    status: "published",
    summary:
      "Как реформы изменили жизнь в Эдеме и почему часть жителей выступила против власти?",
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
