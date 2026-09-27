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
    
    // Extract Page Title
    let pageTitleMatch = html.match(/<h2>(.*?)<\/h2>/);
    let pageTitle = pageTitleMatch ? pageTitleMatch[1].trim() : file.replace('.html', '').replace('_', ' ');
    if (pageTitle.includes("Unlock Your")) {
         // if it matched the first h2 which was in the content, try to find the breadcrumb title or head title
         let hTitleMatch = html.match(/<title>(.*?)<\/title>/);
         if (hTitleMatch) {
             pageTitle = hTitleMatch[1].split('|')[0].trim();
         }
    } else {
        let headTitleMatch = html.match(/<title>(.*?)<\/title>/);
        if (headTitleMatch) {
            pageTitle = headTitleMatch[1].split('|')[0].trim();
        }
    }

    // Extract Image
    let imgSrc = 'images/content/cosmic_bg.png'; // default
    let imgMatch = html.match(/<div class="ast_service_single_img"[\s\S]*?<img src="(.*?)"/);
    if (!imgMatch) {
        imgMatch = html.match(/<div class="ast_service_single_img text-center"[\s\S]*?<img src="(.*?)"/);
    }
    if (imgMatch && imgMatch[1]) {
        imgSrc = imgMatch[1];
    }
    
    // Extract Paragraphs
    let paragraphsHTML = '';
    let detailsMatch = html.match(/<div class="ast_service_single_details">([\s\S]*?)<\/div>\s*<\/div>\s*<!-- Sidebar/);
    if (!detailsMatch) {
        detailsMatch = html.match(/<div class="ast_service_single_details">([\s\S]*?)<div class="col-lg-4/);
    }
    
    if (detailsMatch) {
        let detailsContent = detailsMatch[1];
        let pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
        let pMatch;
        while ((pMatch = pRegex.exec(detailsContent)) !== null) {
            let pText = pMatch[1].replace(/<[^>]*>?/gm, '').trim(); // strip html from paragraph for clean text
            if (pText.length > 20) {
                paragraphsHTML += `<p>${pText}</p>\n`;
            }
        }
        
        // Include h3s as simple subheadings if they exist
        let h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>/g;
        let h3Match;
        while ((h3Match = h3Regex.exec(detailsContent)) !== null) {
             let h3Text = h3Match[1].replace(/<[^>]*>?/gm, '').trim();
             paragraphsHTML += `<h3 style="font-size:18px; font-weight:700; margin-top:20px; margin-bottom:10px;">${h3Text}</h3>\n`;
        }
    }
    
    // Fallback if extraction failed
    if (!paragraphsHTML) {
        paragraphsHTML = `<p>Welcome to ${pageTitle}. Book an appointment with us to know more.</p>`;
    }

    // Build the new content
    const newContent = `
<style>
.simple-hero {
    position: relative;
    width: 100%;
    height: 500px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.simple-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
}
.simple-hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: #fff;
    max-width: 600px;
    padding: 0 20px;
}
.simple-hero-label {
    background: #fff;
    color: #333;
    padding: 4px 12px;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
.simple-hero-title {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 25px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    line-height: 1.2;
}
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
}
.simple-content-title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    color: #111;
    margin-bottom: 40px;
}
.simple-content-text p {
    font-size: 15px;
    color: #333;
    line-height: 1.8;
    margin-bottom: 20px;
}
.simple-content-bottom {
    text-align: center;
    margin-top: 50px;
}
</style>

<div class="simple-hero" style="background-image: url('${imgSrc}');">
    <div class="simple-hero-content">
        <div class="simple-hero-label">${pageTitle}</div>
        <h1 class="simple-hero-title">${pageTitle}</h1>
        <a href="appointment.html" class="simple-btn">Book Appointment</a>
    </div>
</div>

<div class="simple-content-section">
    <div class="simple-content-container">
        <h2 class="simple-content-title">${pageTitle} for You</h2>
        <div class="simple-content-text">
            ${paragraphsHTML}
        </div>
        <div class="simple-content-bottom">
            <a href="appointment.html" class="simple-btn">Book Appointment</a>
        </div>
    </div>
</div>
`;

    // Replace the content between Header End and Footer Start
    const headerEndIndex = html.indexOf('<!-- Header End -->');
    const footerStartIndex = html.indexOf('<!-- Footer wrapper start-->') !== -1 ? html.indexOf('<!-- Footer wrapper start-->') : html.indexOf('<!-- Footer Start -->');
    
    if (headerEndIndex !== -1 && footerStartIndex !== -1) {
        html = html.substring(0, headerEndIndex + '<!-- Header End -->'.length) + '\n' + newContent + '\n' + html.substring(footerStartIndex);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Simplified design for ${file}`);
    } else {
        console.log(`Could not find markers in ${file}`);
    }
});
