/* ============================================
   COOKIE CONSENT BANNER
   ============================================ */

(function () {
  if (localStorage.getItem('cookie-consent')) return;

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.innerHTML =
    '<div class="cookie-banner-content">' +
      '<p>Usamos cookies para mejorar tu experiencia. Consulta nuestra <a href="cookies.html">Política de Cookies</a> para más información.</p>' +
      '<div class="cookie-banner-buttons">' +
        '<button class="btn btn-primary cookie-accept">Aceptar</button>' +
        '<button class="btn btn-secondary cookie-reject">Solo necesarias</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(banner);

  banner.querySelector('.cookie-accept').addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.remove();
  });

  banner.querySelector('.cookie-reject').addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'rejected');
    banner.remove();
  });
})();
