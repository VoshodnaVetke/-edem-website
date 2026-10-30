/* Convert the three selected complex frame geometries into controlled hand-drawn strokes.
   Preserves the existing exact SVG paths and content padding. */
(function () {
  function renderRoughFrames() {
    if (!window.rough) return;
    document.querySelectorAll(".applied-frame").forEach((svg, index) => {
      if (svg.dataset.roughDone === "1") return;
      const paths = [...svg.querySelectorAll("path")];
      const drawer = rough.svg(svg);
      paths.forEach((original, j) => {
        if (original.classList.contains("fill")) return;
        const pathData = original.getAttribute("d");
        if (!pathData) return;
        const kind = original.classList.contains("detail2")
          ? "detail2"
          : original.classList.contains("detail")
            ? "detail"
            : original.classList.contains("inner")
              ? "inner"
              : "border";
        const stroke =
          kind === "detail"
            ? "#25F4FF"
            : kind === "detail2"
              ? "#BC5CFF"
              : "#FFFFFF";
        const width = kind === "border" ? 2.15 : kind === "inner" ? 1.1 : 1.9;
        const roughPath = drawer.path(pathData, {
          stroke,
          strokeWidth: width,
          roughness: kind === "border" ? 1.55 : kind === "inner" ? 0.9 : 1.15,
          bowing: kind === "border" ? 1.5 : 1.0,
          maxRandomnessOffset: kind === "border" ? 2.5 : 1.75,
          disableMultiStroke: kind === "inner",
          seed: 1410 + index * 31 + j,
          fill: undefined,
        });
        roughPath.classList.add("hand-drawn-path", "rough-kind-" + kind);
        if (kind === "inner") roughPath.setAttribute("opacity", "0.4");
        original.replaceWith(roughPath);
      });
      svg.dataset.roughDone = "1";
    });
  }
  if (document.readyState === "complete") renderRoughFrames();
  else window.addEventListener("load", renderRoughFrames, { once: true });
})();
