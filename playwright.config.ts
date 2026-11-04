import { defineConfig } from "@playwright/test";
import { sharedPlaywrightConfig } from "./playwright.shared";

export default defineConfig({
  ...sharedPlaywrightConfig,
  testDir: "./tests/browser",
  use: {
    ...sharedPlaywrightConfig.use,
    baseURL: "http://127.0.0.1:4173",
  },
  webServer: {
    command:
      "npm run preview -w @edem/catalog -- --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
  reporter: [["list"], ["html", { open: "never" }]],
});
