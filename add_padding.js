const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';

const filesToUpdate = [
    'learn_numerology.html',
    'loshu_grid.html',
    'learn_vastu.html',
    'motivation.html',
    'motivation_podcasts.html'
];

filesToUpdate.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Update padding top
        if (html.includes('<div class="simple-content-section" style="padding-top: 0;">')) {
            html = html.replace(
                '<div class="simple-content-section" style="padding-top: 0;">',
                '<div class="simple-content-section" style="padding-top: 40px;">'
            );
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Added padding to ${file}`);
        }
    }
});
