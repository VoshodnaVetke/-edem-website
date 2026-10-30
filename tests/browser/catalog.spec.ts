import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) =>
    route.request().url().startsWith("http://127.0.0.1:4173")
      ? route.continue()
      : route.abort(),
  );
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
});
test("contains 37 samples, 33 approved and 4 preliminary; filters and search work", async ({
  page,
}) => {
  await expect(page.locator("[data-sample]")).toHaveCount(37);
  await page
    .getByRole("button", { name: "Предварительные", exact: true })
    .click();
  await expect(page.locator("[data-sample]")).toHaveCount(4);
  await page.getByRole("button", { name: "Утверждённые", exact: true }).click();
  await expect(page.locator("[data-sample]")).toHaveCount(33);
  await page.getByRole("button", { name: "Все", exact: true }).click();
  await page
    .getByRole("searchbox", { name: "Найти компонент" })
    .fill("Карточка-ссылка");
  await expect(page.locator("[data-sample]")).toHaveCount(1);
});
test("loads local Cyrillic fonts and has no browser errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      document.fonts.check('450 16px "Onest Variable"', "Текст"),
    ),
  ).toBe(true);
  expect(
    await page.evaluate(() =>
      document.fonts.check('700 20px "Tektur Variable"', "Заголовок"),
    ),
  ).toBe(true);
  for (const font of [
    '450 16px "Onest Variable"',
    '700 20px "Tektur Variable"',
  ]) {
    expect(
      await page.evaluate(
        async (value) => (await document.fonts.load(value, "Кириллица")).length,
        font,
      ),
    ).toBeGreaterThan(0);
  }
  expect(errors).toEqual([]);
});
test("buttons distinguish persistent selection, hover and keyboard focus", async ({
  page,
}) => {
  const chip = page.locator("#chips .edem-chip");
  await chip.click();
  await page.mouse.move(0, 0);
  await expect(chip).toHaveAttribute("aria-pressed", "true");
  await expect(chip.locator(".edem-sketch-surface")).toHaveCSS(
    "fill",
    "rgb(37, 244, 255)",
  );
  await chip.hover();
  await expect(chip.locator(".edem-sketch-surface")).toHaveCSS(
    "fill",
    "rgb(188, 92, 255)",
  );
  await page.mouse.move(0, 0);
  await chip.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(chip.locator(".edem-sketch-stroke").first()).toHaveCSS(
    "stroke",
    "rgb(37, 244, 255)",
  );
  await expect(chip).toHaveCSS("outline-style", "none");
});
test("link-card lift and outline never alter its SVG fill", async ({
  page,
}) => {
  const link = page.locator("#link .edem-link-card");
  const fill = link.locator(".edem-frame__fill");
  const color = await fill.evaluate((e) => getComputedStyle(e).fill);
  await link.hover();
  await expect(link).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -4)");
  await expect(link.locator(".edem-frame__border")).toHaveCSS(
    "color",
    "rgb(37, 244, 255)",
  );
  await expect(fill).toHaveCSS("fill", color);
});
test("field errors are visible, associated with the input and clear after correction", async ({
  page,
}) => {
  const field = page.locator("#field");
  await field.getByRole("button", { name: "Проверить" }).click();
  const input = field.getByRole("textbox", { name: "Название" });
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(input).toHaveAccessibleDescription(/Введите название/);
  await input.fill("Эдем");
  await field.getByRole("button", { name: "Проверить" }).click();
  await expect(input).not.toHaveAttribute("aria-invalid", "true");
  await expect(field.getByText("Значение принято")).toBeVisible();
});
test("native dialogs trap focus, close with Escape, restore focus, and search host data", async ({
  page,
}) => {
  const nav = page.locator("#navigation");
  const menu = nav.getByRole("button", { name: "Меню", exact: true });
  await menu.click();
  const dialog = page.getByRole("dialog", { name: "Меню", exact: true });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(menu).toBeFocused();
  const search = nav.getByRole("button", { name: "Поиск", exact: true });
  await search.click();
  await page
    .getByRole("searchbox", { name: "Поисковый запрос" })
    .fill("каталог");
  await expect(
    page
      .getByRole("dialog", { name: "Поиск" })
      .getByRole("link", { name: "Каталог", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(search).toBeFocused();
});
test("all breakpoint boundaries fit without horizontal overflow", async ({
  page,
}) => {
  for (const width of [
    320, 360, 390, 430, 650, 651, 768, 1023, 1024, 1280, 1440,
  ]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}px`,
    ).toBe(true);
    expect(await page.locator("[data-sample]").count()).toBe(37);
  }
});
test("reduced motion disables every optional CSS animation and link lift", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#link .edem-link-card").hover();
  await expect(page.locator("#link .edem-link-card")).toHaveCSS(
    "transform",
    "none",
  );
  expect(
    await page.evaluate(() =>
      [
        ...document.querySelectorAll(
          ".edem-loader *, .edem-glitch, .edem-card-effects *, .edem-tree *",
        ),
      ].some((e) =>
        ["", "::before", "::after"].some(
          (p) => getComputedStyle(e, p || null).animationName !== "none",
        ),
      ),
    ),
  ).toBe(false);
});
test("touch does not activate desktop hover or lift", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  const link = page.locator("#link .edem-link-card");
  await link.scrollIntoViewIfNeeded();
  await expect(link).toHaveCSS("transform", "none");
  expect(await page.evaluate(() => matchMedia("(hover: none)").matches)).toBe(
    true,
  );
  await page.locator("#chips .edem-chip").tap();
  await expect(
    page.locator("#chips .edem-chip .edem-sketch-surface"),
  ).toHaveCSS("fill", "rgb(37, 244, 255)");
  await context.close();
});
test("catalog and open search meet automated WCAG A/AA checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  let scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page
    .locator("#navigation")
    .getByRole("button", { name: "Поиск", exact: true })
    .click();
  scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
});
test("optional WebGL renderer mounts locally and releases its canvas on switch back", async ({
  page,
}) => {
  const sample = page.locator("#tree");
  await sample.getByRole("button", { name: "WebGL", exact: true }).click();
  await expect(sample.locator("canvas")).toHaveCount(1, { timeout: 15000 });
  await sample.getByRole("button", { name: "WebGL", exact: true }).click();
  await expect(sample.locator("canvas")).toHaveCount(0);
  await expect(sample.locator(".edem-tree__fallback")).toBeVisible();
});
test("large text and long content remain readable without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "32px";
    const text = document.querySelector("#card-1 .edem-terminal__body p");
    if (text) text.textContent = "Длинноесловобезпробелов".repeat(30);
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("idle card effects stop after the card leaves the viewport", async ({
  page,
}) => {
  const content = page.locator("#card-1 .edem-card-content");
  await content.scrollIntoViewIfNeeded();
  await expect(content).toHaveAttribute("data-active", "true");
  await expect(content.locator(".edem-card-effects__idle")).toHaveCSS(
    "animation-name",
    "edem-idle",
  );
  await page.locator("#navigation").scrollIntoViewIfNeeded();
  await expect(content).toHaveAttribute("data-active", "false");
  await expect(content.locator(".edem-card-effects__idle")).toHaveCSS(
    "animation-name",
    "none",
  );
});
test("the field changes its existing hand-drawn stroke without adding a focus frame", async ({
  page,
}) => {
  const field = page.locator("#field .edem-field__control"),
    input = field.locator("input");
  const paths = await field
    .locator(".edem-sketch-stroke")
    .evaluateAll((paths) => paths.map((p) => p.getAttribute("d")));
  await input.focus();
  await expect(input).toHaveCSS("outline-style", "none");
  await expect(input).toHaveCSS("box-shadow", "none");
  await expect(field.locator(".edem-sketch-stroke").first()).toHaveCSS(
    "stroke",
    "rgb(37, 244, 255)",
  );
  expect(
    await field
      .locator(".edem-sketch-stroke")
      .evaluateAll((paths) => paths.map((p) => p.getAttribute("d"))),
  ).toEqual(paths);
  await expect(field.locator("svg")).toHaveCount(1);
});
test("white and cyan rail strokes overlay the same geometry and the underpaint bleeds", async ({
  page,
}) => {
  const rail = page.locator("#rail .edem-rail");
  const white = await rail
    .locator(
      ".edem-rail__sketch .edem-sketch-stroke:not(.edem-sketch-stroke--accent)",
    )
    .evaluateAll((paths) => paths.map((p) => p.getAttribute("d")));
  expect(
    await rail
      .locator(".edem-sketch-stroke--accent")
      .evaluateAll((paths) => paths.map((p) => p.getAttribute("d"))),
  ).toEqual(white);
  expect(
    await rail
      .locator(".edem-rail__surface .edem-sketch-surface")
      .evaluate((e) => (e as unknown as SVGGraphicsElement).getBBox().x),
  ).toBeLessThan(0);
  await expect(rail).toHaveCSS("clip-path", "none");
});
test("the supplied tree is rendered as a single unchanged SVG asset", async ({
  page,
}) => {
  const artwork = page.locator("#tree .edem-tree__artwork");
  await expect(artwork).toHaveCount(1);
  await expect(artwork).toHaveJSProperty("tagName", "IMG");
  expect(
    await artwork.evaluate((e) => (e as HTMLImageElement).naturalWidth),
  ).toBe(2110);
  expect(
    await artwork.evaluate((e) => (e as HTMLImageElement).naturalHeight),
  ).toBe(1555);
});
test("DATA LOSS restores packet transmission with a moving head and the lower scale", async ({
  page,
}) => {
  const progress = page.locator("#progress").getByRole("progressbar");
  await expect(progress).toHaveAttribute("aria-valuenow", "0");
  await page
    .locator("#progress")
    .getByRole("button", { name: "ПЕРЕДАТЬ СИГНАЛ ↗" })
    .click();
  await expect(progress).toHaveAttribute("data-active", "true");
  await expect(progress.locator(".edem-progress__head")).toHaveCSS(
    "height",
    "17px",
  );
  await expect(progress.locator(".edem-progress__hud")).toBeVisible();
  await expect(progress).toHaveAttribute("aria-valuenow", "100", {
    timeout: 7000,
  });
  await expect(progress).toHaveAttribute("data-active", "false");
});
