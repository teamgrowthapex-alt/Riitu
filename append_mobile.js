const fs = require('fs');

const appendCSS = `
@media (max-width: 991px) {
    .ast_top_header {
        padding: 10px 0;
    }
    .ast_contact_details ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }
    .ast_contact_details ul li {
        margin: 0 !important;
        padding: 0 !important;
        font-size: 14px;
    }
    .ast_autho_wrapper {
        margin-top: 10px;
        display: block !important;
    }
    .ast_autho_wrapper ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
    }
    .ast_autho_wrapper ul li {
        padding: 0 !important;
        margin: 0 !important;
        float: none !important;
    }
    .ast_autho_wrapper ul li a {
        font-size: 13px !important;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    
    /* Fix logo and hamburger menu alignment */
    .ast_header_bottom {
        padding: 15px 0 !important;
        position: relative;
    }
    .ast_logo {
        text-align: left;
        display: block;
        padding: 0;
    }
    .ast_logo img {
        max-width: 140px;
    }
    .ast_menu_btn {
        top: 50% !important;
        transform: translateY(-50%) !important;
        margin: 0 !important;
        right: 15px !important;
    }
}
`;

fs.appendFileSync('css/style.css', appendCSS);
console.log('Mobile styles appended.');
