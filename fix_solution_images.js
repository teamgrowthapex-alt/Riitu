const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';

const pagesToUpdate = [
    { file: 'personal_numerology.html', newImg: 'images/solution/Personal Numerology.png' },
    { file: 'career_numerology.html', newImg: 'images/solution/Career Numerology.png' },
    { file: 'relationship_numerology.html', newImg: 'images/solution/Relationship Numerology.png' },
    { file: 'business_numerology.html', newImg: 'images/solution/Business Numerology.png' },
    { file: 'marriage_numerology.html', newImg: 'images/solution/Marriage Numerology.png' },
    { file: 'newborn_numerology.html', newImg: 'images/solution/New Born Numerology.png' }
];

pagesToUpdate.forEach(page => {
    const filePath = path.join(dir, page.file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Find the image tag inside simple-content-section
        const imgRegex = /<img src="images\/solution\/.*?\.png".*?>/;
        const match = html.match(imgRegex);
        
        if (match) {
            let imgTag = match[0];
            // Replace the UUID part with the correct named image
            let newImgTag = imgTag.replace(/src="images\/solution\/.*?\.png"/, `src="${page.newImg}"`);
            
            html = html.replace(imgTag, newImgTag);
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Updated correct image for ${page.file}`);
        }
    }
});
