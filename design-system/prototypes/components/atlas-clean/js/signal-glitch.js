const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const heading = document.querySelector(".hero-signal-heading");
const transfer = document.getElementById("data-loss-live");
const label = document.getElementById("data-loss-label");
const readout = document.getElementById("data-loss-readout");
const trigger = document.getElementById("data-loss-trigger");
let headGlitch = null,
  packetGlitch = null;
let busy = false,
  pulseTimer = null;
let glitchLib = null;
try {
  glitchLib = await import("https://esm.sh/@isonimus/glitch-js?bundle");
} catch (err) {
  console.info(
    "Glitch.js is offline; built-in signal animation is available.",
    err,
  );
}
if (glitchLib && heading && !motionReduced.matches) {
  try {
    const { Glitch, Effects } = glitchLib;
    // Keep the live, readable main heading untouched. The library only distorts a copy.
    const original = [...heading.querySelectorAll(".hero-signal-line")];
    const overlays = original.map((line) => {
      const overlay = document.createElement("span");
      overlay.className = "hero-glitch-overlay";
      overlay.setAttribute("aria-hidden", "true");
      overlay.textContent = line.textContent;
      line.appendChild(overlay);
      return overlay;
    });
    const controllers = overlays.map(
      (node) =>
        new Glitch(node, {
          trigger: "manual",
          active: false,
          effects: [
            Effects.rgbSplit({
              maxOffset: 8,
              frequency: 0.48,
              blendMode: "screen",
            }),
            Effects.slice({ maxOffset: 16, frequency: 0.42 }),
          ],
        }),
    );
    heading.classList.add("library-loaded");
    const burst = () => {
      if (motionReduced.matches || document.hidden) return;
      controllers.forEach((controller, i) => {
        overlays[i].classList.add("is-live");
        controller.start();
      });
      window.setTimeout(() => {
        controllers.forEach((controller, i) => {
          controller.stop();
          overlays[i].classList.remove("is-live");
        });
      }, 420);
    };
    const schedule = () => {
      const delay = 5000 + Math.random() * 3800;
      window.setTimeout(() => {
        if (!motionReduced.matches) burst();
        schedule();
      }, delay);
    };
    schedule();
    motionReduced.addEventListener("change", () => {
      if (motionReduced.matches)
        controllers.forEach((controller, i) => {
          controller.stop();
          overlays[i].classList.remove("is-live");
        });
    });
    headGlitch = controllers;
  } catch (err) {
    console.warn(
      "Glitch.js header initialization failed; CSS fallback retained.",
      err,
    );
    heading.classList.remove("library-loaded");
  }
}
if (glitchLib && label && !motionReduced.matches) {
  try {
    const { Glitch, Effects } = glitchLib;
    packetGlitch = new Glitch(label, {
      trigger: "manual",
      active: false,
      effects: [
        Effects.rgbSplit({ maxOffset: 5, frequency: 0.36 }),
        Effects.slice({ maxOffset: 11, frequency: 0.42 }),
      ],
    });
  } catch (err) {
    console.warn("Glitch.js data label unavailable.", err);
  }
}
const progressIndicator = document.getElementById("data-loss-percent");
let progressFrame = 0;
function transmit() {
  if (busy || !transfer) return;
  busy = true;
  window.cancelAnimationFrame(progressFrame);
  transfer.classList.remove("is-transmitting");
  transfer.style.setProperty("--load-progress", "0%");
  progressIndicator.textContent = "000%";
  void transfer.offsetWidth;
  for (const segment of transfer.querySelectorAll(
    ".data-loss-stage__segments i",
  )) {
    segment.style.setProperty(
      "--signal-delay",
      Math.round(Math.random() * 650) + "ms",
    );
    segment.style.width = (8 + Math.random() * 23).toFixed(0) + "px";
    segment.style.flexGrow = (0.5 + Math.random() * 2).toFixed(2);
  }
  const duration = motionReduced.matches ? 0 : 4200;
  transfer.classList.add("is-transmitting");
  if (packetGlitch && !motionReduced.matches) packetGlitch.start();
  trigger.disabled = true;
  readout.textContent = "RECONSTRUCTING / PACKET TRANSFER...";
  let started = null;
  function renderProgress(time) {
    if (started === null) started = time;
    const t = duration === 0 ? 1 : Math.min(1, (time - started) / duration);
    // Continuous advance with a small, slow breathing variation in speed.
    const eased = t * t * (3 - 2 * t);
    const value = Math.min(100, Math.round(eased * 100));
    transfer.style.setProperty(
      "--load-progress",
      (eased * 100).toFixed(3) + "%",
    );
    progressIndicator.textContent = String(value).padStart(3, "0") + "%";
    if (t < 1) {
      progressFrame = requestAnimationFrame(renderProgress);
      return;
    }
    if (packetGlitch) packetGlitch.stop();
    transfer.classList.remove("is-transmitting");
    readout.textContent = "TRANSMISSION COMPLETE · SIGNAL RESTORED";
    trigger.disabled = false;
    busy = false;
  }
  progressFrame = requestAnimationFrame(renderProgress);
}
trigger?.addEventListener("click", transmit);
