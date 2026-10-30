(() => {
  "use strict";
  const search = document.getElementById("atlasSearch"),
    count = document.getElementById("atlasCount");
  let state = "all";
  function apply() {
    let n = 0;
    const q = search.value.trim().toLocaleLowerCase("ru");
    document.querySelectorAll(".atlas-card").forEach((card) => {
      const visible =
        (state === "all" || card.dataset.status === state) &&
        (!q || card.dataset.search.toLocaleLowerCase("ru").includes(q));
      card.hidden = !visible;
      if (visible) n++;
    });
    document
      .querySelectorAll(".atlas-section[data-group]")
      .forEach((section) => {
        section.hidden = !section.querySelector(".atlas-card:not([hidden])");
      });
    count.textContent =
      n + " / " + document.querySelectorAll(".atlas-card").length;
  }
  search.addEventListener("input", apply);
  document.querySelectorAll(".atlas-filter-btn").forEach((b) =>
    b.addEventListener("click", () => {
      state = b.dataset.filter;
      document
        .querySelectorAll(".atlas-filter-btn")
        .forEach((z) => z.setAttribute("aria-pressed", String(z === b)));
      apply();
    }),
  );
  apply();
  const side = document.getElementById("atlasSide"),
    toggle = document.getElementById("atlasToggle");
  toggle.addEventListener("click", () => {
    const open = side.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  side.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      side.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }),
  );
  const f = document.getElementById("atlasNavFrame");
  f.src = "navigation.html";
  // Match the preview frame to the actual navigation content, never to a fixed demo viewport.
  let navContentResizeObserver;
  let navOverlayObserver;
  function fitNavPreview() {
    const d = f.contentDocument;
    if (!d?.body) return;
    const dialogsOpen = !!d.querySelector("dialog[open]");
    const natural = Math.ceil(d.body.getBoundingClientRect().height) + 2;
    const needed = dialogsOpen ? Math.max(natural, 520) : natural;
    if (Math.abs(f.getBoundingClientRect().height - needed) > 1)
      f.style.height = needed + "px";
  }
  f.addEventListener("load", () => {
    const d = f.contentDocument;
    if (!d?.body) return;
    navContentResizeObserver?.disconnect();
    navOverlayObserver?.disconnect();
    navContentResizeObserver = new ResizeObserver(() =>
      requestAnimationFrame(fitNavPreview),
    );
    [
      d.body,
      d.querySelector(".site-header"),
      d.querySelector(".mobile-bottom"),
      d.querySelector(".atlas-nav-pad"),
    ]
      .filter(Boolean)
      .forEach((el) => navContentResizeObserver.observe(el));
    navOverlayObserver = new MutationObserver(() =>
      requestAnimationFrame(fitNavPreview),
    );
    d.querySelectorAll("dialog").forEach((el) =>
      navOverlayObserver.observe(el, {
        attributes: true,
        attributeFilter: ["open"],
      }),
    );
    requestAnimationFrame(fitNavPreview);
  });
  document.querySelectorAll("[data-navwidth]").forEach((b) =>
    b.addEventListener("click", () => {
      const w = Number(b.dataset.navwidth);
      f.style.width = w + "px";
      document
        .querySelectorAll("[data-navwidth]")
        .forEach((z) => z.setAttribute("aria-pressed", String(z === b)));
      requestAnimationFrame(fitNavPreview);
    }),
  );
  const tv = document.getElementById("atlasTreeView");
  if (tv && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    tv.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = tv.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      tv.querySelectorAll(".atlas-tree-plane").forEach((el, i) => {
        el.style.setProperty(
          "transform",
          `translate(${(x * (i + 1) * 3).toFixed(2)}px,${(y * (i + 1) * 2).toFixed(2)}px)`,
        );
      });
    });
})();
