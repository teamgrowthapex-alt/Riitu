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
    
    // Extract Image SRC from the existing simple-hero
    let imgSrc = 'images/content/cosmic_bg.png';
    let imgMatch = html.match(/<div class="simple-hero" style="background-image: url\('(.*?)'\);/);
    if (imgMatch) imgSrc = imgMatch[1];
    
    // Extract Page Title
    let pageTitleMatch = html.match(/<h2 class="simple-content-title">(.*?) for You<\/h2>/);
    let pageTitle = pageTitleMatch ? pageTitleMatch[1] : 'Numerology Reading';
    
    // Extract Paragraphs
    let paragraphsMatch = html.match(/<div class="simple-content-text">\s*([\s\S]*?)\s*<\/div>\s*<div class="simple-content-bottom">/);
    let paragraphsHTML = paragraphsMatch ? paragraphsMatch[1].trim() : '';

    const newContent = `
<style>
.simple-btn {
    background: #ff7700;
    color: #fff;
    padding: 12px 30px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    border: none;
    box-shadow: 0 4px 10px rgba(255,119,0,0.3);
    transition: all 0.3s;
}
.simple-btn:hover {
    background: #e66a00;
    color: #fff;
}
.simple-content-section {
    padding: 60px 0 80px 0;
    background: #fff;
}
.simple-content-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
}
.simple-content-title {
    font-size: 32px;
    font-weight: 700;
    color: #111;
    margin-bottom: 40px;
}
.simple-content-text {
    text-align: left;
}
.simple-content-text p {
    font-size: 15px;
    color: #333;
    line-height: 1.8;
    margin-bottom: 20px;
}
</style>

<div class="simple-content-section">
    <div class="simple-content-container">
        <img src="${imgSrc}" alt="${pageTitle}" style="max-width: 100%; height: auto; max-height: 450px; border-radius: 12px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h2 class="simple-content-title">${pageTitle} for You</h2>
        <div class="simple-content-text">
            ${paragraphsHTML}
        </div>
        <div style="text-align: center; margin-top: 50px;">
            <a href="appointment.html" class="simple-btn">Book Appointment</a>
        </div>
    </div>
</div>
`;

    // Replace everything between <!-- Header End --> and <!-- Footer wrapper start--> or <!-- Footer Start -->
    const headerEndIndex = html.indexOf('<!-- Header End -->');
    const footerStartIndex = html.indexOf('<!-- Footer wrapper start-->') !== -1 ? html.indexOf('<!-- Footer wrapper start-->') : html.indexOf('<!-- Footer Start -->');
    
    if (headerEndIndex !== -1 && footerStartIndex !== -1) {
        html = html.substring(0, headerEndIndex + '<!-- Header End -->'.length) + '\n' + newContent + '\n' + html.substring(footerStartIndex);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated layout in ${file}`);
    }
});
