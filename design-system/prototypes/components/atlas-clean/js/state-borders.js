(function () {
  const lab = document.getElementById("component-states");
  if (!lab) return;
  const input = lab.querySelector("#states-user-input");
  if (input && !input.closest(".states-input-rough")) {
    const wrap = document.createElement("div");
    wrap.className = "states-input-rough";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
  }
  const targets = [
    ...lab.querySelectorAll(
      ".states-btn,.states-action-card,.states-module,.states-input-rough",
    ),
  ];
  const ns = "http://www.w3.org/2000/svg";
  const setup = () => {
    if (typeof rough === "undefined" || !rough.svg) return;
    const instances = new Map();
    for (const el of targets) {
      const svg = document.createElementNS(ns, "svg");
      svg.classList.add("v50-rough-stroke");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      el.appendChild(svg);
      instances.set(el, svg);
    }
    lab.classList.add("v50-rough-ready");
    const render = (el) => {
      const svg = instances.get(el);
      if (!svg) return;
      const w = el.clientWidth,
        h = el.clientHeight;
      if (w < 10 || h < 10) return;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.replaceChildren();
      const cr = rough.svg(svg);
      let color = "rgba(255,255,255,.63)";
      if (el.matches(".states-btn--primary")) color = "#25F4FF";
      if (el.matches(".states-btn:disabled")) color = "#657080";
      if (el.matches(".states-module")) color = "#657588";
      if (el.matches(".states-input-rough")) color = "#8291A6";
      if (el.matches('.states-input-rough:has(input[aria-invalid="true"])'))
        color = "#FF8295";
      if (
        el.matches(
          ".states-btn:hover:not(:disabled),.states-action-card:hover,.states-btn:focus-visible,.states-action-card:focus-visible,.states-input-rough:focus-within",
        )
      )
        color = "#25F4FF";
      const m = 2.8,
        opts = {
          stroke: color,
          strokeWidth: 1.15,
          roughness: 0.7,
          bowing: 0.55,
          seed: 43,
          fill: "none",
        };
      let points;
      if (el.matches(".states-action-card")) {
        let cut = 14;
        points = [
          [m, cut + m],
          [cut + m, m],
          [w - m, m],
          [w - m, h - cut - m],
          [w - cut - m, h - m],
          [m, h - m],
        ];
      } else if (el.matches(".states-module")) {
        points = [
          [m, m],
          [w - m, m],
          [w - m, h - m],
          [m, h - m],
        ];
      } else if (el.matches(".states-input-rough")) {
        points = [
          [m, m],
          [w - m - 7, m],
          [w - m, m + 7],
          [w - m, h - m],
          [m, h - m],
        ];
      } else {
        points = [
          [m, m],
          [w - m, m],
          [w - m, h - m],
          [m, h - m],
        ];
      }
      let d = "M " + points.map((p) => p.join(" ")).join(" L ") + " Z";
      svg.appendChild(cr.path(d, opts));
    };
    const refresh = () => {
      for (const el of targets) render(el);
    };
    refresh();
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) render(entry.target);
      });
      targets.forEach((el) => observer.observe(el));
    } else window.addEventListener("resize", refresh, { passive: true });
    lab.addEventListener("pointerover", (e) => {
      let t = e.target.closest(
        ".states-btn,.states-action-card,.states-input-rough",
      );
      if (t) render(t);
    });
    lab.addEventListener("pointerout", (e) => {
      let t = e.target.closest(
        ".states-btn,.states-action-card,.states-input-rough",
      );
      if (t) requestAnimationFrame(() => render(t));
    });
    lab.addEventListener("focusin", (e) => {
      let t = e.target.closest(
        ".states-btn,.states-action-card,.states-input-rough",
      );
      if (t) render(t);
    });
    lab.addEventListener("focusout", (e) => {
      let t = e.target.closest(
        ".states-btn,.states-action-card,.states-input-rough",
      );
      if (t) requestAnimationFrame(() => render(t));
    });
    const mo = new MutationObserver(() => {
      const x = lab.querySelector(".states-input-rough");
      if (x) render(x);
    });
    mo.observe(input, { attributes: true, attributeFilter: ["aria-invalid"] });
  };
  if (document.readyState === "complete") setup();
  else window.addEventListener("load", setup, { once: true });
})();
