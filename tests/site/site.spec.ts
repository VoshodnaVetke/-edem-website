import { expect, test } from "@playwright/test";

const pagesBasePath = "/-edem-website";
const expectedRevision = process.env.EDEM_SITE_REVISION;

const publicPages = [
  ["/events", "Афиша", "Афиша игр"],
  ["/games", "Наши игры", "Наши игры"],
  ["/world", "Вселенная", "Вселенная «Эдем»"],
  ["/order", "Заказать игру", "Заказать игру"],
  ["/collaboration", "Сотрудничество", "Сотрудничество"],
  ["/about", "О мастерской группе", "О мастерской группе"],
  ["/account", "Личный кабинет", "Личный кабинет"],
  ["/", "Главная", "Миры, в которые можно войти."],
] as const;
const articlePath = "/world/neurochip";

function exportedPath(route: string) {
  return route === "/" ? pagesBasePath + "/" : pagesBasePath + route + "/";
}

test("the schedule lists the Council and the archive leads to the game galleries", async ({
  page,
  request,
}) => {
  await page.goto(exportedPath("/events"));
  const council = page.getByRole("article").filter({
    has: page.getByRole("heading", { name: "Совет Светочей", exact: true }),
  });
  await expect(council).toBeVisible();
  await expect(council.getByText("Опытным игрокам")).toBeVisible();

  await page.getByRole("link", { name: "Посмотреть проведённые игры" }).click();
  await expect(page).toHaveURL(new RegExp(`${exportedPath("/games")}$`));
  await expect(
    page.getByRole("heading", { name: "Совет Светочей", exact: true }),
  ).toHaveCount(0);

  await expect(
    page.getByRole("heading", { name: "Архив проектов" }),
  ).toHaveCount(0);
  const games = [
    [
      "Казнь Огня Вечного",
      "kazn-ognya-vechnogo",
      ["300790782", "299694271"],
      [4, 2, 4],
      8,
    ],
    ["Казино Мефиса", "kazino-mefisa", ["303755489"], [5, 0, 5], 7],
    ["Парад технологий", "parad-tehnologiy", ["305437371"], [5, 1, 4], 9],
    [
      "Тени Восточного города",
      "teni-vostochnogo-goroda",
      ["308118503"],
      [5, 2, 3],
      7,
    ],
    ["Ад на земле", "ad-na-zemle", ["309547135"], [5, 2, 3], 7],
  ] as const;
  await expect(
    page.getByRole("main").getByRole("heading", { level: 2 }),
  ).toHaveText(games.map(([title]) => title));
  for (const [title, slug, albumIds, focus, tagCount] of games) {
    const card = page
      .getByRole("main")
      .getByRole("link")
      .filter({
        has: page.getByRole("heading", { name: title, exact: true }),
      });
    const players = slug === "ad-na-zemle" ? "up-to-20" : "20-to-40";
    const scores = focus.map(
      (score, index) =>
        `${["Социалка", "Боёвка", "Механики"][index]}: ${score} из 5`,
    );
    await expect(card.locator("[data-tag-id]")).toHaveCount(tagCount);
    await expect(card.locator('[data-tag-id="16-plus"]')).toBeVisible();
    await expect(card.locator(`[data-tag-id="${players}"]`)).toBeVisible();
    for (const name of scores) {
      await expect(card.getByRole("img", { name })).toBeVisible();
    }
    const action = card.getByText("Об игре");
    await expect(action).toBeVisible();
    await expect(action.locator("..")).toHaveCSS("min-height", "52px");
    await expect(card.getByRole("link")).toHaveCount(0);
    const cover = card.locator("img");
    await expect(cover).toHaveAttribute(
      "src",
      `${pagesBasePath}/images/games/${slug}.webp`,
    );
    expect(
      await cover.evaluate(async (image: HTMLImageElement) => {
        await image.decode();
        return image.naturalWidth;
      }),
    ).toBeGreaterThan(0);
    const media = card.locator(".edem-card-media");
    expect(await media.boundingBox()).toEqual(
      await card.locator(".edem-frame").boundingBox(),
    );
    await expect(media).toHaveCSS("clip-path", /url\(/);
    if (slug === "kazn-ognya-vechnogo") {
      await card.press("Tab");
      await page.keyboard.press("Shift+Tab");
      await expect(card).toBeFocused();
      await expect(action.locator("..")).toHaveCSS(
        "color",
        await page
          .locator("body")
          .evaluate((body) => getComputedStyle(body).backgroundColor),
      );
      await card.press("Enter");
    } else {
      await action.click();
    }
    await expect(page).toHaveURL(
      (url) => url.pathname === exportedPath(`/games/${slug}`),
    );
    await expect(
      page.getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    const tags = page.getByRole("list", { name: "Теги игры" });
    await expect(tags.locator("[data-tag-id]")).toHaveCount(tagCount);
    await expect(tags.locator('[data-tag-id="16-plus"]')).toBeVisible();
    await expect(tags.locator(`[data-tag-id="${players}"]`)).toBeVisible();
    const focusRegion = page.getByRole("region", { name: "Игровые акценты" });
    for (const name of scores) {
      await expect(focusRegion.getByRole("img", { name })).toBeVisible();
    }
    const photos = page.locator("main .edem-gallery img");
    expect(await photos.count()).toBeGreaterThan(1);
    const photo = photos.first();
    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute(
      "src",
      `${pagesBasePath}/images/games/${slug}/0001-thumb.webp`,
    );
    await expect(photo.locator("..")).toHaveAttribute(
      "href",
      `${pagesBasePath}/images/games/${slug}/0001.webp`,
    );
    await expect(
      page.locator(
        `main img[src="${pagesBasePath}/images/games/${slug}.webp"]`,
      ),
    ).toHaveCount(0);
    expect(
      await photo.evaluate(async (img: HTMLImageElement) => {
        await img.decode();
        return img.naturalWidth;
      }),
    ).toBeGreaterThan(0);
    const full = await request.head(
      `${pagesBasePath}/images/games/${slug}/0001.webp`,
    );
    expect(full.status()).toBe(200);
    expect(full.headers()["content-type"]).toContain("image/webp");
    const albumLinks = page
      .getByRole("main")
      .getByRole("link", { name: /в ВК/ });
    await expect(albumLinks).toHaveCount(albumIds.length);
    for (const [index, id] of albumIds.entries()) {
      await expect(albumLinks.nth(index)).toHaveAttribute(
        "href",
        `https://vk.ru/album-224149467_${id}`,
      );
    }
    await page.goBack();
  }
});

test("Parade shows its taxonomy and game focus on the card and detail page", async ({
  page,
}) => {
  const tagLabels = [
    "Кабинетная ролевая игра",
    "Элита",
    "Корпорации",
    "Корпоративная конкуренция",
    "Технологическое противостояние",
    "Опытным игрокам",
    "16+",
    "20–40 игроков",
    "Завершена",
  ];
  const scores = ["Социалка: 5 из 5", "Боёвка: 1 из 5", "Механики: 4 из 5"];
  await page.goto(exportedPath("/games"));
  const archive = page.getByRole("main");
  const paradeCard = archive.getByRole("link").filter({
    has: page.getByRole("heading", { name: "Парад технологий", exact: true }),
  });
  await expect(paradeCard.locator("[data-tag-id]")).toHaveText(tagLabels);
  for (const name of scores) {
    await expect(paradeCard.getByRole("img", { name })).toBeVisible();
  }

  await page.goto(exportedPath("/games/parad-tehnologiy"));
  const heading = page.getByRole("heading", {
    level: 1,
    name: "Парад технологий",
  });
  const tags = page.getByRole("list", { name: "Теги игры" });
  const summary = page.getByText(/^Парад технологий — одно из главных событий/);
  const photo = page.getByRole("img", {
    name: "«Парад технологий», фото 1",
    exact: true,
  });

  await expect(tags.getByRole("listitem")).toHaveText(tagLabels);
  const firstTag = tags.locator("[data-tag-id]").first();
  await expect(firstTag).toHaveCSS("text-transform", "uppercase");
  await expect(firstTag.locator(".edem-sketch-plate")).toHaveCount(1);
  await expect(
    page.getByText("Игровые акценты · 10 очков", { exact: true }),
  ).toHaveCount(0);
  const focus = page.getByRole("region", { name: "Игровые акценты" });
  for (const name of scores) {
    await expect(focus.getByRole("img", { name })).toBeVisible();
  }

  const segment = focus
    .locator('.edem-game-focus__segment[data-active="true"]')
    .nth(1);
  await expect(focus).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(segment).toHaveCSS("height", "4px");
  await expect(segment).toHaveCSS("animation-name", "none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await focus.scrollIntoViewIfNeeded();
  await expect(segment).toHaveCSS("animation-name", "edem-game-focus-fill");
  await expect(segment).toHaveCSS("animation-delay", "0.095s");
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 850 });
    await page.evaluate(() => document.fonts.ready);
    const titleBox = (await heading.boundingBox())!;
    const tagsBox = (await tags.boundingBox())!;
    const summaryBox = (await summary.boundingBox())!;
    const focusBox = (await focus.boundingBox())!;
    const photoBox = (await photo.boundingBox())!;
    expect(tagsBox.y).toBeGreaterThanOrEqual(titleBox.y + titleBox.height);
    expect(focusBox.y).toBeGreaterThanOrEqual(summaryBox.y + summaryBox.height);
    expect(photoBox.y).toBeGreaterThanOrEqual(focusBox.y + focusBox.height);
    expect(photoBox.width).toBeLessThan(width / 2);
    if (width === 1440) {
      expect(summaryBox.x).toBeGreaterThan(titleBox.x + titleBox.width);
    } else {
      expect(summaryBox.y).toBeGreaterThanOrEqual(tagsBox.y + tagsBox.height);
    }
  }
});

test("homepage serves the expected revision and loads its resources", async ({
  page,
  request,
}) => {
  const home = exportedPath("/");

  if (process.env.EDEM_SITE_URL && expectedRevision) {
    test.setTimeout(150_000);
    await expect(async () => {
      const response = await request.get(home, { timeout: 10_000 });
      expect(response.status()).toBe(200);
      const html = await response.text();
      const revision = html.match(
        /<meta name="edem-revision" content="([^"]+)"/,
      )?.[1];
      expect(revision, "published homepage revision").toBe(expectedRevision);
    }).toPass({ timeout: 120_000, intervals: [1_000, 3_000, 5_000, 10_000] });
  }

  const resourceTypes = ["script", "stylesheet", "font", "image"];
  const loadedTypes = new Set<string>();
  const errors: string[] = [];
  page.on("response", (response) => {
    const type = response.request().resourceType();
    if (!resourceTypes.includes(type)) return;
    const path = new URL(response.url()).pathname;
    if (!response.ok() || !path.startsWith(`${pagesBasePath}/`)) {
      errors.push(`${type}: ${response.status()} ${path}`);
    }
    loadedTypes.add(type);
  });
  page.on("requestfailed", (request) => {
    if (resourceTypes.includes(request.resourceType())) {
      errors.push(`${request.failure()?.errorText} ${request.url()}`);
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 900 });
  const response = await page.goto(home);
  expect(response?.status()).toBe(200);
  if (expectedRevision) {
    await expect(page.locator('meta[name="edem-revision"]')).toHaveAttribute(
      "content",
      expectedRevision,
    );
  }
  await expect(page).toHaveTitle("Эдем | Мастерская ролевых игр");
  await expect(
    page.getByRole("heading", { name: "Миры, в которые можно войти." }),
  ).toBeVisible();
  await expect(page.locator("header.edem-navigation")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);

  const theme = await page.evaluate(async () => {
    await document.fonts.ready;
    const body = getComputedStyle(document.body);
    const heading = getComputedStyle(document.querySelector("h1")!);
    const root = getComputedStyle(document.documentElement);

    return {
      bodyFont: body.fontFamily,
      headingFont: heading.fontFamily,
      background: body.backgroundColor,
      token: root.getPropertyValue("--edem-color-background").trim(),
      layout: root.getPropertyValue("--edem-layout-max").trim(),
    };
  });

  expect(theme.bodyFont).toContain("Onest Variable");
  expect(theme.headingFont).toContain("Tektur Variable");
  expect(theme.background).toBe("rgb(5, 7, 12)");
  expect(theme.token).toBeTruthy();
  expect(theme.layout).toBeTruthy();

  expect(errors).toEqual([]);
  expect(loadedTypes).toEqual(new Set(resourceTypes));
  const background = page.locator("body > .edem-tree--viewport");
  await expect(background).toHaveCount(1);
  await expect(background).toHaveAttribute("aria-hidden", "true");
  await expect(background).toHaveCSS("position", "fixed");
  await expect(background).toHaveCSS("pointer-events", "none");
  await expect(page.locator("main .edem-tree")).toHaveCount(0);
  const artwork = background.locator(".edem-tree__artwork");
  expect(
    await artwork.evaluate(async (image: HTMLImageElement) => {
      await image.decode();
      return image.naturalWidth;
    }),
  ).toBeGreaterThan(0);
});

test("the tree stays behind the page and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(exportedPath("/"));
  const background = page.locator("body > .edem-tree--viewport");
  const canvas = background.locator("canvas");
  await expect(canvas).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, innerHeight));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  expect(await background.boundingBox()).toMatchObject({ x: 0, y: 0 });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(canvas).toHaveCount(0);
  const artwork = background.locator(".edem-tree__artwork");
  await expect(artwork).toBeVisible();
  await expect(artwork).toHaveCSS("animation-name", "none");
});

test("the first-visit frame leaves clearance around each line of text", async ({
  page,
}) => {
  for (const [width, fontSize] of [
    [320, 100],
    [768, 100],
    [1440, 100],
    [320, 200],
    [390, 200],
    [1440, 200],
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(exportedPath("/"));
    await page.addStyleTag({ content: `html { font-size: ${fontSize}%; }` });
    await page.evaluate(() => document.fonts.ready);
    const card = page
      .getByRole("region", { name: "Впервые в Эдеме?" })
      .getByRole("link");
    const overlaps = await card.evaluate((element) => {
      const clearance = 8;
      const lines = [...element.querySelectorAll("h2, p")].flatMap((text) => {
        const range = document.createRange();
        range.selectNodeContents(text);
        return [...range.getClientRects()];
      });
      for (const path of element.querySelectorAll<SVGPathElement>(
        ".edem-frame__border path",
      )) {
        const transform = path.getScreenCTM()!;
        const length = path.getTotalLength();
        for (let offset = 0; offset < length; offset += 1) {
          const { x, y } = path
            .getPointAtLength(offset)
            .matrixTransform(transform);
          if (
            lines.some(
              (line) =>
                x >= line.left - clearance &&
                x <= line.right + clearance &&
                y >= line.top - clearance &&
                y <= line.bottom + clearance,
            )
          ) {
            return true;
          }
        }
      }
      return false;
    });
    expect(
      overlaps,
      `frame clearance at ${width}px and ${fontSize}% text`,
    ).toBe(false);
  }
});

test("homepage sections lead to the published routes", async ({
  page,
  request,
}) => {
  await page.goto(exportedPath("/"));
  const frames = await page
    .locator("main [data-frame]")
    .evaluateAll((cards) =>
      cards.map((card) => card.getAttribute("data-frame")),
    );
  expect(new Set(frames)).toEqual(new Set(["system", "double", "asym"]));

  const destinations = [
    ["Миры, в которые можно войти.", "Открыть мир Эдема", "/world"],
    ["Миры, в которые можно войти.", "Ближайшие игры", "/events"],
    ["Впервые в Эдеме?", /Начать знакомство/i, "/world"],
    ["Станьте частью истории", /К афише/i, "/events"],
    ["Станьте частью истории", /Подробнее о заказе/i, "/order"],
    ["За историями стоят люди", "Проведённые игры", "/games"],
    ["За историями стоят люди", "Наша команда", "/about"],
  ] as const;

  for (const [section, name, route] of destinations) {
    const href = exportedPath(route);
    await page.goto(exportedPath("/"));
    const link = page.getByRole("region", { name: section }).getByRole("link", {
      name,
    });
    await expect(link).toHaveAttribute("href", href);
    const response = await request.get(href);
    expect(response.status()).toBe(200);
    await link.click();
    await expect(page).toHaveURL((url) => url.pathname === href);
  }
});

test("real site shell fits desktop and mobile widths", async ({ page }) => {
  await page.goto(exportedPath("/"));
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator("#main-content")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `horizontal overflow at ${width}px`,
    ).toBe(true);
  }
});

test("skip link reaches the main landmark by keyboard", async ({ page }) => {
  await page.goto(exportedPath("/"));
  const skip = page.getByRole("link", { name: "Перейти к содержимому" });
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("Navigation C remains functional on desktop and mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(exportedPath("/"));
  await expect(
    page.getByRole("navigation", { name: "Основная навигация" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Быстрая навигация" }),
  ).toBeHidden();
  await expect(
    page.getByRole("navigation", { name: "Навигация в подвале" }),
  ).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("navigation", { name: "Основная навигация" }),
  ).toBeHidden();
  await expect(
    page.getByRole("navigation", { name: "Быстрая навигация" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Меню" }).click();
  const dialog = page.getByRole("dialog", { name: "Меню" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Главная" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Меню" })).toBeFocused();
});

test("only implemented pages appear in site navigation", async ({ page }) => {
  await page.goto(exportedPath("/"));
  await expect(
    page
      .getByRole("navigation", { name: "Навигация в подвале" })
      .getByRole("link", { name: "Главная" }),
  ).toHaveAttribute("href", exportedPath("/"));
  await expect(page.getByRole("button", { name: "Поиск" })).toHaveCount(0);
  await expect(page.locator(`a[href^="${pagesBasePath}/demo/"]`)).toHaveCount(
    0,
  );
});

test("removed demonstration routes return 404", async ({ request }) => {
  for (const path of ["/demo/shell", "/demo/shell/preview"]) {
    const response = await request.get(exportedPath(path));
    expect(response.status()).toBe(404);
  }
});

test("mobile bottom navigation appears immediately and stays pinned", async ({
  page,
}) => {
  for (const width of [320, 360, 390, 430]) {
    await page.setViewportSize({ width, height: 740 });
    await page.goto(exportedPath("/"));

    const bottom = page.getByRole("navigation", {
      name: "Быстрая навигация",
    });
    await expect(bottom).toBeVisible();

    const before = await bottom.boundingBox();
    expect(before).not.toBeNull();
    expect(Math.abs(before!.y + before!.height - 740)).toBeLessThan(2);
    expect(
      await bottom.evaluate((element) => getComputedStyle(element).position),
    ).toBe("fixed");

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const after = await bottom.boundingBox();
    expect(after).not.toBeNull();
    expect(Math.abs(after!.y + after!.height - 740)).toBeLessThan(2);

    const contentPadding = await page.evaluate(() =>
      parseFloat(getComputedStyle(document.body).paddingBottom),
    );
    expect(contentPadding).toBeGreaterThanOrEqual(before!.height);
  }
});

test("approved footer keeps its content and responsive UI grid", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(exportedPath("/"));

  const footer = page.getByRole("contentinfo");
  const heading = footer.getByRole("heading", { level: 2, name: "Эдем" });
  const description = footer.getByText(
    "Авторская вселенная кабинетных и текстовых ролевых игр.",
  );
  const divider = footer.locator(".edem-vector-divider__label");
  const navigation = footer.getByRole("navigation", {
    name: "Навигация в подвале",
  });
  const home = navigation.getByRole("link", { name: "Главная" });

  await expect(heading).toBeVisible();
  await expect(footer.getByText("ЭДЕМ / МАСТЕРСКАЯ ГРУППА")).toBeVisible();
  await expect(description).toBeVisible();
  await expect(divider).toHaveText("ЭДЕМ / СВЯЗЬ УСТАНОВЛЕНА");
  await expect(home).toHaveAttribute("href", exportedPath("/"));

  const intro = footer.locator(".edem-span--intro");
  const desktopIntro = await intro.boundingBox();
  const desktopNav = await navigation.boundingBox();
  expect(desktopIntro).not.toBeNull();
  expect(desktopNav).not.toBeNull();
  expect(desktopNav!.x).toBeGreaterThan(desktopIntro!.x);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileIntro = await intro.boundingBox();
  const mobileNav = await navigation.boundingBox();
  expect(mobileIntro).not.toBeNull();
  expect(mobileNav).not.toBeNull();
  expect(mobileNav!.y).toBeGreaterThan(mobileIntro!.y);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const footerBox = await footer.boundingBox();
  const bottomBar = page.getByRole("navigation", {
    name: "Быстрая навигация",
  });
  const bottomBox = await bottomBar.boundingBox();
  expect(footerBox).not.toBeNull();
  expect(bottomBox).not.toBeNull();
  expect(footerBox!.y + footerBox!.height).toBeLessThanOrEqual(
    bottomBox!.y + 2,
  );
});

test("public pages and their internal links resolve", async ({
  page,
  request,
}) => {
  const linkedPaths = new Set<string>();
  for (const [path, , title] of publicPages) {
    const response = await page.goto(exportedPath(path));
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("body > .edem-tree--viewport")).toHaveCount(1);
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.locator("header.edem-navigation")).toHaveCount(1);
    const internalLinks = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors
        .map((anchor) => new URL((anchor as HTMLAnchorElement).href))
        .filter((url) => url.origin === window.location.origin)
        .map((url) => url.pathname + url.search),
    );
    for (const link of internalLinks) linkedPaths.add(link);
  }

  const testedRoutes = new Set(publicPages.map(([path]) => exportedPath(path)));
  for (const path of linkedPaths) {
    expect(
      path.startsWith(`${pagesBasePath}/`),
      `same-origin link: ${path}`,
    ).toBe(true);
    if (!testedRoutes.has(path)) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }
  }

  await page.goto(exportedPath("/order"));
  await expect(page.locator("form")).toHaveCount(0);
  await page.goto(exportedPath("/collaboration"));
  await expect(page.locator("form")).toHaveCount(0);
});

test("the world article has working contents and related links", async ({
  page,
}) => {
  await page.goto(exportedPath("/world"));
  await page.getByRole("link", { name: /Читать статью/ }).click();
  await expect(page).toHaveURL(
    (url) => url.pathname === exportedPath(articlePath),
  );
  await expect(
    page.getByRole("heading", {
      name: "Социальный рейтинг и нейрочип",
      level: 1,
    }),
  ).toBeVisible();

  const nav = page.getByRole("navigation", { name: "Основная навигация" });
  await expect(nav.getByRole("link", { name: "Вселенная" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  await page.getByRole("button", { name: "Меню" }).click();
  const menu = page.getByRole("dialog", { name: "Меню" });
  await expect(menu.getByRole("link", { name: "Главная" })).not.toHaveAttribute(
    "aria-current",
  );
  await page.keyboard.press("Escape");

  await page.setViewportSize({ width: 390, height: 844 });
  const contents = page.getByRole("navigation", { name: "Оглавление статьи" });
  await contents
    .getByRole("link", { name: "Как работает социальный рейтинг" })
    .click();
  await expect(page).toHaveURL((url) => url.hash === "#rating");
  await expect(page.getByText("300 баллов", { exact: true })).toBeVisible();
  await expect(page.getByText("700 баллов", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Власть и государство" }).click();
  await expect(page).toHaveURL(
    (url) => url.pathname === exportedPath("/world") && url.hash === "#power",
  );
  await expect(
    page.getByRole("heading", { name: "Власть и государство" }),
  ).toBeVisible();
});

for (const width of [1440, 390]) {
  test.describe(`navigation at ${width}px`, () => {
    test.use({
      viewport: { width, height: 844 },
      hasTouch: width === 390,
      reducedMotion: "reduce",
    });
    test("menu reaches every public page and returns home", async ({
      page,
    }) => {
      await page.goto(exportedPath("/"));
      for (const [path, label, title] of publicPages) {
        await page.getByRole("button", { name: "Меню" }).click();
        const link = page
          .getByRole("dialog", { name: "Меню" })
          .getByRole("link", { name: label, exact: true });
        await expect(link).toHaveAttribute("href", exportedPath(path));
        await link.click();
        await expect(page).toHaveURL(
          (url) => url.pathname === exportedPath(path),
        );
        await expect(
          page.getByRole("heading", { name: title, level: 1 }),
        ).toBeVisible();
      }
      const artwork = page.locator(".edem-tree__artwork");
      await expect(artwork).toBeVisible();
      expect(
        await artwork.evaluate((image: HTMLImageElement) => image.naturalWidth),
      ).toBeGreaterThan(0);
    });
  });
}

test("desktop and mobile navigation use working route destinations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(exportedPath("/"));

  const desktop = page.getByRole("navigation", { name: "Основная навигация" });
  await expect(desktop.getByRole("link")).toHaveCount(4);
  for (const [name, href] of [
    ["Афиша", "/events"],
    ["Наши игры", "/games"],
    ["Вселенная", "/world"],
    ["О мастерской группе", "/about"],
  ]) {
    await expect(desktop.getByRole("link", { name })).toHaveAttribute(
      "href",
      exportedPath(href),
    );
  }

  await page.getByRole("button", { name: "Меню" }).click();
  const menu = page.getByRole("dialog", { name: "Меню" });
  await expect(
    menu.getByRole("link", { name: "Заказать игру" }),
  ).toHaveAttribute("href", exportedPath("/order"));
  await expect(
    menu.getByRole("link", { name: "Сотрудничество" }),
  ).toHaveAttribute("href", exportedPath("/collaboration"));
  await page.keyboard.press("Escape");

  await page.setViewportSize({ width: 390, height: 844 });
  const bottom = page.getByRole("navigation", { name: "Быстрая навигация" });
  await expect(bottom.getByRole("link")).toHaveCount(3);
  await expect(bottom.locator("svg")).toHaveCount(3);
  for (const [name, href] of [
    ["Афиша", "/events"],
    ["Мир", "/world"],
    ["Игры", "/games"],
  ]) {
    await bottom.getByRole("link", { name }).click();
    expect(new URL(page.url()).pathname).toBe(exportedPath(href));
    await expect(bottom.getByRole("link", { name })).toHaveAttribute(
      "aria-current",
      "page",
    );
  }
});

test("public routes remain responsive without horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [...publicPages.map(([path]) => path), articlePath]) {
      await page.goto(exportedPath(path));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${path} at ${width}px`,
      ).toBe(true);
    }
  }
});

test("removed and unavailable routes return 404", async ({ request }) => {
  for (const path of [
    "/wiki",
    "/team",
    "/contacts",
    "/games/unpublished",
    "/events/unpublished",
    "/wiki/unpublished",
  ]) {
    const response = await request.get(exportedPath(path));
    expect(response.status(), path).toBe(404);
  }
});
