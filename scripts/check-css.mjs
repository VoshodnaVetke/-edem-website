import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import postcss from "postcss";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const ignoredDirectories = new Set([
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  "coverage",
]);

async function cssFiles(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map((entry) => {
      const path = join(folder, entry.name);
      if (entry.isDirectory()) {
        return ignoredDirectories.has(entry.name) ? [] : cssFiles(path);
      }
      return entry.isFile() && entry.name.endsWith(".css") ? [path] : [];
    }),
  );
  return paths.flat().sort();
}

const uiFiles = await cssFiles(join(root, "packages/ui/src/styles"));
const catalogFiles = await cssFiles(join(root, "apps/catalog"));
const siteFiles = await cssFiles(join(root, "apps/site"));
const allFiles = [...new Set([...uiFiles, ...catalogFiles, ...siteFiles])];
const stylesheets = new Map();
const errors = new Set();

for (const file of allFiles) {
  const css = postcss.parse(await readFile(file, "utf8"), { from: file });
  stylesheets.set(file, css);

  css.walkDecls((declaration) => {
    const location = `${file}:${declaration.source.start.line}`;
    if (declaration.important) {
      errors.add(`${location}: forbidden priority flag`);
    }

    const rule = declaration.parent;
    if (
      !uiFiles.includes(file) &&
      rule.type === "rule" &&
      rule.selectors.some((selector) => selector.trim() === ":root") &&
      declaration.prop.startsWith("--edem-") &&
      !declaration.prop.startsWith("--edem-site-")
    ) {
      errors.add(
        `${location}: application must not redefine a shared UI token at :root`,
      );
    }
  });
}

function checkDuplicates(scope, files) {
  const owners = new Map();
  for (const file of files) {
    stylesheets.get(file).walkDecls((declaration) => {
      const rule = declaration.parent;
      if (rule.type !== "rule") return;

      const context = [];
      for (let parent = rule.parent; parent; parent = parent.parent) {
        if (parent.type === "atrule") {
          context.unshift(`@${parent.name} ${parent.params}`);
        }
      }

      for (const selector of rule.selectors) {
        const key = [...context, selector.trim(), declaration.prop].join("|");
        const location = `${file}:${declaration.source.start.line}`;
        if (owners.has(key)) {
          errors.add(
            `${scope}: ${location}: duplicate ${selector} / ${declaration.prop}; first at ${owners.get(key)}`,
          );
        } else {
          owners.set(key, location);
        }
      }
    });
  }
}

// Shared UI CSS is loaded into both apps. Global app styles are checked in
// their actual cascade, while CSS Modules stay isolated from one another.
const globalCss = (files) =>
  files.filter((file) => !file.endsWith(".module.css"));
checkDuplicates("ui", uiFiles);
checkDuplicates("catalog", [...uiFiles, ...globalCss(catalogFiles)]);
checkDuplicates("site", [...uiFiles, ...globalCss(siteFiles)]);
for (const file of [...catalogFiles, ...siteFiles]) {
  if (file.endsWith(".module.css")) {
    checkDuplicates(file, [file]);
  }
}

if (errors.size > 0) {
  console.error([...errors].join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `CSS policy passed for ${allFiles.length} source files: no priority flags, conflicting global tokens or duplicate declarations.`,
  );
}
