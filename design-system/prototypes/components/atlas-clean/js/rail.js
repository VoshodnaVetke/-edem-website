/* Vertical accents drawn with Rough.js, using the same controlled hand-drawn character as the frames. */
(function () {
  function renderRails() {
    if (!window.rough) return;
    document.querySelectorAll(".rail-text,.rail-actions").forEach((el, i) => {
      let svg = el.querySelector(":scope > svg.rail-sketch");
      if (!svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.classList.add("rail-sketch");
        el.prepend(svg);
      }
      svg.replaceChildren();
      const h = el.offsetHeight;
      svg.setAttribute("viewBox", `0 0 12 ${h}`);
      const rc = rough.svg(svg);
      const main = i === 0 ? "#FFFFFF" : "#BC5CFF";
      const accent = i === 0 ? "#25F4FF" : "#FFFFFF";
      if (el.classList.contains("rail-actions")) {
        // Intentionally straight, without Rough.js: no hand-drawn effect beside buttons.
        const addLine = (x1, y1, x2, y2, stroke, width) => {
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
          );
          Object.entries({
            x1,
            y1,
            x2,
            y2,
            stroke,
            "stroke-width": width,
            "stroke-linecap": "round",
          }).forEach(([k, v]) => line.setAttribute(k, v));
          svg.appendChild(line);
        };
        addLine(5, 3, 5, h - 4, main, 1.8);
        addLine(5, 3, 5, Math.min(h - 4, 23), accent, 2.15);
      } else {
        svg.appendChild(
          rc.line(5, 3, 5, h - 4, {
            stroke: main,
            strokeWidth: 1.8,
            roughness: 1.25,
            bowing: 1.05,
            maxRandomnessOffset: 1.25,
            seed: 610 + i * 13,
          }),
        );
        svg.appendChild(
          rc.line(5, 3, 5, Math.min(h - 4, h * 0.25), {
            stroke: accent,
            strokeWidth: 2.15,
            roughness: 1.1,
            bowing: 1,
            maxRandomnessOffset: 1,
            seed: 701 + i * 13,
          }),
        );
      }
    });
  }
  if (document.readyState === "complete") renderRails();
  else window.addEventListener("load", renderRails, { once: true });
  let timer;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(timer);
      timer = setTimeout(renderRails, 150);
    },
    { passive: true },
  );
})();
