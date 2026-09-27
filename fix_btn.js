const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const apptPath = path.join(dir, 'appointment.html');

let html = fs.readFileSync(apptPath, 'utf8');

// Replace the button to remove ast_btn class which might be conflicting
html = html.replace(
    '<button type="submit" class="ast_btn" style="border: none; padding: 12px 30px; font-size: 16px; border-radius: 30px; cursor: pointer; box-shadow: 0 5px 15px rgba(255,119,0,0.3);">Confirm Appointment</button>',
    '<button type="submit" style="background: #ff7700; color: #fff; border: none; padding: 15px 40px; font-size: 16px; font-weight: 700; border-radius: 30px; cursor: pointer; box-shadow: 0 5px 15px rgba(255,119,0,0.3); display: inline-block; line-height: 1;">Confirm Appointment</button>'
);

fs.writeFileSync(apptPath, html, 'utf8');
console.log('Fixed button styling');
