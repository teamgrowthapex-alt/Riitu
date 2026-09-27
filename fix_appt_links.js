const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const indexPath = path.join(dir, 'index.html');

let html = fs.readFileSync(indexPath, 'utf8');
html = html.replace(/href="appointment\?/g, 'href="appointment.html?');
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Fixed appointment links in index.html');
