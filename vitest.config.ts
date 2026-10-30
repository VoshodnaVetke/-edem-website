import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
export default defineConfig({
  resolve: {
    alias: {
      "@edem/ui": fileURLToPath(
        new URL("./packages/ui/src/index.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/unit/setup.ts"],
    maxWorkers: 2,
  },
});
