const fs = require('fs');
let js = fs.readFileSync('js/astrology-interactive.js', 'utf8');

const regex = /\$ul\.append\(`[\s\S]*?<i class="fa fa-user-circle"[\s\S]*?Sign Out[\s\S]*?`\);/;
const newHtml = `$ul.append(\`
                        <li>
                            <a href="\${portalUrl}" title="\${portalText}" style="color: #d4af37; font-size: 24px; display: inline-flex; align-items: center; padding: 0 10px;">
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" id="btn_signout_trigger" title="Sign Out" style="color: #ff6b6b; font-size: 24px; display: inline-flex; align-items: center; padding: 0 10px;">
                                <i class="fa fa-sign-out" aria-hidden="true"></i>
                            </a>
                        </li>
                    \`);`;

if (regex.test(js)) {
    js = js.replace(regex, newHtml);
    fs.writeFileSync('js/astrology-interactive.js', js);
    console.log('Successfully replaced with regex!');
} else {
    console.log('Not found with regex either.');
}
