// ============================================================
// JAGĀ — landing script
// Menú mobile + titular rotativo + flecha "Volver arriba". Sin dependencias externas.
// ============================================================

(function () {
  "use strict";

  // ---------- Menú mobile ----------
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  var toggleUse = document.getElementById("nav-toggle-use");

  function closeMenu() {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggleUse.setAttribute("href", "#i-menu");
  }

  function openMenu() {
    links.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggleUse.setAttribute("href", "#i-x");
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
    "¿Necesitás estudiar y tu compu está súper lenta?",
    "¿Están seguros los datos de tus clientes?",
    "¿Tenés respaldo de tus documentos importantes?",
    "¿Querés recuperar archivos que creías perdidos?",
    "¿Sospechás que tu equipo tiene algún virus o accesos no autorizados?",
    "¿Tu red te expone a riesgos sin saberlo?",
    "¿Es segura la infraestructura de tu empresa?"
  ];
  var headlineEl = document.getElementById("rotating-headline");
  var headlineArea = document.getElementById("hero-text");
  var pauseBtn = document.getElementById("headline-pause");
  var headlineIndex = 0;
  var userPaused = false;   // botón "Pausar frases"
  var hoverPaused = false;  // mouse o foco dentro del área

  if (headlineEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (pauseBtn) {
      pauseBtn.hidden = false;
      pauseBtn.addEventListener("click", function () {
        userPaused = !userPaused;
        pauseBtn.setAttribute("aria-pressed", userPaused ? "true" : "false");
      });
    }
    if (headlineArea) {
      headlineArea.addEventListener("mouseenter", function () { hoverPaused = true; });
      headlineArea.addEventListener("mouseleave", function () { hoverPaused = false; });
      headlineArea.addEventListener("focusin", function () { hoverPaused = true; });
      headlineArea.addEventListener("focusout", function (e) {
        if (!headlineArea.contains(e.relatedTarget)) hoverPaused = false;
      });
    }

    setInterval(function () {
      if (userPaused || hoverPaused) return;
      headlineEl.style.opacity = "0";
      setTimeout(function () {
        headlineIndex = (headlineIndex + 1) % headlines.length;
        headlineEl.textContent = headlines[headlineIndex];
        headlineEl.style.opacity = "1";
      }, 350);
    }, 4200);
  }

  // ---------- Flecha "Volver arriba" ----------
  // Aparece después de una pantalla de scroll (cuando el comienzo ya no se ve, en cualquier dispositivo).
  // Lleva al tope y deja el foco en el logo del encabezado (#arriba). Suave solo sin movimiento reducido.
  var toTop = document.getElementById("volver-arriba");
  var topTarget = document.getElementById("arriba");
  if (toTop) {
    var ticking = false;
    var updateToTop = function () {
      ticking = false;
      toTop.classList.toggle("is-visible", window.scrollY > window.innerHeight);
    };
    var requestUpdate = function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(updateToTop); }
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    updateToTop();

    toTop.addEventListener("click", function (e) {
      e.preventDefault();
      var smooth = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
      try { window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "instant" }); }
      catch (err) { window.scrollTo(0, 0); }
      if (topTarget) topTarget.focus({ preventScroll: true });
    });
  }
})();
