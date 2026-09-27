const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const apptPath = path.join(dir, 'appointment.html');

let html = fs.readFileSync(apptPath, 'utf8');

const dynamicScript = `
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');
        const time = urlParams.get('time');
        
        let dynamicMsg = "";
        if (type || time) {
            if (type === 'online') {
                dynamicMsg += "Appointment Type: Online Zoom Meeting\\n";
            } else if (type === 'facetoface') {
                dynamicMsg += "Appointment Type: Face to Face Meeting\\n";
            }
            if (time) {
                dynamicMsg += "Duration: " + time + " Minutes\\n";
            }
            
            if (dynamicMsg !== "") {
                const reasonField = document.getElementById('appt_reason');
                if (reasonField) {
                    reasonField.value = dynamicMsg + "\\n" + reasonField.value;
                }
            }
        }
    });
</script>
`;

if (!html.includes('urlParams.get(\\'type\\')')) {
    html = html.replace('</body>', dynamicScript + '\\n</body>');
    fs.writeFileSync(apptPath, html, 'utf8');
    console.log('Added dynamic parameter script to appointment.html');
} else {
    console.log('Script already added');
}
