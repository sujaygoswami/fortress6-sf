jQuery(document).ready(function(){
    jQuery('.generatepdfpop > .btn').click(function(){
        jQuery(this).parent().find('.dialog-content').fadeIn(200);
        console.log('modal-open');
    });

    jQuery('.generatepdfpop i.close').click(function(){
        jQuery(this).parents('.generatepdfpop').find('.dialog-content').fadeOut(200);
        console.log('modal-dismissed');
    });

});