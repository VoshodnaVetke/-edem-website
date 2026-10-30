(() => {
  "use strict";
  const data = {
    games: {
      title: "АФИША",
      crumb: "Афиша",
      number: "01",
      desc: "Ближайшие игры, информация об участии и статусы записи. Пример содержимого раздела без вымышленных событий.",
      action: "ИССЛЕДОВАТЬ МИР",
      next: "world",
    },
    world: {
      title: "ВСЕЛЕННАЯ",
      crumb: "Вселенная",
      number: "02",
      desc: "Публичная информация об авторском мире «Эдем». Отсюда можно перейти к энциклопедическим материалам.",
      action: "ОТКРЫТЬ ЭНЦИКЛОПЕДИЮ",
      next: "encyclopedia",
    },
    encyclopedia: {
      title: "ЭНЦИКЛОПЕДИЯ",
      crumb: "Энциклопедия",
      number: "03",
      parent: "world",
      desc: "Структурированные материалы об организациях, локациях и событиях. Навигационная демонстрация без публикации закрытого лора.",
      action: "К ВСЕЛЕННОЙ",
      next: "world",
    },
    account: {
      title: "ЛИЧНЫЙ КАБИНЕТ",
      crumb: "Личный кабинет",
      number: "04",
      desc: "Пример раздела участника: персональные материалы и статусы. Авторизация в прототипе не реализована.",
      action: "К АФИШЕ",
      next: "games",
    },
    about: {
      title: "О МАСТЕРСКОЙ ГРУППЕ",
      crumb: "О группе",
      number: "05",
      desc: "Раздел для знакомства с мастерской группой Эдема и её работой. Конкретные факты будут добавлены из подтверждённых материалов.",
      action: "К АФИШЕ",
      next: "games",
    },
    team: {
      title: "КОМАНДА",
      crumb: "Команда",
      number: "06",
      parent: "about",
      desc: "Раздел для представления участников мастерской группы. Здесь пока нет персональных сведений.",
      action: "О ГРУППЕ",
      next: "about",
    },
    contacts: {
      title: "КОНТАКТЫ",
      crumb: "Контакты",
      number: "07",
      parent: "about",
      desc: "Публичные каналы связи и способы обращения. Адреса и ссылки ещё не добавлены.",
      action: "О ГРУППЕ",
      next: "about",
    },
  };
  const menu = document.getElementById("site-menu");
  const search = document.getElementById("search-dialog");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  let returnFocus = null;
  const currentPage = () =>
    window.__edemDemoPage && Object.hasOwn(data, window.__edemDemoPage)
      ? window.__edemDemoPage
      : Object.hasOwn(data, location.hash.slice(1))
        ? location.hash.slice(1)
        : "games";
  function setCurrentAttr(el, yes) {
    if (yes) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  }
  function render() {
    const page = currentPage(),
      item = data[page];
    document.title = `Эдем / ${item.crumb} · Навигация C v1.2`;
    document.getElementById("page-heading").textContent = item.title;
    document.getElementById("page-kicker").textContent =
      `EDEN / ${item.number} — ${item.crumb.toUpperCase()}`;
    document.getElementById("page-description").textContent = item.desc;
    const action = document.getElementById("primary-action");
    action.href = `#${item.next}`;
    action.firstChild.textContent = item.action + " ";
    const crumbs = document.getElementById("breadcrumbs");
    crumbs.replaceChildren();
    const root = document.createElement("a");
    root.href = "#games";
    root.textContent = "ЭДЕМ";
    crumbs.append(root);
    function crumbSep() {
      let s = document.createElement("span");
      s.textContent = "/";
      s.setAttribute("aria-hidden", "true");
      crumbs.append(s);
    }
    if (item.parent) {
      crumbSep();
      const p = document.createElement("a");
      p.href = `#${item.parent}`;
      p.textContent = data[item.parent].crumb;
      crumbs.append(p);
    }
    crumbSep();
    const curr = document.createElement("span");
    curr.className = "current";
    curr.textContent = item.crumb;
    curr.setAttribute("aria-current", "page");
    crumbs.append(curr);
    document
      .querySelectorAll("[data-nav]")
      .forEach((el) => setCurrentAttr(el, el.dataset.nav === page));
    document
      .querySelectorAll("[data-bottom]")
      .forEach((el) => setCurrentAttr(el, el.dataset.bottom === page));
  }
  function closeDialog(dialog) {
    if (dialog.open) dialog.close();
  }
  function openDialog(dialog, button) {
    returnFocus = button;
    if (menu.open) menu.close();
    if (search.open) search.close();
    dialog.showModal();
    document
      .querySelectorAll("[data-open-menu]")
      .forEach((el) =>
        el.setAttribute("aria-expanded", String(dialog === menu)),
      );
    if (dialog === search) {
      searchInput.value = "";
      renderResults("");
      searchInput.focus();
    }
  }
  document
    .querySelectorAll("[data-open-menu]")
    .forEach((b) => b.addEventListener("click", () => openDialog(menu, b)));
  document
    .querySelectorAll("[data-open-search]")
    .forEach((b) => b.addEventListener("click", () => openDialog(search, b)));
  document
    .querySelectorAll("[data-close-dialog]")
    .forEach((b) =>
      b.addEventListener("click", () => closeDialog(b.closest("dialog"))),
    );
  for (const dialog of [menu, search]) {
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document
        .querySelectorAll("[data-open-menu]")
        .forEach((el) => el.setAttribute("aria-expanded", "false"));
      if (returnFocus && returnFocus.isConnected) returnFocus.focus();
      returnFocus = null;
    });
  }
  function navigate(id) {
    if (!Object.hasOwn(data, id)) return;
    window.__edemDemoPage = id; // iframe srcdoc can have a null origin: no history.pushState
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main").focus({ preventScroll: true });
  }
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    if (!Object.hasOwn(data, id)) return;
    event.preventDefault();
    const dialog = link.closest("dialog");
    if (dialog) dialog.close();
    navigate(id);
  });
  // Search is a content-search prototype, not a second site map.
  // These entries are illustrative and do not claim any existing published articles.
  const demoIndex = [
    {
      title: "Пример карточки игры",
      category: "ИГРЫ / ДЕМО",
      summary:
        "Демонстрационная карточка для проверки поиска по названию игры.",
      terms: "игра игры афиша событие участие",
      section: "games",
    },
    {
      title: "Пример статьи о персонаже",
      category: "ЭНЦИКЛОПЕДИЯ / ДЕМО",
      summary:
        "Пример поискового результата о персонаже, без канонических сведений.",
      terms: "персонаж персонажи биография",
      section: "encyclopedia",
    },
    {
      title: "Пример статьи об организации",
      category: "ЭНЦИКЛОПЕДИЯ / ДЕМО",
      summary: "Пример результата по организации или корпорации.",
      terms: "организация организации корпорация",
      section: "encyclopedia",
    },
    {
      title: "Пример статьи о локации",
      category: "ЭНЦИКЛОПЕДИЯ / ДЕМО",
      summary: "Пример результата по географическому объекту мира.",
      terms: "локация локации город место",
      section: "encyclopedia",
    },
  ];
  function renderResults(query) {
    const q = query.trim().toLocaleLowerCase("ru");
    searchResults.replaceChildren();
    if (!q) {
      const note = document.createElement("p");
      note.className = "search-empty";
      note.textContent =
        "Введите запрос. Здесь будут находиться опубликованные игры, статьи, персонажи и организации. Сейчас используется только демонстрационный индекс.";
      searchResults.append(note);
      return;
    }
    const matches = demoIndex.filter((item) =>
      (item.title + " " + item.category + " " + item.summary + " " + item.terms)
        .toLocaleLowerCase("ru")
        .includes(q),
    );
    if (!matches.length) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent =
        "В демонстрационных записях совпадений нет. Реальный поиск будет подключён после появления публичного индекса.";
      searchResults.append(empty);
      return;
    }
    for (const item of matches) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "search-result search-result--content";
      const stack = document.createElement("span");
      stack.className = "search-result-stack";
      const cat = document.createElement("span");
      cat.className = "search-result-category";
      cat.textContent = item.category;
      const label = document.createElement("strong");
      label.textContent = item.title;
      const summary = document.createElement("small");
      summary.textContent = item.summary;
      stack.append(cat, label, summary);
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.classList.add("ui-icon");
      const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", "#i-arrow");
      svg.append(use);
      b.append(stack, svg);
      b.addEventListener("click", () => {
        search.close();
        navigate(item.section);
      });
      searchResults.append(b);
    }
  }
  searchInput.addEventListener("input", () => renderResults(searchInput.value));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const btn = searchResults.querySelector("button");
      if (btn) {
        e.preventDefault();
        btn.click();
      }
    }
  });
  function onHistoryNav() {
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main").focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", onHistoryNav);
  window.addEventListener("popstate", onHistoryNav);
  render();
})();
