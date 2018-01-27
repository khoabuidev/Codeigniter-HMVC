
jQuery(document).ready(function() {
   userFormValidate();
   test_popup();
});


function userFormValidate()
{
    jQuery('#frmUser').validate({
        ajax: false,
		onSubmit: function() {
		    
		},              
		rules: [
        {
    		name: 'username',
    		required: true,
    		message: 'username is required'
		},
        {
            name: 'password',
            required: true,
            message: 'password is required'
        },
        {
            name: 'passconf',
            repassword: true,
            checkField: 'password',
            message: 'password is not match'
        },
        {
            name: 'email',
            email: true,
            message: 'email is required'
        }    
		],
		alert: function( el ) {
			var elWrapper = el.closest( '.span-validate' ),
				layer = jQuery( '<div class="alertLayer">' + el.data('message') + '</div>' );
			el.focus();
			layer
				.appendTo( document.body )
				.css({
					'top': elWrapper.offset().top + elWrapper.height(),
					'left': elWrapper.offset().left,
					'width': elWrapper.width()
				});
			setTimeout(function() {
				layer.remove();
			}, 5000);
		} 
    });
		
}

function test_popup()
{       
    jQuery( document ).on( "click", "#testPopup", function() {
        jQuery("body").mask();    
        jQuery("body").css("overflow", "auto");
        jQuery.ajax({
    		url: URL_POPUP,
            type: 'POST',
            data: {
                //id : id,
                act: 'test'                
            },
    		timeout:  15000,
    		success: function(response) {
                var htmlPopup = jQuery(response).css({'position':'absolute'}).appendTo(document.body).popup();
                jQuery("body").unmask();
                htmlPopup.find('.close').click(function() {
                    htmlPopup.popup('close');
                    jQuery("body").css("overflow", "hidden");
                });
                
    		},
    		error: function () {
    			alert(url + ' is not valid');
    		}
    	});
    });
}
    
function gselectper()
{
        jQuery( document ).on( "click", "#gselectper", function() {
        jQuery("body").mask(maison_waiting);    
        jQuery("body").css("overflow", "auto");
        jQuery.ajax({
            url: maison_ajax_url,
            type: 'POST',
            data: {                
                act: 'perimeter_cookie'           
            },
            timeout:  15000,
            success: function(response) {
                var htmlPopup = jQuery(response).css({'position':'absolute'}).appendTo(document.body).popup();
                jQuery("body").unmask();
                htmlPopup.find('.tclose').click(function() {
                    htmlPopup.popup('close');
                    jQuery("body").css("overflow", "hidden");
                });

                htmlPopup.find('#frmPerimeter').validate({
                    ajax: true,
                    onSubmit: function() {                    
                        jQuery(".popup").mask(maison_processing);
                        var url = jQuery(this).attr('action');  
                        jQuery.post(url, jQuery(this).serialize(), function(response){  
                            jQuery(".popup").unmask();
                            jQuery("body").css("overflow", "hidden");                             
                            htmlPopup.popup('close');                    
                        }); 
                        
                    },              
                    rules: [   
                    ],
                    alert: function( el ) {
                        var elWrapper = el.closest( '.projectvalidate' ),
                            layer = jQuery( '<div class="alertLayer">' + el.data('message') + '</div>' );
                        el.focus();
                        layer
                            .appendTo( document.body )
                            .css({
                                'top': elWrapper.offset().top + elWrapper.height(),
                                'left': elWrapper.offset().left,
                                'width': elWrapper.width()
                            });
                        setTimeout(function() {
                            layer.remove();
                        }, maison_timeout);
                    } 
                })
                
            },
            error: function () {
                alert(url + ' is not valid');
            }
        });
    });    
}