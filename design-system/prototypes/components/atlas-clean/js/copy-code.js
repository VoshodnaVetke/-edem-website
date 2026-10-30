(() => {
  const signal = (button, message) => {
    const previous = button.textContent;
    button.textContent = message;
    window.setTimeout(() => {
      if (button.isConnected) button.textContent = previous;
    }, 1500);
  };
  document.addEventListener("click", async (event) => {
    const button = event.target.closest(".atlas-doc-copy");
    if (!button) return;
    const code = button.closest("td")?.querySelector("pre.atlas-doc-code code");
    if (!code) return;
    const txt = code.textContent;
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("clipboard API unavailable");
      await navigator.clipboard.writeText(txt);
      signal(button, "СКОПИРОВАНО");
    } catch (error) {
      const tmp = document.createElement("textarea");
      tmp.value = txt;
      tmp.setAttribute("readonly", "");
      tmp.style.cssText = "position:fixed;left:-9999px;top:0";
      document.body.append(tmp);
      tmp.select();
      const success = document.execCommand?.("copy");
      tmp.remove();
      signal(button, success ? "СКОПИРОВАНО" : "ВЫДЕЛИТЕ КОД");
    }
  });
})();
