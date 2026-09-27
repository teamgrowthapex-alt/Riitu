const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const apptPath = path.join(dir, 'appointment.html');

let html = fs.readFileSync(apptPath, 'utf8');

function checkDivs(htmlStr) {
    let openCount = (htmlStr.match(/<div/g) || []).length;
    let closeCount = (htmlStr.match(/<\/div>/g) || []).length;
    console.log(`Open divs: ${openCount}, Close divs: ${closeCount}`);
}

checkDivs(html);
