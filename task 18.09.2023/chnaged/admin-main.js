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





//Check Mobile Devices
var checkMobile = function(){

    //Check Device
    var isTouch = ('ontouchstart' in document.documentElement);

    //Check Device //All Touch Devices
    if ( isTouch ) {

        jQuery('body').addClass('touch');

        

    }
    else {

        jQuery('body').addClass('no-touch');

    };

};

//Execute Check
checkMobile();











// object notation
var site = {}



site.MIANMINVIEWHEIGHT = function() {
var HEADERHEIGHT = jQuery('header.header').height();
var WINHEIGHT = jQuery(window).height();

jQuery('main.min-view-height').css('min-height', WINHEIGHT - HEADERHEIGHT);


};


site.MIANMINVIEWHEIGHT();




jQuery(window).resize(function(){

  site.MIANMINVIEWHEIGHT();

});



jQuery( window ).on( "orientationchange", function( event ) {

   
          
});







// set back

jQuery('.set-back').each(function(){

 var SETBACK = jQuery(this).find('img').attr('src');
  jQuery(this).css('background-image', 'url(' + SETBACK + ')');

});










jQuery('.touch .has-submenu > a').addClass('dual-click');
   
   jQuery(document).on( "click", ".dual-click", function(event) {
        
        jQuery(".dual-click").not(this).removeClass("clicked");
        jQuery(this).toggleClass("clicked");
        if (jQuery(this).hasClass("clicked")) {
            event.preventDefault();
        }
    });


// go top
 jQuery('.go-top').click(function(){
   jQuery('html, body').animate({scrollTop: 0}, 400);
  
});

// datepicker
// jQuery('#from').datepicker({ 
//   dateFormat: 'dd.mm.yy'
// });
// jQuery('#to').datepicker({ 
//   dateFormat: 'dd.mm.yy',
//   minDate: 0
// });

// jQuery('.edit-form-submit').click(function(){
//   var TOVAL = jQuery(this).parents('.site-form-type-three').find('#to').val();
//   console.log(TOVAL);
// });

// site-form-type-three
jQuery('.site-form-type-three .form-row').each(function(){
  var LENGTH = jQuery(this).find('.field-block').length;

  if(LENGTH < 2){
    jQuery(this).find('.field-block').addClass('stand-alone');
  }

});


});








// load
jQuery(window).load(function(){




// match height
  jQuery('.equal-row').each(function() {
       jQuery(this).children('.equal-block').matchHeight();
  });

  jQuery('.element-row').each(function() {
       jQuery(this).children('.equal-block').matchHeight();
  });







var siteLoad = {}
siteLoad.BROWSERDETECTION = function() {
    if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ){
      // alert('Opera');
    }
    else if(navigator.userAgent.indexOf("Chrome") != -1 ){
      // alert('Chrome');
    }
    else if(navigator.userAgent.indexOf("Safari") != -1){
      jQuery('body').addClass('browser-safari');
    }
    else if(navigator.userAgent.indexOf("Firefox") != -1 ){
      // alert('Firefox');
    }
    else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){
    // alert('IE'); 
    }  
    else{
    // alert('unknown');
    }
};

siteLoad.BROWSERDETECTION();


siteLoad.MAINFINALHEIGHT = function() {

  var MAINFINALHEIGHT = jQuery('main.min-view-height').height();
  jQuery('main.min-view-height').height(MAINFINALHEIGHT);

  
    

};

siteLoad.MAINFINALHEIGHT();




jQuery(window).resize(function(){
  
});





});

