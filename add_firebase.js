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

html = html.replace('</body>', firebaseScript + '\n</body>');
fs.writeFileSync(apptPath, html, 'utf8');
console.log('Updated appointment.html with Firebase logic');

// 3. Create admin.html
const adminHtml = \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Portal - Appointments</title>
    <style>
        body { font-family: 'Open Sans', sans-serif; background: #f4f7f6; margin: 0; padding: 20px; }
        h1 { text-align: center; color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #ff7700; color: #fff; }
        tr:hover { background: #f1f1f1; }
        .container { max-width: 1200px; margin: 0 auto; }
        .info { text-align: center; padding: 20px; background: #fff8e1; border: 1px solid #ffc107; border-radius: 4px; margin-bottom: 20px; }
    </style>
</head>
<body>

<div class="container">
    <h1>Appointments Admin Portal</h1>
    
    <div class="info">
        <strong>Note:</strong> To see the data, you must add your Firebase configuration in the source code of this page and \`appointment.html\`. Make sure Firestore is enabled in your Firebase console.
    </div>

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service Date</th>
                <th>Time Slot</th>
                <th>Gender</th>
                <th>Reason</th>
            </tr>
        </thead>
        <tbody id="appointments-list">
            <tr>
                <td colspan="8" style="text-align:center;">Loading data...</td>
            </tr>
        </tbody>
    </table>
</div>

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

  const tbody = document.getElementById('appointments-list');

  // Fetch appointments
  db.collection("appointments").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
      tbody.innerHTML = ''; // clear loading text
      
      if (querySnapshot.empty) {
          tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No appointments found.</td></tr>';
          return;
      }
      
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const submittedDate = data.timestamp ? data.timestamp.toDate().toLocaleString() : 'N/A';
          
          const tr = document.createElement('tr');
          tr.innerHTML = \`
              <td>\${submittedDate}</td>
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
  }, (error) => {
      console.error("Error getting documents: ", error);
      tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:red;">Error loading data. Check console.</td></tr>';
  });
</script>

</body>
</html>\`;

fs.writeFileSync(path.join(dir, 'admin.html'), adminHtml, 'utf8');
console.log('Created admin.html');

