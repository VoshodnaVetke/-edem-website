import { defineConfig } from "@playwright/test";
import deployment from "./apps/site/config/deployment.json";
import { sharedPlaywrightConfig } from "./playwright.shared";

const localOrigin = "http://127.0.0.1:4174";
const publishedUrl = process.env.EDEM_SITE_URL
  ? new URL(process.env.EDEM_SITE_URL)
  : undefined;

if (
  publishedUrl &&
  publishedUrl.pathname.replace(/\/?$/, "/") !== `${deployment.basePath}/`
) {
  throw new Error(`Unexpected Pages URL: ${publishedUrl.href}`);
}

export default defineConfig({
  ...sharedPlaywrightConfig,
  testDir: "./tests/site",
  use: {
    ...sharedPlaywrightConfig.use,
    baseURL: publishedUrl?.origin ?? localOrigin,
  },
  webServer: publishedUrl
    ? undefined
    : {
        command:
          "npm run start -w @edem/site -- --host 127.0.0.1 --port 4174 --strictPort",
        url: `${localOrigin}${deployment.basePath}/`,
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      },
  reporter: "list",
});
