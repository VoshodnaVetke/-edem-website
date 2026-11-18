import type { CardProps } from "@edem/ui";

export const games: {
  slug: string;
  title: string;
  frame: CardProps["frame"];
  albums: string[];
  summary?: string;
  photos?: readonly { src: string; alt: string }[];
}[] = [
  {
    slug: "ad-na-zemle",
    title: "Ад на земле",
    frame: "asym",
    albums: ["https://vk.ru/album-224149467_309547135"],
  },
  {
    slug: "teni-vostochnogo-goroda",
    title: "Тени Восточного города",
    frame: "system",
    albums: ["https://vk.ru/album-224149467_308118503"],
  },
  {
    slug: "parad-tehnologiy",
    title: "Парад технологий",
    frame: "double",
    albums: ["https://vk.ru/album-224149467_305437371"],
    summary:
      "Изобретатели представляют разработки, а корпорации ищут перспективные проекты и договариваются о сделках. В центре игры — инвестиции, переговоры и соперничество за право заняться новым проектом.",
  },
  {
    slug: "kazino-mefisa",
    title: "Казино Мефиса",
    frame: "asym",
    albums: ["https://vk.ru/album-224149467_303755489"],
  },
  {
    slug: "kazn-ognya-vechnogo",
    title: "Казнь Огня Вечного",
    frame: "system",
    albums: [
      "https://vk.ru/album-224149467_300790782",
      "https://vk.ru/album-224149467_299694271",
    ],
  },
];
