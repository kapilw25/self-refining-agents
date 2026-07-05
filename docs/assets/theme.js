/* Shared light/dark theme toggle. Persists choice in localStorage. */
(function () {
  var root = document.documentElement;
  var KEY = "sds-theme";
  function sysDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function current() {
    return root.getAttribute("data-theme") || stored() || (sysDark() ? "dark" : "light");
  }
  function apply(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    var lbl = document.getElementById("themeLabel");
    if (lbl) lbl.textContent = t === "dark" ? "Dark" : "Light";
  }
  // apply as early as possible
  apply(current());
  document.addEventListener("DOMContentLoaded", function () {
    apply(current());
    var btn = document.getElementById("themeBtn");
    if (btn) btn.addEventListener("click", function () {
      apply(current() === "dark" ? "light" : "dark");
    });
  });
})();
