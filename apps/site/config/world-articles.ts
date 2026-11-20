import { siteHref } from "./site-href";

export const worldArticleGroups = [
  {
    slug: "power",
    title: "Государство и общество",
    heading: "Во славу Адама!",
    description:
      "Эдемом правит Верховный понтифик Адам. Социальный рейтинг определяет права и возможности каждого гражданина.",
    artwork: "faith",
    articles: [
      { path: "/world/government", title: "Государственное устройство Эдема" },
    ],
  },
  {
    slug: "geography",
    title: "Мир и география",
    heading: "От небоскрёбов до пустошей",
    description:
      "Западный, Восточный и Северный города образуют Эдем. За их пределами лежат пустоши и другие государства.",
    artwork: "outskirts",
    articles: [],
  },
  {
    slug: "history",
    title: "История",
    heading: "Мир после конца света",
    description:
      "Ядерная война разрушила прежнюю цивилизацию. Первый Адам объединил выживших и основал Эдем.",
    artwork: null,
    articles: [],
  },
  {
    slug: "technology",
    title: "Наука и технологии",
    heading: "Будущее на каждом шагу",
    description:
      "Нейрочипы, импланты, искусственный интеллект и невероятные изобретения. В Эдеме высокие технологии давно стали частью повседневной жизни.",
    artwork: "civic-profile",
    articles: [
      { path: "/world/neurochip", title: "Социальный рейтинг и нейрочип" },
    ],
  },
  {
    slug: "corporations",
    title: "Корпорации",
    heading: "У будущего есть владельцы",
    description:
      "InnovatX, Holland Industries и Enigma создают технологии будущего и соперничают за влияние.",
    artwork: "cyberpunk-expo",
    articles: [],
  },
  {
    slug: "stories",
    title: "Организации и группировки",
    heading: "Не все согласны с правилами",
    description:
      "Преступные группировки, независимые организации и тайные объединения ведут собственную игру.",
    artwork: "pompeii-uprising",
    articles: [],
  },
] as const;

export type WorldArticleTopic = (typeof worldArticleGroups)[number]["slug"];

export function worldArticlesHref(topic: WorldArticleTopic): string {
  return siteHref(`/world/topics/${topic}`);
}
