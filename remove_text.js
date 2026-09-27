const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';

const files = [
    'business_numerology.html',
    'career_numerology.html',
    'learn_numerology.html',
    'learn_vastu.html',
    'loshu_grid.html',
    'marriage_numerology.html',
    'motivation.html',
    'motivation_podcasts.html',
    'newborn_numerology.html',
    'personal_numerology.html',
    'relationship_numerology.html',
    '2026_predictions.html'
];

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Use regex to remove <div class="simple-hero-content">...</div>
    const regex = /<div class="simple-hero-content">[\s\S]*?<\/div>\s*<\/div>/;
    
    if (regex.test(html)) {
        // Also we might want to remove the ::before pseudo element overlay (the black transparent layer) if there is no text
        html = html.replace(/\.simple-hero::before\s*{[^}]*}/, '');
        
        // Remove the simple-hero-content div
        html = html.replace(regex, '</div>');
        
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Removed text from image in ${file}`);
    } else {
        console.log(`Text overlay not found in ${file}`);
    }
});
