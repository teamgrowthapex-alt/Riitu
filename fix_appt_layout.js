const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';
const apptPath = path.join(dir, 'appointment.html');

let html = fs.readFileSync(apptPath, 'utf8');

const newDesign = `<!--Journal Start-->
<div class="ast_journal_wrapper ast_toppadder70 ast_bottompadder70" style="background-color: #fdfbf9;">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="ast_journal_box_wrapper" style="box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 15px; padding: 40px; background: #fff; margin-top: 0;">
					<form id="appointment_form">
						<h3 style="text-align: center; color: #ff7700; margin-bottom: 30px; font-weight: 700; font-size: 28px;">Book Your Cosmic Consultation</h3>
						<div class="row">
							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Full Name</label>
								<input type="text" id="appt_name" placeholder="Name" required style="width: 100%; height: 45px; border: 1px solid #ddd; border-radius: 5px; padding: 0 15px; margin-bottom: 20px;">
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Email Address</label>
								<input type="email" id="appt_email" placeholder="Email" required style="width: 100%; height: 45px; border: 1px solid #ddd; border-radius: 5px; padding: 0 15px; margin-bottom: 20px;">
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Mobile Number</label>
								<input type="text" id="appt_phone" placeholder="Mobile Number" required style="width: 100%; height: 45px; border: 1px solid #ddd; border-radius: 5px; padding: 0 15px; margin-bottom: 20px;">
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Gender</label>
								<select id="appt_gender" style="width: 100%; height: 45px; border: 1px solid #ddd; border-radius: 5px; padding: 0 15px; margin-bottom: 20px;">
									<option value="female">Female</option>
									<option value="male">Male</option>
								</select>
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Preferred Date</label>
								<input type="date" id="appt_date" required style="width: 100%; height: 45px; border: 1px solid #ddd; border-radius: 5px; padding: 0 15px; margin-bottom: 20px;">
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Preferred Time Slot</label>
								<select id="appt_time_slot" style="width: 100%; height: 45px; border: 1px solid #ddd; border-radius: 5px; padding: 0 15px; margin-bottom: 20px;">
									<option value="1">10:00 AM - 12:00 PM</option>
									<option value="2">02:00 PM - 04:00 PM</option>
									<option value="3">06:00 PM - 08:00 PM</option>
								</select>
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Time of Day</label>
								<select id="appt_time_of_day" style="width: 100%; height: 45px; border: 1px solid #ddd; border-radius: 5px; padding: 0 15px; margin-bottom: 20px;">
									<option value="1"> Morning </option>
									<option value="2">Afternoon</option>
									<option value="3">Evening </option>
								</select>
							</div>
							<div class="col-lg-6 col-md-6 col-sm-6 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Way to Reach</label>
								<select id="appt_way_to_reach" style="width: 100%; height: 45px; border: 1px solid #ddd; border-radius: 5px; padding: 0 15px; margin-bottom: 20px;">
									<option value="1">Phone </option>
									<option value="2">Email</option>
								</select>
							</div>
							<div class="col-lg-12 col-md-12 col-sm-12 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Address</label>
								<textarea id="appt_address" placeholder="Address" rows="2" style="width: 100%; border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin-bottom: 20px;"></textarea>
							</div>
							<div class="col-lg-12 col-md-12 col-sm-12 col-12">
								<label style="font-weight: 600; color: #333; margin-bottom: 5px; display: block;">Reason for appointment</label>
								<textarea id="appt_reason" placeholder="Message" rows="4" style="width: 100%; border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin-bottom: 20px;"></textarea>
							</div>
							<div class="col-lg-12 col-md-12 col-sm-12 col-12" style="text-align: center;">
								<button type="submit" class="ast_btn" style="border: none; padding: 12px 30px; font-size: 16px; border-radius: 30px; cursor: pointer; box-shadow: 0 5px 15px rgba(255,119,0,0.3);">Confirm Appointment</button>
							</div>
						</div>
					</form>
				</div>
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
    console.log('Restored native layout with inline styles');
} else {
    console.log('Could not find Journal section');
}
