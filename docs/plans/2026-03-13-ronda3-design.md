# Ronda 3 — Produccion, Analytics, Blog y SEO local

## Contexto

Rondas anteriores completadas:
- Ronda 1: infraestructura (SEO, favicon, build pipeline, accesibilidad, 404)
- Ronda 2: contenido (legal pages, cookies, galeria, testimonios, FAQ, Instagram, Google Maps)

Ronda 3 cierra el ciclo pre-lanzamiento: datos reales, tracking, contenido organico y documentacion.

**Hosting:** Replit (ya configurado con `.replit`)
**Canal de contacto:** WhatsApp (sin formulario de email)

---

## Seccion 1 — Produccion y datos reales

### 1.1 Google Maps URL
- Reemplazar URL aproximada del iframe por comentario con instrucciones claras
- El usuario pegara la URL real desde Google Maps > Compartir > Insertar mapa

### 1.2 Imagenes de galeria e Instagram
- Sustituir emojis por `<img>` con rutas predecibles: `images/galeria-1.jpg` ... `galeria-6.jpg`, `images/insta-1.jpg` ... `insta-6.jpg`
- Fallback CSS con fondo cream cuando la imagen no existe
- Crear `docs/IMAGENES.md` con instrucciones: tamano recomendado, formato, como anadir y rebuild

### 1.3 Script de optimizacion
- Ampliar `scripts/optimize-images.js` para procesar imagenes de galeria e Instagram automaticamente

### 1.4 Datos legales
- Crear `docs/LEGAL.md` con checklist de campos a rellenar antes de lanzar

---

## Seccion 2 — Google Analytics 4 + Cookies

### 2.1 Script GA4
- Snippet `gtag.js` con placeholder `G-XXXXXXXXXX` en index.html y 3 paginas legales
- Comentario indicando donde cambiar el ID

### 2.2 Integracion con banner de cookies
- Modificar `cookies.js`:
  - "Aceptar" -> carga GA4 dinamicamente
  - "Solo necesarias" -> GA4 no se carga
  - Si ya acepto (localStorage) -> GA4 se carga al inicio
- Cumplimiento GDPR: no trackear sin consentimiento

### 2.3 Actualizar cookies.html
- Anadir Google Analytics a la lista de cookies de terceros

### 2.4 Sin cambios en build
- GA4 se carga desde CDN de Google

---

## Seccion 3 — Blog + SEO local

### 3.1 Pagina blog.html
- Listado de articulos con estetica del sitio
- Header con logo -> `/`, grid de cards (titulo, fecha, extracto, "Leer mas")
- Sin `noindex` (queremos indexacion)

### 3.2 Articulo de ejemplo
- `blog/primer-taller-creativo.html`
- Contenido: "Que esperar de tu primer taller creativo en Aqui un lugar"
- Estructura: header, imagen placeholder, cuerpo, CTA a WhatsApp, enlace a talleres
- Structured data `BlogPosting`

### 3.3 Estructura de archivos
- Carpeta `public/blog/` para articulos individuales
- HTML estatico (sin backend)

### 3.4 Navegacion
- "Blog" en footer links (no en nav principal)

### 3.5 SEO local
- Anadir `geo` y `areaServed` al JSON-LD de LocalBusiness
- Reforzar title y meta description con "Premia de Mar"
- Structured data BlogPosting en articulo
- Anadir URLs del blog a sitemap.xml

---

## Seccion 4 — Ajustes finales

### 4.1 Commit Ronda 2
- Commitear cambios pendientes antes de empezar Ronda 3

### 4.2 Documentacion de despliegue
- `docs/DEPLOY.md`: instrucciones de build, Replit, checklist pre-lanzamiento

### 4.3 Meta tags del blog
- OG tags y Twitter Cards para blog.html y articulo de ejemplo
- `<link rel="canonical">` en cada pagina nueva

### 4.4 Build final
- Regenerar minificados y verificar que todo carga
