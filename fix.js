const fs = require('fs');
let code = fs.readFileSync('js/astrology-interactive.js', 'utf8');
code = code.replace(/showToast\(".*Comment posted successfully! Saved to Firebase.", "success"\);/g, 'showToast("Comment posted successfully! Saved to Firebase.", "success");');
code = code.replace(/showToast\(".*Comment posted successfully!", "success"\);/g, 'showToast("Comment posted successfully!", "success");');
fs.writeFileSync('js/astrology-interactive.js', code);
