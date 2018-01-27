

/**
 * 
 *	Popup UI
 *
 *
 **/
(function($) {
	/* var settings = {
		autoOpen: true,
		zIndex: 1000,
		duration: 500,
		opacity: 0.5,
		closeButtons: '.close',
		overlay: true,
		overlayClass: 'popup-overlay',
		background: '#000',
		hideThat: false,
		open: function() {},
		close: function() {}
	}; */
	var methods = {
		init: function( options ) {
			var settings = {
				autoOpen: true,
				zIndex: 1030,
				duration: 1500,
				opacity: 0.5,
				closeButtons: '.close',
				overlay: true,
				overlayClass: 'popup-overlay',
				background: '#000',
				hidePopup: false,
				open: function() {},
				close: function() {}
			};
			options = $.extend( settings, options );
			return this.each(function() {
				var that = $( this );
				if ( ! $.data(this, 'popup') ) {
					var overlay = ! options.overlay ? null : $( '<div></div>' ).addClass( options.overlayClass ).css( 'z-index', options.zIndex - 1 ).appendTo( document.body );
					that
						.css( 'z-index', options.zIndex )
						.delegate( options.closeButtons, 'click.popup', function() {
							methods.close.apply( that );
							/* if(that.find('select').length){
								that.find('select').each(function(){
									$(this).data('dropdownList').menu.remove();
								});
							} */
							return false;
						})
						.data('popup', {
							overlay: overlay,
							options: options
						});
					$( window ).unbind('resize.popup').bind('resize.popup', function() {
						methods.reposition.apply( that );
					});
					methods.reposition.apply( that );
				}
				if ( settings.autoOpen ) {
					methods.open.apply( that );
					/* if(that.find('select').length){
						that.find('select').dropdownList();
					} */
				}
			});
		},
		open: function() {
			return this.each(function() {
				var that = $( this ),
					data = $.data( this, 'popup' ),
					overlay = data.overlay,
					options = data.options;
					
				overlay && overlay.css( 'opacity', 0 ).fadeTo(options.duration, options.opacity);
				that.css( 'opacity', 0 ).fadeTo(options.duration, 1, function() {
					$.isFunction( options.open ) && options.open.apply( that, arguments );
				});
			});
		},
		close: function() {
			return this.each(function() {
				var that = $( this ),
					data = $.data( this, 'popup' ),
					overlay = data.overlay,
					options = data.options;
					
				overlay && overlay.fadeTo(options.duration, 0, function() {
					if(!options.hidePopup){
						overlay.remove();
					}
					else {
						overlay.hide();
					}
					//overlay.remove();
				});
				that.fadeTo(options.duration, 0, function() {
					if(!options.hidePopup){
						that.remove();
					}
					else {
						that.hide();
					}
					$.isFunction( options.close ) && options.close.apply( that, arguments );
				});
			});
		},
		reposition: function() {
		    
			return this.each(function() {
				var that = $( this );
				var	data = $.data( this, 'popup' );  
                if (data && data.overlay) {
                    var overlay = data.overlay;    
                }   
				
				var	win = $( window ),
					//doc = $.browser.msie ? $( document.body ) : $( document ),
                    doc = $( document ),
					position = that.height() > win.height() ? 'absolute' : 'fixed',
					top = position === 'fixed' ? ( win.height() - that.height() ) / 2 : Math.max( 0, ( win.height() - that.height() ) / 2 + win.scrollTop() ),
					left = position === 'fixed' ? ( win.width() - that.width() ) / 2 : Math.max( 0, ( win.width() - that.width() ) / 2 + win.scrollLeft() );
             
                var cWidth = doc.width();
                var cHeight = doc.height();
            		 
             
				overlay && overlay.css({
						'width': cWidth,
						'height': cHeight
				});
				that.css({
					'position': position,
					'top': top,
					'left': left
				});
			});
		}
	};
	$.fn.popup = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call(arguments, 1) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.popup' );
		}
	};
})( jQuery );
