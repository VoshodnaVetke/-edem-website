import deployment from "../../config/deployment.json";
import type { WorldArticleSlug } from "../../config/world-articles";
import styles from "./world-article-illustration.module.css";

const illustrations = {
  neurochip: {
    alt: "На визоре виден штраф в десять баллов социального рейтинга",
    width: 1280,
    height: 853,
  },
  "higher-path": {
    alt: "Из раскрытой книги поднимается голограмма заката",
    width: 1280,
    height: 960,
  },
  beacons: { alt: "Золотая четырёхлучевая звезда", width: 1280, height: 853 },
  justice: {
    alt: "Человек стоит перед судом в высоком зале со звёздной эмблемой",
    width: 1280,
    height: 853,
  },
  "rehabilitation-institutions": {
    alt: "Человек в светлой палате под наблюдением камеры",
    width: 1280,
    height: 853,
  },
  "world-geography": {
    alt: "Голографическая карта мира на светящемся столе",
    width: 1280,
    height: 853,
  },
  "western-city": {
    alt: "Панорама Западного города со шпилем и отражениями в воде",
    width: 1280,
    height: 720,
  },
  "eastern-city": {
    alt: "Неоновые улицы Восточного города среди цветущих деревьев",
    width: 1280,
    height: 720,
  },
  "northern-city": {
    alt: "Северный город под снегом за ограждением со сторожевой башней",
    width: 1280,
    height: 720,
  },
  pompeii: {
    alt: "Улица Помпей с яркими неоновыми вывесками и отражениями в мокрой мостовой",
    width: 1280,
    height: 720,
  },
  "neutral-lands": {
    alt: "Заброшенная дорога и разрушенная эстакада в пустоши на закате",
    width: 1280,
    height: 720,
  },
  skeos: {
    alt: "Город Скеоса на склонах горного ущелья",
    width: 1280,
    height: 720,
  },
  atlanta: {
    alt: "Белые башни и водопады среди зелени Атланты",
    width: 1280,
    height: 721,
  },
  "history-before-adam": {
    alt: "Протестующие и силовики на улице, на горизонте грибовидное облако",
    width: 1280,
    height: 720,
  },
  "founding-of-edem": {
    alt: "Оратор перед собравшимися людьми на фоне строящегося города",
    width: 1280,
    height: 721,
  },
  "history-of-edem": {
    alt: "Бумажный белый лебедь на мостовой у заграждений и шеренги солдат",
    width: 1280,
    height: 721,
  },
  "science-and-technology": {
    alt: "Роботизированные руки рядом с изображением спирали ДНК",
    width: 1280,
    height: 853,
  },
  "cybernetics-and-implants": {
    alt: "Кибернетическая рука с подсвеченными элементами",
    width: 1280,
    height: 853,
  },
  corporations: {
    alt: "Небоскрёбы с логотипами InnovatX, Holland Industries и Enigma",
    width: 1280,
    height: 853,
  },
  "moxi-brothel": {
    alt: "Мокси в кресле на фоне красных неоновых вывесок",
    width: 1280,
    height: 853,
  },
  innovatx: {
    alt: "Логотип InnovatX на фоне цветных неоновых линий",
    width: 1280,
    height: 853,
  },
  "holland-industries": {
    alt: "Логотип Holland Industries на чёрно-золотом фоне",
    width: 1280,
    height: 720,
  },
  enigma: {
    alt: "Логотип Enigma на фиолетовом фоне",
    width: 1280,
    height: 720,
  },
  "corporate-races": {
    alt: "Гоночный болид на трассе ночного города",
    width: 1280,
    height: 720,
  },
  "criminal-organizations": {
    alt: "Фигуры в тени неонового города и расколотая эмблема",
    width: 1280,
    height: 721,
  },
  freedom: {
    alt: "Участница «Свободы» на фоне флага группировки",
    width: 1280,
    height: 722,
  },
  myanmar: {
    alt: "Люди в красных одеждах на фоне дракона",
    width: 1280,
    height: 853,
  },
  "technology-triumph-cult": {
    alt: "Участники Культа Триумфа Технологий в зелёном неоновом свете",
    width: 1280,
    height: 960,
  },
  "lobos-libres": {
    alt: "Музыканты на фоне надписи Lobus Liberos",
    width: 1280,
    height: 853,
  },
  "mephisto-casino": {
    alt: "Мефис за игровым столом в неоновом зале казино",
    width: 1280,
    height: 853,
  },
  "organization-v": {
    alt: "Фиолетовая маска на фоне буквы V",
    width: 1280,
    height: 853,
  },
} satisfies Partial<
  Record<WorldArticleSlug, { alt: string; width: number; height: number }>
>;

export function WorldArticleIllustration({
  slug,
}: {
  slug: keyof typeof illustrations;
}) {
  const { alt, width, height } = illustrations[slug];

  return (
    <img
      className={styles.illustration}
      src={`${deployment.basePath}/images/world/articles/${slug}.jpg`}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
    />
  );
}
