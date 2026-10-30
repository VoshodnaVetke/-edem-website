(() => {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a.atlas-shared-code-link");
    if (!link) return;
    const module = document.querySelector(link.getAttribute("href"));
    if (module?.tagName === "DETAILS") module.open = true;
  });
})();
