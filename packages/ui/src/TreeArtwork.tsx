import type { CSSProperties } from "react";
import { treeUrl } from "./assets/tree-url";

export function TreeArtwork({ layered = false }: { layered?: boolean }) {
  const image = <img className="edem-tree__artwork" src={treeUrl} alt="" />;

  return layered ? (
    <div
      className="edem-tree__layers"
      style={{ "--edem-tree-mask": `url("${treeUrl}")` } as CSSProperties}
    >
      {image}
    </div>
  ) : (
    image
  );
}
