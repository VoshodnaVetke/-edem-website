/* Edem Motion v22. All entrance effects start only after the element is actually in view. */
(function () {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;
  const whenReady = (fn) =>
    document.readyState === "complete"
      ? fn()
      : addEventListener("load", fn, { once: true });
  whenReady(() => {
    document.documentElement.classList.add("motion-enabled");
    const cards = [...document.querySelectorAll(".block,.swatch")];
    const allFrames = [...document.querySelectorAll(".applied-frame")];
    const ioSupported = "IntersectionObserver" in window;
    const mobile = matchMedia("(hover: none), (pointer: coarse)").matches;
    const frameStates = new Map();
    const ioOptions = mobile
      ? { threshold: 0, rootMargin: "0px 0px 240px 0px" }
      : {
          threshold: [0, 0.25, 0.55, 0.82, 1],
          rootMargin: "0px 0px -35px 0px",
        };
    // Rough.js is loaded and paths have been generated in earlier load callbacks.
    // Prepare EVERY stroke before attaching scroll observation and wait until paint is committed.
    allFrames.forEach((svg) => {
      const paths = [...svg.querySelectorAll("path")].filter(
        (p) => !p.classList.contains("fill"),
      );
      for (const p of paths) {
        try {
          const len = p.getTotalLength();
          if (len > 0) {
            p.style.transition = "none";
            p.style.strokeDasharray = String(len + 8);
            p.style.strokeDashoffset = String(len + 8);
          }
        } catch {}
      }
      frameStates.set(svg, { paths, done: false, timer: null });
    });
    const observers = [];
    function showCard(card) {
      if (card.dataset.edemRevealed) return;
      card.dataset.edemRevealed = "1";
      card.classList.add("is-visible");
    }
    function drawFrame(svg) {
      const state = frameStates.get(svg);
      if (!state || state.done) return;
      state.done = true;
      // Sequential single-point tracing: each path starts AFTER the prior one finishes.
      // The outer perimeter is drawn first; inner accents follow it, never simultaneously.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          // White perimeter draws slowly from one point. Colored accents begin early
          // while the perimeter is still progressing, instead of waiting for every
          // rough stroke and every inner ornament to finish.
          const border = state.paths.filter((p) =>
            p.closest(".rough-kind-border"),
          );
          const accents = state.paths.filter((p) =>
            p.closest(".rough-kind-detail,.rough-kind-detail2"),
          );
          const inner = state.paths.filter((p) =>
            p.closest(".rough-kind-inner"),
          );
          function animate(paths, start, total) {
            const lens = paths.map((p) => {
              try {
                return p.getTotalLength();
              } catch {
                return 0;
              }
            });
            const sum = lens.reduce((a, b) => a + b, 0) || 1;
            let offset = start;
            paths.forEach((p, i) => {
              const duration = Math.max(0.12, (total * lens[i]) / sum);
              p.style.transition = `stroke-dashoffset ${duration.toFixed(2)}s linear ${offset.toFixed(2)}s`;
              p.style.strokeDashoffset = "0";
              offset += duration;
            });
          }
          // Restore the original v55 frame-drawing duration, including the deliberate
          // slow desktop line-trace. Earlier triggering replaces artificial speed-up.
          animate(border, 0, mobile ? 1.35 : 4.3);
          // Accent segments start after 0.9 sec, overlapping with white stroke.
          // Independent fragments emerge in quick succession, not many seconds later.
          // Colored fragments are hover-only. They stay geometrically complete but
          // invisible until hover/focus, independently of the perimeter tracing.
          accents.forEach((p) => {
            p.style.transition = "none";
            p.style.strokeDashoffset = "0";
          });
          inner.forEach((p, i) => {
            p.style.transition = `stroke-dashoffset ${mobile ? 0.5 : 1.15}s ease-out ${(mobile ? 0.3 + i * 0.08 : 1.25 + i * 0.17).toFixed(2)}s`;
            p.style.strokeDashoffset = "0";
          });
        }),
      );
    }
    cards.forEach((card) => {
      const svg = card.querySelector(".applied-frame");
      const state = svg ? frameStates.get(svg) : null;
      // Card stream: full v55 fade/slide + original hand-drawn line tracing.
      // Start before the card reaches the viewport; DO NOT reveal all cards at
      // startup or replace the animation with an instantaneous render.
      // The positive bottom margin pre-triggers the sequence while approaching
      // a card, without waiting for 72% visibility or the old 850ms pause.
      if (card.closest("#group-1 .atlas-stream-card")) {
        if (!ioSupported) {
          showCard(card);
          if (svg) drawFrame(svg);
          return;
        }
        const earlyObserver = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            earlyObserver.disconnect();
            requestAnimationFrame(() => {
              showCard(card);
              if (svg) drawFrame(svg);
            });
          },
          {
            threshold: 0,
            rootMargin: mobile ? "180px 0px 600px 0px" : "240px 0px 720px 0px",
          },
        );
        earlyObserver.observe(card);
        observers.push(earlyObserver);
        return;
      }
      if (!ioSupported) {
        showCard(card);
        if (svg) drawFrame(svg);
        return;
      }
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          const actual = e.intersectionRatio;
          // Mobile preloads/reveals roughly 240px before entering viewport; desktop remains unchanged.
          const enough = mobile
            ? e.isIntersecting
            : actual >= 0.72 ||
              (e.boundingClientRect.height > innerHeight * 0.76 &&
                actual >= 0.52);
          if (enough) {
            if (card.dataset.enterPending) return;
            card.dataset.enterPending = "1";
            const startTimer = setTimeout(
              () => {
                delete card.dataset.enterPending;
                const bounds = card.getBoundingClientRect();
                const visible = Math.max(
                  0,
                  Math.min(innerHeight - 35, bounds.bottom) -
                    Math.max(35, bounds.top),
                );
                const fraction = visible / Math.max(bounds.height, 1);
                if (mobile || fraction >= 0.55) {
                  showCard(card);
                  if (svg) drawFrame(svg);
                  io.disconnect();
                }
              },
              mobile ? 0 : 850,
            );
            if (state) state.timer = startTimer;
          } else if (card.dataset.enterPending) {
            clearTimeout(state?.timer);
            delete card.dataset.enterPending;
          }
        }
      }, ioOptions);
      io.observe(card);
      observers.push(io);
    });
    // Rails use the same early mobile trigger; desktop keeps its deliberate pause.
    document.querySelectorAll(".rail-sketch").forEach((svg) => {
      const paths = [...svg.querySelectorAll("path,line")];
      paths.forEach((p) => {
        try {
          const len = p.getTotalLength();
          p.style.transition = "none";
          p.style.strokeDasharray = String(len + 5);
          p.style.strokeDashoffset = String(len + 5);
        } catch {}
      });
      const parent = svg.parentElement;
      const go = () =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            paths.forEach((p, i) => {
              p.style.transition = `stroke-dashoffset ${mobile ? 0.85 : 2.8}s ease ${i * (mobile ? 90 : 360)}ms`;
              p.style.strokeDashoffset = "0";
            }),
          ),
        );
      if (!ioSupported) {
        go();
        return;
      }
      let timer = null;
      let done = false;
      const io = new IntersectionObserver(
        (entries) => {
          if (done) return;
          if (
            entries.some(
              (e) => e.isIntersecting && (mobile || e.intersectionRatio > 0.6),
            )
          ) {
            if (timer) return;
            timer = setTimeout(
              () => {
                done = true;
                io.disconnect();
                go();
              },
              mobile ? 0 : 700,
            );
          } else {
            clearTimeout(timer);
            timer = null;
          }
        },
        {
          threshold: mobile ? 0 : [0, 0.6, 1],
          rootMargin: mobile ? "0px 0px 240px 0px" : "0px 0px -35px 0px",
        },
      );
      io.observe(parent);
    });
    // Decoding is restricted to 2 short labels, postponed until a brief pause after entrance.
    const labels = [...document.querySelectorAll(".eyebrow")]
      .filter((el) => el.textContent.trim().length < 42)
      .slice(0, 2);
    labels.forEach((el, index) => {
      const original = el.textContent,
        pool = "01/[]<>_#:ABCDEF",
        steps = 16;
      let started = false,
        timer = null;
      const start = () => {
        if (started) return;
        started = true;
        let n = 0;
        timer = setInterval(() => {
          n++;
          el.textContent = [...original]
            .map((c, i) =>
              c === " "
                ? c
                : i / original.length < n / steps
                  ? c
                  : pool[(i * 7 + n * 3) % pool.length],
            )
            .join("");
          if (n >= steps) {
            clearInterval(timer);
            el.textContent = original;
          }
        }, 100);
      };
      if (!ioSupported) {
        setTimeout(start, 1300 + index * 550);
        return;
      }
      const io = new IntersectionObserver(
        (entries) => {
          if (
            entries.some(
              (e) => e.isIntersecting && (mobile || e.intersectionRatio > 0.6),
            )
          ) {
            io.disconnect();
            setTimeout(start, mobile ? 0 : 1150 + index * 550);
          }
        },
        {
          threshold: mobile ? 0 : 0.6,
          rootMargin: mobile ? "0px 0px 240px 0px" : "0px",
        },
      );
      io.observe(el);
    });
  });
})();
