const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const templatePath = path.join(dir, 'personal_numerology.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');

const pages = [
    { name: 'career', title: 'Career Guidance', img: 'images/content/sol_career_num.png' },
    { name: 'marriage', title: 'Marriage Astrology', img: 'images/content/sol_marriage_num.png' },
    { name: 'worship_lesson', title: 'Worship Lesson', img: 'images/content/cosmic_bg.png' },
    { name: 'pregnancy', title: 'Pregnancy Astrology', img: 'images/content/sol_newborn_num.png' },
    { name: 'manglik_dosha', title: 'Manglik Dosha', img: 'images/content/serv_vastu.png' },
    { name: 'kundli_dosha', title: 'Kundli Dosha', img: 'images/content/learn_predictions.png' },
    { name: 'festivals', title: 'Festivals', img: 'images/content/serv_num.png' },
    { name: 'name_analysis', title: 'Name Analysis', img: 'images/content/sol_personal_num.png' }
];

pages.forEach(page => {
    const destPath = path.join(dir, `${page.name}.html`);
    
    // Replace title
    let html = templateHtml.replace(/<title>.*?<\/title>/, `<title>${page.title} | MindMitra Riitu</title>`);
    
    // Replace h2
    html = html.replace(/<h2 class="simple-content-title">.*?<\/h2>/, `<h2 class="simple-content-title">${page.title}</h2>`);
    
    // Replace image
    html = html.replace(/<img src=".*?".*?>/, `<img src="${page.img}" alt="${page.title}" style="width: 100%; height: auto; max-height: 600px; object-fit: cover; margin-bottom: 40px; display: block;">`);
    
    // Replace description paragraph
    html = html.replace(/<p>Numerology is the sacred study.*?<\/p>/, `<p>Discover deep insights into your ${page.title.toLowerCase()} with our specialized consultation. Find alignment, clarity, and the path forward based on cosmic principles.</p>`);
    
    fs.writeFileSync(destPath, html, 'utf8');
    console.log(`Created ${page.name}.html`);
});
