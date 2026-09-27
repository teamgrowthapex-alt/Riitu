const fs = require('fs');
let lines = fs.readFileSync('js/astrology-interactive.js', 'utf8').split('\n');
lines[1433] = '            showToast("Billing details saved! Select payment method to complete order.", "success");';
lines[1473] = '            showToast("Order Placed Successfully! Saved to Firebase database.", "success");';
lines[1571] = '                        showToast("Comment posted successfully! Saved to Firebase.", "success");';
lines[1577] = '                    showToast("Comment posted successfully!", "success");';
fs.writeFileSync('js/astrology-interactive.js', lines.join('\n'));
