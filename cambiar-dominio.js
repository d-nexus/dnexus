// Cambia la URL base del sitio en todos los archivos (canonical, Open Graph, JSON-LD, sitemap, robots).
// Uso:  node cambiar-dominio.js https://tudominio.com/
const fs = require('fs');
const OLD = 'https://d-nexus.github.io/dnexus/';
let neu = process.argv[2];
if (!neu || !/^https:\/\/[^\s]+$/.test(neu)) { console.error('Uso: node cambiar-dominio.js https://tudominio.com/'); process.exit(1); }
if (!neu.endsWith('/')) neu += '/';
let total = 0;
for (const f of fs.readdirSync('.').filter(x => /\.(html|xml|txt)$/.test(x))) {
  const s = fs.readFileSync(f, 'utf8');
  const n = s.split(OLD).length - 1;
  if (n) { fs.writeFileSync(f, s.split(OLD).join(neu)); console.log('✔ ' + f + ' (' + n + ')'); total += n; }
}
console.log(total + ' reemplazos. Recuerda regenerar img/og-image.jpg si quieres mostrar el nuevo dominio en la imagen.');
