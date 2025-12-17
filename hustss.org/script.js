(function () {
  const root = document.documentElement;

  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  const KEY = "hustss-theme";
  const saved = localStorage.getItem(KEY);

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    localStorage.setItem(KEY, mode);
  }

  function toggleTheme() {
    const cur = root.getAttribute("data-theme") || "dark";
    setTheme(cur === "dark" ? "light" : "dark");
  }

  if (saved === "light" || saved === "dark") {
    setTheme(saved);
  } else {
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }

  const themeBtn = document.getElementById("themeBtn");
  const themeBtn2 = document.getElementById("themeBtn2");
  themeBtn && themeBtn.addEventListener("click", toggleTheme);
  themeBtn2 && themeBtn2.addEventListener("click", () => {
    toggleTheme();
    closeSheet();
  });

  const burger = document.getElementById("burger");
  const sheet = document.getElementById("sheet");
  const closeSheetBtn = document.getElementById("closeSheet");
  const backdrop = document.getElementById("backdrop");

  function openSheet() {
    if (!sheet || !burger) return;
    sheet.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeSheet() {
    if (!sheet || !burger) return;
    sheet.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  burger && burger.addEventListener("click", () => {
    const hidden = sheet.getAttribute("aria-hidden") !== "false";
    hidden ? openSheet() : closeSheet();
  });
  closeSheetBtn && closeSheetBtn.addEventListener("click", closeSheet);
  backdrop && backdrop.addEventListener("click", closeSheet);

  document.querySelectorAll(".sheet__link").forEach(a => {
    a.addEventListener("click", closeSheet);
  });
})();