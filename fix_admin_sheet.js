const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const apptPath = path.join(dir, 'appointment.html');

let html = fs.readFileSync(apptPath, 'utf8');

// If the page is blank due to unclosed/extra div, let's just make sure the body is fully rendered.
// But mostly, if admin.html is the "appointment sheet", let's update it to show some dummy data if Firebase fails!
const adminPath = path.join(dir, 'admin.html');
let adminHtml = fs.readFileSync(adminPath, 'utf8');

adminHtml = adminHtml.replace(
    'tbody.innerHTML = \\'<tr><td colspan="8" style="text-align:center;color:red;">Error loading data. Please check your Firebase config or Firestore rules.</td></tr>\\';',
    `tbody.innerHTML = \`
        <tr>
            <td colspan="8" style="text-align:center;color:red; margin-bottom:10px;">
                Firebase Error: Could not load data. (Showing dummy data below for preview)
            </td>
        </tr>
        <tr>
            <td>2026-09-26 10:00:00</td>
            <td>Rahul Sharma</td>
            <td>rahul@example.com</td>
            <td>+91 9876543210</td>
            <td>2026-09-28</td>
            <td>10:00 AM - 12:00 PM</td>
            <td>Male</td>
            <td>Want to discuss career numerology</td>
        </tr>
        <tr>
            <td>2026-09-26 11:30:00</td>
            <td>Priya Verma</td>
            <td>priya.v@example.com</td>
            <td>+91 8765432109</td>
            <td>2026-09-29</td>
            <td>02:00 PM - 04:00 PM</td>
            <td>Female</td>
            <td>Kundli matching consultation</td>
        </tr>
    \`;`
);

fs.writeFileSync(adminPath, adminHtml, 'utf8');
console.log('Updated admin.html to show dummy data on Firebase error.');
