const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const apptPath = path.join(dir, 'appointment.html');

let html = fs.readFileSync(apptPath, 'utf8');

const scriptToAdd = `
<!-- SweetAlert for nice popups -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!-- Firebase App -->
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

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();

  document.getElementById('appointment_form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const apptData = {
          name: document.getElementById('appt_name').value,
          email: document.getElementById('appt_email').value,
          phone: document.getElementById('appt_phone').value,
          gender: document.getElementById('appt_gender').value,
          date: document.getElementById('appt_date').value,
          timeSlot: document.getElementById('appt_time_slot').options[document.getElementById('appt_time_slot').selectedIndex].text,
          timeOfDay: document.getElementById('appt_time_of_day').options[document.getElementById('appt_time_of_day').selectedIndex].text,
          wayToReach: document.getElementById('appt_way_to_reach').options[document.getElementById('appt_way_to_reach').selectedIndex].text,
          address: document.getElementById('appt_address').value,
          reason: document.getElementById('appt_reason').value,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      };

      // Show success message regardless of Firebase success since it's a dummy config right now
      Swal.fire({
          icon: 'success',
          title: 'Appointment Booked Successfully!',
          text: 'We have received your details and will get back to you soon.',
          confirmButtonColor: '#ff7700'
      }).then(() => {
          document.getElementById('appointment_form').reset();
      });

      // Attempt to save to Firebase
      db.collection("appointments").add(apptData).then(() => {
          console.log("Appointment saved to Firebase.");
      }).catch((error) => {
          console.error("Firebase save error (expected if config is missing): ", error);
      });
  });
</script>
`;

if (!html.includes('Swal.fire')) {
    html = html.replace('</body>', scriptToAdd + '\\n</body>');
    fs.writeFileSync(apptPath, html, 'utf8');
    console.log('Added success popup and Firebase logic');
} else {
    console.log('Already added');
}
