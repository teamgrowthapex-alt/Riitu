const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const filesToUpdate = ['appointment.html', 'admin.html'];

const oldConfig = `const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };`;

const newConfig = `const firebaseConfig = {
    apiKey: "AIzaSyDJTsu7Qm-UdPNSTWHJaNbbrSbzptQUpLw",
    authDomain: "mindmitrariitu.firebaseapp.com",
    projectId: "mindmitrariitu",
    storageBucket: "mindmitrariitu.firebasestorage.app",
    messagingSenderId: "41708440556",
    appId: "1:41708440556:web:deac068d9ba323886e4ec9",
    measurementId: "G-LECQVTHZTG"
  };`;

filesToUpdate.forEach(fileName => {
    const filePath = path.join(dir, fileName);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(oldConfig, newConfig);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(\`Updated \${fileName} with new Firebase config.\`);
    }
});
