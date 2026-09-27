const fs = require('fs');

// Add to custom.js
let js = fs.readFileSync('js/custom.js', 'utf8');
if (!js.includes('mobile-only-header-items')) {
    const mobileJs = `
// Move top header items to mobile menu
$(document).ready(function() {
    if ($('.ast_menu').length && $('.ast_top_header').length) {
        var $mobileItems = $('<li class="mobile-only-header-items" style="background: #111; padding: 15px 0;"></li>');
        
        var $contactInfo = $('.ast_contact_details ul').html();
        var $authInfo = $('.ast_autho_wrapper > ul').html();
        
        if ($contactInfo) {
            $mobileItems.append('<ul class="mobile-contact-list" style="display:flex; flex-direction:column; gap:10px; padding:0; margin:0 0 15px 0; list-style:none; text-align:center;">' + $contactInfo + '</ul>');
        }
        if ($authInfo) {
            $mobileItems.append('<ul class="mobile-auth-list" style="display:flex; flex-direction:column; gap:15px; padding:0; margin:0; list-style:none; text-align:center;">' + $authInfo + '</ul>');
        }
        
        // Only append if it doesn't already exist
        if ($mobileItems.children().length > 0) {
            $('.ast_menu > ul').append($mobileItems);
        }
    }
});
`;
    fs.appendFileSync('js/custom.js', mobileJs);
}

// Add CSS to style.css
let css = fs.readFileSync('css/style.css', 'utf8');
if (!css.includes('.mobile-only-header-items')) {
    const mobileCss = `
.mobile-only-header-items {
    display: none !important;
}
@media (max-width: 991px) {
    .mobile-only-header-items {
        display: block !important;
    }
    .mobile-only-header-items li {
        display: block !important;
        float: none !important;
        padding: 0 !important;
        margin: 0 !important;
    }
    .mobile-only-header-items li a {
        color: #fff !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 8px !important;
    }
    .mobile-only-header-items li i {
        color: #ff7700 !important;
    }
    /* Hide top header entirely */
    .ast_top_header {
        display: none !important;
    }
}
`;
    fs.appendFileSync('css/style.css', mobileCss);
}
console.log('Mobile menu migration completed.');
