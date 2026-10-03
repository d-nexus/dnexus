# Tailwind: ya viene compilado

Las páginas cargan `css/tailwind.css` (unos 35 KB) y ya no usan el CDN de desarrollo,
que compilaba el CSS en el navegador de cada visitante.

## Cuándo recompilar
Solo si agregas o cambias clases de Tailwind en un HTML o en `main.js`
(por ejemplo, usas `bg-red-500` y antes no existía en el sitio).

## Cómo recompilar (necesitas Node.js)
    npx tailwindcss@3 -i ./input.css -o ./css/tailwind.css --minify

Sube después `css/tailwind.css` a tu repo (con Ctrl+Shift+R para ver el cambio).

## Archivos
- `tailwind.config.js`: colores propios y qué archivos se escanean.
- `input.css`: punto de entrada de Tailwind.
- `css/tailwind.css`: resultado compilado (este es el que usa el sitio).
- `css/styles.css`: estilos propios del sitio.
