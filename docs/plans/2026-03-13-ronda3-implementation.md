# Ronda 3 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Prepare aquiunlugar.com for production launch with real image structure, GA4 analytics (GDPR-compliant), blog with SEO local, and deployment documentation.

**Architecture:** Static HTML site served from Replit. No backend. GA4 loaded conditionally via cookie consent. Blog as static HTML pages in `public/blog/`. Image optimization via Sharp script.

**Tech Stack:** HTML5, CSS3, vanilla JS, Sharp (image optimization), Terser (JS minification), CleanCSS (CSS minification), Google Analytics 4.

---

### Task 1: Commit Ronda 2 changes

**Files:**
- All currently modified/untracked files

**Step 1: Stage and commit all Ronda 2 work**

```bash
git add public/aviso-legal.html public/privacidad.html public/cookies.html public/js/cookies.js public/index.html public/css/styles.css public/js/main.js public/sitemap.xml package.json .gitignore
git commit -m "feat: add legal pages (LSSI/GDPR), cookie consent banner, gallery with lightbox, testimonials, FAQ accordion, Instagram section, Google Maps integration, footer legal links"
```

---

### Task 2: Gallery and Instagram image structure

**Files:**
- Modify: `public/index.html:283-291` (gallery items)
- Modify: `public/index.html:556-563` (Instagram items)
- Modify: `public/css/styles.css` (gallery/Instagram image styles)

**Step 1: Replace gallery emoji placeholders with `<img>` tags in `public/index.html`**

Replace lines 283-291 (the `.galeria-grid` children) with:

```html
      <div class="galeria-grid stagger-children">
        <div class="galeria-item reveal" data-index="0"><img src="images/galeria-1.jpg" alt="Galería Aquí un lugar 1" loading="lazy"></div>
        <div class="galeria-item reveal" data-index="1"><img src="images/galeria-2.jpg" alt="Galería Aquí un lugar 2" loading="lazy"></div>
        <div class="galeria-item reveal" data-index="2"><img src="images/galeria-3.jpg" alt="Galería Aquí un lugar 3" loading="lazy"></div>
        <div class="galeria-item reveal" data-index="3"><img src="images/galeria-4.jpg" alt="Galería Aquí un lugar 4" loading="lazy"></div>
        <div class="galeria-item reveal" data-index="4"><img src="images/galeria-5.jpg" alt="Galería Aquí un lugar 5" loading="lazy"></div>
        <div class="galeria-item reveal" data-index="5"><img src="images/galeria-6.jpg" alt="Galería Aquí un lugar 6" loading="lazy"></div>
      </div>
```

**Step 2: Replace Instagram emoji placeholders with `<img>` tags in `public/index.html`**

Replace lines 556-563 (the `.instagram-grid` children) with:

```html
      <div class="instagram-grid stagger-children">
        <a href="https://www.instagram.com/aquiunlugar.creativo" target="_blank" rel="noopener noreferrer" class="instagram-item reveal"><img src="images/insta-1.jpg" alt="Instagram Aquí un lugar" loading="lazy"></a>
        <a href="https://www.instagram.com/aquiunlugar.creativo" target="_blank" rel="noopener noreferrer" class="instagram-item reveal"><img src="images/insta-2.jpg" alt="Instagram Aquí un lugar" loading="lazy"></a>
        <a href="https://www.instagram.com/aquiunlugar.creativo" target="_blank" rel="noopener noreferrer" class="instagram-item reveal"><img src="images/insta-3.jpg" alt="Instagram Aquí un lugar" loading="lazy"></a>
        <a href="https://www.instagram.com/aquiunlugar.creativo" target="_blank" rel="noopener noreferrer" class="instagram-item reveal"><img src="images/insta-4.jpg" alt="Instagram Aquí un lugar" loading="lazy"></a>
        <a href="https://www.instagram.com/aquiunlugar.creativo" target="_blank" rel="noopener noreferrer" class="instagram-item reveal"><img src="images/insta-5.jpg" alt="Instagram Aquí un lugar" loading="lazy"></a>
        <a href="https://www.instagram.com/aquiunlugar.creativo" target="_blank" rel="noopener noreferrer" class="instagram-item reveal"><img src="images/insta-6.jpg" alt="Instagram Aquí un lugar" loading="lazy"></a>
      </div>
```

**Step 3: Add CSS for images inside gallery and Instagram items in `public/css/styles.css`**

After the existing `.galeria-item span` rule, add:

```css
.galeria-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.instagram-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**Step 4: Add Google Maps iframe comment in `public/index.html`**

Replace the current iframe `src` attribute (line 537) with a comment explaining how to get the real URL:

```html
        <div class="contacto-map reveal">
          <!-- REEMPLAZAR URL: Ve a Google Maps > busca tu direccion > Compartir > Insertar un mapa > copia la URL del src -->
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2984.5!2d2.3568!3d41.4925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4b7c0c0c0c0c0%3A0x0!2sRambla+Rom%C3%A0+Barnes%2C+Premi%C3%A0+de+Mar!5e0!3m2!1ses!2ses!4v1710000000000"
            width="100%" height="100%" style="border:0"
            allowfullscreen loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Ubicación de Aquí un lugar">
          </iframe>
        </div>
```

**Step 5: Commit**

```bash
git add public/index.html public/css/styles.css
git commit -m "feat: prepare gallery/Instagram for real images, add Maps URL instructions"
```

---

### Task 3: Image optimization script update

**Files:**
- Modify: `scripts/optimize-images.js`

**Step 1: Extend `scripts/optimize-images.js` to process gallery and Instagram images**

Add after the hero image block (after line 41), before `run().catch(...)`:

```javascript
  // Optimize gallery images
  for (let i = 1; i <= 6; i++) {
    const src = path.join(IMAGES, `galeria-${i}.jpg`);
    if (fs.existsSync(src)) {
      await sharp(src)
        .resize({ width: 800, height: 800, fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(path.join(IMAGES, `galeria-${i}-opt.jpg`));
      console.log(`✓ galeria-${i}-opt.jpg`);
    }
  }

  // Optimize Instagram images
  for (let i = 1; i <= 6; i++) {
    const src = path.join(IMAGES, `insta-${i}.jpg`);
    if (fs.existsSync(src)) {
      await sharp(src)
        .resize({ width: 400, height: 400, fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(path.join(IMAGES, `insta-${i}-opt.jpg`));
      console.log(`✓ insta-${i}-opt.jpg`);
    }
  }
```

**Step 2: Commit**

```bash
git add scripts/optimize-images.js
git commit -m "feat: extend image optimization for gallery and Instagram images"
```

---

### Task 4: Documentation — IMAGENES.md and LEGAL.md

**Files:**
- Create: `docs/IMAGENES.md`
- Create: `docs/LEGAL.md`

**Step 1: Create `docs/IMAGENES.md`**

```markdown
# Como anadir imagenes al sitio

## Galeria (6 imagenes)

1. Prepara 6 fotos en formato JPG
2. Renombralas como: `galeria-1.jpg`, `galeria-2.jpg`, ..., `galeria-6.jpg`
3. Copialas a `public/images/`
4. Ejecuta `npm run build` para optimizarlas automaticamente
5. Las imagenes optimizadas se generaran como `galeria-X-opt.jpg`

**Tamano recomendado:** minimo 800x800px, formato cuadrado (1:1)
**Formato:** JPG
**Peso maximo recomendado por imagen:** 500KB (el script las comprimira)

## Instagram (6 imagenes)

1. Prepara 6 fotos en formato JPG
2. Renombralas como: `insta-1.jpg`, `insta-2.jpg`, ..., `insta-6.jpg`
3. Copialas a `public/images/`
4. Ejecuta `npm run build`

**Tamano recomendado:** minimo 400x400px, formato cuadrado (1:1)
**Formato:** JPG

## Hero

La imagen del hero se configura en `public/images/hero-local.jpg`.
El build genera automaticamente `hero-optimized.jpg` y `hero-local.webp`.

## Rebuild

Despues de anadir o cambiar imagenes:

```bash
npm run build
```

Esto regenera todos los archivos optimizados y minificados.
```

**Step 2: Create `docs/LEGAL.md`**

```markdown
# Checklist datos legales — completar antes de lanzar

## Archivos a editar

- `public/aviso-legal.html`
- `public/privacidad.html`

## Campos pendientes

- [ ] **Nombre o razon social** — reemplazar `[Nombre o razón social — pendiente de revisión]`
- [ ] **NIF/CIF** — reemplazar `[Pendiente de revisión]`
- [ ] **Correo electronico** — reemplazar `[Pendiente de revisión]`

## Donde encontrar los placeholders

Busca `pendiente de revisión` en ambos archivos. Hay 3 campos por archivo (6 en total).

## Recomendacion

Estos textos son borradores. Se recomienda revision por un profesional legal antes de publicar.
```

**Step 3: Commit**

```bash
git add docs/IMAGENES.md docs/LEGAL.md
git commit -m "docs: add image guide and legal checklist"
```

---

### Task 5: Google Analytics 4 + cookie consent integration

**Files:**
- Modify: `public/js/cookies.js`
- Modify: `public/cookies.html`

**Step 1: Rewrite `public/js/cookies.js` with GA4 integration**

Replace entire file with:

```javascript
/* ============================================
   COOKIE CONSENT + GOOGLE ANALYTICS 4
   ============================================ */

(function () {
  // --- GA4 Configuration ---
  // REEMPLAZAR: cambia este ID por tu ID de medicion de Google Analytics 4
  var GA_ID = 'G-XXXXXXXXXX';

  function loadGA4() {
    if (GA_ID === 'G-XXXXXXXXXX') return; // No cargar si no hay ID real
    if (document.getElementById('ga4-script')) return; // Ya cargado

    var script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // --- Load GA4 if already accepted ---
  var consent = localStorage.getItem('cookie-consent');
  if (consent === 'accepted') {
    loadGA4();
    return; // No mostrar banner
  }
  if (consent === 'rejected') return; // No mostrar banner, no cargar GA4

  // --- Show cookie banner ---
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
    localStorage.setItem('cookie-consent', 'accepted');
    banner.remove();
    loadGA4();
  });

  banner.querySelector('.cookie-reject').addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'rejected');
    banner.remove();
  });
})();
```

**Step 2: Update `public/cookies.html` — add Google Analytics to third-party cookies section**

After the Google Maps `<li>` inside the "Cookies de terceros" section, add:

```html
        <li><strong>Google Analytics:</strong> utilizamos Google Analytics 4 para analizar el uso del sitio web de forma agregada. Google puede establecer cookies como <code>_ga</code> y <code>_ga_*</code> con una duración de hasta 2 años. Solo se activan si aceptas las cookies. Puedes consultar la política de privacidad de Google en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</li>
```

**Step 3: Commit**

```bash
git add public/js/cookies.js public/cookies.html
git commit -m "feat: integrate GA4 with GDPR cookie consent, update cookie policy"
```

---

### Task 6: Blog structure — listing page

**Files:**
- Create: `public/blog.html`

**Step 1: Create `public/blog.html`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog — Aquí un lugar | Talleres creativos en Premià de Mar</title>
  <meta name="description" content="Consejos, inspiración y novedades sobre talleres creativos en Premià de Mar. Macramé, pintura, bordado y más en Aquí un lugar.">
  <link rel="canonical" href="https://aquiunlugar.com/blog.html">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Blog — Aquí un lugar">
  <meta property="og:description" content="Consejos, inspiración y novedades sobre talleres creativos en Premià de Mar.">
  <meta property="og:url" content="https://aquiunlugar.com/blog.html">
  <meta property="og:image" content="https://aquiunlugar.com/images/hero-optimized.jpg">
  <meta property="og:locale" content="es_ES">
  <meta property="og:site_name" content="Aquí un lugar">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Blog — Aquí un lugar">
  <meta name="twitter:description" content="Consejos, inspiración y novedades sobre talleres creativos en Premià de Mar.">
  <meta name="twitter:image" content="https://aquiunlugar.com/images/hero-optimized.jpg">

  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.min.css">
</head>
<body>

  <header class="legal-header">
    <nav class="container">
      <a href="/" class="nav-logo">Aquí un lugar</a>
    </nav>
  </header>

  <main class="blog-listing section-padding">
    <div class="container">
      <div class="text-center">
        <span class="section-label">Blog</span>
        <h1 class="section-title">Inspiración y novedades</h1>
        <div class="divider"></div>
        <p>Consejos creativos, novedades del espacio y todo lo que pasa en Aquí un lugar.</p>
      </div>
      <div class="blog-grid">
        <article class="blog-card">
          <div class="blog-card-img">
            <img src="images/hero-optimized.jpg" alt="Tu primer taller creativo" loading="lazy">
          </div>
          <div class="blog-card-body">
            <time datetime="2026-03-13">13 marzo 2026</time>
            <h2><a href="blog/primer-taller-creativo.html">Qué esperar de tu primer taller creativo</a></h2>
            <p>¿Nunca has hecho un taller de manualidades? Te contamos qué vas a encontrar, qué llevar y por qué no necesitas experiencia previa para pasarlo genial.</p>
            <a href="blog/primer-taller-creativo.html" class="blog-read-more">Leer más</a>
          </div>
        </article>
      </div>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-bottom">
        <p><a href="/" class="footer-back-link">Volver a Aquí un lugar</a></p>
      </div>
    </div>
  </footer>

  <script src="js/cookies.min.js"></script>
</body>
</html>
```

**Step 2: Commit**

```bash
git add public/blog.html
git commit -m "feat: add blog listing page"
```

---

### Task 7: Blog — example article with BlogPosting structured data

**Files:**
- Create: `public/blog/primer-taller-creativo.html`

**Step 1: Create `public/blog/primer-taller-creativo.html`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Qué esperar de tu primer taller creativo — Aquí un lugar</title>
  <meta name="description" content="Todo lo que necesitas saber antes de tu primer taller creativo en Premià de Mar. Sin experiencia previa, con todo incluido y mucha inspiración.">
  <link rel="canonical" href="https://aquiunlugar.com/blog/primer-taller-creativo.html">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="Qué esperar de tu primer taller creativo">
  <meta property="og:description" content="Todo lo que necesitas saber antes de tu primer taller creativo en Premià de Mar.">
  <meta property="og:url" content="https://aquiunlugar.com/blog/primer-taller-creativo.html">
  <meta property="og:image" content="https://aquiunlugar.com/images/hero-optimized.jpg">
  <meta property="og:locale" content="es_ES">
  <meta property="og:site_name" content="Aquí un lugar">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Qué esperar de tu primer taller creativo">
  <meta name="twitter:description" content="Todo lo que necesitas saber antes de tu primer taller creativo en Premià de Mar.">
  <meta name="twitter:image" content="https://aquiunlugar.com/images/hero-optimized.jpg">

  <!-- Structured Data: BlogPosting -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Qué esperar de tu primer taller creativo",
    "description": "Todo lo que necesitas saber antes de tu primer taller creativo en Premià de Mar.",
    "image": "https://aquiunlugar.com/images/hero-optimized.jpg",
    "datePublished": "2026-03-13",
    "dateModified": "2026-03-13",
    "author": {
      "@type": "Organization",
      "name": "Aquí un lugar"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Aquí un lugar",
      "url": "https://aquiunlugar.com"
    },
    "mainEntityOfPage": "https://aquiunlugar.com/blog/primer-taller-creativo.html"
  }
  </script>

  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.min.css">
</head>
<body>

  <header class="legal-header">
    <nav class="container">
      <a href="/" class="nav-logo">Aquí un lugar</a>
    </nav>
  </header>

  <main class="blog-article section-padding">
    <div class="container">
      <article class="article-content">
        <a href="../blog.html" class="article-back">← Volver al blog</a>
        <time datetime="2026-03-13">13 marzo 2026</time>
        <h1>Qué esperar de tu primer taller creativo</h1>

        <div class="article-hero">
          <img src="../images/hero-optimized.jpg" alt="Interior de Aquí un lugar durante un taller" loading="lazy">
        </div>

        <p>Si nunca has hecho un taller creativo, puede que te surjan mil preguntas: ¿voy a saber hacerlo? ¿Qué tengo que llevar? ¿Y si no me sale bien? Tranquila, te contamos todo lo que necesitas saber.</p>

        <h2>No necesitas experiencia</h2>
        <p>En serio. Nuestros talleres están pensados para todos los niveles, incluido el nivel "nunca he cogido un pincel en mi vida". Cada sesión está guiada paso a paso por nuestras monitoras, que te acompañan de principio a fin. El objetivo no es crear una obra maestra, sino disfrutar del proceso.</p>

        <h2>Todo está incluido</h2>
        <p>Cuando reservas un taller en Aquí un lugar, no necesitas traer nada. Los materiales, las herramientas, el espacio y la guía están incluidos en el precio. Tú solo ven con ganas y ropa cómoda (por si acaso alguna pintura decide ir a su aire).</p>

        <h2>Un espacio pensado para ti</h2>
        <p>Aquí un lugar no es un aula ni un estudio frío. Es un espacio acogedor en Premià de Mar, pensado para que te sientas a gusto desde el primer momento. Música tranquila, luz natural, materiales de calidad y un ambiente donde nadie te juzga.</p>

        <h2>¿Qué talleres puedes hacer?</h2>
        <p>Tenemos talleres de macramé, pintura, bordado, mosaiquismo, customización de ropa y decoupage. Cada uno tiene su encanto y no necesitas saber nada de ninguno para apuntarte. Puedes <a href="/#talleres">ver todos los talleres</a> en nuestra web.</p>

        <h2>¿Cómo reservo?</h2>
        <p>Súper fácil: escríbenos por <a href="https://wa.me/34676807577?text=Hola!%20Quiero%20reservar%20un%20taller%20en%20Aquí%20un%20lugar">WhatsApp</a> y te confirmamos disponibilidad. Sin formularios eternos, sin complicaciones.</p>

        <h2>Lo que te llevas a casa</h2>
        <p>Además de tu pieza terminada (sí, te la llevas), te llevas la satisfacción de haber creado algo con tus propias manos. Y probablemente unas ganas enormes de volver.</p>

        <div class="article-cta">
          <p>¿Te animas a probar?</p>
          <a href="https://wa.me/34676807577?text=Hola!%20Quiero%20reservar%20mi%20primer%20taller" class="btn btn-whatsapp"><span role="img" aria-label="Mensaje">💬</span> Reservar mi primer taller</a>
        </div>
      </article>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-bottom">
        <p><a href="/" class="footer-back-link">Volver a Aquí un lugar</a></p>
      </div>
    </div>
  </footer>

  <script src="../js/cookies.min.js"></script>
</body>
</html>
```

**Step 2: Commit**

```bash
mkdir -p public/blog
git add public/blog/primer-taller-creativo.html
git commit -m "feat: add first blog article with BlogPosting structured data"
```

---

### Task 8: Blog CSS styles

**Files:**
- Modify: `public/css/styles.css`

**Step 1: Add blog styles to `public/css/styles.css`**

Add before the `/* ---------- FOCUS STATES ---------- */` section:

```css
/* ---------- BLOG ---------- */

.blog-listing {
  padding-top: 3rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.blog-card {
  background: var(--cream);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s ease;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(61, 43, 31, 0.08);
}

.blog-card-img {
  height: 220px;
  overflow: hidden;
}

.blog-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-card-body {
  padding: 1.5rem;
}

.blog-card-body time {
  font-size: 0.75rem;
  color: var(--text-light);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.blog-card-body h2 {
  font-size: 1.4rem;
  margin: 0.5rem 0 0.8rem;
}

.blog-card-body h2 a {
  color: var(--brown-dark);
  text-decoration: none;
}

.blog-card-body h2 a:hover {
  color: var(--terra);
}

.blog-card-body p {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.blog-read-more {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--terra);
  text-decoration: none;
  letter-spacing: 0.5px;
}

.blog-read-more:hover {
  text-decoration: underline;
}

/* ---------- BLOG ARTICLE ---------- */

.blog-article {
  padding-top: 3rem;
}

.article-content {
  max-width: 740px;
  margin: 0 auto;
}

.article-back {
  font-size: 0.85rem;
  color: var(--terra);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1rem;
}

.article-back:hover {
  text-decoration: underline;
}

.article-content time {
  font-size: 0.75rem;
  color: var(--text-light);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.article-content h1 {
  color: var(--brown-dark);
  margin: 0.5rem 0 2rem;
}

.article-hero {
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
}

.article-hero img {
  width: 100%;
  height: auto;
  display: block;
}

.article-content h2 {
  color: var(--brown-dark);
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  margin: 2rem 0 0.8rem;
}

.article-content p {
  margin-bottom: 1.2rem;
  max-width: none;
}

.article-content a {
  color: var(--terra);
}

.article-content a:hover {
  text-decoration: underline;
}

.article-cta {
  margin-top: 3rem;
  padding: 2.5rem;
  background: var(--cream);
  border-radius: 16px;
  text-align: center;
}

.article-cta p {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  color: var(--brown-dark);
  margin-bottom: 1.5rem;
}
```

**Step 2: Add blog responsive rules**

In the `@media (max-width: 768px)` block, add:

```css
  .blog-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
```

**Step 3: Commit**

```bash
git add public/css/styles.css
git commit -m "feat: add blog listing and article CSS styles"
```

---

### Task 9: SEO local + footer blog link + sitemap

**Files:**
- Modify: `public/index.html` (JSON-LD, meta description, title, footer)
- Modify: `public/sitemap.xml`

**Step 1: Add `geo` and `areaServed` to JSON-LD in `public/index.html`**

In the LocalBusiness JSON-LD (around line 59), after the `"address"` block and before `"sameAs"`, add:

```json
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.4925,
      "longitude": 2.3568
    },
    "areaServed": {
      "@type": "Place",
      "name": "Premià de Mar, Maresme, Barcelona"
    },
```

**Step 2: Update `<title>` to include location**

Change:
```html
<title>Aquí un lugar — Espacio Creativo</title>
```
To:
```html
<title>Aquí un lugar — Espacio Creativo en Premià de Mar</title>
```

**Step 3: Update `<meta name="description">` to include location**

Change:
```html
<meta name="description" content="Un espacio donde crear con tus manos, desconectar del ruido y conectar contigo. Talleres de macramé, pintura, bordado, mosaiquismo y mucho más.">
```
To:
```html
<meta name="description" content="Espacio creativo en Premià de Mar. Talleres de macramé, pintura, bordado, mosaiquismo y más. Crea con tus manos y desconecta del ruido.">
```

**Step 4: Update OG/Twitter titles and descriptions to match**

Update `og:title`, `og:description`, `twitter:title`, `twitter:description` with the same new values.

**Step 5: Add "Blog" to footer links in `public/index.html`**

After the last `<li>` in `.footer-links` (Contacto), add:

```html
          <li><a href="blog.html">Blog</a></li>
```

**Step 6: Update `public/sitemap.xml`**

Add blog URLs:

```xml
  <url>
    <loc>https://aquiunlugar.com/blog.html</loc>
    <lastmod>2026-03-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://aquiunlugar.com/blog/primer-taller-creativo.html</loc>
    <lastmod>2026-03-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
```

**Step 7: Commit**

```bash
git add public/index.html public/sitemap.xml
git commit -m "feat: add SEO local optimization, blog footer link, update sitemap"
```

---

### Task 10: Deployment documentation

**Files:**
- Create: `docs/DEPLOY.md`

**Step 1: Create `docs/DEPLOY.md`**

```markdown
# Despliegue — Aquí un lugar

## Antes de desplegar

Ejecuta el build para regenerar archivos minificados y optimizar imagenes:

```bash
npm run build
```

Esto ejecuta:
1. `build:css` — minifica `styles.css` -> `styles.min.css`
2. `build:js` — minifica `main.js` -> `main.min.js`
3. `build:cookies` — minifica `cookies.js` -> `cookies.min.js`
4. `build:images` — optimiza imagenes con Sharp

## Despliegue en Replit

El proyecto esta configurado para Replit con el archivo `.replit`.
El comando de build (`npm run build`) se ejecuta automaticamente antes del deploy.
El servidor sirve la carpeta `public/` en el puerto 3000.

## Checklist pre-lanzamiento

- [ ] Datos legales completados (ver `docs/LEGAL.md`)
- [ ] ID de Google Analytics 4 configurado en `public/js/cookies.js` (reemplazar `G-XXXXXXXXXX`)
- [ ] URL de Google Maps actualizada en `public/index.html` (buscar el comentario REEMPLAZAR URL)
- [ ] Imagenes de galeria anadidas (ver `docs/IMAGENES.md`)
- [ ] Imagenes de Instagram anadidas (ver `docs/IMAGENES.md`)
- [ ] `npm run build` ejecutado sin errores
- [ ] Sitio verificado localmente con `npm start`
```

**Step 2: Commit**

```bash
git add docs/DEPLOY.md
git commit -m "docs: add deployment guide and pre-launch checklist"
```

---

### Task 11: Final build and verification

**Step 1: Run full build**

```bash
npm run build
```

Expected: all CSS, JS, and images built without errors.

**Step 2: Verify locally**

```bash
npm start
```

Check at http://localhost:3000:
- Gallery section shows fallback backgrounds (no images yet)
- Instagram section shows fallback backgrounds
- Blog page loads at `/blog.html`
- Blog article loads at `/blog/primer-taller-creativo.html`
- Cookie banner appears on first visit
- Accepting cookies stores consent in localStorage
- Legal pages load and have correct styling
- Footer shows "Blog" link
- Title includes "Premià de Mar"

**Step 3: Commit minified assets**

```bash
npm run build
git add public/css/styles.min.css public/js/main.min.js public/js/cookies.min.js
git commit -m "chore: rebuild minified assets for Ronda 3"
```
