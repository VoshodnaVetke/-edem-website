import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
const source = (path: string) =>
  fileURLToPath(new URL(`../../packages/ui/src/${path}`, import.meta.url));
export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias:
      command === "serve"
        ? [
            { find: /^@edem\/ui$/, replacement: source("index.ts") },
            {
              find: "@edem/ui/styles.css",
              replacement: source("styles/index.css"),
            },
            {
              find: "@edem/ui/fonts.css",
              replacement: source("styles/fonts.css"),
            },
          ]
        : [],
  },
}));
