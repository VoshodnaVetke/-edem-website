(() => {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const selector =
    '.atlas-app button:not(.atlas-menu-toggle):not(.atlas-doc-copy),.atlas-app .btn,.atlas-app .edem-lab-activate,.atlas-app [role="button"]';
  const controls = [...new Set(document.querySelectorAll(selector))].filter(
    (x) => x instanceof HTMLElement && !x.closest("svg"),
  );
  const enabled = (el) => !el.disabled;
  function draw(el, index) {
    let svg = el.querySelector(":scope > svg.edem-button-border");
    if (!svg) {
      svg = document.createElementNS(NS, "svg");
      svg.classList.add("edem-button-border");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      el.append(svg);
    }
    const w = Math.round(el.getBoundingClientRect().width),
      h = Math.round(el.getBoundingClientRect().height);
    if (w < 15 || h < 15) return;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.replaceChildren();
    const fineHover = window.matchMedia(
      "(hover:hover) and (pointer:fine)",
    ).matches;
    const hover =
      enabled(el) &&
      ((fineHover && el.matches(":hover")) || el.matches(":focus-visible"));
    // Cyan outline is temporary hover/focus feedback; selected/default stays white.
    const color = hover ? "#25F4FF" : "#FFFFFF";
    const path = `M 3.4 4.2 L ${Math.round(w * 0.28)} 3.3 L ${Math.round(w * 0.59)} 4.4 L ${w - 4.3} 3.5 L ${w - 3.1} ${Math.round(h * 0.4)} L ${w - 4.1} ${h - 3} L ${Math.round(w * 0.67)} ${h - 3.6} L ${Math.round(w * 0.27)} ${h - 2.7} L 3.1 ${h - 3.8} Z`;
    if (window.rough?.svg) {
      try {
        const r = window.rough.svg(svg);
        svg.appendChild(
          r.path(path, {
            stroke: color,
            strokeWidth: 1.65,
            roughness: 0.72,
            bowing: 0.6,
            maxRandomnessOffset: 0.7,
            seed: 210 + index,
            fill: "none",
          }),
        );
        return;
      } catch (e) {}
    }
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", path);
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", color);
    p.setAttribute("stroke-width", "1.7");
    p.setAttribute("stroke-linecap", "round");
    p.setAttribute("stroke-linejoin", "round");
    svg.append(p);
    const p2 = document.createElementNS(NS, "path");
    p2.setAttribute(
      "d",
      `M 5 ${h - 6} L 4 6 L ${Math.round(w * 0.51)} 4.6 L ${w - 5} 5.6`,
    );
    p2.setAttribute("fill", "none");
    p2.setAttribute("stroke", color);
    p2.setAttribute("stroke-width", ".55");
    p2.setAttribute("opacity", ".55");
    svg.append(p2);
  }
  let raf = 0;
  const redraw = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => controls.forEach(draw));
  };
  controls.forEach((el) => {
    [
      "mouseenter",
      "mouseleave",
      "focusin",
      "focusout",
      "pointerdown",
      "pointerup",
      "click",
    ].forEach((event) => el.addEventListener(event, redraw));
    new MutationObserver(() => {
      if (!el.querySelector(":scope > svg.edem-button-border")) redraw();
    }).observe(el, {
      childList: true,
      attributes: true,
      attributeFilter: ["aria-pressed", "aria-selected", "disabled"],
    });
  });
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(redraw);
    controls.forEach((el) => ro.observe(el));
  } else window.addEventListener("resize", redraw);
  redraw();
  window.addEventListener("load", redraw, { once: true });
  document.querySelectorAll("[data-btn-preview]").forEach((b) =>
    b.addEventListener("click", () => {
      const o = document.getElementById("atlas-buttons-demo-status");
      if (o) o.textContent = "DEMO / НАЖАТО: " + b.textContent.trim();
    }),
  );
  const run = document.getElementById("atlas-btn-run"),
    error = document.getElementById("atlas-btn-error"),
    reset = document.getElementById("atlas-btn-reset"),
    row = document.getElementById("atlas-btn-state-row"),
    label = document.getElementById("atlas-btn-state-label");
  let timer;
  function state(s, t) {
    if (!row || !label || !run) return;
    row.dataset.state = s;
    label.textContent = t;
    run.disabled = s === "loading";
    run.textContent = s === "loading" ? "ЗАГРУЗКА…" : "ВЫПОЛНИТЬ ↗";
    redraw();
  }
  run?.addEventListener("click", () => {
    clearTimeout(timer);
    state("loading", "LOADING / OPERATION IN PROGRESS");
    timer = setTimeout(
      () => state("success", "SUCCESS / OPERATION COMPLETE"),
      window.matchMedia("(prefers-reduced-motion:reduce)").matches ? 100 : 1400,
    );
  });
  error?.addEventListener("click", () => {
    clearTimeout(timer);
    state("error", "ERROR / OPERATION FAILED");
  });
  reset?.addEventListener("click", () => {
    clearTimeout(timer);
    state("idle", "STANDBY / AWAITING INPUT");
  });
})();
