// Cambia el CDN de Tailwind (solo para desarrollo) por el CSS compilado css/tailwind.css.
// Uso:  node usar-tailwind-compilado.js
const fs = require('fs');
if (!fs.existsSync('css/tailwind.css') || fs.statSync('css/tailwind.css').size < 5000) {
  console.error('Falta css/tailwind.css (o está vacío). Primero compílalo con el comando de LEEME-TAILWIND.md.');
  process.exit(1);
}
const re = /[ \t]*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*<script>\s*tailwind\.config[\s\S]*?<\/script>\s*/;
let n = 0;
for (const f of fs.readdirSync('.').filter(x => x.endsWith('.html'))) {
  let s = fs.readFileSync(f, 'utf8');
  if (!re.test(s)) { console.log('- ' + f + ': ya estaba migrado o no usa el CDN'); continue; }
  s = s.replace(re, '');
  s = s.replace('</head>', '    <link rel="stylesheet" href="css/tailwind.css">\n</head>');
  fs.writeFileSync(f, s); n++;
  console.log('✔ ' + f);
}
console.log(n + ' páginas migradas.');
