import { treePaths } from "./tree-geometry";
export const treeSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2110 1555"><g opacity=".7">' +
  treePaths.map((d) => `<path d="${d}" fill="white"/>`).join("") +
  "</g></svg>";
