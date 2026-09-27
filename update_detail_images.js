const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';

// 1. Revert images in index.html to original ones
const indexHtmlPath = path.join(dir, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

indexHtml = indexHtml.replace('images/grow images/learn and grow.png', 'images/content/learn_numerology.png');
indexHtml = indexHtml.replace('images/grow images/konw you missing.png', 'images/content/learn_loshu.png');
indexHtml = indexHtml.replace('images/grow images/vastu.png', 'images/content/learn_vastu.png');
indexHtml = indexHtml.replace('images/grow images/e6235a83-7825-4a37-ab24-29ae325f5b52.png', 'images/content/learn_motivation.png');
indexHtml = indexHtml.replace('images/grow images/d4e9845d-baff-49fb-a5a2-2da5512fd062.png', 'images/content/learn_podcast.png');

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('Reverted images in index.html');

// 2. Update images in respective detail pages
const pagesToUpdate = [
    { file: 'learn_numerology.html', oldImg: 'images/content/learn_numerology.png', newImg: 'images/grow images/learn and grow.png' },
    { file: 'loshu_grid.html', oldImg: 'images/content/learn_loshu.png', newImg: 'images/grow images/konw you missing.png' },
    { file: 'learn_vastu.html', oldImg: 'images/content/learn_vastu.png', newImg: 'images/grow images/vastu.png' },
    { file: 'motivation.html', oldImg: 'images/content/learn_motivation.png', newImg: 'images/grow images/e6235a83-7825-4a37-ab24-29ae325f5b52.png' },
    { file: 'motivation_podcasts.html', oldImg: 'images/content/learn_podcast.png', newImg: 'images/grow images/d4e9845d-baff-49fb-a5a2-2da5512fd062.png' }
];

pagesToUpdate.forEach(page => {
    const filePath = path.join(dir, page.file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        html = html.replace(page.oldImg, page.newImg);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated image in ${page.file}`);
    }
});
