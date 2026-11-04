import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

export const sharedPlaywrightConfig = defineConfig({
  fullyParallel: false,
  workers: 1,
  use: {
    viewport: { width: 1280, height: 900 },
    launchOptions: {
      executablePath:
        process.env.CHROMIUM_PATH ||
        (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
      args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
    },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
