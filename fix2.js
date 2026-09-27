const fs = require('fs');
let code = fs.readFileSync('js/astrology-interactive.js', 'utf8');
code = code.replace(/showToast\("([^"]*)"([^"]*)"/g, 'showToast("$1$2"');
// Basically, replace unescaped quotes inside showToast string literal.
// A simpler way is to just do this:
code = code.replace(/showToast\("([^,]*?)"([^,]*?)"([^,]*?)",/g, 'showToast("$1$2$3",');
code = code.replace(/showToast\("([^,]*?)"([^,]*?)"([^,]*?)"([^,]*?)",/g, 'showToast("$1$2$3$4",');
fs.writeFileSync('js/astrology-interactive.js', code);
