/*------------------------------------------------------------------
[Custom Scripts]

Project:	Astrology
-------------------------------------------------------------------*/
$(document).ready(function(){
	/*search open*/
	$(".ast_search > a").click(function(){
		$(this).siblings(".ast_search_field").toggleClass("open");
	});
	/*cart open*/
	$(".ast_cart > a").click(function(){
		$(this).siblings(".ast_cart_box").toggleClass("open");
	});
	$(".ast_cart_remove").click(function(){
		$(this).closest("li").fadeOut(500);
	});
	/*Mobile Manu*/
	$(".ast_menu_btn").click(function(){
		$(".ast_main_menu_wrapper").toggleClass("ast_main_menu_hide");
	});
	/*Owl Carousl*/	
	$(".ast_testimonials_slider .owl-carousel").owlCarousel({
	    loop:true,
	    margin:30,
	    nav:false,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:2
	        }
	    }
	});
	
	$(".ast_horoscopes_wrapper_slider .owl-carousel").owlCarousel({
	    loop:true,
	    margin:30,
	    nav:true,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:4
	        }
	    }
	});
	
	$(".ast_gemstones_slider .owl-carousel").owlCarousel({
	    loop:true,
	    margin:30,
	    nav:true,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:4
	        }
	    }
	});
	
	$('.popup-with-zoom-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	$('.timer').appear(function() {
		var $this = $(this);
		var countTo = $this.attr('data-to');
		$({
			countNum: $this.attr('data-from')
		}).animate({
			countNum: countTo
		},
		{
			duration: 5000,
			easing:'swing',
			step: function() {
				$this.text(Math.floor(this.countNum));
			},
			complete: function() {
				$this.text(this.countNum);
			}
		});
	},{accY: -100});

	// Require login for Buy Now and Book Appointment buttons
	$('body').on('click', 'a, button', function(e) {
		var text = ($(this).text() || '').trim().toLowerCase();
		var href = $(this).attr('href') || '';
		
		var isAuthRequired = text.includes('buy now') || 
							 text.includes('add to cart') ||
							 text.includes('book appointment') || 
							 $(this).hasClass('buy_btn') || 
							 href.includes('checkout.html') || 
							 href.includes('appointment.html');
							 
		// Allow logout links or actual login/signup buttons to work
		if ($(this).hasClass('open-login-modal') || href.includes('#login-dialog') || href.includes('#signup-dialog') || href.includes('logout')) {
			isAuthRequired = false;
		}

		if (isAuthRequired) {
			var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
			if (!isLoggedIn) {
				e.preventDefault();
				if ($.fn.magnificPopup) {
					$.magnificPopup.open({
						items: { src: '#login-dialog' },
						type: 'inline',
						fixedContentPos: false,
						fixedBgPos: true,
						overflowY: 'auto',
						closeBtnInside: true,
						preloader: false,
						midClick: true,
						removalDelay: 300,
						mainClass: 'my-mfp-zoom-in'
					});
				} else {
					alert('Please login first to proceed.');
				}
				return false;
			}
		}
	});

});

$(document).ready(function(){
    // Make home page slider image clickable to redirect to appointment page
    $('.ast_slider_wrapper, .ast_hero_image_wrapper').css('cursor', 'pointer').on('click', function(e) {
        if (!$(e.target).closest('a, button, input, .ast_btn').length) {
            window.location.href = 'appointment.html';
        }
    });
});

window.togglePasswordVisibility = function(inputId, icon) {
    var input = document.getElementById(inputId);
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    }
};


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
