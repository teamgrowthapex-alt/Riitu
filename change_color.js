const fs = require('fs');
const path = require('path');

const filePath = path.join('d:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// Replace purple with orange
html = html.replace(/#7b4397/g, '#ff7700');
html = html.replace(/#570680/g, '#e66a00');

// There might be some other purples but these two were explicitly found in the grep
// Save the file
fs.writeFileSync(filePath, html, 'utf8');
console.log('Colors replaced in index.html');
