import deployment from "./config/deployment.json" with { type: "json" };

export default {
  appType: "mpa",
  base: `${deployment.basePath}/`,
  build: { outDir: "out" },
};
