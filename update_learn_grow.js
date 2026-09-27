const fs = require('fs');
const path = require('path');

const filePath = path.join('d:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const sectionStart = '<!-- Learn & Grow Section Start -->';
const sectionEnd = '<!-- Learn & Grow Section End -->';

const startIndex = html.indexOf(sectionStart);
const endIndex = html.indexOf(sectionEnd) + sectionEnd.length;

if (startIndex !== -1 && endIndex !== -1) {
    const newSection = `<!-- Learn & Grow Section Start -->
<div class="ast_learn_wrapper ast_toppadder70 ast_bottompadder70" style="float: left; width: 100%; background: #f7f7f9;">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center" style="margin-bottom: 40px;">
				<h1 style="font-size: 32px; font-weight: 700; color: #111111; margin: 0; text-transform: capitalize;">Learn &amp; Grow</h1>
			</div>
		</div>

		<div class="row justify-content-center" style="gap: 15px;">
			<!-- Item 1: Numerology -->
			<div style="flex: 0 0 18%; max-width: 18%; margin-bottom: 20px;">
				<a href="learn_numerology.html" style="text-decoration: none; color: inherit; display: block; height: 100%;">
					<div style="background: #ffffff; border-radius: 8px; padding: 30px 15px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.3s ease;">
						<div style="width: 130px; height: 130px; border-radius: 50%; overflow: hidden; margin-bottom: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
							<img src="images/grow images/learn and grow.png" alt="Numerology" style="width: 100%; height: 100%; object-fit: cover;">
						</div>
						<h4 style="font-size: 17px; font-weight: 700; color: #111111; margin: 0;">Numerology</h4>
					</div>
				</a>
			</div>

			<!-- Item 2: Lo-Shu Grid -->
			<div style="flex: 0 0 18%; max-width: 18%; margin-bottom: 20px;">
				<a href="loshu_grid.html" style="text-decoration: none; color: inherit; display: block; height: 100%;">
					<div style="background: #ffffff; border-radius: 8px; padding: 30px 15px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.3s ease;">
						<div style="width: 130px; height: 130px; border-radius: 50%; overflow: hidden; margin-bottom: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
							<img src="images/grow images/konw you missing.png" alt="Lo-Shu Grid" style="width: 100%; height: 100%; object-fit: cover;">
						</div>
						<h4 style="font-size: 17px; font-weight: 700; color: #111111; margin: 0;">Lo-Shu Grid</h4>
					</div>
				</a>
			</div>

			<!-- Item 3: Vastu -->
			<div style="flex: 0 0 18%; max-width: 18%; margin-bottom: 20px;">
				<a href="learn_vastu.html" style="text-decoration: none; color: inherit; display: block; height: 100%;">
					<div style="background: #ffffff; border-radius: 8px; padding: 30px 15px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.3s ease;">
						<div style="width: 130px; height: 130px; border-radius: 50%; overflow: hidden; margin-bottom: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
							<img src="images/grow images/vastu.png" alt="Vastu" style="width: 100%; height: 100%; object-fit: cover;">
						</div>
						<h4 style="font-size: 17px; font-weight: 700; color: #111111; margin: 0;">Vastu</h4>
					</div>
				</a>
			</div>

			<!-- Item 4: Motivation -->
			<div style="flex: 0 0 18%; max-width: 18%; margin-bottom: 20px;">
				<a href="motivation.html" style="text-decoration: none; color: inherit; display: block; height: 100%;">
					<div style="background: #ffffff; border-radius: 8px; padding: 30px 15px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.3s ease;">
						<div style="width: 130px; height: 130px; border-radius: 50%; overflow: hidden; margin-bottom: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
							<img src="images/grow images/e6235a83-7825-4a37-ab24-29ae325f5b52.png" alt="Motivation" style="width: 100%; height: 100%; object-fit: cover;">
						</div>
						<h4 style="font-size: 17px; font-weight: 700; color: #111111; margin: 0;">Motivation</h4>
					</div>
				</a>
			</div>

			<!-- Item 5: Motivation Podcasts -->
			<div style="flex: 0 0 18%; max-width: 18%; margin-bottom: 20px;">
				<a href="motivation_podcasts.html" style="text-decoration: none; color: inherit; display: block; height: 100%;">
					<div style="background: #ffffff; border-radius: 8px; padding: 30px 15px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.06); height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.3s ease;">
						<div style="width: 130px; height: 130px; border-radius: 50%; overflow: hidden; margin-bottom: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
							<img src="images/grow images/d4e9845d-baff-49fb-a5a2-2da5512fd062.png" alt="Motivation Podcasts" style="width: 100%; height: 100%; object-fit: cover;">
						</div>
						<h4 style="font-size: 17px; font-weight: 700; color: #111111; margin: 0;">Motivation Podcasts</h4>
					</div>
				</a>
			</div>
		</div>
	</div>
</div>
<!-- Learn & Grow Section End -->`;
    
    html = html.substring(0, startIndex) + newSection + html.substring(endIndex);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Learn & Grow section updated in index.html');
} else {
    console.log('Could not find Learn & Grow section in index.html');
}
