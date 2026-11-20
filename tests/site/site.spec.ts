import { expect, test } from "@playwright/test";
import { upcomingGame } from "../../apps/site/config/upcoming-game";
import {
  worldArticleEntries,
  worldArticleGroups,
} from "../../apps/site/config/world-articles";

const pagesBasePath = "/-edem-website";
const expectedRevision = process.env.EDEM_SITE_REVISION;
const gamesTitle = "Истории, которые мы пишем вместе";
const worldTitle = "Добро пожаловать в Эдем.";

const publicPages = [
  ["/games", "Наши игры", gamesTitle],
  ["/world", "Вселенная", worldTitle],
  ["/order", "Заказать игру", "Заказать игру"],
  ["/collaboration", "Сотрудничество", "Сотрудничество"],
  ["/about", "О мастерской группе", "Мастерская группа «Эдем»"],
  ["/account", "Личный кабинет", "Личный кабинет"],
  ["/", "Главная", "Миры, в которые можно войти."],
] as const;
const articlePath = "/world/neurochip";

function exportedPath(route: string) {
  return route === "/" ? pagesBasePath + "/" : pagesBasePath + route + "/";
}

test("the homepage leads to the archive and its game galleries", async ({
  page,
  request,
}) => {
  await page.goto(exportedPath("/"));
  await page
    .getByRole("main")
    .getByRole("link", { name: "Наши игры", exact: true })
    .click();
  await expect(page).toHaveURL(new RegExp(`${exportedPath("/games")}$`));
  await expect(
    page.getByRole("heading", { name: gamesTitle, level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Мы создаём мир, его правила и конфликты, но не решаем, чем всё закончится. Здесь каждый персонаж может изменить ход истории, независимо от своего положения, а решения игроков оставляют след в мире и определяют его будущее.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Ближайшая игра" }),
  ).toHaveCount(upcomingGame ? 1 : 0);
  const team = page.getByRole("region", { name: "За историями стоят люди" });
  const teamLink = team.getByRole("link", {
    name: "Познакомиться с мастерской группой",
  });
  await expect(teamLink).toHaveAttribute("href", exportedPath("/about"));
  await expect(teamLink).toHaveClass(/edem-button--lg/);
  const teamPhoto = team.getByRole("img", {
    name: "Кадр с игры «Казнь Огня Вечного»",
  });
  await expect(teamPhoto).toHaveAttribute(
    "src",
    `${pagesBasePath}/images/games/kazn-ognya-vechnogo/0973.webp`,
  );
  await expect(teamPhoto).toHaveCSS("clip-path", /url\(/);

  await expect(
    page.getByRole("heading", { name: "Архив проектов" }),
  ).toHaveCount(0);
  const games = [
    [
      "Казнь Огня Вечного",
      "kazn-ognya-vechnogo",
      ["300790782", "299694271"],
      8,
    ],
    ["Казино Мефиса", "kazino-mefisa", ["303755489"], 7],
    ["Парад технологий", "parad-tehnologiy", ["305437371"], 9],
    ["Тени Восточного города", "teni-vostochnogo-goroda", ["308118503"], 7],
    ["Ад на земле", "ad-na-zemle", ["309547135"], 7],
  ] as const;
  const past = page.getByRole("region", { name: "Прошедшие игры" });
  await expect(past.getByRole("heading", { level: 3 })).toHaveText(
    games.map(([title]) => title),
  );
  for (const [title, slug, albumIds, tagCount] of games) {
    const card = page
      .getByRole("main")
      .getByRole("link")
      .filter({
        has: page.getByRole("heading", { name: title, exact: true }),
      });
    const players = slug === "ad-na-zemle" ? "up-to-20" : "20-to-40";
    await expect(card.getByRole("listitem")).toHaveText([
      "Кабинетная",
      "Москва",
      "16+",
    ]);
    await expect(card.locator("[data-tag-id]")).toHaveCount(3);
    await expect(card.getByRole("img", { name: /из 5$/ })).toHaveCount(0);
    await expect(card.getByText("Об игре", { exact: true })).toHaveCount(0);
    const cover = card.locator("img");
    await expect(cover).toHaveAttribute(
      "src",
      slug === "parad-tehnologiy"
        ? `${pagesBasePath}/images/games/${slug}/0073.webp`
        : slug === "teni-vostochnogo-goroda"
          ? `${pagesBasePath}/images/games/${slug}/0135.webp`
          : `${pagesBasePath}/images/games/${slug}.webp`,
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
      await card.press("Enter");
    } else {
      await card.click();
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
    await expect(
      page.getByRole("region", { name: "Игровые акценты" }),
    ).toBeVisible();
    const photos = page.locator("main .edem-gallery img");
    expect(await photos.count()).toBeGreaterThan(1);
    const firstPhotoNumber =
      slug === "kazino-mefisa"
        ? "0100"
        : slug === "parad-tehnologiy"
          ? "0205"
          : "0001";
    const expectedPhotoNumber =
      slug === "kazn-ognya-vechnogo" ? "0529" : firstPhotoNumber;
    const curatedPhotoNumber =
      slug === "teni-vostochnogo-goroda"
        ? "0261"
        : slug === "ad-na-zemle"
          ? "0018"
          : expectedPhotoNumber;
    if (slug === "kazino-mefisa") {
      await expect(photos).toHaveCount(141);
      await expect(photos.nth(93)).toHaveAttribute(
        "src",
        /\/0230-thumb\.webp$/,
      );
    } else if (slug === "kazn-ognya-vechnogo") {
      await expect(photos).toHaveCount(414);
      await expect(photos.nth(1)).toHaveAttribute("src", /\/0569-thumb\.webp$/);
    } else if (slug === "parad-tehnologiy") {
      await expect(photos).toHaveCount(120);
    } else if (slug === "teni-vostochnogo-goroda") {
      await expect(photos).toHaveCount(139);
      await expect(photos.nth(1)).toHaveAttribute("src", /\/0042-thumb\.webp$/);
    } else if (slug === "ad-na-zemle") {
      await expect(photos).toHaveCount(220);
      await expect(photos.nth(1)).toHaveAttribute("src", /\/0044-thumb\.webp$/);
    }
    const photo = photos.first();
    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute(
      "src",
      `${pagesBasePath}/images/games/${slug}/${curatedPhotoNumber}-thumb.webp`,
    );
    await expect(photo.locator("..")).toHaveAttribute(
      "href",
      `${pagesBasePath}/images/games/${slug}/${curatedPhotoNumber}.webp`,
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
      `${pagesBasePath}/images/games/${slug}/${curatedPhotoNumber}.webp`,
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

test("Parade displays its taxonomy and game focus above the gallery", async ({
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
  await expect(
    focus.getByRole("img", { name: "Социалка: 5 из 5" }),
  ).toBeVisible();
  const segment = focus
    .locator('.edem-game-focus__segment[data-active="true"]')
    .first();
  await expect(segment).toHaveCSS("animation-name", "none");
  await expect(firstTag.locator(".edem-sketch-stroke")).toHaveAttribute(
    "stroke-width",
    "1.1",
  );

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 850 });
    await page.evaluate(() => document.fonts.ready);
    const titleBox = (await heading.boundingBox())!;
    const tagsBox = (await tags.boundingBox())!;
    const summaryBox = (await summary.boundingBox())!;
    const regionBox = (await focus.boundingBox())!;
    const chartBox = (await focus.locator(".edem-game-focus").boundingBox())!;
    expect(chartBox.width).toBeCloseTo(regionBox.width, 0);
    const photoBox = (await photo.boundingBox())!;
    expect(tagsBox.y).toBeGreaterThanOrEqual(titleBox.y + titleBox.height);
    expect(photoBox.y).toBeGreaterThanOrEqual(summaryBox.y + summaryBox.height);
    expect(photoBox.width).toBeLessThan(width / 2);
    if (width === 1440) {
      expect(summaryBox.x).toBeGreaterThan(titleBox.x + titleBox.width);
    } else {
      expect(summaryBox.y).toBeGreaterThanOrEqual(tagsBox.y + tagsBox.height);
    }
  }
});

test("detail cards show telemetry and only the footer uses a decorative divider", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 850 });
  const footerDesigns = new Set<string>();
  for (const route of [
    ...publicPages.map(([route]) => route),
    "/world/neurochip",
    "/games/parad-tehnologiy",
  ]) {
    await page.goto(exportedPath(route));
    const cards = page.locator("main .edem-card");
    await expect(cards.locator(".edem-card-telemetry")).toHaveCount(
      route === "/world" ? 0 : await cards.count(),
    );
    await expect(page.locator("main .edem-vector-divider")).toHaveCount(0);
    const footerDivider = page.locator("footer .edem-vector-divider");
    await expect(footerDivider).toHaveCount(1);
    const footerDesign = await footerDivider.getAttribute("data-variant");
    expect(footerDesign).toBeTruthy();
    footerDesigns.add(footerDesign!);
    const surface = footerDivider.locator(".edem-vector-divider__surface");
    const edge = footerDivider.locator("svg path").nth(1);
    await expect(surface).toHaveAttribute(
      "d",
      `${await edge.getAttribute("d")}V52H0Z`,
    );
  }
  expect(footerDesigns.size).toBe(3);
  await page.goto(exportedPath("/games"));
  await page.mouse.move(0, 0);
  const card = page.locator("main .edem-link-card").first();
  await expect(card.locator(".edem-card-telemetry__standby")).toBeVisible();
  await card.hover();
  await expect(card.locator(".edem-card-telemetry__active")).toBeVisible();
  await page.mouse.move(0, 0);
  await card.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(card).toBeFocused();
  await expect(card.locator(".edem-card-telemetry__active")).toBeVisible();

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto(exportedPath("/games/parad-tehnologiy"));
    const svg = page.locator("footer .edem-vector-divider svg");
    const { x, right, height, edge } = await svg.evaluate((element) => {
      const { x, right, height } = element.getBoundingClientRect();
      return { x, right, height, edge: document.documentElement.clientWidth };
    });
    expect(x).toBeCloseTo(0, 0);
    expect(right).toBeCloseTo(edge, 0);
    expect(height).toBeGreaterThanOrEqual(44);
    await expect(
      svg.locator("path:not(.edem-vector-divider__surface)").first(),
    ).toHaveCSS("stroke-width", "2.4px");
    await expect(page.locator(".edem-game-tag").first()).toHaveCSS(
      "min-height",
      width === 390 ? "15px" : "30px",
    );
  }
});

test("buttons and tags use one continuous closed outline", async ({ page }) => {
  for (const route of ["/", "/world", "/games", "/games/parad-tehnologiy"]) {
    await page.goto(exportedPath(route));
    const plates = page.locator(
      ".edem-button > .edem-sketch-plate, .edem-game-tag > .edem-sketch-plate",
    );
    expect(await plates.count()).toBeGreaterThan(0);
    const outlines = await plates.evaluateAll((elements) =>
      elements.map((plate) =>
        [...plate.querySelectorAll(".edem-sketch-stroke")].map((path) => ({
          shape: path.getAttribute("d"),
          dash: getComputedStyle(path).strokeDasharray,
        })),
      ),
    );
    for (const outline of outlines) {
      expect(outline).toEqual([
        { shape: expect.stringMatching(/^M[^MmZz]+Z$/), dash: "none" },
      ]);
    }
  }
});

test("game photos can be browsed and downloaded from the viewer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(exportedPath("/games/parad-tehnologiy"));
  const thumbnail = page.locator(".edem-gallery a").first();
  await thumbnail.click();
  const viewer = page.getByRole("dialog", { name: "Просмотр фотографий" });
  const photo = viewer.getByRole("img");
  await expect(photo).toHaveAttribute("src", /0205\.webp$/);
  const previous = viewer.getByRole("button", { name: "Предыдущее фото" });
  const next = viewer.getByRole("button", { name: "Следующее фото" });
  await expect(previous).toHaveText("←");
  await expect(next).toHaveText("→");
  const close = viewer.getByRole("button", { name: "Закрыть" });
  await expect(close).toHaveText("×");
  for (const control of [close, previous, next]) {
    await expect(control).toHaveCSS("border-top-width", "0px");
  }
  const imageBox = (await photo.boundingBox())!;
  await page.mouse.click(
    imageBox.x + imageBox.width * 0.66,
    imageBox.y + imageBox.height * 0.3,
  );
  await expect(photo).toHaveAttribute("src", /0179\.webp$/);
  await page.mouse.click(
    imageBox.x + imageBox.width * 0.33,
    imageBox.y + imageBox.height * 0.3,
  );
  await expect(photo).toHaveAttribute("src", /0205\.webp$/);
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowLeft");
  await expect(photo).toHaveAttribute("src", /0205\.webp$/);
  await photo.evaluate((element) => {
    const start = new Touch({ identifier: 1, target: element, clientX: 250 });
    const end = new Touch({ identifier: 1, target: element, clientX: 100 });
    element.dispatchEvent(
      new TouchEvent("touchstart", { bubbles: true, touches: [start] }),
    );
    element.dispatchEvent(
      new TouchEvent("touchend", { bubbles: true, changedTouches: [end] }),
    );
  });
  await expect(photo).toHaveAttribute("src", /0179\.webp$/);
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    viewer.getByRole("link", { name: "Скачать фото", exact: true }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("parad-tehnologiy-2.webp");
  expect(await download.failure()).toBeNull();
  await expect(viewer.getByRole("link")).toHaveCount(1);
  await close.click();
  await expect(viewer).toBeHidden();
  await expect(thumbnail).toBeFocused();
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

  const resourceTypes = ["script", "font", "image"];
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
  expect(
    await page.locator("head style[data-precedence]").textContent(),
  ).toContain(".edem-navigation");

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

test("missing build assets trigger one fresh request and keep a dark document", async ({
  page,
}) => {
  const path = exportedPath("/world");
  const documentRequests: URL[] = [];
  await page.route(
    (url) => url.pathname === path,
    async (route) => {
      if (route.request().isNavigationRequest()) {
        documentRequests.push(new URL(route.request().url()));
      }
      await route.continue();
    },
  );

  let missingScript: string | undefined;
  await page.route(`**${pagesBasePath}/_next/static/**`, async (route) => {
    const request = route.request();
    if (request.resourceType() === "script") {
      missingScript ??= request.url();
      if (request.url() === missingScript) {
        await route.fulfill({ status: 404 });
        return;
      }
    }
    await route.continue();
  });

  // The first document can be replaced while it is still loading.
  const initial = await page.goto(path, { waitUntil: "commit" });
  expect(initial?.status()).toBe(200);
  await expect.poll(() => documentRequests.length).toBe(2);
  expect(documentRequests[1].searchParams.has("_edem_retry")).toBe(true);
  await expect(page).toHaveURL((url) => url.pathname === path && !url.search);
  await expect(page.locator("html")).toHaveCSS(
    "background-color",
    "rgb(5, 7, 12)",
  );
  await expect(page.getByRole("heading", { name: worldTitle })).toBeVisible();
  expect(documentRequests).toHaveLength(2);
});

test("cold page renders styled content while scripts are still loading", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  let resume!: () => void;
  const gate = new Promise<void>((resolve) => {
    resume = resolve;
  });
  await page.route(`**${pagesBasePath}/_next/static/**/*.js`, async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto(exportedPath("/world"), { waitUntil: "commit" });
    const heading = page.getByRole("heading", { name: worldTitle });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveCSS("animation-name", "site-content-appear");
    await expect(page.locator("body")).toHaveCSS(
      "background-color",
      "rgb(5, 7, 12)",
    );
    const articles = page.getByRole("link", {
      name: "Читать статьи — Государство и общество",
    });
    await expect(articles).toBeVisible();
    await expect(articles).toHaveAttribute(
      "href",
      exportedPath("/world/topics/power"),
    );
    await expect(page.locator(".site-progress[data-progress]")).toHaveCount(0);
  } finally {
    resume();
  }
  await expect(page.locator(".site-progress[data-progress]")).toHaveCount(1);
});

test("the tree extends past the top and left edges and respects reduced motion", async ({
  page,
}) => {
  for (const width of [1440, 768, 390]) {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 800 });
    await page.goto(exportedPath("/world"));
    const background = page.locator("body > .edem-tree--viewport");
    const artwork = background.locator(".edem-tree__artwork");
    const layers = background.locator(".edem-tree__layers");
    await expect(artwork).toBeVisible();
    await expect(artwork).toHaveCSS("animation-name", "none");
    await expect(layers).toHaveCSS("mask-image", /76%.*94%/);
    expect(
      await layers.evaluate(
        (element) => element.getAnimations({ subtree: true }).length,
      ),
    ).toBe(0);
    await expect(background.locator(".edem-tree__fallback")).toHaveCSS(
      "opacity",
      "0.11",
    );
    await expect(background.locator("canvas")).toHaveCount(0);
    const initialBox = (await artwork.boundingBox())!;
    expect(initialBox.y).toBeCloseTo(-32, 0);
    expect(initialBox.x).toBeLessThan(0);
    expect(initialBox.x).toBeGreaterThan(-width * 0.25);
    expect(initialBox.x + initialBox.width / 2).toBeLessThanOrEqual(
      width / 2 - 31,
    );
    expect(initialBox.width).toBeCloseTo(
      Math.min(width * 1.12 + 40, 800 * 1.86),
      0,
    );
    await page.evaluate(() =>
      window.scrollTo({ top: innerHeight, behavior: "instant" }),
    );
    await expect.poll(() => artwork.boundingBox()).toEqual(initialBox);
    await page.reload();
    await expect.poll(() => artwork.boundingBox()).toEqual(initialBox);

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(artwork).toHaveCSS("animation-name", "none");
    const effect = await layers.evaluate(async (element) => {
      const animations = element.getAnimations({ subtree: true });
      await Promise.all(
        animations.map(async (animation) => {
          animation.pause();
          await animation.ready;
          animation.currentTime = 0;
        }),
      );
      const colors = ["::before", "::after"] as const;
      const start = colors.map(
        (layer) => getComputedStyle(element, layer).translate,
      );
      for (const animation of animations) {
        animation.currentTime = Number(animation.effect!.getTiming().duration);
      }
      return colors.map((layer, index) => {
        const style = getComputedStyle(element, layer);
        return {
          name: style.animationName,
          mask: style.maskImage,
          shift: parseFloat(style.translate) - parseFloat(start[index]),
        };
      });
    });
    const source = await artwork.evaluate(
      (element: HTMLImageElement) => element.src,
    );
    expect(effect.map(({ name }) => name)).toEqual([
      "edem-tree-violet",
      "edem-tree-cyan",
    ]);
    expect(effect.every(({ mask }) => mask.includes(source))).toBe(true);
    expect(effect[0].shift).toBeLessThan(0);
    expect(effect[1].shift).toBeGreaterThan(0);
    expect(effect.every(({ shift }) => Math.abs(shift) <= 8)).toBe(true);
    expect(await artwork.boundingBox()).toEqual(initialBox);
  }
});

for (const width of [1440, 390]) {
  test(`page navigation and scroll progress work at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 760 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(exportedPath("/"));
    const progress = page.locator(".site-progress");
    await expect(progress).toHaveAttribute("data-progress", "0");
    await expect(page.locator(".site-progress-impulse")).toHaveCount(0);
    await page
      .getByRole("main")
      .getByRole("link", { name: "Наши игры", exact: true })
      .click();
    await expect(page).toHaveURL(
      (url) => url.pathname === exportedPath("/games"),
    );
    await expect(
      page.locator('.site-progress-boot[data-pulse="play"]'),
    ).toHaveCount(1);
    await expect(
      page.getByRole("status").filter({ hasText: "Загрузка раздела" }),
    ).toHaveCount(0);
    const last = page.getByRole("heading", { level: 3, name: "Ад на земле" });
    await last.evaluate(async (element) => {
      const currentDocument = document as Document & {
        activeViewTransition?: ViewTransition;
      };
      await currentDocument.activeViewTransition?.finished;
      element.scrollIntoView({ block: "center", behavior: "instant" });
    });
    const position = await page.evaluate(() => scrollY);
    expect(position).toBeGreaterThan(0);
    await expect
      .poll(async () => Number(await progress.getAttribute("data-progress")))
      .toBeGreaterThan(0);
    const previousProgress = Number(
      await progress.getAttribute("data-progress"),
    );
    // Click where the heading is already visible, without Playwright re-scrolling it.
    const headingBox = (await last.boundingBox())!;
    await page.mouse.click(
      headingBox.x + headingBox.width / 2,
      headingBox.y + headingBox.height / 2,
    );
    await expect(page).toHaveURL(
      (url) => url.pathname === exportedPath("/games/ad-na-zemle"),
    );
    await page.goBack();
    await expect(page).toHaveURL(
      (url) => url.pathname === exportedPath("/games"),
    );
    await expect
      .poll(() => page.evaluate(() => scrollY).catch(() => 0))
      .toBeCloseTo(position, 0);
    await expect
      .poll(async () => Number(await progress.getAttribute("data-progress")))
      .toBeCloseTo(previousProgress, 2);
    await page.goForward();
    await expect(page).toHaveURL(
      (url) => url.pathname === exportedPath("/games/ad-na-zemle"),
    );

    await page.evaluate(() => {
      const main = document.querySelector("main")!;
      window.scrollTo({
        top: Math.ceil(
          main.getBoundingClientRect().bottom + scrollY - innerHeight,
        ),
        behavior: "instant",
      });
    });
    await expect(progress).toHaveAttribute("data-progress", "1");
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
    );
    await expect(page.locator('footer [data-pulse="play"]')).toHaveCount(1);
  });
}

test("anchor navigation tracks the current heading and respects reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 860 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [route, label, id] of [
    ["/world", "Разделы энциклопедии", "world-topics"],
    ["/games/parad-tehnologiy", "Фотографии", "game-photos"],
  ]) {
    await page.goto(exportedPath(route));
    const rail = page.getByRole("navigation", {
      name: "Разделы этой страницы",
    });
    const link = rail.getByRole("link", { name: label });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL((url) => url.hash === `#${id}`);
    await expect(link).toHaveAttribute("aria-current", "location");
    const header = (await page.locator(".site-header-shell").boundingBox())!;
    const heading = (await page.locator(`#${id}`).boundingBox())!;
    expect(heading.y).toBeGreaterThanOrEqual(header.y + header.height);
    await expect(page.locator(".site-progress-impulse")).toHaveCount(0);
    await expect(page.locator("main")).toHaveCSS("animation-name", "none");
    await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  }
  await page.setViewportSize({ width: 1600, height: 1800 });
  await page.goto(exportedPath("/about"));
  await expect(page.locator(".site-progress")).toHaveAttribute(
    "data-progress",
    "0",
  );
  await expect(page.locator(".site-section-rail")).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(exportedPath("/world"));
  await expect(page.locator(".site-section-rail")).toBeHidden();
});

for (const motion of ["no-preference", "reduce"] as const) {
  test(`immediate signal and pending status respect motion ${motion}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto(exportedPath("/"));
    await expect(page.locator(".site-progress")).toHaveAttribute(
      "data-progress",
      "0",
    );
    const boot = page.locator(".site-progress-boot");
    if (motion === "reduce") {
      await expect(boot).toBeHidden();
    } else {
      await expect(boot.locator(".edem-vector-divider__pulse")).toHaveCSS(
        "animation-name",
        "edemPulseRun",
      );
    }
    // Playwright locators wait for the incoming document during a pending navigation.
    // Observe the visible status in the outgoing document itself.
    await page.evaluate(() => {
      const observer = new MutationObserver(() => {
        const loader = document.querySelector(".site-progress-loader");
        const pulse = document.querySelector(".site-progress-impulse");
        if (pulse && !loader) {
          console.info(
            "section-pulse-started",
            getComputedStyle(pulse).display,
          );
        }
        const icon = loader?.querySelector("svg");
        if (!loader?.getClientRects().length || !icon) return;
        console.info("section-loader-visible", getComputedStyle(icon).display);
        observer.disconnect();
      });
      observer.observe(document.querySelector(".site-progress")!, {
        childList: true,
      });
    });
    const shown = page.waitForEvent("console", {
      predicate: (message) =>
        message.text().startsWith("section-loader-visible"),
      timeout: 8000,
    });
    const started = page.waitForEvent("console", {
      predicate: (message) =>
        message.text().startsWith("section-pulse-started"),
      timeout: 8000,
    });
    let resume!: () => void;
    const gate = new Promise<void>((resolve) => {
      resume = resolve;
    });
    const waitForArchive = (url: URL) =>
      url.pathname === exportedPath("/games");
    await page.route(waitForArchive, async (route) => {
      await gate;
      await route.continue();
    });
    const click = page
      .getByRole("main")
      .getByRole("link", { name: "Наши игры", exact: true })
      .click();
    try {
      expect((await started).text()).toBe(
        `section-pulse-started ${motion === "reduce" ? "none" : "block"}`,
      );
      const message = await shown;
      expect(message.text()).toBe(
        `section-loader-visible ${motion === "reduce" ? "none" : "block"}`,
      );
    } finally {
      resume();
      await click;
    }
    await expect(page).toHaveURL(
      (url) => url.pathname === exportedPath("/games"),
    );
    await expect(page.locator(".site-progress-loader")).toHaveCount(0);
    await page.unroute(waitForArchive);
    await page.reload();
    await expect(page.locator(".site-progress")).toHaveAttribute(
      "data-progress",
      "0",
    );
    await expect(
      page.locator(".site-progress-loader, .site-progress-impulse"),
    ).toHaveCount(0);
  });
}

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
    ["Миры, в которые можно войти.", "Наши игры", "/games"],
    ["Впервые в Эдеме?", /Начать знакомство/i, "/world"],
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
  await expect(page.locator(`a[href^="${pagesBasePath}/events/"]`)).toHaveCount(
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

test("workshop formats expand exclusively and the team and contact links fit mobile", async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(exportedPath("/about"));

  const formats = page.getByRole("region", { name: "Что мы проводим" });
  const toggles = formats
    .getByRole("button")
    .and(formats.locator("[aria-expanded]"));
  const chamber = page.getByRole("button", {
    name: "Кабинетные ролевые игры",
  });
  const ball = page.getByRole("button", { name: "Ролевые балы" });
  const ballDescription = formats.getByText("Возможность провести вечер", {
    exact: false,
  });
  await expect(toggles).toHaveCount(4);
  await expect(ballDescription).toBeHidden();
  await ball.focus();
  await ball.press("Enter");
  await expect(ball).toBeFocused();
  await expect(ball).toHaveAttribute("aria-expanded", "true");
  await expect(ballDescription).toBeVisible();

  const expandedCard = formats.locator("article").filter({ has: ball });
  const compactCard = formats.locator("article").filter({ has: chamber });
  await expect
    .poll(async () => {
      const [expanded, compact, section] = await Promise.all([
        expandedCard.boundingBox(),
        compactCard.boundingBox(),
        formats.boundingBox(),
      ]);
      return (
        !!expanded &&
        !!compact &&
        !!section &&
        Math.abs(expanded.width - section.width) < 1 &&
        compact.y >= expanded.y + expanded.height
      );
    })
    .toBe(true);

  await chamber.click();
  await expect(ball).toHaveAttribute("aria-expanded", "false");
  await expect(ballDescription).toBeHidden();
  await expect(chamber).toHaveAttribute("aria-expanded", "true");
  await chamber.click();
  await expect(formats.locator('[aria-expanded="true"]')).toHaveCount(0);

  const mobile = await browser.newPage({
    viewport: { width: 320, height: 780 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  await mobile.goto(new URL(exportedPath("/about"), page.url()).href);
  await mobile.getByRole("button", { name: "Ролевые балы" }).tap();
  await expect(
    mobile.getByText("Возможность провести вечер", { exact: false }),
  ).toBeVisible();
  expect(
    await mobile.evaluate(() => document.documentElement.scrollWidth),
  ).toBe(320);

  const team = mobile.getByRole("region", { name: "Наша команда" });
  await expect(team.getByRole("heading", { level: 3 })).toHaveText([
    "Найт",
    "Алина",
    "Лина",
    "Соня",
    "Восход",
  ]);
  await expect(team.getByText("10% МГ", { exact: true })).toBeVisible();
  await expect(
    team.getByRole("link", {
      name: "Саша Пятницкая во ВКонтакте (новая вкладка)",
    }),
  ).toHaveAttribute("href", "https://vk.ru/alyapyatnitskaya");
  await expect(team.getByText("САША ЕК", { exact: true })).toBeVisible();
  await expect(team.getByText("ERROR 403", { exact: true })).toBeVisible();
  await expect(
    team.getByText("Доступ к внешности владельца ограничен."),
  ).toBeVisible();
  await expect(
    team.getByText("Механик · Разработчик приложения и базы данных Эдема"),
  ).toBeVisible();

  const contact = mobile.getByRole("region", { name: "Создадим игру вместе" });
  await expect(
    contact.getByRole("link", { name: "Заказать игру" }),
  ).toHaveAttribute("href", exportedPath("/order"));
  await expect(
    contact.getByRole("link", { name: "Сотрудничество" }),
  ).toHaveAttribute("href", exportedPath("/collaboration"));
  await mobile.close();
});

test("workshop format autoplay advances in order and can be stopped", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.clock.install();
  await page.goto(exportedPath("/about"));

  const formats = page.getByRole("region", { name: "Что мы проводим" });
  const autoplay = formats.getByRole("button", { name: "Автопоказ" });
  const chamber = formats.getByRole("button", {
    name: "Кабинетные ролевые игры",
  });
  const field = formats.getByRole("button", {
    name: "Полигонные ролевые игры",
  });

  await autoplay.scrollIntoViewIfNeeded();
  await expect(autoplay).toHaveAttribute("aria-pressed", "true");
  await page.clock.runFor(800);
  await expect(chamber).toHaveAttribute("aria-expanded", "true");

  await chamber.hover();
  await page.clock.fastForward(5_000);
  await expect(field).toHaveAttribute("aria-expanded", "true");
  await expect(autoplay).toHaveAttribute("aria-pressed", "true");

  await autoplay.click();
  await expect(autoplay).toHaveAttribute("aria-pressed", "false");
  await page.clock.fastForward(10_000);
  await expect(field).toHaveAttribute("aria-expanded", "true");
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

test("the world overview introduces six encyclopedia sections", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(exportedPath("/world"));
  await page.evaluate(() => document.fonts.ready);

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(worldTitle);
  await expect(
    page.getByText(
      "Мир будущего. Высокие технологии. Социальный рейтинг. Религия, ставшая властью.",
      { exact: true },
    ),
  ).toBeVisible();
  const directory = page.getByRole("region", { name: "Разделы энциклопедии" });
  const cards = directory.getByRole("article");
  const expected = [
    ["power", "Государство и общество", "Во славу Адама!", "cathedral-statue"],
    [
      "geography",
      "Мир и география",
      "От небоскрёбов до пустошей",
      "city-to-wasteland",
    ],
    ["history", "История", "Мир после конца света", "wasteland-traveler"],
    [
      "technology",
      "Наука и технологии",
      "Будущее внутри нас",
      "cybernetic-arm",
    ],
    ["corporations", "Корпорации", "Хозяева будущего", "corporate-atrium"],
    [
      "stories",
      "Организации и группировки",
      "Несогласные с порядком",
      "freedom-rally",
    ],
  ] as const;
  await expect(page.getByRole("main").getByRole("article")).toHaveCount(6);
  await expect(cards.getByRole("heading", { level: 3 })).toHaveText(
    expected.map(([, , title]) => title),
  );
  for (const index of [0, 1]) {
    await expect(cards.nth(index).getByRole("heading")).toBeInViewport({
      ratio: 1,
    });
  }

  for (const [index, [slug, category, , artwork]] of expected.entries()) {
    const card = cards.nth(index);
    await expect(card.getByText(category, { exact: true })).toBeVisible();
    const link = card.getByRole("link", {
      name: `Читать статьи — ${category}`,
    });
    await expect(link).toHaveAttribute(
      "href",
      exportedPath(`/world/topics/${slug}`),
    );
    await card.scrollIntoViewIfNeeded();
    const image = card.locator("img");
    await expect(image).toHaveAttribute(
      "src",
      `${pagesBasePath}/images/world/${artwork}.webp`,
    );
    expect(
      await image.evaluate(async (element: HTMLImageElement) => {
        await element.decode();
        return element.naturalWidth;
      }),
    ).toBeGreaterThan(0);
  }
});

test("world cards have prominent artwork and aligned actions across two or one columns", async ({
  page,
}) => {
  await page.goto(exportedPath("/world"));
  const cards = page
    .getByRole("region", { name: "Разделы энциклопедии" })
    .getByRole("article");
  for (const [width, columns] of [
    [1440, 2],
    [1280, 2],
    [768, 2],
    [651, 2],
    [650, 1],
    [390, 1],
    [320, 1],
  ]) {
    await page.setViewportSize({ width, height: 840 });
    await page.evaluate(() => document.fonts.ready);
    const boxes = await cards.evaluateAll((elements) =>
      elements.map((card) => {
        const { x, y, height } = card.getBoundingClientRect();
        const link = card.querySelector("a")!.getBoundingClientRect();
        const artwork = card.querySelector("[data-artwork]")!;
        return {
          x,
          y,
          height,
          actionBottom: link.bottom,
          actionHeight: link.height,
          artworkHeight: artwork.getBoundingClientRect().height,
        };
      }),
    );
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    for (let index = 0; index < boxes.length; index++) {
      const current = boxes[index];
      const row = boxes[index - (index % columns)];
      expect(current.y).toBe(row.y);
      expect(current.height).toBeCloseTo(row.height, 0);
      expect(current.actionBottom).toBeCloseTo(row.actionBottom, 0);
      expect(current.actionHeight).toBeGreaterThanOrEqual(44);
      expect(current.artworkHeight).toBeGreaterThanOrEqual(
        width >= 1280 ? 200 : 120,
      );
      if (index % columns === 0 && index > 0) {
        expect(current.x).toBe(boxes[0].x);
        const previous = boxes[index - columns];
        expect(current.y).toBeGreaterThan(previous.y + previous.height);
      } else if (index % columns > 0) {
        expect(current.x).toBeGreaterThan(boxes[index - 1].x);
      }
    }
  }
});

test("the world article keeps direct section links and related links", async ({
  page,
}) => {
  await page.goto(exportedPath("/world"));
  await page
    .getByRole("link", { name: "Читать статьи — Государство и общество" })
    .click();
  await expect(page).toHaveURL(
    (url) => url.pathname === exportedPath("/world/topics/power"),
  );
  await page
    .getByRole("link", { name: "Социальный рейтинг и нейрочип", exact: true })
    .click();
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
  await page.goto(exportedPath(articlePath) + "#rights");
  await expect(page).toHaveURL((url) => url.hash === "#rights");
  await expect(
    page.getByRole("heading", { name: "Политические права" }),
  ).toBeInViewport();
  await expect(page.getByText("300 баллов", { exact: true })).toBeVisible();
  await expect(page.getByText("700 баллов", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "Государство и власть" }).click();
  await expect(page).toHaveURL(
    (url) => url.pathname === exportedPath("/world") && url.hash === "#power",
  );
  await expect(
    page.getByRole("heading", { name: "Во славу Адама!" }),
  ).toBeVisible();
});

test("world articles link to approved content and planned pages", async ({
  page,
}) => {
  await page.goto(exportedPath("/world"));
  await page
    .getByRole("link", { name: "Читать статьи — Государство и общество" })
    .click();
  const main = page.getByRole("main");
  const article = main.getByRole("link", {
    name: "Государственное устройство Эдема",
  });
  await expect(article).toHaveAttribute(
    "href",
    exportedPath("/world/government"),
  );
  const row = (await article.locator("xpath=ancestor::li").boundingBox())!;
  const heading = (await main
    .getByRole("heading", { level: 1 })
    .boundingBox())!;
  expect(row.width).toBeCloseTo(heading.width, 0);

  const thumbnail = main
    .getByRole("link", { name: "Высший Путь", exact: true })
    .locator("xpath=ancestor::li")
    .locator("img");
  await thumbnail.scrollIntoViewIfNeeded();
  const imageBounds = (await thumbnail.boundingBox())!;
  await page.mouse.click(
    imageBounds.x + imageBounds.width / 2,
    imageBounds.y + imageBounds.height / 2,
  );
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(
    "Высший Путь",
  );
  await expect(
    main.getByRole("heading", { name: "Предание о Звёздном Дитя" }),
  ).toBeVisible();
  await main.getByRole("link", { name: "истории Эдема", exact: true }).click();
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(
    "История мира до Адама",
  );
  await main.getByRole("link", { name: "Высшего Пути", exact: true }).click();
  await expect(page).toHaveURL(
    (url) =>
      url.pathname === exportedPath("/world/higher-path") &&
      url.hash === "#star-child",
  );
  await main
    .getByRole("link", {
      name: "Государственное устройство Эдема",
      exact: true,
    })
    .click();
  await expect(
    main
      .getByRole("region", { name: "Верховный понтифик Адам", exact: true })
      .getByRole("link", { name: "Высший Путь", exact: true }),
  ).toHaveAttribute("href", exportedPath("/world/higher-path"));

  await page.goto(exportedPath("/world/topics/history"));
  await expect(
    main.getByRole("link", { name: "История мира до Адама", exact: true }),
  ).toHaveAttribute("href", exportedPath("/world/history-before-adam"));

  await page.goto(exportedPath("/world/higher-path"));
  await main.getByRole("link", { name: "Хищниками", exact: true }).click();
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(
    "Криминальные организации Эдема",
  );
  await expect(
    main.getByText("Статья в подготовке.", { exact: true }),
  ).toBeVisible();
  await main
    .getByRole("link", { name: "К списку статей", exact: true })
    .click();
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(
    "Организации и группировки",
  );

  await page.goto(exportedPath("/world/topics/daily-life"));
  await expect(
    main.getByRole("link", {
      name: "Социальный рейтинг и нейрочип",
      exact: true,
    }),
  ).toHaveAttribute("href", exportedPath(articlePath));
});

test("encyclopedia articles have permanent routes and topic listings", async ({
  page,
  request,
}) => {
  expect(worldArticleEntries).toHaveLength(33);

  for (const group of worldArticleGroups) {
    const topicPath = exportedPath(`/world/topics/${group.slug}`);
    expect((await page.goto(topicPath))?.status()).toBe(200);
    const main = page.getByRole("main");
    const entries = worldArticleEntries.filter(
      (entry) => entry.topic === group.slug && entry.status !== "merged",
    );
    await expect(main.getByRole("heading", { level: 1 })).toHaveText(
      group.title,
    );
    const links = main.getByRole("list").getByRole("link");
    await expect(links).toHaveCount(entries.length);

    await Promise.all(
      entries.map(async (entry) => {
        const path = exportedPath(`/world/${entry.slug}`);
        const entryLink = main.getByRole("link", {
          name: entry.title,
          exact: true,
        });
        await expect(entryLink).toHaveAttribute("href", path);
        const card = entryLink.locator("xpath=ancestor::li");
        await expect(
          card.getByRole("heading", {
            level: 2,
            name: entry.title,
            exact: true,
          }),
        ).toBeVisible();
        await expect(card.locator("img")).toHaveAttribute(
          "src",
          `${pagesBasePath}/images/world/article-thumbnails/${group.slug}.webp`,
        );
        const description =
          entry.status === "published"
            ? entry.summary.join(" ")
            : "Статья в разработке";
        await expect(entryLink).toHaveAccessibleDescription(description);
        await expect(card.locator("p")).toHaveCount(
          entry.status === "published" ? 2 : 1,
        );

        const response = await request.get(path);
        expect(response.status(), path).toBe(200);
        const html = await response.text();
        expect(html, path).not.toContain("На этой странице");
        expect(html.includes("Статья в подготовке."), path).toBe(
          entry.status === "planned",
        );
        for (const related of entry.related) {
          expect(html, path).toContain(
            `href="${exportedPath(`/world/${related}`)}"`,
          );
        }
      }),
    );
  }
});

test.describe("merged encyclopedia entries", () => {
  test.use({ javaScriptEnabled: false });

  test("the former offences address opens the correct section of the justice article", async ({
    page,
  }) => {
    await page.goto(exportedPath("/world/offences"));
    await expect(page).toHaveURL(
      (url) =>
        url.pathname === exportedPath("/world/justice") &&
        url.hash === "#offences",
    );
    await expect(
      page.getByRole("heading", {
        name: "Правонарушения и взыскания",
        exact: true,
      }),
    ).toBeInViewport();
  });
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
  await expect(desktop.getByRole("link")).toHaveCount(3);
  for (const [name, href] of [
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
  await expect(bottom.getByRole("link")).toHaveCount(2);
  await expect(bottom.locator("svg")).toHaveCount(2);
  for (const [name, href] of [
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
  const routes = [
    ...publicPages.map(([path]) => path),
    ...worldArticleEntries
      .filter(({ status }) => status === "published")
      .map(({ slug }) => `/world/${slug}`),
  ];
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of routes) {
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
    "/events",
    "/events/unpublished",
    "/wiki/unpublished",
    "/world/unregistered-article",
  ]) {
    const response = await request.get(exportedPath(path));
    expect(response.status(), path).toBe(404);
  }
});
