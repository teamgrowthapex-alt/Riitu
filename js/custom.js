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
		$(".ast_menu").toggleClass("open");
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
							 text.includes('book appointment') || 
							 $(this).hasClass('buy_btn') || 
							 href.includes('checkout.html') || 
							 href.includes('appointment.html');
							 
		// Allow logout links or actual login buttons to work
		if ($(this).hasClass('open-login-modal') || href.includes('#login-dialog') || href.includes('logout')) {
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

.ready(function(){
    // Require login for Buy Now and Book Appointment buttons
    body.on('click', 'a, button', function(e) {
        var text = (.text() || '').trim().toLowerCase();
        var href = .attr('href') || '';
        
        var isAuthRequired = text.includes('buy now') || 
                             text.includes('book appointment') || 
                             .hasClass('buy_btn') || 
                             href.includes('checkout.html') || 
                             href.includes('appointment.html');
                             
        // Allow logout links or actual login buttons to work
        if (.hasClass('open-login-modal') || href.includes('#login-dialog') || href.includes('logout')) {
            isAuthRequired = false;
        }

        if (isAuthRequired) {
            var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                e.preventDefault();
                // Check if magnificPopup is available
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

