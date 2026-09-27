const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';

const pagesToUpdate = [
    { file: 'personal_numerology.html', oldImg: 'images/content/sol_personal_num.png', newImg: 'images/solution/3de245a4-5111-4e1a-b377-30a51ca542e5.png' },
    { file: 'career_numerology.html', oldImg: 'images/content/sol_career_num.png', newImg: 'images/solution/618f0780-ccb8-479d-8222-5e95a76976d9.png' },
    { file: 'relationship_numerology.html', oldImg: 'images/content/sol_relationship_num.png', newImg: 'images/solution/88091721-37c1-4bf7-9dbc-0a15ed8c4c7e.png' },
    { file: 'business_numerology.html', oldImg: 'images/content/sol_business_num.png', newImg: 'images/solution/c04e2797-a6cb-4a62-ba33-df09669274ce.png' },
    { file: 'marriage_numerology.html', oldImg: 'images/content/sol_marriage_num.png', newImg: 'images/solution/e6235a83-7825-4a37-ab24-29ae325f5b52.png' },
    { file: 'newborn_numerology.html', oldImg: 'images/content/sol_newborn_num.png', newImg: 'images/solution/fa0f43ec-f49b-40ae-a892-909f87b11041.png' }
];

pagesToUpdate.forEach(page => {
    const filePath = path.join(dir, page.file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        
        // Find the image tag inside simple-content-container
        const imgRegex = new RegExp(`<img src="${page.oldImg}".*?>`);
        const match = html.match(imgRegex);
        
        if (match) {
            const imgTag = match[0];
            
            // Reconstruct the image tag to be full width
            let newImgTag = imgTag.replace(/style=".*?"/, 'style="width: 100%; height: auto; max-height: 600px; object-fit: cover; margin-bottom: 40px; display: block;"');
            newImgTag = newImgTag.replace(page.oldImg, page.newImg);
            
            // Remove the image from its current position
            html = html.replace(imgTag, '');
            
            // Insert it right after <div class="simple-content-section">
            // and add padding-top: 40px to the section
            html = html.replace(
                '<div class="simple-content-section">',
                '<div class="simple-content-section" style="padding-top: 40px;">\n    ' + newImgTag
            );
            
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Updated layout and image for ${page.file}`);
        }
    }
});
