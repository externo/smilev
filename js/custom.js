(function($){

		var menu_flip_speed = 200,
		recent_work_opacity_speed = 400,
		featured_controllers_opacity_speed = 500,
		featured_bar_animation_speed = 500,
		featured_bar_animation_easing = 'easeOutExpo',
		$mobile_nav_button = $('#mobile_nav'),
		$main_menu = $('ul.nav'),
		$featured = $('#featured'),
		$featured_controllers_container = $('#featured-controllers'),
		$featured_control_item = $featured_controllers_container.find('li'),
		container_width = $('#container').innerWidth(),
		$footer_widget = $('.footer-widget'),
		$cloned_nav,
		slider_settings,
		sd_slider_autospeed,
		slider,
		$recent_work_thumb = $('#recent-work .thumb');
	
		$main_menu.superfish({ 
			delay:       300,                            // one second delay on mouseout 
			animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
			speed:       'fast',                          // faster animation speed 
			autoArrows:  true,                           // disable generation of arrow mark-up 
			dropShadows: false                            // disable drop shadows 
		});
		
		$main_menu.find('li').each( function(){
			var $this_li = $(this),
				li_text = $this_li.find('>a').html();
				
			$this_li.find('>a').html( '<span class="main_text">' + li_text + '</span>' + '<span class="menu_slide">' + li_text + '</span>' );
		} );
		
		$main_menu.find('>li').hover( function(){
			$(this).addClass( 'fr_hover' );
			$(this).find(".sub-menu").slideDown();
		}, function(){
			$(this).removeClass( 'fr_hover' );
		});
		
	
		$main_menu.find('>li>a').mouseenter(function(){
			if ( ! $(this).parent('li').hasClass('current-menu-item') ){
				$(this).find('span.main_text').animate( { 'marginTop' : '-44px' }, menu_flip_speed );
			}
		});
		$main_menu.find('>li>a').mouseleave( function(){
			$(this).find('span.main_text').stop(true,true).animate( { 'marginTop' : '0' }, menu_flip_speed );
		});
		
		$('.js #main-menu').show();
		
		$recent_work_thumb.hover( function(){
			$(this).stop(true,true).animate( { 'opacity' : '.5' }, recent_work_opacity_speed );
		}, function(){
			$(this).stop(true,true).animate( { 'opacity' : '1' }, recent_work_opacity_speed );
		} );
		
		//Carousel
		jQuery('#carousel').carouFredSel({
			circular: true,
			infinite: false,
			auto    : false,
			mousewheel: true,
			swipe: {
				onMouse: true,
				onTouch: true
			},
			prev    : {
				button  : "#prev",
				key     : "left"
			},
			next    : {
				button  : "#next",
				key     : "right"
			},
		});
		
		$featured_control_item.hover( function(){
			if ( ! $(this).hasClass('active-slide') ){
				$(this).find('.slide_hover').css({'display':'block','opacity':'0'}).stop(true,true).animate( { 'opacity' : '1' },featured_controllers_opacity_speed );
				$(this).find('.controller h2').css('color','#555');
				$(this).find('.controller h2').css('text-shadow','none');
			}
		}, function(){
			$(this).find('.slide_hover').stop(true,true).animate( { 'opacity' : '0' }, 100 );
			$(this).find('.controller h2').css('color','#D7D0B8');
			$(this).find('.controller h2').css('text-shadow','0 1px 1px #222');
		} );
		
		// HOME SLIDER SETTINGS
		
		if ( $featured.length ){
			slider_settings = {
				slideshow: false, 			// set true for autoplay
				//slideshowSpeed: 7000,		//uncommented for autoplay
				before: function(slider){
					var $this_control = $featured_control_item.eq(slider.animatingTo),
						width_to = '239px';
						
					if ( container_width === 748 ) {width_to = '186px';}
					
					if ( $('#featured_controls').length ){
						$('#featured_controls li').removeClass().eq(slider.animatingTo).addClass('active-slide');
						return;
					}
					
					$featured_control_item.removeClass('active-slide');
					
					if ( ! $this_control.find('.animated_bar').length ){ $this_control.append('<div class="animated_bar"></div>'); }
					$this_control.find('.animated_bar').css({ 'display' : 'block', 'width' : '7px', 'left' : '120px'}).stop(true,true).animate( { width : width_to, 'left' : 0 }, featured_bar_animation_speed, featured_bar_animation_easing, function(){
						$this_control.find('.animated_bar').hide()
						.end().find('.slide_hover').stop(true,true).animate( { 'opacity' : '0' }, featured_controllers_opacity_speed )
						.end().addClass('active-slide');
					} );
				},
				start: function(slider) {
					slider = slider;
				}
			};			
			slider_settings.pauseOnHover = true;
			
			$featured.flexslider( slider_settings );
		}
		
		// HOME SLIDER SETTINGS
		
		//MOBILE MENU
		$main_menu.clone().attr('id','mobile_menu').removeClass().appendTo( $mobile_nav_button );
		$cloned_nav = $mobile_nav_button.find('> ul');
		$cloned_nav.find('span.menu_slide').remove().end().find('span.main_text').removeClass();
		
		$mobile_nav_button.click( function(){
			if ( $(this).hasClass('closed') ){
				$(this).removeClass( 'closed' ).addClass( 'opened' );
				$cloned_nav.slideDown( 500 );
			} else {
				$(this).removeClass( 'opened' ).addClass( 'closed' );
				$cloned_nav.slideUp( 500 );
			}
			return false;
		} );
		
		$mobile_nav_button.find('a').click( function(event){
			event.stopPropagation();
		} );
		
		$('#mobile_menu li').hover(function(){
			$(this).find('.sub-menu').slideDown( 500 ).css({display: 'block', visibility: 'visible'});
		}, function () {
			$(this).find('.sub-menu').slideUp( 500 );
		});
		//MOBILE MENU
	
	$(window).load( function(){
		var $flexnav = $('#featured .flex-direction-nav'),
			$flexcontrol = $('#featured .flex-control-nav');
		
		$("#featured").find('#left-arrow').click( function(){
			$flexnav.find('a.prev').trigger('click');
			return false;
		} );
		
		$("#featured").find('#right-arrow').click( function(){
			$flexnav.find('a.next').trigger('click');
			return false;
		} );
		
		$('#featured-controllers li, #featured_controls a').click( function(){
			var $this_control = $(this),
				order = ! $('#featured_controls').length ? $(this).prevAll('li').length : $(this).parent().prevAll('li').length;
			
			if ( $this_control.hasClass('active-slide') ) {return;}
			
			$flexcontrol.find('li:eq(' + order + ') a').trigger('click');
			
			return false;
		} );
		
		columns_height_fix();
	} );
	
	function columns_height_fix(){
		var featured_control_min_height = 0,
			footer_min_height = 0;
	
		$featured_control_item.css( 'minHeight', 0 );
		$footer_widget.css( 'minHeight', 0 );
		
		if ( container_width <= 460 ) {return;}
	
		$featured_control_item.each( function(){
			var this_height = $(this).innerHeight();
			
			if ( featured_control_min_height < this_height ) {featured_control_min_height = this_height;}
		} ).each( function(){
			$(this).css( 'minHeight', featured_control_min_height );
		} );
		
		$footer_widget.each( function(){
			var this_height = $(this).innerHeight();
			
			if ( footer_min_height < this_height ) {footer_min_height = this_height;}
		} ).each( function(){
			$(this).css( 'minHeight', footer_min_height );
		} );
	}
	
	$('#top').click(function(){
       $('html, body').animate({scrollTop:0}, 'slow');
   });
   
})(jQuery);