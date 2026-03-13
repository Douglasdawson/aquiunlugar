/* ============================================
   COOKIE CONSENT BANNER
   ============================================ */

(function () {
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
      '<p>Este sitio web utiliza cookies técnicas necesarias para su funcionamiento. Consulta nuestra <a href="cookies.html">Política de Cookies</a> para más información.</p>' +
      '<div class="cookie-banner-buttons">' +
        '<button class="btn btn-primary cookie-accept">Entendido</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(banner);

  banner.querySelector('.cookie-accept').addEventListener('click', function () {
    try { localStorage.setItem('cookie-consent', 'accepted'); } catch (e) { /* noop */ }
    banner.remove();
  });
})();
