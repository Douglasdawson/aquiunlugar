# Despliegue — Aquí un lugar

## Antes de desplegar

Ejecuta `npm run build` para regenerar los archivos minificados y optimizar las imagenes. Este comando ejecuta los siguientes pasos:

1. **build:css** — Minifica `public/css/styles.css` y genera `public/css/styles.min.css`. Reduce el tamano del archivo eliminando espacios, comentarios y caracteres innecesarios.
2. **build:js** — Minifica `public/js/main.js` y genera `public/js/main.min.js`. Comprime el JavaScript principal del sitio para una carga mas rapida.
3. **build:cookies** — Minifica `public/js/cookies.js` y genera `public/js/cookies.min.js`. Comprime el script de gestion de cookies y consentimiento GDPR.
4. **build:images** — Optimiza las imagenes del directorio `public/images/` utilizando Sharp. Redimensiona y comprime las imagenes para mejorar el rendimiento de carga.

## Despliegue en Replit

El proyecto esta configurado para desplegarse en Replit mediante el archivo `.replit`. El comando de build se ejecuta automaticamente antes del despliegue. El servidor sirve la carpeta `public/` en el puerto 3000.

Para desplegar:

1. Importa el repositorio en Replit.
2. Replit detectara la configuracion del archivo `.replit`.
3. El build se ejecutara automaticamente antes de cada despliegue.
4. El sitio estara disponible en la URL proporcionada por Replit.

## Checklist pre-lanzamiento

- [ ] Datos legales completados (ver `docs/LEGAL.md`)
- [ ] ID de Google Analytics 4 configurado en `public/js/cookies.js` (reemplazar `G-XXXXXXXXXX`)
- [ ] URL de Google Maps actualizada en `public/index.html` (buscar comentario `REEMPLAZAR URL`)
- [ ] Imagenes de galeria anadidas (ver `docs/IMAGENES.md`)
- [ ] Imagenes de Instagram anadidas (ver `docs/IMAGENES.md`)
- [ ] `npm run build` ejecutado sin errores
- [ ] Sitio verificado localmente con `npm start`
