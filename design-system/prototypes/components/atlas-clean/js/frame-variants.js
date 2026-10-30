/* Random card geometry. Content remains fixed; only real v55 SVG + frame mask change.
   Runs before Rough.js, accent SVG generation and entrance animations initialize. */
(() => {
  "use strict";
  const templates = {
    system:
      '<path class="fill" d="M7 7H433V239L393 283H7Z"></path><path class="border" d="M7 7H433V239L393 283H7Z"></path><path class="detail" d="M7 7H100M433 188V239L393 283H322"></path><path class="detail2" d="M18 18H83M18 269H124"></path>',
    double:
      '<path class="fill" d="M7 17H395L433 55V284H39L7 245Z"></path><path class="border" d="M7 17H395L433 55V284H39L7 245Z"></path><path class="detail" d="M7 17H139M395 17L433 55M433 242V284H358"></path><path class="detail2" d="M18 56V193L37 217M56 272H115"></path><path class="inner" d="M20 29H374M421 67V234"></path>',
    asym: '<path class="fill" d="M7 39L39 7H294L309 18H432V228L398 282H7Z"></path><path class="border" d="M7 39L39 7H294L309 18H432V228L398 282H7Z"></path><path class="detail" d="M39 7H151M309 18H397M432 197V228L398 282H328"></path><path class="detail2" d="M18 54V107M7 249V282H84"></path>',
  };
  const panels = [
    ...document.querySelectorAll("#group-1 .atlas-stream-card .cyber-panel"),
  ];
  const linkPanel = document.querySelector(
    "#states-card-action.edem-link-card",
  );
  if (linkPanel) panels.push(linkPanel);
  const pool = [];
  for (let i = 0; i < panels.length; i++)
    pool.push(["system", "double", "asym"][i % 3]);
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  let choice;
  for (let k = 0; k < 200; k++) {
    choice = shuffle([...pool]);
    if (choice.every((item, i) => i === 0 || item !== choice[i - 1])) break;
  }
  panels.forEach((panel, i) => {
    const type = choice[i];
    panel.setAttribute("data-frame", type);
    const frame = panel.querySelector("svg.applied-frame");
    if (frame) {
      frame.innerHTML = templates[type];
      frame.dataset.roughDone = "0";
    }
    const frameName = type.toUpperCase();
    panel.dataset.frameVariant = frameName; // diagnostic only; not visible UI label
  });
})();
