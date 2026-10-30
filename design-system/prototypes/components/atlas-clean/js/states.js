(() => {
  const q = (id) => document.getElementById(id),
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const submit = q("states-btn-submit"),
    reset = q("states-btn-reset"),
    msg = q("states-button-status");
  let buttonTimeout;
  function buttonReset() {
    clearTimeout(buttonTimeout);
    submit.disabled = false;
    submit.textContent = "ВЫПОЛНИТЬ ↗";
    msg.textContent = "STANDBY / AWAITING INPUT";
    msg.style.color = "#9EAFBF";
  }
  submit?.addEventListener("click", () => {
    submit.disabled = true;
    submit.textContent = "SYNC...";
    msg.textContent = "LOADING / OPERATION IN PROGRESS";
    msg.style.color = "#BC5CFF";
    clearTimeout(buttonTimeout);
    buttonTimeout = setTimeout(
      () => {
        submit.disabled = false;
        submit.textContent = "ПОВТОРИТЬ ↗";
        msg.textContent = "SUCCESS / OPERATION COMPLETE";
        msg.style.color = "#7CE7C1";
      },
      reduced.matches ? 200 : 2300,
    );
  });
  reset?.addEventListener("click", buttonReset);
  const input = q("states-user-input"),
    note = q("states-form-note");
  q("states-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = input.value.trim().length > 0;
    input.setAttribute("aria-invalid", String(!valid));
    note.dataset.status = valid ? "success" : "error";
    note.textContent = valid
      ? "SUCCESS / ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ ПРИНЯТЫ"
      : "ERROR / Пожалуйста, заполните поле";
    if (!valid) input.focus();
  });
  input?.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    note.dataset.status = "";
    note.textContent = "Введите любой текст для проверки состояния.";
  });
  q("states-clear")?.addEventListener("click", () => {
    input.value = "";
    input.removeAttribute("aria-invalid");
    note.dataset.status = "";
    note.textContent = "Введите любой текст для проверки состояния.";
  });
  const module = q("states-module"),
    label = q("states-module-label"),
    detail = q("states-module-detail"),
    run = q("states-module-run"),
    fail = q("states-module-fail"),
    disable = q("states-module-disable");
  let timeout;
  function mode(next) {
    clearTimeout(timeout);
    module.dataset.state = next;
    let labels = {
      default: ["STANDBY", "Ожидание команды"],
      loading: ["SYNC...", "Идёт загрузка данных"],
      success: ["COMPLETE", "Данные получены"],
      error: ["FAILED", "Не удалось загрузить данные"],
      disabled: ["LOCKED", "Модуль временно отключён"],
    };
    label.textContent = labels[next][0];
    detail.textContent = labels[next][1];
    run.disabled = next === "loading" || next === "disabled";
    fail.disabled = next === "loading" || next === "disabled";
    disable.textContent = next === "disabled" ? "ВКЛЮЧИТЬ" : "ОТКЛЮЧИТЬ";
  }
  run?.addEventListener("click", () => {
    mode("loading");
    timeout = setTimeout(() => mode("success"), reduced.matches ? 200 : 3000);
  });
  fail?.addEventListener("click", () => mode("error"));
  disable?.addEventListener("click", () =>
    mode(module.dataset.state === "disabled" ? "default" : "disabled"),
  );
})();
