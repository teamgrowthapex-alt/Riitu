const fs = require('fs');
let code = fs.readFileSync('js/astrology-interactive.js', 'utf8');

// The file has emojis that got corrupted or contain quotes. Let's fix them manually based on known lines.

code = code.replace(/showToast\("([^]*?)Billing details saved/g, 'showToast("Billing details saved');
code = code.replace(/showToast\("([^]*?)Order Placed Successfully/g, 'showToast("Order Placed Successfully');
code = code.replace(/showToast\("([^]*?)Comment posted successfully/g, 'showToast("Comment posted successfully');

fs.writeFileSync('js/astrology-interactive.js', code);
