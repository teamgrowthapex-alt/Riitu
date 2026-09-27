const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const aboutPath = path.join(dir, 'about.html');
const servicesPath = path.join(dir, 'services.html');

let aboutHtml = fs.readFileSync(aboutPath, 'utf8');

const startMarker = '<!-- Our Services Start (Screenshot 1 & 2 Layout) -->';
const endMarker = '<!-- Our Services End -->';

const startIndex = aboutHtml.indexOf(startMarker);
const endIndex = aboutHtml.indexOf(endMarker) + endMarker.length;

if (startIndex !== -1 && endIndex !== -1) {
    let servicesSection = aboutHtml.substring(startIndex, endIndex);
    
    // Update the links in the section
    const links = [
        'career.html',
        'marriage.html',
        'worship_lesson.html',
        'pregnancy.html',
        'manglik_dosha.html',
        'kundli_dosha.html',
        'festivals.html',
        'name_analysis.html'
    ];
    
    let linkIndex = 0;
    // We want to replace href="services" with the new page URLs
    servicesSection = servicesSection.replace(/href="services"/g, (match) => {
        const newHref = `href="${links[linkIndex]}"`;
        linkIndex = (linkIndex + 1) % links.length;
        return newHref;
    });

    let servicesHtml = fs.readFileSync(servicesPath, 'utf8');
    const insertPoint = '<!--Breadcrumb end-->';
    const insertIndex = servicesHtml.indexOf(insertPoint);
    
    if (insertIndex !== -1) {
        servicesHtml = servicesHtml.substring(0, insertIndex + insertPoint.length) + 
                       '\n\n' + servicesSection + '\n' + 
                       servicesHtml.substring(insertIndex + insertPoint.length);
        fs.writeFileSync(servicesPath, servicesHtml, 'utf8');
        console.log('Successfully injected Our Services into services.html');
    }
}
