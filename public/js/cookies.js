/* ============================================
   COOKIE CONSENT BANNER
   ============================================ */

(function () {
  'use strict';
  let consent;
  try {
    consent = localStorage.getItem('cookie-consent');
  } catch (e) {
    consent = null;
  }

  if (consent) return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.innerHTML =
    '<div class="cookie-banner-content">' +
      '<p>Utilizamos cookies técnicas necesarias. Consulta nuestra <a href="cookies.html">Política de Cookies</a>.</p>' +
      '<div class="cookie-banner-buttons">' +
        '<button class="btn btn-secondary cookie-reject">Solo necesarias</button>' +
        '<button class="btn btn-primary cookie-accept">Aceptar todas</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(banner);

  banner.querySelector('.cookie-accept').addEventListener('click', function () {
    try { localStorage.setItem('cookie-consent', 'accepted'); } catch (e) { /* noop */ }
    banner.remove();
  });

  banner.querySelector('.cookie-reject').addEventListener('click', function () {
    try { localStorage.setItem('cookie-consent', 'necessary'); } catch (e) { /* noop */ }
    banner.remove();
  });
})();
