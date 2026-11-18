import type { CardProps } from "@edem/ui";
import deployment from "./deployment.json";

export const gameFormat = "Кабинетная ролевая игра";

const photoPath = `${deployment.basePath}/images/games`;

export const games: {
  slug: string;
  title: string;
  frame: CardProps["frame"];
  albums: string[];
  summary?: string;
  tags?: readonly string[];
  photos?: readonly { src: string; alt: string }[];
}[] = [
  {
    slug: "kazn-ognya-vechnogo",
    photos: [
      {
        src: `${photoPath}/kazn-ognya-vechnogo.webp`,
        alt: "Четверо участников в костюмах позируют на красном диване",
      },
    ],
    title: "Казнь Огня Вечного",
    frame: "system",
    albums: [
      "https://vk.ru/album-224149467_300790782",
      "https://vk.ru/album-224149467_299694271",
    ],
  },
  {
    slug: "kazino-mefisa",
    photos: [
      {
        src: `${photoPath}/kazino-mefisa.webp`,
        alt: "Участница с фишкой у глаза на фоне неоновой вывески",
      },
    ],
    title: "Казино Мефиса",
    frame: "asym",
    albums: ["https://vk.ru/album-224149467_303755489"],
  },
  {
    slug: "parad-tehnologiy",
    photos: [
      {
        src: `${photoPath}/parad-tehnologiy.webp`,
        alt: "Участники в костюмах разговаривают, один держит микрофон",
      },
    ],
    title: "Парад технологий",
    tags: ["Для опытных", "Элита Эдема"],
    frame: "double",
    albums: ["https://vk.ru/album-224149467_305437371"],
    summary:
      "Изобретатели представляют разработки, а корпорации ищут перспективные проекты и договариваются о сделках. В центре игры — инвестиции, переговоры и соперничество за право заняться новым проектом.",
  },
  {
    slug: "teni-vostochnogo-goroda",
    photos: [
      {
        src: `${photoPath}/teni-vostochnogo-goroda.webp`,
        alt: "Участник с длинными тёмными волосами на фоне фиолетовой подсветки",
      },
    ],
    title: "Тени Восточного города",
    frame: "system",
    albums: ["https://vk.ru/album-224149467_308118503"],
  },
  {
    slug: "ad-na-zemle",
    photos: [
      {
        src: `${photoPath}/ad-na-zemle.webp`,
        alt: "Участница с синими волосами в окружении других игроков",
      },
    ],
    title: "Ад на земле",
    frame: "asym",
    albums: ["https://vk.ru/album-224149467_309547135"],
  },
];
