// Canonical outlines shared by the stroke, underpaint and effect masks.
const outlines = {
  system: "M7 7H433V239L393 283H7Z",
  double: "M7 17H395L433 55V284H39L7 245Z",
  asym: "M7 39L39 7H294L309 18H432V228L398 282H7Z",
} as const;
function outlineLayers(d: string) {
  return [
    { kind: "fill", d },
    { kind: "border", d },
  ] as const;
}
export const frames = {
  system: [
    ...outlineLayers(outlines.system),
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
    ...outlineLayers(outlines.double),
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
    ...outlineLayers(outlines.asym),
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
export function outlinePoints(path: string): [number, number][] {
  const tokens = path.match(/[MLHVZ]|-?\d+(?:\.\d+)?/g) || [];
  const points: [number, number][] = [];
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
    points.push([x, y]);
  }
  return points;
}
function outlinePolygon(path: string) {
  return `polygon(${outlinePoints(path)
    .map(([x, y]) => `${(x / 440) * 100}% ${(y / 290) * 100}%`)
    .join(",")})`;
}
export const frameClips = Object.fromEntries(
  Object.entries(frames).map(([name, paths]) => [
    name,
    outlinePolygon(paths.find((p) => p.kind === "fill")!.d),
  ]),
) as Record<FrameVariant, string>;
