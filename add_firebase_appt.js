const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const apptPath = path.join(dir, 'appointment.html');

let html = fs.readFileSync(apptPath, 'utf8');

// 1. Add IDs to the inputs
html = html.replace('<input type="text" placeholder="Name" required>', '<input type="text" id="appt_name" placeholder="Name" required>');
html = html.replace('<input type="email" placeholder="Email" required>', '<input type="email" id="appt_email" placeholder="Email" required>');
html = html.replace('<input type="text" placeholder="Mobile Number" required>', '<input type="text" id="appt_phone" placeholder="Mobile Number" required>');
html = html.replace('<select>', '<select id="appt_gender">');
html = html.replace('<select>', '<select id="appt_time_of_day">');
html = html.replace('<select>', '<select id="appt_way_to_reach">');
html = html.replace('<input type="date" required style="width: 100%; height: 45px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; padding: 0 15px; color-scheme: dark;">', '<input type="date" id="appt_date" required style="width: 100%; height: 45px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; padding: 0 15px; color-scheme: dark;">');
html = html.replace('<select style="width: 100%; height: 45px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; padding: 0 15px;">', '<select id="appt_time_slot" style="width: 100%; height: 45px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px; color: #fff; padding: 0 15px;">');
html = html.replace('<textarea placeholder="Address" rows="4"></textarea>', '<textarea id="appt_address" placeholder="Address" rows="4"></textarea>');
html = html.replace('<textarea placeholder="Message" rows="4"></textarea>', '<textarea id="appt_reason" placeholder="Message" rows="4"></textarea>');

// Change submit button to have an ID
html = html.replace('<a href="#" class="ast_btn">make an appointment</a>', '<button type="submit" class="ast_btn" style="border:none; cursor:pointer;">make an appointment</button>');

// 2. Add Firebase Script before </body>
const firebaseScript = `
<!-- Firebase App (the core Firebase SDK) -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<!-- Firebase Firestore -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

<script>
  // YOUR FIREBASE CONFIGURATION HERE
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  document.getElementById('appointment_form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Disable button to prevent double submission
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "Submitting...";
    btn.disabled = true;

    const data = {
      name: document.getElementById('appt_name').value,
      email: document.getElementById('appt_email').value,
      phone: document.getElementById('appt_phone').value,
      gender: document.getElementById('appt_gender').options[document.getElementById('appt_gender').selectedIndex].text,
      timeOfDay: document.getElementById('appt_time_of_day').options[document.getElementById('appt_time_of_day').selectedIndex].text,
      wayToReach: document.getElementById('appt_way_to_reach').options[document.getElementById('appt_way_to_reach').selectedIndex].text,
      date: document.getElementById('appt_date').value,
      timeSlot: document.getElementById('appt_time_slot').options[document.getElementById('appt_time_slot').selectedIndex].text,
      address: document.getElementById('appt_address').value,
      reason: document.getElementById('appt_reason').value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection("appointments").add(data)
    .then((docRef) => {
        alert("Appointment successfully booked! We will contact you soon.");
        document.getElementById('appointment_form').reset();
        btn.innerText = originalText;
        btn.disabled = false;
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("Error booking appointment. Please make sure you have added your Firebase config in the code.");
        btn.innerText = originalText;
        btn.disabled = false;
    });
  });
</script>
`;

if (!html.includes('firebase-app.js')) {
    html = html.replace('</body>', firebaseScript + '\\n</body>');
    fs.writeFileSync(apptPath, html, 'utf8');
    console.log('Updated appointment.html with Firebase logic');
}
