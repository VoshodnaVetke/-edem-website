/* v27 uses the exact original geometric accent paths in their own SVG surface. */
(function () {
  const ns = "http://www.w3.org/2000/svg";
  document.querySelectorAll(".cyber-panel[data-frame]").forEach((panel) => {
    const frame = panel.querySelector(".applied-frame");
    if (!frame) return;
    const overlay = document.createElementNS(ns, "svg");
    overlay.setAttribute("class", "cyber-accent-layer");
    overlay.setAttribute(
      "viewBox",
      frame.getAttribute("viewBox") || "0 0 440 290",
    );
    overlay.setAttribute("preserveAspectRatio", "none");
    overlay.setAttribute("aria-hidden", "true");
    frame.querySelectorAll("path.detail,path.detail2").forEach((p) => {
      const c = p.cloneNode(true),
        violet = p.classList.contains("detail2");
      c.setAttribute("stroke", violet ? "#BC5CFF" : "#25F4FF");
      c.setAttribute("stroke-width", violet ? "1.85" : "2.2");
      c.setAttribute("fill", "none");
      c.setAttribute("stroke-linecap", "round");
      c.setAttribute("stroke-linejoin", "round");
      c.setAttribute("vector-effect", "non-scaling-stroke");
      c.removeAttribute("class");
      overlay.appendChild(c);
    });
    // Place above the SVG fill, below the text, with no impact on layout.
    const accentFade = document.createElement("div");
    accentFade.className = "fx-accent-fade";
    accentFade.setAttribute("aria-hidden", "true");
    accentFade.appendChild(overlay);
    frame.insertAdjacentElement("afterend", accentFade);
  });
})();
