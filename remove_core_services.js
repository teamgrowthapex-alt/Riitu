const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const servicesHtmlPath = path.join(dir, 'services.html');

if (fs.existsSync(servicesHtmlPath)) {
    let html = fs.readFileSync(servicesHtmlPath, 'utf8');
    
    const startMarker = '<!--Services Start-->';
    const endMarker = '<!--Services End-->';
    
    const startIndex = html.indexOf(startMarker);
    const endIndex = html.indexOf(endMarker);
    
    if (startIndex !== -1 && endIndex !== -1) {
        html = html.substring(0, startIndex) + html.substring(endIndex + endMarker.length);
        fs.writeFileSync(servicesHtmlPath, html, 'utf8');
        console.log('Removed Our Core Services section from services.html');
    } else {
        console.log('Could not find Services section bounds');
    }
}
