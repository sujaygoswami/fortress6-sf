/* = Config options for different scripts used at template
-----------------------------------------------------------------------------*/
(function ($) {
    "use strict";

    /* = Header
------------------------------------------------------*/

    // Cache Header
    var $header = $('header');

    // Get height of header to use later as starting point
    var $hHeight = $header.height();

    // Set initial position to current position on page
    var prevTop = $(window).scrollTop();

    // Scroll event
    $(window).on('scroll', function (e) {
		var st;
        st = $(this).scrollTop(); // Set scroll location
        if (st > prevTop && st > $hHeight) {
            $header.addClass('header-scrolling');
        } else {
            $header.removeClass('header-scrolling');
        }
        prevTop = st;
    });


    /* = Toggle icon 
------------------------------------------------------*/
    $(".toggleBtn").on('click', function () {
        $(this).children('.uk-icon-angle-double-up, .uk-icon-angle-double-down').toggleClass("uk-icon-angle-double-up uk-icon-angle-double-down");
    });


    /* = Carousel
------------------------------------------------------*/
    $("#carousel").owlCarousel({
        items: 4, //4 items above 1000px browser width
    });

    $("#carousel-auto").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items: 4,
    });

    $("#sidebar-clients").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        singleItem: true,
        pagination: false,
    });

    $("#slide1").owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        singleItem: true,
    });

    $("#testimonials").owlCarousel({
        autoPlay: 6000, //Set AutoPlay to 6 seconds
        singleItem: true,
    });


    /* = Isotope (portfolio)
------------------------------------------------------*/
    var $container = $('#portfolioContainer');
    $container.imagesLoaded(function () {
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });

        $('.portfolioFilter ul a').click(function () {
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
            });
            return false;
        });

        var $optionSets = $('.portfolioFilter ul'),
            $optionLinks = $optionSets.find('a');

        $optionLinks.click(function () {
            var $this = $(this);
            // don't proceed if already selected
            if ($this.hasClass('current')) {
                return false;
            }
            var $optionSet = $this.parents('.portfolioFilter ul');
            $optionSet.find('.current').removeClass('current');
            $this.addClass('current');
        });
    });

    /* = End config options for different scripts used at template
======================================================*/
})(jQuery);



// wallet pass js
jQuery(document).ready(function(){
    
    function isAppleDevice(){
        return (
        (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
        (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
        (navigator.userAgent.toLowerCase().indexOf("ipod") > -1)
        );
        }
        var isAndroid = navigator.userAgent.toLowerCase().indexOf("android");
        var appStoreURL = "";
        if(isAndroid > -1){
        jQuery('body').addClass('android-device');
        jQuery('html').addClass('android-device');
        }
        else if( isAppleDevice() ){
        jQuery('body').addClass('ios-device');
        jQuery('html').addClass('ios-device');
        
          // jQuery( window ).on( "orientationchange", function( event ) {
          //   location.reload();
          // });
        
        
        }


        if (jQuery('body').hasClass('android-device')) {
            jQuery('.android-col').detach().insertBefore('.apple-col');
        }

});

jQuery(window).on('load', function(){
    jQuery('.wallet-pass-module').addClass('loaded-visible');
});