import treeImage from "./tree.svg";

// Next.js supplies metadata for static image imports. Other builds use a URL.
export const treeUrl =
  typeof treeImage === "string" ? treeImage : treeImage.src;
