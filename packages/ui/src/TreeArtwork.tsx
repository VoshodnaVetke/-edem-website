import { treePaths } from "./tree-geometry";
export function TreeArtwork() {
  return (
    <svg className="edem-tree__artwork" viewBox="0 0 2110 1555" fill="none">
      <g opacity=".7">
        {treePaths.map((d, i) => (
          <path key={i} d={d} fill="currentColor" />
        ))}
      </g>
    </svg>
  );
}
