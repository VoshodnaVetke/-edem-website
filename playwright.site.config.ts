import { defineConfig } from "@playwright/test";
import { sharedPlaywrightConfig } from "./playwright.shared";

export default defineConfig({
  ...sharedPlaywrightConfig,
  testDir: "./tests/site",
  use: {
    ...sharedPlaywrightConfig.use,
    baseURL: "http://127.0.0.1:4174",
  },
  webServer: {
    command: "npm run start -w @edem/site -- --hostname 127.0.0.1 --port 4174",
    url: "http://127.0.0.1:4174",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  reporter: "list",
});
