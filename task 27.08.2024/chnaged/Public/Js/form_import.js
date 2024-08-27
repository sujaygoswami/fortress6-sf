jQuery(document).ready(function() {
	
	jQuery('.send_pass_notification').click(function(e) {
		e.preventDefault();
		if(jQuery(this).attr('data-trigger') == 'no'){
			var url = jQuery(this).attr('href');
			var data = {}
			jQuery.ajax({
				url: url,
				data: data,
				type: 'GET',
				dataType: 'json',
				beforeSend: function(){
				},
			}).done(function(response){ 
				jQuery('#sent_message_'+response.uid).html(response.message);
				jQuery('#sent_btn_'+response.uid).attr('data-trigger', 'yes');
				jQuery('#sent_btn_'+response.uid).addClass('btn_clicked');
			});
		}
		
	});

	jQuery(document).on("click", '.select_all', function() {
			var className = jQuery(this).data('action');
			if(this.checked) {
			    // Iterate each checkbox
			    jQuery('.'+className).each(function() {
			        this.checked = true;                        
			    });
			} else {
			    jQuery('.'+className).each(function() {
			        this.checked = false;                       
			    });
			}
	});
	jQuery('#delete_all_user').submit(function(e) {
			if(!confirm("Are you sure to delete these users ?")){
				e.preventDefault();
			}
	});
	//alert("");

	jQuery('#import_option').change(function(){
   		 var content = jQuery(this).val();
    	jQuery('#match_by_row').hide();
    	if(content == 'update'){
    		jQuery('#match_by_row').show();
    	}
	});

	jQuery('#google_image').click(function(){
		jQuery('#google_folder_box').hide();
   		if(jQuery('#google_image').is(':checked')){
   			jQuery('#google_folder_box').show();
   		}
	});

	jQuery('#import_preview').submit(function(e) {

		var submit_ok = true;

		if (jQuery("#import_option").val() ==''){
			alert("Import Option is mandatory!");
			submit_ok = false;
			e.preventDefault();
		}
		else if (jQuery("#import_option").val() =='update' && jQuery("#match_by").val() ==''){
			alert("Match By is mandatory!");
			submit_ok = false;
			e.preventDefault();
		}
		else if(jQuery('#google_image').is(':checked') && jQuery("#google_folder").val() ==''){
			alert("Google Folder ID is mandatory!");
			submit_ok = false;
			e.preventDefault();
		}


		var column_options = [];
		jQuery.each(jQuery(".column_options"), function(){    
			if(jQuery(this).val()!=''){
				column_options.push(jQuery(this).val());
			}
		});
		var submit_mandatory = true;
		var submit_mandatory_field = [];
		var mandatory = JSON.parse(mandatoryFields);
		for (var key in mandatory) {
			if (mandatory.hasOwnProperty(key)) {
			  //console.log( key+" "+mandatory[key]);
			  if(!inArray(key,column_options)){
			  	submit_mandatory = false;
			  	submit_mandatory_field.push(mandatory[key]);
			  }
			}
		}
		if(submit_ok && !submit_mandatory){
			alert("These Options "+submit_mandatory_field.join(", ")+" are mandatory!");
			submit_ok = false;
			e.preventDefault();
		}

		
		var submit_check= true;
		var submit_check_field = [];
		var check = JSON.parse(checkFields);
		for (var key in check) {
			if (check.hasOwnProperty(key)) {
			  //console.log( key+" "+mandatory[key]);
			  if(!inArray(key,column_options)){
			  	submit_check = false;
			  	submit_check_field.push(check[key]);
			  }
			}
		}
		if(submit_ok && !submit_check){
			if(!confirm("Are you sure to import this without "+submit_check_field.join(", ")+" ?")){
				e.preventDefault();
			}
		}

		
	});
});
function inArray(str,array){
	// console.log(str);
	// console.log(array);
	rt = false;
	for(i=0;i<array.length;i++){
		if(str==array[i]){
			rt = true;
			break;
		}
	}
	return rt;
}

