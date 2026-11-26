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
    summary:
      "Адам возглавляет Эдем и назначает руководителей государственных отделов. Городские и районные органы власти отвечают за местные дела.",
    related: ["beacons", "higher-path", "justice", "neurochip"],
  },
  neurochip: {
    title: "Социальный рейтинг и нейрочип",
    thumbnail: "neurochip.jpg",
    topic: "power",
    status: "published",
    summary:
      "Социальный рейтинг показывает, как государство оценивает поступки граждан. Нейрочип связывает цифровой профиль с разрешениями, льготами и другими правами.",
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
      "Государственная религия Эдема связывает духовное развитие с наукой и технологиями. В статье приведены её заповеди и предание о появлении Первого Адама.",
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
      "Звание Светоча присваивают за заслуги перед Эдемом. Оно даёт особые привилегии и открывает путь к высшим должностям.",
    related: ["government", "neurochip", "higher-path"],
  },
  licenses: {
    title: "Лицензии",
    topic: "power",
    status: "published",
    summary:
      "Лицензии в Эдеме — цифровые разрешения на пользование отдельными видами транспорта, оружия и техники. От социального рейтинга может зависеть их выдача и сохранение.",
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
      "Правосудие в Эдеме определяет, как расследуют нарушения и назначают взыскания. От итогового социального рейтинга зависит, останется ли человек на свободе.",
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
      "В эти учреждения направляют граждан с отрицательным социальным рейтингом. Вернуться домой можно, набрав баллы за работу, обучение и участие в программе восстановления.",
    related: ["justice", "northern-city", "neurochip"],
  },
  "world-geography": {
    title: "География мира",
    thumbnail: "world-geography.jpg",
    topic: "geography",
    status: "published",
    summary:
      "В Эдем входят три города с разными условиями жизни. За их пределами лежат радиоактивные пустоши, соседнее государство и далёкий остров.",
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
    summary:
      "Западный город — столица Эдема и место, где находятся его главные государственные учреждения. В статье описаны центральные районы, достопримечательности и окраины.",
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
      "В Восточном городе сохранились здания и традиции довоенной Азии. В его густонаселённых кварталах заметно влияние преступных группировок.",
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
      "Северный город — самая закрытая территория Эдема. Здесь добывают ресурсы, проводят закрытые исследования и содержат заключённых.",
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
      "Помпеи выросли из бедных кварталов Западного города, где укрепились преступные группировки. Сюда приезжают за товарами чёрного рынка и ради заведений, известных по всей столице.",
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
      "Казино Мефиса было одним из самых роскошных заведений Помпей. Оно привлекало гостей из богатых кварталов, хотя самостоятельным казино пробыло всего около года.",
    related: ["pompeii", "moxi-brothel", "modern-chronology"],
  },
  "moxi-brothel": {
    title: "Бордель Мокси",
    thumbnail: "moxi-brothel.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Бордель Мокси — одно из самых известных заведений Помпей. Среди его гостей бывают и люди из криминальных кругов, и жители обеспеченных кварталов.",
    related: ["pompeii", "mephisto-casino", "freedom", "lobos-libres"],
  },
  "neutral-lands": {
    title: "Нейтральные земли",
    thumbnail: "neutral-lands.jpg",
    topic: "geography",
    status: "published",
    summary:
      "Нейтральные земли — радиоактивная пустошь между Эдемом и Скеосом. Её пересекают торговые маршруты, а на пригодных для жизни участках остаются независимые поселения.",
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
      "В Скеосе, соседнем с Эдемом государстве, власть принадлежит корпорациям. Связи между странами ограничены, поэтому о повседневной жизни Федерации известно немного.",
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
    summary:
      "Атланта — далёкий остров в океане. О том, кто его населяет и как там живут, у жителей Эдема мало достоверных сведений.",
    related: ["world-geography", "history-before-adam", "skeos"],
  },
  "science-and-technology": {
    title: "Наука и технологии Эдема",
    thumbnail: "science-and-technology.jpg",
    topic: "technology",
    status: "published",
    summary:
      "Роботы, нейрочипы и протезы давно стали частью быта в Эдеме. Статья рассказывает, как разработки из лабораторий попадают на выставки, в дома и клиники.",
    related: ["cybernetics-and-implants", "corporations", "licenses", "skeos"],
  },
  "cybernetics-and-implants": {
    title: "Кибернетика и импланты",
    thumbnail: "cybernetics-and-implants.jpg",
    topic: "technology",
    status: "published",
    summary:
      "Импланты заменяют утраченные части тела, расширяют возможности человека и помогают управлять техникой. В статье описаны кибердеки, дроны, производители имплантов и риски их применения.",
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
      "Три крупнейшие корпорации Эдема выпускают всё от бытовой техники до машин и имплантов. Каждая по-своему борется за покупателей и влияние.",
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
      "InnovatX — одна из ведущих технологических корпораций Эдема, известная быстрыми чипами и новыми функциями своих устройств. Её история тесно связана с семьёй инженера, основавшего компанию.",
    related: ["corporations", "holland-industries", "corporate-races"],
  },
  "holland-industries": {
    title: "Holland Industries",
    thumbnail: "holland-industries.jpg",
    topic: "corporations",
    status: "published",
    summary:
      "Крупнейшая корпорация Эдема делает ставку на безопасность и надёжность техники. Она выпускает и бытовые приборы, и космические корабли.",
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
      "Enigma выросла из союза трёх небольших производителей. Сегодня она выпускает товары для повседневной жизни и соперничает со старшими корпорациями.",
    related: ["corporations", "corporate-races"],
  },
  "corporate-races": {
    title: "Корпоративные гонки",
    thumbnail: "corporate-races.jpg",
    topic: "corporations",
    status: "published",
    summary:
      "Гонки на болидах — одно из самых популярных зрелищ Эдема. Для независимой команды удачный заезд может обернуться призовыми или контрактом со спонсором.",
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
      "Преступные группировки Эдема зарабатывают на подпольной торговле и местных заведениях. Их соперничество сказывается на том, кто устанавливает правила на улицах Помпей.",
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
      "Мьянма выросла из объединения трёх группировок и контролирует часть Помпей. Внутри картеля шла своя борьба за руководство и доходы.",
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
      "Свобода выступает против власти Адама и социального рейтинга. Движение выросло в бедных кварталах и до сих пор борется за контроль над Помпеями.",
    related: ["criminal-organizations", "pompeii", "modern-chronology"],
  },
  "organization-v": {
    title: "Организация V",
    thumbnail: "organization-v.jpg",
    topic: "stories",
    status: "published",
    summary:
      "Организацию V связывают с подпольной сетью, где публиковались запрещённые материалы. Позднее её имя стало появляться в связи с подменой цифровых профилей.",
    related: ["criminal-organizations", "freedom", "skeos", "neurochip"],
  },
  "technology-triumph-cult": {
    title: "Культ Триумфа Технологий",
    thumbnail: "technology-triumph-cult.jpg",
    topic: "stories",
    status: "published",
    summary:
      "Участники Культа Триумфа Технологий считают развитие техники частью своей веры. Их импланты проделали путь от кустарной мастерской до промышленного производства.",
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
      "Панк-группа Lobus Liberos выступала с песнями против власти. После задержания части музыкантов прежний состав распался.",
    related: ["criminal-organizations", "freedom", "modern-chronology"],
  },
  "history-before-adam": {
    title: "История мира до Адама",
    thumbnail: "history-before-adam.jpg",
    topic: "history",
    status: "published",
    summary:
      "Ядерная война 2026 года разрушила прежний мир. Эта статья рассказывает о причинах катастрофы и о том, как выжившие начали жить общинами.",
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
    summary:
      "Первый Адам собрал выживших и заложил поселение. При его преемнике из общины выросло государство со своими законами и учреждениями.",
    related: ["history-before-adam", "higher-path", "history-of-edem"],
  },
  "history-of-edem": {
    title: "История Эдема",
    thumbnail: "history-of-edem.jpg",
    topic: "history",
    status: "published",
    summary:
      "При Третьем Адаме реформы изменили повседневную жизнь Эдема. Одни жители получили новые возможности, другие вышли на улицы в знак протеста.",
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
