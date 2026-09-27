const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const apptPath = path.join(dir, 'appointment.html');

let html = fs.readFileSync(apptPath, 'utf8');

const newDesign = `<!--Journal Start-->
<style>
.custom-appt-section {
    background: #fdfbf9;
    padding: 80px 0;
    font-family: 'Open Sans', sans-serif;
}
.custom-appt-container {
    max-width: 900px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
    overflow: hidden;
    position: relative;
}
.custom-appt-header {
    background: linear-gradient(135deg, #ff7700 0%, #ff9d42 100%);
    padding: 40px 30px;
    text-align: center;
    color: #ffffff;
}
.custom-appt-header h2 {
    margin: 0 0 10px 0;
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
}
.custom-appt-header p {
    margin: 0;
    font-size: 15px;
    opacity: 0.9;
}
.custom-appt-form {
    padding: 40px 50px;
}
.custom-form-group {
    margin-bottom: 25px;
}
.custom-form-group label {
    display: block;
    font-weight: 600;
    color: #333333;
    margin-bottom: 8px;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
}
.custom-form-control {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    background: #f9f9f9;
    color: #333;
    font-size: 15px;
    transition: all 0.3s ease;
    box-sizing: border-box;
}
.custom-form-control:focus {
    border-color: #ff7700;
    background: #ffffff;
    outline: none;
    box-shadow: 0 0 0 4px rgba(255, 119, 0, 0.1);
}
.custom-submit-btn {
    background: #ff7700;
    color: #ffffff;
    border: none;
    padding: 16px 40px;
    font-size: 16px;
    font-weight: 700;
    border-radius: 30px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(255, 119, 0, 0.3);
    width: 100%;
    margin-top: 10px;
}
.custom-submit-btn:hover {
    background: #e66a00;
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(255, 119, 0, 0.4);
}
.row-flex {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
}
.col-flex-6 {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0 15px;
    box-sizing: border-box;
}
.col-flex-12 {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
}
@media (max-width: 768px) {
    .col-flex-6 { flex: 0 0 100%; max-width: 100%; }
    .custom-appt-form { padding: 30px 20px; }
}
</style>

<div class="custom-appt-section">
    <div class="container">
        <div class="custom-appt-container">
            <div class="custom-appt-header">
                <h2>Book Your Cosmic Consultation</h2>
                <p>Fill out the form below and we will get back to you to confirm your appointment.</p>
            </div>
            <div class="custom-appt-form">
                <form id="appointment_form">
                    <div class="row-flex">
                        <div class="col-flex-6 custom-form-group">
                            <label>Full Name</label>
                            <input type="text" id="appt_name" class="custom-form-control" placeholder="e.g. John Doe" required>
                        </div>
                        <div class="col-flex-6 custom-form-group">
                            <label>Email Address</label>
                            <input type="email" id="appt_email" class="custom-form-control" placeholder="e.g. john@example.com" required>
                        </div>
                        <div class="col-flex-6 custom-form-group">
                            <label>Mobile Number</label>
                            <input type="text" id="appt_phone" class="custom-form-control" placeholder="+91 98765 43210" required>
                        </div>
                        <div class="col-flex-6 custom-form-group">
                            <label>Gender</label>
                            <select id="appt_gender" class="custom-form-control">
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                        <div class="col-flex-6 custom-form-group">
                            <label>Preferred Date</label>
                            <input type="date" id="appt_date" class="custom-form-control" required>
                        </div>
                        <div class="col-flex-6 custom-form-group">
                            <label>Preferred Time Slot</label>
                            <select id="appt_time_slot" class="custom-form-control">
                                <option value="1">10:00 AM - 12:00 PM</option>
                                <option value="2">02:00 PM - 04:00 PM</option>
                                <option value="3">06:00 PM - 08:00 PM</option>
                            </select>
                        </div>
                        <div class="col-flex-6 custom-form-group">
                            <label>Time of Day</label>
                            <select id="appt_time_of_day" class="custom-form-control">
                                <option value="1">Morning</option>
                                <option value="2">Afternoon</option>
                                <option value="3">Evening</option>
                            </select>
                        </div>
                        <div class="col-flex-6 custom-form-group">
                            <label>Way to Reach</label>
                            <select id="appt_way_to_reach" class="custom-form-control">
                                <option value="1">Phone</option>
                                <option value="2">Email</option>
                            </select>
                        </div>
                        <div class="col-flex-12 custom-form-group">
                            <label>Address / Location</label>
                            <textarea id="appt_address" class="custom-form-control" placeholder="City, State" rows="2"></textarea>
                        </div>
                        <div class="col-flex-12 custom-form-group">
                            <label>Reason for Appointment</label>
                            <textarea id="appt_reason" class="custom-form-control" placeholder="Describe what you want to discuss..." rows="4"></textarea>
                        </div>
                        <div class="col-flex-12">
                            <button type="submit" class="custom-submit-btn">Confirm Appointment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!--Journal End-->`;

const startIndex = html.indexOf('<!--Journal Start-->');
const endIndex = html.indexOf('<!--Journal End-->');

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + newDesign + html.substring(endIndex + '<!--Journal End-->'.length);
    fs.writeFileSync(apptPath, html, 'utf8');
    console.log('Successfully redesigned appointment.html');
} else {
    console.log('Could not find Journal section');
}
