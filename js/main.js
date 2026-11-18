/*
 * Marthe Trygg Kobro – portfolio router
 *
 * The whole site is one page (index.html). The home page and each project
 * ("case") are separate blocks; this script shows one of them based on the
 * URL hash:
 *
 *   #studio, #aidn, ...   → show that case page
 *   #prosjekter, #om-meg  → show the home page and scroll to that section
 *   (no hash)             → show the home page from the top
 *
 * To add a project: add an <article class="case" id="view-NAME"> block in
 * index.html, a row linking to #NAME in the project index, and NAME to
 * CASES below (in the same order as the index).
 *
 * Note: this file was written with AI assistance (Claude, by Anthropic).
 */
(function () {
  "use strict";

  var CASES = ["studio", "aidn", "forsikring", "aldring-og-helse", "motione", "daman", "postbud"];
  var SITE_TITLE = "Marthe Trygg Kobro";
  var HOME_TITLE = SITE_TITLE + " – Portefølje";

  var home = document.getElementById("view-home");
  var views = {};
  CASES.forEach(function (name) {
    views[name] = document.getElementById("view-" + name);
  });

  // Remembers the last case shown, so "← Portefølje" returns to its row.
  var lastCase = null;

  function showCase(name) {
    var heading = views[name].querySelector("h1");
    lastCase = name;
    window.scrollTo(0, 0);
    document.title = heading.textContent + " – " + SITE_TITLE;
    // Move focus to the heading so screen readers announce the new page.
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }

  function showHome(target) {
    document.title = HOME_TITLE;

    // Coming back from a case: scroll to that project's row in the index.
    if (target === "prosjekter" && lastCase) {
      var row = home.querySelector('a[href="#' + lastCase + '"]');
      lastCase = null;
      if (row) {
        row.scrollIntoView({ block: "center" });
        row.focus({ preventScroll: true });
        return;
      }
    }

    var section = target ? document.getElementById(target) : null;
    if (section) section.scrollIntoView();
    else window.scrollTo(0, 0);
  }

  function route() {
    var target = decodeURIComponent(location.hash.replace(/^#/, ""));
    var isCase = CASES.indexOf(target) !== -1;

    home.hidden = isCase;
    document.body.classList.toggle("is-case", isCase);
    CASES.forEach(function (name) {
      views[name].hidden = name !== target;
    });

    if (isCase) showCase(target);
    else showHome(target);
  }

  window.addEventListener("hashchange", route);
  route();
})();
