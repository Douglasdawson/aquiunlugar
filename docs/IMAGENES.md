# Guía de imágenes

## Galería

Coloca 6 imágenes en `public/images/` con estos nombres:

- `galeria-1.jpg` … `galeria-6.jpg`

Requisitos: formato JPG, cuadradas, mínimo 800×800 px, máximo 500 KB cada una.

## Instagram

Coloca 6 imágenes en `public/images/`:

- `insta-1.jpg` … `insta-6.jpg`

Requisitos: formato JPG, cuadradas, mínimo 400×400 px.

## Hero

La imagen hero se configura en `public/images/hero-local.jpg`. El proceso de build genera automáticamente versiones optimizadas (WebP, distintos tamaños).

## Después de añadir imágenes

Ejecuta:

```bash
npm run build
```

Esto regenera las versiones optimizadas y actualiza las referencias en el HTML.
