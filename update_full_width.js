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
        
        // Find the image tag
        const imgRegex = /<img src="images\/grow images\/.*?".*?>/;
        const match = html.match(imgRegex);
        
        if (match) {
            const imgTag = match[0];
            
            // Reconstruct the image tag to be full width
            let newImgTag = imgTag.replace(/style=".*?"/, 'style="width: 100%; height: auto; max-height: 600px; object-fit: cover; margin-bottom: 40px; display: block;"');
            
            // Remove the image from its current position
            html = html.replace(imgTag, '');
            
            // Insert it right after <div class="simple-content-section">
            // and also add padding-top: 0 to the section
            html = html.replace(
                '<div class="simple-content-section">',
                '<div class="simple-content-section" style="padding-top: 0;">\n    ' + newImgTag
            );
            
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Updated layout to full width in ${file}`);
        }
    }
});
