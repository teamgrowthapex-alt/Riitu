const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const indexHtmlPath = path.join(dir, 'index.html');
const servicesHtmlPath = path.join(dir, 'services.html');

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const startMarker = '<!-- Our Solutions Section Start -->';
const endMarker = '<!-- Our Solutions Section End -->';

const startIndex = indexHtml.indexOf(startMarker);
const endIndex = indexHtml.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const ourSolutionsBlock = indexHtml.substring(startIndex, endIndex + endMarker.length);
    
    let servicesHtml = fs.readFileSync(servicesHtmlPath, 'utf8');
    
    // Check if it already exists
    if (servicesHtml.includes(startMarker)) {
        console.log('Our Solutions section already exists in services.html');
    } else {
        const insertionPointMarker = '<!--Services End-->';
        const insertionIndex = servicesHtml.indexOf(insertionPointMarker);
        
        if (insertionIndex !== -1) {
            servicesHtml = servicesHtml.substring(0, insertionIndex + insertionPointMarker.length) + '\n\n' + ourSolutionsBlock + '\n\n' + servicesHtml.substring(insertionIndex + insertionPointMarker.length);
            fs.writeFileSync(servicesHtmlPath, servicesHtml, 'utf8');
            console.log('Successfully injected Our Solutions into services.html');
        } else {
            console.log('Could not find insertion point in services.html');
        }
    }
} else {
    console.log('Could not find Our Solutions section in index.html');
}
