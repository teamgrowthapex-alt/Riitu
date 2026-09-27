const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const apptPath = path.join(dir, 'appointment.html');

let apptHtml = fs.readFileSync(apptPath, 'utf8');

// Replace the Firebase save logic with a combined LocalStorage + Firebase logic
apptHtml = apptHtml.replace(
    'db.collection("appointments").add(apptData).then(() => {',
    `
      // Save locally to localStorage so it works immediately without Firebase API keys
      let localAppts = JSON.parse(localStorage.getItem('localAppointments') || '[]');
      let apptSaveData = {...apptData, timestampStr: new Date().toLocaleString()};
      delete apptSaveData.timestamp; // remove Firebase specific timestamp object for local storage
      localAppts.unshift(apptSaveData);
      localStorage.setItem('localAppointments', JSON.stringify(localAppts));

      db.collection("appointments").add(apptData).then(() => {`
);

fs.writeFileSync(apptPath, apptHtml, 'utf8');

const adminPath = path.join(dir, 'admin.html');
let adminHtml = fs.readFileSync(adminPath, 'utf8');

// Update admin.html to load from localStorage if Firebase fails
adminHtml = adminHtml.replace(
    'tbody.innerHTML = `',
    `
      let localAppts = JSON.parse(localStorage.getItem('localAppointments') || '[]');
      if (localAppts.length > 0) {
          tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:green;margin-bottom:10px;">Loaded data from LocalStorage (Firebase is not configured).</td></tr>';
          localAppts.forEach(data => {
              const tr = document.createElement('tr');
              tr.innerHTML = \`
                  <td>\${data.timestampStr || 'N/A'}</td>
                  <td>\${data.name || ''}</td>
                  <td>\${data.email || ''}</td>
                  <td>\${data.phone || ''}</td>
                  <td>\${data.date || ''}</td>
                  <td>\${data.timeSlot || ''}</td>
                  <td>\${data.gender || ''}</td>
                  <td>\${data.reason || ''}</td>
              \`;
              tbody.appendChild(tr);
          });
      } else {
          tbody.innerHTML = \``
);

adminHtml = adminHtml.replace(
    'Kundli matching consultation</td>\n        </tr>\n      `;',
    'Kundli matching consultation</td>\n        </tr>\n      `;\n      }'
);

fs.writeFileSync(adminPath, adminHtml, 'utf8');

console.log('Added localStorage fallback to both files');
