// Exact viewBox 440 × 290 geometry from Component Atlas v10.4.
export const frames = {
  system: [
    {
      kind: "fill",
      d: "M7 7H433V239L393 283H7Z",
    },
    {
      kind: "border",
      d: "M7 7H433V239L393 283H7Z",
    },
    {
      kind: "detail",
      d: "M7 7H100M433 188V239L393 283H322",
    },
    {
      kind: "detail2",
      d: "M18 18H83M18 269H124",
    },
  ],
  double: [
    {
      kind: "fill",
      d: "M7 17H395L433 55V284H39L7 245Z",
    },
    {
      kind: "border",
      d: "M7 17H395L433 55V284H39L7 245Z",
    },
    {
      kind: "detail",
      d: "M7 17H139M395 17L433 55M433 242V284H358",
    },
    {
      kind: "detail2",
      d: "M18 56V193L37 217M56 272H115",
    },
    {
      kind: "inner",
      d: "M20 29H374M421 67V234",
    },
  ],
  asym: [
    {
      kind: "fill",
      d: "M7 39L39 7H294L309 18H432V228L398 282H7Z",
    },
    {
      kind: "border",
      d: "M7 39L39 7H294L309 18H432V228L398 282H7Z",
    },
    {
      kind: "detail",
      d: "M39 7H151M309 18H397M432 197V228L398 282H328",
    },
    {
      kind: "detail2",
      d: "M18 54V107M7 249V282H84",
    },
  ],
} as const;
export type FrameVariant = keyof typeof frames;

/** All three approved outlines use straight M/L/H/V segments. Reuse their points
 * for the HTML effect mask so light never leaks into the cut-out corners. */
function outlinePolygon(path: string) {
  const tokens = path.match(/[MLHVZ]|-?\d+(?:\.\d+)?/g) || [];
  const points: string[] = [];
  let x = 0,
    y = 0,
    command = "",
    index = 0;
  while (index < tokens.length) {
    if (/^[MLHVZ]$/.test(tokens[index])) command = tokens[index++];
    if (command === "Z") break;
    if (command === "M" || command === "L") {
      x = Number(tokens[index++]);
      y = Number(tokens[index++]);
    } else if (command === "H") x = Number(tokens[index++]);
    else if (command === "V") y = Number(tokens[index++]);
    points.push(`${(x / 440) * 100}% ${(y / 290) * 100}%`);
  }
  return `polygon(${points.join(",")})`;
}
export const frameClips = Object.fromEntries(
  Object.entries(frames).map(([name, paths]) => [
    name,
    outlinePolygon(paths.find((p) => p.kind === "fill")!.d),
  ]),
) as Record<FrameVariant, string>;
