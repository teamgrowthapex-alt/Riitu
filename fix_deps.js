const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';

const requiredCss = `
<link rel="stylesheet" type="text/css" href="css/animate.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/fonts.css">
<link rel="stylesheet" type="text/css" href="css/owl.carousel.css">
<link rel="stylesheet" type="text/css" href="css/owl.theme.default.css">
<link rel="stylesheet" type="text/css" href="css/magnific-popup.css">
<link rel="stylesheet" type="text/css" href="css/style.css">
`;

// Also required js at the bottom just in case
const requiredJs = `
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/bootstrap.js"></script>
<script type="text/javascript" src="js/jquery.magnific-popup.js"></script>
<script type="text/javascript" src="js/owl.carousel.js"></script>
<script type="text/javascript" src="js/jquery.countTo.js"></script>
<script type="text/javascript" src="js/jquery.appear.js"></script>
<script type="text/javascript" src="js/custom.js"></script>
`;

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Fix CSS
    // Let's replace the block of <link rel="stylesheet"...> up to </head> with the requiredCss
    const cssStartMatch = html.match(/<link rel="stylesheet" type="text\/css" href="css\/animate.css">/);
    if (cssStartMatch) {
        const headEndIndex = html.indexOf('</head>');
        // Find the last link tag before head end
        const cssEndMatch = html.substring(0, headEndIndex).lastIndexOf('<link rel="shortcut icon"');
        if (cssEndMatch !== -1) {
             const beforeCss = html.substring(0, cssStartMatch.index);
             const afterCss = html.substring(cssEndMatch);
             html = beforeCss + requiredCss.trim() + '\n' + afterCss;
        } else {
             const beforeCss = html.substring(0, cssStartMatch.index);
             const afterCss = html.substring(headEndIndex);
             html = beforeCss + requiredCss.trim() + '\n<link rel="shortcut icon" type="image/png" href="images/header/favicon.png">\n' + afterCss;
        }
    }
    
    // Fix JS
    const scriptStart = html.indexOf('<script type="text/javascript" src="js/jquery.js"></script>');
    const bodyEnd = html.indexOf('</body>');
    if (scriptStart !== -1 && bodyEnd !== -1) {
         html = html.substring(0, scriptStart) + requiredJs.trim() + '\n' + html.substring(bodyEnd);
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
});
console.log('Fixed CSS and JS dependencies on all HTML pages.');
