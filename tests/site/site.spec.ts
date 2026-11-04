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
