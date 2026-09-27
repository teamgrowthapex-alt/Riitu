const fs = require('fs');
const path = require('path');

const dir = 'd:\\riittu\\astrology-and-horoscope-responsive-html-5-template-2026-04-08-12-53-54-utc\\mainfile\\astrology-placeholder\\version-1';

const oldAboutMenu = '<li><a href="about.html">about</a></li>';
const newAboutMenu = `
<li class="as_submenu_li"><a href="#">about us <i class="fa fa-angle-down"></i></a>
    <ul class="submenu">
        <li><a href="about.html">Riitu Raghav</a></li>
        <li><a href="gallery.html">Gallery</a></li>
    </ul>
</li>`;

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Update navigation
    if (html.includes(oldAboutMenu)) {
        html = html.replace(oldAboutMenu, newAboutMenu.trim());
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated nav in ${file}`);
    } else if (html.includes('<li><a href="about">about</a></li>')) {
        html = html.replace('<li><a href="about">about</a></li>', newAboutMenu.trim());
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated nav in ${file}`);
    }
});

// Create gallery.html
const templatePath = path.join(dir, 'services.html');
const galleryPath = path.join(dir, 'gallery.html');

let templateHtml = fs.readFileSync(templatePath, 'utf8');

// Update title and breadcrumb
templateHtml = templateHtml.replace(/<title>.*?<\/title>/, '<title>Gallery & Certifications | MindMitra Riitu</title>');
templateHtml = templateHtml.replace(/<h2>services<\/h2>/, '<h2>Gallery</h2>');
templateHtml = templateHtml.replace(/<li><a href="services">services<\/a><\/li>/, '<li><a href="gallery.html">gallery</a></li>');

const galleryContent = `
<!-- Gallery Start -->
<div class="ast_service_wrapper ast_toppadder70 ast_bottompadder70" style="float: left; width: 100%; background-color: #f9f9fc;">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-12 text-center" style="margin-bottom: 45px;">
				<h1 style="font-size: 34px; font-weight: 700; color: #111; margin-bottom: 12px; text-transform: capitalize;">Certifications &amp; <span style="color: #ff7700;">Gallery</span></h1>
				<p style="font-size: 16px; color: #555; max-width: 700px; margin: 0 auto;">Explore the achievements and certifications of Advocate Riitu Raghav.</p>
			</div>
			
			<div class="col-lg-4 col-md-6 col-sm-12 col-12" style="margin-bottom: 25px; float: left;">
				<div style="background: #ffffff; border: 1px solid #e0d0eb; border-radius: 16px; padding: 15px; text-align: center; box-shadow: 0 10px 30px rgba(123,67,151,0.08); height: 100%;">
					<img src="images/content/ritu_expert.png" alt="Riitu Raghav" style="width: 100%; border-radius: 12px; margin-bottom: 15px;">
					<h3 style="font-size: 18px; font-weight: 700; color: #111111; margin-bottom: 8px;">LLM First Division</h3>
					<p style="font-size: 13.5px; color: #555555; line-height: 1.6;">Enrolled Advocate with an LLM in First Division.</p>
				</div>
			</div>
            
			<div class="col-lg-4 col-md-6 col-sm-12 col-12" style="margin-bottom: 25px; float: left;">
				<div style="background: #ffffff; border: 1px solid #e0d0eb; border-radius: 16px; padding: 15px; text-align: center; box-shadow: 0 10px 30px rgba(123,67,151,0.08); height: 100%;">
					<img src="images/content/learn_numerology.png" alt="Numerology Certificate" style="width: 100%; border-radius: 12px; margin-bottom: 15px;">
					<h3 style="font-size: 18px; font-weight: 700; color: #111111; margin-bottom: 8px;">Certified Numerologist</h3>
					<p style="font-size: 13.5px; color: #555555; line-height: 1.6;">Certified in Numerology with over 5+ years of dedicated practice.</p>
				</div>
			</div>
            
			<div class="col-lg-4 col-md-6 col-sm-12 col-12" style="margin-bottom: 25px; float: left;">
				<div style="background: #ffffff; border: 1px solid #e0d0eb; border-radius: 16px; padding: 15px; text-align: center; box-shadow: 0 10px 30px rgba(123,67,151,0.08); height: 100%;">
					<img src="images/content/learn_predictions.png" alt="Tarot Expert" style="width: 100%; border-radius: 12px; margin-bottom: 15px;">
					<h3 style="font-size: 18px; font-weight: 700; color: #111111; margin-bottom: 8px;">Tarot Guidance Expert</h3>
					<p style="font-size: 13.5px; color: #555555; line-height: 1.6;">Professional Tarot Reading and Mindset coaching expert.</p>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Gallery End -->
`;

const servicesStartMarker = '<!--Services Start-->';
const solutionsEndMarker = '<!-- Our Solutions Section End -->';

const startIndex = templateHtml.indexOf(servicesStartMarker);
const endIndex = templateHtml.indexOf(solutionsEndMarker) !== -1 ? templateHtml.indexOf(solutionsEndMarker) + solutionsEndMarker.length : templateHtml.indexOf('<!--Services End-->') + '<!--Services End-->'.length;

if (startIndex !== -1 && endIndex !== -1) {
    let newGalleryHtml = templateHtml.substring(0, startIndex) + galleryContent + templateHtml.substring(endIndex);
    fs.writeFileSync(galleryPath, newGalleryHtml, 'utf8');
    console.log('Created gallery.html successfully.');
}
