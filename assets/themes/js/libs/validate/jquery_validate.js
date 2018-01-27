/**
 * 
 *	Validate
 *
 **/
(function( $ ) {
	$.fn.validate = function( options ) {
		var defaults = {
			ajax: false,
			onSubmit: function(){},
			rules: [],
			alert: function( el ) {
				var layer = $( '<div class="alertLayer">' + el.data('message') + '</div>' );
				el.focus();
				layer
					.appendTo( document.body )
					.css({
						'top': el.offset().top + el.height(),
						'left': el.offset().left,
						'width': el.width()
					});
					
				setTimeout(function() {
					layer.remove();
				}, 2000);
			}
		};
		var o = $.extend( defaults, options );
		return this.each(function() {
			if ( ! $(this).is('form') ) {
				return;
			}
			var that = $( this );
			this.validate = true;
			for ( var i = 0, len = o.rules.length; i < len; i++ ) {
				var rule = o.rules[ i ],
					el = that.find( '[name^=' + rule.name + ']' );
                
				if ( rule.init) {						    
                    if (jQuery.trim(el.val()) == '' || jQuery.trim(el.val()) == jQuery.trim(rule.init)) {                    
					   el
						.val( rule.init )
                        .data('initText', rule.init)
						.bind({
							'focus.validate': function() {
                                $(this).val() == $(this).data('initText') && $(this).val('');
							},
							'blur.validate': function() {
                                $.trim( $(this).val()) == '' &&  $(this).val($(this).data('initText'));
							}
						});
                    }
				}
				if ( rule.message ) {
					el.data( 'message', rule.message );
				}
			}
			
			that.submit(function(e) {
				var valid = true;
				for ( var i = 0, len = o.rules.length; i < len; i++ ) {
					var rule = o.rules[ i ],
						el = that.find( '[name^=' + rule.name + ']' );
						
					if ( ! el.length ) {
						continue;
					}
					var value = el.val();
					if (rule.editor){
						if (CKEDITOR && CKEDITOR.instances){
							if (CKEDITOR.instances[rule.name]){
								value = CKEDITOR.instances[rule.name].getData();
								el.next().data( 'message', el.data('message') );
								el = el.next();
							}
						}
					}
                    if( rule.length){
						if ( value.length < rule.length && value) {
							
							el.data('message', rule.messageLength);
							
							o.alert( el );
							valid = false;
							return false;
						}
					}
                    if ( rule.requiredUser ) {		
                        if (that.find( '[name=' + rule.eqField + ']' ).length) {
                            var uid = parseInt(that.find( '[name=' + rule.eqField + ']' ).val());
                            if (uid <= 0) { 
        						if ( ! value || value === rule.init ) {
        							o.alert( el );
        							valid = false;
        							return false;
        						}
                            }
                        } else {
                            if ( ! value || value === rule.init ) {
    							o.alert( el );
    							valid = false;
    							return false;
    						}
                        }
					    
					}
					if ( rule.required ) {		
					    if ( ! value || value === rule.init ) {
							o.alert( el );
							valid = false;
							return false;
						}
					}
                    
                    if (rule.tenderdate) {
                        if ( value && !isTenderDate(value)) {
                            el.data('message', rule.messageTenderdate);
                            o.alert( el );
							valid = false;
							return false;
                        }
                    }
                    
					if( rule.tag){
						if(that.children(':hidden').last().val() == 0){
							if ( ! value || value === rule.init ) {
								o.alert( el );
								valid = false;
								return false;
							}
						}
					}
					if( rule.number){
						if ( ! /^[0-9]+$/.test(value) ) {
							o.alert( el );
							valid = false;
							return false;
						}
					}
                    if( rule.isnumber){
                        if(isNaN(value) || !value) {
                            o.alert( el );
							valid = false;
							return false;
                        }						
					}
                    if( rule.max99){
                        if(isNaN(value) || !value || parseInt(value) > 99) {
                            o.alert( el );
							valid = false;
							return false;
                        }						
					}
                    
                    if( rule.numbernr){
                        if (value) {
                             if(isNaN(value) || !value) {
                                o.alert( el );
    							valid = false;
    							return false;
                            }		                            
                        }
						
					}
					
					if(rule.numberFormat){
						if ( ! /^[0-9 +.]+$/.test(value) || /\s/.test(value)) {
							o.alert( el );
							valid = false;
							return false;
						}
					}
                    
					if(rule.logo){
						if(that.children('input').last().val() !=0){
							var wrapper = el.closest('div'),
								nextWapper = wrapper.next();
							var checkLogo = true;
							if(!value){
								o.alert( el );
								valid = false;
								return false;
							}
							else if(valid){
								checkLogo = false;
							}		
							if(!nextWapper.length && checkLogo){
								o.alert( el );
									valid = false;
									return false;
							}
						}
						else if(!value){
							o.alert( el );
							valid = false;
							return false;
						}
					}
					if(rule.gallery){
						var wrapper = el.closest('div'),
							prevWapper = wrapper.prev();
						if(prevWapper.find('tr').length <= 1){
							o.alert( el );
								valid = false;
								return false;
						}
					}
					if(rule.constrainTag){
						if(rule.constrain == that.children(':hidden').first().val()){
							if ( ! value || value === rule.init ) {
								o.alert( el );
								valid = false;
								return false;
							}
						}
					}
					if( rule.repassword){
						if (value != that.find( '[name^=' + rule.checkField + ']' ).val()) {
							o.alert( el );
							valid = false;
							return false;
						}
					}
                    
                    if (rule.isURL) {
                        
                        /*
                        var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
                        if (!urlregex.test(value)) {
                            el.data('message', rule.messageURL);
                            o.alert( el );
							valid = false;
							return false;
                        }     
                        */                    
                    }
                    
                    if( rule.emailexists) {
                        if (value) {
                             var uemail = that.find( '[name=' + rule.eqField + ']' ).val();
                             uemail = uemail.trim();
                             //var uid = parseInt(that.find( '[name=' + rule.eqField + ']' ).val());
                             //console.log(value);
                             //if (uid <= 0) {  
                             if (uemail != value) {   
                                 var flag = jQuery.ajax({
                            		url: maison_base_url + '/maison-user/ajax',
                            		type: 'POST',
            		                dataType: "html",
                                    data: {
                                        email: value                                                                                               			
                            		},
                            		success: function(response) {
                                       return 1;                               
                            		},
                            		error: function () {
                            		  return 0;
                            		},
                                    async: false
                            	}).responseText;
                            } else {
                                flag = 0;
                            }
                            //console.log(flag);
                            
                            if (parseInt(flag) == 1) {                            
                                el.data('message', rule.messageExi);
                                o.alert( el );                            
    							valid = false;
    							return false;
                            }
                        }                        
					}
                    
                    if (rule.maxdoc) {
                        if (value) {                               
                            var objTheme = that.find( '[name=theme]' );
                            var themeID = objTheme.val();
                            var maxdoc = objTheme.find(":selected").attr('maxdoc');
                            var numdoc = objTheme.find(":selected").attr('numdoc');
                            var chk = objTheme.find(":selected").attr('chk');
                            //var editEvent = that.find('[name=doc_id]').val();                               
                            if (parseInt(chk) > 0 && parseInt(numdoc) >= parseInt(maxdoc)) {
                                el.data('message', rule.messageMaxdoc + ' ' + maxdoc);
                                o.alert( el );                            
    							valid = false;
    							return false;    
                            }    
                                                     
                                                                                    
                        }
                    }
                    
                    if( rule.flashidexists) {
                    	console.log(value + ' tttt ');
                        if (value) {
                            var newVal = that.find( '[name=' + rule.eqField + ']' ).val();
                            var curVal = that.find( '[name=' + rule.eqField + ']' ).attr('rel');
                            var tid    = that.find( '[name=' + rule.eqField + ']' ).attr('tid');   
                                                                                 
                            //if (newVal != curVal) {
                                 var flag = jQuery.ajax({
                            		url: maison_base_url + '/maison-user/flash-ajax',
                                		type: 'POST',
                		                dataType: "html",
                                        data: {                                            
                                            act : 'check_flash_id',
                                            flash_id : newVal,
                                            tid : tid                                                                                                                             			
                                		},
                                		success: function(response) {
                                           return 1;                               
                                		},
                                		error: function () {
                                		  return 0;
                                		},
                                        async: false
                                	}).responseText;
                            /*} else {
                                flag = 0;
                            } */                                                           
                            if (parseInt(flag) == 1) {                            
                                el.data('message', rule.messageExi);
                                o.alert( el );                            
    							valid = false;
    							return false;
                            }
                        }                    
                    }                        
					
					if ( rule.email ) {
						if ( ! /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test(value) ) {
							o.alert( el );
							valid = false;
							return false;
						}
					}
					if ( rule.phone ) {
						if ( ! /^[0-9]+$/.test(value) ) {
							o.alert( el );
							valid = false;
							return false;
						}
					}
                    if( rule.ieq){
						
							if (parseInt(that.find( '[name=' + rule.eqField1 + ']' ).val()) > parseInt(that.find( '[name=' + rule.eqField2 + ']' ).val())) {
								el.data('message', rule.messageieq);
								o.alert( el );
								valid = false;
								return false;
								
							}
						
					}
                 
					if ( rule.selected ) {					   
						if (value == 0 || value == '') {
						    el.data('message', rule.messageselected);
							o.alert( el );
							valid = false;
							return false;
						}
					}
					if(rule.selectedCus){
						if ( /select/gi.test(value) ) {
							o.alert( el );
							valid = false;
							return false;
						}
					}
				}
				if ( ! valid ) {
					return false;
				} else {
					$.isFunction( o.onSubmit ) && o.onSubmit.apply( that, arguments );					
					if ( o.ajax ) {
						return false;
					}
				}
				return true;
			});
		});
	};
})( jQuery );
