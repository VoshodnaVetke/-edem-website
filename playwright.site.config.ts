import { defineConfig } from "@playwright/test";
import deployment from "./apps/site/config/deployment.json";
import { sharedPlaywrightConfig } from "./playwright.shared";

const origin = "http://127.0.0.1:4174";

export default defineConfig({
  ...sharedPlaywrightConfig,
  testDir: "./tests/site",
  use: {
    ...sharedPlaywrightConfig.use,
    baseURL: origin,
  },
  webServer: {
    command:
      "npm run start -w @edem/site -- --host 127.0.0.1 --port 4174 --strictPort",
    url: `${origin}${deployment.basePath}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  reporter: "list",
});
