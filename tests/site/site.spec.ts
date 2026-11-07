import { expect, test } from "@playwright/test";

test("homepage uses shared typography, colors, header and footer", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Эдем | Мастерская ролевых игр");
  await expect(
    page.getByRole("heading", { name: "Мастерская группа Эдема" }),
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
});

test("real site shell fits desktop and mobile widths", async ({ page }) => {
  await page.goto("/");
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
  await page.goto("/");
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
  await page.goto("/");
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
  await page.goto("/");
  await expect(
    page
      .getByRole("navigation", { name: "Навигация в подвале" })
      .getByRole("link", { name: "Главная" }),
  ).toHaveAttribute("href", "/");
  await expect(page.getByRole("button", { name: "Поиск" })).toHaveCount(0);
  await expect(page.locator('a[href^="/demo/"]')).toHaveCount(0);
});

test("removed demonstration routes return 404", async ({ page }) => {
  for (const path of ["/demo/shell", "/demo/shell/preview"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
  }
});

test("mobile bottom navigation appears immediately and stays pinned", async ({
  page,
}) => {
  for (const width of [320, 360, 390, 430]) {
    await page.setViewportSize({ width, height: 740 });
    await page.goto("/");

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
  await page.goto("/");

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
  await expect(home).toHaveAttribute("href", "/");

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
    ["/", "Мастерская группа Эдема"],
    ["/events", "Афиша игр"],
    ["/games", "Наши игры"],
    ["/world", "Вселенная «Эдем»"],
    ["/wiki", "Энциклопедия"],
    ["/order", "Заказать игру"],
    ["/collaboration", "Сотрудничество"],
    ["/about", "О мастерской группе"],
  ] as const;

  for (const [path, title] of routes) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("main#main-content")).toHaveCount(1);
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.locator("header.edem-navigation")).toHaveCount(1);
  }

  await page.goto("/order");
  await expect(page.locator("form")).toHaveCount(0);
  await page.goto("/collaboration");
  await expect(page.locator("form")).toHaveCount(0);
});

test("desktop and mobile navigation use working route destinations", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

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
      href,
    );
  }

  await page.getByRole("button", { name: "Меню" }).click();
  const menu = page.getByRole("dialog", { name: "Меню" });
  await expect(menu.getByRole("link", { name: "Заказать игру" })).toHaveAttribute(
    "href",
    "/order",
  );
  await expect(
    menu.getByRole("link", { name: "Сотрудничество" }),
  ).toHaveAttribute("href", "/collaboration");
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
    expect(new URL(page.url()).pathname).toBe(href);
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
      await page.goto(path);
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
  page,
}) => {
  for (const path of [
    "/account",
    "/team",
    "/contacts",
    "/games/unpublished",
    "/events/unpublished",
    "/wiki/unpublished",
  ]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(404);
  }
});
