(function () {
  if (window.rough && typeof window.rough.svg === "function") {
    window.__edemRoughMode = "roughjs";
    return;
  }
  const NS = "http://www.w3.org/2000/svg";
  const create = (tag, attrs) => {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, String(v)));
    return el;
  };
  const make = (d, o = {}) => {
    const g = create("g", {}),
      color = o.stroke || "#FFFFFF",
      width = o.strokeWidth || 1.5;
    const n = o.disableMultiStroke ? 1 : 2;
    // Same original geometric path, traced with tiny hand-ink deviations.
    // Only a resilience fallback; genuine Rough.js wins whenever available.
    const reference = create("path", { d, fill: "none" });
    let length = 0;
    try {
      length = reference.getTotalLength();
    } catch (e) {}
    const seed = Number.isFinite(o.seed) ? o.seed : 87;
    const noise = (index, layer) => {
      let z = (seed * 16777619 + index * 374761393 + layer * 668265263) >>> 0;
      z = ((z ^ (z >>> 13)) * 1274126177) >>> 0;
      return ((z ^ (z >>> 16)) >>> 0) / 4294967295 - 0.5;
    };
    const traced = (layer) => {
      if (length < 5) return d;
      const count = Math.max(3, Math.min(700, Math.ceil(length / 8)));
      let result = "";
      const amp = (o.roughness ?? 1.1) * 0.72;
      for (let i = 0; i <= count; i++) {
        const L = (length * i) / count;
        const point = reference.getPointAtLength(L);
        const before = reference.getPointAtLength(Math.max(0, L - 1.8));
        const after = reference.getPointAtLength(Math.min(length, L + 1.8));
        const dx = after.x - before.x,
          dy = after.y - before.y;
        const mag = Math.hypot(dx, dy) || 1;
        const endFade = i === 0 || i === count ? 0 : 1;
        const offset = noise(i, layer) * amp * endFade;
        const x = (
          point.x -
          (dy / mag) * offset +
          (layer ? 0.27 : -0.17)
        ).toFixed(2);
        const y = (
          point.y +
          (dx / mag) * offset +
          (layer ? -0.22 : 0.13)
        ).toFixed(2);
        result += (i === 0 ? "M" : " L") + x + " " + y;
      }
      return result;
    };
    if (o.fill && o.fill !== "none")
      g.appendChild(create("path", { d, fill: o.fill, stroke: "none" }));
    for (let i = 0; i < n; i++) {
      const path = create("path", {
        d: traced(i),
        fill: "none",
        stroke: color,
        "stroke-width": i ? width * 0.73 : width,
        "stroke-linejoin": "round",
        "stroke-linecap": "round",
        opacity: i ? 0.45 : 1,
      });
      g.appendChild(path);
    }
    return g;
  };
  window.rough = {
    svg: () => ({
      path: (d, o) => make(d, o),
      line: (x1, y1, x2, y2, o) => make(`M ${x1} ${y1} L ${x2} ${y2}`, o),
      rectangle: (x, y, w, h, o) =>
        make(
          `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`,
          o,
        ),
    }),
  };
  window.__edemRoughMode = "built-in vector fallback";
})();
