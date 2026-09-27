const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove the wishlist heart icon anchor tag
        const newContent = content.replace(/<a href="shop\.html" title="Wishlist"><i class="fa fa-heart" aria-hidden="true"><\/i><\/a>/g, '');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
        }
    }
});
console.log('Removed heart icon from header in all HTML files.');
