import { expect, test } from "@playwright/test";

test("site loads shared typography, colors and UI components", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Эдем | Мастерская ролевых игр");
  await expect(
    page.getByRole("heading", { name: "Мастерская группа Эдема" }),
  ).toBeVisible();
  await expect(page.locator(".edem-terminal")).toHaveCount(1);

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

test("layout fits responsive viewports without horizontal scrolling", async ({
  page,
}) => {
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

test("skip link reaches the main landmark using only the keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const skip = page.getByRole("link", { name: "Перейти к содержимому" });
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("the approved Navigation C switches between desktop and mobile patterns", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  await expect(page.locator("header.edem-navigation")).toHaveCount(1);
  await expect(page.locator("footer")).toHaveCount(1);
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
  await expect(
    dialog.getByRole("link", { name: "Оболочка сайта" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Меню" })).toBeFocused();
});

test("navigation search only returns implemented pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Поиск" }).click();
  const dialog = page.getByRole("dialog", { name: "Поиск" });
  await expect(dialog).toBeVisible();
  await dialog
    .getByRole("searchbox", { name: "Поисковый запрос" })
    .fill("оболочка");
  await expect(
    dialog.getByRole("link", { name: "Оболочка сайта" }),
  ).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Главная" })).toHaveCount(0);
});

test("demonstration shows real 960px and 390px shell previews", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/demo/shell");

  const desktop = page.locator('iframe[title*="десктопе"]');
  const mobile = page.locator('iframe[title*="мобильной навигации"]');
  await expect(desktop).toHaveCount(1);
  await expect(mobile).toHaveCount(1);

  await desktop.scrollIntoViewIfNeeded();
  await expect(
    page.frameLocator('iframe[title*="десктопе"]').getByRole("heading", {
      name: "Структура страницы",
    }),
  ).toBeVisible();

  await mobile.scrollIntoViewIfNeeded();
  await expect(
    page
      .frameLocator('iframe[title*="мобильной навигации"]')
      .getByRole("navigation", { name: "Быстрая навигация" }),
  ).toBeVisible();

  const widths = await page
    .locator("iframe")
    .evaluateAll((elements) =>
      elements.map(
        (element) => (element as HTMLIFrameElement).contentWindow?.innerWidth,
      ),
    );
  expect(widths).toEqual([960, 390]);
  await page.screenshot({
    path: "test-results/site-shell-overview.png",
    fullPage: true,
  });
});

test("shell preview can be examined at full desktop and mobile widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/demo/shell/preview");
  await expect(page.locator("header.edem-navigation")).toBeVisible();
  await expect(page.locator("footer")).toBeVisible();
  await page.screenshot({
    path: "test-results/site-shell-desktop.png",
    fullPage: true,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("navigation", { name: "Быстрая навигация" }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/site-shell-mobile.png",
    fullPage: true,
  });
});
