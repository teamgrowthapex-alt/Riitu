const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const indexHtmlPath = path.join(dir, 'index.html');
const servicesHtmlPath = path.join(dir, 'services.html');

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const startMarker = '<!-- Learn & Grow Section Start -->';
const endMarker = '<!-- Learn & Grow Section End -->';

const startIndex = indexHtml.indexOf(startMarker);
const endIndex = indexHtml.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const learnAndGrowBlock = indexHtml.substring(startIndex, endIndex + endMarker.length);
    
    let servicesHtml = fs.readFileSync(servicesHtmlPath, 'utf8');
    
    // Check if it already exists
    if (servicesHtml.includes(startMarker)) {
        console.log('Learn & Grow section already exists in services.html');
    } else {
        // Insert it right after "Our Solutions Section End" or before "Footer wrapper start"
        const insertionPointMarker = '<!-- Footer wrapper start-->';
        const insertionIndex = servicesHtml.indexOf(insertionPointMarker);
        
        if (insertionIndex !== -1) {
            servicesHtml = servicesHtml.substring(0, insertionIndex) + learnAndGrowBlock + '\n\n' + servicesHtml.substring(insertionIndex);
            fs.writeFileSync(servicesHtmlPath, servicesHtml, 'utf8');
            console.log('Successfully injected Learn & Grow into services.html');
        } else {
            console.log('Could not find insertion point in services.html');
        }
    }
} else {
    console.log('Could not find Learn & Grow section in index.html');
}
