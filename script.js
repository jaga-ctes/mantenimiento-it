// ============================================================
// JAGĀ — landing script
// Menú mobile + titular rotativo. Sin dependencias externas.
// ============================================================

(function () {
  "use strict";

  // ---------- Menú mobile ----------
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  var toggleIcon = document.getElementById("nav-toggle-icon");

  function closeMenu() {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggleIcon.innerHTML = '<use href="#i-menu"></use>';
  }

  function openMenu() {
    links.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggleIcon.innerHTML = '<use href="#i-x"></use>';
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.contains("is-open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    // Cerrar el menú al elegir un link (viaje por ancla en la misma página)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // ---------- Titular rotativo del hero ----------
  var headlines = [
    "¿La compu tarda una eternidad en arrancar?",
    "¿Necesitas estudiar y tu compu está super lenta?",
    "¿Están seguros los datos de tus clientes?",
    "¿Tenés respaldo de tus documentos importantes?",
    "¿Querés recuperar archivos que creías perdidos?",
    "Sospechás que tu equipo tiene algún virus o accesos no autorizados?",
    "¿Tu red te expone a riesgos sin saberlo?",
    "¿Es segura la infraestructura de tu empresa?"
  ];
  var headlineEl = document.getElementById("rotating-headline");
  var headlineIndex = 0;

  if (headlineEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(function () {
      headlineEl.style.opacity = "0";
      setTimeout(function () {
        headlineIndex = (headlineIndex + 1) % headlines.length;
        headlineEl.textContent = headlines[headlineIndex];
        headlineEl.style.opacity = "1";
      }, 350);
    }, 4200);
  }
})();
