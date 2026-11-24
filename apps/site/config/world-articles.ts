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
      "Ядерная война разрушила прежнюю цивилизацию. Первый Адам объединил выживших и основал Эдем.",
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
} & (
  | { status: "planned" }
  | { status: "published"; summary: readonly [string, string] }
  | { status: "merged"; target: { slug: string; section: string } }
);

export const worldArticleRegistry = {
  government: {
    title: "Государственное устройство Эдема",
    topic: "power",
    status: "published",
    summary: [
      "Кто управляет Эдемом и как распределены полномочия Адама, Совета Светочей и государственных отделов.",
      "Как устроено местное самоуправление и какую роль играют суды и Расследовательный отдел.",
    ],
    related: ["beacons", "higher-path", "justice", "neurochip"],
  },
  neurochip: {
    title: "Социальный рейтинг и нейрочип",
    topic: "power",
    status: "published",
    summary: [
      "Как граждане получают и теряют баллы социального рейтинга и какую роль в этом играет нейрочип.",
      "Какие права, льготы и лицензии зависят от рейтинга и как обжаловать взыскание.",
    ],
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
    topic: "power",
    status: "published",
    summary: [
      "Государственная религия Эдема связывает духовное развитие с наукой и технологиями.",
      "В статье собраны семь заповедей, учение о Светочах и предание о Первом Адаме.",
    ],
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
    summary: [
      "Как социальный рейтинг связан со статусом Светоча и как Адам присваивает этот статус.",
      "Какие должности занимают Светочи и что означает Право Светоча.",
    ],
    related: ["government", "neurochip", "higher-path"],
  },
  licenses: {
    title: "Лицензии",
    topic: "power",
    status: "published",
    summary: [
      "Как цифровые разрешения связаны с нейрочипом, социальным рейтингом и доступом к технике.",
      "Как Эдем ввёл транспортные лицензии и распространил систему на электронные устройства.",
    ],
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
    topic: "power",
    status: "published",
    summary: [
      "Как работают суды и следствие, за что назначают штрафы и списывают баллы.",
      "Как оспорить взыскание и в каких случаях граждан направляют в УВБ.",
    ],
    related: [
      "government",
      "neurochip",
      "licenses",
      "rehabilitation-institutions",
    ],
  },
  "rehabilitation-institutions": {
    title: "Учреждения по восстановлению благонадёжности",
    topic: "power",
    status: "planned",
    related: ["justice", "northern-city", "neurochip"],
  },
  "world-geography": {
    title: "География мира",
    topic: "geography",
    status: "published",
    summary: [
      "Три города Эдема, от Головного офиса Западного города до закрытого Севера.",
      "Что известно о Нейтральных землях, соседнем Скеосе и далёком острове Атланта.",
    ],
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
    status: "published",
    summary: [
      "Как устроены районы Западного города и на чём по нему ездят.",
      "Как живут в Помпеях и почему туда приезжают даже граждане с высоким рейтингом.",
    ],
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
    status: "published",
    summary: [
      "Как наследие довоенной Азии сохранилось в архитектуре и уличной моде.",
      "Что известно о картеле «Мьянма» из городской хроники.",
    ],
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
    status: "published",
    summary: [
      "Почему в бедный район Западного города приезжают за покупками и развлечениями.",
      "Что рассказывали о казино Мефиса и «Борделе Мокси» городские газеты.",
    ],
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
    topic: "geography",
    status: "planned",
    related: ["pompeii", "moxi-brothel", "modern-chronology"],
  },
  "moxi-brothel": {
    title: "Бордель Мокси",
    topic: "geography",
    status: "planned",
    related: ["pompeii", "mephisto-casino"],
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
    status: "published",
    summary: [
      "Как корпорации управляют Федерацией и какую роль играет генетический паспорт.",
      "Как живут женщины в Скеосе и на каких условиях граждане страны въезжают в Эдем.",
    ],
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
    status: "published",
    summary: [
      "Далёкий остров, который упоминается в географических описаниях Эдема.",
      "Что известно об Атланте и почему о её жителях пока можно только догадываться.",
    ],
    related: ["world-geography", "history-before-adam", "skeos"],
  },
  "science-and-technology": {
    title: "Наука и технологии Эдема",
    topic: "technology",
    status: "published",
    summary: [
      "Как нейрочипы, лицензии и автоматизация входят в повседневную жизнь.",
      "Где показывают новые разработки и как кибернетические протезы применяют в клиниках.",
    ],
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
    status: "published",
    summary: [
      "Что выпускают InnovatX, Holland Industries и Enigma и за что покупатели выбирают каждую марку.",
      "О чём спорят Морган и Холланд и как соперничество корпораций выглядит на гоночной трассе.",
    ],
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
    status: "published",
    summary: [
      "Как Винсент Морган основал InnovatX и почему после исчезновения Кэвина компанию возглавил Дэвид.",
      "Чем известна техника InnovatX и как семья Морган оказалась в центре внимания Эдема.",
    ],
    related: ["corporations", "holland-industries", "corporate-races"],
  },
  "holland-industries": {
    title: "Holland Industries",
    topic: "corporations",
    status: "published",
    summary: [
      "Чем крупнейшая корпорация Эдема заслужила репутацию надёжного производителя, от бытовой техники до космических кораблей.",
      "Как Холланды основали компанию и почему отставка Ричарда и исчезновение Сэма привлекли внимание прессы.",
    ],
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
    status: "published",
    summary: [
      "Как три небольших производителя объединились и создали корпорацию, способную соперничать с InnovatX и Holland Industries.",
      "За что покупатели ценят технику Enigma и кто руководит корпорацией.",
    ],
    related: ["corporations", "corporate-races"],
  },
  "corporate-races": {
    title: "Корпоративные гонки",
    topic: "corporations",
    status: "published",
    summary: [
      "Зачем корпорации выводят болиды на трассу и как частные команды ищут здесь спонсоров и контракты.",
      "Кто соперничает за первое место и чем отличаются машины InnovatX, Enigma и Holland Industries.",
    ],
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
    status: "published",
    summary: [
      "Кого в Эдеме называют Хищниками и почему «Мьянма» и «Свобода» борются за влияние в Помпеях.",
      "Чем занимается картель, чего добивается «Свобода» и что известно об организации V.",
    ],
    related: [
      "pompeii",
      "myanmar",
      "freedom",
      "organization-v",
      "white-swan",
      "technology-triumph-cult",
    ],
  },
  myanmar: {
    title: "Мьянма",
    topic: "stories",
    status: "published",
    summary: [
      "«Мьянма» выросла из группировки Дракона, поглотив «Вечные ценности» и «Ночных фурий». Сегодня картель контролирует значительную часть Помпей и соперничает со «Свободой» за заведения района.",
      "Кукла попыталась отобрать у Дракона власть. После её гибели Дракон возглавил большую часть картеля, а исчезновение Эшли Харрингтон дало новый повод связать её имя с Куклой.",
    ],
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
    status: "published",
    summary: [
      "«Свобода» выросла в рабочих кварталах Западного города. Она добивается свержения власти Адама и отмены социального рейтинга, а её опорой остаются Помпеи.",
      "После ареста Теодора Рейдена группировку возглавила Роза. Она проникла на Парад технологий, а позже освободила Вампира из тюрьмы Северного города.",
    ],
    related: ["criminal-organizations", "pompeii", "modern-chronology"],
  },
  "organization-v": {
    title: "Организация V",
    topic: "stories",
    status: "published",
    summary: [
      "Власти Эдема признали V террористической организацией в 2214 году. С ней связывают подпольную сеть, где появилось разоблачение проекта «Апостолы».",
      "Имя Фантома связывают с подложными цифровыми профилями, а V обвиняют в сбое рейтинговой системы перед Парадом технологий.",
    ],
    related: ["criminal-organizations", "freedom", "skeos", "neurochip"],
  },
  "technology-triumph-cult": {
    title: "Культ Триумфа Технологий",
    topic: "stories",
    status: "published",
    summary: [
      "В Помпеях Культ изготавливал и устанавливал импланты. Его основательница по прозвищу Светоч видела в этой работе путь к Великой эволюции.",
      "На Параде технологий Адам одобрил работу Культа. Контракт с InnovatX позволил наладить промышленный выпуск его имплантов.",
    ],
    related: [
      "criminal-organizations",
      "science-and-technology",
      "modern-chronology",
    ],
  },
  "lobos-libres": {
    title: "Lobus Liberos",
    topic: "stories",
    status: "published",
    summary: [
      "К-рок и Мелисса Морган собрали панк-группу, которая пела о свободе и выступала против власти Адама и корпораций.",
      "После задержания К-рока и Честейн Олдвуд группа распалась. Мелисса и Страж продолжили выступать дуэтом.",
    ],
    related: ["criminal-organizations", "freedom", "modern-chronology"],
  },
  "history-before-adam": {
    title: "История мира до Адама",
    topic: "history",
    status: "published",
    summary: [
      "Как официальная история Эдема описывает пандемию и ядерную войну.",
      "Как общины выживали после войны и как Первый Адам начал объединять их.",
    ],
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
  "white-swan": {
    title: "Революция «Белый лебедь»",
    topic: "history",
    status: "planned",
    related: ["modern-chronology", "freedom", "criminal-organizations"],
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
  const article = worldArticleRegistry[slug];
  if (article.status === "merged") {
    return (
      siteHref(`/world/${article.target.slug}`) + `#${article.target.section}`
    );
  }
  return siteHref(`/world/${slug}`);
}
