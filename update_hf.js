const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';

const indexFile = path.join(dir, 'index.html');
const indexHtml = fs.readFileSync(indexFile, 'utf8');

// Extract Header from index.html
const headerStartMatch = indexHtml.match(/<!-- Header Start -->/);
const headerEndMatch = indexHtml.match(/<!-- Header End -->/);
const header = indexHtml.substring(headerStartMatch.index, headerEndMatch.index + '<!-- Header End -->'.length);

// Extract Footer from index.html
const footerStartMatch = indexHtml.match(/<!-- Footer wrapper start-->/);
const footerEndMatch = indexHtml.match(/<!-- Footer wrapper End-->/);
const footer = indexHtml.substring(footerStartMatch.index, footerEndMatch.index + '<!-- Footer wrapper End-->'.length);

fs.readdirSync(dir).forEach(file => {
    if (file === 'index.html' || !file.endsWith('.html')) return;
    
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace Header
    const localHeaderStart = html.indexOf('<!-- Header Start -->');
    const localHeaderEndMatch = html.match(/<!-- Hero Image Start-->|<div class="ast_pagetitle">|<div class="ast_slider_wrapper">|<!--Hero Image Start-->/i);
    let localHeaderEnd = localHeaderEndMatch ? localHeaderEndMatch.index : html.indexOf('<!-- Header End -->') !== -1 ? html.indexOf('<!-- Header End -->') + '<!-- Header End -->'.length : -1;
    
    if (localHeaderStart !== -1 && localHeaderEnd !== -1 && localHeaderEnd > localHeaderStart) {
        html = html.substring(0, localHeaderStart) + header + '\n' + html.substring(localHeaderEnd);
    }
    
    // Replace Footer
    let localFooterStart = html.indexOf('<!-- Footer Start -->');
    if (localFooterStart === -1) {
        localFooterStart = html.indexOf('<!-- Footer wrapper start-->');
    }
    
    const scriptStart = html.indexOf('<script type="text/javascript" src="js/jquery.js"></script>');
    
    if (localFooterStart !== -1 && scriptStart !== -1 && scriptStart > localFooterStart) {
        html = html.substring(0, localFooterStart) + footer + '\n' + html.substring(scriptStart);
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated ${file}`);
});
