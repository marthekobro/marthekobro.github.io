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
 * Further down, a second small block lets visitors drag wide diagrams
 * (.pan boxes) sideways with the mouse or trackpad.
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


/*
 * Drag to pan: wide diagrams in a .pan box can be grabbed and dragged
 * sideways with a mouse, or with a trackpad click-and-drag. Two-finger
 * swipes and touch screens already scroll the box natively, so this only
 * handles mouse-type pointers. The cursor shows an open hand, and a closed
 * hand while dragging (styles in css/style.css, section 6).
 */
(function () {
  "use strict";

  document.querySelectorAll(".pan").forEach(function (box) {
    var startX = 0;        // pointer position when the drag started
    var startScroll = 0;   // box scroll position when the drag started

    // Stop the browser from dragging the image itself as a file.
    box.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    box.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      startX = event.clientX;
      startScroll = box.scrollLeft;
      box.classList.add("is-dragging");
      box.setPointerCapture(event.pointerId);
    });

    box.addEventListener("pointermove", function (event) {
      if (!box.classList.contains("is-dragging")) return;
      box.scrollLeft = startScroll - (event.clientX - startX);
    });

    function stop(event) {
      if (!box.classList.contains("is-dragging")) return;
      box.classList.remove("is-dragging");
      box.releasePointerCapture(event.pointerId);
    }
    box.addEventListener("pointerup", stop);
    box.addEventListener("pointercancel", stop);
  });
})();
