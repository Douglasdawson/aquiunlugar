/* ============================================
   COOKIE CONSENT BANNER + GA4 INTEGRATION
   ============================================ */

// Replace with your actual GA4 Measurement ID
var GA_ID = 'G-XXXXXXXXXX';

function loadGA4() {
  if (GA_ID === 'G-XXXXXXXXXX') return;
  if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) return;

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
}

(function () {
  var consent;
  try {
    consent = localStorage.getItem('cookie-consent');
  } catch (e) {
    consent = null;
  }

  if (consent === 'accepted') {
    loadGA4();
    return;
  }

  if (consent === 'rejected') return;

  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.innerHTML =
    '<div class="cookie-banner-content">' +
      '<p>Usamos cookies para mejorar tu experiencia y analizar el uso del sitio. Consulta nuestra <a href="cookies.html">Política de Cookies</a> para más información.</p>' +
      '<div class="cookie-banner-buttons">' +
        '<button class="btn btn-primary cookie-accept">Aceptar</button>' +
        '<button class="btn btn-secondary cookie-reject">Solo necesarias</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(banner);

  banner.querySelector('.cookie-accept').addEventListener('click', function () {
    try { localStorage.setItem('cookie-consent', 'accepted'); } catch (e) { /* noop */ }
    banner.remove();
    loadGA4();
  });

  banner.querySelector('.cookie-reject').addEventListener('click', function () {
    try { localStorage.setItem('cookie-consent', 'rejected'); } catch (e) { /* noop */ }
    banner.remove();
  });
})();
