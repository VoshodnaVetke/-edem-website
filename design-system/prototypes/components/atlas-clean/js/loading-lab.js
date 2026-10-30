(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion:reduce)");
  document.querySelectorAll("[data-loader-card]").forEach((card) => {
    const button = card.querySelector(".edem-lab-activate");
    const status = card.querySelector(".edem-lab-status");
    const progress = card.querySelector(".edem-lab-progress");
    let timer = null;
    button.addEventListener("click", () => {
      if (card.classList.contains("is-loading")) return;
      clearTimeout(timer);
      card.classList.remove("is-ready");
      card.classList.add("is-loading");
      status.textContent = "LOADING";
      progress.textContent = "SYNC IN PROGRESS";
      button.disabled = true;
      button.textContent = "ЗАГРУЗКА...";
      timer = setTimeout(
        () => {
          card.classList.remove("is-loading");
          card.classList.add("is-ready");
          status.textContent = "READY";
          progress.textContent = "SYNC COMPLETE";
          button.disabled = false;
          button.textContent = "ПОВТОРИТЬ";
        },
        reduced.matches ? 300 : 3800,
      );
    });
  });
})();
