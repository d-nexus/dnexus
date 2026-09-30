# Compilar Tailwind (una sola vez, ~1 minuto)

Requiere Node.js instalado. Desde la carpeta del sitio:

1. Compilar el CSS:
   npx tailwindcss@3 -i ./input.css -o ./css/tailwind.css --minify

2. Cambiar las páginas del CDN al CSS compilado:
   node usar-tailwind-compilado.js

3. Abrir index.html y revisar que todo se vea igual.

Cada vez que uses una clase de Tailwind nueva, repite solo el paso 1.
Puedes borrar de tu repo: tailwind.config.js, input.css y estos scripts si no piensas recompilar,
pero conviene conservarlos.
