import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import postcss from "postcss";
import { fileURLToPath } from "node:url";
async function files(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? files(join(folder, e.name))
          : e.name.endsWith(".css")
            ? [join(folder, e.name)]
            : [],
      ),
    )
  ).flat();
}
const owners = new Map(),
  errors = [];
for (const file of await files(
  fileURLToPath(new URL("../packages/ui/src/styles", import.meta.url)),
)) {
  const css = postcss.parse(await readFile(file, "utf8"), { from: file });
  css.walkDecls((declaration) => {
    if (declaration.important)
      errors.push(
        `${file}:${declaration.source.start.line}: forbidden priority flag`,
      );
    const rule = declaration.parent;
    if (rule.type !== "rule") return;
    const context = [];
    for (let p = rule.parent; p; p = p.parent)
      if (p.type === "atrule") context.unshift(`@${p.name} ${p.params}`);
    for (const selector of rule.selectors) {
      const key = [...context, selector.trim(), declaration.prop].join("|");
      const location = `${file}:${declaration.source.start.line}`;
      if (owners.has(key))
        errors.push(
          `${location}: duplicate ${selector} / ${declaration.prop}; first at ${owners.get(key)}`,
        );
      else owners.set(key, location);
    }
  });
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    "CSS policy passed: no priority flags or repeated selector/property rules in the same context.",
  );
