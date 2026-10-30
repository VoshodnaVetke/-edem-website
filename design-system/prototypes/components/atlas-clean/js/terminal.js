(function () {
  const panels = [...document.querySelectorAll(".terminal-panel")];
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const visible = new WeakMap();
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((e) =>
              visible.set(
                e.target,
                e.isIntersecting && e.intersectionRatio > 0.25,
              ),
            );
          },
          { threshold: [0, 0.25, 0.6] },
        )
      : null;
  panels.forEach((panel) => {
    const signal = panel.querySelector(".terminal-signal");
    const state = panel.querySelector(".terminal-footer-state");
    const glass = panel.querySelector(".terminal-glass");
    if (observer) observer.observe(panel);
    else visible.set(panel, true);
    let active = false,
      glitchTimer = 0,
      nextTimer = 0,
      lastGlitch = 0;
    function setActive(on) {
      if (!desktopHover.matches) on = false;
      active = on;
      if (signal) signal.textContent = on ? "●  ACTIVE" : "●  STANDBY";
      if (state) state.textContent = on ? "ACCESS GRANTED" : "AWAITING INPUT";
      if (on) {
        clearTimeout(nextTimer);
        clearTimeout(glitchTimer);
        panel.classList.remove("terminal-disturbance");
      } else scheduleIdle();
    }
    function burst() {
      // Absolutely no idle glitch while card is being read or used.
      if (
        mq.matches ||
        !desktopHover.matches ||
        active ||
        document.hidden ||
        !visible.get(panel)
      )
        return;
      if (Date.now() - lastGlitch < 9500) return;
      lastGlitch = Date.now();
      panel.style.setProperty(
        "--idle-glitch-y",
        Math.random() < 0.5 ? "11%" : "84%",
      );
      panel.style.setProperty(
        "--idle-glitch-x",
        Math.round(Math.random() * 10 - 5) + "px",
      );
      panel.classList.remove("terminal-disturbance");
      void panel.offsetWidth;
      panel.classList.add("terminal-disturbance");
      clearTimeout(glitchTimer);
      glitchTimer = setTimeout(
        () => panel.classList.remove("terminal-disturbance"),
        520,
      );
    }
    function scheduleIdle() {
      clearTimeout(nextTimer);
      nextTimer = setTimeout(
        () => {
          if (!active) burst();
          scheduleIdle();
        },
        9000 + Math.random() * 10000,
      );
    }
    panel.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse" && desktopHover.matches) setActive(true);
    });
    panel.addEventListener("pointerleave", () => setActive(false));
    panel.addEventListener("focusin", (e) => {
      if (desktopHover.matches && e.target.matches(":focus-visible"))
        setActive(true);
    });
    panel.addEventListener("focusout", () => {
      if (!panel.contains(document.activeElement)) setActive(false);
    });
    panel.addEventListener(
      "pointermove",
      (e) => {
        if (e.pointerType !== "mouse" || !desktopHover.matches || !glass)
          return;
        const rect = glass.getBoundingClientRect();
        panel.style.setProperty(
          "--cursor-x",
          (e.clientX - rect.left).toFixed(1) + "px",
        );
        panel.style.setProperty(
          "--cursor-y",
          (e.clientY - rect.top).toFixed(1) + "px",
        );
      },
      { passive: true },
    );
    scheduleIdle();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden)
      panels.forEach((p) => p.classList.remove("terminal-disturbance"));
  });
})();
