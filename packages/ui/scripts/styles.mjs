import { build } from "esbuild";
await build({
  entryPoints: {
    styles: "src/styles/index.css",
    fonts: "src/styles/fonts.css",
    tokens: "src/styles/tokens.css",
  },
  outdir: "dist",
  bundle: true,
  loader: { ".woff2": "file", ".woff": "file" },
  assetNames: "assets/[name]-[hash]",
  logLevel: "info",
});

// Self-hosted font binaries are redistributed with their OFL licenses.
import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const require = createRequire(import.meta.url);
await mkdir("dist/licenses", { recursive: true });
for (const name of [
  "@fontsource-variable/onest",
  "@fontsource-variable/tektur",
  "@fontsource/anonymous-pro",
]) {
  const source = join(
    dirname(require.resolve(`${name}/package.json`)),
    "LICENSE",
  );
  await copyFile(source, `dist/licenses/${name.split("/").at(-1)}.txt`);
}
