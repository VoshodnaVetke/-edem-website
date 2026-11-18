import { expect, test } from "@playwright/test";

const pagesBasePath = "/-edem-website";

function exportedPath(route: string) {
  return route === "/" ? pagesBasePath + "/" : pagesBasePath + route + "/";
}

test("homepage uses shared typography, colors, header and footer", async ({
  page,
}) => {
  const stylesheets: string[] = [];
  const fonts: string[] = [];
  page.on("response", (response) => {
    if (!response.ok()) return;
    const path = new URL(response.url()).pathname;
    const type = response.request().resourceType();
    if (type === "stylesheet") stylesheets.push(path);
    if (type === "font") fonts.push(path);
  });

  await page.goto(exportedPath("/"));
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

  for (const assets of [stylesheets, fonts]) {
    expect(assets.length).toBeGreaterThan(0);
    expect(
      assets.every((path) => path.startsWith(`${pagesBasePath}/_next/`)),
    ).toBe(true);
  }
  const artwork = page.locator(".edem-tree__artwork");
  await expect(artwork).toBeVisible();
  expect(
    await artwork.evaluate(async (image: HTMLImageElement) => {
      await image.decode();
      return image.naturalWidth;
    }),
  ).toBeGreaterThan(0);
});

test("homepage sections lead to the published routes", async ({
  page,
  request,
}) => {
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

test("step 5 Figma route shells render actual public pages", async ({
  page,
}) => {
  const routes = [
    ["/", "Миры, в которые можно войти."],
    ["/events", "Афиша игр"],
    ["/games", "Наши игры"],
    ["/world", "Вселенная «Эдем»"],
    ["/wiki", "Энциклопедия"],
    ["/order", "Заказать игру"],
    ["/collaboration", "Сотрудничество"],
    ["/about", "О мастерской группе"],
  ] as const;

  for (const [path, title] of routes) {
    const response = await page.goto(exportedPath(path));
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.locator("header.edem-navigation")).toHaveCount(1);
  }

  await page.goto(exportedPath("/order"));
  await expect(page.locator("form")).toHaveCount(0);
  await page.goto(exportedPath("/collaboration"));
  await expect(page.locator("form")).toHaveCount(0);
});

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
    ["Энциклопедия", "/wiki"],
  ]) {
    await bottom.getByRole("link", { name }).click();
    expect(new URL(page.url()).pathname).toBe(exportedPath(href));
    await expect(bottom.getByRole("link", { name })).toHaveAttribute(
      "aria-current",
      "page",
    );
  }
});

test("step 5 routes remain responsive without horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/events",
      "/games",
      "/world",
      "/wiki",
      "/order",
      "/collaboration",
      "/about",
    ]) {
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

test("unimplemented private routes and details return 404", async ({
  request,
}) => {
  for (const path of [
    "/account",
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
