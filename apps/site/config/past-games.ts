import type { CardProps, GameFocus, GameTagId } from "@edem/ui";
import deployment from "./deployment.json";

export const photoPath = `${deployment.basePath}/images/games`;

export const games: {
  slug: string;
  title: string;
  frame: CardProps["frame"];
  albums: string[];
  summary: string;
  tagIds: readonly GameTagId[];
  focus: GameFocus;
  approximatePlayers?: number;
}[] = [
  {
    slug: "kazn-ognya-vechnogo",
    title: "Казнь Огня Вечного",
    frame: "system",
    albums: [
      "https://vk.ru/album-224149467_300790782",
      "https://vk.ru/album-224149467_299694271",
    ],
    summary:
      "В Помпеях, где власть принадлежит преступным группировкам, а законы Эдема почти ничего не значат, готовится грандиозная вечеринка. Мокси, одна из самых известных фигур преступного города, празднует день рождения.\n\nНо за яркими вывесками, дорогими удовольствиями и шумным праздником скрывается противостояние, в котором переплелись интересы преступного мира, государства и тех, кто мечтает о свободе.",
    tagIds: [
      "chamber",
      "criminal-groups",
      "pompeii",
      "political-intrigue",
      "criminal-conflict",
      "16-plus",
      "20-to-40",
      "completed",
    ],
    focus: { social: 4, combat: 2, systems: 4 },
    approximatePlayers: 30,
  },
  {
    slug: "kazino-mefisa",
    title: "Казино Мефиса",
    frame: "asym",
    albums: ["https://vk.ru/album-224149467_303755489"],
    summary:
      "Среди бедных кварталов Помпей появилось загадочное казино, которое быстро стало притягивать посетителей со всего Эдема. Здесь встречаются представители высшего общества, искатели острых ощущений и те, кто привык жить вне правил.\n\nНо за блеском игровых столов скрываются тревожные слухи. Люди бесследно исчезают, а происхождение самого казино остаётся загадкой. И всё же желающих испытать удачу становится только больше.",
    tagIds: [
      "chamber",
      "elite",
      "pompeii",
      "conspiracies",
      "16-plus",
      "20-to-40",
      "completed",
    ],
    focus: { social: 5, combat: 0, systems: 5 },
    approximatePlayers: 30,
  },
  {
    slug: "parad-tehnologiy",
    title: "Парад технологий",
    frame: "double",
    albums: ["https://vk.ru/album-224149467_305437371"],
    summary:
      "Парад технологий — одно из главных событий технологического мира Эдема. Ведущие корпорации, изобретатели, инвесторы и представители высшего общества собираются вместе, чтобы представить новые разработки и определить, какие из них получат поддержку.\n\nЗдесь технологии становятся инструментом влияния, а деловые переговоры превращаются в борьбу за деньги, власть и будущее целых корпораций.\n\nНо за официальными презентациями и обещаниями прогресса скрываются противоречивые интересы. У каждого участника свои цели, и далеко не все готовы играть по установленным правилам.",
    tagIds: [
      "chamber",
      "elite",
      "corporations",
      "corporate-rivalry",
      "tech-conflict",
      "experienced",
      "16-plus",
      "20-to-40",
      "completed",
    ],
    focus: { social: 5, combat: 1, systems: 4 },
    approximatePlayers: 30,
  },
  {
    slug: "teni-vostochnogo-goroda",
    title: "Тени Восточного города",
    frame: "system",
    albums: ["https://vk.ru/album-224149467_308118503"],
    summary:
      "Наркокартель «Мьянма», одна из влиятельных преступных организаций Восточного города, оказался на грани раскола.\n\nЭшли Харрингтон открыто выступает против Дракона, оспаривая его власть. Прежний порядок рушится, внутри картеля нарастает противостояние, а борьба за влияние перерастает в борьбу за руководство всей организацией.\n\nУ «Мьянмы» может быть только один глава.",
    tagIds: [
      "chamber",
      "criminal-groups",
      "east-city",
      "criminal-conflict",
      "16-plus",
      "20-to-40",
      "completed",
    ],
    focus: { social: 5, combat: 2, systems: 3 },
    approximatePlayers: 30,
  },
  {
    slug: "ad-na-zemle",
    title: "Ад на земле",
    frame: "asym",
    albums: ["https://vk.ru/album-224149467_309547135"],
    summary:
      "Теодор Райден, арестованный лидер организации «Свобода», жив. Его соратникам становится известно, что он находится в Северном городе, в одной из самых защищённых тюрем Эдема.\n\nПрямое нападение на такую крепость практически невозможно. Поэтому «Свобода» готовит тайную операцию по проникновению в тюрьму и освобождению своего лидера.\n\nЗа стенами учреждения, созданного для того, чтобы никто не смог его покинуть, разворачивается опасная операция, в которой малейшая ошибка может стоить свободы и жизни.",
    tagIds: [
      "chamber",
      "north-city",
      "government",
      "criminal-conflict",
      "16-plus",
      "up-to-20",
      "completed",
    ],
    focus: { social: 5, combat: 2, systems: 3 },
  },
];
