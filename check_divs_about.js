const fs = require('fs');
const html = fs.readFileSync('d:\\\\riittu\\\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\\\mainfile\\\\astrology-placeholder\\\\version-1\\\\about.html', 'utf8');
const openCount = (html.match(/<div/g) || []).length;
const closeCount = (html.match(/<\\/div>/g) || []).length;
console.log(`about.html - Open: ${openCount}, Close: ${closeCount}`);
