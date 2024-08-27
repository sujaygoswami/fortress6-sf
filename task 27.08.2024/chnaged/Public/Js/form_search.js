// Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
function resizedataURL(datas, x, y, wantedWidth, wantedHeight){
    return new Promise(async function(resolve,reject){

        // We create an image to receive the Data URI
        var img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = function()
        {        
            // We create a canvas and get its context.
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // We set the dimensions at the wanted size.
            canvas.width = wantedWidth;
            canvas.height = wantedHeight;

            // We resize the image with the canvas method drawImage();
            ctx.drawImage(this, x, y, wantedWidth, wantedHeight, 0, 0, wantedWidth, wantedHeight);

            var dataURI = canvas.toDataURL();

            // This is the return of the Promise
            resolve(dataURI);
        };

        // We put the Data URI in the image's src attribute
        img.src = datas;

    })
}

jQuery(document).ready(function() {

	function iOSversion() {
		if (/iP(hone|od|ad)/.test(navigator.platform)) {
			// supports iOS 2.0 and later: <https://bit.ly/TJjs1V>
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			return [parseInt(v[1], 10)];
		}
	}

	iOSver = iOSversion();

	jQuery('#show_image_fieldbutton').click(function(e) {
			e.preventDefault();
			jQuery('#demo_image_div').hide();
			jQuery('#upload_form_div').show();
	});

	if($('#open-cam').length){
	const webcamElement = document.getElementById('video');
    const canvasElement = document.getElementById('canvas');
    const webcam = new Webcam(webcamElement, 'user', canvasElement);
	var snapPicture;
	var controlHeight;

	$('#open-cam').click(function(){
		if (/iP(hone|od|ad)/.test(navigator.platform)) {
			if (iOSver[0] >= 16) {
				$('#camcam #vid video').addClass('ios16');
			};
		};
		$('#imgtyperror').html('');
		$('#img_upload').val('');
		$('#camcam #wrap').addClass('active');
		webcam.start();
		$('#vid').css('z-index', '30');
      	$('#capture').css('z-index', '20');
		$('#camcam #wrap').addClass('active');
		controlHeight = $('#control').outerHeight();
	});

	var deviceWidth = $(window).width();
	var deviceHeight = $(window).height();
	var staticHeight = 640;
	var frameWidth = deviceWidth;
	var frameHeight;
	var cropLeft = 0;
	var cropTop = 0;
	if(frameWidth > 480){
		frameWidth = 480;
	}

	$('#snap').click(function(event) {
      snapPicture = webcam.snap();
      $('#vid').css('z-index', '20');
      $('#capture').css('z-index', '30');
	  $('#camcam #wrap').removeClass('active');
	  if(staticHeight+controlHeight > deviceHeight){
	  	frameHeight = staticHeight - (deviceHeight - staticHeight);
	  } else {
	  	frameHeight = staticHeight;
	  };

	  if (/iP(hone|od|ad)/.test(navigator.platform)) {
		if (iOSver[0] >= 16) {
		  	frameWidth = deviceWidth * .54;
		  	frameHeight = staticHeight * .56;
		  	cropLeft = deviceWidth * .23;
		  	cropTop = staticHeight * .25;
	  	};
	  };

	  var newDataURI = resizedataURL(snapPicture, cropLeft, cropTop, frameWidth, frameHeight);

	  newDataURI.then(vals => {
	  	$('#img_show').attr('src',vals);
	  	$('#seli_mode').val(vals);
	  });
	  //$('#img_show').attr('src',snapPicture);
	  //$('#seli_mode').val(snapPicture);
	  webcam.stop();
      $('#upload_mode').val('selfie');
      //$('#crop_image').val(1);
      $('#submitb').show();
    });

	$('#perfect').click(function(event) {
    	$('#camcam #wrap').removeClass('active');
		$('#img_show').attr('src',snapPicture);
		webcam.stop();
		$('#seli_mode').val(snapPicture);
        $('#upload_mode').val('selfie');
        //$('#crop_image').val(1);
        $('#submitb').show();
    });
	
    $('#retake').click(function(event) {
	  webcam.start();
      $('#vid').css('z-index', '30');
      $('#capture').css('z-index', '20');
    });
	};

 var max_file_size= 5*1024*1024;

	jQuery('#img_upload').on({

		dragover: function(){
			return false;
		},
		drop:   function(){
			return false;
		}

	});
	jQuery('#data-form-school').submit(function(e) {
		if(jQuery('#school_confirm').length>0){
			if(!jQuery('#school_confirm').is(":checked")){
				alert(jQuery('#school_confirm_error').data('error'));
				e.preventDefault();
			}
		}

	});

	jQuery('#passwordform').submit(function(e) {
		if(jQuery('#selectday').val()==" "){
			jQuery('#dayerror').html(jQuery('#dayerror').data('error'));
			e.preventDefault();
		}
		if(jQuery('#selectmonth').val()==" "){
			jQuery('#montherror').html(jQuery('#montherror').data('error'));
			e.preventDefault();
		}

		if(jQuery('#selectyear').val()==" "){
			jQuery('#yearerror').html(jQuery('#yearerror').data('error'));
			e.preventDefault();
		}
		if(jQuery('input[name="tx_schulfoto_sfilter[password]"]').val()==''){
		   jQuery('#passderror').html(jQuery('#passderror').data('error'));
			e.preventDefault();
		}

	});
	jQuery('#trigger_file_upload').click(function(e) {
		jQuery('#img_upload').trigger('click');
	});
	
	jQuery('#finalform').submit(function(e) {
		 if(jQuery('#img_upload').val()!='' && $('#upload_mode').val()=='normal'){
			var file = jQuery('#img_upload')[0].files[0];

			// Ensure it's an image
		    if(file.type.match(/image.*/)) {
		        console.log('An image has been loaded');

		        // Load the image
		        var reader = new FileReader();
		        reader.onload = function (readerEvent) {
		            var image = new Image();
		            image.onload = function (imageEvent) {

		                // Resize the image
		                var canvas = document.createElement('canvas'),
		                    max_size = 640,// TODO : pull max size from a site config
		                    width = image.width,
		                    height = image.height;
		                if (width > height) {
		                    if (width > max_size) {
		                        height *= max_size / width;
		                        width = max_size;
		                    }
		                } else {
		                    if (height > max_size) {
		                        width *= max_size / height;
		                        height = max_size;
		                    }
		                }
		                canvas.width = width;
		                canvas.height = height;
		                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
		                var dataUrl = canvas.toDataURL('image/png');
		              //  console.log(dataUrl);
		                $('#seli_mode').val(dataUrl);
        				$('#upload_mode').val('selfie');
        				$('#crop_image').val(0);
        				jQuery('#finalform').submit();
		            }
		            image.src = readerEvent.target.result;
		        }
		        reader.readAsDataURL(file);
		    }
		    e.preventDefault();
		}	
	});
	jQuery('#img_upload').click(function(e) {
		jQuery('#imgtyperror').html('');
	});
	jQuery('#selectday').click(function(e) {
		jQuery('#dayerror').html('');
	});
	jQuery('#selectmonth').click(function(e) {
		jQuery('#montherror').html('');
	});
	jQuery('#selectyear').click(function(e) {
		jQuery('#yearerror').html('');
	});

	jQuery('input[name="tx_schulfoto_sfilter[password]"').click(function(e) {
		jQuery('#passderror').html('');
	});

	jQuery('#barcodecheckbox').click(function() {
		if(jQuery(this).prop('checked')) {
			jQuery('#barcodefield').removeAttr('disabled');
		}
		else{
			jQuery('#barcodefield').attr('disabled',true);
		}
	});
	jQuery('#studentcheckbox').click(function() {
		if(jQuery(this).prop('checked')) {
			jQuery('#studentidfield').removeAttr('disabled');
		}
		else{
			jQuery('#studentidfield').attr('disabled',true);
		}
	});

    jQuery("#img_upload").change(function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                jQuery('#img_show').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
	    jQuery('#upload_mode').val('normal');
	    jQuery('#crop_image').val(0);
	    jQuery('#seli_mode').val('');
	    jQuery('#submitb').show();

    });

	if(jQuery('#birthday').length){
		jQuery('#birthday').datepicker({
			changeMonth: true,
				changeYear: true,
				yearRange:"-500:+500",
				monthNames: ['Januar','Februar','März','April','Mai','Juni',
				'Juli','August','September','Oktober','November','Dezember'],
				monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
				'Jul','Aug','Sep','Okt','Nov','Dez'],
				dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
				dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
				dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
				dateFormat: 'dd.mm.yy',
				firstDay: 1
		});
	};

	if(jQuery('#expiryday').length){
		jQuery('#expiryday').datepicker({
			changeMonth: true,
				changeYear: true,
				yearRange:"-500:+500",
				monthNames: ['Januar','Februar','März','April','Mai','Juni',
				'Juli','August','September','Oktober','November','Dezember'],
				monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun',
				'Jul','Aug','Sep','Okt','Nov','Dez'],
				dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
				dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
				dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
				dateFormat: 'dd.mm.yy',
				firstDay: 1,
				minDate: 0
		});
	};

	
		// birthday
		var dateFrom = document.getElementById('birthday');
		if(dateFrom){
		function checkValue(str, max) {
		if (str.charAt(0) !== '0' || str == '00') {
			var num = parseInt(str);
			if (isNaN(num) || num <= 0 || num > max) num = 1;
			str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
		};
		return str;
		};

		dateFrom.addEventListener('input', function(e) {
		this.type = 'text';
		var input = this.value;
		if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
		var values = input.split('.').map(function(v) {
			return v.replace(/\D/g, '')
		});
		if (values[0]) values[0] = checkValue(values[0], 31);
		if (values[1]) values[1] = checkValue(values[1], 12);
		var output = values.map(function(v, i) {
			return v.length == 2 && i < 2 ? v + '.' : v;
		});
		this.value = output.join('').substr(0, 10);
		});

		dateFrom.addEventListener('blur', function(e) {
		this.type = 'text';
		var input = this.value;
		var values = input.split('.').map(function(v, i) {
			return v.replace(/\D/g, '')
		});
		var output = '';
		
		if (values.length == 3) {
			var year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
			var month = parseInt(values[0]) - 1;
			var day = parseInt(values[1]);
			var d = new Date(year, month, day);
			if (!isNaN(d)) {
			document.getElementById('result').innerText = d.toString();
			var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
			output = dates.map(function(v) {
				v = v.toString();
				return v.length == 1 ? '0' + v : v;
			}).join(' / ');
			};
		};
		this.value = output;
		});
		}
		// edit birthday date


		// edit expiry date
		var dateTo = document.getElementById('expiryday');
		if(dateTo){
		function checkValue(str, max) {
		if (str.charAt(0) !== '0' || str == '00') {
			var num = parseInt(str);
			if (isNaN(num) || num <= 0 || num > max) num = 1;
			str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
		};
		return str;
		};

		dateTo.addEventListener('input', function(e) {
		this.type = 'text';
		var input = this.value;
		if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
		var values = input.split('.').map(function(v) {
			return v.replace(/\D/g, '')
		});
		if (values[0]) values[0] = checkValue(values[0], 31);
		if (values[1]) values[1] = checkValue(values[1], 12);
		var output = values.map(function(v, i) {
			return v.length == 2 && i < 2 ? v + '.' : v;
		});
		this.value = output.join('').substr(0, 10);
		});

		dateTo.addEventListener('blur', function(e) {
		this.type = 'text';
		var input = this.value;
		var values = input.split('.').map(function(v, i) {
			return v.replace(/\D/g, '')
		});
		var output = '';
		
		if (values.length == 3) {
			var year = values[2].length !== 4 ? parseInt(values[2]) + 2000 : parseInt(values[2]);
			var month = parseInt(values[0]) - 1;
			var day = parseInt(values[1]);
			var d = new Date(year, month, day);
			if (!isNaN(d)) {
			document.getElementById('result').innerText = d.toString();
			var dates = [d.getMonth() + 1, d.getDate(), d.getFullYear()];
			output = dates.map(function(v) {
				v = v.toString();
				return v.length == 1 ? '0' + v : v;
			}).join(' / ');
			};
		};
		this.value = output;
		});
		}
		// edit expiry date
		
		jQuery('#student_print_pdf').click(function(e) {
			jQuery('#pdf_download_form').submit();
		});

	jQuery('#new_form,#update_form').submit(function(e) {

			if(jQuery('#firstname').val()==''){
				jQuery('#firstnameerror').html('Vorname(n) eingeben');
				e.preventDefault();
			}
			if(jQuery('#lastname').val()==''){
				jQuery('#lastnameerror').html('Nachname(n) eingeben');
				e.preventDefault();
			}

			if(jQuery('#birthday').val()==''){
				jQuery('#birthdayerror').html('Geburtsdatum eingeben');
				e.preventDefault();
			}
			if(jQuery('#expiryday').val()==''){
			jQuery('#expiryerror').html('Gültigkeit eingeben');
				e.preventDefault();
			}
			var givenDate=jQuery('#expiryday').datepicker('getDate');
			if(givenDate){
				var TodayDate = new Date();
				TodayDate.setHours(0,0,0,0);
				if (givenDate<TodayDate) {
					jQuery('#expiryerror').html('Past Date Not Allowed');
					e.preventDefault();
				}

			}
	
		
	});
	jQuery('#expiryday').click(function(e) {
		jQuery('#expiryerror').html('');
	});
	jQuery('#birthday').click(function(e) {
		jQuery('#birthdayerror').html('');
	});
	jQuery('#firstname').click(function(e) {
		jQuery('#firstnameerror').html('');
	});
	jQuery('#lastname').click(function(e) {
		jQuery('#lastnameerror').html('');
	});

	jQuery("#class_value").change(function(){
		jQuery('#class_form').submit();
	});

});

// 27.08.2024 photo save alert
jQuery(document).ready(function(){
	jQuery('.photo-save-trigger').click(function(){
		jQuery(this).addClass('action-disabled-btn');
		jQuery(this).parent().find('.hidden-alert-msg').show();
	});
});
// 27.08.2024