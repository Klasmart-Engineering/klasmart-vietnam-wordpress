var $j = jQuery.noConflict();
window.qode = {};
qode.modules = {};

var common = {};
qode.modules.common = common;

var $scroll = 0;
var qode_body = $j('body');
var qode_document = $j('document');
var qode_window = $j(window);
var $window_width = $j(window).width();
qode.windowWidth = $window_width;
var $window_height = $j(window).height();
qode.windowHeight = $window_height;
var logo_height;
var menu_dropdown_height_set = false;
var sticky_amount = 0;
var qode_grid_width = 1100;
var content_menu_position;
var content_menu_top;
var content_menu_top_add = 0;
var src;
var next_image;
var prev_image;
var $top_header_height;

var min_w = 1500; // minimum video width allowed
var video_width_original = 1280;  // original video dimensions
var video_height_original = 720;
var vid_ratio = 1280/720;
var skrollr_slider;
var paspartu_width;
if(typeof paspartu_width_init == 'undefined'){ //check if variable is defined in default_dynamic.php (deafult_dynamic.js)
    var paspartu_width_init = 0.02;
}
common.getLoadMoreData = getLoadMoreData;
common.setLoadMoreAjaxData = setLoadMoreAjaxData;
common.qodeOwlSlider = qodeOwlSlider;

qode.animationEnd = animationEventEnd();
qode.transitionEnd = transitionEventEnd();

$j(document).ready(function() {
	"use strict";

	if($j('header').hasClass('regular')){
		content_menu_top = 0;
	}
	if($j('header').hasClass('fixed_top_header')){
		content_menu_top = header_height;
	}
	if($j('header').hasClass('fixed')){
		content_menu_top = min_header_height_scroll;
	}
	if($j('header').hasClass('fixed_hiding')){
		content_menu_top = min_header_height_fixed_hidden + 40; //40 is top and bottom margin of logo
	}
	if($j('header').hasClass('stick') || $j('header').hasClass('stick_with_left_right_menu')){
		content_menu_top = 0;
	}
	if((!$j('header.page_header').hasClass('scroll_top')) && ($j('header.page_header').hasClass('has_top')) && ($j('header.page_header').hasClass('fixed'))){
		content_menu_top_add = 34;
	}
    if($j('body').hasClass('vertical_menu_enabled')){
        content_menu_top = 0;
        content_menu_top_add = 0;
        var min_header_height_sticky = 0;
    }

    //check paspartu width depending on window size
    paspartu_width = $window_width < 1024 ? 0.02 : paspartu_width_init;

    contentMinHeight();
    contentMinHeightWithPaspartu();
    qodeGridWidth();
    setDropDownMenuPosition();
    initDropDownMenu();
	initVerticalMenu();
	initVerticalMobileMenu();
	initQodeSlider();
	initSideMenu();
    initPopupMenu();
	initMessageHeight();
	initToCounter();
	initCounter();
	if(!$j('.vertical_split_slider').length){
		initCountdown();
	}
	initProgressBars();
	initListAnimation();
	initPieChart();
	initPieChartWithIcon();
	initServiceAnimation();
	initParallaxTitle();
	initSideAreaScroll();
	initVerticalAreaMenuScroll();
	loadMore();
	prettyPhoto();
	alterWPMLSwitcherHeaderBottom();
	initMobileMenu();
	initFlexSlider();
	fitVideo();
	fitAudio();
	initAccordion();
	initAccordionContentLink();
	qodeInitAccordions();
	initMessages();
	initProgressBarsIcon();
	initMoreFacts();
	placeholderReplace();
	backButtonShowHide();
	backToTop();
	initSteps();
	showGoogleMap();
	initProgressBarsVertical();
	initElementsAnimation();
	updateShoppingCart();
	initHashClick();
	initIconWithTextAnimation();
	initVideoBackground();
	initCheckSafariBrowser();
	initSearchButton();
	initCoverBoxes();
	createContentMenu();
	contentMenuScrollTo();
	createSelectContentMenu();
    initButtonHover();
    initEnlargeButton();
    initSocialIconHover();
    initPageTitleAnimation();
    initIconShortcodeHover();
	qodeIcon().init();
    initIconWithTextHover();
    parallaxLayers();
    initHorizontalMarquee();
    qodeHorizontalMarqueeLoop();
    initTextMarquee();
    initExpandingImages();
    qodeLazyImages();
    initItemShowcase();
    qodeCTASection().init();
	qodeInitInteractiveIconShowcase();
	qodeInitSendContactForm();
	qodeWorkflow();
	qodeCustomFontTypeOut();
	qodeMobileHeaderBehavior();
    initElementsHolderResponsiveStyle();
	
	$j('.widget #searchform').mousedown(function(){$j(this).addClass('form_focus');}).focusout(function(){$j(this).removeClass('form_focus');});
	$scroll = $j(window).scrollTop();
	checkTitleToShowOrHide(); //this has to be after setting $scroll since function uses $scroll variable
    checkVerticalMenuTransparency(); //this has to be after setting $scroll since function uses $scroll variable

	/* set header and content menu position and appearance on page load - START */
    if($j(window).width() > 1000){
        headerSize($scroll);
    }else{
        logoSizeOnSmallScreens();
    }

	if($j(window).width() > 768){
		contentMenuPosition();
	}
	contentMenuCheckLastSection();

    $j('header:not(.stick_with_left_right_menu) .q_logo a').css('visibility','visible');
	/* set header and content menu position and appearance on page load - END */

	initFullScreenTemplate();
    showHideVerticalMenu();
    initMasonryGallery();
	initLoadNextPostOnBottom();
    initBlogMasonryGallery();
	initBlogGallery();
	qodeV2Button().init();
    qodeCardsSlider().init();
    qodeCardsGallery();
	qodeInitEllipticalSlider();
	qodeInitPricingCalculator();
	qodeSlidingImageHolder();
    qodeOwlSlider();
    qodeScrollingImage();
});

$j(window).load(function(){
	"use strict";

    qodeBrowserDetection();
	$j('.touch .main_menu li:has(div.second)').doubleTapToGo(); // load script to close menu on touch devices
    setLeftPostionedMenuPadding();
    initSmallImageBlogHeight();
	setDropDownMenuPosition();
	initDropDownMenu();
	initPortfolio();
	initPortfolioZIndex();
	initPortfolioSingleInfo();
	initTestimonials();
	initTestimonialsCarousel();
	initVideoBackgroundSize();
	initBlog();
	initBlogMasonryFullWidth();
	initQBlog();
	initPortfolioJustifiedGallery();
	initPortfolioMasonry();
	initPortfolioMasonryFilter();
	initTabs();
	qodeInitAdvancedTabs();
	qodeInitAdvancedTabsIcons();
	countClientsPerRow();
	animatedTextIconHeight();
	countAnimatedTextIconPerRow();
	initTitleAreaAnimation();
	setContentBottomMargin();
	footerWidth();
	if($j('nav.content_menu').length > 0){
		content_menu_position = $j('nav.content_menu').offset().top;
		contentMenuPosition();
	}
	contentMenuCheckLastSection();
    initQodeCarousel();
    initPortfolioSlider();
    initBlogSlider();
	qodeInitBlogCarouselTitled();
    initPreviewSlider();
    initInDeviceSlider();
    initTabsActiveBorder();
    setActiveTabBorder();
	initImageHover();
    $j('header.stick_with_left_right_menu .q_logo a').css('visibility','visible');
    setMargingsForLeftAndRightMenu();
    initImageGallerySliderNoSpace();
    initVerticalSplitSlider();
    initParallax(); //has to be here on last place since some function is interfering with parallax
    initQodeElementAnimationSkrollr();
    qodeBlogCompundMasonryGallery().init();
    qodeInitStickyWidget();
	qodeBlogHeadlines();
    qodeCardsSlider().load();
    initContentSlider();
	qodePageTransitionEffect();
    qodeContactPageAcceptance();
	setTimeout(function(){
        checkAnchorOnScroll();
	    qodeBlogGalleryAnimation();
        checkAnchorOnLoad(); // it has to be after content top margin initialization to know where to scroll
        checkHeaderStyleOnScroll(); //moved to window load because sections are not fully initialized on dom ready and calculations are wrong
        if($j('.no-touch .carousel').length){skrollr_slider.refresh();} //in order to reload rest of scroll animation on same page after page loads
    },700); //timeout is set because of some function that interferes with calculating
    qodePanelArea();
});

$j(window).scroll(function() {
	"use strict";

	$scroll = $j(window).scrollTop();

	if($j(window).width() > 1000){
		headerSize($scroll);
	}

	if($j(window).width() > 768){
		contentMenuPosition();
	}
	contentMenuCheckLastSection();
    checkVerticalMenuTransparency();
    qodeLazyImages();

	$j('.touch .drop_down > ul > li').mouseleave();
	$j('.touch .drop_down > ul > li').blur();
});

$j(window).resize(function() {
	"use strict";

    $window_width = $j(window).width();
    $window_height = $j(window).height();

    //check paspartu width depending on window size
    paspartu_width = $window_width < 1024 ? 0.02 : paspartu_width_init;

	if($j(window).width() > 1000){
		headerSize($scroll);
	}else{
		logoSizeOnSmallScreens();
	}
	initMessageHeight();
    qodeNumberOfTestimonialsItemsResize();
	fitAudio();
	initSmallImageBlogHeight();
	initBlog();
	initBlogMasonryFullWidth();
    initQBlog();
	animatedTextIconHeight();
	countAnimatedTextIconPerRow();
	initVideoBackgroundSize();
	countClientsPerRow();
	setContentBottomMargin();
	footerWidth();
    calculateHeights();
    $j('.vertical_split_slider').height($window_height); //used for vertical split slider holder
    initMasonryGallery();
	initPortfolioMasonry();
    contentMinHeight();
    contentMinHeightWithPaspartu();
    qodeInitStickyWidget();
});

function getScrollAmountForStickyHeader(){
    //is scroll amount for sticky set on page?
    if(typeof qodeGlobalVars.vars.page_scroll_amount_for_sticky !== 'undefined' && qodeGlobalVars.vars.page_scroll_amount_for_sticky !== '') {
        amount = qodeGlobalVars.vars.page_scroll_amount_for_sticky;
    }

    //do we have slider on the page?
    else if($j('.carousel.full_screen').length) {
        amount = $j('.carousel').height();
    }

    //take value from theme options
    else {
        amount = scroll_amount_for_sticky;
    }

    return amount;
}

/*
 * Browser detection
 */
function qodeBrowserDetection() {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
        isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
        isIE = window.navigator.userAgent.indexOf("MSIE ");

    if (isChrome) {
        qode_body.addClass('qode-chrome');
    }
    if (isSafari) {
        qode_body.addClass('qode-safari');
    }
    if (isFirefox) {
        qode_body.addClass('qode-firefox');
    }
    if (isIE > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        qode_body.addClass('qode-ms-explorer');
    }
    if (/Edge\/\d./i.test(navigator.userAgent)) {
        qode_body.addClass('qode-edge');
    }
}

/*
**	Calculating header size on page load and page scroll
*/
var sticky_animate;
function headerSize($scroll){
	"use strict";

	if(($j('header.page_header').hasClass('scroll_top')) && ($j('header.page_header').hasClass('has_top')) &&
        ($j('header.page_header').hasClass('fixed') || $j('header.page_header').hasClass('fixed_hiding'))){
		if($scroll >= 0 && $scroll <= 34){
			$j('header.page_header').css('top',-$scroll);
			$j('header.page_header').css('margin-top',0);
			$j('.header_top').show();
		}else if($scroll > 34){
			$j('header.page_header').css('top','-34px');
			$j('header.page_header').css('margin-top',34);
			$j('.header_top').hide();
		}
	}

	sticky_amount = getScrollAmountForStickyHeader();


	if($j('header').hasClass('regular')){
//		$j('header .drop_down .second').css('top', header_height + header_bottom_border_weight +'px');
		if(header_height - logo_height >= 10){
			$j('.q_logo a').height(logo_height);
		}else{
			$j('.q_logo a').height(header_height - 10);
		}
        $j('.q_logo a img').css('height','100%');
	}

	if($j('header.page_header').hasClass('fixed')){
		if($j('header.page_header').hasClass('scroll_top')){
			$top_header_height = 34;
		}else{
			$top_header_height = 0;
		}

		if((header_height - $scroll + $top_header_height >= min_header_height_scroll) && ($scroll >= $top_header_height)){
			$j('header.page_header').removeClass('scrolled');
			$j('header:not(.centered_logo.centered_logo_animate) nav.main_menu > ul > li > a').css('line-height', header_height - $scroll + $top_header_height+'px');
//			$j('header .drop_down .second').css('top', header_height + header_bottom_border_weight - ($scroll + $top_header_height)/8+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .side_menu_button').css('height', header_height - $scroll + $top_header_height+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .shopping_cart_inner').css('height', header_height - $scroll + $top_header_height+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .header_bottom .qode-login-register-widget.qode-user-logged-in .qode-logged-in-user').css('height', header_height - $scroll + $top_header_height+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .logo_wrapper').css('height', header_height - $scroll + $top_header_height +'px');
			if(header_height - logo_height > 0){
	            $j('header:not(.centered_logo.centered_logo_animate) .q_logo a').css('height', logo_height +'px');
	        }else{
	            $j('header:not(.centered_logo.centered_logo_animate) .q_logo a').css('height', (header_height - $scroll + $top_header_height - 10) +'px');
	        }

		}else if($scroll < $top_header_height){
			$j('header.page_header').removeClass('scrolled');
			$j('header:not(.centered_logo.centered_logo_animate) nav.main_menu > ul > li > a').css('line-height', header_height+'px');
//			$j('header .drop_down .second').css('top', header_height + header_bottom_border_weight +'px');
			$j('header:not(.centered_logo.centered_logo_animate) .side_menu_button').css('height', header_height+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .shopping_cart_inner').css('height', header_height+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .header_bottom .qode-login-register-widget.qode-user-logged-in .qode-logged-in-user').css('height', header_height+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .logo_wrapper').css('height', header_height+'px');
            if(header_height - logo_height > 0){
	            $j('header:not(.centered_logo.centered_logo_animate) .q_logo a').css('height', logo_height +'px');
	        }else{
	            $j('header:not(.centered_logo.centered_logo_animate) .q_logo a').css('height', (header_height-10)+'px');
	        }

		}else if((header_height - $scroll + $top_header_height) < min_header_height_scroll){
			$j('header.page_header').addClass('scrolled');
			$j('header:not(.centered_logo.centered_logo_animate) nav.main_menu > ul > li > a').css('line-height', min_header_height_scroll+'px');
//			$j('header .drop_down .second').css('top', min_header_height_scroll + header_bottom_border_weight +'px');
			$j('header:not(.centered_logo.centered_logo_animate) .side_menu_button').css('height', min_header_height_scroll+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .shopping_cart_inner').css('height', min_header_height_scroll+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .header_bottom .qode-login-register-widget.qode-user-logged-in .qode-logged-in-user').css('height', min_header_height_scroll+'px');
			$j('header:not(.centered_logo.centered_logo_animate) .logo_wrapper').css('height', min_header_height_scroll+'px');
            if(min_header_height_scroll - logo_height > 0){
	            $j('header:not(.centered_logo.centered_logo_animate) .q_logo a').css('height', logo_height +'px');
	        }else{
	            $j('header:not(.centered_logo.centered_logo_animate) .q_logo a').css('height', (min_header_height_scroll-10)+'px');
	        }
		}

        // logo part - start //

        if($j('header.page_header').hasClass('centered_logo') && $j('header.page_header').hasClass('centered_logo_animate')){
            if((header_height - $scroll + $top_header_height < logo_height) && (header_height - $scroll + $top_header_height >= min_header_height_scroll) && (logo_height > min_header_height_scroll - 10) && ($scroll >= $top_header_height)){
                $j('.q_logo a').height(header_height - $scroll + $top_header_height - 10);
            }else if((header_height - $scroll + $top_header_height < logo_height) && (header_height - $scroll + $top_header_height >= min_header_height_scroll) && (logo_height > min_header_height_scroll - 10) && ($scroll < $top_header_height)){
                $j('.q_logo a').height(header_height - 10);
            }else if((header_height - $scroll + $top_header_height < logo_height) && (header_height - $scroll + $top_header_height < min_header_height_scroll) && (logo_height > min_header_height_scroll - 10)){
                $j('.q_logo a').height(min_header_height_scroll - 10);
            }else if((header_height - $scroll + $top_header_height < logo_height) && (header_height - $scroll + $top_header_height < min_header_height_scroll) && (logo_height < min_header_height_scroll - 10)){
                $j('.q_logo a').height(logo_height);
            }else if(($scroll + $top_header_height === 0) && (logo_height > header_height - 10)){
                $j('.q_logo a').height(logo_height);
            }else{
                $j('.q_logo a').height(logo_height);
            }
        }else if($j('header.page_header').hasClass('centered_logo')) {
            $j('.q_logo a').height(logo_height);
            $j('.q_logo img').height('auto');
        }else{
            $j('.q_logo img').height('100%');
        }
        // logo part - end //

        setLeftPostionedMenuPadding();
	}

    if($j('header.page_header').hasClass('fixed_hiding')){

        if($scroll < scroll_amount_for_fixed_hiding){
            $j('header.page_header').removeClass('scrolled');
        }else{
            $j('header.page_header').addClass('scrolled');
        }

        $j('.q_logo a').height(logo_height/2); //because of retina displays
        $j('.q_logo img').height('100%');
    }

	if($j('header.page_header').hasClass('stick') || $j('header.page_header').hasClass('stick_with_left_right_menu')){
		if($scroll > sticky_amount){
			if(!$j('header.page_header').hasClass('sticky')){
				if($j('header.page_header').hasClass('has_top')){
					$top_header_height = 34;
				}else{
					$top_header_height = 0;
				}
				var padding_top = $j('header.page_header').hasClass('centered_logo') ? $j('header.page_header').height() : header_height + $top_header_height;
				if($j('header.page_header').hasClass('menu_bottom')){
                	padding_top = header_height + 60; //60 is menu height for Sticky Advance header type
                }
				$j('header.page_header').addClass('sticky');
				$j('.content').css('padding-top',padding_top);

				window.clearTimeout(sticky_animate);
				sticky_animate = window.setTimeout(function(){$j('header.page_header').addClass('sticky_animate'); },100);


				if(min_header_height_sticky - logo_height >= 10){
					$j('.q_logo a').height(logo_height);
				}else{
					$j('.q_logo a').height(min_header_height_sticky - 10);
				}

				if($j('header.page_header').hasClass('menu_bottom')){
					initDropDownMenu(); //recalculate dropdown menu position
				}
			}

            //  logo part - start //
            if(min_header_height_sticky - logo_height >= 10){
                $j('.q_logo a').height(logo_height);
            }else{
                $j('.q_logo a').height(min_header_height_sticky - 10);
            }
            //  logo part - end //


		}else{
			if($j('header.page_header').hasClass('sticky')){
				$j('header').removeClass('sticky_animate');
				$j('header').removeClass('sticky');
				$j('.content').css('padding-top','0px');

				if($j('header.page_header').hasClass('menu_bottom')){
					initDropDownMenu(); //recalculate dropdown menu position
				}
			}

            setMargingsForLeftAndRightMenu(); //need to set margins here since on sticky menu, logo is not visible on left/right logo

            // logo part - start //
            if(!$j('header.page_header').hasClass('centered_logo')){
                if(header_height - logo_height >= 10){
                    $j('.q_logo a').height(logo_height);
                }else{
                    $j('.q_logo a').height(header_height - 10);
                }
            }else{
                $j('.q_logo a').height(logo_height);
    			$j('.q_logo img').height('auto');
            }
            $j('.q_logo a img').css('height','100%');
           // logo part - end //


        }

        setLeftPostionedMenuPadding();

    }
}

function qodeMobileHeaderBehavior() {
	
	if($j('header').hasClass('sticky_mobile')){

		var mobileHeader = $j('.page_header'),
			mobileMenuOpener = mobileHeader.find('.mobile_menu_button'),
			mobileHeaderHeight = mobileHeader.outerHeight();
		
		
		var adminBarHeight = $j('#wpadminbar').length ? $j('#wpadminbar').height() : 0,
			stickyAppearAmount = mobileHeaderHeight,
			docYScroll1 = $scroll;
		

		var behaviour = function(){
			mobileHeader.find('.header_inner').css('padding-top', 0);
			if($window_width < 1000){
				var docYScroll2 = $scroll;
				
				if (docYScroll2 > stickyAppearAmount) {
					mobileHeader.addClass('qode-animate-mobile-header');
					$j('.content').css('padding-top', mobileHeaderHeight);
				} else {
					mobileHeader.removeClass('qode-animate-mobile-header');
					$j('.content').css('padding-top', 0);
				}
				
				if ((docYScroll2 > docYScroll1 && docYScroll2 >= stickyAppearAmount) || (docYScroll2 <= stickyAppearAmount)) {
					mobileHeader.removeClass('mobile-header-appear');
					mobileHeader.find('.header_inner').css('padding-top', 0);
					
					
				} else {
					mobileHeader.addClass('mobile-header-appear');
					mobileHeader.find('.header_inner').css('padding-top', adminBarHeight);
				}
				
				docYScroll1 = $scroll;
			}
		}

		qode_window.on('scroll resize', function(){ behaviour() });
		
	}
}

function setMargingsForLeftAndRightMenu(){
    "use strict";

    if($j('header.page_header').hasClass('stick_with_left_right_menu') && !$j('header.page_header').hasClass('left_right_margin_set')){
        var logo_width = $j('.q_logo a img').width()/2;
        if($scroll == 0 && logo_width != 0){
            $j('header.page_header').addClass('left_right_margin_set');
        }
        $j('.logo_wrapper').width(logo_width*2);
        $j('nav.main_menu.left_side > ul > li:last-child').css('margin-right',logo_width);
        $j('nav.main_menu.right_side > ul > li:first-child').css('margin-left',logo_width);

        $j('.rtl nav.main_menu.left_side > ul > li:first-child').css('margin-right',logo_width);	// add for rtl
        $j('.rtl nav.main_menu.left_side > ul > li:last-child').css('margin-right',0);				// add for rtl
        $j('.rtl nav.main_menu.right_side > ul > li:last-child').css('margin-left',logo_width);		// add for rtl
        $j('.rtl nav.main_menu.right_side > ul > li:first-child').css('margin-left',0);				// add for rtl
    }
}

function setLeftPostionedMenuPadding(){
    "use strict";
    var main_menu = $j('header:not(.centered_logo) nav.main_menu');

    if(main_menu.length && main_menu.hasClass('left')){
        var image = $j('.q_logo a img').filter(function() {
            return $j(this).css('opacity') == '1';
        });
        main_menu.css('left',image.width());
    }
}

/*
**	Calculating logo size on smaller screens
*/
function logoSizeOnSmallScreens(){
	"use strict";
	// 100 is height of header on small screens

	if((100 - 20 < logo_height)){
		$j('.q_logo a').height(100 - 20);
	}else{
		$j('.q_logo a').height(logo_height);
	}
	$j('.q_logo a img').css('height','100%');

	$j('header.page_header').removeClass('sticky_animate sticky');
	$j('.content').css('padding-top','0px');

}

/*
 ** Calculating minimal height for content
 */
function contentMinHeight(){
    "use strict";

    if($j('header .header_bottom').length || $j('header .bottom_header').length){
        if($j('header .header_bottom').length){ var headerColorString = $j('header .header_bottom').css('background-color'); }
        if($j('header .bottom_header').length){ var headerColorString = $j('header .bottom_header').css('background-color'); }
        var headerTransparency = headerColorString.substring(headerColorString.indexOf('(') + 1, headerColorString.lastIndexOf(')')).split(/,\s*/)[3];
        var haeder_add = headerTransparency == undefined && !$j('header.page_header').hasClass('transparent') ? $j('header.page_header').height() : 0;
        $j('body .content').css('min-height',$window_height - haeder_add - $j('footer:not(.uncover)').height());
    }
}

/*
 ** Calculating minimal height for content when paspartu is enabled
 */

function contentMinHeightWithPaspartu(){
    "use strict";

    if ($j('.paspartu_enabled').length) {
        var content_height;
        var paspartu_final_width_px = 0;
        var paspartu_width_px = $window_width*paspartu_width;
        var footer_height = $j('footer').height();

        if ($j('.disable_footer').length){
            footer_height = 0;
        }

        if ($j('.vertical_menu_enabled').length){
            if ($j('.paspartu_top').length && $j('.paspartu_middle_inner').length){
                paspartu_final_width_px += paspartu_width_px;
            }
        }
        else {
            if ($j('.paspartu_top').length){
                paspartu_final_width_px += paspartu_width_px;
            }
        }
        if ($j('.paspartu_bottom').length || !$j('.disable_bottom_paspartu').length){
            paspartu_final_width_px += paspartu_width_px;
        }

        if ($j('.vertical_menu_enabled').length){
            content_height = $window_height - paspartu_final_width_px - footer_height;
        }
        else {
            if($j('header .header_bottom').length){ var headerColorString = $j('header .header_bottom').css('background-color'); }
            if($j('header .bottom_header').length){ var headerColorString = $j('header .bottom_header').css('background-color'); }
            var headerTransparency = headerColorString.substring(headerColorString.indexOf('(') + 1, headerColorString.lastIndexOf(')')).split(/,\s*/)[3];
            var header_height = headerTransparency == undefined && !$j('header.page_header').hasClass('transparent') ? $j('header.page_header').height() : 0;
            content_height = $window_height - header_height - paspartu_final_width_px - footer_height;
        }

        if($j('.content').length){
            $j('.content').css('min-height',content_height);
        }
    }
}

/*
**	Initialize Qode Slider
*/
var default_header_style;
function initQodeSlider(){
	"use strict";

	var image_regex = /url\(["']?([^'")]+)['"]?\)/;
	default_header_style = "";
	if($j('header.page_header').hasClass('light')){ default_header_style = 'light';}
	if($j('header.page_header').hasClass('dark')){ default_header_style = 'dark';}

	if($j('.carousel').length){

		var matrixArray = { zoom_center : '1.2, 0, 0, 1.2, 0, 0', zoom_top_left: '1.2, 0, 0, 1.2, -150, -150', zoom_top_right : '1.2, 0, 0, 1.2, 150, -150', zoom_bottom_left: '1.2, 0, 0, 1.2, -150, 150', zoom_bottom_right: '1.2, 0, 0, 1.2, 150, 150'};

		// Function for translating image in slide - START //
		(function ($) {
			//
			// regular expression for parsing out the matrix
			// components from the matrix string
			//
			var matrixRE = /\([0-9epx\.\, \t\-]+/gi;

			//
			// parses a matrix string of the form
			// "matrix(n1,n2,n3,n4,n5,n6)" and
			// returns an array with the matrix
			// components
			//
			var parseMatrix = function (val) {
				return val.match(matrixRE)[0].substr(1).
						  split(",").map(function (s) {
					return parseFloat(s);
				});
			};

			//
			// transform css property names with vendor prefixes;
			// the plugin will check for values in the order the
			// names are listed here and return as soon as there
			// is a value; so listing the W3 std name for the
			// transform results in that being used if its available
			//
			var transformPropNames = [
				"transform",
				"-webkit-transform"
			];

			var getTransformMatrix = function (el) {
				//
				// iterate through the css3 identifiers till we
				// hit one that yields a value
				//
				var matrix = null;
				transformPropNames.some(function (prop) {
					matrix = el.css(prop);
					return (matrix !== null && matrix !== "");
				});

				//
				// if "none" then we supplant it with an identity matrix so
				// that our parsing code below doesn't break
				//
				matrix = (!matrix || matrix === "none") ?
							  "matrix(1,0,0,1,0,0)" : matrix;
				return parseMatrix(matrix);
			};

			//
			// set the given matrix transform on the element; note that we
			// apply the css transforms in reverse order of how its given
			// in "transformPropName" to ensure that the std compliant prop
			// name shows up last
			//
			var setTransformMatrix = function (el, matrix) {
				var m = "matrix(" + matrix.join(",") + ")";
				for (var i = transformPropNames.length - 1; i >= 0; --i) {
					el.css(transformPropNames[i], m + ' rotate(0.01deg)');
				}
			};

			//
			// interpolates a value between a range given a percent
			//
			var interpolate = function (from, to, percent) {
				return from + ((to - from) * (percent / 100));
			};

			$.fn.transformAnimate = function (opt) {
				//
				// extend the options passed in by caller
				//
				var options = {
					transform: "matrix(1,0,0,1,0,0)"
				};
				$.extend(options, opt);

				//
				// initialize our custom property on the element
				// to track animation progress
				//
				this.css("percentAnim", 0);

				//
				// supplant "options.step" if it exists with our own
				// routine
				//
				var sourceTransform = getTransformMatrix(this);
				var targetTransform = parseMatrix(options.transform);
				options.step = function (percentAnim, fx) {
					//
					// compute the interpolated transform matrix for
					// the current animation progress
					//
					var $this = $(this);
					var matrix = sourceTransform.map(function (c, i) {
						return interpolate(c, targetTransform[i],
								 percentAnim);
					});

					//
					// apply the new matrix
					//
					setTransformMatrix($this, matrix);

					//
					// invoke caller's version of "step" if one
					// was supplied;
					//
					if (opt.step) {
						opt.step.apply(this, [matrix, fx]);
					}
				};

				//
				// animate!
				//
				return this.stop().animate({ percentAnim: 100 }, options);
			};
		})(jQuery);
		// Function for translating image in slide - END //

		$j('.carousel').each(function(){
			var $this = $j(this);
			var mobile_header;

            var mobile_header = $j(window).width() < 1000 ? $j('header.page_header').height() : 0;
            var header_height_add_for_paspartu = $window_width > 1000 && !$j('header.page_header').hasClass('transparent') && $j('body.paspartu_on_top_fixed').length == 0 ? $j('header.page_header').height() : 0;
            var paspartu_amount_with_top = $j('.paspartu_outer:not(.disable_top_paspartu)').length > 0 ? Math.round($window_width*paspartu_width + header_height_add_for_paspartu) : 0;
            var paspartu_amount_with_bottom = $j('.paspartu_outer.paspartu_on_bottom_slider').length > 0 ? Math.round($window_width*paspartu_width) : 0;
			var slider_graphic_coefficient;
            var slider_title_coefficient;
            var slider_subtitle_coefficient;
            var slider_text_coefficient;
            var slider_button_coefficient;

			var responsive_breakpoint_set = [1300,1000,768];
			if($this.hasClass('advanced_responsiveness')){
				responsive_breakpoint_set = [1600,1200,900,650,500,320];
				if($this.data('q_responsive_breakpoints')){
					if($this.data('q_responsive_breakpoints') == 'set2'){
						responsive_breakpoint_set = [1600,1300,1000,768,567,320];
					}
				}

                var coefficients_graphic_array = $this.data('q_responsive_graphic_coefficients').split(',');
                var coefficients_title_array = $this.data('q_responsive_title_coefficients').split(',');
                var coefficients_subtitle_array = $this.data('q_responsive_subtitle_coefficients').split(',');
                var coefficients_text_array = $this.data('q_responsive_text_coefficients').split(',');
                var coefficients_button_array = $this.data('q_responsive_button_coefficients').split(',');
			}

            //calculate heights for slider holder and slide item, depending on size, but only if slider is set to be responsive and not full screen
            function setSliderHeight($this, $def_height){
                var slider_height = $def_height;

				if($this.hasClass('advanced_responsiveness')){
					//advanced responsiveness
					if($window_width > responsive_breakpoint_set[0]){
						slider_height = $def_height;
					}else if($window_width > responsive_breakpoint_set[1]){
						slider_height = $def_height * 0.75;
					}else if($window_width > responsive_breakpoint_set[2]){
						slider_height = $def_height * 0.6;
					}else if($window_width > responsive_breakpoint_set[3]){
						slider_height = $def_height * 0.55;
					}else if($window_width <= responsive_breakpoint_set[3]){
						slider_height = $def_height * 0.45;
					}
				}else{
					//old way responsiveness
					if($window_width > responsive_breakpoint_set[0]){
						slider_height = $def_height;
					}else if($window_width > responsive_breakpoint_set[1]){
						slider_height = $def_height * 0.8;
					}else if($window_width > responsive_breakpoint_set[2]){
						slider_height = $def_height * 0.7;
					}else if($window_width <= responsive_breakpoint_set[2]){
						slider_height = $def_height * 1;
					}
				}

                $this.css({'height': (slider_height) + 'px'});
                $this.find('.qode_slider_preloader').css({'height': (slider_height) + 'px'});
                $this.find('.qode_slider_preloader .ajax_loader').css({'display': 'block'});
                $this.find('.item').css({'height': (slider_height) + 'px'});
            }

            function resetSliderHeight($def_height){
                $this.css({'height': ($def_height) + 'px'});
                $this.find('.qode_slider_preloader').css({'height': ($def_height) + 'px'});
                $this.find('.qode_slider_preloader .ajax_loader').css({'display': 'block'});
                $this.find('.item').css({'height': ($def_height) + 'px'});
            }

            function setSliderInitialElementsSize($item,i){

				window["slider_graphic_width_" + i] = [];
                window["slider_graphic_height_" + i] = [];
                window["slider_svg_width_" + i] = [];
                window["slider_svg_height_" + i] = [];
                window["slider_title_" + i] = [];
                window["slider_subtitle_" + i] = [];
                window["slider_text_" + i] = [];
                window["slider_button1_" + i] = [];
                window["slider_button2_" + i] = [];
                window["slider_separator_" + i] = [];

                //graphic size
                window["slider_graphic_width_" + i].push(parseFloat($item.find('.thumb img').data("width")));
                window["slider_graphic_height_" + i].push(parseFloat($item.find('.thumb img').data("height")));
                window["slider_svg_width_" + i].push(parseFloat($item.find('.qode_slide-svg-holder svg').attr("width")));
                window["slider_svg_height_" + i].push(parseFloat($item.find('.qode_slide-svg-holder svg').attr("height")));

                // font-size (0)
                window["slider_title_" + i].push(parseFloat($item.find('.q_slide_title').css("font-size")));
                window["slider_subtitle_" + i].push(parseFloat($item.find('.q_slide_subtitle').css("font-size")));
                window["slider_text_" + i].push(parseFloat($item.find('.q_slide_text').css("font-size")));
                window["slider_button1_" + i].push(parseFloat($item.find('.qbutton:eq(0)').css("font-size")));
                window["slider_button2_" + i].push(parseFloat($item.find('.qbutton:eq(1)').css("font-size")));

                // line-height (1)
                window["slider_title_" + i].push(parseFloat($item.find('.q_slide_title').css("line-height")));
                window["slider_subtitle_" + i].push(parseFloat($item.find('.q_slide_subtitle').css("line-height")));
                window["slider_text_" + i].push(parseFloat($item.find('.q_slide_text').css("line-height")));
                window["slider_button1_" + i].push(parseFloat($item.find('.qbutton:eq(0)').css("line-height")));
                window["slider_button2_" + i].push(parseFloat($item.find('.qbutton:eq(1)').css("line-height")));

                // letter-spacing (2)
                window["slider_title_" + i].push(parseFloat($item.find('.q_slide_title').css("letter-spacing")));
                window["slider_subtitle_" + i].push(parseFloat($item.find('.q_slide_subtitle').css("letter-spacing")));
                window["slider_text_" + i].push(parseFloat($item.find('.q_slide_text').css("letter-spacing")));
                window["slider_button1_" + i].push(parseFloat($item.find('.qbutton:eq(0)').css("letter-spacing")));
                window["slider_button2_" + i].push(parseFloat($item.find('.qbutton:eq(1)').css("letter-spacing")));

                // margin-bottom (3)
                window["slider_title_" + i].push(parseFloat($item.find('.q_slide_title').css("margin-bottom")));
                window["slider_subtitle_" + i].push(parseFloat($item.find('.q_slide_subtitle').css("margin-bottom")));

                // slider_button height(3), width(4), padding(5)
                window["slider_button1_" + i].push(parseFloat($item.find('.qbutton:eq(0)').css("height")));
                window["slider_button2_" + i].push(parseFloat($item.find('.qbutton:eq(1)').css("height")));
                if(parseFloat($item.find('.qbutton:eq(0)').css("width")) != 0){
                    window["slider_button1_" + i].push(parseFloat($item.find('.qbutton:eq(0)').css("width")));
                }else{
                    window["slider_button1_" + i].push(0);
                }
                if(parseFloat($item.find('.qbutton:eq(1)').css("width")) != 0){
                    window["slider_button2_" + i].push(parseFloat($item.find('.qbutton:eq(1)').css("width")));
                }else{
                    window["slider_button2_" + i].push(0);
                }
                window["slider_button1_" + i].push(parseFloat($item.find('.qbutton:eq(0)').css("padding-left")));
                window["slider_button1_" + i].push(parseFloat($item.find('.qbutton:eq(0)').css("padding-right")));
                window["slider_button2_" + i].push(parseFloat($item.find('.qbutton:eq(1)').css("padding-left")));
                window["slider_button2_" + i].push(parseFloat($item.find('.qbutton:eq(1)').css("padding-right")));

                // margin separator, margin top(0), margin bottom(1)
                window["slider_separator_" + i].push(parseFloat($item.find('.separator').css("margin-top")));
                window["slider_separator_" + i].push(parseFloat($item.find('.separator').css("margin-bottom")));

            }

            //calculate size for slider title, subtitle and text, depending on window size
            function setSliderElementsSize($item,i){
                if($window_width > responsive_breakpoint_set[0]) {
                    slider_graphic_coefficient = coefficients_graphic_array[0];
                    slider_title_coefficient = coefficients_title_array[0];
                    slider_subtitle_coefficient = coefficients_subtitle_array[0];
                    slider_text_coefficient = coefficients_text_array[0];
                    slider_button_coefficient = coefficients_button_array[0];
                }else if($window_width > responsive_breakpoint_set[1]){
                    slider_graphic_coefficient = coefficients_graphic_array[1];
                    slider_title_coefficient = coefficients_title_array[1];
                    slider_subtitle_coefficient = coefficients_subtitle_array[1];
                    slider_text_coefficient = coefficients_text_array[1];
                    slider_button_coefficient = coefficients_button_array[1];
                }else if($window_width > responsive_breakpoint_set[2]){
                    slider_graphic_coefficient = coefficients_graphic_array[2];
                    slider_title_coefficient = coefficients_title_array[2];
                    slider_subtitle_coefficient = coefficients_subtitle_array[2];
                    slider_text_coefficient = coefficients_text_array[2];
                    slider_button_coefficient = coefficients_button_array[2];
                }else if($window_width > responsive_breakpoint_set[3]){
                    slider_graphic_coefficient = coefficients_graphic_array[3];
                    slider_title_coefficient = coefficients_title_array[3];
                    slider_subtitle_coefficient = coefficients_subtitle_array[3];
                    slider_text_coefficient = coefficients_text_array[3];
                    slider_button_coefficient = coefficients_button_array[3];
                }else if ($window_width > responsive_breakpoint_set[4]) {
                    slider_graphic_coefficient = coefficients_graphic_array[4];
                    slider_title_coefficient = coefficients_title_array[4];
                    slider_subtitle_coefficient = coefficients_subtitle_array[4];
                    slider_text_coefficient = coefficients_text_array[4];
                    slider_button_coefficient = coefficients_button_array[4];
                }else if ($window_width > responsive_breakpoint_set[5]){
                    slider_graphic_coefficient = coefficients_graphic_array[5];
                    slider_title_coefficient = coefficients_title_array[5];
                    slider_subtitle_coefficient = coefficients_subtitle_array[5];
                    slider_text_coefficient = coefficients_text_array[5];
                    slider_button_coefficient = coefficients_button_array[5];
                }
                else{
                    slider_graphic_coefficient = coefficients_graphic_array[6];
                    slider_title_coefficient = coefficients_title_array[6];
                    slider_subtitle_coefficient = coefficients_subtitle_array[6];
                    slider_text_coefficient = coefficients_text_array[6];
                    slider_button_coefficient = coefficients_button_array[6];
                }

                // letter-spacing decrease quicker
                var slider_title_coefficient_letter_spacing = slider_title_coefficient;
                var slider_subtitle_coefficient_letter_spacing = slider_subtitle_coefficient;
                var slider_text_coefficient_letter_spacing = slider_text_coefficient;
                if($window_width <= responsive_breakpoint_set[0]) {
                    slider_title_coefficient_letter_spacing = slider_title_coefficient/2;
                    slider_subtitle_coefficient_letter_spacing = slider_subtitle_coefficient/2;
                    slider_text_coefficient_letter_spacing = slider_text_coefficient/2;
                }

                $item.find('.thumb').css({"width": Math.round(window["slider_graphic_width_" + i][0]*slider_graphic_coefficient) + 'px'}).css({"height": Math.round(window["slider_graphic_height_" + i][0]*slider_graphic_coefficient) + 'px'});
                $item.find('.qode_slide-svg-holder svg').css({"width": Math.round(window["slider_svg_width_" + i][0]*slider_graphic_coefficient) + 'px'}).css({"height": Math.round(window["slider_svg_height_" + i][0]*slider_graphic_coefficient) + 'px'});

                $item.find('.q_slide_title').css({"font-size": Math.round(window["slider_title_" + i][0]*slider_title_coefficient) + 'px'});
                $item.find('.q_slide_title').css({"line-height": Math.round(window["slider_title_" + i][1]*slider_title_coefficient) + 'px'});
                $item.find('.q_slide_title').css({"letter-spacing": Math.round(window["slider_title_" + i][2]*slider_title_coefficient_letter_spacing) + 'px'});
                $item.find('.q_slide_title').css({"margin-bottom": Math.round(window["slider_title_" + i][3]*slider_title_coefficient) + 'px'});

                $item.find('.q_slide_subtitle').css({"font-size": Math.round(window["slider_subtitle_" + i][0]*slider_subtitle_coefficient) + 'px'});
                $item.find('.q_slide_subtitle').css({"line-height": Math.round(window["slider_subtitle_" + i][1]*slider_subtitle_coefficient) + 'px'});
                $item.find('.q_slide_subtitle').css({"letter-spacing": Math.round(window["slider_subtitle_" + i][2]*slider_subtitle_coefficient_letter_spacing) + 'px'});
                $item.find('.q_slide_subtitle').css({"margin-bottom": Math.round(window["slider_subtitle_" + i][3]*slider_subtitle_coefficient) + 'px'});

                $item.find('.q_slide_text').css({"font-size": Math.round(window["slider_text_" + i][0]*slider_text_coefficient) + 'px'});
                $item.find('.q_slide_text').css({"line-height": Math.round(window["slider_text_" + i][1]*slider_text_coefficient) + 'px'});
                $item.find('.q_slide_text').css({"letter-spacing": Math.round(window["slider_text_" + i][2]*slider_text_coefficient_letter_spacing) + 'px'});

                $item.find('.qbutton:eq(0)').css({"font-size": Math.round(window["slider_button1_" + i][0]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(1)').css({"font-size": Math.round(window["slider_button2_" + i][0]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(0)').css({"line-height": Math.round(window["slider_button1_" + i][1]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(1)').css({"line-height": Math.round(window["slider_button2_" + i][1]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(0)').css({"letter-spacing": Math.round(window["slider_button1_" + i][2]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(1)').css({"letter-spacing": Math.round(window["slider_button2_" + i][2]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(0)').css({"height": Math.round(window["slider_button1_" + i][3]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(1)').css({"height": Math.round(window["slider_button2_" + i][3]*slider_button_coefficient) + 'px'});
                if(window["slider_button1_" + i][4] != 0) {
                    $item.find('.qbutton:eq(0)').css({"width": Math.round(window["slider_button1_" + i][4]*slider_button_coefficient) + 'px'});
                }else{
                    $item.find('.qbutton:eq(0)').css({"width": 'auto'});
                }
                if(window["slider_button2_" + i][4] != 0) {
                    $item.find('.qbutton:eq(1)').css({"width": Math.round(window["slider_button2_" + i][4]*slider_button_coefficient) + 'px'});
                }else{
                    $item.find('.qbutton:eq(1)').css({"width": 'auto'});
                }
                $item.find('.qbutton:eq(0)').css({"padding-left": Math.round(window["slider_button1_" + i][5]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(1)').css({"padding-left": Math.round(window["slider_button2_" + i][5]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(0)').css({"padding-right": Math.round(window["slider_button1_" + i][6]*slider_button_coefficient) + 'px'});
                $item.find('.qbutton:eq(1)').css({"padding-right": Math.round(window["slider_button2_" + i][6]*slider_button_coefficient) + 'px'});

                $item.find('.separator').css({"margin-top": Math.round(window["slider_separator_" + i][0]*slider_title_coefficient) + 'px'});
                $item.find('.separator').css({"margin-bottom": Math.round(window["slider_separator_" + i][1]*slider_title_coefficient) + 'px'});

            }

            function resetSliderElementsSize($item,i){
                $item.find('.thumb').css({"width": Math.round(window["slider_graphic_width_" + i][0]) + 'px'}).css({"height": Math.round(window["slider_graphic_height_" + i][0]) + 'px'});
                $item.find('.qode_slide-svg-holder svg').css({"width": Math.round(window["slider_svg_width_" + i][0]) + 'px'}).css({"height": Math.round(window["slider_svg_height_" + i][0]) + 'px'});

                $item.find('.q_slide_title').css({"font-size": Math.round(window["slider_title_" + i][0]) + 'px'});
                $item.find('.q_slide_title').css({"line-height": Math.round(window["slider_title_" + i][1]) + 'px'});
                $item.find('.q_slide_title').css({"letter-spacing": Math.round(window["slider_title_" + i][2]) + 'px'});
                $item.find('.q_slide_title').css({"margin-bottom": Math.round(window["slider_title_" + i][3]) + 'px'});

                $item.find('.q_slide_subtitle').css({"font-size": Math.round(window["slider_subtitle_" + i][0]) + 'px'});
                $item.find('.q_slide_subtitle').css({"line-height": Math.round(window["slider_subtitle_" + i][1]) + 'px'});
                $item.find('.q_slide_subtitle').css({"letter-spacing": Math.round(window["slider_subtitle_" + i][2]) + 'px'});
                $item.find('.q_slide_subtitle').css({"margin-bottom": Math.round(window["slider_subtitle_" + i][3]) + 'px'});

                $item.find('.q_slide_text').css({"font-size": Math.round(window["slider_text_" + i][0]) + 'px'});
                $item.find('.q_slide_text').css({"line-height": Math.round(window["slider_text_" + i][1]) + 'px'});
                $item.find('.q_slide_text').css({"letter-spacing": Math.round(window["slider_text_" + i][2]) + 'px'});

                $item.find('.qbutton:eq(0)').css({"font-size": Math.round(window["slider_button1_" + i][0]) + 'px'});
                $item.find('.qbutton:eq(1)').css({"font-size": Math.round(window["slider_button2_" + i][0]) + 'px'});
                $item.find('.qbutton:eq(0)').css({"line-height": Math.round(window["slider_button1_" + i][1]) + 'px'});
                $item.find('.qbutton:eq(1)').css({"line-height": Math.round(window["slider_button2_" + i][1]) + 'px'});
                $item.find('.qbutton:eq(0)').css({"letter-spacing": Math.round(window["slider_button1_" + i][2]) + 'px'});
                $item.find('.qbutton:eq(1)').css({"letter-spacing": Math.round(window["slider_button2_" + i][2]) + 'px'});
                $item.find('.qbutton:eq(0)').css({"height": Math.round(window["slider_button1_" + i][3]) + 'px'});
                $item.find('.qbutton:eq(1)').css({"height": Math.round(window["slider_button2_" + i][3]) + 'px'});
                if(window["slider_button1_" + i][4] != 0) {
                    $item.find('.qbutton:eq(0)').css({"width": Math.round(window["slider_button1_" + i][4]) + 'px'});
                }else{
                    $item.find('.qbutton:eq(0)').css({"width": 'auto'});
                }
                if(window["slider_button2_" + i][4] != 0) {
                    $item.find('.qbutton:eq(1)').css({"width": Math.round(window["slider_button2_" + i][4]) + 'px'});
                }else{
                    $item.find('.qbutton:eq(1)').css({"width": 'auto'});
                }
                $item.find('.qbutton:eq(0)').css({"padding-left": Math.round(window["slider_button1_" + i][5]) + 'px'});
                $item.find('.qbutton:eq(1)').css({"padding-left": Math.round(window["slider_button2_" + i][5]) + 'px'});
                $item.find('.qbutton:eq(0)').css({"padding-right": Math.round(window["slider_button1_" + i][6]) + 'px'});
                $item.find('.qbutton:eq(1)').css({"padding-right": Math.round(window["slider_button2_" + i][6]) + 'px'});

                $item.find('.separator').css({"margin-top": Math.round(window["slider_separator_" + i][0]) + 'px'});
                $item.find('.separator').css({"margin-bottom": Math.round(window["slider_separator_" + i][1]) + 'px'});

            }

			if($this.hasClass('full_screen')){
				$this.css({'height': ($j(window).height() - mobile_header - paspartu_amount_with_top - paspartu_amount_with_bottom) + 'px'});
				$this.find('.qode_slider_preloader').css({'height': ($j(window).height() - mobile_header - paspartu_amount_with_top - paspartu_amount_with_bottom) + 'px'});
                $this.find('.qode_slider_preloader .ajax_loader').css({'display': 'block'});
				$this.find('.item').css({'height': ($j(window).height() - mobile_header - paspartu_amount_with_top - paspartu_amount_with_bottom) + 'px'});

                if($j('.paspartu_outer:not(.disable_top_paspartu)').length){
                    if(!$j('body').hasClass('paspartu_on_top_fixed')){
                        $this.closest('.q_slider').css('padding-top', Math.round(header_height_add_for_paspartu + $window_width * paspartu_width));
                    }
                }

                if($j('.paspartu_outer.paspartu_on_bottom_slider').length){
                    $this.closest('.q_slider').css('padding-bottom', Math.round($window_width * paspartu_width));
                }

                $j(window).resize(function() {
					mobile_header = $j(window).width() < 1000 ? $j('header.page_header').height() : 0;
                    header_height_add_for_paspartu = $window_width > 1000 && !$j('header.page_header').hasClass('transparent') && $j('body.paspartu_on_top_fixed').length == 0 ? $j('header.page_header').height() : 0;
                    paspartu_amount_with_top = $j('.paspartu_outer:not(.disable_top_paspartu)').length > 0 ? Math.round($window_width*paspartu_width + header_height_add_for_paspartu) : 0;
                    paspartu_amount_with_bottom = $j('.paspartu_outer.paspartu_on_bottom_slider').length > 0 ? Math.round($window_width*paspartu_width) : 0;
                    $this.css({'height': ($j(window).height() - mobile_header - paspartu_amount_with_top - paspartu_amount_with_bottom) + 'px'});
                    $this.find('.qode_slider_preloader .ajax_loader').css({'display': 'block'});
                    $this.find('.item').css({'height': ($j(window).height() - mobile_header - paspartu_amount_with_top - paspartu_amount_with_bottom) + 'px'});

                    if($j('.paspartu_outer:not(.disable_top_paspartu)').length){
                        if(!$j('body').hasClass('paspartu_on_top_fixed')){
                            $this.closest('.q_slider').css('padding-top', Math.round(header_height_add_for_paspartu + $window_width * paspartu_width));
                        }
                    }
                    if($j('.paspartu_outer.paspartu_on_bottom_slider').length){
                        $this.closest('.q_slider').css('padding-bottom', Math.round($window_width * paspartu_width));
                    }

					if($this.hasClass('advanced_responsiveness')){
						$this.find('.item').each(function(i){
							setSliderElementsSize($j(this),i);
						});
					}
				});
			}else if($this.hasClass('responsive_height')){
                var $def_height = $this.data('height');

                $this.find('.qode_slider_preloader').css({'height': ($this.height() - mobile_header - paspartu_amount_with_top - paspartu_amount_with_bottom) + 'px', 'display': 'block'});
                if($j('.paspartu_outer:not(.disable_top_paspartu)').length){
                    if(!$j('body').hasClass('paspartu_on_top_fixed')){
                        $this.closest('.q_slider').css('padding-top', Math.round(header_height_add_for_paspartu + $window_width * paspartu_width));
                    }
                }
                if($j('.paspartu_outer.paspartu_on_bottom_slider').length){
                    $this.closest('.q_slider').css('padding-bottom', Math.round($window_width * paspartu_width));
                }

                setSliderHeight($this, $def_height);

                $j(window).resize(function() {
                    if($j('.paspartu_outer:not(.disable_top_paspartu)').length){
                        header_height_add_for_paspartu = $window_width > 1000 && !$j('header.page_header').hasClass('transparent') ? $j('header.page_header').height() : 0;
                        if(!$j('body').hasClass('paspartu_on_top_fixed')){
                            $this.closest('.q_slider').css('padding-top', Math.round(header_height_add_for_paspartu + $window_width * paspartu_width));
                        }
                    }
                    if($j('.paspartu_outer.paspartu_on_bottom_slider').length){
                        $this.closest('.q_slider').css('padding-bottom', Math.round($window_width * paspartu_width));
                    }

                    setSliderHeight($this, $def_height);
					if($this.hasClass('advanced_responsiveness')){
						$this.find('.item').each(function(i){
							setSliderElementsSize($j(this),i);
						});
					}
                });
            }else {
                $this.find('.qode_slider_preloader').css({'height': ($this.height() - mobile_header) + 'px', 'display': 'block'});
                $this.find('.qode_slider_preloader .ajax_loader').css({'display': 'block'});
                if($j('.paspartu_outer:not(.disable_top_paspartu)').length){
                    if(!$j('body').hasClass('paspartu_on_top_fixed')){
                        $this.closest('.q_slider').css('padding-top', Math.round(header_height_add_for_paspartu + $window_width * paspartu_width));
                    }
                }
                if($j('.paspartu_outer.paspartu_on_bottom_slider').length){
                    $this.closest('.q_slider').css('padding-bottom', Math.round($window_width * paspartu_width));
                }

				if($this.hasClass('advanced_responsiveness')){
					$this.find('.item').each(function(i){
						setSliderInitialElementsSize($j(this),i);
						setSliderElementsSize($j(this),i);
					});
				}
                $window_width < 1000 ? setSliderHeight($this, $def_height) : resetSliderHeight($def_height);

                $j(window).resize(function() {
                    if($j('.paspartu_outer:not(.disable_top_paspartu)').length){
                        header_height_add_for_paspartu = $window_width > 1000 && !$j('header.page_header').hasClass('transparent') ? $j('header.page_header').height() : 0;
                        if(!$j('body').hasClass('paspartu_on_top_fixed')){
                            $this.closest('.q_slider').css('padding-top', Math.round(header_height_add_for_paspartu + $window_width * paspartu_width));
                        }
                    }
                    if($j('.paspartu_outer.paspartu_on_bottom_slider').length){
                        $this.closest('.q_slider').css('padding-bottom', Math.round($window_width * paspartu_width));
                    }

					if($window_width < 1000){
                        setSliderHeight($this, $def_height);
						if($this.hasClass('advanced_responsiveness')){
							$this.find('.item').each(function(i){
								setSliderElementsSize($j(this),i);
							});
						}
                    }else{
                        resetSliderHeight($def_height);
                        if($this.hasClass('advanced_responsiveness')){
							$this.find('.item').each(function(i){
								resetSliderElementsSize($j(this),i);
							});
						}
                    }
                });
			}

			if($j('body:not(.boxed):not(.vertical_menu_transparency):not(.vertical_menu_hidden):not(.page-template-landing_page-php)').hasClass('vertical_menu_enabled') && $j(window).width() > 1000){
                var paspartu_add = $j('body').hasClass('paspartu_enabled') ? 2*Math.round($window_width*paspartu_width) : 0; //2 times paspartu (left and right side)
                $this.find('.carousel-inner').width($window_width - 260 - paspartu_add);
				$j(window).resize(function() {
					if($j(window).width() > 1000){
                        paspartu_add = $j('body').hasClass('paspartu_enabled') ? 2*Math.round($window_width*paspartu_width) : 0; //2 times paspartu (left and right side)
                        $this.find('.carousel-inner').width($window_width - 260 - paspartu_add);
					} else {
						$this.find('.carousel-inner').css('width','100%');
					}
				});
			}

            if($j('body:not(.boxed):not(.vertical_menu_transparency):not(.page-template-landing_page-php)').hasClass('vertical_menu_hidden') && $window_width > 1000){
                var paspartu_add = $j('body').hasClass('paspartu_enabled') ? 2*Math.round($window_width*paspartu_width) : 0; //2 times paspartu (left and right side)
                $this.find('.carousel-inner').width($window_width - 40 - paspartu_add);
                $j(window).resize(function() {
                    if($j(window).width() > 1000){
                        paspartu_add = $j('body').hasClass('paspartu_enabled') ? 2*Math.round($window_width*paspartu_width) : 0; //2 times paspartu (left and right side)
                        $this.find('.carousel-inner').width($window_width - 40 - paspartu_add);
                    } else {
                        $this.find('.carousel-inner').css('width','100%');
                    }
                });
            }

			$j(window).scroll(function() {
				if($scroll > ($this.height()+$j('header.page_header').height()) && $j(window).width() > 1000){
					$this.find('.carousel-inner, .carousel-indicators, button').hide();
				}else{
					$this.find('.carousel-inner, .carousel-indicators, button').show();
				}
			});

			var $slide_animation = $this.data('slide_animation');
			if($slide_animation === ""){
				$slide_animation = 6000;
			}

			// function for setting prev/next numbers on arrows
			var all_items_count = $j('div.item').length;
			function setPrevNextNumbers(curr_item, all_items_count){
				if(curr_item == 1){
					$this.find('.left.carousel-control .prev').html(all_items_count);
					$this.find('.right.carousel-control .next').html(curr_item + 1);
				}else if(curr_item == all_items_count){
					$this.find('.left.carousel-control .prev').html(curr_item - 1);
					$this.find('.right.carousel-control .next').html(1);
				}else{
					$this.find('.left.carousel-control .prev').html(curr_item - 1);
					$this.find('.right.carousel-control .next').html(curr_item + 1);
				}
			}

			function initSlider(){
				//set active class on first item
				$this.find('.carousel-inner .item:first-child').addClass('active');
				checkSliderForHeaderStyle($j('.carousel .active'), $this.hasClass('header_effect'));

				if($this.hasClass('slider_thumbs')){
					// initial state of prev/next numbers
					setPrevNextNumbers(1, all_items_count);

					//set prev and next thumb on load
					if($this.find('.active').next('div').find('.image').length){
						src = image_regex.exec($this.find('.active').next('div').find('.image').attr('style'));
						next_image = new Image();
						next_image.src = src[1];
					}else{
						next_image = $this.find('.active').next('div').find('> .video').clone();
						next_image.find('.video-overlay').remove();
						next_image.find('.video-wrap').width(170).height(95);
						next_image.find('.mejs-container').width(170).height(95);
						next_image.find('video').width(170).height(95);
					}
					$this.find('.right.carousel-control .img').html(next_image).find('img, div.video').addClass('old');

					if($this.find('.carousel-inner .item:last-child .image').length){
						src = image_regex.exec($this.find('.carousel-inner .item:last-child .image').attr('style'));
						prev_image = new Image();
						prev_image.src = src[1];
					}else{
						prev_image = $this.find('.carousel-inner .item:last-child > .video').clone();
						prev_image.find('.video-overlay').remove();
						prev_image.find('.video-wrap').width(170).height(95);
						prev_image.find('.mejs-container').width(170).height(95);
						prev_image.find('video').width(170).height(95);
					}
					$this.find('.left.carousel-control .img').html(prev_image).find('img, div.video').addClass('old');
				}

				if($this.hasClass('q_auto_start')){
					$this.carousel({
						interval: $slide_animation,
						pause: false
					});
				} else {
					$this.carousel({
						interval: 0,
						pause: false
					});
				}
				if($this.find('.item video').length){
					initVideoBackgroundSize();
				}

				if($this.hasClass('advanced_responsiveness') && ($this.hasClass('responsive_height') || $this.hasClass('full_screen'))){
                    $this.find('.item').each(function (i) {
                        setSliderInitialElementsSize($j(this), i);
                        setSliderElementsSize($j(this), i);
                    });
                }

				//initiate image animation
				if($j('.carousel-inner .item:first-child').hasClass('animate_image') && $window_width > 1000){
					$this.find('.carousel-inner .item.animate_image:first-child .image').transformAnimate({
						transform: "matrix("+matrixArray[$j('.carousel-inner .item:first-child').data('animate_image')]+")",
						duration: 30000
					});
				}
			}

			if($j('html').hasClass('touch')){
				if($this.find('.item:first-child .mobile-video-image').length > 0){
					src = image_regex.exec($this.find('.item:first-child .mobile-video-image').attr('style'));
					if (src) {
						var backImg = new Image();
						backImg.src = src[1];
						$j(backImg).load(function(){
							$j('.qode_slider_preloader').fadeOut(500);
							initSlider();
                            checkSVG($this);
						});
					}
				}
				else{
					src = image_regex.exec($this.find('.item:first-child .image').attr('style'));
					if (src) {
						var backImg = new Image();
						backImg.src = src[1];
						$j(backImg).load(function(){
							$j('.qode_slider_preloader').fadeOut(500);
							initSlider();
                            checkSVG($this);
						});
					}
				}
			} else {
				if($this.find('.item:first-child video').length > 0){
					$this.find('.item:first-child video').get(0).addEventListener('loadeddata',function(){
						$j('.qode_slider_preloader').fadeOut(500);
						initSlider();
                        checkSVG($this);
					});
				}else{
					src = image_regex.exec($this.find('.item:first-child .image').attr('style'));
					if (src) {
						var backImg = new Image();
						backImg.src = src[1];
						$j(backImg).load(function(){
							$j('.qode_slider_preloader').fadeOut(500);
							initSlider();
                            checkSVG($this);
						});
					}
				}
			}

			$this.on('slide.bs.carousel', function () {
				$this.addClass('in_progress');
				$this.find('.active .slider_content_outer').fadeTo(800,0);
			});
			$this.on('slid.bs.carousel', function () {
				$this.removeClass('in_progress');
				$this.find('.active .slider_content_outer').fadeTo(0,1);
                checkSVG($this);

				// initiate image animation on active slide and reset all others
				$j('div.item.animate_image .image').stop().css({'transform':'', '-webkit-transform':''});
				if($j('div.item.active').hasClass('animate_image') && $window_width > 1000){
					$j('div.item.animate_image.active .image').transformAnimate({
						transform: "matrix("+matrixArray[$j('div.item.animate_image.active').data('animate_image')]+")",
						duration: 30000
					});
				}

				if($this.hasClass('slider_thumbs')){
					var curr_item = $j('div.item').index($j('div.item.active')[0]) + 1;
					setPrevNextNumbers(curr_item, all_items_count);

					// prev thumb
					if($this.find('.active').prev('div.item').length){
						if($this.find('.active').prev('div').find('.image').length){
							src = image_regex.exec($this.find('.active').prev('div').find('.image').attr('style'));
							prev_image = new Image();
							prev_image.src = src[1];
						}else{
							prev_image = $this.find('.active').prev('div').find('> .video').clone();
							prev_image.find('.video-overlay').remove();
							prev_image.find('.video-wrap').width(170).height(95);
							prev_image.find('.mejs-container').width(170).height(95);
							prev_image.find('video').width(170).height(95);
						}
						$this.find('.left.carousel-control .img .old').fadeOut(300,function(){
							$j(this).remove();
						});
						$this.find('.left.carousel-control .img').append(prev_image).find('img, div.video').fadeIn(300).addClass('old');

					}else{
						if($this.find('.carousel-inner .item:last-child .image').length){
							src = image_regex.exec($this.find('.carousel-inner .item:last-child .image').attr('style'));
							prev_image = new Image();
							prev_image.src = src[1];
						}else{
							prev_image = $this.find('.carousel-inner .item:last-child > .video').clone();
							prev_image.find('.video-overlay').remove();
							prev_image.find('.video-wrap').width(170).height(95);
							prev_image.find('.mejs-container').width(170).height(95);
							prev_image.find('video').width(170).height(95);
						}
						$this.find('.left.carousel-control .img .old').fadeOut(300,function(){
							$j(this).remove();
						});
						$this.find('.left.carousel-control .img').append(prev_image).find('img, div.video').fadeIn(300).addClass('old');
					}

					// next thumb
					if($this.find('.active').next('div.item').length){
						if($this.find('.active').next('div').find('.image').length){
							src = image_regex.exec($this.find('.active').next('div').find('.image').attr('style'));
							next_image = new Image();
							next_image.src = src[1];
						}else{
							next_image = $this.find('.active').next('div').find('> .video').clone();
							next_image.find('.video-overlay').remove();
							next_image.find('.video-wrap').width(170).height(95);
							next_image.find('.mejs-container').width(170).height(95);
							next_image.find('video').width(170).height(95);
						}

						$this.find('.right.carousel-control .img .old').fadeOut(300,function(){
							$j(this).remove();
						});
						$this.find('.right.carousel-control .img').append(next_image).find('img, div.video').fadeIn(300).addClass('old');

					}else{
						if($this.find('.carousel-inner .item:first-child .image').length){
							src = image_regex.exec($this.find('.carousel-inner .item:first-child .image').attr('style'));
							next_image = new Image();
							next_image.src = src[1];
						}else{
							next_image = $this.find('.carousel-inner .item:first-child > .video').clone();
							next_image.find('.video-overlay').remove();
							next_image.find('.video-wrap').width(170).height(95);
							next_image.find('.mejs-container').width(170).height(95);
							next_image.find('video').width(170).height(95);
						}
						$this.find('.right.carousel-control .img .old').fadeOut(300,function(){
							$j(this).remove();
						});
						$this.find('.right.carousel-control .img').append(next_image).find('img, div.video').fadeIn(300).addClass('old');
					}
				}
			});

            $this.swipe( {
                swipeLeft: function(event, direction, distance, duration, fingerCount){ $this.carousel('next'); },
                swipeRight: function(event, direction, distance, duration, fingerCount){ $this.carousel('prev'); },
                threshold:20
            });

		});

        if ($j('.no-touch .carousel').length) {
            skrollr_slider = skrollr.init({
                edgeStrategy: 'set',
                smoothScrolling: true,
                forceHeight: false
            });
            skrollr_slider.refresh();
        }
	}
}

function checkSliderForHeaderStyle($this, header_effect){
	"use strict";

	var slide_header_style = "";
	var navigation_color = $this.data('navigation-color');
	if($this.hasClass('light')){ slide_header_style = 'light';}
	if($this.hasClass('dark')){ slide_header_style = 'dark';}

	if( slide_header_style !== ""){
		if(header_effect){
			$j('header.page_header').removeClass('dark light').addClass(slide_header_style);
            $j('aside.vertical_menu_area').removeClass('dark light').addClass(slide_header_style);
		}
		$j('.carousel .carousel-control, .carousel .carousel-indicators').removeClass('dark light').addClass(slide_header_style);
	}else{
		if(header_effect){
			$j('header.page_header').removeClass('dark light').addClass(default_header_style);
            $j('aside.vertical_menu_area').removeClass('dark light').addClass(default_header_style);
		}
		$j('.carousel .carousel-control, .carousel .carousel-indicators').removeClass('dark light').addClass(default_header_style);
	}

	if(navigation_color !== undefined){
		$j('.carousel-control .thumb_holder .thumb_top, .carousel-indicators li').css('background-color',navigation_color);
		$j('.carousel-control .prev_nav, .carousel-control .next_nav').css('border-color',navigation_color);
		$j('.carousel-control .prev_nav i, .carousel-control .next_nav i').css('color',navigation_color);
	}else{
		$j('.carousel-control .thumb_holder .thumb_top, .carousel-indicators li').css('background-color','');
		$j('.carousel-control .prev_nav, .carousel-control .next_nav').css('border-color','');
		$j('.carousel-control .prev_nav i, .carousel-control .next_nav i').css('color','');
	}
}

/*
 ** Set heights for qode carousel, portfolio slider and blog slider
 */
function calculateHeights(){
    if($j('.portfolio_slides').length){
        $j('.portfolio_slides').each(function(){
            $j(this).parents('.caroufredsel_wrapper').css({'height' : ($j(this).find('li.item').outerHeight()-3) + 'px'}); //3 is because of the white line bellow the slider
        });
    }

    if($j('.qode_carousels .slides').length){
        $j('.qode_carousels .slides').each(function(){
            $j(this).parents('.caroufredsel_wrapper').css({'height' : ($j(this).find('li.item').outerHeight()) + 'px'});
        });
    }

    if($j('.blog_slides').length){
        $j('.blog_slides').each(function(){
            $j(this).parents('.caroufredsel_wrapper').css({'height' : ($j(this).find('li.item').outerHeight()-3) + 'px'});
        });
    }

	if($j('.qode-bct-posts').length){
        $j('.qode-bct-posts').each(function(){
            $j(this).parents('.caroufredsel_wrapper').css({'height' : ($j(this).find('.qode-bct-post').outerHeight()) + 'px'});
        });
    }
}

/*
 ** Init Qode Carousel
 */
function initQodeCarousel(){
    "use strict";

    if($j('.qode_carousels').length){
        $j('.qode_carousels').each(function(){
        	var thisItem = $j(this);
        	var numberOfVisibleItems = 6;
        	if(typeof thisItem.data('number-of-visible-items') !== 'undefined' && thisItem.data('number-of-visible-items') !== '') {
        		if(thisItem.data('number-of-visible-items') === 4) {
        			numberOfVisibleItems = 4;
        		} else if (thisItem.data('number-of-visible-items') === 5) {
        			numberOfVisibleItems = 5;
        		}
        	}
        	var itemWidth = (thisItem.parents('.grid_section').length == 1 || thisItem.parents('.qode_elementor_container_inner').length == 1) ? 170 : 315;
            var maxItems = 6;
            if(numberOfVisibleItems === 4) {
                itemWidth = (thisItem.parents('.grid_section').length == 1 || thisItem.parents('.qode_elementor_container_inner').length == 1) ? 255 : 472;
                maxItems = 4;
            } else if (numberOfVisibleItems === 5) {
                itemWidth = (thisItem.parents('.grid_section').length == 1 || thisItem.parents('.qode_elementor_container_inner').length == 1) ? 204 : 378;
                maxItems = 5;
            }

            thisItem.find('.slides').carouFredSel({
                circular: true,
                responsive: true,
                scroll : {
                    items           : 1,
                    duration        : 1000,
                    pauseOnHover    : false
                },
                items: {
                    width: itemWidth,
                    visible: {
                        min: 1,
                        max: maxItems
                    }
                },
                auto: true,
                mousewheel: false,
                swipe: {
                    onMouse: true,
                    onTouch: true
                }

            }).animate({'opacity': 1},1000);
        });
        calculateHeights();
    }
}

/*
** Init Portfolio Slider
*/
function initPortfolioSlider(){
    "use strict";

    if($j('.portfolio_slider').length){

        $j('.portfolio_slider').each(function(){

            var number_of_items;
            var item_width_fw;
            if(typeof $j(this).data('number_of_items') !== 'undefined') {
                number_of_items = $j(this).data('number_of_items');
            }
            else {
                number_of_items = 'auto';
            }

            switch(number_of_items){
                case 4:
                    item_width_fw = 500;
                break;
                case 5:
                    item_width_fw = 350;
                break;
                default:
                	item_width_fw = 500;
            	break;
            }

            var maxItems = ($j(this).parents('.grid_section').length == 1) ? 3 : number_of_items;
            var itemWidth = ($j(this).parents('.grid_section').length == 1) ? 353 : item_width_fw;

            $j(this).find('.portfolio_slides').carouFredSel({
                circular: true,
                responsive: true,
                scroll: 1,
                prev : {
					button : function() {
						return $j(this).parent().siblings('.caroufredsel-direction-nav').find('#caroufredsel-prev');
					}
				},
				next : {
					button : function() {
						return $j(this).parent().siblings('.caroufredsel-direction-nav').find('#caroufredsel-next');
					}
				},
                items: {
                    width: itemWidth,
                    visible: {
                        min: 1,
                        max: maxItems
                    }
                },
                auto: false,
                mousewheel: false,
                swipe: {
                    onMouse: true,
                    onTouch: true
                }
            }).animate({'opacity': 1},1000);
        });

        calculateHeights();

        $j('.portfolio_slider .flex-direction-nav a').on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
        });
    }
}

/*
 ** Init Blog Slider
 */
function initBlogSlider(){
    "use strict";

    if($j('.blog_slider').length){

        $j('.blog_slider').each(function(){
            var $this = $j(this);
            var blogs_shown;
            var maxItems;
            var itemWidth;
            var autoPlay = false;
            if(typeof $this.data('blogs_shown') !== 'undefined') {
                blogs_shown = $this.data('blogs_shown');
            }
            else if($this.hasClass('simple_slider')){
				blogs_shown = 1;
            }
        	else{
                blogs_shown = 'auto';
            }

            autoPlay = $this.data('auto_start');

            if ($this.hasClass('simple_slider')) {
            	maxItems = 1;
            	itemWidth = 300;
            }
            else {
	            maxItems = ($this.parents('.grid_section').length == 1) ? 3 : blogs_shown;
	            var itemWidthTemp;

	            switch (blogs_shown) {
	                case 3:
	                    itemWidthTemp = 667;
	                    break;
	                case 4:
	                    itemWidthTemp = 500;
	                    break;
	                case 5:
	                    itemWidthTemp = 400;
	                    break;
	                case 6:
	                    itemWidthTemp = 334;
	                    break;
	                default:
	                    itemWidthTemp = 500;

	                    break;
	            }

	            itemWidth = ($this.parents('.grid_section').length == 1) ? 353 : itemWidthTemp;
	        }

            $this.find('.blog_slides').carouFredSel({
                circular: true,
                responsive: true,
                scroll: 1,
                prev : {
                    button : function() {
                        return $j(this).parent().siblings('.caroufredsel-direction-nav').find('#caroufredsel-prev');
                    }
                },
                next : {
                    button : function() {
                        return $j(this).parent().siblings('.caroufredsel-direction-nav').find('#caroufredsel-next');
                    }
                },
                items: {
                    width: itemWidth,
                    visible: {
                        min: 1,
                        max: maxItems
                    }
                },
                auto: autoPlay,
                mousewheel: false,
                swipe: {
                    onMouse: true,
                    onTouch: true
                }
            }).animate({'opacity': 1},1000);
        });

        calculateHeights();

        $j('.blog_slider .flex-direction-nav a').on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
        });
    }
}

/*
 ** Init Blog Slider
 */
function qodeInitBlogCarouselTitled(){
	"use strict";

	if($j('.qode-blog-carousel-titled').length){
		$j('.qode-blog-carousel-titled').each(function(){
			var slider = $j(this);
			var maxItems = 4;
			var itemWidth;
			var autoPlay = false;

			if(typeof slider.data('posts-shown') !== 'undefined') {
				maxItems = slider.data('posts-shown');
			}

			if ( $window_width < 769 && maxItems > 2){
				maxItems = 2;
			}

			if ( $window_width < 601 && maxItems > 1){
				maxItems = 1;
			}

			itemWidth = slider.width()/maxItems;

			slider.find('.qode-bct-posts').carouFredSel({
				circular: true,
				responsive: true,
				scroll: 1,
				prev : {
					button : function() {
						return slider.find('.qode-bct-caroufredsel-prev');
					}
				},
				next : {
					button : function() {
						return slider.find('.qode-bct-caroufredsel-next');
					}
				},
				items: {
					width: itemWidth,
					visible: {
						min: 1,
						max: maxItems
					}
				},
				auto: autoPlay,
				mousewheel: false,
				swipe: {
					onMouse: true,
					onTouch: true
				}
			});
			slider.animate({'opacity': 1},1000)
		});

		calculateHeights();

	}
}

/*
**	Opening side menu on "menu button" click
*/
var current_scroll;
function initSideMenu(){
	"use strict";

	if ($j('body').hasClass('side_area_uncovered_from_content')) {
		$j('.side_menu_button_wrapper a.side_menu_button_link,  a.close_side_menu').on('click', function(e){
			e.preventDefault();
			$j('.side_menu').css({'right':'0'});
			if(!$j('.side_menu_button_wrapper a.side_menu_button_link').hasClass('opened')){
				$j('.side_menu').css({'visibility':'visible'});
				$j(this).addClass('opened');
				$j('body').addClass('right_side_menu_opened');
				current_scroll = $j(window).scrollTop();

				$j(window).scroll(function() {
					if(Math.abs($scroll - current_scroll) > 400){
						$j('body').removeClass('right_side_menu_opened');
						$j('.side_menu_button_wrapper a').removeClass('opened');
						var hide_side_menu = setTimeout(function(){
							$j('.side_menu').css({'visibility':'hidden'});
							clearTimeout(hide_side_menu);
						},400);
					}
				});
			}else{
				$j('.side_menu_button_wrapper a.side_menu_button_link').removeClass('opened');
				$j('body').removeClass('right_side_menu_opened');
				var hide_side_menu = setTimeout(function(){
					$j('.side_menu').css({'visibility':'hidden'});
					clearTimeout(hide_side_menu);
				},400);
			}
		});
	}

	if ($j('body').hasClass('side_menu_slide_with_content')) {
			$j('.side_menu_button_wrapper a.side_menu_button_link, a.close_side_menu').on('click', function(e){
			e.preventDefault();

			if(!$j('.side_menu_button_wrapper a.side_menu_button_link').hasClass('opened')){
				$j(this).addClass('opened');
				$j('body').addClass('side_menu_open');
				current_scroll = $j(window).scrollTop();
				$j(window).scroll(function() {

					if(Math.abs($scroll - current_scroll) > 400){
						$j('body').removeClass('side_menu_open');
						$j('.side_menu_button_wrapper a').removeClass('opened');
					}
				});
			}else{//hamburger icon has class open on its click
				$j('body').removeClass('side_menu_open');


				$j('.side_menu_button_wrapper a.side_menu_button_link').removeClass('opened');
				$j('body').removeClass('side_menu_open');

			}

			e.stopPropagation();
			$j('.wrapper').on('click', function() {
				e.preventDefault();
				$j('body').removeClass('side_menu_open');
				$j('.side_menu_button_wrapper a.side_menu_button_link').removeClass('opened');
				$j('body').removeClass('side_menu_open');
			});
		});
	}


	if ($j('body').hasClass('side_menu_slide_from_right')) {
			$j('.wrapper').prepend('<div class="cover"/>');
			$j('.side_menu_button_wrapper a.side_menu_button_link, a.close_side_menu').on('click', function(e){
			e.preventDefault();

			if(!$j('.side_menu_button_wrapper a.side_menu_button_link').hasClass('opened')){
				$j(this).addClass('opened');
				$j('body').addClass('right_side_menu_opened');

				$j(' .wrapper .cover').on('click', function() {
					$j('.side_menu_button_wrapper a.side_menu_button_link').removeClass('opened');
					$j('body').removeClass('right_side_menu_opened');
					$j('.side_menu_button_wrapper a').removeClass('opened');
				});
				current_scroll = $j(window).scrollTop();
				$j(window).scroll(function() {
					if(Math.abs($scroll - current_scroll) > 400){
						$j('body').removeClass('right_side_menu_opened');
						$j('.side_menu_button_wrapper a').removeClass('opened');
					}
				});
			}else{
				$j('.side_menu_button_wrapper a.side_menu_button_link').removeClass('opened');
				$j('body').removeClass('right_side_menu_opened');
			}
		});
	}
}

function setDropDownMenuPosition(){
	"use strict";

	var menu_items = $j(".drop_down > ul > li.narrow");
	menu_items.each( function(i) {

		var browser_width = $j(window).width()-16; // 16 is width of scroll bar
		var boxed_layout; // boxed layout width
        switch(true){
            case qode_body.hasClass('qode_grid_1300'):
                boxed_layout = 1350;
                break;
            case qode_body.hasClass('qode_grid_1200'):
                boxed_layout = 1250;
                break;
            default :
                boxed_layout = 1150;
                break;
        }
		var menu_item_position = $j(menu_items[i]).offset().left;
		var sub_menu_width = $j(menu_items[i]).find('.second .inner ul').width();
		var menu_item_from_left = 0;
		if($j('body').hasClass('boxed')){
			menu_item_from_left = boxed_layout - (menu_item_position - (browser_width - boxed_layout)/2) + 17; // 17 is right padding between menu elements
		} else {
			menu_item_from_left = browser_width - menu_item_position + 17; // 17 is right padding between menu elements
		}
		var sub_menu_from_left;

		if($j(menu_items[i]).find('li.sub').length > 0){
			sub_menu_from_left = menu_item_from_left - sub_menu_width;
		}

		if(menu_item_from_left < sub_menu_width || sub_menu_from_left < sub_menu_width){
			$j(menu_items[i]).find('.second').addClass('right');
			$j(menu_items[i]).find('.second .inner ul').addClass('right');
		}
	});
}

function initDropDownMenu(){
	"use strict";

	var menu_items = $j('.drop_down > ul > li');

	menu_items.each( function(i) {
		if ($j(menu_items[i]).find('.second').length > 0) {
			if($j(menu_items[i]).hasClass('wide')){
				var $this = $j(this),
					dropdown = $this.find('.inner > ul'),
                	dropdownPadding = parseInt(dropdown.css('padding-left').slice(0, -2)) + parseInt(dropdown.css('padding-right').slice(0, -2)),
					dropdownColumns = $this.find('.second > .inner > ul > li'),
                	row_number = dropdownColumns.length;

				if(!$this.hasClass('left_position') && !$this.hasClass('right_position')){
                    $this.find('.second').css('left',0);
				}

				var tallest = 0;
                dropdownColumns.each(function() {
					var thisHeight = $j(this).height();
					if(thisHeight > tallest) {
						tallest = thisHeight;
					}
				});
                dropdownColumns.height(tallest);

                if($this.hasClass('full_width_wide_menu')){
                    var colWidth = 100/row_number+'%';
                    dropdownColumns.css('width', colWidth);
                }else{
                	if (row_number > 4) { row_number = 4;}
                    var width = row_number*dropdownColumns.outerWidth();
                    dropdown.width(width);
				}

				if(!$this.hasClass('wide_background')){
					if(!$this.hasClass('left_position') && !$this.hasClass('right_position')){
						var left_position = ($j(window).width() - 2 * ($j(window).width()-$j(this).find('.second').offset().left))/2 + (width+dropdownPadding)/2;
                        $this.find('.second').css('left',-left_position);
					}
				} else{
					if(!$this.hasClass('left_position') && !$this.hasClass('right_position')){
						var left_position = $this.find('.second').offset().left;
                        $this.find('.second').css('left',-left_position);
                        $this.find('.second').css('width',$j(window).width());
					}
				}
			}

			if(!menu_dropdown_height_set){
				$j(menu_items[i]).data('original_height', $j(menu_items[i]).find('.second').height() + 'px');
				$j(menu_items[i]).find('.second').height(0);
			}

			if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
				$j(menu_items[i]).on("touchstart mouseenter",function(){
					$j(menu_items[i]).find('.second').css({'height': $j(menu_items[i]).data('original_height'), 'overflow': 'visible', 'visibility': 'visible', 'opacity': '1'});
				}).on("mouseleave", function(){
					$j(menu_items[i]).find('.second').css({'height': '0px','overflow': 'hidden', 'visivility': 'hidden', 'opacity': '0'});
				});

			}else{
				var config = {
					interval: 0,
					over: function(){
						setTimeout(function() {
							$j(menu_items[i]).find('.second').addClass('drop_down_start');
							$j(menu_items[i]).find('.second').stop().css({'height': $j(menu_items[i]).data('original_height')});
						}, 150);
					},
					timeout: 150,
					out: function(){
						$j(menu_items[i]).find('.second').stop().css({'height': '0px'});
						$j(menu_items[i]).find('.second').removeClass('drop_down_start');
					}
				};
				$j(menu_items[i]).hoverIntent(config);
			}
		}
	});
	$j('.drop_down ul li.wide ul li a, .drop_down ul li.narrow ul li a').on('click',function(){
		var $this = $j(this);

		if(!$this.next('ul').length && ($this.attr('href') !== "http://#") && ($this.attr('href') !== "#") && !$this.hasClass('no_link')) {
			setTimeout(function() {
				$this.mouseleave();
			}, 500);
		}
	});

	menu_dropdown_height_set = true;
}


/*
 **	Vertical menu toggle dropdown
 */

function initVerticalMenu(){
	"use strict";

	if ($j('.no-touch .vertical_menu_toggle').length) {
		var menu_items = $j('.no-touch .vertical_menu_toggle > ul > li');
		var menu_items_2 = $j('.no-touch .vertical_menu_toggle ul li ul li');

		menu_items.each( function(i) {
			if($j(menu_items[i]).hasClass('has_sub')){
	            var subitems_number = $j(menu_items[i]).find('.inner > ul > li').length;
				$j(menu_items[i]).hoverIntent({
	                over: function() {
	                    $j(menu_items[i]).addClass('open');
						$j(menu_items[i]).find('.second').slideDown(subitems_number*40, 'easeInOutSine', function(){
							$j('.vertical_menu_area.with_scroll').getNiceScroll().resize();
						});

					},
					out: function() {
						//if(!$j(menu_items[i]).hasClass('active')){
						$j(menu_items[i]).removeClass('open');
						$j(menu_items[i]).find('.second').slideUp(subitems_number*40, 'easeInOutSine');
						//}
					},
					timeout: 1000
				});
			}
		});

		menu_items_2.each( function(i) {
			if($j(menu_items_2[i]).hasClass('menu-item-has-children')){
	            var subitems_number = $j(menu_items_2[i]).find('ul > li').length;
	            $j(menu_items_2[i]).hoverIntent({
					over: function() {
						$j(menu_items_2[i]).addClass('open');
						$j(menu_items_2[i]).find('ul').slideDown(subitems_number*40, 'easeInOutSine', function(){
							$j('.vertical_menu_area.with_scroll').getNiceScroll().resize();
						});
					},
					out: function() {
						$j(menu_items_2[i]).removeClass('open');
						$j(menu_items_2[i]).find('ul').slideUp(subitems_number*40, 'easeInOutSine');
					},
					timeout: 1000
				});
			}
		});
	}
	else if ($j('.vertical_menu_on_click').length) {
		var menu_items = $j('.vertical_menu_on_click > ul > li > a');
		var menu_items_2 = $j('.vertical_menu_on_click ul li ul li a');

		menu_items.each( function(i) {
			if($j(menu_items[i]).parent().hasClass('has_sub')){
				$j(menu_items[i]).on('tap click',function(e) {
					e.preventDefault();
					if(!$j(this).parent().hasClass('open')) {
						$j('.vertical_menu_on_click > ul > li').removeClass('open');
						$j('.vertical_menu_on_click > ul > li').find('.second').slideUp('fast');

						$j(this).parent().addClass('open');
						$j(this).parent().find('.second').slideDown('slow', function () {
						    $j('.vertical_menu_area.with_scroll').getNiceScroll().resize();
						});
					}else{

						$j(this).parent().removeClass('open');
						$j(this).parent().find('.second').slideUp('fast', function () {
							$j('.vertical_menu_area.with_scroll').getNiceScroll().resize();
						});
					}
					return false;
				});
			}
		});

		menu_items_2.each( function(i) {
			if($j(menu_items_2[i]).parent().hasClass('menu-item-has-children')){
                $j(menu_items_2[i]).on('tap click',function(e) {
                    e.preventDefault();
                    if(!$j(this).parent().hasClass('open')) {
                        $j('.vertical_menu_on_click ul li ul li').removeClass('open');
                        $j('.vertical_menu_on_click ul li ul li').find('ul').slideUp('fast');

                        $j(this).parent().addClass('open');
                        $j(this).parent().find('ul').slideDown('slow', function () {
                            $j('.vertical_menu_area.with_scroll').getNiceScroll().resize();
                        });
                    }else{
                        $j(this).parent().removeClass('open');
                        $j(this).parent().find('ul').slideUp('fast', function () {
                            $j('.vertical_menu_area.with_scroll').getNiceScroll().resize();
                        });
                    }
                    return false;
                });
			}
		});
	}
	else if ($j('.no-touch .vertical_menu_float').length){
        //show dropdown to content on menu item hover, link is available on menu item click
        var menu_items = $j('.no-touch .vertical_menu_float > ul > li');
        var menu_items_2 = $j('.no-touch .vertical_menu_float ul li ul li');
        menu_items.each( function(i) {
            if($j(menu_items[i]).hasClass('has_sub')){
                $j(menu_items[i]).hoverIntent({
                   over: function() {
                        $j(menu_items[i]).addClass('open');
                        $j(menu_items[i]).find('.second').addClass('vertical_menu_start');
                    },
                    out: function() {
                        //if(!$j(menu_items[i]).hasClass('active')){
                        $j(menu_items[i]).removeClass('open');
                        $j(menu_items[i]).find('.second').removeClass('vertical_menu_start');
                    },
                    timeout: 300
                });
            }
        });

        menu_items_2.each( function(i) {
            if($j(menu_items_2[i]).hasClass('menu-item-has-children')){
                var subitems_number = $j(menu_items_2[i]).find('ul > li').length;
                $j(menu_items_2[i]).hoverIntent({
                    over: function() {
                        $j(menu_items_2[i]).addClass('open');
                        $j(menu_items_2[i]).find('ul').addClass('vertical_submenu_start');
                    },
                    out: function() {
                        $j(menu_items_2[i]).removeClass('open');
                        $j(menu_items_2[i]).find('ul').removeClass('vertical_submenu_start');
                    },
                    timeout: 300
                });
            }
        });
	}

}

/*
 **	Show/Hide Vertical menu for mobile
 */
function initVerticalMobileMenu(){
	"use strict";

	if ($j('.vertical_menu_toggle').length) {
		//register tap / click event for main menu item plus icon
		$j('.touch .vertical_menu_toggle > ul > li.has_sub > a .plus').on('tap click', function(e){
			//first prevent event propagation and it's default behavior
			e.stopPropagation();
			e.preventDefault();

			//is dropdown for clicked item visible?
			if($j(this).parent().next('div.second').is(":visible")){
				//if it is remove 'open' class and slide it up
				$j(this).parents('.touch .vertical_menu_toggle > ul > li.has_sub').removeClass('open');
				$j(this).parent().next('div.second').slideUp(200);
			} else {
				//if it's not visible add 'open' class and slide it down
				$j(this).parents('.touch .vertical_menu_toggle > ul > li.has_sub').addClass('open');
				$j(this).parent().next('div.second').slideDown(200);
			}
		});

		//register tap / click event for second level main menu item plus icon
		$j('.touch .vertical_menu_toggle ul li ul li > a .plus').on('tap click', function(e){
			//first prevent event propagation and it's default behavior
			e.stopPropagation();
			e.preventDefault();

			//is dropdown for clicked item visible?
			if($j(this).parent().next('ul').is(":visible")){
				//if it is remove 'open' class and slide it up
				$j(this).parents('.touch .vertical_menu_toggle ul li ul li').removeClass('open');
				$j(this).parent().next('ul').slideUp(200);
			} else {
				//if it's not visible add 'open' class and slide it down
				$j(this).parents('.touch .vertical_menu_toggle ul li ul li').addClass('open');
				$j(this).parent().next('ul').slideDown(200);
			}
		});
	}
	else if ($j('.vertical_menu_float').length){
		$j('.touch .vertical_menu_float > ul > li.has_sub > a .plus').on('tap click', function(e){
			//first prevent event propagation and it's default behavior
			e.stopPropagation();
			e.preventDefault();

			//is dropdown for clicked item visible?
			if($j(this).parent().next('div.second').hasClass('vertical_menu_start')){
				//if it is remove 'open' class and 'vertical_menu_start'
				$j(this).parents('.touch .vertical_menu_float > ul > li.has_sub').removeClass('open');
				$j(this).parents('.touch .vertical_menu_float > ul > li.has_sub').find('.second').removeClass('vertical_menu_start');
			} else {				//if it's not visible add 'open' class and 'vertical_menu_start'
				$j(this).parents('.touch .vertical_menu_float > ul > li.has_sub').addClass('open');
				$j(this).parents('.touch .vertical_menu_float > ul > li.has_sub').find('.second').addClass('vertical_menu_start');
			}
		});
		//register tap / click event for second level main menu item plus icon
		$j('.touch .vertical_menu_float ul li ul li > a .plus').on('tap click', function(e){
			//first prevent event propagation and it's default behavior
			e.stopPropagation();
			e.preventDefault();

			//is dropdown for clicked item visible?
			if($j(this).parent().next('ul').hasClass('vertical_submenu_start')){
				//if it is remove 'open' class and slide it up
				$j(this).parents('.touch .vertical_menu_float ul li ul li').removeClass('open');
				$j(this).parents('.touch .vertical_menu_float ul li ul li').find('ul').removeClass('vertical_submenu_start');

			} else {
				//if it's not visible add 'open' class and slide it down
				$j(this).parents('.touch .vertical_menu_float ul li ul li').addClass('open');
				$j(this).parents('.touch .vertical_menu_float ul li ul li').find('ul').addClass('vertical_submenu_start');
			}
		});
	}
}

/*
 **	Set transparency for left menu area
 */
function checkVerticalMenuTransparency(){
    if($scroll !== 0){
        $j('body.vertical_menu_transparency').removeClass('vertical_menu_transparency_on');
    }else{
        $j('body.vertical_menu_transparency').addClass('vertical_menu_transparency_on');
    }
}

/*
 **	Show/Hide hidden Vertical menu
 */
function showHideVerticalMenu(){

    if($j('.vertical_menu_hidden').length) {
        var vertical_menu = $j('aside.vertical_menu_area');
		var vertical_menu_bottom_logo = $j('.vertical_menu_area_bottom_logo');
        var hovered_flag = true;

        $j('.vertical_menu_hidden_button').on('click',function (e) {
            e.preventDefault();
            if(hovered_flag) {
                hovered_flag = false;
                current_scroll = $j(window).scrollTop(); //current scroll is defined in front of "initSideMenu" function
                vertical_menu.addClass('active');
				 vertical_menu_bottom_logo.addClass('active');
            }else{
                hovered_flag = true;
                vertical_menu.removeClass('active');
				 vertical_menu_bottom_logo.removeClass('active');
            }
        });

        $j(window).scroll(function() {
            if(Math.abs($scroll - current_scroll) > 400){
                hovered_flag = true;
                vertical_menu.removeClass('active');
				vertical_menu_bottom_logo.removeClass('active');
            }
        });

        //take click outside vertical left/rifgt area and close it
        (function() {
            var Outclick, outclick,
                _this = this;
            Outclick = (function() {
                Outclick.name = 'Outclick';
                function Outclick() {
                    this.objects = [];
                }
                Outclick.prototype.check = function(element, event) {
                    return !element.is(event.target) && element.has(event.target).length === 0;
                };
                Outclick.prototype.trigger = function(e) {
                    var execute,
                        _this = this;
                    execute = false;
                    return $j.each(this.objects, function(index, el) {
                        if (_this.check(el.container, e)) {
                            if (el.related.length < 1) {
                                execute = true;
                            } else {
                                $j.each(el.related, function(index, relation) {
                                    if (_this.check(relation, e)) {
                                        return execute = true;
                                    } else {
                                        execute = false;
                                        return false;
                                    }
                                });
                            }
                            if (execute) {
                                return el.callback.call(el.container);
                            }
                        }
                    });
                };
                return Outclick;
            })();
            outclick = new Outclick;
            $j.fn.outclick = function(options) {
                var _this = this;
                if (options == null) {
                    options = {};
                }
                options.related || (options.related = []);
                options.callback || (options.callback = function() {
                    return _this.hide();
                });
                return outclick.objects.push({
                    container: this,
                    related: options.related,
                    callback: options.callback
                });
            };
            $j(document).mouseup(function(e) {
                return outclick.trigger(e);
            });
        }).call(this);
        $j(vertical_menu).outclick({
            callback: function() {
                hovered_flag = true;
                vertical_menu.removeClass('active');
				vertical_menu_bottom_logo.removeClass('active');
            }
        });
    }
}

/*
**	Plugin for counter shortcode
*/
(function($) {
	"use strict";

	$.fn.countTo = function(options) {
		// merge the default plugin settings with the custom options
		options = $.extend({}, $.fn.countTo.defaults, options || {});

		// how many times to update the value, and how much to increment the value on each update
		var loops = Math.ceil(options.speed / options.refreshInterval),
		increment = (options.to - options.from) / loops;

		return $(this).each(function() {
			var _this = this,
			loopCount = 0,
			value = options.from,
			interval = setInterval(updateTimer, options.refreshInterval);

			function updateTimer() {
				value += increment;
				loopCount++;
				$(_this).html(value.toFixed(options.decimals));

				if (typeof(options.onUpdate) === 'function') {
					options.onUpdate.call(_this, value);
				}

				if (loopCount >= loops) {
					clearInterval(interval);
					value = options.to;

					if (typeof(options.onComplete) === 'function') {
						options.onComplete.call(_this, value);
					}
				}
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,  // the number the element should start at
		to: 100,  // the number the element should end at
		speed: 1000,  // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,  // the number of decimal places to show
		onUpdate: null,  // callback method for every time the element is updated,
		onComplete: null  // callback method for when the element finishes updating
	};
})(jQuery);

/*
**	Counter from zero to defined number
*/
function initToCounter(){
	"use strict";

	if($j('.counter.zero').length){
		$j('.counter.zero').each(function() {

			var parent = $j(this).parent();
			var axis = 100;

			if(typeof parent.data('element-appearance') !== 'undefined' && parent.data('element-appearance') !== false) {
				axis = parent.data('element-appearance');
			}

			if(!$j(this).hasClass('executed')){
				$j(this).addClass('executed');
				if($j(this).parents('.vertical_split_slider').length){
					$j(this).parent().css('opacity', '1');
					var $max = parseFloat($j(this).text());
					$j(this).countTo({
						from: 0,
						to: $max,
						speed: 1500,
						refreshInterval: 100
					});
				}
				else{
					$j(this).appear(function() {
						$j(this).parent().css('opacity', '1');
						var $max = parseFloat($j(this).text());
						$j(this).countTo({
							from: 0,
							to: $max,
							speed: 1500,
							refreshInterval: 100
						});
					},{accX: 0, accY: -axis});
				}
			}
		});
	}
}

/*
**	Counter with random effect
*/
function initCounter(){
	"use strict";

	if($j('.counter.random').length){
		$j('.counter.random').each(function() {

			var parent = $j(this).parent();
			var axis = 100;

			if(typeof parent.data('element-appearance') !== 'undefined' && parent.data('element-appearance') !== false) {
				axis = parent.data('element-appearance');
			}

			if(!$j(this).hasClass('executed')){
				$j(this).addClass('executed');
				if($j(this).parents('.vertical_split_slider').length){
					$j(this).parent().css('opacity', '1');
					$j(this).absoluteCounter({
						speed: 2000,
						fadeInDelay: 1000
					});
				}
				else{
					$j(this).appear(function() {
						$j(this).parent().css('opacity', '1');
						$j(this).absoluteCounter({
							speed: 2000,
							fadeInDelay: 1000
						});
					},{accX: 0, accY: -axis});
				}
			} else {
				if( $j(this).parents('.vertical_split_slider_responsive').length ){
					var counterSpans = $j(this).find('span');
					if( counterSpans.length ){
						counterSpans.remove();
					}
					var digit = 0;
					if( typeof( parent.data('digit') ) !== 'undefined' && parent.data('digit') !== '' ){
						digit = parent.data('digit');
					}

					$j(this).html(digit);
					$j(this).appear(function() {
						$j(this).absoluteCounter({
							speed: 2000,
							fadeInDelay: 1000
						});
					},{accX: 0, accY: -axis});
				}
			}
		});
	}
}

/*
** Countdown
*/

function initCountdown(){
	"use strict";
	if($j('.countdown').length){
		$j('.countdown').each(function(){

			var countdownId = $j(this).attr('id');
			var $this = $j('#'+countdownId);
			var year = 0;
			var month = 0;
			var day = 0;
			var hour = 0;
			var minute = 0;
			var monthsLabel;
			var monthLabel;
			var daysLabel;
			var dayLabel;
			var hoursLabel;
			var hourLabel;
			var minutesLabel;
			var minuteLabel;
			var secondsLabel;
			var secondLabel;
			var tickf;
			var timezone;
			var digitfs;
			var labelfs;
			var color;

			if(typeof $this.data('year') !== 'undefined' && $this.data('year') !== false) {
				year = $this.data('year');
			}
			if(typeof $this.data('month') !== 'undefined' && $this.data('month') !== false) {
				month = $this.data('month');
			}
			if(typeof $this.data('day') !== 'undefined' && $this.data('day') !== false) {
				day = $this.data('day');
			}
			if(typeof $this.data('hour') !== 'undefined' && $this.data('hour') !== false) {
				hour = $this.data('hour');
			}
			if(typeof $this.data('minute') !== 'undefined' && $this.data('minute') !== false) {
				minute = $this.data('minute');
			}
			if(typeof $this.data('monthslabel') !== 'undefined' && $this.data('monthslabel') !== false) {
				monthsLabel = $this.data('monthslabel');
			}
			if(typeof $this.data('monthlabel') !== 'undefined' && $this.data('monthlabel') !== false) {
				monthLabel = $this.data('monthlabel');
			}
			if(typeof $this.data('dayslabel') !== 'undefined' && $this.data('dayslabel') !== false) {
				daysLabel = $this.data('dayslabel');
			}
			if(typeof $this.data('daylabel') !== 'undefined' && $this.data('daylabel') !== false) {
				dayLabel = $this.data('daylabel');
			}
			if(typeof $this.data('hourslabel') !== 'undefined' && $this.data('hourslabel') !== false) {
				hoursLabel = $this.data('hourslabel');
			}
			if(typeof $this.data('hourlabel') !== 'undefined' && $this.data('hourlabel') !== false) {
				hourLabel = $this.data('hourlabel');
			}
			if(typeof $this.data('minuteslabel') !== 'undefined' && $this.data('minuteslabel') !== false) {
				minutesLabel = $this.data('minuteslabel');
			}
			if(typeof $this.data('minutelabel') !== 'undefined' && $this.data('minutelabel') !== false) {
				minuteLabel = $this.data('minutelabel');
			}
			if(typeof $this.data('secondslabel') !== 'undefined' && $this.data('secondslabel') !== false) {
				secondsLabel = $this.data('secondslabel');
			}
			if(typeof $this.data('secondlabel') !== 'undefined' && $this.data('secondlabel') !== false) {
				secondLabel = $this.data('secondlabel');
			}
			if(typeof $this.data('tickf') !== 'undefined' && $this.data('tickf') !== false) {
				tickf = $this.data('tickf');
			}
			if(typeof $this.data('timezone') !== 'undefined' && $this.data('timezone') !== false) {
				timezone = $this.data('timezone');
			}
			if(typeof $this.data('digitfs') !== 'undefined' && $this.data('digitfs') !== false) {
				digitfs = $this.data('digitfs');
			}
			if(typeof $this.data('labelfs') !== 'undefined' && $this.data('labelfs') !== false) {
				labelfs = $this.data('labelfs');
			}
			if(typeof $this.data('color') !== 'undefined' && $this.data('color') !== false) {
				color = $this.data('color');
			}

			$this.countdown({
				until: new Date( year, month - 1, day, hour, minute, 44),
				labels: ['Years', monthsLabel, 'Weeks', daysLabel, hoursLabel, minutesLabel, secondsLabel],
				labels1: ['Year', monthLabel, 'Week', dayLabel, hourLabel, minuteLabel, secondLabel],
				format: 'ODHMS',
				timezone: timezone,
				padZeroes: true,
				significant: 0,
				onTick: function(){
					if (digitfs !== 'undefined' && digitfs !== ''){
						$this.find('.countdown-amount').css('font-size',digitfs + 'px').css('line-height',digitfs + 'px');
					}
					if (labelfs !== 'undefined' && labelfs !== ''){
						$this.find('.countdown-period').css('font-size',labelfs + 'px');
					}
					if (color !== 'undefined' && color !== ''){
						$this.find('.countdown_separator').css('background-color',color);
					}
				}
			});
		});
	}
}

/*
**	Horizontal progress bars shortcode
*/
function initProgressBars(){
	"use strict";

	if($j('.q_progress_bar').length){
		$j('.q_progress_bar').each(function() {
			if($j(this).parents('.vertical_split_slider').length){
				initToCounterHorizontalProgressBar($j(this));
				var percentage = $j(this).find('.progress_content').data('percentage');
				$j(this).find('.progress_content').css('width', '0%');
				$j(this).find('.progress_content').animate({'width': percentage+'%'}, 1500);
				$j(this).find('.progress_number_wrapper').css('width', '0%');
				$j(this).find('.progress_number_wrapper').animate({'width': percentage+'%'}, 1500);
			}
            else {
				$j(this).appear(function() {
					initToCounterHorizontalProgressBar($j(this));
					var percentage = $j(this).find('.progress_content').data('percentage');
					$j(this).find('.progress_content').css('width', '0%');
					$j(this).find('.progress_content').animate({'width': percentage+'%'}, 1500);
					$j(this).find('.progress_number_wrapper').css('width', '0%');
	                $j(this).find('.progress_number_wrapper').animate({'width': percentage+'%'}, 1500);


				},{accX: 0, accY: -200});
			}
		});
	}
}

/*
**	Counter for horizontal progress bars percent from zero to defined percent
*/
function initToCounterHorizontalProgressBar($this){
	"use strict";

    var percentage = parseFloat($this.find('.progress_content').data('percentage'));
	if($this.find('.progress_number span').length) {
		$this.find('.progress_number span').each(function() {
			$j(this).parents('.progress_number_wrapper').css('opacity', '1');
			$j(this).countTo({
				from: 0,
				to: percentage,
				speed: 1500,
				refreshInterval: 50
			});
		});
	}
}

/*
**	Unordered list animation effect
*/
function initListAnimation(){
	"use strict";

	if($j('.animate_list').length > 0 && $j('.no_animation_on_touch').length === 0){
		$j('.animate_list').each(function(){
			$j(this).appear(function() {
				$j(this).find("li").each(function (l) {
					var k = $j(this);
					setTimeout(function () {
						k.animate({
							opacity: 1,
							top: 0
						}, 1500);
					}, 100*l);
				});
			},{accX: 0, accY: -200});
		});
	}
}

/*
**	Pie Chart shortcode
*/
function initPieChart(){
	"use strict";

	if($j('.q_percentage').length){
		$j('.q_percentage').each(function() {

			var $barColor = piechartcolor;

			if(typeof $j(this).data('active') !== 'undefined' && $j(this).data('active') !== ""){
				$barColor = $j(this).data('active');
			}

			var $trackColor = '#eeeeee';

			if(typeof $j(this).data('noactive') !== 'undefined' && $j(this).data('noactive') !== ""){
				$trackColor = $j(this).data('noactive');
			}

			var $line_width = 10;

			if(typeof $j(this).data('linewidth') !== 'undefined' && $j(this).data('linewidth') !== ""){
				$line_width = $j(this).data('linewidth');
			}

			var $size = 174;

			var axis = 200;
			if(typeof $j(this).data('element-appearance') !== 'undefined' && $j(this).data('element-appearance') !== false) {
				axis = $j(this).data('element-appearance');
			}

			$j(this).appear(function() {
				initToCounterPieChart($j(this));
				$j(this).parent().css('opacity', '1');

				$j(this).easyPieChart({
					barColor: $barColor,
					trackColor: $trackColor,
					scaleColor: false,
					lineCap: 'butt',
					lineWidth: $line_width,
					animate: 1500,
					size: $size
				});
			},{accX: 0, accY: -axis});
		});
	}
}

/*
**	Pie Chart shortcode
*/
function initPieChartWithIcon(){
	"use strict";

	if($j('.q_percentage_with_icon').length){
		$j('.q_percentage_with_icon').each(function() {

			var $barColor = piechartcolor;

			if($j(this).data('active') !== ""){
				$barColor = $j(this).data('active');
			}

			var $trackColor = '#eeeeee';

			if($j(this).data('noactive') !== ""){
				$trackColor = $j(this).data('noactive');
			}

			var $line_width = 10;

			if($j(this).data('linewidth') !== ""){
				$line_width = $j(this).data('linewidth');
			}

			var $size = 174;

			$j(this).appear(function() {
				$j(this).parent().css('opacity', '1');
				$j(this).css('opacity', '1');
				$j(this).easyPieChart({
					barColor: $barColor,
					trackColor: $trackColor,
					scaleColor: false,
					lineCap: 'butt',
					lineWidth: $line_width,
					animate: 1500,
					size: $size
				});
			},{accX: 0, accY: -200});
		});
	}
}

/*
**	Counter for pie chart number from zero to defined number
*/
function initToCounterPieChart($this){
	"use strict";

	$j($this).css('opacity', '1');
	var $max = parseFloat($j($this).find('.tocounter').text());
	$j($this).find('.tocounter').countTo({
		from: 0,
		to: $max,
		speed: 1500,
		refreshInterval: 50
	});
}

/*
**	Init Portfolio list and Portfolio Filter
*/
function initPortfolio(){
	"use strict";

	if($j('.projects_holder_outer:not(.masonry_with_space, .justified_gallery)').length){
		$j('.projects_holder_outer').each(function(){

			var currentPortfolio = $j(this).find('.projects_holder');

            if(getIEversion() == 9 || getIEversion() == 10){
                currentPortfolio.addClass('ie-specific-styles');
            }

			$j('.filter_holder .filter').on('click',function(){
				var $this = $j(this).text();
				var activeFilter = $j(this).data('filter');

				if(currentPortfolio.children('article').length) {
					currentPortfolio.children('article').each(function(){
						var thisArtcile = $j(this);

						if(thisArtcile.hasClass(activeFilter) && activeFilter !== 'all') {
							thisArtcile.find('a.lightbox').attr('rel','prettyPhoto[pretty_photo_gallery_'+$this.toLowerCase()+']');
							thisArtcile.find('a.lightbox').attr('data-rel','prettyPhoto[pretty_photo_gallery_'+$this.toLowerCase()+']');
						} else if(activeFilter === 'all') {
							thisArtcile.find('a.lightbox').attr('rel','prettyPhoto[pretty_photo_gallery]');
							thisArtcile.find('a.lightbox').attr('data-rel','prettyPhoto[pretty_photo_gallery]');
						}
					});
				}

				var dropLabels = $j('.filter_holder').find('.label span');
				dropLabels.each(function(){
					$j(this).text($this);
				});
			});

			if(currentPortfolio.hasClass('v1')){
				var timeArray= new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25);
			}else if(currentPortfolio.hasClass('v2')){
				var timeArray= new Array(1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20);
			}else if(currentPortfolio.hasClass('v3')){
				var timeArray= new Array(1,2,3,2,3,4,3,4,5,4,5,6,5,6,7,6,7,8,7,8,9,8,9,10,9,10,11,10,11,12,11,12,13,12,13,14,13,14,15,14,15,16,15,16,17,16,17,18,17,18,19,18,19,20,19,20,21,20,21,22);
			}else if(currentPortfolio.hasClass('v4')){
				var timeArray= new Array(1,2,3,4,2,3,4,5,3,4,5,6,4,5,6,7,5,6,7,8,6,7,8,9,7,8,9,10,8,9,10,11,9,10,11,12,10,11,12,13,11,12,13,14,12,13,14,15,13,14,15,16,14,15,16,17,15,16,17,18,16,17,18,19,17,18,19,20,18,19,20,21);
			}else if(currentPortfolio.hasClass('v5')){
				var timeArray= new Array(1,2,3,4,5,2,3,4,5,6,3,4,5,6,7,4,5,6,7,8,5,6,7,8,9,6,7,8,9,10,7,8,9,10,11,8,9,10,11,12,9,10,11,12,13,10,11,12,13,14,11,12,13,14,15,12,13,14,15,16,13,14,15,16,17,14,15,16,17,18,15,16,17,18,19,20,16,17,18,19,20,17,18,19,20,21,18,19,20,21,22,19,20,21,22,23);
			}else if(currentPortfolio.hasClass('v6')){
				var timeArray= new Array(1,2,3,4,5,6,2,3,4,5,6,7,3,4,5,6,7,8,4,5,6,7,8,9,5,6,7,8,9,10,6,7,8,9,10,11,7,8,9,10,11,12,8,9,10,11,12,13,9,10,11,12,13,14,10,11,12,13,14,15,11,12,13,14,15,16,12,13,14,15,16,17,13,14,15,16,17,18,14,15,16,17,18,19,15,16,17,18,19,20,16,17,18,19,20,21,17,18,19,20,21,22);
			}

            var filterOnLoad;
			if(window.location.hash && (window.location.hash).indexOf("portfolio_category") == 1) {
				filterOnLoad = (window.location.hash).replace('#','');
			} else {
				filterOnLoad = 'all';
			}
			qodeInitPortFilterCounter($j(this));
			currentPortfolio.mixitup({
				showOnLoad: filterOnLoad,
				transitionSpeed: 600,
				minHeight: 150,
				onMixLoad: function(){
					$j('.projects_holder').addClass('hideItems');
					$j('.projects_holder article').css('visibility','visible');

					if(currentPortfolio.hasClass('portfolio_one_by_one')) {
						currentPortfolio.find('article').each(function(l) {
							var currentPortfolioItem = $j(this);
							if($j('.vertical_split_slider').length){
								var acc = 0;
							}else{
								var acc = -150;
							}
                            currentPortfolioItem.appear(function(){
                                setTimeout(function() {
                                    currentPortfolioItem.addClass('show');
                                }, 100*l);
                            },{accX: 0, accY: -150});
						});
					}

					if(currentPortfolio.hasClass('slide_from_left')) {
							currentPortfolio.find('article').each(function(i) {
								var currentPortfolioItem = $j(this);

                                currentPortfolioItem.appear(function(){
                                    setTimeout(function() {
                                        currentPortfolioItem.addClass('show');
                                    }, (Math.random() * 200));
                                },{accX: 0, accY: -150});
							});
					}

					if(currentPortfolio.hasClass('slide_from_top')) {
						currentPortfolio.find('article').each(function(i) {
							var currentPortfolioItem = $j(this);
                            currentPortfolioItem.appear(function(){
                                setTimeout(function() {
                                    currentPortfolioItem.addClass('show');
                                }, timeArray[i]*50);
                            },{accX: 0, accY: -150});
						});
					}

					if(currentPortfolio.hasClass('diagonal_fade')) {
						currentPortfolio.find('article').each(function(i) {
							var currentPortfolioItem = $j(this);
                            currentPortfolioItem.appear(function(){
                                setTimeout(function() {
                                    currentPortfolioItem.addClass('show');
                                }, timeArray[i]*50);
                            },{accX: 0, accY: -150});
						});
					}
					initParallax();
				},
				onMixEnd: function(){
					initParallax();
				}
			});
		});
	}
}

/*
 **	Init z-index for portfolio items
 */
function initPortfolioZIndex(){
	"use strict";

	if($j('.projects_holder_outer.portfolio_no_space').length){
		$j('.no_space.hover_text article').each(function(i){
			$j(this).css('z-index', i +10);
		});
	}
}

function initPortfolioJustifiedGallery() {
	"use strict";

	var project_holder = $j('.projects_holder_outer.justified_gallery');
	project_holder.each(function() {
		var filter_holder = $j(this).find('.filter_holder');

		filter_holder.find('li.filter').first().addClass('current');

		filter_holder.find('.filter').on('click',function(){
			var $this = $j(this).text();
			var dropLabels = filter_holder.find('.label span');
			dropLabels.each(function(){
				$j(this).text($this);
			});

			var selector = $j(this).attr('data-filter');
			var articles = the_gallery.find('article');
			var transition_duration = 500;
			articles.css('transition','all '+transition_duration+'ms ease');
			articles.not(selector).css({
				'transform': 'scale(0)'
			});
			setTimeout(function() {
				articles.filter(selector).css({
					'transform': ''
				});
				the_gallery.css('transition','height '+transition_duration+'ms ease').justifiedGallery({selector: '>article'+(selector != '*' ? selector : '')});
			}, 1.1*transition_duration);
			setTimeout(function() {
				articles.css('transition','');
				the_gallery.css('transition','');
			}, 2.2*transition_duration);

			$j(".filter").removeClass("current active");
			$j(this).addClass("current active");

			return false;
		});

		qodeInitPortFilterCounter(project_holder);
		var the_gallery = $j(this).find('.projects_holder');
		var row_height = typeof the_gallery.data('row-height') !== 'undefined' ? the_gallery.data('row-height') : 200,
			spacing = typeof the_gallery.data('spacing') !== 'undefined' ? the_gallery.data('spacing') : 0,
			last_row = typeof the_gallery.data('last-row') !== 'undefined' ? the_gallery.data('last-row') : 'nojustify',
			justify_threshold = typeof the_gallery.data('justify-threshold') !== 'undefined' ? the_gallery.data('justify-threshold') : 0.75;
		the_gallery
		.justifiedGallery({
			captions: false,
			rowHeight: row_height,
			margins: spacing,
			border: 0,
			lastRow: last_row,
			justifyThreshold: justify_threshold,
			selector: '> article'
		})
		.on('jg.complete jg.rowflush', function() {
			$j(this).find('article').addClass('show').each(function() {
				$j(this).height(Math.round($j(this).height()));
			});
		});
	});
}

function initPortfolioMasonryFilter(){

	"use strict";

	var masonry_holder = $j('.projects_masonry_holder, .masonry_with_space .projects_holder');
	if (masonry_holder.length) {
	    var portfolioIsotopeAnimation = null;
		$j('.filter:first').addClass('current');
		$j('.filter').on('click', function(){

	        clearTimeout(portfolioIsotopeAnimation);
	        $j('.isotope, .isotope .isotope-item').css('transition-duration','0.8s');
	        portfolioIsotopeAnimation = setTimeout(function(){  $j('.isotope, .isotope .isotope-item').css('transition-duration','0s'); },700);

	        var selector = $j(this).attr('data-filter');
	        masonry_holder.isotope({ filter: selector });

			$j(".filter").removeClass("current");
			$j(this).addClass("current");

			var $filterText = $j(this).text();
			if(selector !== '*') {
				selector = selector.substring(1); // because first character is dot
			}

			if(masonry_holder.children('article').length) {
				masonry_holder.children('article').each(function(){
					var thisArtcile = $j(this);

					if(thisArtcile.hasClass(selector) && selector !== '*') {
						thisArtcile.find('a.lightbox').attr('rel','prettyPhoto[pretty_photo_gallery_'+$filterText.toLowerCase()+']');
						thisArtcile.find('a.lightbox').attr('data-rel','prettyPhoto[pretty_photo_gallery_'+$filterText.toLowerCase()+']');
					} else if(selector === '*') {
						thisArtcile.find('a.lightbox').attr('rel','prettyPhoto[pretty_photo_gallery]');
						thisArtcile.find('a.lightbox').attr('data-rel','prettyPhoto[pretty_photo_gallery]');
					}
				});
			}

	        setTimeout(setPortfolioMasZIndex(),700);

			return false;
		});
	}
}

function initPortfolioMasonry(){
	"use strict";

	var portList = $j('.projects_masonry_holder, .masonry_with_space .projects_holder');
	if(portList.length) {
		portList.each(function() {
			var thisPortList = $j(this);
			var size = thisPortList.find('.qode-portfolio-masonry-gallery-grid-sizer').width();

			if(portList.hasClass('projects_masonry_holder')) {
				resizeMasonry(size,thisPortList);
			}
			qodeInitMasonry(thisPortList);
			qodeInitPortFilterCounter(portList.parent());
			$j(window).resize(function(){
				setPortfolioMasZIndex();
				if(portList.hasClass('projects_masonry_holder')) {
					resizeMasonry(size, thisPortList);
				}
				qodeInitMasonry(thisPortList);
			});
		});
	}
}

function qodeInitMasonry(container){
	container.waitForImages(function() {
		container.animate({opacity:1});
		container.isotope({
			itemSelector: '.portfolio_masonry_item, .masonry_with_space .mix',
			masonry: {
				columnWidth: '.qode-portfolio-masonry-gallery-grid-sizer'
			}
		});
		if(container.hasClass('portfolio_one_by_one')) {
			container.find('article').each(function(l) {
				var $this = $j(this);
				setTimeout(function() {
					$this.addClass('show');
				}, 100*l);
			});
		}

		if(container.hasClass('portfolio_fade_from_bottom')) {
			container.find('article').each(function(l) {
				var $this = $j(this);
				$j(this).css({
					'opacity': '0',
					'transform':'translateY(150px)'
				});
				$j(this).appear(function() {
					setTimeout(function() {
						$this.css({'opacity':'1','transition':'all .8s ease','transform':'translateY(0)'});
					}, 100);
				},{accX: 0, accY: -150});
			});
		}
	});
}

function resizeMasonry(size, container){
	var $window = jQuery(window);

	if(container.hasClass('portfolio_masonry_gallery_with_space')) {
		var defaultMasonryItem = container.find('.portfolio_masonry_item.default');
		var largeWidthMasonryItem = container.find('.large_width');
		var largeHeightMasonryItem = container.find('.large_height');
		var largeWidthHeightMasonryItem = container.find('.large_width_height');

		defaultMasonryItem.css('height', size);
		largeHeightMasonryItem.css('height', Math.round(2*size));

		if($window.innerWidth() > 480){
			largeWidthHeightMasonryItem.css('height', Math.round(2*size));
			largeWidthMasonryItem.css('height', size);
		}else{
			largeWidthHeightMasonryItem.css('height', size);

		}
	} else {
		var largeItemHeight;
		if(container.find('article[class*="default"]:first img').height()){
			largeItemHeight = container.find('article[class*="default"]:first img').height();
		}else if(container.find('article[class*="large_width"]:not(.large_width_height):first img').height()){
			largeItemHeight = container.find('article[class*="large_width"]:not(.large_width_height):first img').height();
		}else{
			largeItemHeight = (container.find('article[class*="large_width_height"]:first img').height()) ? (container.find('article[class*="large_width_height"]:first img').height())/2 : (container.find('article[class*="large_height"]:first img').height())/2;
		}
		var double = ($window.innerWidth() > 480) ? 2 : 1 ;
		container.find('article[class*="large_width_height"] img, article[class*="large_height"] img').css('height',(largeItemHeight*double));
	}


}



function setPortfolioMasZIndex(){
	var $elemXPos = {};
	var $elemZIndex = {};

	$j('.projects_masonry_holder article').each(function(){
		$elemXPos[$j(this).index()] = getPortfolioXPos($j(this).css('left'));
	});

	var $elemXPosArray = $j.map($elemXPos, function (value) { return value; });
	$elemXPosArray = cleanPortfolioMasXArray($elemXPosArray);
	$elemXPosArray.sort(function(x,y){return x-y});

	for(var i = 0; i < $elemXPosArray.length; i++){
		$elemZIndex[$elemXPosArray[i]] = i*10;
	}

	$j.each($elemXPos,function(key,val){

		var $zi;
		var $bgd = val;
		$j.each($elemZIndex,function(key,val){
			if($bgd == key) {
				$zi = val;
			}
		});

		$j('.projects_masonry_holder article:eq('+key+')').css('z-index',$zi);
	});
}


function cleanPortfolioMasXArray($elemXPosArray) {
    var i;
    var length = $elemXPosArray.length;
    var $elemXPosOutArray = [];
    var tmp = {};

    for (i = 0; i < length; i++) {
        tmp[$elemXPosArray[i]] = 0;
    }
    for (i in tmp) {
        $elemXPosOutArray.push(i);
    }
    return $elemXPosOutArray;
}

function getPortfolioXPos(css) {
	//return css.substr(7, css.length - 8).split(', ')[4];
	return css.substr(0, css.length - 2);
}


/**
 * Initializes filter counter
 * Category name is second item in class array by default
 */
function qodeInitPortFilterCounter(container){

	if(container.hasClass('portfolio_holder_fwn')){
		var articles = (container.find('article'));
		var filters = (container.find('.filter_holder ul li'));

		filters.each(function(){
			var item = $j(this);

			if((item).data('filter') == 'all' || (item).data('filter') == '*'){
				updateResult(item,".filter_number_of_items", articles.length);
			}
			else{
				var categoryClass = item.attr('data-filter');
				categoryClass = categoryClass.replace(/\./g, '');
				updateResult(item,".filter_number_of_items", container.find('article.'+categoryClass).length);
			}

		});

		filters.css('opacity','1');

	}

	function updateResult(item, pos ,value){
		item.find(pos).text(value);
	}
}


/*
* Get global grid width
*/
function qodeGridWidth() {
	var bodyClasses = qode_body.attr("class");

	if (bodyClasses.match(/grid[\w-]*\b/)) {
		gridClass = bodyClasses.match(/grid[\w-]*\b/).toString();
		qode_grid_width = parseInt(gridClass.substr(5));
	}
}

function initServiceAnimation(){
	"use strict";

	if($j(".fade_in_circle_holder").length > 0 && $j('.no_animation_on_touch').length === 0){
		$j('.fade_in_circle_holder').each(function(){
			$j(this).appear(function(){
				$j(this).addClass('animate_circle');
			},{accX: 0, accY: -200});
		});
	}
}

function checkTitleToShowOrHide(){
	if($j('.title_outer.animate_title_area').length){
		var title_area_height = $j('.title_outer').data('height');
		if($scroll > $j('.title').height()){
			$j('.title_outer').css({'height':title_area_height, 'opacity':'1', 'overflow':'visible'});
		}
	}
}

/*
**	Title area animation
*/
function initTitleAreaAnimation(){
	if($j('.title_outer.animate_title_area').length){

		var title_area_height = $j('.title_outer').data('height');
		if($j('.title_outer').hasClass('with_image')){
			title_area_height = $j('.image.responsive').height();
		}
		if($scroll < $j('.title').height()){
			$j('.title_outer').animate({ height: title_area_height, opacity: 1}, 500, function(){
				$j(this).css({'overflow':'visible'});
				initPortfolioSingleInfo();
				if($j('nav.content_menu').length > 0){
					content_menu_position = $j('nav.content_menu').offset().top;
					contentMenuPosition();
				}
			});
		}
	}
}


/*
**	Title image with parallax effect
*/
function initParallaxTitle(){
	"use strict";

	if(($j('.title').length > 0) && ($j('.touch').length === 0)){

		if($j('.title.has_fixed_background').length){

			var $background_size_width = parseInt($j('.title.has_fixed_background').css('background-size').match(/\d+/));

			var title_holder_height = $j('.title.has_fixed_background').height();
			var title_rate = (title_holder_height / 10000) * 7;

			var title_distance = $scroll - $j('.title.has_fixed_background').offset().top;
			var title_bpos = -(title_distance * title_rate);
			$j('.title.has_fixed_background').css({'background-position': 'center '+ (0+add_for_admin_bar) +'px' });
			if($j('.title.has_fixed_background').hasClass('zoom_out')){
				$j('.title.has_fixed_background').css({'background-size': $background_size_width-$scroll + 'px auto'});
			}
		}

		$j(window).on('scroll', function() {
			if($j('.title.has_fixed_background').length){

				var title_distance = $scroll - $j('.title.has_fixed_background').offset().top;

				var title_bpos = -(title_distance * title_rate);
				$j('.title.has_fixed_background').css({'background-position': 'center ' + (title_bpos+add_for_admin_bar) + 'px' });
				if($j('.title.has_fixed_background').hasClass('zoom_out')){
					$j('.title.has_fixed_background').css({'background-size': $background_size_width-$scroll + 'px auto'});
				}
			}
		});
	}
}

/*
 Plugin: jQuery Parallax
 Version 1.1.3
 Author: Ian Lunn
 Twitter: @IanLunn
 Author URL: http://www.ianlunn.co.uk/
 Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

 Dual licensed under the MIT and GPL licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 */

(function( $ ){
    var $window = $(window);
    var windowHeight = $window.height();

    $window.resize(function () {
        windowHeight = $window.height();
    });

    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;

        //get the starting position of each element to have parallax applied to it
        $this.each(function(){
            firstTop = $this.offset().top;
        });

        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }

        // setup defaults if arguments aren't specified
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;

        // function to be called whenever the window is scrolled or resized
        function update(){
            var pos = $window.scrollTop();

            $this.each(function(){
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);

                // Check if totally above or totally below viewport
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }

                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);


/*
 **	Sections with parallax background image
 */
function initParallax(){
    "use strict";
    if($j('.parallax_section_holder').length){
        $j('.parallax_section_holder').each(function() {
            var parallaxElement = $j(this);
            if(parallaxElement.hasClass('qode_full_screen_height_parallax')){
                parallaxElement.height($window_height);
                //parallaxElement.find('.qodef-parallax-content-outer').css('padding',0);
            }
            var speed = parallaxElement.data('speed')*0.4;
            parallaxElement.parallax("50%", speed);
        });
    }
}

/*
**	Smooth scroll functionality for Side Area
*/
function initSideAreaScroll(){
	"use strict";

	if($j('.side_menu').length){
		$j(".side_menu").niceScroll({
			scrollspeed: 60,
			mousescrollstep: 40,
			cursorwidth: 0,
			cursorborder: 0,
			cursorborderradius: 0,
			cursorcolor: "transparent",
			autohidemode: false,
			horizrailenabled: false
		});
	}
}

/*
 **	Smooth scroll functionality for Vertical Menu Area Toogle style
 */
function initVerticalAreaMenuScroll(){
	"use strict";

	if($j('.vertical_menu_area.with_scroll').length){
		$j(".vertical_menu_area.with_scroll").niceScroll({
			scrollspeed: 60,
			mousescrollstep: 40,
			cursorwidth: 0,
			cursorborder: 0,
			cursorborderradius: 0,
			cursorcolor: "transparent",
			autohidemode: false,
			horizrailenabled: false
		});

	}
}

/*
**	Load more portfolios
*/
function loadMore(){
	"use strict";

	var i = 1;

	$j('.load_more a').on('click', function(e)  {
		e.preventDefault();

		var currentElement = $j(this);
		var currentElementHolder = $j(this).closest('.projects_holder_outer');
		var link = $j(this).attr('href');
		var $content = '.projects_holder';
		var $anchor = '.portfolio_paging .load_more a';
		var $next_href = $j($anchor).attr('href'); // Get URL for the next set of posts
		var filler_num = $j('.projects_holder .filler').length;

		var load_more_holder = $j('.portfolio_paging');
		var loading_holder   = $j('.portfolio_paging_loading');

		load_more_holder.hide();
		loading_holder.show();

		$j.get(link+'', function(data){
			if (!$j($content).is('.justified-gallery')) {
				$j('.projects_holder .filler').slice(-filler_num).remove();
				var $new_content = $j($content, data).wrapInner('').html(); // Grab just the content
				$next_href = $j($anchor, data).attr('href'); // Get the new href
	            $j($content, data).waitForImages(function() {

	                $j('article.mix:last').after($new_content); // Append the new content

	                $j('.projects_holder article').css('visibility','visible');
	                $j('article:not(.show)').each(function(l){
	                    $j(this).addClass('show');
	                });

	                if($j('.masonry_with_space').length){
	                    $j('.masonry_with_space .projects_holder').isotope('reloadItems').isotope();
	                }else{
	                    var min_height = $j('article.mix:first').height();
	                    $j('article.mix').css('min-height',min_height);
	                    $j('.projects_holder').mixitup('remix','all');
	                }
	                prettyPhoto();
	                if($j('.load_more').attr('rel') > i) {
	                    $j('.load_more a').attr('href', $next_href); // Change the next URL
	                } else {
	                    $j('.load_more').remove();
	                }
	                $j('.projects_holder .portfolio_paging:last').remove(); // Remove the original navigation
	                $j('article.mix').css('min-height',0);

					load_more_holder.show();
					loading_holder.hide();
	            });
			}
			else {
				var $new_content = $j($content, data).wrapInner('').html(); // Grab just the content
				$next_href = $j($anchor, data).attr('href'); // Get the new href
	            $j($content, data).waitForImages(function() {

	                $j($content).find('article:last').after($new_content); // Append the new content

	                $j($content).find('article').css('visibility','visible');
	                $j($content).justifiedGallery('norewind');
	                prettyPhoto();
	                if($j('.load_more').attr('rel') > i) {
	                    $j('.load_more a').attr('href', $next_href); // Change the next URL
	                } else {
	                    $j('.load_more').remove();
	                }
	                $j('.projects_holder .portfolio_paging:last').remove(); // Remove the original navigation

					load_more_holder.show();
					loading_holder.hide();
	            });
			}
		}).done(function() {
			setTimeout(function(){
                initPortfolioMasonry();
				qodeInitPortFilterCounter(currentElementHolder);
			},1000);
		});
		i++;


	});
}

/*
**	Picture popup for portfolio lists and portfolio single
*/
function prettyPhoto(){
	"use strict";

	$j('a[data-rel]').each(function() {
		$j(this).attr('rel', $j(this).data('rel'));
	});

	$j("a[rel^='prettyPhoto']").prettyPhoto({
		animation_speed: 'normal', /* fast/slow/normal */
		slideshow: false, /* false OR interval time in ms */
		autoplay_slideshow: false, /* true/false */
		opacity: 0.80, /* Value between 0 and 1 */
		show_title: true, /* true/false */
		allow_resize: true, /* Resize the photos bigger than viewport. true/false */
        horizontal_padding: 0,
        default_width: 650,
		default_height: 400,
		counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
		theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
		hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
		wmode: 'opaque', /* Set the flash wmode attribute */
		autoplay: true, /* Automatically start videos: True/False */
		modal: false, /* If set to true, only the close button will close the window */
		overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
		keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
		deeplinking: false,
		social_tools: false,
		changepicturecallback: function(){
			if($j($j(this).context.activeElement).hasClass('qode-single-image-pretty-photo')){
				$j('.pp_pic_holder').addClass('qode-pretty-photo-hide-navigation');
			}
		}, /* Called everytime an item is shown/changed */
	});
}

/*
**	Show/Hide Mobile menu
*/
function initMobileMenu(){
	"use strict";

	$j(".mobile_menu_button > span").on('tap click', function(e){
        e.preventDefault();

        if ($j(".mobile_menu > ul").is(":visible")){
			$j(".mobile_menu > ul").slideUp(200);
		} else {
			$j(".mobile_menu > ul").slideDown(200);
		}
	});

	$j(".mobile_menu > ul > li.has_sub > span.mobile_arrow, .mobile_menu > ul > li.has_sub > h3, .mobile_menu > ul > li.has_sub > a[href*='#']").on('tap click', function(e){
        e.preventDefault();

        if ($j(this).closest('li.has_sub').find("> ul.sub_menu").is(":visible")){
			$j(this).closest('li.has_sub').find("> ul.sub_menu").slideUp(200);
			$j(this).closest('li.has_sub').removeClass('open_sub');
		} else {
			$j(this).closest('li.has_sub').addClass('open_sub');
			$j(this).closest('li.has_sub').find("> ul.sub_menu").slideDown(200);
		}
	});

	$j(".mobile_menu > ul > li.has_sub > ul.sub_menu > li.has_sub > span.mobile_arrow, .mobile_menu > ul > li.has_sub > ul.sub_menu > li.has_sub > h3, .mobile_menu > ul > li.has_sub > ul.sub_menu > li.has_sub > a[href*='#']").on('tap click', function(e){
        e.preventDefault();

        if ($j(this).parent().find("ul.sub_menu").is(":visible")){
			$j(this).parent().find("ul.sub_menu").slideUp(200);
			$j(this).parent().removeClass('open_sub');
		} else {
			$j(this).parent().addClass('open_sub');
			$j(this).parent().find("ul.sub_menu").slideDown(200);
		}
	});

	$j(".mobile_menu ul li > a, .q_logo a").on('click', function(){

        if(($j(this).attr('href') !== "http://#") && ($j(this).attr('href') !== "#")){
            $j(".mobile_menu > ul").slideUp();
		}
	});
}

/*
**	Init flexslider for portfolio single
*/
function initFlexSlider(){
    "use strict";
    $j('.flexslider').each(function(){
        var $this = $j(this);

        var interval = 8000;
        if(typeof $this.data('interval') !== 'undefined' && $this.data('interval') !== false) {
            interval = parseFloat($this.data('interval')) * 1000;
        }

        var directionNav = true;
        if(typeof $this.data('direction') !== 'undefined') {
            directionNav = $this.data('direction');
        }

        var controlNav = false;
        if(typeof $this.data('control') !== 'undefined'){
            controlNav = $this.data('control');
        }

        var pauseOnHoverAction = true;
        if(typeof $this.data('pause-on-hover') !== 'undefined'){
            pauseOnHoverAction = $this.data('pause-on-hover');
        }

        var enableDrag = false;
        if(typeof $this.data('drag') !== 'undefined'){
            enableDrag = $this.data('drag');
        }

        var slideshow = true;
        if(interval === 0) {
            slideshow = false;
        }

        var animation = 'slide';
        if(typeof $this.data('flex_fx') !== 'undefined' && $this.data('flex_fx') !== false) {
            animation = $this.data('flex_fx');
        }

        $this.flexslider({
            animationLoop: true,
            controlNav: controlNav,
            directionNav: directionNav,
            useCSS: false,
            pauseOnAction: pauseOnHoverAction,
            pauseOnHover: pauseOnHoverAction,
            slideshow: slideshow,
            animation: animation,
            prevText: "<div><i class='fa fa-angle-left'></i></div>",
            nextText: "<div><i class='fa fa-angle-right'></i></div>",
            animationSpeed: 600,
            slideshowSpeed: interval,
            touch: true,
            start: function(){
                setTimeout(function(){$j(".flexslider").fitVids();},100);
            }
        });

        $this.find('.flex-direction-nav a').on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
        });

        if(enableDrag) {
            $this.swipe({
                swipeLeft: function () { $this.flexslider('next'); },
                swipeRight: function () { $this.flexslider('prev'); },
                threshold: 20
            });
        }

    });
}

/*
**	Init fitVideo function for responsive video files
*/
function fitVideo(){
	"use strict";

	$j(".portfolio_images").fitVids();
	$j(".video_holder").fitVids();
	$j(".format-video .post_image").fitVids();
	$j(".format-video .q_masonry_blog_post_image").fitVids();
}

/*
**	Function for follow portfolio single descripton
*/
var $scrollHeight;
function initPortfolioSingleInfo(){
	"use strict";

	var $sidebar = $j(".portfolio_single_follow");
	if($j(".portfolio_single_follow").length > 0){

		var offset = $sidebar.offset();
		$scrollHeight = $j(".portfolio_container").height();
		var $scrollOffset = $j(".portfolio_container").offset();
		var $window = $j(window);

		var $headerHeight = parseInt($j('header.page_header').css('height'), 10);

		$window.scroll(function() {
			if($window.width() > 960){
				if ($window.scrollTop() + $headerHeight + 3 > offset.top) {
					if ($window.scrollTop() + $headerHeight + $sidebar.height() + 24 < $scrollOffset.top + $scrollHeight) {

						$sidebar.stop().animate({
							marginTop: $window.scrollTop() - offset.top + $headerHeight
						});
					} else {
						$sidebar.stop().animate({
							marginTop: $scrollHeight - $sidebar.height() - 24
						});
					}
				} else {
					$sidebar.stop().animate({
						marginTop: 0
					});
				}
			}else{
				$sidebar.css('margin-top',0);
			}
		});
	}
}

/*
**	Init tabs shortcodes
*/
function initTabs(){
	"use strict";
	if($j('.q_tabs').length){
		$j('.q_tabs').appear(function() {
			$j('.q_tabs').css('visibility', 'visible');
		},{accX: 0, accY: -100});
		var $tabsNav = $j('.tabs-nav');
		var $tabsNavLis = $tabsNav.children('li');
		$tabsNav.each(function() {
			var $this = $j(this);
			$this.next().children('.tab-content').stop(true,true).hide().first().show();
			$this.children('li').first().addClass('active').stop(true,true).show();
		});
		$tabsNavLis.on('click', function(e) {
			var $this = $j(this);
			$this.siblings().removeClass('active').end().addClass('active');
			$this.parent().next().children('.tab-content').stop(true,true).hide().siblings( $this.find('a').attr('href') ).fadeIn();
			e.preventDefault();
		});
	}
}


/*
 **	Init advanced tabs shortcode
 */
function qodeInitAdvancedTabs(){

	var tabs = $j('.qode-advanced-tabs');
	if(tabs.length){
		tabs.each(function(){
			var thisTabs = $j(this);

			thisTabs.children('.qode-advanced-tab-container').each(function(index){
				index = index + 1;
				var that = $j(this),
					link = that.attr('id'),
					navItem = that.parent().find('.qode-advanced-tabs-nav li:nth-child('+index+') a'),
					navLink = navItem.attr('href');

				link = '#'+link;
				if(link.indexOf(navLink) > -1) {
					navItem.attr('href',link);
				}
			});

			thisTabs.tabs();
		});
	}
}

/*
 **	Generate icons in tabs navigation
 */
function qodeInitAdvancedTabsIcons(){

	var tabContent = $j('.qode-advanced-tab-container');
	if(tabContent.length){

		tabContent.each(function(){
			var thisTabContent = $j(this);

			var id = thisTabContent.attr('id');
			var icon = '';
			if(typeof thisTabContent.data('icon-html') !== 'undefined' || thisTabContent.data('icon-html') !== 'false') {
				icon = thisTabContent.data('icon-html');
			}

			var tabNav = thisTabContent.parents('.qode-advanced-tabs').find('.qode-advanced-tabs-nav > li a[href="#'+id+'"]');
			if(typeof(tabNav) !== 'undefined') {
				tabNav.children('.qode-advanced-icon-frame').append(icon);
			}
		});
	}
}

/*
 **	Init accordion and toogle shortcodes
 */
function initAccordion() {
	"use strict";

	if($j(".q_accordion_holder").length){
		$j(".q_accordion_holder").appear(function() {
			$j(".q_accordion_holder").css('visibility', 'visible');
		},{accX: 0, accY: -100});

		if ($j(".accordion").length) {
			$j(".accordion").accordion({
				animate: "swing",
				collapsible: true,
				active: false,
				icons: "",
				heightStyle: "content",
				activate: function(event, ui) {
					initParallax();
				}
			});

            //define custom options for each accordion
            $j(".accordion").each(function() {
                var activeTab = parseInt($j(this).data('active-tab'));
                if(activeTab !== "") {
                    activeTab = activeTab - 1; // - 1 because active tab is set in 0 index base
                    $j(this).accordion('option', 'active', activeTab);
                }
				var borderRadius = parseInt($j(this).data('border-radius'));

				if(borderRadius !== "") {
					$j(this).find('.accordion_mark').css('border-radius', borderRadius+"px");
				}
                var collapsible = ($j(this).data('collapsible') == 'yes') ? true : false;
                $j(this).accordion('option', 'collapsible', collapsible);
                $j(this).accordion('option', 'collapsible', collapsible);
            });
		}
		$j(".toggle").addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset")
		.find(".title-holder")
		.addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom")
		.hover(function() {
			$j(this).toggleClass("ui-state-hover");
		})
		.on('click', function() {
			$j(this)
				.toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom")
				.next().toggleClass("ui-accordion-content-active").slideToggle(400);
			return false;
		})
		.next()
		.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom")
		.hide();

        $j(".toggle").each(function() {
            var activeTab = parseInt($j(this).data('active-tab'));
            if(activeTab !== "" && activeTab >= 1) {
                activeTab = activeTab - 1; // - 1 because active tab is set in 0 index base
                $j(this).find('.ui-accordion-content').eq(activeTab).show();
                $j(this).find('.ui-accordion-header').eq(activeTab).addClass('ui-state-active'); //set active accordion header
            }

        });
	}
}

/*
**	Function to enable link in accordion
*/
function initAccordionContentLink(){
	"use strict";

	if($j(".accordion").length){
		$j('.accordion_holder .accordion_inner .accordion_content a').on('click', function(){
			if($j(this).attr('target') === '_blank'){
				window.open($j(this).attr('href'),'_blank');
			}else{
				window.open($j(this).attr('href'),'_self');
			}
			return false;
		});
	}
}

/*
**	Init testimonials shortcode
*/
function initTestimonials(){
	"use strict";

    if($j('.testimonials_carousel').length){
        $j('.testimonials_carousel').each(function(){

            var interval = 5000;
            var $this = $j(this);

            if(typeof $this.data('auto-rotate-slides') !== 'undefined' && $this.data('auto-rotate-slides') !== false) {
                interval = parseFloat($this.data('auto-rotate-slides')) * 1000;
            }

            var slideshow = true;
            if(interval === 0) {
                slideshow = false;
            }

            var animation = 'fade';
            if(typeof $this.data('animation-type') !== 'undefined' && $this.data('animation-type') !== false) {
                animation = $this.data('animation-type');
            }

            var directionNav = true;
            if(typeof $this.data('show-navigation') !== 'undefined') {
                directionNav = $this.data('show-navigation') == 'no' ? false : true;
            }

            var animationSpeed = 600;
            if(typeof $this.data('animation-speed') !== 'undefined' && $this.data('animation-speed') !== false) {
                animationSpeed = $this.data('animation-speed');
            }

            var numberPerPage = qodeNumberOfTestimonialsItems($this);
            var itemWidth = 0;
            var itemMargin = 0;
            if(typeof numberPerPage !== 'undefined' && numberPerPage !== 1) {
                itemWidth = 200; //just dummy number, script will calculate it
                itemMargin = 40;
            }

            $this.flexslider({
                animationLoop: true,
                controlNav: false,
                directionNav: directionNav,
                useCSS: false,
                pauseOnAction: true,
                pauseOnHover: false,
                slideshow: slideshow,
                animation: animation,
                itemMargin: itemMargin,
                minItems: numberPerPage,
                maxItems: numberPerPage,
                itemWidth: itemWidth,
                animationSpeed: animationSpeed,
                slideshowSpeed: interval,
                start: function(slider){
                    initParallax();
                }
            });
        });

    }
}

/*
 * Set numbers of items per page
 */
function qodeNumberOfTestimonialsItems($this){
    var maxItems = $this.data('number-per-slide');

    if ($window_width < 768 && maxItems > 1){
        maxItems = 1;
    }else if ($window_width < 1024 && maxItems > 2) {
        maxItems = 2;
    }

    return maxItems;
}

/*
 * Set numbers of items per page on window resize
 */

function qodeNumberOfTestimonialsItemsResize(){


    var testimonialsSlider = $j('.testimonials_carousel, .testimonials_c_carousel');

    if(testimonialsSlider.length){
        testimonialsSlider.each(function(){
            var thisSliderHolder = $j(this);

            var items = qodeNumberOfTestimonialsItems(thisSliderHolder);

	        if (typeof thisSliderHolder.data('flexslider') !== 'undefined') {
		        thisSliderHolder.data('flexslider').vars.minItems = items;
	        }
	        if (typeof thisSliderHolder.data('flexslider') !== 'undefined') {
		        thisSliderHolder.data('flexslider').vars.maxItems = items;
	        }
        });
    }

}

/*
**	Init Testimonials Carousel shortcode
*/
function initTestimonialsCarousel(){
	"use strict";

    if($j('.testimonials_c_carousel').length){
        $j('.testimonials_c_carousel').each(function(){
            var interval = 5000;
            var $this = $j(this);

            if(typeof $this.data('auto-rotate-slides') !== 'undefined' && $this.data('auto-rotate-slides') !== false) {
                interval = parseFloat($this.data('auto-rotate-slides')) * 1000;
            }

            var slideshow = true;
            if(interval === 0) {
                slideshow = false;
            }

            var controlNav = true;
            if(typeof $this.data('show-navigation') !== 'undefined') {
                controlNav = $this.data('show-navigation') == 'no' ? false : true;
            }

            var animationSpeed = 600;
            if(typeof $this.data('animation-speed') !== 'undefined' && $this.data('animation-speed') !== false) {
                animationSpeed = $this.data('animation-speed');
            }

            var numberPerPage = qodeNumberOfTestimonialsItems($this);
            var itemWidth = 0;
            var itemMargin = 0;
            if(typeof numberPerPage !== 'undefined' && numberPerPage !== 1) {
                itemWidth = 300;
                itemMargin = 30;
            }

            $this.flexslider({
                animationLoop: true,
                controlNav: controlNav,
                directionNav: false,
                useCSS: false,
                pauseOnAction: true,
                pauseOnHover: false,
                slideshow: slideshow,
                animation: 'slide',
                itemMargin: itemMargin,
                minItems: numberPerPage,
                maxItems: numberPerPage,
                itemWidth: itemWidth,
                animationSpeed: animationSpeed,
                slideshowSpeed: interval,
	            start: function(slider){
		            initParallax();
	            }
            });
        });

    }
}

/*
**	Function to close message shortcode
*/
function initMessages(){
	"use strict";

	if($j('.q_message').length){
		$j('.q_message').each(function(){
			$j(this).find('.close').on('click', function(e){
				e.preventDefault();
				$j(this).parent().parent().fadeOut(500);
			});
		});
	}
}
/*
**	Init Element Animations
*/
function initElementsAnimation(){
	"use strict";

	if($j(".element_from_fade").length > 0 && $j('.no_animation_on_touch').length === 0){
		$j('.element_from_fade').each(function(){
			var $this = $j(this);

			$this.appear(function() {
				$this.addClass('element_from_fade_on');
			},{accX: 0, accY: -100});
		});
	}

	if($j(".element_from_left").length > 0 && $j('.no_animation_on_touch').length === 0){
		$j('.element_from_left').each(function(){
			var $this = $j(this);

			$this.appear(function() {
				$this.addClass('element_from_left_on');
			},{accX: 0, accY: -100});
		});
	}

	if($j(".element_from_right").length > 0 && $j('.no_animation_on_touch').length === 0){
		$j('.element_from_right').each(function(){
			var $this = $j(this);

			$this.appear(function() {
				$this.addClass('element_from_right_on');
			},{accX: 0, accY: -100});
		});
	}

	if($j(".element_from_top").length > 0 && $j('.no_animation_on_touch').length === 0){
		$j('.element_from_top').each(function(){
			var $this = $j(this);

			$this.appear(function() {
				$this.addClass('element_from_top_on');
			},{accX: 0, accY: -100});
		});
	}

	if($j(".element_from_bottom").length > 0 && $j('.no_animation_on_touch').length === 0){
		$j('.element_from_bottom').each(function(){
			var $this = $j(this);

			$this.appear(function() {
				$this.addClass('element_from_bottom_on');
			},{accX: 0, accY: -100});
		});
	}

	if($j(".element_transform").length > 0 && $j('.no_animation_on_touch').length === 0){
		$j('.element_transform').each(function(){
			var $this = $j(this);

			$this.appear(function() {
				$this.addClass('element_transform_on');
			},{accX: 0, accY: -100});
		});
	}
}

/*
**	Init audio player for blog layout
*/
function fitAudio(){
	"use strict";

	$j('audio.blog_audio').mediaelementplayer({
		audioWidth: '100%'
	});
}

/*
**	Init masonry layout for blog template
*/
function initBlog() {
    "use strict";

    if($j('.blog_holder.masonry, .blog_holder.blog_pinterest').length) {
        var width_blog = $j(this).closest('.container_inner').width(),
            filters = $j('.filter'),
            firstFilter = $j('.filter_holder ul > .filter:first-of-type');
        if($j('.blog_holder').closest(".column_inner").length) {
            width_blog = $j('.blog_holder').closest(".column_inner").width();
        }
        $j('.blog_holder').width(width_blog);
        var $container = $j('.blog_holder');

        $container.waitForImages(function() {
            setTimeout(function() {
                $container.isotope({
                    itemSelector: 'article',
                    resizable: false,
                    masonry: {columnWidth: '.blog_holder_grid_sizer', gutter: '.blog_holder_grid_gutter'}
                });

                $j('.blog_holder.masonry, .blog_holder.blog_pinterest').animate({opacity: "1"}, 500);
            }, 400);
        });

        firstFilter.addClass('active');

        filters.on('click', function() {
            filters.removeClass('active');
            $j(this).addClass('active');
            var selector = $j(this).attr('data-filter');
            $container.isotope({filter: selector});
            return false;
        });

        if($container.hasClass('masonry_infinite_scroll')) {
            $container.infinitescroll({
                    navSelector: '.blog_infinite_scroll_button span',
                    nextSelector: '.blog_infinite_scroll_button span a',
                    itemSelector: 'article',
                    loading: {
                        finishedMsg: finished_text,
                        msgText: loading_text
                    }
                },
                // call Isotope as a callback
                function(newElements) {
                    $container.isotope('appended', $j(newElements));
                    fitVideo();
                    fitAudio();
                    initFlexSlider();
                    setTimeout(function() {
                        $j('.blog_holder.masonry, .blog_holder.blog_pinterest').isotope('layout');
                    }, 400);
                }
            );
        } else if($container.hasClass('masonry_load_more')) {


            var i = 1;
            $j('.blog_load_more_button a').off('click tap').on('click tap', function(e) {
                e.preventDefault();

                var load_more_holder = $j('.blog_load_more_button');
                var load_more_loading = $j('.blog_load_more_button_loading');
                load_more_holder.hide();
                load_more_loading.show();

                var link = $j(this).attr('href');
                var $content = '.masonry_load_more';
                var $anchor = '.blog_load_more_button a';
                var $next_href = $j($anchor).attr('href');
                $j.get(link + '', function(data) {
                    var $new_content = $j($content, data).wrapInner('').html();
                    $next_href = $j($anchor, data).attr('href');
                    $container.append($j($new_content)).isotope('reloadItems').isotope({sortBy: 'original-order'});
                    fitVideo();
                    fitAudio();
                    initFlexSlider();
                    setTimeout(function() {
                        $j('.blog_holder.masonry, .blog_holder.blog_pinterest').isotope('layout');
                    }, 400);

                    load_more_holder.show();
                    load_more_loading.hide();

                    if($j('.blog_load_more_button span').attr('rel') > i) {
                        $j('.blog_load_more_button a').attr('href', $next_href); // Change the next URL
                    } else {
                        $j('.blog_load_more_button').remove();
                    }
                });
                i++;
            });

        }
    }
}

/*
 **	Init full width masonry layout for blog template
 */
function initBlogMasonryFullWidth(){
	"use strict";

	if($j('.masonry_full_width').length){
		var width_blog = $j('.full_width_inner').width();

		$j('.masonry_full_width').width(width_blog);
		var $container = $j('.masonry_full_width');

		$j('.filter').on('click', function(){
			var selector = $j(this).attr('data-filter');
			$container.isotope({ filter: selector });
			return false;
		});
		if( $container.hasClass('masonry_infinite_scroll')){
			$container.infinitescroll({
					navSelector  : '.blog_infinite_scroll_button span',
					nextSelector : '.blog_infinite_scroll_button span a',
					itemSelector : 'article',
					loading: {
						finishedMsg: finished_text,
						msgText  : loading_text
					}
				},
				// call Isotope as a callback
				function( newElements ) {
					$container.isotope( 'appended', $j( newElements ) );
					fitVideo();
					fitAudio();
                    initFlexSlider();

                    setTimeout(function() {
                        $j('.blog_holder.masonry_full_width').isotope( 'layout');
                    }, 400);
				}
			);
		}else if($container.hasClass('masonry_load_more')){


			var i = 1;
			$j('.blog_load_more_button a').off('click tap').on('click tap', function(e)  {
				e.preventDefault();

				var link = $j(this).attr('href');
				var $content = '.masonry_load_more';
				var $anchor = '.blog_load_more_button a';
				var $next_href = $j($anchor).attr('href');
				$j.get(link+'', function(data){
					var $new_content = $j($content, data).wrapInner('').html();
					$next_href = $j($anchor, data).attr('href');
					$container.append( $j( $new_content) ).isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
					fitVideo();
					fitAudio();
                    initFlexSlider();

                    setTimeout(function() {
                        $j('.blog_holder.masonry_full_width').isotope( 'layout');
                    }, 400);

					if($j('.blog_load_more_button span').attr('rel') > i) {
						$j('.blog_load_more_button a').attr('href', $next_href); // Change the next URL
					} else {
						$j('.blog_load_more_button').remove();
					}

				});
				i++;
			});

		}

        $container.waitForImages(function() {
            setTimeout(function() {
                $container.isotope({
                    itemSelector: 'article',
                    resizable: false,
                    masonry: { columnWidth: '.blog_holder_grid_sizer',gutter: '.blog_holder_grid_gutter'}
                });

                $j('.masonry_full_width').animate({opacity: "1"}, 500);
            }, 400);
        });
	}
}

/*
 **	Init gallery masonry layout for blog template
 */
function initBlogMasonryGallery(){
    "use strict";

    if($j('.blog_holder.masonry_gallery').length) {

        qodeResizeBlogMasonryGallery($j('.blog_holder_grid_sizer').width());

        var container = $j('.blog_holder.masonry_gallery');
        container.width(Math.round(container.parent().width()));
        container.isotope({
            itemSelector: 'article',
            resizable: false,
            masonry: {
                columnWidth: '.blog_holder_grid_sizer',
                gutter: '.blog_holder_grid_gutter'
            }
        });

        container.waitForImages(function(){
            container.animate({opacity: "1"}, 300, function() {
                container.isotope().isotope('layout');
            });
        });

        if( container.hasClass('masonry_infinite_scroll')){
            container.infinitescroll({
                    navSelector  : '.blog_infinite_scroll_button span',
                    nextSelector : '.blog_infinite_scroll_button span a',
                    itemSelector : 'article',
                    loading: {
                        finishedMsg: finished_text,
                        msgText  : loading_text
                    }
                },
                // call Isotope as a callback
                function( newElements ) {
                    container.isotope( 'appended', $j( newElements ) );
                    fitVideo();
                    fitAudio();
                    initFlexSlider();
                    qodeResizeBlogMasonryGallery($j('.blog_holder_grid_sizer').width());
                    setTimeout(function() {
                        container.isotope( 'layout');
                    }, 300);
                }
            );
        }else if(container.hasClass('masonry_load_more')){
            var i = 1;
            $j('.blog_load_more_button a').off('click tap').on('click tap', function(e)  {
                e.preventDefault();

                var link = $j(this).attr('href');
                var $content = '.masonry_load_more';
                var $anchor = '.blog_load_more_button a';
                var $next_href = $j($anchor).attr('href');
                $j.get(link+'', function(data){
                    var $new_content = $j($content, data).wrapInner('').html();
                    $next_href = $j($anchor, data).attr('href');
                    container.append( $j( $new_content) ).isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
                    fitVideo();
                    fitAudio();
                    initFlexSlider();
                    qodeResizeBlogMasonryGallery($j('.blog_holder_grid_sizer').width());
                    setTimeout(function() {
                        container.isotope( 'layout');
                    }, 300);

                    if($j('.blog_load_more_button span').attr('rel') > i) {
                        $j('.blog_load_more_button a').attr('href', $next_href); // Change the next URL
                    } else {
                        $j('.blog_load_more_button').remove();
                    }

                });
                i++;
            });

        }

        $j(window).resize(function() {
            qodeResizeBlogMasonryGallery($j('.blog_holder_grid_sizer').width());
            container.isotope().isotope('layout');
            container.width(Math.round(container.parent().width()));
        });
    }
}


/*
 **	Init gallery masonry layout for blog template
 */
function initBlogGallery(){
	"use strict";

	if($j('.blog_holder.blog_gallery, .blog_holder.blog_chequered').length) {

		qodeResizeBlogGallery($j('.blog_holder_grid_sizer').width());

		var container = $j('.blog_holder.blog_gallery, .blog_holder.blog_chequered');
		container.width(Math.round(container.parent().width()));
		container.isotope({
			itemSelector: 'article',
			resizable: false,
			masonry: {
				columnWidth: '.blog_holder_grid_sizer',
				gutter: '.blog_holder_grid_gutter'
			}
		});

		container.waitForImages(function(){
			container.animate({opacity: "1"}, 300, function() {
				container.isotope().isotope('layout');
			});
		});

		if( container.hasClass('masonry_infinite_scroll')){
			container.infinitescroll({
					navSelector  : '.blog_infinite_scroll_button span',
					nextSelector : '.blog_infinite_scroll_button span a',
					itemSelector : 'article',
					loading: {
						finishedMsg: finished_text,
						msgText  : loading_text
					}
				},
				// call Isotope as a callback
				function( newElements ) {
					container.isotope( 'appended', $j( newElements ) );
					fitVideo();
					fitAudio();
					initFlexSlider();
					qodeResizeBlogGallery($j('.blog_holder_grid_sizer').width());
					setTimeout(function() {
						container.isotope( 'layout');
					}, 300);
				}
			);
		}else if(container.hasClass('masonry_load_more')){
			var i = 1;
			$j('.blog_load_more_button a').off('click tap').on('click tap', function(e)  {
				e.preventDefault();

				var link = $j(this).attr('href');
				var $content = '.masonry_load_more';
				var $anchor = '.blog_load_more_button a';
				var $next_href = $j($anchor).attr('href');
				$j.get(link+'', function(data){
					var $new_content = $j($content, data).wrapInner('').html();
					$next_href = $j($anchor, data).attr('href');
					container.append( $j( $new_content) ).isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
					fitVideo();
					fitAudio();
					initFlexSlider();
					qodeResizeBlogGallery($j('.blog_holder_grid_sizer').width());
					setTimeout(function() {
						container.isotope( 'layout');
					}, 300);

					if($j('.blog_load_more_button span').attr('rel') > i) {
						$j('.blog_load_more_button a').attr('href', $next_href); // Change the next URL
					} else {
						$j('.blog_load_more_button').remove();
					}

					qodeBlogGalleryAnimation();

				});
				i++;
			});

		}

		$j(window).resize(function() {
			qodeResizeBlogGallery($j('.blog_holder_grid_sizer').width());
			container.isotope().isotope('layout');
			container.width(Math.round(container.parent().width()));
		});
	}
}

function qodeResizeBlogMasonryGallery(size) {

    var rectangle_portrait = $j('.blog_holder.masonry_gallery .large-height');
    var rectangle_landscape = $j('.blog_holder.masonry_gallery .large-width');
    var square_big = $j('.blog_holder.masonry_gallery .large-width-height');
    var square_small = $j('.blog_holder.masonry_gallery .default');

    rectangle_portrait.css('height',2*size);
    rectangle_landscape.css('height',size);
    square_big.css('height',2*size);
    if(square_big.width() < 600) {
        square_big.css('height', square_big.width());
    }
    if($window_width < 600) {
        rectangle_portrait.css('height', rectangle_portrait.width());
    }
    square_small.css('height', size);
}

function qodeResizeBlogGallery(size) {

	var element = $j('.blog_holder.blog_chequered .default');
	element.css('height',size);
}

/*
 **	Min height for smaall image blog
 */
function initSmallImageBlogHeight(){
	"use strict";

	if($j('.blog_small_image').length){
		$j('article').each(function() {
			$j(this).find('.post_text_inner').css('min-height', $j(this).find('.post_image').height() - 46); //46 is top and bottom padding
		});
	}
}

/*
**	Init masonry layout for blog masonry shortcode
*/

function initQBlog(){
	"use strict";

	if($j('.q_masonry_blog').length){
		$j('.q_masonry_blog').each(function() {
			var thisItem = $j(this);

			thisItem.waitForImages(function() {
				setTimeout(function() {
					thisItem.isotope({
						itemSelector: 'article',
						resizable: false,
						masonry: {columnWidth: '.q_masonry_blog_grid_sizer', gutter: '.q_masonry_blog_grid_gutter'}
					});
					thisItem.animate({opacity: "1"}, 500);
				}, 400);
			});
		});
	}
}


function qodeBlogCompundMasonryGallery(){

    var blogGallery = $j('.qode_blog_masonry_gallery');
    var sizerWidth = blogGallery.find('.qode_blog_gallery_sizer').outerWidth();
    var size = sizerWidth + 8; //8px is spacing between items

    var resizeMasonryImages = function(){
        sizerWidth = blogGallery.find('.qode_blog_gallery_sizer').outerWidth();
        size = sizerWidth + 8;
        var defaultItem = blogGallery.find('.qode_blog_gallery_item.default');
        var largeHeightItem = blogGallery.find('.qode_blog_img_large_height');
        var largeHeightWidthItem = blogGallery.find('.qode_blog_img_large_height_width');

        defaultItem.css('height', size);
        largeHeightItem.css('height', Math.round(2*size));

        if($window_width > 600){
            largeHeightWidthItem.css('height', Math.round(2*size));
        }else{
            largeHeightWidthItem.css('height', size);
        }
    };

    var initMasonryItems = function(){

        blogGallery.isotope({
            itemSelector: '.qode_blog_gallery_item',
            masonry: {
                columnWidth: '.qode_blog_gallery_sizer',
                gutter: '.qode_blog_gallery_gutter'
            }
        });

    };

    return {
        init : function() {
            if(blogGallery.length) {
                resizeMasonryImages();
                initMasonryItems();

                $j(window).resize(function() {
                    resizeMasonryImages();
                });
            }
        }

    };

}

/*
 **	Init Blog Headlines big text
 */
function qodeBlogHeadlines() {
    "use strict";

    if($j('.blog_headlines').length) {
        var $this = $j('.blog_headlines');

        var showTitles = function () {
            $this.bigtext({
                childSelector: '> article > h2',
	            minfontsize: 20
            });

            $this.find('h2').appear(function () {
                $j(this).addClass('show');
            }, {accX: 0, accY: -100});
        };
        showTitles();

        if( $this.hasClass('blog_infinite_scroll')){
            $this.infinitescroll({
                    navSelector  : '.blog_infinite_scroll_button span',
                    nextSelector : '.blog_infinite_scroll_button span a',
                    itemSelector : 'article',
                    loading: {
                        finishedMsg: finished_text,
                        msgText  : loading_text
                    }
                },
                function() {
                    showTitles();
                }
            );
        }else if($this.hasClass('blog_load_more')){
            var i = 1;
            $j('.blog_load_more_button a').off('click tap').on('click tap', function(e)  {
                e.preventDefault();

                var link = $j(this).attr('href');
                var $content = '.blog_load_more';
                var $anchor = '.blog_load_more_button a';
                var $next_href = $j($anchor).attr('href');
                $j.get(link+'', function(data){
                    var $new_content = $j($content, data).wrapInner('').html();
                    $next_href = $j($anchor, data).attr('href');
                    $this.append( $j( $new_content) );

                    showTitles();

                    if($j('.blog_load_more_button span').attr('rel') > i) {
                        $j('.blog_load_more_button a').attr('href', $next_href); // Change the next URL
                    } else {
                        $j('.blog_load_more_button').remove();
                    }
                });
                i++;
            });

        }
    }
}

/*
**	Init progress bar with icon
*/
var timeOuts = [];
function initProgressBarsIcon(){
	"use strict";

	if($j('.q_progress_bars_icons_holder').length){
		$j('.q_progress_bars_icons_holder').each(function() {
			var $this = $j(this);
			var axis = 200;
			if(typeof $this.data('element-appearance') !== 'undefined' && $this.data('element-appearance') !== false) {
				axis = $this.data('element-appearance');
			}
			$this.appear(function() {
				$this.find('.q_progress_bars_icons').css('opacity','1');
				$this.find('.q_progress_bars_icons').each(function() {
					var number = $j(this).find('.q_progress_bars_icons_inner').data('number');
					var size = $j(this).find('.q_progress_bars_icons_inner').data('size');

					if(size !== ""){
						$j(this).find('.q_progress_bars_icons_inner.custom_size .bar').css({'width': size+'px','height':size+'px'});
						$j(this).find('.q_progress_bars_icons_inner.custom_size .bar .fa-stack').css({'font-size': size/2+'px'});
					}

					var bars = $j(this).find('.bar');

					bars.each(function(i){
						if(i < number){
							var time = (i + 1)*150;
							timeOuts[i] = setTimeout(function(){
								$j(bars[i]).addClass('active');
							},time);
						}
					});
				});
			},{accX: 0, accY: -axis});
		});
	}
}

(function( $ ){
	"use strict";

	var $window = $(window);
    $.fn.masonryParallax = function(speedFactor, outerHeight, startPosition) {
        var $this = $(this);
        var getHeight;
        var firstTop;
		var startPositionAdd = 0;

        //get the starting position of element to have parallax applied to it
		firstTop = $this.offset().top;

		//get the height element
        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }

		//get type so elements could take it's initial position
		if(startPosition != 0){
			startPositionAdd = startPosition;
		}

        // setup defaults if arguments aren't specified
        if (arguments.length < 1 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 2 || outerHeight === null) outerHeight = true;

        // function to be called whenever the window is scrolled or resized
		var top = $this.offset().top;
		var height = getHeight($this);
		function update(){
			// Check if totally above or totally below viewport
			if (top + height < $scroll || top > $scroll + $window_height) {
				return;
			}
			$this.css('transform', 'translate3d(0px, '+ (Math.round((firstTop - height - $scroll) * speedFactor + startPositionAdd)) +'px, 0px)');
        }

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);

/**
 * Masonry gallery, init masonry and resize pictures in grid
 */
function initMasonryGallery(){
    "use strict";

    resizeMasonryGallery($j('.grid-sizer').width());

    if($j('.masonry_gallery_holder').length){

        $j('.masonry_gallery_holder').each(function(){
            var $this = $j(this);
            $this.waitForImages(function(){
                $this.animate({opacity:1});
                $this.isotope({
                    itemSelector: '.masonry_gallery_item',
                    masonry: {
                        columnWidth: '.grid-sizer'
                    }
                });

				$this.find('.masonry_gallery_item.parallax_item').each(function(i){
					$j(this).masonryParallax($this.data('parallax_item_speed'), true, $this.data('parallax_item_offset'));

				});
            });
        });
        $j(window).resize(function(){
            resizeMasonryGallery($j('.grid-sizer').width());
            $j('.masonry_gallery_holder').isotope('reloadItems');
        });
    }
}

function resizeMasonryGallery(size){
    "use strict";

    var rectangle_portrait = $j('.masonry_gallery_holder .rectangle_portrait');
    var rectangle_landscape = $j('.masonry_gallery_holder .rectangle_landscape');
    var square_big = $j('.masonry_gallery_holder .square_big');
    var square_small = $j('.masonry_gallery_holder .square_small');

    rectangle_portrait.css('height', 2*size);
    if (window.innerWidth < 600) {
        rectangle_landscape.css('height', size/2);
    }
    else {
        rectangle_landscape.css('height', size);
    }
    square_big.css('height', 2*size);
    if (window.innerWidth < 600) {
        square_big.css('height', square_big.width()+20);//20 is padding arround image holder
    }
    square_small.css('height', size);
}

/*
**	Init more facts shortcode
*/
function initMoreFacts(){
    "use strict";
    if($j('.more_facts_holder').length){
        $j('.more_facts_holder').each(function(){
            var $this = $j(this);
            var $more_label = 'More Facts';
            if($j(this).find('.more_facts_button').data('morefacts') !== ""){
                $more_label = $j(this).find('.more_facts_button').data('morefacts');
            }
            var $less_label = 'Less Facts';
            if($j(this).find('.more_facts_button').data('lessfacts') !== ""){
                $less_label = $j(this).find('.more_facts_button').data('lessfacts');
            }
            $this.find('.more_facts_button').on("mouseenter",function(){
		           $j(this).css('color', $j(this).data('hovercolor'));
            }).on("mouseleave",function() {
                if($this.find('.more_facts_outer').height() == 0){
		            $j(this).css('color', $j(this).data('color'));
                }
            });
            var expandable_content_top_padding = 70; // this value is set as default top padding inside css file
            if($this.find('.more_facts_inner').data('expandable_content_top_padding') !== ""){
                expandable_content_top_padding = $this.find('.more_facts_inner').data('expandable_content_top_padding');
                $this.find('.more_facts_inner').css({'padding-top':expandable_content_top_padding});
            }
            var height = 0;
            var speed = 600;
            $this.find('.more_facts_button').on('click', function(){
                height = $this.find('.more_facts_inner').height() + expandable_content_top_padding;
                if(height > 0 && height < 601){
                    speed = 800;
                } else if(height > 600 && height < 1201){
                    speed = 1500;
                } else{
                    speed = 2100;
                }
                if(!$this.hasClass('more_fact_opened')){
                    $this.addClass('more_fact_opened');
                    $this.find('.more_facts_fake_arrow').fadeIn(speed);
                    $this.find('.more_facts_outer').stop().animate({'height': height}, speed, function() {
                        if($j('.parallax_section_holder').length) {
                            initParallax();
                        }
                    });
                    $j(this).find('.more_facts_button_text').text($less_label);
                    $j(this).find('.more_facts_button_arrow').addClass('rotate_arrow');
                } else {
                    $this.find('.more_facts_fake_arrow').fadeOut(speed);
                    $this.find('.more_facts_outer').stop().animate({'height': '0px'}, speed,function(){
                        if(!$this.find('.more_facts_button').is(":hover")){$this.find('.more_facts_button').css('color',$this.find('.more_facts_button').data('color'));}
                        $this.removeClass('more_fact_opened');
                        if($j('.parallax_section_holder').length) {
                            initParallax();
                        }
                    });
                    $j(this).find('.more_facts_button_text').text($more_label);
                    $j(this).find('.more_facts_button_arrow').removeClass('rotate_arrow');
                }
            });
        });
    }
}

/*
**	Replace plceholder
*/
function placeholderReplace(){
	"use strict";

	$j('#contact-form [placeholder]').focus(function() {
		var input = $j(this);
		if (input.val() === input.attr('placeholder')) {
			if (this.originalType) {
				this.type = this.originalType;
				delete this.originalType;
			}
			input.val('');
			input.removeClass('placeholder');
		}
	}).blur(function() {
		var input = $j(this);
		if (input.val() === '') {
			if (this.type === 'password') {
				this.originalType = this.type;
				this.type = 'text';
			}
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}).blur();

	$j('#contact-form [placeholder]').parents('form').submit(function () {
		$j(this).find('[placeholder]').each(function () {
			var input = $j(this);
			if (input.val() === input.attr('placeholder')) {
				input.val('');
			}
		});
	});
}

function totop_button(a) {
	"use strict";

	var b = $j("#back_to_top");
	b.removeClass("off on");
	if (a === "on") { b.addClass("on"); } else { b.addClass("off"); }
}

function backButtonShowHide(){
	"use strict";

	$j(window).scroll(function () {
		var b = $j(this).scrollTop();
		var c = $j(this).height();
		var d;
		if (b > 0) { d = b + c / 2; } else { d = 1; }
		if (d < 1e3) { totop_button("off"); } else { totop_button("on"); }
	});
}

function backToTop(){
	"use strict";

	$j(document).on('click','#back_to_top',function(e){
		e.preventDefault();

		$j('body,html').animate({scrollTop: 0}, $j(window).scrollTop()/3, 'linear');
	});
}

/*
 **	Init steps
 */
function initSteps(){
    "use strict";
    if($j('.q_steps_holder').length){
        $j('.q_steps_holder').each(function(){
            $j(this).appear(function() {
                $j(this).addClass('show');
            },{accX: 0, accY: -200});
        });
    }
}

/*
 **	Init message height
 */
function initMessageHeight(){
    "use strict";
    if($j('.q_message.with_icon').length){
        $j('.q_message.with_icon').each(function(){
			if($j(this).find('.message_text_holder').height() > $j(this).find('.q_message_icon_holder').height()) {
				$j(this).find('.q_message_icon_holder').height($j(this).find('.message_text').height());
			} else {
				$j(this).find('.message_text').height($j(this).find('.q_message_icon_holder').height());
			}
        });
    }
}

/**
 * Init image hover
 */
function initImageHover() {
    "use strict";
	if($j('.image_hover').length){
		$j('.image_hover').each(function(){
			$j(this).appear(function() {

                var default_visible_time = 300;
                var transition_delay = $j(this).attr('data-transition-delay');
                var real_transition_delay = default_visible_time + parseFloat(transition_delay);
                var object = $j(this);

                //wait for other hovers to complete
                setTimeout(function() {
                    object.addClass('show');
                }, parseFloat(transition_delay));

                //hold that image a little, than remove class
                setTimeout(function() {
                    object.removeClass('show');
                }, real_transition_delay);

			},{accX: 0, accY: -200});
		});
	}
}

/*
 * Initializes vertical progress bars
 */
function initProgressBarsVertical(){
	"use strict";

	if($j('.q_progress_bars_vertical').length){
		$j('.q_progress_bars_vertical').each(function() {
			$j(this).appear(function() {
				initToCounterVerticalProgressBar($j(this));
					var percentage = $j(this).find('.progress_content').data('percentage');
					$j(this).find('.progress_content').css('height', '0%');
					$j(this).find('.progress_content').animate({
						height: percentage+'%'
					}, 1500);
			},{accX: 0, accY: -200});
		});
	}
}

/*
 * Initializes vertical progress bar count to max value
 */
function initToCounterVerticalProgressBar($this){
	"use strict";

	if($this.find('.progress_number span').length){
		$this.find('.progress_number span').each(function() {
			var $max = parseFloat($j(this).text());
			$j(this).countTo({
				from: 0,
				to: $max,
				speed: 1500,
				refreshInterval: 50
			});
		});
	}
}

/*
*	Check if there is anchor on load and scroll to it
*/
function checkAnchorOnLoad(){
    "use strict";

    var hash = window.location.hash;
    var newHash = encodeURI(window.location.hash.split('#')[1]);
    var paspartuScrollAdd = $j('body').hasClass('paspartu_on_top_fixed') ? $window_width*paspartu_width : 0;
    var scrollToAmount;
    var top_header_height;
    if(hash !== "" && $j('[data-q_id="#'+newHash+'"]').length > 0){
        if($j('header.page_header').hasClass('fixed') && !$j('body').hasClass('vertical_menu_enabled')){
            if($j('header.page_header').hasClass('scroll_top')){
                top_header_height = header_top_height;
            }else{
                top_header_height = 0;
            }

            if(!$j('header.page_header').hasClass('transparent') || $j('header.page_header').hasClass('scrolled_not_transparent')) {
                if(header_height - ($j('[data-q_id="' + hash + '"]').offset().top + top_header_height)/4 >= min_header_height_scroll){
                    var diff_of_header_and_section = $j('[data-q_id="' + hash + '"]').offset().top -  header_height - paspartuScrollAdd;
                    scrollToAmount = diff_of_header_and_section + (diff_of_header_and_section/4) + (diff_of_header_and_section/16) + (diff_of_header_and_section/64) + 1; //several times od dividing to minimize the error, because fixed header is shrinking while scroll, 1 is just to ensure
                }else{
                	if($j('header.page_header').hasClass('centered_logo')){
                		scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - min_header_height_scroll - logo_height - 30 - paspartuScrollAdd; //30 is top/bottom margin of logo
                	} else {
                		scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - min_header_height_scroll - paspartuScrollAdd;
                	}
                }
            }else{
                scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;
            }

		} else if($j('header.page_header').hasClass('fixed_top_header') && !$j('body').hasClass('vertical_menu_enabled')){
			if(!$j('header.page_header').hasClass('transparent') || $j('header.page_header').hasClass('scrolled_not_transparent')){
				scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top -  header_top_height - paspartuScrollAdd;
			}else{
				scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;
			}

        } else if($j('header.page_header').hasClass('fixed_hiding') && !$j('body').hasClass('vertical_menu_enabled')){
            if(!$j('header.page_header').hasClass('transparent') || $j('header.page_header').hasClass('scrolled_not_transparent')) {
                if ($j('[data-q_id="' + hash + '"]').offset().top - (header_height + logo_height / 2 + 40) <= scroll_amount_for_fixed_hiding) {
                    scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - header_height - logo_height / 2 - 40 - paspartuScrollAdd; //40 is top/bottom margin of logo
                } else {
                    scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - min_header_height_fixed_hidden - 40 - paspartuScrollAdd; //40 is top/bottom margin of logo
                }
            }else{
                scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;
            }
        }else if($j('header.page_header').hasClass('stick') || $j('header.page_header').hasClass('stick_with_left_right_menu') && !$j('body').hasClass('vertical_menu_enabled')) {
            if(!$j('header.page_header').hasClass('transparent') || $j('header.page_header').hasClass('scrolled_not_transparent')) {
                if (sticky_amount >= $j('[data-q_id="' + hash + '"]').offset().top) {
                    scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top + 1 - paspartuScrollAdd; // 1 is to show sticky menu
                } else {
                    scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - min_header_height_sticky - paspartuScrollAdd;
                }
            }else{
                scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;
            }
        } else{
            scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;
        }
        $j('html, body').animate({
            scrollTop: Math.round(scrollToAmount)
        }, 1500, function() {});
    }

	//remove active state on anchors if section is not visible
	$j(".main_menu a, .vertical_menu a, .mobile_menu a").each(function(){
        var i = $j(this).prop("hash");
		if(i !== "" && ($j('[data-q_id="' + i + '"]').length > 0) && ($j('[data-q_id="' + i + '"]').offset().top >= $window_height) && $scroll === 0){
			$j(this).parent().removeClass('active current-menu-item');
			$j(this).removeClass('current');
		}
    });
}

/*
*	Check active state of anchor links on scroll
*/

function changeActiveState(id){
    "use strict";

	if($j(".main_menu a[href*='#']").length) {
		$j('.main_menu a').parent().removeClass('active');
	}

    $j(".main_menu a").each(function(){
        var i = $j(this).prop("hash");
        if(i === id){
            if($j(this).closest('.second').length === 0){
                $j(this).parent().addClass('active');
            }else{
                $j(this).closest('.second').parent().addClass('active');
            }
            $j('.main_menu a').removeClass('current');
            $j(this).addClass('current');
        }
    });

	if($j(".vertical_menu a[href*='#']").length) {
		$j('.vertical_menu a').parent().removeClass('active');
	}

    $j(".vertical_menu a").each(function(){
        var i = $j(this).prop("hash");
        if(i === id){
            if($j(this).closest('.second').length === 0){
                $j(this).parent().addClass('active');
            }else{
                $j(this).closest('.second').parent().addClass('active');
            }
            $j('.vertical_menu a').removeClass('current');
            $j(this).addClass('current');
        }
    });

	if($j(".mobile_menu a[href*='#']").length) {
		$j('.mobile_menu a').parent().removeClass('active');
	}

    $j(".mobile_menu a").each(function(){
        var i = $j(this).prop("hash");
        if(i === id){
            if($j(this).closest('.sub_menu').length === 0){
                $j(this).parent().addClass('active');
            }else{
                $j(this).closest('.sub_menu').parent().addClass('active');
            }
            $j('.mobile_menu a').removeClass('current');
            $j(this).addClass('current');
        }
    });
}

/*
*	Check active state of anchor links on scroll
*/
function checkAnchorOnScroll(){
    "use strict";

    if($j('[data-q_id]').length && !$j('header.page_header').hasClass('regular')){
        $j('[data-q_id]').waypoint( function(direction) {
			if(direction === 'down') {
                changeActiveState($j(this).data("q_id"));
            }
        }, { offset: '50%' });

        $j('[data-q_id]').waypoint( function(direction) {
            if(direction === 'up') {
                changeActiveState($j(this).data("q_id"));
            }
        }, { offset: function(){
            return -($j(this).outerHeight() - 150);
        } });
    }
}

/*
*	Init scroll to section link if that link has hash value
*/
function initHashClick(){
    "use strict";

    var $doc = $j('html, body');
    var paspartuScrollAdd = $j('body').hasClass('paspartu_on_top_fixed') ? $window_width*paspartu_width : 0;
    var scrollToAmount;
    $j(document).on( "click", ".main_menu a, .vertical_menu a, .qbutton:not(.contact_form_button, .qode-archive-submit-button, .qode-listing-archive-load-more, .qode-rating-form-trigger, .qode-lms-actions-buttons, .qode-tours-search-submit), .anchor, .widget li.anchor a", function(){
        var $this = $j(this);
        var hash = $j(this).prop("hash");
        var top_header_height;
        if((hash !== "" && $j(this).attr('href').split('#')[0] === "") || (hash !== "" && $j(this).attr('href').split('#')[0] !== "" && hash === window.location.hash) || (hash !== "" && $j(this).attr('href').split('#')[0] === window.location.href.split('#')[0])){ //in third condition 'hash !== ""' stays to prevent reload of page when link is active and ajax enabled
            if($j('header.page_header').hasClass('fixed') && !$j('body').hasClass('vertical_menu_enabled')){
                if($j('header.page_header').hasClass('scroll_top')){
                    top_header_height = header_top_height;
                }else{
                    top_header_height = 0;
                }

                if(!$j('header.page_header').hasClass('transparent') || $j('header.page_header').hasClass('scrolled_not_transparent')) {
                    if (header_height - ($j('[data-q_id="' + hash + '"]').offset().top + top_header_height) / 4 >= min_header_height_scroll) {
                        var diff_of_header_and_section = $j('[data-q_id="' + hash + '"]').offset().top - header_height - paspartuScrollAdd;
                        scrollToAmount = diff_of_header_and_section + (diff_of_header_and_section / 4) + (diff_of_header_and_section / 16) + (diff_of_header_and_section / 64) + 1; //several times od dividing to minimize the error, because fixed header is shrinking while scroll, 1 is just to ensure
                    } else {
                    	if($j('header.page_header').hasClass('centered_logo')){
                    		scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - min_header_height_scroll - logo_height - paspartuScrollAdd - 30; //30 is top/bottom margin of logo
                    	} else {
                    		scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - min_header_height_scroll - paspartuScrollAdd;
                    	}
                    }
                }else{
					scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;

                }
			} else if($j('header.page_header').hasClass('fixed_top_header') && !$j('body').hasClass('vertical_menu_enabled')){
				if(!$j('header.page_header').hasClass('transparent') || $j('header.page_header').hasClass('scrolled_not_transparent')){
					scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top -  header_top_height - paspartuScrollAdd;
				}else{
					scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;
				}
			} else if($j('header.page_header').hasClass('fixed_hiding') && !$j('body').hasClass('vertical_menu_enabled')){
                if(!$j('header.page_header').hasClass('transparent') || $j('header.page_header').hasClass('scrolled_not_transparent')) {
                    if ($j('[data-q_id="' + hash + '"]').offset().top - (header_height + logo_height / 2 + 40) <= scroll_amount_for_fixed_hiding) {
                        scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - header_height - logo_height / 2 - 40 - paspartuScrollAdd; //40 is top/bottom margin of logo
                    } else {
                        scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - min_header_height_fixed_hidden - 40 - paspartuScrollAdd; //40 is top/bottom margin of logo
                    }
                }else{
                    scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;
                }
            }else if($j('header.page_header').hasClass('stick') || $j('header.page_header').hasClass('stick_with_left_right_menu') && !$j('body').hasClass('vertical_menu_enabled')) {
                if(!$j('header.page_header').hasClass('transparent') || $j('header.page_header').hasClass('scrolled_not_transparent')) {
                    if (sticky_amount >= $j('[data-q_id="' + hash + '"]').offset().top) {
                        scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top + 2 - paspartuScrollAdd; // 2 is to show sticky menu
                    } else {
                        scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - min_header_height_sticky - paspartuScrollAdd;
                    }
                }else{
                    scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;
                }
            } else{
                scrollToAmount = $j('[data-q_id="' + hash + '"]').offset().top - paspartuScrollAdd;
            }


            if($j('[data-q_id="'+hash+'"]').length > 0){
                $doc.stop().animate({
                    scrollTop: Math.round(scrollToAmount)
                }, 1500, function() {
                    anchorActiveState($this);
                });

            }

            if(history.pushState) {
                history.pushState(null, null, hash);
            }
            return false;
        }

    });
    $j(document).on( "click", ".mobile_menu a", function(){
        var $this = $j(this);
        var hash = $j(this).prop("hash");
        if((hash !== "" && $j(this).attr('href').split('#')[0] === "") || (hash !== "" && $j(this).attr('href').split('#')[0] !== "" && hash === window.location.hash) || (hash !== "" && $j(this).attr('href').split('#')[0] === window.location.href.split('#')[0])){ //in third condition 'hash !== ""' stays to prevent reload of page when link is active and ajax enabled

            if($j('[data-q_id="'+hash+'"]').length > 0){
                $doc.animate({
                    scrollTop: Math.round($j('[data-q_id="'+hash+'"]').offset().top - $j('.mobile_menu').height())
                }, 500,function(){
                    anchorActiveState($this);
                });

            }
            if(history.pushState) {
                history.pushState(null, null, hash);
            }
            return false;
        }

    });
}

/*
**	Add class to items in last row in clients shortcode
*/
function countClientsPerRow(){
	"use strict";

	if($j('.qode_clients').length){

		$j('.qode_clients').each(function() {
			var $clients = $j(this);
			var qode_clients_height = $clients.height();
			var qode_clients_width = $clients.width();
			var maxHeightClient;
			var clientWidth = $clients.find('.qode_client_holder').width();
			var countClient = $clients.find('.qode_client_holder').length;
			$clients.find('.qode_client_holder').each(function() {
				maxHeightClient = maxHeightClient > $j(this).height() ? maxHeightClient : $j(this).height();
			});
			maxHeightClient = maxHeightClient + 35; //margin for client is 35
			var numberOfRows  = Math.ceil(qode_clients_height / maxHeightClient);
			var numberOfClientsPerRow =  Math.ceil(qode_clients_width/clientWidth);
			var numberOffullRows = Math.floor(countClient / numberOfClientsPerRow);
			var numberOfClientsInLastRow = countClient - (numberOfClientsPerRow * numberOffullRows);
			if(numberOfClientsInLastRow === 0){
				numberOfClientsInLastRow = numberOfClientsPerRow;
			}
			$clients.find( ".qode_client_holder" ).removeClass('border-bottom-none');
			var item_start_from = countClient - numberOfClientsInLastRow - 1;
			$clients.find( ".qode_client_holder:gt("+ item_start_from +")" ).addClass('border-bottom-none');
		});
	}
}

/*
**	Calculate height for animated text icon shortcode
*/
function animatedTextIconHeight(){
	"use strict";

	if($j('.animated_icons_with_text').length){
		var $icons = $j('.animated_icons_with_text');
		var maxHeight;

		$icons.find('.animated_text p').each(function() {
			maxHeight = maxHeight > $j(this).height() ? maxHeight : $j(this).height();
		});

		if(maxHeight < 155) {
			maxHeight = 155;

		}
		$icons.find('.animated_icon_with_text_inner').height(maxHeight);
	}
}

/*
**	Add class to items in last row in animated text icon shortcode
*/
function countAnimatedTextIconPerRow(){
	"use strict";

	if($j('.animated_icons_with_text').length){
		$j('.animated_icons_with_text').each(function() {
			var $icons = $j(this);
			var qode_icons_height = $icons.height();
			var qode_icons_width = $icons.width();
			var maxHeightIcons;
			var iconWidth = $icons.find('.animated_icon_with_text_holder').width() + 1; // 1px because safari round on smaller number
			var countIcons = $icons.find('.animated_icon_with_text_holder').length;
			$icons.find('.animated_icon_with_text_holder').each(function() {
				maxHeightIcons = maxHeightIcons > $j(this).height() ? maxHeightIcons : $j(this).height();
			});
			maxHeightIcons = maxHeightIcons + 30; //margin for client is 30
			var numberOfIconsPerRow =  Math.ceil((qode_icons_width/iconWidth));
			var numberOffullRows = Math.floor(countIcons / numberOfIconsPerRow);
			var numberOfIconsInLastRow = countIcons - (numberOfIconsPerRow * numberOffullRows);
			if(numberOfIconsInLastRow === 0){
				numberOfIconsInLastRow = numberOfIconsPerRow;
			}
			$icons.find( ".animated_icon_with_text_holder" ).removeClass('border-bottom-none');
			var item_start_from = countIcons - numberOfIconsInLastRow - 1;
			$icons.find( ".animated_icon_with_text_holder:gt("+ item_start_from +")" ).addClass('border-bottom-none');
		});
	}
}


/*
*	Set active state in maim menu on anchor click
*/

function anchorActiveState(me){
	if(me.closest('.main_menu').length > 0){
		$j('.main_menu a').parent().removeClass('active');
	}

    if(me.closest('.vertical_menu').length > 0){
        $j('.vertical_menu a').parent().removeClass('active');
    }

	if(me.closest('.second').length === 0){
		me.parent().addClass('active');
	}else{
		me.closest('.second').parent().addClass('active');
	}
	if(me.closest('.mobile_menu').length > 0){
		$j('.mobile_menu a').parent().removeClass('active');
		me.parent().addClass('active');
	}

	$j('.mobile_menu a, .main_menu a, .vertical_menu a').removeClass('current');
	me.addClass('current');
}

/*
**	Video background initialization
*/
function initVideoBackground(){
	"use strict";

	$j('.video-wrap .video').mediaelementplayer({
		enableKeyboard: false,
		iPadUseNativeControls: false,
		pauseOtherPlayers: false,
		// force iPhone's native controls
		iPhoneUseNativeControls: false,
		// force Android's native controls
		AndroidUseNativeControls: false
	});

	//mobile check
		if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
			initVideoBackgroundSize();
			$j('.mobile-video-image').show();
			$j('.video-wrap').remove();
		}
}

/*
**	Calculate video background size
*/
function initVideoBackgroundSize(){
	"use strict";

	$j('.section .video-wrap').each(function(i){

		var $sectionWidth = $j(this).closest('.section').outerWidth();
		$j(this).width($sectionWidth);

		var $sectionHeight = $j(this).closest('.section').outerHeight();
		min_w = vid_ratio * ($sectionHeight+20);
		$j(this).height($sectionHeight);

		var scale_h = $sectionWidth / video_width_original;
		var scale_v = ($sectionHeight - header_height) / video_height_original;
		var scale =  scale_v;
		if (scale_h > scale_v)
			scale =  scale_h;
		if (scale * video_width_original < min_w) {scale = min_w / video_width_original;}

		$j(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * video_width_original +2));
		$j(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * video_height_original +2));
		$j(this).scrollLeft(($j(this).find('video').width() - $sectionWidth) / 2);
		$j(this).find('.mejs-overlay, .mejs-poster').scrollTop(($j(this).find('video').height() - ($sectionHeight)) / 2);
		$j(this).scrollTop(($j(this).find('video').height() - ($sectionHeight)) / 2);

		$j(this).css('opacity', 1);
		$j('.no-touch .section .mobile-video-image ').css('display', 'none');
	});

	$j('.carousel .item .video .video-wrap').each(function(i){

		var $slideWidth = $j(window).width();
		$j(this).width($slideWidth);

		var mob_header = $j(window).width() < 1000 ? $j('header.page_header').height() - 6 : 0; // 6 is because of the display: inline-block
		var $slideHeight = $j(this).closest('.carousel.slide').height() - mob_header;

		min_w = vid_ratio * ($slideHeight+20);
		$j(this).height($slideHeight);

		var scale_h = $slideWidth / video_width_original;
		var scale_v = ($slideHeight - header_height) / video_height_original;
		var scale =  scale_v;
		if (scale_h > scale_v)
			scale =  scale_h;
		if (scale * video_width_original < min_w) {scale = min_w / video_width_original;}

		$j(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * video_width_original +2));
		$j(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * video_height_original +2));
		$j(this).scrollLeft(($j(this).find('video').width() - $slideWidth) / 2);
		$j(this).find('.mejs-overlay, .mejs-poster').scrollTop(($j(this).find('video').height() - ($slideHeight)) / 2);
		$j(this).scrollTop(($j(this).find('video').height() - ($slideHeight)) / 2);
	});

	$j('.portfolio_single .video .video-wrap, .blog_holder .video .video-wrap').each(function(i){

		var $this = $j(this);

		var $videoWidth = $j(this).closest('.video').outerWidth();
		$j(this).width($videoWidth);
		var $videoHeight = ($videoWidth*9)/16;

		if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
			$this.parent().width($videoWidth);
			$this.parent().height($videoHeight);
		}

		min_w = vid_ratio * ($videoHeight+20);
		$j(this).height($videoHeight);

		var scale_h = $videoWidth / video_width_original;
		var scale_v = ($videoHeight - header_height) / video_height_original;
		var scale =  scale_v;
		if (scale_h > scale_v)
			scale =  scale_h;
		if (scale * video_width_original < min_w) {scale = min_w / video_width_original;}

		$j(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * video_width_original +2));
		$j(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * video_height_original +2));
		$j(this).scrollLeft(($j(this).find('video').width() - $videoWidth) / 2);
		$j(this).find('.mejs-overlay, .mejs-poster').scrollTop(($j(this).find('video').height() - ($videoHeight)) / 2);
		$j(this).scrollTop(($j(this).find('video').height() - ($videoHeight)) / 2);
	});

}

/*
**	Icon With Text animation effect
*/
function initIconWithTextAnimation(){
	"use strict";
	if($j('.q_icon_animation').length > 0 && $j('.no_animation_on_touch').length === 0){
		$j('.q_icon_animation').each(function(){
			$j(this).appear(function() {
				$j(this).addClass('q_show_animation');
			},{accX: 0, accY: -200});
		});
	}
}

/*
**	Add class on body if browser is Safari
*/
function initCheckSafariBrowser(){
	"use strict";

	if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
		$j('body').addClass('safari_browser');
	}
}

/*
**	Initialize Qode search form
*/
function initSearchButton(){

	if($j('.search_slides_from_window_top').length){
		$j('.search_slides_from_window_top').on('click', function(e){
			e.preventDefault();

			if($j('html').hasClass('touch')){
				if ($j('.qode_search_form').height() == "0") {
					$j('.qode_search_form input[type="text"]').onfocus = function () {
						window.scrollTo(0, 0);
						document.body.scrollTop = 0;
					};
					$j('.qode_search_form input[type="text"]').onclick = function () {
						window.scrollTo(0, 0);
						document.body.scrollTop = 0;
					};
					$j('.header_top_bottom_holder').css('top','50px');
					$j('.qode_search_form').css('height','50px');
					$j('.content_inner').css('margin-top','50px');
					if($scroll < 34){ $j('header.page_header').css('top','0'); }
				} else {
					$j('.qode_search_form').css('height','0');
					$j('.header_top_bottom_holder').css('top','0');
					$j('.content_inner').css('margin-top','0');
					if($scroll < 34){ $j('header.page_header').css('top',-$scroll);}
				}

				$j(window).scroll(function() {
					if ($j('.qode_search_form').height() != "0" && $scroll > 50) {
						$j('.qode_search_form').css('height','0');
						$j('.header_top_bottom_holder').css('top','0');
						$j('.content_inner').css('margin-top','0');
					}
				});

				$j('.qode_search_close').on('click', function(e){
					e.preventDefault();
					$j('.qode_search_form').css('height','0');
					$j('.header_top_bottom_holder').css('top','0');
					$j('.content_inner').css('margin-top','0');
					if($scroll < 34){ $j('header.page_header').css('top',-$scroll);}
				});

			} else {
				if($j('.title').hasClass('has_fixed_background')){
					var yPos = parseInt($j('.title.has_fixed_background').css('backgroundPosition').split(" ")[1]);
				}else {
					var yPos = 0;
				}
				if ($j('.qode_search_form').height() == "0") {
					$j('.qode_search_form input[type="text"]').focus();
					$j('.header_top_bottom_holder').stop().animate({top:"50px"},150);
					$j('.qode_search_form').stop().animate({height:"50px"},150);
					$j('.content_inner').stop().animate({marginTop:"50px"},150);
					if($scroll < 34){ $j('header.page_header').stop().animate({top:0},150); }
					$j('.title.has_fixed_background').animate({
						'background-position-y': (yPos + 50)+'px'
					}, 150);
				} else {
					$j('.qode_search_form').stop().animate({height:"0"},150);
					$j('.header_top_bottom_holder').stop().animate({top:"0px"},150);
					$j('.content_inner').stop().animate({marginTop:"0"},150);
					if($scroll < 34){ $j('header.page_header').stop().animate({top:-$scroll},150);}
					$j('.title.has_fixed_background').animate({
						'background-position-y': (yPos - 50)+'px'
					}, 150);
				}

				$j(window).scroll(function() {
					if ($j('.qode_search_form').height() != "0" && $scroll > 50) {
						$j('.qode_search_form').stop().animate({height:"0"},150);
						$j('.header_top_bottom_holder').stop().animate({top:"0px"},150);
						$j('.content_inner').stop().animate({marginTop:"0"},150);
						$j('.title.has_fixed_background').css('backgroundPosition', 'center '+(yPos)+'px');
					}
				});

				$j('.qode_search_close').on('click', function(e){
					e.preventDefault();
					$j('.qode_search_form').stop().animate({height:"0"},150);
					$j('.content_inner').stop().animate({marginTop:"0"},150);
					$j('.header_top_bottom_holder').stop().animate({top:"0px"},150);
					if($scroll < 34){ $j('header.page_header').stop().animate({top:-$scroll},150);}
					$j('.title.has_fixed_background').animate({
						'background-position-y': (yPos)+'px'
					}, 150);
				});
			}
		});
	}

	//search type - search_slides_from_header_bottom
    if($j('.search_slides_from_header_bottom').length){

        $j('.search_slides_from_header_bottom').on('click', function(e){

            e.preventDefault();

            if($j('.qode_search_form_2').hasClass('animated')) {
                $j('.qode_search_form_2').removeClass('animated');
                $j('.qode_search_form_2').css('bottom','0');
            } else {
                $j('.qode_search_form input[type="text"]').focus();
                $j('.qode_search_form_2').addClass('animated');
                var search_form_height = $j('.qode_search_form_2').height();
                $j('.qode_search_form_2').css('bottom',-search_form_height);

            }

            $j('.qode_search_form_2').addClass('disabled');
            $j('.qode_search_form_2 input[type="submit"]').attr('disabled','disabled');
            if(($j('.qode_search_form_2 .qode_search_field').val() !== '') && ($j('.qode_search_form_2 .qode_search_field').val() !== ' ')) {
                    $j('.qode_search_form_2 input[type="submit"]').removeAttr('disabled');
                    $j('.qode_search_form_2').removeClass('disabled');
                }
                else {
                    $j('.qode_search_form_2').addClass('disabled');
                    $j('.qode_search_form_2 input[type="submit"]').attr('disabled','disabled');
                }

            $j('.qode_search_form_2 .qode_search_field').keyup(function() {
                if(($j(this).val() !== '') && ($j(this).val() != ' ')) {
                    $j('.qode_search_form_2 input[type="submit"]').removeAttr('disabled');
                    $j('.qode_search_form_2').removeClass('disabled');
                }
                else {
                    $j('.qode_search_form_2 input[type="submit"]').attr('disabled','disabled');
                    $j('.qode_search_form_2').addClass('disabled');
                }
            });


            $j('.content, footer').on('click', function(e){
                    $j('.qode_search_form_2').removeClass('animated');
                    $j('.qode_search_form_2').css('bottom','0');
            });

        });
    }

    //search type - search covers header
    if($j('.search_covers_header').length){

        $j('.search_covers_header').on('click', function(e){

            e.preventDefault();
            if($j(".search_covers_only_bottom").length){
                var headerHeight = $j('.header_bottom').height();
            }
            else{
                if($j(".fixed_top_header").length){
                    var headerHeight = $j('.top_header').height();
                }else{
                    var headerHeight = $j('.header_top_bottom_holder').height();
                }
            }

			$j('.qode_search_form_3 .form_holder_outer').height(headerHeight);

            if($j(".search_covers_only_bottom").length){
                $j('.qode_search_form_3').css('bottom',0);
                $j('.qode_search_form_3').css('top','auto');
            }
			$j('.qode_search_form_3').stop(true).fadeIn(600,'easeOutExpo');
			$j('.qode_search_form_3 input[type="text"]').focus();


			$j(window).scroll(function() {
                if($j(".search_covers_only_bottom").length){
                    var headerHeight = $j('.header_bottom').height();
                }
                else{
                    if($j(".fixed_top_header").length){
                        var headerHeight = $j('.top_header').height();
                    }else{
                        var headerHeight = $j('.header_top_bottom_holder').height();
                    }
                }
				$j('.qode_search_form_3 .form_holder_outer').height(headerHeight);
			});

			$j('.qode_search_close, .content, footer').on('click', function(e){
					$j('.qode_search_form_3').stop(true).fadeOut(450,'easeOutExpo');
			});

			$j('.qode_search_form_3').blur(function(e){
					$j('.qode_search_form_3').stop(true).fadeOut(450,'easeOutExpo');
			});
            });
    }

//search type - fullscreen search
    if($j('.fullscreen_search').length){
		//search type Circle Appear
		if($j(".fullscreen_search_holder.from_circle").length){
			$j('.fullscreen_search').on('click',function(e){
				e.preventDefault();
				if($j('.fullscreen_search_overlay').hasClass('animate')){
					$j('.fullscreen_search_overlay').removeClass('animate');
					$j('.fullscreen_search_holder').css('opacity','0');
					$j('.fullscreen_search_close').css('opacity','0');
					$j('.fullscreen_search_close').css('visibility','hidden');
					$j('.fullscreen_search').css('opacity','1');
					$j('.fullscreen_search_holder').css('display','none');
				} else {
					$j('.fullscreen_search_overlay').addClass('animate');
					$j('.fullscreen_search_holder').css('display','block');
					setTimeout(function(){
						$j('.fullscreen_search_holder').css('opacity','1');
						$j('.fullscreen_search_close').css('opacity','1');
						$j('.fullscreen_search_close').css('visibility','visible');
						$j('.fullscreen_search').css('opacity','0');
					},200);

				}
			});
			$j('.fullscreen_search_close').on('click',function(e){
				e.preventDefault();
				$j('.fullscreen_search_overlay').removeClass('animate');
				$j('.fullscreen_search_holder').css('opacity','0');
				$j('.fullscreen_search_close').css('opacity','0');
				$j('.fullscreen_search_close').css('visibility','hidden');
				$j('.fullscreen_search').css('opacity','1');
				$j('.fullscreen_search_holder').css('display','none');

			});
		}
		//search type Fade Appear
		if($j(".fullscreen_search_holder.fade").length){
			$j('.fullscreen_search').on('click',function(e){
				e.preventDefault();
				if($j('.fullscreen_search_holder').hasClass('animate')) {
					$j('body').removeClass('fullscreen_search_opened');
					$j('.fullscreen_search_holder').removeClass('animate');
					$j('body').removeClass('search_fade_out');
					$j('body').removeClass('search_fade_in');

				} else {
					$j('body').addClass('fullscreen_search_opened');
					$j('body').removeClass('search_fade_out');
					$j('body').addClass('search_fade_in');
					$j('.fullscreen_search_holder').addClass('animate');

				}
			});
			$j('.fullscreen_search_close').on('click',function(e){
				e.preventDefault();
				$j('body').removeClass('fullscreen_search_opened');
				$j('.fullscreen_search_holder').removeClass('animate');
				$j('body').removeClass('search_fade_in');
				$j('body').addClass('search_fade_out');

			});
		}

		//Text input focus change
		$j('.fullscreen_search_holder .search_field').focus(function(){
			$j('.fullscreen_search_holder .field_holder .line').css("width","100%");
		});

		$j('.fullscreen_search_holder .search_field').blur(function(){
			$j('.fullscreen_search_holder .field_holder .line').css("width","0");
		});

		//search close button - setting its position vertically
		$j(window).scroll(function() {
			var bottom_height = $j(".page_header .header_bottom").height();
			if($j(".page_header").hasClass("sticky")){
				$j(".fullscreen_search_holder .side_menu_button").css("height",bottom_height);
				$j(".fullscreen_search_holder .close_container").css("top","0");
			} else if($j(".page_header").hasClass("fixed")){
				$j(".fullscreen_search_holder .side_menu_button").css("height",bottom_height);
			} else {
				$j(".fullscreen_search_holder .side_menu_button").css("height","");
				$j(".fullscreen_search_holder .close_container").css("top","");
			}
		});
    }

    if($j('.qode_search_submit').length) {
        $j('.qode_search_submit').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var searchForm = $j(this).parents('form').first();

            searchForm.submit();
        });
    }

}

/*
**	Init update Shopping Cart
*/
function updateShoppingCart(){
	"use strict";

		$j('body').bind('added_to_cart', add_to_cart);
		function add_to_cart(event, parts, hash) {
			var miniCart = $j('.shopping_cart_header');
			if ( parts['div.widget_shopping_cart_content'] ) {
				var $cartContent = jQuery(parts['div.widget_shopping_cart_content']),
				$itemsList = $cartContent .find('.cart_list'),
				$total = $cartContent.find('.total').contents(':not(strong)').text();
			miniCart.find('.shopping_cart_dropdown_inner').html('').append($itemsList);
			miniCart.find('.total span').html('').append($total);
			}
		}
}


/*
**	Set content bottom margin because of the uncovering footer
*/
function setContentBottomMargin(){
	if($j('.uncover').length){
        $j('.content').css('margin-bottom', $j('footer').height());
	}
}

/*
 **	Set footer uncover with vertical area
 */
function footerWidth(){
	"use strict";

	if($j('.uncover').length && $j('body').hasClass('vertical_menu_enabled') && $window_width > 1000){
		$j('.uncover').width($window_width -  $j('.vertical_menu_area').width());
	} else{
		$j('.uncover').css('width','100%');
	}
}

/*
**	Boxes which reveal text on hover
*/
function initCoverBoxes(){
    if($j('.cover_boxes').length) {
        $j('.cover_boxes').each(function(){
            var active_element = 0;
            var data_active_element = 1;
            if(typeof $j(this).data('active-element') !== 'undefined' && $j(this).data('active-element') !== false) {
                data_active_element = parseFloat($j(this).data('active-element'));
                active_element = data_active_element - 1;
            }

            var number_of_columns = 3;

            //validate active element
            active_element = data_active_element > number_of_columns ? 0 : active_element;

            $j(this).find('li').eq(active_element).addClass('act');
            var cover_boxed = $j(this);
            $j(this).find('li').each(function(){
                $j(this).hover(function() {
                    $j(cover_boxed).find('li').removeClass('act');
                    $j(this).addClass('act');
                });

            });
        });
    }
}

/*
**	Create content menu from selected rows
*/
function createContentMenu(){
	"use strict";

	var content_menu = $j(".content_menu");
	content_menu.each(function(){
		if($j(this).find('ul').length === 0){

			if($j(this).css('background-color') !== ""){
				var background_color = $j(this).css('background-color');
			}

			var content_menu_ul = $j("<ul class='menu'></ul>");
			content_menu_ul.appendTo($j(this));

			var sections = $j(this).siblings('.in_content_menu');

			if(sections.length){
				sections.each(function(){
					var section_href = $j(this).data("q_id");
					var section_title = $j(this).data('q_title');
					var section_icon = $j(this).data('q_icon');

					var li = $j("<li />");
					var icon = $j("<i />", {"class": 'fa '+section_icon});
					var link = $j("<a />", {"href": section_href, "html": "<span>" + section_title + "</span>"});
					var arrow;
					if(background_color !== ""){
						arrow = $j("<div />", {"class": 'arrow', "style": 'border-color: '+background_color+' transparent transparent transparent'});
					} else {
						arrow = $j("<div />", {"class": 'arrow'});
					}
					icon.prependTo(link);
					link.appendTo(li);
					arrow.appendTo(li);
					li.appendTo(content_menu_ul);

				});
			}
		}
	});
}

/*
**	Create content menu (select menu for responsiveness)from selected rows
*/
function createSelectContentMenu(){
	"use strict";

	var content_menu = $j(".content_menu");
	content_menu.each(function(){

		var $this = $j(this);

		var $menu_select = $j("<ul></ul>");
		$menu_select.appendTo($j(this).find('.nav_select_menu'));


		$j(this).find("ul.menu li a").each(function(){

			var menu_url = $j(this).attr("href");
			var menu_text = $j(this).text();
			var menu_icon = $j(this).find('i').clone();

			if ($j(this).parents("li").length === 2) { menu_text = "&nbsp;&nbsp;&nbsp;" + menu_text; }
			if ($j(this).parents("li").length === 3) { menu_text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + menu_text; }
			if ($j(this).parents("li").length > 3) { menu_text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + menu_text; }

			var li = $j("<li />");
			var link = $j("<a />", {"href": menu_url, "html": menu_text});
			menu_icon.prependTo(link);
			link.appendTo(li);
			li.appendTo($menu_select);
		});


		$this.find(".nav_select_button").on('click', function() {
			if ($this.find('.nav_select_menu ul').is(":visible")){
				$this.find('.nav_select_menu ul').slideUp();
			} else {
				$this.find('.nav_select_menu ul').slideDown();
			}
			return false;
		});

		$this.find(".nav_select_menu ul li a").on('click',function () {
			$this.find('.nav_select_menu ul').slideUp();
			var $link = $j(this);

			var $target = $link.attr("href");
			var targetOffset = $j("div.wpb_row[data-q_id='" + $target + "'],section.parallax_section_holder[data-q_id='" + $target + "'],.qode-elementor-content-menu-item[data-q_id='" + $target + "']").offset().top;

			$j('html,body').stop().animate({scrollTop: targetOffset }, 500, 'swing', function(){
				$j('nav.content_menu ul li').removeClass('active');
				$link.parent().addClass('active');
			});

			return false;
		});
	});
}

/*
**	Calculate content menu position and fix it when needed
*/
function contentMenuPosition(){
	"use strict";

	if($j('nav.content_menu').length){

		if(content_menu_position > sticky_amount){
			var x = min_header_height_sticky;
		}else{
			var x = 0;
		}

		if(content_menu_position - x - content_menu_top_add - $scroll <= 0 && ($j('header').hasClass('stick') || $j('header').hasClass('stick_with_left_right_menu'))){

			if(content_menu_position < sticky_amount){
				if($scroll > sticky_amount){
					$j('nav.content_menu').css({'position': 'fixed', 'top': min_header_height_sticky + content_menu_top_add}).addClass('fixed');

				}else{
					$j('nav.content_menu').css({'position': 'fixed', 'top': 0, transition:'none'}).addClass('fixed');
				}
			}else{
				$j('nav.content_menu').css({'position': 'fixed', 'top': min_header_height_sticky + content_menu_top_add}).addClass('fixed');
			}
			$j('header.sticky').addClass('no_shadow');
			$j('.content > .content_inner > .container > .container_inner').css('margin-top',content_line_height);
			$j('.content > .content_inner > .full_width').css('margin-top',content_line_height);

		} else if(content_menu_position - content_menu_top - content_menu_top_add - $scroll <= 0 && !($j('header').hasClass('stick'))) {
			$j('nav.content_menu').css({'position': 'fixed', 'top': content_menu_top + content_menu_top_add}).addClass('fixed');
			$j('.content > .content_inner > .container > .container_inner').css('margin-top',content_line_height);
			$j('.content > .content_inner > .full_width').css('margin-top',content_line_height);
		} else {
			$j('nav.content_menu').css({'position': 'relative', 'top': '0px'}).removeClass('fixed');
			$j('header.sticky').removeClass('no_shadow');
			$j('.content > .content_inner > .container > .container_inner').css('margin-top','0px');
			$j('.content > .content_inner > .full_width').css('margin-top','0px');
		}

		$j('.content .in_content_menu').waypoint( function(direction) {
			var $active = $j(this);
			var id = $active.data("q_id");

			$j("nav.content_menu.fixed li a").each(function(){
				var i = $j(this).attr("href");
				if(i === id){
					$j(this).parent().addClass('active');
				}else{
					$j(this).parent().removeClass('active');
				}
			});
		}, { offset: '150' });
	}
}

/*
**	Check first and last content menu included rows for active state in content menu
*/
function contentMenuCheckLastSection(){
	"use strict";

	if($j('nav.content_menu').length){

		if($j('.content .in_content_menu').length){
			var last_from_top = $j('.content .in_content_menu:last').offset().top + $j('.content .in_content_menu:last').height();
			var first_from_top = $j('.content .in_content_menu:first').offset().top - content_menu_top - content_menu_top_add - 100; //60 is height of content menu
			if(last_from_top < $scroll){
				$j("nav.content_menu.fixed li").removeClass('active');

			}
			if(first_from_top > $scroll){
				$j('nav.content_menu li:first, nav.content_menu ul.menu li:first').removeClass('active');

			}
		}

	}
}

/*
**	Scroll to section when item in content menu is clicked
*/
function contentMenuScrollTo(){
	"use strict";

	if($j('nav.content_menu').length){

		$j("nav.content_menu ul.menu li a").on('click', function(e){
			e.preventDefault();
			var $this = $j(this);

			if($j(this).parent().hasClass('active')){
				return false;
			}

			var $target = $this.attr("href");
			var targetOffset = $j("div.wpb_row[data-q_id='" + $target + "'],section.parallax_section_holder[data-q_id='" + $target + "'],.qode-elementor-content-menu-item[data-q_id='" + $target + "']").offset().top - content_line_height - content_menu_top - content_menu_top_add;
			$j('html,body').stop().animate({scrollTop: targetOffset }, 500, 'swing', function(){
				$j('nav.content_menu ul li').removeClass('active');
				$this.parent().addClass('active');
			});

			return false;
		});

	}
}

function initButtonHover() {
    if($j('.qbutton').length) {
        $j('.qbutton').each(function() {

            //hover background color
            if(typeof $j(this).data('hover-background-color') !== 'undefined' && $j(this).data('hover-background-color') !== false) {
                var hover_background_color = $j(this).data('hover-background-color');
                var initial_background_color = $j(this).css('background-color');
                $j(this).hover(
                function() {
                    $j(this).css('background-color', hover_background_color);
                },
                function() {
                    $j(this).css('background-color', initial_background_color);
                });
            }

            //hover border color
            if(typeof $j(this).data('hover-border-color') !== 'undefined' && $j(this).data('hover-border-color') !== false) {
                var hover_border_color = $j(this).data('hover-border-color');
                var initial_border_color = $j(this).css('border-top-color');
                $j(this).hover(
                    function() {
                        $j(this).css('border-color', hover_border_color);
                    },
                    function() {
                        $j(this).css('border-color', initial_border_color);
                    });
            }

            //hover color
            if(typeof $j(this).data('hover-color') !== 'undefined' && $j(this).data('hover-color') !== false) {
                var hover_color = $j(this).data('hover-color');
                var initial_color = $j(this).css('color');
                $j(this).hover(
                    function() {
                        $j(this).css('color', hover_color);
                    },
                    function() {
                        $j(this).css('color', initial_color);
                    });
            }
        });
    }
}

/**
 * Button object that initializes whole button functionality
 * @type {Function}
 */
var qodeV2Button = function() {
	//all buttons on the page
	var buttons = $j('.qode-btn');

	/**
	 * Initializes button hover color
	 * @param button current button
	 */
	var buttonHoverColor = function(button) {
		if(typeof button.data('hover-color') !== 'undefined') {
			var changeButtonColor = function(event) {
				event.data.button.css('color', event.data.color);
			};

			var originalColor = button.css('color');
			var hoverColor = button.data('hover-color');

			if (!button.hasClass('qode-btn-3d-hover')) {
				button.on('mouseenter', { button: button, color: hoverColor }, changeButtonColor);
				button.on('mouseleave', { button: button, color: originalColor }, changeButtonColor);
			}
		}
	};



	/**
	 * Initializes button hover background color
	 * @param button current button
	 */
	var buttonHoverBgColor = function(button) {
		if(typeof button.data('hover-bg-color') !== 'undefined') {
			var changeButtonBg = function(event) {
				event.data.button.css('background-color', event.data.color);
			};

			var originalBgColor = button.css('background-color');
			var hoverBgColor = button.data('hover-bg-color');

			if (!button.hasClass('qode-btn-3d-hover')) {
				button.on('mouseenter', { button: button, color: hoverBgColor }, changeButtonBg);
				button.on('mouseleave', { button: button, color: originalBgColor }, changeButtonBg);
			}
		}
	};

	/**
	 * Initializes button border color
	 * @param button
	 */
	var buttonHoverBorderColor = function(button) {
		if(typeof button.data('hover-border-color') !== 'undefined') {
			var changeBorderColor = function(event) {
				event.data.button.css('border-color', event.data.color);
			};

			var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
			var hoverBorderColor = button.data('hover-border-color');

			if (!button.hasClass('qode-btn-3d-hover')) {
				button.on('mouseenter', { button: button, color: hoverBorderColor }, changeBorderColor);
				button.on('mouseleave', { button: button, color: originalBorderColor }, changeBorderColor);
			}
		}
	};

	/**
	 * Initializes button icon border color
	 * @param button
	 */
	var buttonIconHoverBorderColor = function(button) {

		var iconHolder = button.find('.qode-button-v2-icon-holder');
		if(typeof iconHolder.data('hover-icon-border-color') !== 'undefined') {
			var changeIconBorderColor = function(event) {
				event.data.iconHolder.css('border-color', event.data.color);
			};

			var originalBorderColor = iconHolder.css('borderLeftColor'); //take one of the four sides
			var hoverBorderColor = iconHolder.data('hover-icon-border-color');

			if (!button.hasClass('qode-btn-3d-hover')) {
				button.on('mouseenter', { iconHolder: iconHolder, color: hoverBorderColor }, changeIconBorderColor);
				button.on('mouseleave', { iconHolder: iconHolder, color: originalBorderColor }, changeIconBorderColor);
			}
		}
	};

	/**
	 * Initializes button icon background color
	 * @param button
	 */
	var buttonIconHoverBackgroundColor = function(button) {

		var iconHolder = button.find('.qode-button-v2-icon-holder');
		if(typeof iconHolder.data('hover-icon-bg-color') !== 'undefined') {
			var changeIconBgColor = function(event) {
				event.data.iconHolder.css('background-color', event.data.color);
			};

			var originalBgColor = iconHolder.css('backgroundColor'); //take one of the four sides
			var hoverBgColor = iconHolder.data('hover-icon-bg-color');

			if (!button.hasClass('qode-btn-3d-hover')) {
				button.on('mouseenter', { iconHolder: iconHolder, color: hoverBgColor }, changeIconBgColor);
				button.on('mouseleave', { iconHolder: iconHolder, color: originalBgColor }, changeIconBgColor);
			}
		}
	};

	/**
	 * Initializes button 3d rotate effect and styles
	 * @param button
	 */
	var button3DRotate = function(button) {
		if (button.hasClass('qode-btn-3d-hover')) {
			var buttonHolder = button.closest('.qode-3d-button-holder'),
				button3D = buttonHolder.find('.qode-btn-3d-hover'),
				aSide = button3D.first(),
				bSide = button3D.last(),
				iconHolder = bSide.find('.qode-button-v2-icon-holder'),
				buttonHeight = buttonHolder.outerHeight(),
				translateFactor = Math.round(buttonHeight/2);

			//rotation
			aSide.css('transform','rotateX(0deg) translateZ('+translateFactor+'px)');
			bSide.css('transform','rotateX(90deg) translateZ('+translateFactor+'px)');
			setTimeout(function(){
				buttonHolder.css('opacity','1'); //show after sides are set
			},200);

			buttonHolder.on('mouseenter', function(){
				aSide.css('transform','rotateX(-90deg) translateZ('+translateFactor+'px)');
				bSide.css('transform','rotateX(0deg) translateZ('+translateFactor+'px)');
			});

			buttonHolder.on('mouseleave', function(){
				aSide.css('transform','rotateX(0deg) translateZ('+translateFactor+'px)');
				bSide.css('transform','rotateX(90deg) translateZ('+translateFactor+'px)');
			});

			//styles
			if(typeof bSide.data('hover-color') !== 'undefined') {
				var buttonHoverColor = bSide.data('hover-color');
				bSide.css('color', buttonHoverColor)
			}
			if(typeof bSide.data('hover-bg-color') !== 'undefined') {
				var buttonHoverBackgroundColor = bSide.data('hover-bg-color');
				bSide.css('background-color', buttonHoverBackgroundColor)
			}
			if(typeof bSide.data('hover-border-color') !== 'undefined') {
				var buttonHoverBorderColor = bSide.data('hover-border-color');
				bSide.css('border-color', buttonHoverBorderColor)
			}
			if(typeof iconHolder.data('hover-icon-border-color') !== 'undefined') {
				var iconBorderColor = iconHolder.data('hover-icon-border-color');
				iconHolder.css('border-color', iconBorderColor);
			}
			if(typeof iconHolder.data('hover-icon-bg-color') !== 'undefined') {
				var iconBgColor = iconHolder.data('hover-icon-bg-color');
				iconHolder.css('background-color', iconBgColor);
			}
		}
	}

	return {
		init: function() {
			if(buttons.length) {
				buttons.each(function() {
					buttonHoverColor($j(this));
					buttonHoverBgColor($j(this));
					buttonIconHoverBorderColor($j(this));
					buttonIconHoverBackgroundColor($j(this));
					button3DRotate($j(this));
				});
			}
		}
	};
};



/*
* Enlarge button effect
*/
function initEnlargeButton() {
	if($j('.qbutton.enlarge').length) {
	    $j('.qbutton.enlarge').each(function() {
	    	var thisButton = $j(this),
	    		horizontalPadding = parseInt(thisButton.css('padding-left')),
	    		paddingOffset = Math.floor((horizontalPadding/100)*20);
    		thisButton.mouseenter(function(){
    			thisButton.css({'padding-left':horizontalPadding + paddingOffset});
    			thisButton.css({'padding-right':horizontalPadding + paddingOffset});
    		});
    		thisButton.mouseleave(function(){
    			thisButton.css({'padding-left':horizontalPadding});
    			thisButton.css({'padding-right':horizontalPadding});
    		});
    	});
	}
}

function initSocialIconHover() {
    if($j('.q_social_icon_holder').length) {
        $j('.q_social_icon_holder').each(function() {

            //hover background color
            if(typeof $j(this).data('hover-background-color') !== 'undefined' && $j(this).data('hover-background-color') !== false) {
                var hover_background_color = $j(this).data('hover-background-color');
                var initial_background_color = $j(this).find('.fa-stack').css('background-color');
                $j(this).find('.fa-stack').hover(
                    function() {

                        $j(this).css('background-color', hover_background_color);
                    },
                    function() {
                        $j(this).css('background-color', initial_background_color);
                    });
            }

            //hover border color
            if(typeof $j(this).data('hover-border-color') !== 'undefined' && $j(this).data('hover-border-color') !== false) {
                var hover_border_color = $j(this).data('hover-border-color');
                var initial_border_color = $j(this).find('.fa-stack').css('border-top-color');
                $j(this).find('.fa-stack').hover(
					function() {
						$j(this).css('border-color', hover_border_color);
					},
					function() {
						$j(this).css('border-color', initial_border_color);
					}
					);
            }

            //hover color
            if(typeof $j(this).data('hover-color') !== 'undefined' && $j(this).data('hover-color') !== false) {
				var initial_color;
				var initial_style;
				var hover_color = $j(this).data('hover-color');

				if($j(this).find('.fa-stack i, .fa-stack span').length) {

					if(typeof $j(this).data('color') !== 'undefined'){
						initial_color = $j(this).data('color');
					}
					else{
						initial_color = $j(this).find('.fa-stack i, .fa-stack span').css('color');
					}

					initial_style = $j(this).find('.fa-stack i, .fa-stack span').attr('style');

				} else if($j(this).find('.simple_social').length) {

					if(typeof $j(this).data('color') !== 'undefined'){
						initial_color = $j(this).data('color');
					}
					else{
						initial_color = $j(this).find('.simple_social').css('color');
					}

					initial_style = $j(this).find('.simple_social').attr('style');
				}

				if($j(this).find('.fa-stack').length) {
					$j(this).find('.fa-stack').hover(
						function() {
							$j(this).find('i, span').attr('style', function(i, s) { return initial_style + 'color: '+ hover_color + '!important;'});
						},
						function() {
							$j(this).find('i, span').attr('style', function(i, s) { return initial_style + 'color: ' + initial_color + ';' });
						});
				} else if($j(this).find('.simple_social').length) {
					$j(this).find('.simple_social').hover(
						function(){
							$j(this).attr('style', function(i, s) { return initial_style + 'color: '+ hover_color + '!important;' });
					},
						function(){
							$j(this).attr('style', function(i, s) { return initial_style + 'color: '+ initial_color + ';' });
					});
				}

            }
        });
    }
}

function initTabsActiveBorder() {
    if($j('.q_tabs.vertical, .q_tabs.boxed').length) {
        $j('.q_tabs.vertical, .q_tabs.boxed').each(function(){
            var parentBgColor = getParentBackgroundColor($j(this));

            var activeElement = $j(this).find('li.active a');
            if($j(this).hasClass('boxed')) {
                activeElement.css('border-bottom-color', parentBgColor);
            }

            if($j(this).hasClass('left')) {
                activeElement.css('border-right-color', parentBgColor);
            }

            if($j(this).hasClass('right')) {
                activeElement.css('border-left-color', parentBgColor);
            }
        });
    }
}

function getParentBackgroundColor(element) {
    return element.parents().filter(function(){
        var color = $j(this).css('background-color');
        return color != 'transparent' && color != 'rgba(0, 0, 0, 0)';
    }).eq(0).css('background-color')
}

function setActiveTabBorder() {
    if($j('.q_tabs li.active').length) {
        $j(this).on('click', function() {
            initTabsActiveBorder();
        });
    }
}

/*
 **	Popup menu initialization
 */

function initPopupMenu(){
    "use strict";

    if($j('a.popup_menu').length){

        //set height of popup holder and initialize nicescroll
        $j(".popup_menu_holder_outer").height($window_height).niceScroll({
            scrollspeed: 30,
            mousescrollstep: 20,
            cursorwidth: 0,
            cursorborder: 0,
            cursorborderradius: 0,
            cursorcolor: "transparent",
            autohidemode: false,
            horizrailenabled: false
        }); //200 is top and bottom padding of holder

        //set delays on nav items and widget area
        if($j('body').hasClass('qode_popup_menu_push_text_right') || $j('body').hasClass('qode_popup_menu_push_text_top')) {
                $j('.popup_menu_holder_outer nav > ul > li > a').each(function (i) {
                    $j(this).css({
                        '-webkit-animation-delay': i * 70 + 'ms',
                        'animation-delay': i * 70 + 'ms'
                    });
                });
                $j('.popup_menu_widget_holder > div').css({
                    '-webkit-animation-delay': ($j('.popup_menu_holder_outer nav > ul > li > a').length+1)*70 + 'ms',
                    'animation-delay': ($j('.popup_menu_holder_outer nav > ul > li > a').length+1)*70 + 'ms'
                });
        }

        //set height of popup holder on resize
        $j(window).resize(function() {$j(".popup_menu_holder_outer").height($window_height)});

        // Open popup menu
        $j('a.popup_menu').on('click',function(e){
            e.preventDefault();

            if(!$j(this).hasClass('opened')){
                $j(this).addClass('opened');
                $j('body').addClass('popup_menu_opened');

                if($j(this).hasClass('qode_popup_menu_push_text_right')) {
                    $j('body').addClass('qode_popup_menu_fade_in').removeClass('qode_popup_menu_fade_out');
                    $j('body').removeClass('qode_popup_menu_push_nav_right');
                }
                else if($j(this).hasClass('qode_popup_menu_push_text_top')) {
                    $j('body').addClass('qode_popup_menu_fade_in').removeClass('qode_popup_menu_fade_out');
                    $j('body').removeClass('qode_popup_menu_push_nav_top');
                }
                else if($j(this).hasClass('qode_popup_menu_text_scaledown')) {
                    $j('body').addClass('qode_popup_menu_fade_in').removeClass('qode_popup_menu_fade_out');
                }

                setTimeout(function(){
					if(!$j('body').hasClass('page-template-full_screen-php')){
						$j('body').css('overflow','hidden');
					}
                },400);
            }else{
                $j(this).removeClass('opened');
                $j('body').removeClass('popup_menu_opened');

                if($j(this).hasClass('qode_popup_menu_push_text_right') || $j(this).hasClass('qode_popup_menu_push_text_top') || $j(this).hasClass('qode_popup_menu_text_scaledown')) {
                    $j('body').removeClass('qode_popup_menu_fade_in').addClass('qode_popup_menu_fade_out');
                }

                if($j(this).hasClass('qode_popup_menu_push_text_right')) {
                    $j('body').addClass('qode_popup_menu_push_nav_right');
                }
                else if($j(this).hasClass('qode_popup_menu_push_text_top')) {
                    $j('body').addClass('qode_popup_menu_push_nav_top');
                }

                setTimeout(function(){
					if(!$j('body').hasClass('page-template-full_screen-php')){
						$j('body').css('overflow','visible');
					}
                    $j("nav.popup_menu ul.sub_menu").slideUp(200, function(){
                        $j('nav.popup_menu').getNiceScroll().resize();
                    });
                },400);

            }
        });

        //logic for open sub menus in popup menu
        $j(".popup_menu > ul > li.has_sub > a, .popup_menu > ul > li.has_sub > h6").on('tap click', function (e) {
            e.preventDefault();

            if ($j(this).closest('li.has_sub').find("> ul.sub_menu").is(":visible")){
                $j(this).closest('li.has_sub').find("> ul.sub_menu").slideUp(200, function(){
                    $j('.popup_menu_holder_outer').getNiceScroll().resize();
                });
                $j(this).closest('li.has_sub').removeClass('open_sub');
            } else {
                $j(this).closest('li.has_sub').addClass('open_sub');
                $j(this).closest('li.has_sub').find("> ul.sub_menu").slideDown(200, function(){
                    $j('.popup_menu_holder_outer').getNiceScroll().resize();
                });
            }

            return false;
        });

//        $j(".popup_menu > ul > li.has_sub > ul.sub_menu > li.has_sub > a > span.popup_arrow, .popup_menu > ul > li.has_sub > ul.sub_menu > li.has_sub > h6").on('click', function () {
//            if ($j(this).parent().parent().find("ul.sub_menu").is(":visible")){
//                $j(this).parent().parent().find("ul.sub_menu").slideUp(200);
//                $j(this).parent().parent().removeClass('open_sub');
//            } else {
//                $j(this).parent().parent().addClass('open_sub');
//                $j(this).parent().parent().find("ul.sub_menu").slideDown(200);
//            }
//        });

        //if link has no submenu and if it's not dead, than open that link
        $j(".popup_menu ul li:not(.has_sub) a").on('click', function () {
            if(($j(this).attr('href') !== "http://#") && ($j(this).attr('href') !== "#")){
                $j('a.popup_menu').removeClass('opened');
                $j('body').removeClass('popup_menu_opened').css('overflow','visible');
                $j("nav.popup_menu ul.sub_menu").slideUp(200, function(){
                    $j('nav.popup_menu').getNiceScroll().resize();
                });
            }else{
                return false;
            }
        });
    }
}

function initFullScreenTemplate(){
	"use strict";

	if($j('.full_screen_holder').length && $window_width > 600){

        // used for header style on changing sections, in checkFullScreenSectionsForHeaderStyle functions - START //
        var default_header_style = '';
        if ($j('header.page_header').hasClass('light')) {
            default_header_style = 'light';
        } else if ($j('header.page_header').hasClass('dark')) {
            default_header_style = 'dark';
        } else {
            default_header_style = header_style_admin;
        }
        // used for header style on changing sections, in checkFullScreenSectionsForHeaderStyle functions - END //

        $j('.full_screen_preloader').css('height', ($window_height));

        $j('#up_fs_button').on('click', function() {
            $j.fn.fullpage.moveSectionUp();
            return false;
        });

        $j('#down_fs_button').on('click', function() {
            $j.fn.fullpage.moveSectionDown();
            return false;
        });

        var section_number = $j('.full_screen_inner > .full_screen_section').length;
		$j('.full_screen_inner').fullpage({
			sectionSelector: '.full_screen_section',
			scrollOverflow: true,
            afterLoad: function(anchorLink, index){
                checkActiveArrowsOnFullScrrenTemplate(section_number, index);
                checkFullScreenSectionsForHeaderStyle(index, default_header_style);
			},
            afterRender: function(){
            	$j(this).addClass('qode-initialized');
                checkActiveArrowsOnFullScrrenTemplate(section_number, 1);
                checkFullScreenSectionsForHeaderStyle(1, default_header_style);
                if(section_number !== 1){
                    $j('.full_screen_holder').find('.full_screen_navigation_holder').css('visibility','visible');
                }
                $j('.full_screen_holder').find('.full_screen_inner').css('visibility','visible');
                $j('.full_screen_preloader').hide();
                if($j('.full_screen_holder video.full_screen_sections_video').length){
                	$j('.full_screen_holder video.full_screen_sections_video').each(function(){
			            $j(this).get(0).play();
			        });
                }
            }
		});
	}
}

function checkActiveArrowsOnFullScrrenTemplate(section_number, index){
    "use strict";

    if(index === 1){
        $j('.full_screen_navigation_holder #up_fs_button').hide();
        if(index != section_number){
            $j('.full_screen_navigation_holder #down_fs_button').show();
        }
    }else if(index === section_number){
        if(section_number === 2){
            $j('.full_screen_navigation_holder #up_fs_button').show();
        }
        $j('.full_screen_navigation_holder #down_fs_button').hide();
    }else{
        $j('.full_screen_navigation_holder #up_fs_button').show();
        $j('.full_screen_navigation_holder #down_fs_button').show();
    }
}

function checkFullScreenSectionsForHeaderStyle(index, default_header_style){
    "use strict";

    if($j('[data-q_header_style]').length > 0 && $j('header').hasClass('header_style_on_scroll')) {
        if ($j($j('.full_screen_holder .full_screen_inner .full_screen_section')[index-1]).data("q_header_style") !== undefined) {
            var header_style = $j($j('.full_screen_holder .full_screen_inner .full_screen_section')[index-1]).data("q_header_style");
            $j('header').removeClass('dark light').addClass(header_style);
        } else {

            $j('header').removeClass('dark light').addClass(default_header_style);
        }
    }
}

/*
 *	Check header style on scroll
 */

function checkHeaderStyleOnScroll(){
    "use strict";

    if($j('[data-q_header_style]').length > 0 && $j('header').hasClass('header_style_on_scroll')){

        //var offset = $j('header.page_header').height();
        var default_header_style = '';
        if($j('header.page_header').hasClass('light')){
            default_header_style = 'light';
        }else if($j('header.page_header').hasClass('dark')){
            default_header_style = 'dark';
        }else{
            default_header_style = header_style_admin;
        }

        var paspartu_top_add = $j('body').hasClass('paspartu_on_top_fixed') ? Math.round($window_width*paspartu_width) : 0;
        var paspartu_bottom_add = $j('body').hasClass('paspartu_on_bottom_fixed') ? Math.round($window_width*paspartu_width) : 0;

        $j('.full_width_inner > .wpb_row.section, .full_width_inner > .parallax_section_holder, .container_inner > .wpb_row.section, .container_inner > .parallax_section_holder, .portfolio_single > .wpb_row.section').waypoint( function(direction) {
            if(direction === 'down') {
                if ($j(this).data("q_header_style") !== undefined) {
                    var header_style = $j(this).data("q_header_style");
                    $j('header').removeClass('dark light').addClass(header_style);
                } else {
                    $j('header').removeClass('dark light').addClass(default_header_style);
                }
            }

        }, { offset: 0 + paspartu_top_add});

        //'title' class is added in selector because default header style is not set when there is title on the page and page is scrolled back to the top
        $j('.title, .full_width_inner > .wpb_row.section, .full_width_inner > .parallax_section_holder, .container_inner > .wpb_row.section, .container_inner > .parallax_section_holder, .portfolio_single > .wpb_row.section, .q_slider').waypoint( function(direction) {

            if(direction === 'up') {
                if ($j(this).data("q_header_style") !== undefined) {
                    var header_style = $j(this).data("q_header_style");
                    $j('header').removeClass('dark light').addClass(header_style);
                } else {
                    $j('header').removeClass('dark light').addClass(default_header_style);
                }
            }

        }, { offset: function(){
            return -$j(this).outerHeight() + paspartu_bottom_add;
        } });
    }
}

/*
 **	Image Gallery Slider with no space initialization
 */
function initImageGallerySliderNoSpace(){
    if($j('.qode_image_gallery_no_space').length){
        $j('.qode_image_gallery_no_space').each(function(){
            $j(this).animate({'opacity': 1},1000);
            $j(this).find('.qode_image_gallery_holder').lemmonSlider({infinite: true});
        });

        //disable click on non active image
        $j('.qode_image_gallery_no_space').on('click', 'li:not(.active) a', function() {
            if(window.innerWidth>800){
              return false;
            }
             else {
              return true;
            }
        });
    }
}

/*
 **	Vertical Split Slider
 */

function initVerticalSplitSlider(){
    "use strict";
	if($j('html').hasClass('vertical_split_screen_initalized')){
		$j('html').removeClass('vertical_split_screen_initalized');
		$j.fn.multiscroll.destroy();
		//this has to be added due to elementor duplicating navigation
		$j('#multiscroll-nav').remove();
	}
    if($j('.vertical_split_slider').length) {

	    var default_header_style = '';
	    if ($j('header.page_header').hasClass('light')) {
		    default_header_style = 'light';
	    } else if ($j('header.page_header').hasClass('dark')) {
		    default_header_style = 'dark';
	    } else {
		    default_header_style = header_style_admin;
	    }

	    var data_disable_header_skin_change = $j('.vertical_split_slider').data('disable-header-skin-change');

        $j('.vertical_split_slider').height($window_height).animate({opacity:1},300);
        $j('.vertical_split_slider').multiscroll({
            scrollingSpeed: 500,
            navigation: true,
			afterRender: function(){
				checkVerticalSplitSectionsForHeaderStyle($j('.ms-right .ms-section:last-child').data('header_style'), default_header_style, data_disable_header_skin_change);
                $j('html').addClass('vertical_split_screen_initalized');
				initButtonHover(); // this function need to be initialized after initVerticalSplitSlider
				var contactForm7 = $j('div.wpcf7 > form');
				if (contactForm7.length) {
					contactForm7.each(function(){
						var thisForm = $j(this);

						thisForm.find('.wpcf7-submit').off().on('click', function(e){
							e.preventDefault();
							wpcf7.submit(thisForm);
						});
					});
				}

				if ($j('body').hasClass('vss_responsive_adv')){
					//prepare html for smaller screens - start //
					var vertical_split_slider_responsive = $j("<div class='vertical_split_slider_responsive' />");
					$j(".vertical_split_slider").after(vertical_split_slider_responsive);
					var left_side = $j('.vertical_split_slider .ms-left > div');

					var right_side = $j('.vertical_split_slider .ms-right > div');
					for(var i = 0; i < left_side.length; i++){
						vertical_split_slider_responsive.append($j(left_side[i]).clone(true));
						vertical_split_slider_responsive.append($j(right_side[left_side.length-1-i]).clone(true));
					}

					if ($j('.vertical_split_slider_responsive .qode_google_map').length) {
                        $j('.vertical_split_slider_responsive .qode_google_map').each(function () {
                            var map = $j(this);
                            map.empty();
                            var num = Math.floor((Math.random() * 100000) + 1);
                            map.attr('id', 'map_canvas_' + num);
                            map.data('unique-id', num);
                        });
                    }
					
					if($j('.vertical_split_slider_responsive .counter.random').length){
						initCounter();
					}
				}

				initProgressBars();
				initCountdown();
				showGoogleMap();
				initAccordion();
				initAccordionContentLink();
				qodeInitAccordions();
            },
	        onLeave: function(index, nextIndex, direction){
		        checkVerticalSplitSectionsForHeaderStyle($j($j('.ms-right .ms-section')[$j(".ms-right .ms-section").length-nextIndex]).data('header_style'), default_header_style, data_disable_header_skin_change);
	        }
        });

		if ($j('body').hasClass('vss_responsive_adv')){

			var windowSize = 768;

			if($j('body').hasClass('vss_width_1000')) windowSize = 1000;
			if($j('body').hasClass('vss_width_600')) windowSize = 600;

			if($window_width < windowSize){
				$j.fn.multiscroll.destroy();
				$j('html,body').css('height', 'auto').css('overflow', 'auto');
			}else{
				$j.fn.multiscroll.build();
				$j('html,body').css('height', '100%').css('overflow', 'hidden');
			}

			$j(window).resize(function() {
				if($window_width < windowSize){
					$j.fn.multiscroll.destroy();
					$j('html,body').css('height', 'auto').css('overflow', 'auto');
				}else{
					$j.fn.multiscroll.build();
					$j('html,body').css('height', '100%').css('overflow', 'hidden');
				}
			});
		}

    }else{
        if(!$j('.full_screen_holder').length) { //because this is not necessary on pages if there are full screen sections
            $j('html,body').css('height', 'auto').css('overflow', 'auto');
        }
    }
}

/*
 **	Check slides on load and slide change for header style changing
 */
function checkVerticalSplitSectionsForHeaderStyle(section_header_style, default_header_style, data_disable_header_skin_change){
	"use strict";

	if(section_header_style != ""){
		if(data_disable_header_skin_change == 'no'){$j('header.page_header').removeClass('dark light').addClass(section_header_style)};
		$j('#multiscroll-nav').removeClass('dark light').addClass(section_header_style);
	}else{
		if(data_disable_header_skin_change == 'no'){$j('header.page_header').removeClass('dark light').addClass(default_header_style)};
		$j('#multiscroll-nav').removeClass('dark light').addClass(default_header_style);
	}
}
/*
**	Show Google Map
*/
function showGoogleMap(){
	"use strict";

	if($j('.qode_google_map').length){
		$j('.qode_google_map').each(function(){

			var snazzyMapStyle = false;
			var snazzyMapCode  = '';
			if(typeof $j(this).data('snazzy-map-style') !== 'undefined' && $j(this).data('snazzy-map-style') === 'yes') {
				snazzyMapStyle = true;
				var snazzyMapHolder = $j(this).parent().find('.qode-snazzy-map'),
					snazzyMapCodes  = snazzyMapHolder.val();

				if( snazzyMapHolder.length && snazzyMapCodes.length ) {
					snazzyMapCode = JSON.parse( snazzyMapCodes.replace(/`{`/g, '[').replace(/`}`/g, ']').replace(/``/g, '"').replace(/`/g, '') );
				}
			}

			var custom_map_style;
			if(typeof $j(this).data('custom-map-style') !== 'undefined') {
				custom_map_style = $j(this).data('custom-map-style');
			}

			var color_overlay;
			if(typeof $j(this).data('color-overlay') !== 'undefined' && $j(this).data('color-overlay') !== false) {
				color_overlay = $j(this).data('color-overlay');
			}

			var saturation;
			if(typeof $j(this).data('saturation') !== 'undefined' && $j(this).data('saturation') !== false) {
				saturation = $j(this).data('saturation');
			}

			var lightness;
			if(typeof $j(this).data('lightness') !== 'undefined' && $j(this).data('lightness') !== false) {
				lightness = $j(this).data('lightness');
			}

			var zoom;
			if(typeof $j(this).data('zoom') !== 'undefined' && $j(this).data('zoom') !== false) {
				zoom = $j(this).data('zoom');
			}

			var pin;
			if(typeof $j(this).data('pin') !== 'undefined' && $j(this).data('pin') !== false) {
				pin = $j(this).data('pin');
			}

			var map_height;
			if(typeof $j(this).data('map-height') !== 'undefined' && $j(this).data('map-height') !== false) {
				map_height = $j(this).data('map-height');
			}

			var unique_id;
			if(typeof $j(this).data('unique-id') !== 'undefined' && $j(this).data('unique-id') !== false) {
				unique_id = $j(this).data('unique-id');
			}

			var google_maps_scroll_wheel;
			if(typeof $j(this).data('google-maps-scroll-wheel') !== 'undefined') {
				google_maps_scroll_wheel = $j(this).data('google-maps-scroll-wheel');
			}
			var addresses;
			if(typeof $j(this).data('addresses') !== 'undefined' && $j(this).data('addresses') !== false) {
				addresses = $j(this).data('addresses');
			}


			var map = "map_"+ unique_id;
			var geocoder = "geocoder_"+ unique_id;
			var holderId = "map_canvas_"+ unique_id;

			initializeGoogleMap(snazzyMapStyle, snazzyMapCode, custom_map_style, color_overlay, saturation, lightness, google_maps_scroll_wheel, zoom, holderId, map_height, pin,  map, geocoder, addresses)
		});
	}

}
/*
 **	Init Google Map
 */
function initializeGoogleMap(snazzyMapStyle, snazzyMapCode, custom_map_style, color, saturation, lightness, wheel, zoom, holderId, height, pin,  map, geocoder, data){
	"use strict";

    if (typeof google != "undefined") {

        var mapStyles = [];
        if (snazzyMapStyle && snazzyMapCode.length) {
            mapStyles = snazzyMapCode;
        } else {
            mapStyles = [
                {
                    stylers: [
                        {hue: color},
                        {saturation: saturation},
                        {lightness: lightness},
                        {gamma: 1}
                    ]
                }
            ];
        }

        var google_map_type_id;

        if (snazzyMapStyle || custom_map_style) {
            google_map_type_id = 'qode_style'
        } else {
            google_map_type_id = google.maps.MapTypeId.ROADMAP
        }

        var qodeMapType = new google.maps.StyledMapType(mapStyles,
            {name: "Qode Google Map"});

        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(-34.397, 150.644);

        var myOptions = {

            zoom: zoom,
            scrollwheel: wheel,
            center: latlng,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scaleControl: false,
            scaleControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            streetViewControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            panControl: false,
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeControl: false,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'qode_style'],
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            mapTypeId: google_map_type_id
        };
        map = new google.maps.Map(document.getElementById(holderId), myOptions);
        map.mapTypes.set('qode_style', qodeMapType);

        var index;

        for (index = 0; index < data.length; ++index) {
            initializeGoogleAddress(data[index], pin, map, geocoder);
        }

        var holder_element = document.getElementById(holderId);
        holder_element.style.height = height;
        if (!isNaN(height)) {
            height = height + 'px';
        }

    }

}
/*
 **	Init Google Map Addresses
 */
function initializeGoogleAddress(data, pin,  map, geocoder){
	"use strict";
	if (data === '')
		return;
	var contentString = '<div class="content_map">'+
		'<div class="site_notice_map">'+
		'</div>'+
		'<div class="body_content_map">'+
		'<p>'+data+'</p>'+
		'</div>'+
		'</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	geocoder.geocode( { 'address': data}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location,
				icon:  pin,
				title: data['store_title']
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});

			google.maps.event.addDomListener(window, 'resize', function() {
				map.setCenter(results[0].geometry.location);
			});
		}
	});
};

/*
 **	Init Horizontal Marquee - Start
 */

function initHorizontalMarquee() {
	"use strict";

	var marquees = $j('.qode-horizontal-marquee');
	marquees.each(function() {

		var handleResize = function() {
			marqueeW = marquee.width();
			innerW = 0;

			inner.find('> .qode-hm-item').css('margin', 0);
			marquee.height(Math.min($window_height, dataMarqueeH));
			inner.find('> .qode-hm-item').each(function() {
				$j(this).css('max-width', marqueeW);
				innerW += $j(this).outerWidth() + dataSpacing;
			});
			innerW -= dataSpacing;
			inner.width(innerW).css('left',0);
			inner.find('> .qode-hm-item').css('margin-right', dataSpacing+'px');
		};

		var dragStart, lastPosition;

		var handleDragStart = function(event) {
			event = typeof event.originalEvent !== 'undefined' ? event.originalEvent : event;
			event = event.type == 'touchstart' ? event.touches[0] : event;
			dragStart = {
				x: event.clientX,
				y: event.clientY
			};
			lastPosition = parseInt(inner.css('left'),10);
			inner.addClass('qode-dragged');
		};

		var handleDragStop = function(event) {
			inner.removeClass('qode-dragged');
		};

		var handleDrag = function(event) {
			event = typeof event.originalEvent !== 'undefined' ? event.originalEvent : event;
			var type = event.type;
			event = type == 'touchmove' ? event.touches[0] : event;
			var pos = {
				x: event.clientX,
				y: event.clientY
			};
			if (type == 'touchmove' /*&& Math.abs(pos.x - dragStart.x) > 50 */|| type == 'mousemove' && inner.is('.qode-dragged')) {
				inner.css({
					'left': Math.max(-innerW + marqueeW, Math.min(lastPosition + (pos.x - dragStart.x), 0)) + 'px'
				});
			}
		};

		var marquee = $j(this);
		var dataSpacing = typeof marquee.data('spacing') !== 'undefined' ? marquee.data('spacing') : 0;
		var dataMarqueeH = typeof marquee.data('height') !== 'undefined' ? marquee.data('height') : 0;
		var inner = marquee.find('.qode-horizontal-marquee-inner');
		var innerW, marqueeW;

		handleResize();
		$j(window).resize(handleResize);
		inner.find('img').on('dragstart', function(event) {
			event.preventDefault();
		});

		//exclude drag feature if marquee loop behavior is set
		if (!marquee.hasClass('qode-loop')) {
			inner.on('mousedown touchstart', handleDragStart);
			inner.on('mousemove touchmove', handleDrag);
			inner.on('mouseup touchend mouseleave', handleDragStop);
		}
	});
}

/*
 **	Init Horizontal Marquee - End
 */

/*
* Horizontal Marquee Loop functionality - Start
*/

function qodeHorizontalMarqueeLoop() {
	var marquees = $j('.qode-horizontal-marquee.qode-loop');

    if (marquees.length) {
        marquees.each(function(){
            var marquee = $j(this);

            //clone content holder for loop effect
        	marquee.find('.qode-horizontal-marquee-inner').clone().appendTo(marquee);

            var marqueeElements = marquee.find('.qode-horizontal-marquee-inner'),
                originalItem = marqueeElements.first(),
                auxItem = marqueeElements.last();

            var qodeMarqueeInit = function () {
                var delta = 1, //pixel movement
                    speedCoeff = 1, // below 1 to slow down, above 1 to speed up
                    currentPos,
                    offsetCorrection = marquee.data('spacing') !== '' ? marquee.data('spacing') : 0, //add item spacing to calculations to preserve whitespace
                    marqueeWidth;

                var marqueeReset = function() {
                    marqueeWidth = originalItem.width() + offsetCorrection;
                    currentPos = 0;
                    originalItem.css({
                        'left': 0
                    });
                    auxItem.css({
                        'width': marqueeWidth, //same width as the original marquee element
                        'left': marqueeWidth //set to the right of the original marquee element
                    });
                }

                marqueeReset();
                qodeRequestAnimationFrame();

                //show marquee item one by one on  shortcode initialization
                if (marquee.hasClass('qode-appear-fx')) {
                	marquee.addClass('qode-appeared');
                }

                marqueeElements.each(function(i){
                    var marqueeElement = $j(this);

                    //movement loop
                    var qodeMarqueeSequence = function() {
                        currentPos -= delta;

                        //reset marquee element
                        if (marqueeElement.position().left <= -marqueeWidth) {
                            marqueeElement.css('left', parseInt(marqueeWidth - delta));
                            currentPos = 0;
                        }

                        //move marquee element
                        marqueeElement.css({
                            'transform': 'translate3d('+speedCoeff*currentPos+'px,0,0)'
                        });

                        //fix overlap issue
                        if (Math.abs(originalItem.position().left - auxItem.position().left) < marqueeWidth - 1) {
                            marqueeReset();
                        }

                        //repeat
                        requestNextAnimationFrame(qodeMarqueeSequence);
                    };

                    //start loop
                    qodeMarqueeSequence();
                });

                //reset marquee on resize end
                $j(window).resize(function(){
                    setTimeout(function(){
                        marqueeReset();
                    }, 200);
                });
            };

            //init
            marquee.waitForImages(function(){
                qodeMarqueeInit();
            });
        });
    }
}

/*
* Horizontal Marquee Loop functionality - End
*/

/*
**	Init Text Marquee - Start
*/

function initTextMarquee() {
 	"use strict";
 	var textMarquees = $j('.qode-text-marquee');

 	if (textMarquees.length) {
 		textMarquees.each(function() {
		    var textMarquee = $j(this);

		    if ( !textMarquee.hasClass('qode-text-marquee-initialized')){

			    //two titles for marquee scroll effect
			    if (!$j('html').hasClass('touch')) {
				    textMarquee.find('.qode-text-marquee-wrapper').clone().appendTo(textMarquee);
			    }

			    var titleWrapper = textMarquee.find('.qode-text-marquee-wrapper'),
				    marqueeTitle = textMarquee.find('.qode-text-marquee-title');

			    //symmetrical spacings for marquee scroll effect
			    if (!$j('html').hasClass('touch')) {
				    titleWrapper.each(function () {
					    var currentTitleWrapper = $j(this),
						    title = currentTitleWrapper.find('.qode-text-marquee-title'),
						    text = title.html().split(' '),
						    len = text.length,
						    result = [];

					    for (var i = 0; i < len; i++) {
						    result[i] = '<span class="qode-inner-text">' + text[i] + '</span>';
					    }

					    title.html(result.join(''));

					    title.find('.qode-inner-text').css({
						    "display": "inline-block",
						    "margin-right": "40px"
					    });
				    });
			    }

			    //stretch calcs
			    marqueeTitle.stretch();
			    titleWrapper.eq(1).addClass('qode-marquee-additional-title');
			    marqueeTitle.css('visibility', 'visible');

			    //stretch recalcs
			    var stretchRecalcs = function () {
				    marqueeTitle.unwrap('.stretch--resizer');
				    marqueeTitle.unwrap('.stretch--handle');
				    marqueeTitle.stretch();
			    }

			    //marquee scroll effect on non touch devices
			    if (!$j('html').hasClass('touch')) {
				    qodeRequestAnimationFrame();

				    var firstTitleWrapper = titleWrapper.first(),
					    firstTitleWrapperOffset = firstTitleWrapper.offset().left,
					    lastTitleWrapper = titleWrapper.last(),
					    reset = false;

				    lastTitleWrapper.offset({left: firstTitleWrapperOffset - $j(window).width()});

				    titleWrapper.each(function () {
					    var title = $j(this),
						    offset = title.offset().left,
						    currentPos = 0,
						    delta = 2;

					    var qodeMarqueeText = function () {
						    reset = false;
						    currentPos += delta;

						    if (title.offset().left > $j(window).width()) {
							    currentPos = -($j(window).width() + offset); //reset
						    }

						    title.css('transform', 'translate3d(' + currentPos + 'px,0,0)');
						    requestAnimFrame(qodeMarqueeText);

						    //reset
						    $j(window).resize(function () {
							    if (!reset) {
								    stretchRecalcs();
								    currentPos = 0;
								    lastTitleWrapper.offset({left: -marqueeTitle.first().width()});
								    reset = true;
							    }
						    });
					    }

					    qodeMarqueeText();
				    });
			    } else {
				    //touch recalcs if device orientation changes
				    $j(window).resize(function () {
					    stretchRecalcs();
				    });
			    }

			    textMarquee.addClass('qode-text-marquee-initialized');

	        }
 		});
 	}
}

/*
**	Init Text Marquee - End
*/

/*
*	Request Animation Frame shim - Start
*/

function qodeRequestAnimationFrame() {
	if (!$j('html').hasClass('touch') && !window.requestAnimFrame) {
	    window.requestAnimFrame = (function(){
	        return  window.requestAnimationFrame       ||
	                window.webkitRequestAnimationFrame ||
	                window.mozRequestAnimationFrame    ||
	                window.oRequestAnimationFrame      ||
	                window.msRequestAnimationFrame     ||
	                function(/* function */ callback, /* DOMElement */ element){
	                    window.setTimeout(callback, 1000 / 60);
	                };
	    })();
	}
}

/*
*	Request Animation Frame shim - Start
*/

/*
*	Expanding Images shortcode - Start
*/

function initExpandingImages() {
	var expandingImagesShortcodes = $j('.qode-expanding-images');

	if (expandingImagesShortcodes.length) {
		expandingImagesShortcodes.each(function(){
			var expandingImagesShortcode = $j(this),
				IEver = getIEversion();

			if (IEver > 0) {
				expandingImagesShortcode.addClass('qode-ie-specific');
			}

			if (!$j('html').hasClass('touch')) {
				var expanding_skrollr = skrollr.init({
				    edgeStrategy: 'set',
				    smoothScrolling: false,
				    forceHeight: false
				});

				expanding_skrollr.refresh();
			}

		});
	}
}

/*
*	Expanding Images shortcode - End
*/


/*
*	Item Showcase shortcode - Start
*/

function initItemShowcase() {
    var itemShowcase = $j('.qode-item-showcase');
    if (itemShowcase.length) {
        itemShowcase.each(function(){
            var thisItemShowcase = $j(this),
                leftItems = thisItemShowcase.find('.qode-item-left'),
                rightItems = thisItemShowcase.find('.qode-item-right'),
                itemImage = thisItemShowcase.find('.qode-item-image');

            //logic
            leftItems.wrapAll( "<div class='qode-item-showcase-holder qode-holder-left' />");
            rightItems.wrapAll( "<div class='qode-item-showcase-holder qode-holder-right' />");
            thisItemShowcase.find('.qode-item-showcase-holder').append("<span class='qode-item-line'></span>");
            var itemLines = $j('.qode-item-line');

            if (!$j('html').hasClass('touch')) {
	            thisItemShowcase.animate({opacity:1},200);
	            setTimeout(function(){
	                thisItemShowcase.appear(function(){
	                    itemImage.addClass('qode-appeared');
                        itemLines.each(function(){
                        	var itemLine = $j(this),
                        		holder = itemLine.closest('.qode-item-showcase-holder'),
                        		height = holder.height() - holder.find('.qode-item').last().height();

                    		itemLine.css('height', height);
                    		itemLine.css('opacity', 1);
                        });
	                    thisItemShowcase.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
	                        function(e) {
	                            if($window_width > 1200) {
	                                itemAppear('.qode-holder-left .qode-item');
	                                itemAppear('.qode-holder-right .qode-item');
	                            } else {
	                                itemAppear('.qode-item');
	                            }
	                        });
	                });
	            },100);

	            //appear animation trigger
	            function itemAppear(itemCSSClass) {
	                thisItemShowcase.find(itemCSSClass).each(function(i){
	                    var thisListItem = $j(this);
	                    setTimeout(function(){
	                        thisListItem.addClass('qode-appeared');
	                    }, i*150);
	                });
	            }
	        } else {
        	    itemLines.each(function(){
        	    	var itemLine = $j(this),
        	    		holder = itemLine.closest('.qode-item-showcase-holder'),
        	    		height = holder.height() - holder.find('.qode-item').last().height();

        			itemLine.css('height', height);
        			itemLine.css('opacity', 1);
        	    });
	        }
        });

    }
}

/*
*	Item Showcase shortcode - End
*/

/*
*	Call To Action Section shortcode - Start
*/
var qodeCTASection = function() {
 	"use strict";

	var ctaSections = $j('.qode-cta-section');

	var ctaSectionAnimation = function() {
		ctaSections.each(function(){
			var ctaSection = $j(this),
				ctaImage = ctaSection.find('img'),
				ctaText = ctaSection.find('.qode-cta-section-text-wrapper');

			if (!$j('html').hasClass('touch') && ctaSection.hasClass('qode-cta-appear-effect')) {
				var ctaAppear = function(ctaItem) {
					ctaItem.appear(function(){
						setTimeout(function(){
							ctaItem.addClass('qode-appeared');
						},30);
		            }, {accX: 0, accY: -($window_height / 3)});
				}

				ctaAppear(ctaImage);
				ctaAppear(ctaText);
			}
		});
	}
	return {
	    init: function(){
	        if (ctaSections.length) {
	            ctaSectionAnimation();
	        }
	    }
	};
}

/*
*	Call To Action Section shortcode - End
*/

/*
 **	Init Preview Slider - Start
 */

function initPreviewSlider() {
	"use strict";

	var sliders = $j('.qode-preview-slider');
	sliders.each(function() {
		var slider = $j(this);
		var main_slider = slider.find('.qode-presl-main-slider');
		var small_slider_holder = slider.find('.qode-presl-small-slider-holder');
		var small_slider = small_slider_holder.find('.qode-presl-small-slider');
		var slide_timeout = 5000;
		var slide_transition = 700;

		main_slider.find('.qode-presl-link.small').each(function(i) {
			$j('<li><div class="qode-presl-small-item"><div class="qode-presl-main-item-inner"></div></div></li>')
			.appendTo(small_slider.find('> .slides'))
			.find('.qode-presl-main-item-inner')
			.append($j(this));
		});

		main_slider.flexslider({
			animation: "slide",
			animationSpeed: slide_transition,
			slideshow: true,
			slideshowSpeed: slide_timeout,
			useCSS: true,
			touch: true,
			autostart: false,
			directionNav: true,
			controlNav: true,
            prevText: '<i class="icon-arrows-left"></i>', //'<span class="arrow_carrot-left"></span>',
            nextText: '<i class="icon-arrows-right"></i>', //'<span class="arrow_carrot-right"></span>',
			start: function(slider) {
				slider.find('.qode-presl-main-item').css({
					'opacity': '1',
					'filter': 'alpha(opacity=100)'
				}).find('img').addClass('visible');
			},
			before: function(slider) {
				var target = slider.animatingTo;
				var current = slider.currentSlide;

				if (target==0) {
					slider.find('.slides li:first-child').next().next().clone().appendTo(slider.find('.slides')).removeClass('clone').addClass('clone_end');
				}
				else if (target==slider.count-1) {
					slider.find('.slides li:last-child').prev().prev().clone().appendTo(slider.find('.slides')).removeClass('clone').addClass('clone_start');
				}

				if (target==0 && current==slider.count-1 && slider.direction=='next') {
					small_slider.flexslider('next');
				}
				else if (target==slider.count-1 && current==0 && slider.direction=='prev') {
					small_slider.flexslider('prev');
				}
				else {
					small_slider.find('.flex-control-nav a').eq(target).trigger("click");
				}

				slider.find('.flex-direction-nav').addClass('moving');
			},
			after: function(slider) {
				slider.removeClass('control-initiated direction-initiated');
				slider.find('.clone_start, .clone_end').remove();
				slider.find('.flex-direction-nav').removeClass('moving');
			}
		});

		small_slider.flexslider({
			animation: "slide",
			animationSpeed: slide_transition,
			animationLoop: true,
			useCSS: true,
			touch: false,
			slideshow: false,
			directionNav: false,
			controlNav: true,
			start: function(slider) {
				slider.find('img').addClass('visible');
				slider.closest('.qode-presl-small-slider-holder').find('.qode-presl-phone').addClass('visible');
			}
		});
	});
}

/*
 **	Init Preview Slider - End
 */

var getIEversion = function() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape') {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
};

/*
 **	Init In-Device Slider - Start
 */

function initInDeviceSlider() {
	"use strict";

	var sliders = $j('.qode-in-device-slider');
	sliders.each(function() {
		var slider = $j(this).find('.qode-ids-slider');
		var navigation = slider.data('navigation') == 'yes' ? true : false;
		var auto_start = slider.data('auto-start') == 'yes' ? true : false;
		var slide_timeout = auto_start ? slider.data('timeout') : 0;
		var is_in_marquee = slider.closest('.qode-horizontal-marquee').length ? true : false;

		var IEver = getIEversion();
		if (IEver > 0) {
			slider.addClass('qode-ids-ie-specific');
		}

		slider.flexslider({
			animation: "slide",
			animationSpeed: 700,
			animationLoop: true,
			useCSS: true,
			touch: !is_in_marquee,
			slideshow: auto_start,
			slideshowSpeed: slide_timeout,
			directionNav: navigation,
			controlNav: false,
            prevText: '<i class="icon-arrows-left"></i>',
            nextText: '<i class="icon-arrows-right"></i>',
			start: function(slider) {
				slider.find('img').addClass('visible');
				slider.closest('.qode-ids-slider-holder').find('.qode-ids-frame').addClass('visible');
				if (slider.is('.qode-ids-titles-on-hover')) {
					slider.hover(
						function() {
							$j(this).find('.qode-ids-link').addClass('hovered');
						},
						function() {
							$j(this).find('.qode-ids-link').removeClass('hovered');
						}
					);
				}
			}
		});

		if (is_in_marquee) {
			var dragStart, clickable = false;

			var handleDragStart = function(event) {
				event = typeof event.originalEvent !== 'undefined' ? event.originalEvent : event;
				event = event.type == 'touchstart' ? event.touches[0] : event;
				dragStart = {
					x: event.clientX,
					y: event.clientY
				};
			};

			var handleDragStop = function(event) {
				event = typeof event.originalEvent !== 'undefined' ? event.originalEvent : event;
				event = event.type == 'touchend' ? event.changedTouches[0] : event;
				var dragEnd = {
					x: event.clientX,
					y: event.clientY
				};
				if (Math.abs(dragEnd.x - dragStart.x) < 10) {
					clickable = true;
				}
			};

			var handleClick = function(event) {
				if (clickable) {
					clickable = false;
				}
				else {
					event.preventDefault();
				}
			};

			slider.find('.qode-ids-link')
			.on('dragstart', function(event) {
				event.preventDefault();
			})
			.on('click', handleClick)
			.on('mousedown touchstart', handleDragStart)
			.on('mouseup touchend', handleDragStop);
		}
	});
}

/*
 **	Init In-Device Slider - End
 */

function checkSVG(element) {
    "use strict";

    var el = element.find('.active .qode_slide-svg-holder');
    var drawing_enabled = el.data('svg-drawing');

    if (drawing_enabled === 'yes') {
        drawSVG(el);
    }
}

/**
 * Function for drawing slider svgs. Based on Codrops article 'SVG Drawing Animation'
 */
function drawSVG(svg){
    "use strict";
    var svgs = Array.prototype.slice.call( svg.find('svg') ),
        svgArr = [],
        resizeTimeout;
    // the svgs already shown...
    svgs.forEach( function( el, i ) {
        var svg = new SVGEl( el );
        svgArr[i] = svg;
        setTimeout(function( el ) {
            return function() {
                svg.render();
            };
        }( el ), 0 );//0ms pause before drawing
    } );
}
var docElem = window.document.documentElement;
window.requestAnimFrame = function(){
    return (
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(/* function */ callback){
        window.setTimeout(callback, 1000 / 60);
    }
    );
}();
window.cancelAnimFrame = function(){
    return (
    window.cancelAnimationFrame       ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame    ||
    window.oCancelAnimationFrame      ||
    window.msCancelAnimationFrame     ||
    function(id){
        window.clearTimeout(id);
    }
    );
}();
function SVGEl( el ) {
    this.el = el;
    var frameRate = $j(this.el).closest('.qode_slide-svg-holder').data('svg-frames');
    this.image = this.el.previousElementSibling;
    this.current_frame = 0;
    this.total_frames = frameRate;//number of frames defines speed of drawing
    this.path = [];
    this.length = [];
    this.handle = 0;
    this.init();
}
SVGEl.prototype.init = function() {
    var self = this;
    [].slice.call( this.el.querySelectorAll( 'path' ) ).forEach( function( path, i ) {
        self.path[i] = path;
        var l = self.path[i].getTotalLength();
        self.length[i] = l;
        self.path[i].style.strokeDasharray = l + ' ' + l;
        self.path[i].style.strokeDashoffset = l;
    } );
};
SVGEl.prototype.render = function() {
    if( this.rendered ) return;
    this.rendered = true;
    this.draw();
};
SVGEl.prototype.draw = function() {
    var self = this,
        progress = this.current_frame/this.total_frames;
    if (progress > 1) {
        window.cancelAnimFrame(this.handle);
    } else {
        this.current_frame++;
        for(var j=0, len = this.path.length; j<len;j++){
            this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
        }
        this.handle = window.requestAnimFrame(function() { self.draw(); });
    }
};

function initPageTitleAnimation(){
    "use strict";

    if($j('.title_outer').data('animation') === 'yes' && $j('.no-touch .title_outer').length > 0) {
        var skrollr_title = skrollr.init({
            edgeStrategy: 'set',
            smoothScrolling: false,
            forceHeight: false
        });
        skrollr_title.refresh();
    }
};

function initElementsHolderResponsiveStyle(){
    var elementsHolder = $j('.q_elements_holder');

    if(elementsHolder.length){
        elementsHolder.each(function() {
            var thisElementsHolder = $j(this),
                elementsHolderItem = thisElementsHolder.children('.q_elements_item'),
                style = '',
                responsiveStyle = '';

            elementsHolderItem.each(function() {
                var thisItem = $j(this),
                    itemClass = '',
                    largeLaptop = '',
                    smallLaptop = '',
                    ipadLandscape = '',
                    ipadPortrait = '',
                    mobileLandscape = '',
                    mobilePortrait = '';

                if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
                    itemClass = thisItem.data('item-class');
                }
                if (typeof thisItem.data('1280-1440') !== 'undefined' && thisItem.data('1280-1440') !== false) {
                    largeLaptop = thisItem.data('1280-1440');
                }
                if (typeof thisItem.data('1024-1280') !== 'undefined' && thisItem.data('1024-1280') !== false) {
                    smallLaptop = thisItem.data('1024-1280');
                }
                if (typeof thisItem.data('768-1024') !== 'undefined' && thisItem.data('768-1024') !== false) {
                    ipadLandscape = thisItem.data('768-1024');
                }
                if (typeof thisItem.data('600-768') !== 'undefined' && thisItem.data('600-768') !== false) {
                    ipadPortrait = thisItem.data('600-768');
                }
                if (typeof thisItem.data('480-600') !== 'undefined' && thisItem.data('480-600') !== false) {
                    mobileLandscape = thisItem.data('480-600');
                }
                if (typeof thisItem.data('480') !== 'undefined' && thisItem.data('480') !== false) {
                    mobilePortrait = thisItem.data('480');
                }

                if(largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {

                    if(largeLaptop.length) {
                        responsiveStyle += "@media only screen and (min-width: 1280px) and (max-width: 1440px) {.q_elements_item_content."+itemClass+" { padding: "+largeLaptop+" !important; } }";
                    }
                    if(smallLaptop.length) {
                        responsiveStyle += "@media only screen and (min-width: 1024px) and (max-width: 1280px) {.q_elements_item_content."+itemClass+" { padding: "+smallLaptop+" !important; } }";
                    }
                    if(ipadLandscape.length) {
                        responsiveStyle += "@media only screen and (min-width: 768px) and (max-width: 1024px) {.q_elements_item_content."+itemClass+" { padding: "+ipadLandscape+" !important; } }";
                    }
                    if(ipadPortrait.length) {
                        responsiveStyle += "@media only screen and (min-width: 680px) and (max-width: 768px) {.q_elements_item_content."+itemClass+" { padding: "+ipadPortrait+" !important; } }";
                    }
                    if(mobileLandscape.length) {
                        responsiveStyle += "@media only screen and (min-width: 480px) and (max-width: 680px) {.q_elements_item_content."+itemClass+" { padding: "+mobileLandscape+" !important; } }";
                    }
                    if(mobilePortrait.length) {
                        responsiveStyle += "@media only screen and (max-width: 480px) {.q_elements_item_content."+itemClass+" { padding: "+mobilePortrait+" !important; } }";
                    }
                }

                /*if (typeof qodef.modules.common.qodefOwlSlider === "function") { // if owl function exist
                    var owl = thisItem.find('.qodef-owl-slider');
                    if (owl.length) { // if owl is in elements holder
                        setTimeout(function () {
                            owl.trigger('refresh.owl.carousel'); // reinit owl
                        }, 100);
                    }
                }*/

            });

            if(responsiveStyle.length) {
                style = '<style type="text/css">'+responsiveStyle+'</style>';
            }

            if(style.length) {
                $j('head').append(style);
            }

        });
    }
}

function initQodeElementAnimationSkrollr() {
    "use strict";
    if($j('.no-touch .carousel').length === 0) {

        var elementItemAnimation = $j('.no-touch .q_elements_holder > .q_elements_item');
        elementItemAnimation.each(function(){

            if((typeof($j(this).data('animation')) !== 'undefined' || typeof($j('.title_outer').data('animation')) !== 'undefined') && $j(this).data('animation') === 'yes') {
                var skr = skrollr.init({
                	edgeStrategy: 'set',
                	smoothScrolling: false,
                	forceHeight: false
                });
                skr.refresh();
            }

        });
    }

};

function initIconShortcodeHover() {
    "use strict";

    if($j('.qode_icon_shortcode').length) {

        $j('.qode_icon_shortcode').each(function() {
            //check if icon type is circle of square
            if(typeof $j(this).data('type') !== 'undefined' && ['circle', 'square'].indexOf($j(this).data('type')) != -1) {

                if(typeof $j(this).data('hover-bg-color') !== 'undefined') {
                    if($j(this).data('type') == 'circle') {
                        var elementToHover = $j(this).find('i').first();
                        var hoverBgColor = $j(this).data('hover-bg-color');
                        var initialStyle = elementToHover.attr('style');

                        $j(this).hover(function() {
                            elementToHover.attr('style', initialStyle + 'color: ' + hoverBgColor + '!important');
                        }, function() {
                            elementToHover.attr('style', initialStyle);
                        });
                    } else {
                        var hoverBgColor = $j(this).data('hover-bg-color');
                        var initialBgColor = $j(this).css('background-color');

                        $j(this).hover(function() {
                            $j(this).css('background-color', hoverBgColor);
                        }, function() {
                            $j(this).css('background-color', initialBgColor);
                        });
                    }
                }
            }

            if(typeof $j(this).data('hover-icon-color') !== 'undefined') {
                var hoverColor = $j(this).data('hover-icon-color');
                var initialColor = $j(this).find('.qode_icon_element ').css('color');

                $j(this).hover(function() {
                    $j(this).find('.qode_icon_element ').css('color', hoverColor);
                }, function() {
                    $j(this).find('.qode_icon_element ').css('color', initialColor);
                });
            }
        });
    }
}

/**
 * Object that represents icon shortcode
 * @returns {{init: Function}} function that initializes icon's functionality
 */
var qodeIcon = function() {
	//get all icons on page
	var icons = $j('.qode-icon-holder');


	/**
	 * Function that triggers icon hover color functionality
	 */
	var iconHoverColor = function(icon) {
		if(typeof icon.data('hover-color') !== 'undefined') {
			var changeIconColor = function(event) {
				event.data.icon.css('color', event.data.color);
			};

			var iconElement = icon.find('.qode-icon-element');
			var hoverColor = icon.data('hover-color');
			var originalColor = iconElement.css('color');

			if(hoverColor !== '') {
				if(icon.parents('.qode-start-icon-hover').length){
					icon.parents('.qode-start-icon-hover').on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.parents('.qode-start-icon-hover').on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				} else {
					icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				}
			}
		}
	};

	/**
	 * Function that triggers icon holder background color hover functionality
	 */
	var iconHolderBackgroundHover = function(icon) {
		if(typeof icon.data('hover-background-color') !== 'undefined') {
			var changeIconBgColor = function(event) {
				event.data.icon.css('background-color', event.data.color);
			};

			var hoverBackgroundColor = icon.data('hover-background-color');
			var originalBackgroundColor = icon.css('background-color');

			if(hoverBackgroundColor !== '') {
				if(icon.parents('.qode-start-icon-hover').length){
					icon.parents('.qode-start-icon-hover').on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
					icon.parents('.qode-start-icon-hover').on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
				} else {
					icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
					icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
				}
			}
		}
	};

	return {
		init: function() {
			if(icons.length) {
				icons.each(function() {
					iconHoverColor($j(this));
					iconHolderBackgroundHover($j(this));
				});

			}
		}
	};
};

function initIconWithTextHover() {
    "use strict";

    if($j('.qode_iwt_icon_holder').length) {
        $j('.qode_iwt_icon_holder').each(function() {
            if(typeof $j(this).data('icon-hover-bg-color') !== 'undefined') {
                var hoverBgColor = $j(this).data('icon-hover-bg-color');
                var initialBgColor = $j(this).css('background-color');

                $j(this).hover(function() {
                    $j(this).css('background-color', hoverBgColor);
                }, function() {
                    $j(this).css('background-color', initialBgColor);
                });
            }

            if(typeof $j(this).data('icon-hover-color') !== 'undefined') {
                var elementToChange = $j(this).find('.qode_iwt_icon_element');
                var hoverColor = $j(this).data('icon-hover-color');
                var initialColor = elementToChange.css('color');

                $j(this).hover(function() {
                    elementToChange.css('color', hoverColor);
                }, function() {
                    elementToChange.css('color', initialColor);
                });
            }
        });
    }
}

function initLoadNextPostOnBottom(){
	"use strict";

	if($j('.blog_vertical_loop').length) {
		var header_addition;
		var normal_header_addition;
		var paspartu_add = $j('body').hasClass('paspartu_enabled') ? Math.round($window_width*paspartu_width) : 0;

		if($j('header.page_header').hasClass('transparent')) {
			normal_header_addition = 0;
		}else{
			normal_header_addition = header_height;
		}

		var click = true;

		var $container = $j('.blog_vertical_loop .blog_holder');
		$j(document).on('click','.blog_vertical_loop_button a',function(e){
			e.preventDefault();
			if(click){
				click = false;
				var $this = $j(this);

				var link = $this.attr('href');
				var $content = '.blog_vertical_loop .blog_holder';
				var $anchor = '.blog_vertical_loop_button_holder a';
				var $next_href = $j($anchor).attr('href');

				//check for mobile header
				if($window_width < 1000){
					header_addition = $j('header.page_header').height();
				}else{
					header_addition = normal_header_addition;
				}

				var scrollTop = $j(window).scrollTop(),
					elementOffset = $this.closest('article').offset().top,
					distance = (elementOffset - scrollTop) - header_addition - paspartu_add;

				$container.find('article:eq(1)').addClass('fade_out');
				$this.closest('article').addClass('move_up').removeClass('next_post').css('transform', 'translateY(-' + distance + 'px)');
				setTimeout(function () {
					$j(window).scrollTop(0);
					$container.find('article:eq(0)').remove();
					$container.find('article:eq(0)').addClass('previous_post');
					$this.closest('article').removeAttr('style').removeClass('move_up');
				}, 450);


				$j.get(link + '', function (data) {
					var $new_content = $j(data).find('article').addClass('next_post');
					$next_href = $j($anchor, data).attr('href');
					$container.append($j($new_content));
					click = true;
				});
			}
			else{
				return false;
			}
		});

		$j(document).on('click','.blog_vertical_loop_back_button a',function(e){
			e.preventDefault();
			if(click){
				click = false;
				var $this = $j(this);

				var link = $this.attr('href');
				var $content = '.blog_vertical_loop .blog_holder';
				var $anchor = '.blog_vertical_loop_button_holder.prev_post a';
				var $prev_href = $j($anchor).attr('href');

				$container.find('article:eq(0)').removeClass('fade_out').addClass('fade_in');
				$this.closest('article').addClass('move_up').css('transform', 'translateY(' + $window_height + 'px)');
				setTimeout(function () {
					$container.find('article:last-child').remove();
					$container.find('article:eq(0)').removeClass('previous_post fade_in');
					$this.closest('article').addClass('next_post').removeAttr('style').removeClass('move_up');

					$j.get(link + '', function (data) {
						var $new_content = $j(data).find('article').removeClass('next_post').addClass('previous_post'); //by default, posts have next_post class
						$prev_href = $j($anchor, data).attr('href');
						$container.prepend($j($new_content));
						click = true;
					});

				}, 450);

			}else{
				return false;
			}

		});

		//load previous post on page load
		$j.get($j('.blog_vertical_loop_button_holder .last_page a').attr('href') + '', function (data) {
			var $new_content = $j(data).find('article').removeClass('next_post').addClass('previous_post'); //by default, posts have next_post class
			$container.prepend($j($new_content));
		});
		//load next post on page load
		$j.get($j('.blog_vertical_loop_button a').attr('href') + '', function (data) {
			var $new_content = $j(data).find('article').addClass('next_post');
			$container.append($j($new_content));
		});
	}
}

/*
 Parallax Layers plugin
 */

(function ( $ ) {
    "use strict";

    $.fn.extend({

        mouseParallax: function(options) {

            var defaults = { moveFactor: 1.5, targetContainer: this };

            var options = $.extend(defaults, options);

            return this.each(function() {
                var o = options;
                var layer_elements = $(o.targetContainer).find('.image, .paralax_layers_content_holder');

                layer_elements.each(function(i){
                    $(this).css('z-index',i);
                });

                var mouseXStart;
                var mouseYStart;

                mouseXStart = $(o.targetContainer).offset().left;
                mouseYStart = $(o.targetContainer).offset().top;

                $(o.targetContainer).on('mouseenter',function(e){
                    mouseXStart = e.pageX - $(this).offset().left;
                    mouseYStart = e.pageY - $(this).offset().top;
                });

                $(o.targetContainer).on('mousemove', function(e){

                    var mouseX0 = $(this).offset().left + mouseXStart;
                    var mouseY0 = $(this).offset().top + mouseYStart;

                    var mouseX = e.pageX - mouseX0;
                    var mouseY = e.pageY - mouseY0;

                    layer_elements.each(function(i){
                        $(this).css({
                            marginLeft : -mouseX / 100 * o.moveFactor*(i+1),
                            marginTop : -mouseY / 100 * o.moveFactor*(i+1)
                        },100);
                    });
                });
                var config = {
                    interval: 0,
                    over: function(){},
                    timeout: 500,
                    out: function(){
                        layer_elements.each(function(i){
                            $(this).stop().animate({
                                marginLeft: 0,
                                marginTop: 0
                            },300);
                        });
                    }
                };

                $(o.targetContainer).hoverIntent(config);

            });
        }


    });
} (jQuery) );

/**
 * Initialize parallax layers function
 */

function setParallaxLayersHeight($this, $def_height){
    "use strict";

    var parallax_layers_height = $def_height;
    var responsive_breakpoint_set = [1600,1300,1000,768,567,320];
    if($window_width > responsive_breakpoint_set[0]){
        parallax_layers_height = $def_height;
    }else if($window_width > responsive_breakpoint_set[1]){
        parallax_layers_height = $def_height * 0.75;
    }else if($window_width > responsive_breakpoint_set[2]){
        parallax_layers_height = $def_height * 0.6;
    }else if($window_width > responsive_breakpoint_set[3]){
        parallax_layers_height = $def_height * 0.55;
    }else if($window_width <= responsive_breakpoint_set[3]){
        parallax_layers_height = $def_height * 0.45;
    }

    $this.css({'height': (parallax_layers_height) + 'px'});
}

function parallaxLayers(){
    "use strict";

    if($j('.qode_parallax_layers').length){

        $j(".qode_parallax_layers").each(function(){

            var $this = $j(this);
            if($j(this).hasClass('full_screen_height')){
                $this.height($window_height);
                $j(window).resize(function () {
                    $this.height($window_height);
                });
            }else{
                var $def_height = $j(this).data('height');
                setParallaxLayersHeight($this, $def_height);
                $j(window).resize(function () {
                    setParallaxLayersHeight($this, $def_height);
                });
            }

            var $parallax_layers_holder = $this.find('.qode_parallax_layers_holder');
            var counter = 0;
            var limit = $this.find(".image").length;
            $this.find(".image").each(function() {

                var $this = $j(this);
                if($this.css("background-image") != "" && $this.css("background-image") != "none") {

                    var bg_url = $this.attr('style');

                    bg_url = bg_url.match(/url\(["']?([^'")]+)['"]?\)/);
                    bg_url = bg_url ? bg_url[1] : "";
                    if (bg_url) {
                        var backImg = new Image();
                        backImg.src = bg_url;
                        $j(backImg).load(function(){
                            counter++;
                            if(counter == limit){
                                $parallax_layers_holder.removeClass('preload_parallax_layers');
                                if($j('html').hasClass('no-touch')){$parallax_layers_holder.mouseParallax()};
                            }
                        });
                    }
                }
            });
        });

    }
}

function alterWPMLSwitcherHeaderBottom() {
	"use strict";

	if($j('.header_bottom .main_menu li.menu-item-language').length) {
		var langDropdown = $j('.header_bottom .main_menu .menu-item-language').find('.submenu-languages');

		if(typeof langDropdown !== 'undefined') {
			langDropdown.parent('li').addClass('narrow');
			langDropdown.wrap('<div class="second"><div class="inner"></div></div>');
			langDropdown.show();
		}
	}

	if($j('.header_bottom .mobile_menu li.menu-item-language').length) {
		var langDropdown = $j('.header_bottom .mobile_menu .menu-item-language').find('.submenu-languages');

		if(typeof langDropdown !== 'undefined') {
			langDropdown.parent('li').addClass('has_sub');
			langDropdown.prev('a').after('<span class="mobile_arrow"><i class="fa fa-angle-right"></i><i class="fa fa-angle-down"></i></span>');
			langDropdown.addClass('sub_menu');
		}

	}
}

/*
 **	Init flexslider for portfolio single
 */
function initContentSlider(){
    "use strict";
    $j('.qode_content_slider').each(function(){
        var $this = $j(this);

        var interval = 8000;
        if(typeof $this.data('interval') !== 'undefined' && $this.data('interval') !== false) {
            interval = parseFloat($this.data('interval')) * 1000;
        }

        var directionNav = false;
        if(typeof $this.data('direction') !== 'undefined') {
            directionNav = $this.data('direction');
        }

        var controlNav = false;
        if(typeof $this.data('control') !== 'undefined'){
            controlNav = $this.data('control');
        }

        var pauseOnHoverAction = false;
        if(typeof $this.data('pause-on-hover') !== 'undefined'){
            pauseOnHoverAction = $this.data('pause-on-hover');
        }

        var enableDrag = false;
        if(typeof $this.data('drag') !== 'undefined'){
            enableDrag = $this.data('drag');
        }

        var slideshow = true;
        if(interval === 0) {
            slideshow = false;
        }

        var animation = 'slide';
        if(typeof $this.data('flex_fx') !== 'undefined' && $this.data('flex_fx') !== false) {
            animation = $this.data('flex_fx');
        }

        var smoothHeight = false;
        if($this.find('.qode-lazy-image').length) {
        	smoothHeight = true;
        }

        $this.flexslider({
            selector: '.qode_content_slider_inner > .qode_content_slider_item',
            animationLoop: true,
            controlNav: controlNav,
            directionNav: directionNav,
            useCSS: false,
            pauseOnAction: pauseOnHoverAction,
            pauseOnHover: pauseOnHoverAction,
            slideshow: slideshow,
            animation: animation,
            prevText: "<div><i class='fa fa-angle-left'></i></div>",
            nextText: "<div><i class='fa fa-angle-right'></i></div>",
            animationSpeed: 600,
            slideshowSpeed: interval,
            touch: true,
            smoothHeight: smoothHeight,
            start: function() {
            	lazyReload($this);
            },
            after: function() {
            	lazyReload($this);
            }
        });

        var lazyReload = function(slider) {
        	if($this.find('.qode-lazy-image').length) {
        		qodeLazyImages();
        	}
        }

        $this.find('.flex-direction-nav a').on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
        });

        if(enableDrag) {
            $this.swipe({
                swipeLeft: function () { $this.flexslider('next'); },
                swipeRight: function () { $this.flexslider('prev'); },
                threshold: 20
            });
        }

        if ($this.hasClass('control_nav_justified')) {
        	var justifyBullets = function(slider) {

		        var bullets = $this.find('ol');

		        bullets.addClass('qode-type1-gradient-left-to-right-after');

		        if ($window_width > 1440) {
					bullets.css('max-width',qode_grid_width);
				} else {
					bullets.css('max-width', Math.round($this.outerWidth()*0.8));
				}

	        	var listItems = bullets.find('li'),
	        		listItemsWidth = listItems.outerWidth(),
	        		listWidth = parseInt(bullets.css('max-width')),
	        		remainingWidth = listWidth - listItemsWidth*listItems.length,
	        		space = (Math.floor(remainingWidth / listItems.length));

	    	    listItems.css('margin-right', space);
	    	    listItems.last().css('margin-right', 0);
    		}

    		justifyBullets($this);

    		$j(window).resize(function(){
	    		justifyBullets($this);
    		});
        }

    });
}

/*
 **  Init sticky sidebar widget
 */
function qodeInitStickyWidget() {

    var stickyWidgets = $j('.qode-widget-sticky-sidebar');
    if ( stickyWidgets.length && $window_width > 1000 ) {

        var header = $j('header.page_header');
        sticky_amount = getScrollAmountForStickyHeader();

        stickyWidgets.each(function(){
            var widget = $j(this),
                parent =  '.full_section_inner, .section_inner, .two_columns_75_25, .two_columns_25_75, .two_columns_66_33, .two_columns_33_66, .elementor-row',
                stickyHeight = 0,
                widgetOffset = widget.offset().top;


            if (widget.parent('aside.sidebar').length) {
                var sidebar = widget.parents('aside.sidebar');
            } else if (widget.parents('.wpb_widgetised_column').length) {
                var sidebar = widget.parents('.wpb_widgetised_column');
                widget.closest('.wpb_column').css('position','static');
            } else if(widget.parents('.elementor-widget.elementor-widget-sidebar').length) {
                var sidebar = widget.parents('.elementor-widget.elementor-widget-sidebar');
			}

            var sidebarOffset = sidebar.offset().top;
            if(sticky_amount < sidebarOffset && (header.hasClass('stick') || header.hasClass('stick_with_left_right_menu'))){
                stickyHeight = min_header_height_sticky;
            }else if(header.hasClass('fixed')){
                stickyHeight = min_header_height_scroll + content_menu_top_add;
            }else if(header.hasClass('fixed_top_header')){
                stickyHeight = header_top_height;
            }else if(header.hasClass('fixed_hiding')){
                stickyHeight = min_header_height_fixed_hidden + 40; //2*20 for logo margin
            }else if(qode_window < 1000 || $j('.vertical_menu_enabled').length > 0){ //for mobile and verical header
                stickyHeight = 0;
            }else{
                stickyHeight = 0;
            }

            var offset = -(widgetOffset-sidebarOffset-stickyHeight-10); //10 is to push down from browser top edge

            sidebar.stick_in_parent({
                parent: parent,
                sticky_class : 'qode-sticky-sidebar',
                inner_scrolling : false,
                offset_top: offset
            }).on("sticky_kit:bottom", function() { //check if sticky sidebar have hit the bottom and use that class for pull it down when sticky header appears
                sidebar.addClass('qode-sticky-sidebar-on-bottom');
            }).on("sticky_kit:unbottom", function() {
                sidebar.removeClass('qode-sticky-sidebar-on-bottom');
            });

            $j(window).scroll(function(){
                if ($window_width >= 1000) {
                    if (sticky_amount > sidebarOffset && header.hasClass('sticky') && sidebar.hasClass('qode-sticky-sidebar') && !sidebar.hasClass('qode-sticky-sidebar-on-bottom')) {
                        sidebar.css('-webkit-transform', 'translateY('+min_header_height_sticky+'px)');
                        sidebar.css('transform', 'translateY('+min_header_height_sticky+'px)');
                    } else {
                        sidebar.css('-webkit-transform', 'translateY(0px)');
                        sidebar.css('transform', 'translateY(0px)');
                    }
                }
            });

        });
    }

}

function qodeBlogGalleryAnimation() {
	var blogGalleries = $j('.blog_holder.blog_gallery');
	if (blogGalleries.length) {
		blogGalleries.each(function(){
			var blogGallery = $j(this),
				articles = blogGallery.find('article');

				articles.each(function(){
					var article = $j(this),
						excerpt = article.find('.post_excerpt'),
						excerptHeight = parseInt(excerpt.outerHeight(true)),
						category = article.find('.post_category'),
						title = article.find('.entry_title');

					category.css({'transform':'translateY('+excerptHeight+'px)'});
					title.css({'transform':'translateY('+excerptHeight+'px)'});

					article.mouseenter(function(){
						category.css({'transform':'translateY(0px)'});
						title.css({'transform':'translateY(0px)'});
						excerpt.css({'visibility':'visible','opacity':'1'});
					});
					article.mouseleave(function(){
						category.css({'transform':'translateY('+excerptHeight+'px)'});
						title.css({'transform':'translateY('+excerptHeight+'px)'});
						excerpt.css({'visibility':'hidden', 'opacity':'0'});
					});
				});
		});
	}
}

/**
 * Loads images that are set to be 'lazy'
 */
function qodeLazyImages() {
    $j.fn.preloader = function (action, callback) {
        if (!!action && action == 'destroy') {
            this.find('.qode-lazy-preloader').remove();
        } else {
            var block = $j('<div class="qode-lazy-preloader"></div>');
            $j('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="75" width="75" viewbox="0 0 75 75"><circle stroke-linecap="round" cx="37.5" cy="37.5" r="33.5" stroke-width="4"/></svg>').appendTo(block);
            block.appendTo(this);
            if(typeof callback == 'function')
                callback();
        }
        return this;
    };

    $j('.qode-lazy-image[data-image][data-lazy="true"]:not(.lazyLoading)').each(function(i, object) {
        object = $j(object);

        if(object.attr('data-ratio')) {
            object.height(object.width()*object.data('ratio'));

        }

        var rect = object[0].getBoundingClientRect(),
            vh = ($window_height || document.documentElement.clientHeight),
            vw = ($window_width || document.documentElement.clientWidth),
            oh = object.outerHeight(),
            ow = object.outerWidth();


        if(
            ( rect.top !=0 || rect.right !=0 || rect.bottom !=0 || rect.left !=0 ) &&
            ( rect.top >= 0 || rect.top + oh >= 0 ) &&
            ( rect.bottom >=0 && rect.bottom - oh - vh <= 0 ) &&
            ( rect.left >= 0 || rect.left + ow >= 0 ) &&
            ( rect.right >=0 && rect.right - ow - vw <= 0 )
        ) {


            var preloader = null;
            if(object.prop('tagName') == 'IMG') {
                preloader = object.parent();
            }   else {
                preloader = object;
            }

            if(!!preloader) {
                preloader.preloader('init');
            }
            object.addClass('lazyLoading');

            var imageObj = new Image();

            $j(imageObj).on('load', function() {

                preloader.preloader('destroy');
                object
                    .removeAttr('data-image')
                    .removeData('image')
                    .removeAttr('data-lazy')
                    .removeData('lazy')
                    .removeClass('lazyLoading');

                switch(object.prop('tagName')) {
                    case 'IMG':
                        object.attr('src', $j(this).attr('src'));
                        object.height('auto');
                        break;

                    case 'DIV':
                    default:
                        object.css('background-image', 'url(' + $j(this).attr('src') + ')');
                        break;
                }

            }).attr('src', object.data('image'));
        }
    });
}

/**
 * Cards Slider shortcode
 */
var qodeCardsSlider = function () {

    var handleMovement = function (slides, slider, curSlideId, newSlideId, newSlide, centerSlider) {
        slider.data('card-slide', newSlideId).attr('data-card-slide', newSlideId);
        slider.find('.qode-card-slider').css('margin-left', centerSlider ? (-newSlide.position().left + $j(slider).outerWidth() / 2 - newSlide.outerWidth() / 2) : -newSlide.position().left);

        setTimeout(function(){
            qodeLazyImages();
        },500); //500 is duration of margin animation

        var direction = curSlideId < newSlideId ? 1 : -1;

        if (direction > 0 && newSlideId == slides.length) {
            slider.find('.button[data-direction="next"]').addClass('hidden');
        } else {
            slider.find('.button[data-direction="next"]').removeClass('hidden');
        }
        if (direction < 0 && newSlideId == 1) {
            slider.find('.button[data-direction="prev"]').addClass('hidden');
        } else {
            slider.find('.button[data-direction="prev"]').removeClass('hidden');
        }
    }

    var setSliderToCenter = function(slider,activeMiddleSlide,centerSlider){
        slider.each(function (i, slider) {
            var slides = $j(slider).find('.qode-card-slider > .slide'),
                dots = $j(slider).find('.dot'),
                center = Math.round(slides.length / 2) - 1;

            if(activeMiddleSlide) {
                if (dots.length > 0) {
                    $j(dots[center]).trigger("click");
                } else {
                    handleMovement(slides,$j(slider),1,center,$j(slides[center]),centerSlider);
                }
                $j(slider).data('card-slide', center + 1).attr('data-card-slide', center + 1);
                $j(slider).find('.button').removeClass('hidden');
            }else{
                if (dots.length > 0) {
                    $j(dots[0]).trigger("click");
                } else {
                    handleMovement(slides,$j(slider),1,1,$j(slides[0]),centerSlider);
                }
            }
        })
    }

    //set max width of slides
    var maxWidthOfSlides = function (slides,slider,autoheight) {
        slider.find('.qode-card-slider').width(99999);
        slides.each(function(){
            $j(this).css('max-width',slider.outerWidth());
            //if(autoheight == true) {
            //    $j(this).find('img').css('height', 'auto');
            //}
        });
    }

    //initialize card headers
    var initCardHeaders = function() {

        var headers = $j('.cards');
        headers.each(function () {
            var header = $j(this);
            var cards = header.find('.card');
            cards.each(function() {
                var card = $j(this);
                card.on('click', function () {
                    if (!cards.last().is(card)) {
                        card.detach();
                        card.insertAfter(cards.last());
                        cards = header.find('.card');
                    }
                    return false;
                })
            });
        });
    }

    //initialize card headers hover animation
    var initCardsHeadersHoverAnimation = function(){
        var headers = $j('.cards');
        headers.each(function () {
            var header = $j(this);
            var cards = header.find('.card').get().reverse();
            header.appear(function () {
                $j(cards).each(function (i) {
                    var card = $j(this);
                    setTimeout(function () {
                        card.addClass('hovered');
                        setTimeout(function () {
                            card.removeClass('hovered');
                        }, 600);
                    }, 200 * i);

                });
            }, {accX: 0, accY: -($window_height / 3)});
        });
    }

    //initialize card panes changing
    var initCardPanes = function() {
        $j('.qode-cards-holder .card').each(function (i, card) {
            $j(card).on('click', function () {
                var pane = $j('.'+$j(card).data('value'));
                pane.closest('.qode-card-panes').find('.pane').removeClass('active');
                pane.addClass('active');
                qodeLazyImages();
                return false;
            })
        });

        $j('.qode-cards-holder').each(function(i, holder){
            $j(holder).find('.qode-card-panes .pane').last().addClass('active'); //set last slider as active
            //replace cards headers in right place
            if($j(holder).find('.qode-card-panes .pane .card').length) {
                $j(holder).find('.qode-card-panes .pane .card').each(function (i, card) {
                    $j(card).detach();
                    $j(holder).find('.qode-cards-header').append($j(card));
                });
            }else{
                $j(holder).find('.qode-cards-header').remove();
            }
        });
    }

    //set height of slider
    var setHeightOfSlider = function(){
        $j('.qode-card-panes').each(function() {
            var $this = $j(this);
            var maxHeight = -1;
            var element_height = $this.find('.pane').height();
            maxHeight = maxHeight > element_height ? maxHeight : element_height;
            $this.height(maxHeight);
        });
    }

    //set swipe functionality on all sliders
    var setSwipeFunctionality = function(slider){
        slider.swipe({
            swipeLeft: function () {
                slider.find('.button[data-direction="next"]').trigger("click");
            },
            swipeRight: function () {
                slider.find('.button[data-direction="prev"]').trigger("click");
            },
            threshold: 20
        });
    }


    //initialize sliders in every pane
    var initiateSliders = function() {
        $j('.qode-card-slider-holder').each(function (i, slider) {
            var slides = $j(slider).find('.qode-card-slider > .slide'),
                activeMiddleSlide = $j(slider).data('active-middle-slide'),
                centerSlider = $j(slider).data('center');

            //handle navigation arros click
            $j(slider).find('.button').each(function (i, button) {
                $j(button).on('click', function () {
                    var direction = $j(button).data('direction') == 'prev' ? -1 : 1,
                        curSlideId = $j(slider).data('card-slide'),
                        newSlideId = $j(slider).data('card-slide') + direction,
                        newSlide = $j(slider).find('.slide[data-card-slide="' + newSlideId + '"]');

                    if (newSlide.length) {
                        handleMovement(slides, $j(slider), curSlideId, newSlideId, newSlide, centerSlider);
                        $j(slider).find('.dot').removeClass('active').filter('[data-card-slide="' + newSlideId + '"]').addClass('active');
                    }
                    return false;
                });
            });

            //handle navigation bullets click
            $j(slider).find('.dot').each(function (i, dot) {
                $j(dot).on('click', function () {
                    $j(slider).find('.dot').removeClass('active');
                    $j(dot).addClass('active');
                    var curSlideId = $j(slider).data('card-slide'),
                        newSlideId = $j(dot).data('card-slide'),
                        newSlide = $j(slider).find('.slide[data-card-slide="' + newSlideId + '"]');
                    if (newSlide.length) {
                        handleMovement(slides, $j(slider), curSlideId, newSlideId, newSlide, centerSlider);
                    }
                    return false;
                });
            });


            /** 1. **/ maxWidthOfSlides(slides, $j(slider), false);
            /** 2. **/ setSliderToCenter($j(slider), activeMiddleSlide, centerSlider);
            /** 3. **/ setSwipeFunctionality($j(slider));
            $j(window).resize(function () {
                maxWidthOfSlides(slides, $j(slider), true);
                setSliderToCenter($j(slider), activeMiddleSlide, centerSlider);
                setHeightOfSlider();
            });
        });
    }


    return {
        init: function(){
            if ($j('.qode-card-slider-holder').length) {
                initiateSliders();
                setHeightOfSlider();
                initCardPanes();
                initCardHeaders();
            }
        },
        load: function(){
            if ($j('.qode-card-slider-holder').length) {
                setHeightOfSlider();
                initCardsHeadersHoverAnimation();
            }
        }
    };

}

/**
 * Cards Gallery shortcode
 */
function qodeCardsGallery() {
    if ($j('.qode-cards-gallery-holder').length) {
        $j('.qode-cards-gallery-holder').each(function(){
            var gallery = $j(this);
            var cards =  gallery.find('.card');
            var side = gallery.data('side');
            var marginValue;
            switch (side){
                case 'left':
                    marginValue = '0 0 0 20%';
                    break;
                case 'right':
                    marginValue = '0 20% 0 0';
                    break;
                case 'top':
                    marginValue = '20% 0 0 0';
                    break;
                case 'bottom':
                    marginValue = '0 0 20% 0';
                    break;
            }
            cards.each(function() {
                var card = $j(this);
                card.on('click', function () {
                    if (!cards.last().is(card)) {
                        card.addClass('out').animate({
                            opacity: 0,
                            margin: marginValue
                        },200,function(){
                            card.detach();
                            card.insertAfter(cards.last()).animate({
                                opacity: 1,
                                margin: '0'
                            },500,function(){
                                card.removeClass('out');
                            });
                            cards = gallery.find('.card');
                        });
                        return false;
                    }
                });
            });
        });
    }
}

/**
 * Init Elliptical slider shortcode
 */

function qodeInitEllipticalSlider(){

	var ellipticalSliders = $j('.qode-elliptical-slider');
	if(ellipticalSliders.length){
		ellipticalSliders.each(function(){

			var thisEllipticalSlider = $j(this);
			var animationSelector = $j('.qode-elliptical-slider > .qode-elliptical-slider-slides');

			var interval = 5000;
			var controlNav = true;
			var directionNav = false;
			var animationSpeed = 600;
			var autoplay = false;
			if(typeof animationSelector.data('animation-speed') !== 'undefined' && animationSelector.data('animation-speed') !== false) {
				animationSpeed = animationSelector.data('animation-speed');
			}

			if(animationSelector.data('autoplay') == 'yes') {
				autoplay = true;
			}

			thisEllipticalSlider.flexslider({
				selector: ".qode-elliptical-slider-slides > .qode-elliptical-slide",
				animationLoop: true,
				controlNav: controlNav,
				directionNav: directionNav,
				useCSS: false,
				pauseOnAction: true,
				pauseOnHover: true,
				slideshow: autoplay,
				animationSpeed: animationSpeed,
				slideshowSpeed: interval,
				touch: true
			});
		});

	}

}

/**
 * Init Pricing calculator shortcode
 */

function qodeInitPricingCalculator(){

	var pricingCalculators = $j('.qode-pricing-calculator');
	if(pricingCalculators.length){
		pricingCalculators.each(function(){
			var pricingCalculator = $j(this);
			var pricingCalculatorItems = $j(this).find('.qode-pricing-calculator-item');
			var totalPrice = 0;

			pricingCalculatorItems.each(function(){
				var pricingCalculatorItem = $j(this);
				var itemPrice = pricingCalculatorItem.data('price');
				var itemInput = pricingCalculatorItem.find('input');

				if(itemInput.attr('checked')){
					totalPrice += itemPrice;
				}

				pricingCalculatorItem.on('change', function(e){
					if(itemInput.attr('checked')) {
						totalPrice += itemPrice;
					} else {
						totalPrice -= itemPrice;
					}
					pricingCalculator.find('.qode-pricing-calculator-total-price').text(totalPrice);
				});
			});
		});
	}

}

/**
 * Init Sliding Image Holder
 */

function qodeSlidingImageHolder() {
	var slidingImageHolder = $j('.qode-sliding-image-holder');

	if (slidingImageHolder.length) {
		slidingImageHolder.each(function(){
			var thisSlidingImageHolder = $j(this);

			//infinite scroll effect
			if (!$j('html').hasClass('touch')) {
				qodeRequestAnimationFrame();

				var images = thisSlidingImageHolder.find('.qode-sliding-image-background-image'),
					imageWidth = Math.round(images.width());

				if (imageWidth == 0){
					imageWidth = 1920;
				}

				thisSlidingImageHolder.find('.qode-aux-background-image').css('left', imageWidth); //set to the right of initial image

				images.each(function(i){
					var image = $j(this),
						currentPos = 0,
						delta = 1;
					var qodeInfiniteScrollEffect = function() {
						currentPos -= delta;

						if (Math.round(image.offset().left) <= -imageWidth) {
							image.css('left', parseInt(imageWidth - 2*delta));
							currentPos = 0;
						}

						image.css('transform','translate3d('+currentPos+'px,0,0)');
						requestNextAnimationFrame(qodeInfiniteScrollEffect);
					}

					$j(window).load(function(){
						qodeInfiniteScrollEffect();
						$j('html').addClass('qode-sliding-image-holder-initialized')
					});

					if( ! $j('html').hasClass('qode-sliding-image-holder-initialized') ) {
                        qodeInfiniteScrollEffect();
                    }
				});
			}
		});
	}
}

function qodeRequestAnimationFrame() {
	window.requestNextAnimationFrame =
		(function () {
				var originalWebkitRequestAnimationFrame = undefined,
					wrapper = undefined,
					callback = undefined,
					geckoVersion = 0,
					userAgent = navigator.userAgent,
					index = 0,
					self = this;

				// Workaround for Chrome 10 bug where Chrome
				// does not pass the time to the animation function

				if (window.webkitRequestAnimationFrame) {
					// Define the wrapper

					wrapper = function (time) {
						if (time === undefined) {
							time = +new Date();
						}

						self.callback(time);
					};

					// Make the switch

					originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;

					window.webkitRequestAnimationFrame = function (callback, element) {
						self.callback = callback;

						// Browser calls the wrapper and wrapper calls the callback

						originalWebkitRequestAnimationFrame(wrapper, element);
					}
				}

				// Workaround for Gecko 2.0, which has a bug in
				// mozRequestAnimationFrame() that restricts animations
				// to 30-40 fps.

				if (window.mozRequestAnimationFrame) {
					// Check the Gecko version. Gecko is used by browsers
					// other than Firefox. Gecko 2.0 corresponds to
					// Firefox 4.0.

					index = userAgent.indexOf('rv:');

					if (userAgent.indexOf('Gecko') != -1) {
						geckoVersion = userAgent.substr(index + 3, 3);

						if (geckoVersion === '2.0') {
							// Forces the return statement to fall through
							// to the setTimeout() function.

							window.mozRequestAnimationFrame = undefined;
						}
					}
				}

				return window.requestAnimationFrame   ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||

					function (callback, element) {
						var start,
							finish;

						window.setTimeout( function () {
							start = +new Date();
							callback(start);
							finish = +new Date();

							self.timeout = 1000 / 60 - (finish - start);

						}, self.timeout);
					};
			}
		)
		();
}

function qodePageTransitionEffect() {
	var loader = $j('body.qode-page-loading-effect-enabled > .qode-page-loading-effect-holder');
	if (loader.length) {
		loader.fadeOut(500);
		$j(window).bind("pageshow", function(event) {
			if (event.originalEvent.persisted) {
				loader.fadeOut(500);
			}
		});
		$j('a').on('click', function(e) {
			var a = $j(this);
			if (
				e.which == 1 && // check if the left mouse button has been pressed
				a.attr('href').indexOf(window.location.host) >= 0 && // check if the link is to the same domain
				(typeof a.data('rel') === 'undefined') && //Not pretty photo link
				(typeof a.attr('rel') === 'undefined') && //Not VC pretty photo link
				!a.hasClass('qode-like') && //Not like link
				!a.parents('.blog_load_more_button') && //Not load more
				!a.parents('.qode-single-product-images') && //Not product single image
				(typeof a.attr('target') === 'undefined' || a.attr('target') === '_self') && // check if the link opens in the same window
				(a.attr('href').split('#')[0] !== window.location.href.split('#')[0]) // check if it is an anchor aiming for a different page
			) {
				e.preventDefault();
				loader.addClass('qode-hide-spinner');
				loader.fadeIn(500, function() {
					window.location = a.attr('href');
				});
			}
		});
	}
}

function qodeInitAccordions(){
    "use strict";

    var accordion = $j('.qode-accordion-holder');
    if(accordion.length){
        accordion.each(function(){

           var thisAccordion = $j(this);

			if(thisAccordion.hasClass('qode-accordion')){

				thisAccordion.accordion({
					animate: "easeInOutQuint",
					collapsible: true,
					active: 0,
					icons: "",
					heightStyle: "content",
				});
			}

			if(thisAccordion.hasClass('qode-toggle')){

				var toggleAccordion = $j(this);
				var toggleAccordionTitle = toggleAccordion.find('.qode-title-holder');
				var toggleAccordionContent = toggleAccordionTitle.next();

				toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
				toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
				toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

				toggleAccordionTitle.each(function(){
					var thisTitle = $j(this);
					thisTitle.hover(function(){
						thisTitle.toggleClass("ui-state-hover");
					});

					thisTitle.on('click',function(){
						thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
						thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(300);
					});
				});
			}
        });
    }
}

/*
 ** Interactive Icon Showcase
 */
function qodeInitInteractiveIconShowcase () {
	var interactiveShowcase = $j('.qode-int-icon-showcase'),
		noAnimationOnTouch = $j('.no_animation_on_touch');

	if (interactiveShowcase.length){
		interactiveShowcase.each(function () {
			var thisShowcase = $j(this),
				iconHolders = thisShowcase.find('.qode-showcase-item-holder'),
				thisIcons = thisShowcase.find('.qode-showcase-icon'),
				thisContent = thisShowcase.find('.qode-showcase-content'),
				thisFirstItem = thisShowcase.find('.qode-showcase-item-holder:first-child'),
				thisActiveItem = thisShowcase.find('.qode-showcase-item-holder.qode-showcase-active'),
				isInitialized = false,
				isPaused = false,
				currentItem,
				itemInterval = 3000,
				numberOfItems = iconHolders.length;

			if(typeof thisShowcase.data('interval') !== 'undefined' && thisShowcase.data('interval') !== false) {
				itemInterval = thisShowcase.data('interval');
			}

			if (!noAnimationOnTouch.length) {
				//appear
				thisShowcase.appear(function(){
					setTimeout(function(){
						thisShowcase.addClass('qode-appeared');
						if (!thisActiveItem.length) {
						//	setTimeout(function(){
								isInitialized = true;
								thisFirstItem.addClass('qode-showcase-active');
								if (thisShowcase.hasClass('qode-autoplay')) {
									showcaseLoop();
									thisShowcase.hover(function (e) {
										isPaused = true;
									},function (e) {
										isPaused = false;
									});
								}
						//	},2500);
						}
					},30);
				},{accX: 0, accY: -200});
			} else {
				thisFirstItem.addClass('qode-showcase-active');
				isInitialized = true;
			}

			//hover actions
			thisIcons.each(function(){
				var thisIcon = $j(this),
					thisHolder = thisIcon.parent();

				thisIcon.mouseenter(function(){
					if (isInitialized == true) {
						thisHolder.siblings().removeClass('qode-showcase-active qode-current');
						thisHolder.addClass('qode-showcase-active qode-current');
						currentItem = thisShowcase.find('.qode-current').index(); //reset current loop item to latest hovered item
					}
				});
			});

			//loop through the items
			function showcaseLoop()  {
				currentItem = 0; //start from the first item, index = 0

				var loop = setInterval(function(){
					if (!isPaused) {
						iconHolders.removeClass('qode-showcase-active qode-current');
						if(currentItem == numberOfItems -1){
							currentItem = 0;
						}else{
							currentItem++;
						}
						iconHolders.eq(currentItem).addClass('qode-showcase-active');
					}
				}, itemInterval);
			}
		});
	}
}

function qodeInitSendContactForm(){
	"use strict";

	var forms = $j('.qode-contact-form-contact-template');
	if(forms.length){
		forms.each(function(){

			var form = $j(this);

			form.on( 'submit', function(e) {
				e.preventDefault();

				var sendMail = true;
				form.find('.contact-error').remove();
				form.parent().find('.contact-success').remove();
				form.find('.requiredField').each(function() {

					var inputField = $j(this);

					if(jQuery.trim(inputField.val()) == '' || jQuery.trim(inputField.val()) == jQuery.trim(inputField.attr('placeholder'))){
						inputField.parent().append('<strong class="contact-error">'+ form.data('required-message') +'</strong>');
						inputField.addClass('inputError');
						sendMail = false;
					} else {
						if(inputField.hasClass('email')) { //if hasClass('email')
							var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
							if(!emailReg.test(jQuery.trim(inputField.val()))){
								inputField.parent().append('<strong class="contact-error">'+ form.data('wrong-email-message') +'</strong>');
								inputField.addClass('inputError');
								sendMail = false;
							}
						}

					}
				});


				if(sendMail){
					var form_data = form.serialize();

					var ajaxData = {
						action: 'bridge_core_send_contact_page_form',
						form_data : form_data,
						contact_page_nonce: form.find('#bridge_qode_contact_page_nonce').val()
					};

					$j.ajax({
						type: 'POST',
						data: ajaxData,
						url: QodeAdminAjax.ajaxurl,
						success: function (data) {
							var response = JSON.parse(data);
							if(response.status == 'success'){
								form.before('<div class="contact-success"><p>' + response.message + '</p></div>');
								form.hide();
							} else {
								form.before('<div class="contact-success"><p>' + response.message + '</p></div>');
							}

						}
					});
				}

			});
		});
	}
}function qodeRecaptchaCallback(){
	"use strict";

	var element = $j('#qode-captcha-element-holder');
	if(element.length) {
		grecaptcha.render('qode-captcha-element-holder', {
			'sitekey': element.data('sitekey')
		});
	}
}

/*
 * Animate Workflow shortcode
 */
function qodeWorkflow() {
	var workflowShortcodes = $j('.qode-workflow');
	if (workflowShortcodes.length) {
		workflowShortcodes.each(function () {
			var workflowShortcode = $j(this);
			if (workflowShortcode.hasClass('qode-workflow-animate')) {
				var workflowItems = workflowShortcode.find('.qode-workflow-item');

				workflowShortcode.appear(function () {
					workflowShortcode.addClass('qode-appeared');
					setTimeout(function () {
						workflowItems.each(function (i) {
							var workflowItem = $j(this);
							setTimeout(function () {
								workflowItem.addClass('qode-appeared');
							}, 350 * i);
						});
					}, 350);
				}, {accX: 0, accY: -($window_height / 3)});

			}
		});
	}
}

/**
 * Initializes load more data params
 * @param container with defined data params
 * return array
 */
function getLoadMoreData(container){
    var dataList = container.data(),
        returnValue = {};

    for (var property in dataList) {
        if (dataList.hasOwnProperty(property)) {
            if (typeof dataList[property] !== 'undefined' && dataList[property] !== false) {
                returnValue[property] = dataList[property];
            }
        }
    }

    return returnValue;
}

/**
 * Sets load more data params for ajax function
 * @param container with defined data params
 * return array
 */
function setLoadMoreAjaxData(container, action){
    var returnValue = {
        action: action
    };

    for (var property in container) {
        if (container.hasOwnProperty(property)) {

            if (typeof container[property] !== 'undefined' && container[property] !== false) {
                returnValue[property] = container[property];
            }
        }
    }

    return returnValue;
}

/**
 * Init Owl Carousel
 */
function qodeOwlSlider() {
    var sliders = $j('.qode-owl-slider');

    if (sliders.length) {
        sliders.each(function(){
            var slider = $j(this),
                slideItemsNumber = slider.children().length,
                numberOfItems = 1,
                loop = true,
                autoplay = true,
                autoplayHoverPause = true,
                sliderSpeed = 5000,
                sliderSpeedAnimation = 600,
                margin = 0,
                responsiveMargin = 0,
                stagePadding = 0,
                stagePaddingEnabled = false,
                center = false,
                autoWidth = false,
                animateInClass = false, // keyframe css animation
                animateOut = false, // keyframe css animation
                navigation = true,
                pagination = false,
                sliderIsPortfolio = !!slider.hasClass('qode-pl-is-slider'),
                sliderDataHolder = sliderIsPortfolio ? slider.parent() : slider;  // this is condition for portfolio slider

            if (typeof slider.data('number-of-items') !== 'undefined' && slider.data('number-of-items') !== false && !sliderIsPortfolio) {
                numberOfItems = slider.data('number-of-items');
            }
            if (typeof sliderDataHolder.data('number-of-columns') !== 'undefined' && sliderDataHolder.data('number-of-columns') !== false && sliderIsPortfolio) {
                numberOfItems = sliderDataHolder.data('number-of-columns');
            }
            if (sliderDataHolder.data('enable-loop') === 'no') {
                loop = false;
            }
            if (sliderDataHolder.data('enable-autoplay') === 'no') {
                autoplay = false;
            }
            if (sliderDataHolder.data('enable-autoplay-hover-pause') === 'no') {
                autoplayHoverPause = false;
            }
            if (typeof sliderDataHolder.data('slider-speed') !== 'undefined' && sliderDataHolder.data('slider-speed') !== false) {
                sliderSpeed = sliderDataHolder.data('slider-speed');
            }
            if (typeof sliderDataHolder.data('slider-speed-animation') !== 'undefined' && sliderDataHolder.data('slider-speed-animation') !== false) {
                sliderSpeedAnimation = sliderDataHolder.data('slider-speed-animation');
            }
            if (typeof sliderDataHolder.data('slider-margin') !== 'undefined' && sliderDataHolder.data('slider-margin') !== false) {
                margin = sliderDataHolder.data('slider-margin');
            }
	        if(slider.parent().hasClass('qode-huge-space')) {
		        margin = 60;
	        } else if (slider.parent().hasClass('qode-large-space')) {
		        margin = 50;
	        } else if (slider.parent().hasClass('qode-medium-space')) {
		        margin = 40;
	        } else if(slider.parent().hasClass('qode-normal-space')) {
                margin = 30;
            } else if (slider.parent().hasClass('qode-small-space')) {
                margin = 20;
            } else if (slider.parent().hasClass('qode-tiny-space')) {
                margin = 10;
            }
            if (sliderDataHolder.data('slider-padding') === 'yes') {
                stagePaddingEnabled = true;
                stagePadding = parseInt(slider.outerWidth() * 0.28);
                margin = 50;
            }
            if (sliderDataHolder.data('enable-center') === 'yes') {
                center = true;
            }
            if (sliderDataHolder.data('enable-auto-width') === 'yes') {
                autoWidth = true;
            }
            if (typeof sliderDataHolder.data('slider-animate-in') !== 'undefined' && sliderDataHolder.data('slider-animate-in') !== false) {
                animateInClass = sliderDataHolder.data('slider-animate-in');
            }
            if (typeof sliderDataHolder.data('slider-animate-out') !== 'undefined' && sliderDataHolder.data('slider-animate-out') !== false) {
                animateOut = sliderDataHolder.data('slider-animate-out');
            }
            if (sliderDataHolder.data('enable-navigation') === 'no') {
                navigation = false;
            }
            if (sliderDataHolder.data('enable-pagination') === 'yes') {
                pagination = true;
            }

            if(navigation && pagination) {
                slider.addClass('qode-slider-has-both-nav');
            }

            if (slideItemsNumber <= 1) {
                loop       = false;
                autoplay   = false;
                navigation = false;
                pagination = false;
            }

            var responsiveNumberOfItems1 = 1,
                responsiveNumberOfItems2 = 2,
                responsiveNumberOfItems3 = 3,
                responsiveNumberOfItems4 = numberOfItems;

            if (numberOfItems < 3) {
                responsiveNumberOfItems2 = numberOfItems;
                responsiveNumberOfItems3 = numberOfItems;
            }

            if (numberOfItems > 4) {
                responsiveNumberOfItems4 = 4;
            }

            if (stagePaddingEnabled || margin > 0) {
                responsiveMargin = 20;
            }

            slider.owlCarousel({
                items: numberOfItems,
                loop: loop,
                autoplay: autoplay,
                autoplayHoverPause: autoplayHoverPause,
                autoplayTimeout: sliderSpeed,
                smartSpeed: sliderSpeedAnimation,
                margin: margin,
                stagePadding: stagePadding,
                center: center,
                autoWidth: autoWidth,
                animateInClass: animateInClass,
                animateOut: animateOut,
                dots: pagination,
                nav: navigation,
                navText: [
                    '<span class="qode-prev-icon fa fa-angle-left"></span>',
                    '<span class="qode-next-icon fa fa-angle-right"></span>'
                ],
                responsive: {
                    0: {
                        items: responsiveNumberOfItems1,
                        margin: responsiveMargin,
                        stagePadding: 0,
                        center: false,
                        autoWidth: false
                    },
                    681: {
                        items: responsiveNumberOfItems2
                    },
                    769: {
                        items: responsiveNumberOfItems3
                    },
                    1025: {
                        items: responsiveNumberOfItems4
                    },
                    1281: {
                        items: numberOfItems
                    }
                },
                onInitialize: function () {
                    slider.css('visibility', 'visible');
                },
                onChanged: function () {
                    if(slider.parent().length && slider.parent().hasClass('qode-image-behavior-lightbox')){
                        prettyPhoto();
                    }
                }
            });

        });
    }
}


/**
* Scrolling Image Shortcode
*/
function qodeScrollingImage() {
	var scrollingImageShortcodes = $j('.qode-scrolling-image-holder');

	if (scrollingImageShortcodes.length) {
	    scrollingImageShortcodes.each(function(){
	        var scrollingImageShortcode = $j(this),
	        	scrollingImageContentHolder = scrollingImageShortcode.find('.qode-si-content-holder'),
	            scrollingFrame = scrollingImageShortcode.find('.qode-si-frame'),
	            scrollingFrameHeight,
	            scrollingImage = scrollingImageShortcode.find('.qode-si-image'),
	            scrollingImageHeight,
	            delta,
	            timing,
	            scrollable = false;

	        var sizing = function() {
	        	scrollingFrameHeight = scrollingFrame.height();
	        	scrollingImageHeight = scrollingImage.height();
	        	delta = Math.round(scrollingImageHeight - scrollingFrameHeight);
	        	timing = Math.round(scrollingImageHeight/scrollingFrameHeight)*2;

	        	if (scrollingImageHeight > scrollingFrameHeight) { 
	        	    scrollable = true;
	        	}
	        }

	        var scrollAnimation = function() {
	            //scroll animation on hover
	            scrollingImageContentHolder.mouseenter(function(){
                    scrollingImage.css('transition-duration',timing+'s'); //transition duration set in relation to image height
                    scrollingImage.css('transform', 'translate3d(0px, -'+delta+'px, 0px)');
	            });

	            //scroll animation reset
	            scrollingImageContentHolder.mouseleave(function(){
	                if (scrollable) {
	                    scrollingImage.css('transition-duration', Math.min(timing/3, 3) +'s');
	                    scrollingImage.css('transform', 'translate3d(0px, 0px, 0px)');
	                }
	            });
	        };

	        //init
	        scrollingImageShortcode.waitForImages(function(){
	        	scrollingImageShortcode.css('visibility', 'visible');
		        sizing();
		        scrollAnimation();
		    });

	        $j(window).resize(function(){
		        sizing();
	        });
	    });
	}
}

/*
* Defines Animation End event
*/
function animationEventEnd(){
    var el = document.createElement("animationDetector");

    var animations = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    }

    for (var t in animations){
        if (el.style[t] !== undefined){
          return animations[t];
        }
    }
}

/*
* Defines Transition End event
*/
function transitionEventEnd() {
    var el = document.createElement('transitionDetector'),
        transEndEventNames = {
            'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
            'MozTransition'    : 'transitionend',      // only for FF < 15
            'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
        };

    for(var t in transEndEventNames){
        if( el.style[t] !== undefined ){
            return transEndEventNames[t];
        }
    }
}

function qodeCustomFontTypeOut() {
	var qodeTyped = $j('.qode-cf-typed');

	if (qodeTyped.length) {
		qodeTyped.each(function () {

			//vars
			var thisTyped = $j(this),
				typedWrap = thisTyped.parent('.qode-cf-typed-wrap'),
				customFontHolder = typedWrap.parent('.custom_font_holder'),
				str = [],
				strings = thisTyped.find('.qode-cf-typed');

			if (strings.length) {
				strings.each(function () {
					str.push($j(this).text());
				});

			}

			customFontHolder.appear(function () {
				thisTyped.typed({
					strings: str,
					typeSpeed: 90,
					backDelay: 700,
					loop: true,
					contentType: 'text',
					loopCount: false,
					cursorChar: '_'
				});
			}, {accX: 0, accY: 200});
		});
	}
}

function qodeContactPageAcceptance(){
	var contact_page_form = $j('.qode-contact-form-contact-template'),
		acceptance = contact_page_form.find('.contact_form_acceptance .contact_form_acceptance_value'),
		submitButton = contact_page_form.find('.contact_form_button');

	if(acceptance.length){
        acceptance.each(function(){
			var thisSelector = $j(this);
            submitButton.attr('disabled','disabled');

			thisSelector.change(function(){
				if (thisSelector.is(':checked')){
                    submitButton.removeAttr('disabled');
				}
				else{
                    submitButton.attr('disabled','disabled');
				}
			});

		})
	}
}

function qodePanelArea(){
    var panel = $j('.qode-panel-area'),
        panelOpener = $j('a.qode_panel_area_opener'),
        panelClose = $j('.qode-close-panel'),
		wrapper = $j('.wrapper');

    var disableScroll = function () {
        if( typeof smoothScrollListener !== 'undefined' ) {
            window.removeEventListener('mousewheel', smoothScrollListener, {passive:false});
            window.removeEventListener('DOMMouseScroll', smoothScrollListener, {passive:false});
        }
    };

    var enableScroll = function () {
        if( typeof smoothScrollListener !== 'undefined' ) {
            window.addEventListener('mousewheel', smoothScrollListener, {passive:false});
            window.addEventListener('DOMMouseScroll', smoothScrollListener, {passive:false});
        }
    };

    if( panel.outerHeight() >=  $window_height ){
        panel.height($window_height);
    }

    panel.niceScroll({
        scrollspeed: 30,
        mousescrollstep: 20,
        cursorwidth: 0,
        cursorborder: 0,
        cursorborderradius: 0,
        cursorcolor: "transparent",
        autohidemode: false,
        horizrailenabled: false
    });

    var closePanel = function() {
        if (qode_body.hasClass('qode-panel-area-opened')) {
            qode_body.removeClass('qode-panel-area-opened');
        }
    }

    var openPanel = function() {
        if (!qode_body.hasClass('qode-panel-area-opened')) {
            qode_body.addClass('qode-panel-area-opened');

        }
    }

    panelOpener.on( 'click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if( qode_body.hasClass('qode-panel-area-opened') ){
            closePanel();
        } else{
            openPanel();
        }

    });

    panelClose.on( 'click', function(e) {
        e.preventDefault();
        closePanel();
    });

    wrapper.on('click', function(e){
        if( qode_body.hasClass('qode-panel-area-opened') ){
            closePanel();
        }
	});
}
(function($) {
    'use strict';

    var elementorGlobal = {};
    qode.modules.elementorGlobal = elementorGlobal;

    elementorGlobal.qodeInitElementorGlobal = qodeInitElementorGlobal;


    elementorGlobal.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorGlobal();
    }

    function qodeInitElementorGlobal(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function() {
                initParallax();
                initElementorParallaxFX();
                initFullScreenTemplate();
                qodeInitStickyWidget();
            } );
        });
    }

    function initElementorParallaxFX(){
        var parallaxSection = $('.parallax_section_holder');

        if( parallaxSection.length ){
            parallaxSection.each(function(){
                var parallaxElement = $(this),
                    parallaxSpeedHolder = parallaxElement.find('.qode-parallax-helper-holder'),
                    parallaxSpeed = 1;

                if( parallaxSpeedHolder.length && typeof parallaxSpeedHolder.data('speed') !== 'undefined' && parallaxSpeedHolder.data('speed') !== '' ){
                    parallaxSpeed = parallaxSpeedHolder.data('speed');
                }

                parallaxElement.parallax("50%", parallaxSpeed * 0.4);
            })
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorAction = {};
    qode.modules.elementorAction = elementorAction;

    elementorAction.qodeInitElementorAction = qodeInitElementorAction;


    elementorAction.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorAction();
    }

    function qodeInitElementorAction(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_action.default', function() {
                initButtonHover();
            } );
        });

        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/global', function() {
                initParallax();
                initElementorParallaxFX();
                initFullScreenTemplate();
            } );
        });
    }

    function initElementorParallaxFX(){
        var parallaxSection = $('.parallax_section_holder');

        if( parallaxSection.length ){
            parallaxSection.each(function(){
                var parallaxElement = $(this),
                    parallaxSpeedHolder = parallaxElement.find('.qode-parallax-helper-holder'),
                    parallaxSpeed = 1;

                if( parallaxSpeedHolder.length && typeof parallaxSpeedHolder.data('speed') !== 'undefined' && parallaxSpeedHolder.data('speed') !== '' ){
                    parallaxSpeed = parallaxSpeedHolder.data('speed');
                }

                parallaxElement.parallax("50%", parallaxSpeed * 0.4);
            })
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorAnimationHolder = {};
    qode.modules.elementorAnimationHolder = elementorAnimationHolder;

    elementorAnimationHolder.qodeInitElementorAnimationHolder = qodeInitElementorAnimationHolder;


    elementorAnimationHolder.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorAnimationHolder();
    }

    function qodeInitElementorAnimationHolder(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_animation_holder.default', function() {
                initElementsAnimation();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorBlogSlider = {};
    qode.modules.elementorBlogSlider = elementorBlogSlider;

    elementorBlogSlider.qodeInitElementorBlogSlider = qodeInitElementorBlogSlider;


    elementorBlogSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorBlogSlider();
    }

    function qodeInitElementorBlogSlider(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_blog_slider.default', function() {
                initBlogSlider();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorButton = {};
    qode.modules.elementorButton = elementorButton;

    elementorButton.qodeInitElementorButton = qodeInitElementorButton;


    elementorButton.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorButton();
    }

    function qodeInitElementorButton(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_button.default', function() {
                initButtonHover();
                initEnlargeButton();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorCarousel = {};
    qode.modules.elementorCarousel = elementorCarousel;

    elementorCarousel.qodeInitElementorCarousel = qodeInitElementorCarousel;


    elementorCarousel.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorCarousel();
    }

    function qodeInitElementorCarousel(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_carousel.default', function() {
                initQodeCarousel();
                calculateHeights();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorContentSlider = {};
    qode.modules.elementorContentSlider = elementorContentSlider;

    elementorContentSlider.qodeInitElementorContentSlider = qodeInitElementorContentSlider;


    elementorContentSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorContentSlider();
    }

    function qodeInitElementorContentSlider(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_content_slider.default', function() {
                initContentSlider();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorCountdown = {};
    qode.modules.elementorCountdown = elementorCountdown;

    elementorCountdown.qodeInitElementorCountdown = qodeInitElementorCountdown;


    elementorCountdown.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorCountdown();
    }

    function qodeInitElementorCountdown(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_countdown.default', function() {
                initCountdown();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorCounter = {};
    qode.modules.elementorCounter = elementorCounter;

    elementorCounter.qodeInitElementorCounter = qodeInitElementorCounter;


    elementorCounter.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorCounter();
    }

    function qodeInitElementorCounter(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_counter.default', function() {
                initToCounter();
                initCounter();
            } );
        });
    }


})(jQuery);
(function($) {
    'use strict';

    var elementorCoverBoxes = {};
    qode.modules.elementorCoverBoxes = elementorCoverBoxes;

    elementorCoverBoxes.qodeInitElementorCoverBoxes = qodeInitElementorCoverBoxes;


    elementorCoverBoxes.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorCoverBoxes();
    }

    function qodeInitElementorCoverBoxes(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_cover_boxes.default', function() {
                initCoverBoxes();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorCustomFont = {};
    qode.modules.elementorCustomFont = elementorCustomFont;

    elementorCustomFont.qodeInitElementorCustomFont = qodeInitElementorCustomFont;


    elementorCustomFont.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorCustomFont();
    }

    function qodeInitElementorCustomFont(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_custom_font.default', function() {
                qodeCustomFontTypeOut();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorExpandingImages = {};
    qode.modules.elementorExpandingImages = elementorExpandingImages;

    elementorExpandingImages.qodeInitElementorExpandingImages = qodeInitElementorExpandingImages;


    elementorExpandingImages.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorExpandingImages();
    }

    function qodeInitElementorExpandingImages(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_expanding_images.default', function() {
                initExpandingImages();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorFullscreenSections = {};
    qode.modules.elementorFullscreenSections = elementorFullscreenSections;

    elementorFullscreenSections.qodeInitElementorFullscreenSections = qodeInitElementorFullscreenSections;


    elementorFullscreenSections.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorFullscreenSections();
    }

    function qodeInitElementorFullscreenSections(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_fullscreen_sections.default', function() {
                initFullScreenTemplate();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorGoogleMap = {};
    qode.modules.elementorGoogleMap = elementorGoogleMap;

    elementorGoogleMap.qodeInitElementorGoogleMap = qodeInitElementorGoogleMap;


    elementorGoogleMap.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorGoogleMap();
    }

    function qodeInitElementorGoogleMap(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_google_map.default', function() {
                showGoogleMap();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorHorizontalMarquee = {};
    qode.modules.elementorHorizontalMarquee = elementorHorizontalMarquee;

    elementorHorizontalMarquee.qodeInitElementorHorizontalMarquee = qodeInitElementorHorizontalMarquee;


    elementorHorizontalMarquee.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorHorizontalMarquee();
    }

    function qodeInitElementorHorizontalMarquee(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_horizontal_marquee.default', function() {
                initHorizontalMarquee();
                qodeHorizontalMarqueeLoop();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorIcon = {};
    qode.modules.elementorIcon = elementorIcon;

    elementorIcon.qodeInitElementorIcon = qodeInitElementorIcon;


    elementorIcon.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorIcon();
    }

    function qodeInitElementorIcon(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_icon.default', function() {
                initIconShortcodeHover();
                initIconWithTextAnimation();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorIconText = {};
    qode.modules.elementorIconText = elementorIconText;

    elementorIconText.qodeInitElementorIconText = qodeInitElementorIconText;


    elementorIconText.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorIconText();
    }

    function qodeInitElementorIconText(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_icon_text.default', function() {
                initIconWithTextHover();
                initIconShortcodeHover();
                initIconWithTextAnimation();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorImageGallery = {};
    qode.modules.elementorImageGallery = elementorImageGallery;

    elementorImageGallery.qodeInitElementorImageGallery = qodeInitElementorImageGallery;


    elementorImageGallery.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorImageGallery();
    }

    function qodeInitElementorImageGallery(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_image_gallery.default', function() {
                initFlexSlider();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorImageHover = {};
    qode.modules.elementorImageHover = elementorImageHover;

    elementorImageHover.qodeInitElementorImageHover = qodeInitElementorImageHover;


    elementorImageHover.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorImageHover();
    }

    function qodeInitElementorImageHover(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_image_hover.default', function() {
                initImageHover();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorImageSliderNoSpace = {};
    qode.modules.elementorImageSliderNoSpace = elementorImageSliderNoSpace;

    elementorImageSliderNoSpace.qodeInitElementorImageSliderNoSpace = qodeInitElementorImageSliderNoSpace;


    elementorImageSliderNoSpace.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorImageSliderNoSpace();
    }

    function qodeInitElementorImageSliderNoSpace(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_image_slider_no_space.default', function() {
                initImageGallerySliderNoSpace()
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorInDeviceSlider = {};
    qode.modules.elementorInDeviceSlider = elementorInDeviceSlider;

    elementorInDeviceSlider.qodeInitElementorInDeviceSlider = qodeInitElementorInDeviceSlider;


    elementorInDeviceSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorInDeviceSlider();
    }

    function qodeInitElementorInDeviceSlider(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_in_device_slider.default', function() {
                initInDeviceSlider();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorMasonryBlog = {};
    qode.modules.elementorMasonryBlog = elementorMasonryBlog;

    elementorMasonryBlog.qodeInitElementorMasonryBlog = qodeInitElementorMasonryBlog;


    elementorMasonryBlog.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorMasonryBlog();
    }

    function qodeInitElementorMasonryBlog(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_masonry_blog.default', function() {
                initQBlog();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorMasonryGallery = {};
    qode.modules.elementorMasonryGallery = elementorMasonryGallery;

    elementorMasonryGallery.qodeInitElementorMasonryGallery = qodeInitElementorMasonryGallery;


    elementorMasonryGallery.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorMasonryGallery();
    }

    function qodeInitElementorMasonryGallery(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_masonry_gallery.default', function() {
                initMasonryGallery();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorMessage = {};
    qode.modules.elementorMessage = elementorMessage;

    elementorMessage.qodeInitElementorMessage = qodeInitElementorMessage;


    elementorMessage.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorMessage();
    }

    function qodeInitElementorMessage(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_message.default', function() {
                initMessages();
                initMessageHeight();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorOldAccordion = {};
    qode.modules.elementorOldAccordion = elementorOldAccordion;

    elementorOldAccordion.qodeInitElementorOldAccordion = qodeInitElementorOldAccordion;


    elementorOldAccordion.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorOldAccordion();
    }

    function qodeInitElementorOldAccordion(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_old_accordion.default', function() {
                initAccordion()
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorOldTab = {};
    qode.modules.elementorOldTab = elementorOldTab;

    elementorOldTab.qodeInitElementorOldTab = qodeInitElementorOldTab;


    elementorOldTab.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorOldTab();
    }

    function qodeInitElementorOldTab(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_old_tab.default', function() {
                initTabs();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorParallaxLayers = {};
    qode.modules.elementorParallaxLayers = elementorParallaxLayers;

    elementorParallaxLayers.qodeInitElementorParallaxLayers = qodeInitElementorParallaxLayers;


    elementorParallaxLayers.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorParallaxLayers();
    }

    function qodeInitElementorParallaxLayers(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_parallax_layers.default', function() {
                parallaxLayers();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorPieChart = {};
    qode.modules.elementorPieChart = elementorPieChart;

    elementorPieChart.qodeInitElementorPieChart = qodeInitElementorPieChart;


    elementorPieChart.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorPieChart();
    }

    function qodeInitElementorPieChart(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_pie_chart.default', function() {
                initPieChart();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorPieChartWithIcon = {};
    qode.modules.elementorPieChartWithIcon = elementorPieChartWithIcon;

    elementorPieChartWithIcon.qodeInitElementorPieChartWithIcon = qodeInitElementorPieChartWithIcon;


    elementorPieChartWithIcon.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorPieChartWithIcon();
    }

    function qodeInitElementorPieChartWithIcon(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_pie_chart_with_icon.default', function() {
                initPieChartWithIcon();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorPortfolioList = {};
    qode.modules.elementorPortfolioList = elementorPortfolioList;

    elementorPortfolioList.qodeInitElementorPortfolioList = qodeInitElementorPortfolioList;


    elementorPortfolioList.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorPortfolioList();
    }

    function qodeInitElementorPortfolioList(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_portfolio_list.default', function() {
                initPortfolio();
                initPortfolioZIndex();
                initPortfolioJustifiedGallery();
                initPortfolioMasonryFilter();
                initPortfolioMasonry();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorPortfolioSlider = {};
    qode.modules.elementorPortfolioSlider = elementorPortfolioSlider;

    elementorPortfolioSlider.qodeInitElementorPortfolioSlider = qodeInitElementorPortfolioSlider;


    elementorPortfolioSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorPortfolioSlider();
    }

    function qodeInitElementorPortfolioSlider(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_portfolio_slider.default', function() {
                initPortfolioSlider();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorPreviewSlider = {};
    qode.modules.elementorPreviewSlider = elementorPreviewSlider;

    elementorPreviewSlider.qodeInitElementorPreviewSlider = qodeInitElementorPreviewSlider;


    elementorPreviewSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorPreviewSlider();
    }

    function qodeInitElementorPreviewSlider(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_preview_slider.default', function() {
                initPreviewSlider();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorProductListElegant = {};
    qode.modules.elementorProductListElegant = elementorProductListElegant;

    elementorProductListElegant.qodeInitElementorProductListElegant = qodeInitElementorProductListElegant;


    elementorProductListElegant.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorProductListElegant();
    }

    function qodeInitElementorProductListElegant(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_product_list_elegant.default', function() {
                initEnlargeButton();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeElementorInitProductListPinterest();
    }

    /*
     ** Testimonials
     */
    function qodeElementorInitProductListPinterest(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_product_list_masonry.default', function() {
                qodeInitProductListMasonryPinterestShortcode();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
	    qodeElementorInitProductListPinterest();
    }

    /*
     ** Testimonials
     */
    function qodeElementorInitProductListPinterest(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_product_list_pinterest.default', function() {
	            qodeInitProductListMasonryPinterestShortcode();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
	    qodeElementorInitProgressBar();
    }

    /*
     ** Testimonials
     */
    function qodeElementorInitProgressBar(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_progress_bar.default', function() {
	            initProgressBars();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
	    qodeElementorInitProgressBarIcon();
    }

    /*
     ** Progress Bars Icons
     */
    function qodeElementorInitProgressBarIcon(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_progress_bar_icon.default', function() {
	            initProgressBarsIcon();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
	    qodeElementorInitProgressBarVertical();
    }

    /*
     ** Testimonials
     */
    function qodeElementorInitProgressBarVertical(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_progress_bar_vertical.default', function() {
	            initProgressBarsVertical();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
	    qodeElementorInitSocialIcons();
    }

    /*
     ** Testimonials
     */
    function qodeElementorInitSocialIcons(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_social_icons.default', function() {
	            initSocialIconHover();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
	    qodeInitTestimonials();
    }

    /*
     ** Testimonials
     */
    function qodeInitTestimonials(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_testimonials.default', function() {
	            initTestimonials();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
	    qodeInitTestimonialsCarousel();
    }

    /*
     ** TestimonialsCarousel
     */
    function qodeInitTestimonialsCarousel(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_testimonials_carousel.default', function() {
	            initTestimonialsCarousel();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
	    qodeInitTextMarque();
    }


    function qodeInitTextMarque(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_text_marquee.default', function() {
	            initTextMarquee();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';


    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
	    qodeInitUnorderedListAnimation();
    }

    /*
     ** Init Unordered List shortcode
     */
    function qodeInitUnorderedListAnimation(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_unordered_list.default', function() {
	            initListAnimation();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorVerticalSplitSlider = {};
    qode.modules.elementorVerticalSplitSlider = elementorVerticalSplitSlider;

    elementorVerticalSplitSlider.qodeInitElementorVerticalSplitSlider = qodeInitElementorVerticalSplitSlider;


    elementorVerticalSplitSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorVerticalSplitSlider();
    }

    function qodeInitElementorVerticalSplitSlider(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_vertical_split_slider.default', function() {
                initVerticalSplitSlider();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorAccordion = {};
    qode.modules.elementorAccordion = elementorAccordion;

    elementorAccordion.qodeInitElementorAccordion = qodeInitElementorAccordion;


    elementorAccordion.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorAccordion();
    }

    function qodeInitElementorAccordion(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_accordion.default', function() {
                qodeInitAccordions();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';
	
	var imageGallery = {};
	qode.modules.imageGallery = imageGallery;
	
	imageGallery.qodeInitAdvancedImageGalleryMasonry = qodeInitAdvancedImageGalleryMasonry;
	
	
	imageGallery.qodeOnWindowLoad = qodeOnWindowLoad;
	
	$(window).load(qodeOnWindowLoad);
	
	/*
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function qodeOnWindowLoad() {
		qodeInitAdvancedImageGalleryMasonry();
	}
	
	/*
	 ** Init Image Gallery shortcode - Masonry layout
	 */
	function qodeInitAdvancedImageGalleryMasonry(){
		var holder = $('.qode-advanced-image-gallery.qode-aig-masonry-type');
		
		if(holder.length){
			holder.each(function(){
				var thisHolder = $(this),
					masonry = thisHolder.find('.qode-aig-masonry'),
					size = thisHolder.find('.qode-aig-grid-sizer').width();

				qodeResizeAdvancedImageGalleryMasonryItems(size, thisHolder);

				masonry.waitForImages(function() {
					masonry.isotope({
						layoutMode: 'packery',
						itemSelector: '.qode-aig-image',
						percentPosition: true,
						packery: {
							gutter: '.qode-aig-grid-gutter',
							columnWidth: '.qode-aig-grid-sizer'
						}
					});
					
					setTimeout(function() {
						masonry.isotope('layout');
						initParallax();
					}, 800);
					
					masonry.css('opacity', '1');
				});
			});
		}
	}

	/**
	 * Init Resize Portfolio Items
	 */
	function qodeResizeAdvancedImageGalleryMasonryItems(size,container){
		if(container.hasClass('qode-aig-images-fixed')) {
			var padding = parseInt(container.find('.qode-aig-image').css('padding-left')),
				defaultMasonryItem = container.find('.qode-aig-default-masonry-item'),
				largeWidthMasonryItem = container.find('.qode-aig-large-width-masonry-item'),
				largeHeightMasonryItem = container.find('.qode-aig-large-height-masonry-item'),
				largeWidthHeightMasonryItem = container.find('.qode-aig-large-masonry-item');

			if (qode.windowWidth > 680) {
				defaultMasonryItem.css('height', size - 2 * padding);
				largeHeightMasonryItem.css('height', Math.round(2 * size) - 2 * padding);
				largeWidthHeightMasonryItem.css('height', Math.round(2 * size) - 2 * padding);
				largeWidthMasonryItem.css('height', size - 2 * padding);
			} else {
				defaultMasonryItem.css('height', size - 2 * padding);
				largeHeightMasonryItem.css('height', size*2 - 2 * padding);
				largeWidthHeightMasonryItem.css('height', size - 2 * padding);
				largeWidthMasonryItem.css('height', Math.floor(size / 2) - 2 * padding);
			}
		}
	}

})(jQuery);
(function($) {
    'use strict';

    var elementorImageGallery = {};
    qode.modules.elementorImageGallery = elementorImageGallery;

    elementorImageGallery.qodeInitElementorAdvancedImageGalleryMasonry = qodeInitElementorAdvancedImageGalleryMasonry;


    elementorImageGallery.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorAdvancedImageGalleryMasonry();
    }

    function qodeInitElementorAdvancedImageGalleryMasonry(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_advanced_image_gallery.default', function() {
                qodeOwlSlider();
                qode.modules.imageGallery.qodeInitAdvancedImageGalleryMasonry();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorAdvancedTabs = {};
    qode.modules.elementorAdvancedTabs = elementorAdvancedTabs;

    elementorAdvancedTabs.qodeInitElementorAdvancedTabs = qodeInitElementorAdvancedTabs;


    elementorAdvancedTabs.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorAdvancedTabs();
    }

    function qodeInitElementorAdvancedTabs(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_tabs.default', function() {
                qodeInitAdvancedTabs();
                qodeInitAdvancedTabsIcons();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorBlogCarouselTitled = {};
    qode.modules.elementorBlogCarouselTitled = elementorBlogCarouselTitled;

    elementorBlogCarouselTitled.qodeInitElementorBlogCarouselTitled = qodeInitElementorBlogCarouselTitled;


    elementorBlogCarouselTitled.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorBlogCarouselTitled();
    }

    function qodeInitElementorBlogCarouselTitled(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_blog_carousel_titled.default', function() {
                qodeInitBlogCarouselTitled();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorButtonV2 = {};
    qode.modules.elementorButtonV2 = elementorButtonV2;

    elementorButtonV2.qodeInitElementorButtonV2 = qodeInitElementorButtonV2;


    elementorButtonV2.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorButtonV2();
    }

    function qodeInitElementorButtonV2(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_button_v2.default', function() {
                qodeV2Button().init();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorCallToActionSection = {};
    qode.modules.elementorCallToActionSection = elementorCallToActionSection;

    elementorCallToActionSection.qodeInitElementorCallToActionSection = qodeInitElementorCallToActionSection;


    elementorCallToActionSection.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorCallToActionSection();
    }

    function qodeInitElementorCallToActionSection(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_call_to_action_section.default', function() {
                qodeCTASection().init();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorCardsGallery = {};
    qode.modules.elementorCardsGallery = elementorCardsGallery;

    elementorCardsGallery.qodeInitElementorCardsGallery = qodeInitElementorCardsGallery;


    elementorCardsGallery.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorCardsGallery();
    }

    function qodeInitElementorCardsGallery(){
        $j(window).on('elementor/frontend/init', function () {
            qodeCardsGallery();
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_cards_gallery.default', function() {
                qodeCardsGallery();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorCardsSlider = {};
    qode.modules.elementorCardsSlider = elementorCardsSlider;

    elementorCardsSlider.qodeInitElementorCardsSlider = qodeInitElementorCardsSlider;


    elementorCardsSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorCardsSlider();
    }

    /*
     **
     */
    function qodeInitElementorCardsSlider(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_cards_slider.default', function() {
                qodeCardsSlider().init();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var comparisonSlider = {};
    qode.modules.comparisonSlider = comparisonSlider;

    comparisonSlider.qodeInitComparisonSlider = qodeInitComparisonSlider;


    comparisonSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(document).ready(qodeOnWindowLoad);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitComparisonSlider();
    }


    function qodeInitComparisonSlider() {
        var cmpSliders = $j('.qode-comparison-slider');

        if (cmpSliders.length) {
            cmpSliders.each(function (i) {
                var cmpSlider = $j(this);

                var orientation = cmpSlider.data('orientation');
                var offset = cmpSlider.data('offset') / 100;

                cmpSlider.waitForImages(function () {
                    cmpSlider.css('visibility', 'visible');
                    cmpSlider.twentytwenty({
                        default_offset_pct: 1.1,
                        orientation: orientation
                    });
                });

                cmpSlider.appear(function () {
                    setTimeout(function () {
                        var height = cmpSlider.height(),
                            width = cmpSlider.width(),
                            pixelHeight = height * offset, //target value
                            pixelWidth = width * offset, //target value
                            handle = cmpSlider.find('.twentytwenty-handle'),
                            image = cmpSlider.find('img:first-of-type'),
                            transitionTime = 700,
                            transitionEasing = 'cubic-bezier(0.645, 0.045, 0.355, 1)',
                            transitionDelay = 100;

                        var position = function () {
                            if (orientation == 'horizontal') {
                                handle.css({
                                    'left': +pixelWidth + 1 + 'px'
                                });

                                image.css({
                                    'clip': 'rect(0px ' + pixelWidth + 'px ' + height + 'px 0px)'
                                });
                            } else {
                                handle.css({
                                    'top': +pixelHeight + 1 + 'px'
                                });

                                image.css({
                                    'clip': 'rect(0px ' + width + 'px ' + pixelHeight + 'px 0px)'
                                });
                            }
                        }

                        image.css('transition', 'all ' + transitionTime + 'ms ' + transitionEasing + ' ' + transitionDelay + 'ms');
                        handle.css('transition', 'all ' + transitionTime + 'ms ' + transitionEasing + ' ' + transitionDelay + 'ms');

                        position();

                        setTimeout(function () {
                            image.css('transition', 'none');
                            handle.css('transition', 'none');
                        }, transitionTime);

                        $j(window).resize(function () {
                            height = cmpSlider.height();
                            width = cmpSlider.width();
                            pixelHeight = height * offset; //target value
                            pixelWidth = width * offset; //target value
                            position();
                        });
                    }, 100); //necessary for calcs
                }, {accX: 0, accY: -200});
            });
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorComparisonSlider = {};
    qode.modules.elementorComparisonSlider = elementorComparisonSlider;

    elementorComparisonSlider.qodeInitElementorComparisonSlider = qodeInitElementorComparisonSlider;


    elementorComparisonSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(document).ready(qodeOnWindowLoad);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorComparisonSlider();
    }


    function qodeInitElementorComparisonSlider() {
        $(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_comparison_slider.default', function() {
                qode.modules.imageGallery.qodeInitAdvancedImageGalleryMasonry();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorContentMenu = {};
    qode.modules.elementorContentMenu = elementorContentMenu;

    elementorContentMenu.qodeInitElementorContentMenu = qodeInitElementorContentMenu;


    elementorContentMenu.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorContentMenu();
    }

    function qodeInitElementorContentMenu(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_content_menu.default', function() {
                createContentMenu();
                createSelectContentMenu();
                contentMenuPosition();
                contentMenuCheckLastSection();
                contentMenuScrollTo();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorEllipticalSlider = {};
    qode.modules.elementorEllipticalSlider = elementorEllipticalSlider;

    elementorEllipticalSlider.qodeInitElementorEllipticalSlider = qodeInitElementorEllipticalSlider;


    elementorEllipticalSlider.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorEllipticalSlider();
    }

    function qodeInitElementorEllipticalSlider(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_elliptical_slider.default', function() {
                qodeInitEllipticalSlider();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorExpendableSection = {};
    qode.modules.elementorExpendableSection = elementorExpendableSection;

    elementorExpendableSection.qodeInitElementorExpendableSection = qodeInitElementorExpendableSection;


    elementorExpendableSection.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorExpendableSection();
    }

    function qodeInitElementorExpendableSection(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_expendable_section.default', function() {
                initMoreFacts();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorHorizontalTimeline = {};
    qode.modules.elementorHorizontalTimeline = elementorHorizontalTimeline;

    elementorHorizontalTimeline.qodeInitElementorHorizontalTimeline = qodeInitElementorHorizontalTimeline;


    elementorHorizontalTimeline.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorHorizontalTimeline();
    }

    function qodeInitElementorHorizontalTimeline(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_horizontal_timeline.default', function() {
                qode.modules.timeline.qodeInitHorizontalTimeline();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';
	
	var timeline = {};
	qode.modules.timeline = timeline;

	timeline.qodeInitHorizontalTimeline = qodeInitHorizontalTimeline;


	timeline.qodeOnDocumentReady = qodeOnDocumentReady;
	
	$(document).ready(qodeOnDocumentReady);
	
	/*
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function qodeOnDocumentReady() {
		qodeInitHorizontalTimeline();
	}
	
	function qodeInitHorizontalTimeline() {
		var timelines = $('.qode-horizontal-timeline');
		
		var eventsMinDistance = 120;
		if(qode.windowWidth > 680 && qode.windowWidth <= 1024) {
			eventsMinDistance = 60;
		} else if (qode.windowWidth < 680) {
			eventsMinDistance = 105;
		}
		
		if(timelines.length) {
			timelines.each(function() {
				var timeline = $(this),
					timelineComponents = {};
				
				//cache timeline components
				timelineComponents['timelineWrapper'] = timeline.find('.qode-events-wrapper');
				timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.qode-events');
				timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.qode-filling-line');
				timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
				timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
				timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
				timelineComponents['timelineNavigation'] = timeline.find('.qode-timeline-navigation');
				timelineComponents['eventsContent'] = timeline.children('.qode-events-content');
				
				timelineComponents['eventsWrapper'].find('ol li:first-child a').addClass('selected');
				timelineComponents['eventsContent'].find('ol li:first-child').addClass('selected');
				
				//assign a left postion to the single events along the timeline
				setDatePosition(timelineComponents, eventsMinDistance, timeline);
				//assign a width to the timeline
				var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance, timeline);
				//the timeline has been initialize - show it
				timeline.addClass('loaded');
				
				//detect click on the next arrow
				timelineComponents['timelineNavigation'].on('click', '.qode-next', function(event){
					event.preventDefault();
					updateSlide(timelineComponents, timelineTotWidth, 'next');
				});
				//detect click on the prev arrow
				timelineComponents['timelineNavigation'].on('click', '.qode-prev', function(event){
					event.preventDefault();
					updateSlide(timelineComponents, timelineTotWidth, 'prev');
				});
				//detect click on the a single event - show new event content
				timelineComponents['eventsWrapper'].on('click', 'a', function(event){
					event.preventDefault();
					timelineComponents['timelineEvents'].removeClass('selected');
					$(this).addClass('selected');
					updateOlderEvents($(this));
					updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
					updateVisibleContent($(this), timelineComponents['eventsContent']);
				});
				
				//on swipe, show next/prev event content
				timelineComponents['eventsContent'].on('swipeleft', function(){
					var mq = checkMQ();
					( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
				});
				timelineComponents['eventsContent'].on('swiperight', function(){
					var mq = checkMQ();
					( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
				});
				
				//keyboard navigation
				$(document).keyup(function(event){
					if(event.which === '37' && elementInViewport(timeline.get(0)) ) {
						showNewContent(timelineComponents, timelineTotWidth, 'prev');
					} else if( event.which === '39' && elementInViewport(timeline.get(0))) {
						showNewContent(timelineComponents, timelineTotWidth, 'next');
					}
				});
			});
		}
		
		function updateSlide(timelineComponents, timelineTotWidth, string) {
			//retrieve translateX value of timelineComponents['eventsWrapper']
			var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
				wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
			//translate the timeline to the left('next')/right('prev')
			(string === 'next')
				? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
				: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
		}
		
		function showNewContent(timelineComponents, timelineTotWidth, string) {
			//go from one event to the next/previous one
			var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
				newContent = ( string === 'next' ) ? visibleContent.next() : visibleContent.prev();
			
			if ( newContent.length > 0 ) { //if there's a next/prev event - show it
				var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
					newEvent = ( string === 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
				
				updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent(newEvent, timelineComponents['eventsContent']);
				newEvent.addClass('selected');
				selectedDate.removeClass('selected');
				updateOlderEvents(newEvent);
				updateTimelinePosition(string, newEvent, timelineComponents);
			}
		}
		
		function updateTimelinePosition(string, event, timelineComponents) {
			//translate timeline to the left/right according to the position of the selected event
			var eventStyle = window.getComputedStyle(event.get(0), null),
				eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
				timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
				timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
			var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);
			
			if( (string === 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
				translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
			}
		}
		
		function translateTimeline(timelineComponents, value, totWidth) {
			var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
			value = (value > 0) ? 0 : value; //only negative translate value
			value = ( typeof totWidth !== 'undefined' &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
			setTransformValue(eventsWrapper, 'translateX', value+'px');
			//update navigation arrows visibility
			(value === 0 ) ? timelineComponents['timelineNavigation'].find('.qode-prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.qode-prev').removeClass('inactive');
			(value === totWidth ) ? timelineComponents['timelineNavigation'].find('.qode-next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.qode-next').removeClass('inactive');
		}
		
		function disableTranslateTimeline(timelineComponents) {
			timelineComponents['timelineNavigation'].find('.qode-prev').addClass('inactive');
			timelineComponents['timelineNavigation'].find('.qode-next').addClass('inactive');
		}
		
		function updateFilling(selectedEvent, filling, totWidth) {
			//change .filling-line length according to the selected event
			var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
				eventLeft = eventStyle.getPropertyValue("left"),
				eventWidth = eventStyle.getPropertyValue("width");
			eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
			var scaleValue = eventLeft/totWidth;
			setTransformValue(filling.get(0), 'scaleX', scaleValue);
		}
		
		function setDatePosition(timelineComponents, min, timeline) {
			var shorten = false;
			for (var i = 0; i < timelineComponents['timelineDates'].length; i++) {
				var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
					distanceNorm = Math.round(distance/timelineComponents['eventsMinLapse']) + 1;
				/* 24 is width of circles placed in link :after element */
				timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm*min-24+'px');
				/* 80 is width of 2*40 margins on qode-events-wrapper */
				if(distanceNorm*min < timeline.outerWidth() - 80) {
					shorten = true;
				}
				else {
					shorten = false;
				}
			}
			if(shorten) {
				disableTranslateTimeline(timelineComponents);
				/* 80 is width of 2*40 margins on qode-events-wrapper, 24 is width of circles placed in link :after element */
				var minDistance = (timeline.outerWidth() - 80 - (timelineComponents['timelineDates'].length - 1) * 24) / (timelineComponents['timelineDates'].length + 1);
				for (var i = 0; i < timelineComponents['timelineDates'].length; i++) {
					timelineComponents['timelineEvents'].eq(i).css('left', (i+1)*minDistance+'px');
				}
			}
		}
		
		function setTimelineWidth(timelineComponents, width, timeline) {
			var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
				timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
				timeSpanNorm = Math.round(timeSpanNorm) + 2,
				totalWidth = timeSpanNorm*width;
			/* 80 is width of 2*40 margins on qode-events-wrapper */
			if(totalWidth < timeline.outerWidth() - 80) {
				totalWidth = timeline.outerWidth() - 80;
			}
			timelineComponents['eventsWrapper'].css('width', totalWidth+"px");
			updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
			updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);
			
			return totalWidth;
		}
		
		function updateVisibleContent(event, eventsContent) {
			var eventDate = event.data('date'),
				visibleContent = eventsContent.find('.selected'),
				selectedContent = eventsContent.find('[data-date="'+ eventDate +'"]'),
				selectedContentHeight = selectedContent.height();
			
			if (selectedContent.index() > visibleContent.index()) {
				var classEnetering = 'selected qode-enter-right',
					classLeaving = 'qode-leave-left';
			} else {
				var classEnetering = 'selected qode-enter-left',
					classLeaving = 'qode-leave-right';
			}
			
			selectedContent.attr('class', classEnetering);
			visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
				visibleContent.removeClass('qode-leave-right qode-leave-left');
				selectedContent.removeClass('qode-enter-left qode-enter-right');
			});
			eventsContent.css('height', selectedContentHeight+'px');
		}
		
		function updateOlderEvents(event) {
			event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
		}
		
		function getTranslateValue(timeline) {
			var timelineStyle = window.getComputedStyle(timeline.get(0), null),
				timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
					timelineStyle.getPropertyValue("-moz-transform") ||
					timelineStyle.getPropertyValue("-ms-transform") ||
					timelineStyle.getPropertyValue("-o-transform") ||
					timelineStyle.getPropertyValue("transform");
			
			if( timelineTranslate.indexOf('(') >= 0 ) {
				var timelineTranslate = timelineTranslate.split('(')[1];
				timelineTranslate = timelineTranslate.split(')')[0];
				timelineTranslate = timelineTranslate.split(',');
				var translateValue = timelineTranslate[4];
			} else {
				var translateValue = 0;
			}
			
			return Number(translateValue);
		}
		
		function setTransformValue(element, property, value) {
			element.style["-webkit-transform"] = property+"("+value+")";
			element.style["-moz-transform"] = property+"("+value+")";
			element.style["-ms-transform"] = property+"("+value+")";
			element.style["-o-transform"] = property+"("+value+")";
			element.style["transform"] = property+"("+value+")";
		}
		
		//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
		function parseDate(events) {
			var dateArrays = [];
			events.each(function(){
				var singleDate = $(this),
					dateComp = singleDate.data('date').split('T');
				if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
					var dayComp = dateComp[0].split('/'),
						timeComp = dateComp[1].split(':');
				} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
					var dayComp = ["2000", "0", "0"],
						timeComp = dateComp[0].split(':');
				} else { //only DD/MM/YEAR
					var dayComp = dateComp[0].split('/'),
						timeComp = ["0", "0"];
				}
				var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
				dateArrays.push(newDate);
			});
			return dateArrays;
		}
		
		function daydiff(first, second) {
			return Math.round((second-first));
		}
		
		function minLapse(dates) {
			//determine the minimum distance among events
			var dateDistances = [];
			for (var i = 1; i < dates.length; i++) {
				var distance = daydiff(dates[i-1], dates[i]);
				dateDistances.push(distance);
			}
			return Math.min.apply(null, dateDistances);
		}
		
		/*
		 How to tell if a DOM element is visible in the current viewport?
		 http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
		 */
		function elementInViewport(el) {
			var top = el.offsetTop;
			var left = el.offsetLeft;
			var width = el.offsetWidth;
			var height = el.offsetHeight;
			
			while(el.offsetParent) {
				el = el.offsetParent;
				top += el.offsetTop;
				left += el.offsetLeft;
			}
			
			return (
				top < (window.pageYOffset + window.innerHeight) &&
				left < (window.pageXOffset + window.innerWidth) &&
				(top + height) > window.pageYOffset &&
				(left + width) > window.pageXOffset
			);
		}
		
		function checkMQ() {
			//check if mobile or desktop device
			return window.getComputedStyle(document.querySelector('.qode-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
		}
	}

})(jQuery);
(function($) {
    'use strict';

    var elementorInfoCardWithIcon = {};
    qode.modules.elementorInfoCardWithIcon = elementorInfoCardWithIcon;

    elementorInfoCardWithIcon.qodeInitElementorInfoCardWithIcon = qodeInitElementorInfoCardWithIcon;


    elementorInfoCardWithIcon.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorInfoCardWithIcon();
    }

    function qodeInitElementorInfoCardWithIcon(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_info_card_with_icon.default', function() {
                qodeIcon().init();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorInteractiveIconShowcase = {};
    qode.modules.elementorInteractiveIconShowcase = elementorInteractiveIconShowcase;

    elementorInteractiveIconShowcase.qodeInitElementorInteractiveIconShowcase = qodeInitElementorInteractiveIconShowcase;


    elementorInteractiveIconShowcase.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorInteractiveIconShowcase();
    }

    function qodeInitElementorInteractiveIconShowcase(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_interactive_icon_showcase.default', function() {
                qodeInitInteractiveIconShowcase();
            } );
        });
    }

})(jQuery);

(function($) {
	'use strict';
	
	var elementorInteractiveProjectList = {};
	qode.modules.elementorInteractiveProjectList = elementorInteractiveProjectList;
	
	elementorInteractiveProjectList.qodeInitElementorInteractiveProjectList = qodeInitElementorInteractiveProjectList;
	
	
	elementorInteractiveProjectList.qodeOnWindowLoad = qodeOnWindowLoad;
	
	$(window).load(qodeOnWindowLoad);
	
	/*
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function qodeOnWindowLoad() {
		qodeInitElementorInteractiveProjectList();
	}
	
	function qodeInitElementorInteractiveProjectList(){
		$j(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_interactive_project_list.default', function() {
				qodeInitInteractiveIconShowcase();
			} );
		});
	}
	
})(jQuery);

(function($) {
	'use strict';
	
	var interactiveProjectList = {};
	qode.modules.interactiveProjectList = interactiveProjectList;
	
	interactiveProjectList.qodeInitInteractiveProjectList = qodeInitPortfolioInteractiveItemShowcase;
	interactiveProjectList.qodeInitPortfolioInteractiveLinkShowcase = qodeInitPortfolioInteractiveLinkShowcase;
	
	
	interactiveProjectList.qodeOnDocumentReady = qodeOnDocumentReady;
	
	$(document).ready(qodeOnDocumentReady);
	
	/*
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function qodeOnDocumentReady() {
		qodeInitPortfolioInteractiveItemShowcase();
		qodeInitPortfolioInteractiveLinkShowcase();
		qodeOutlineTextAnimation();
	}
	
	function qodeInitPortfolioInteractiveItemShowcase() {
		var projectList = $('.qode-interactive-project-list');
		
		if (projectList.length) {
			projectList.each(function () {
				var holder = $(this),
					item = holder.find('.qode-ipl-item'),
					backgroundImagesHolder = holder.find('.qode-ipl-right'),
					backgroundImages = backgroundImagesHolder.find('.qode-ipl-image'),
					indexCounterImg = 0,
					indexCounterItem = 0;
				
				backgroundImages.each(function() {
					$(this).attr('img-index', indexCounterImg);
					$(this).data('img-index', indexCounterImg);
					indexCounterImg++;
				});
				
				item.each(function() {
					$(this).attr('data-index', indexCounterItem);
					$(this).data('data-index', indexCounterItem);
					indexCounterItem++;
				});
				
				item.each(function () {
					var thisItem = $(this),
						thisTitle = thisItem.find('.qode-ipl-title'),
						thisLink = thisItem.find('.qode-pli-link');
					
					thisItem.find(thisLink).appendTo(thisTitle);
				});
				
				item.on('mouseenter', function () {
					var currentIndex = $(this).data('data-index');
					backgroundImages.css('opacity', 0);
					backgroundImagesHolder.find('.qode-ipl-image[img-index="'+ currentIndex +'"]').css('opacity', 1);
				}).on('mouseleave', function () {
				});
			});
		}
	}
	
	function qodeInitPortfolioInteractiveLinkShowcase() {
		var interactiveLinkShowcase = $('.qode-interactive-project-list');
		
		if (interactiveLinkShowcase.length) {
			interactiveLinkShowcase.each(function () {
				var thisInteractiveLinkShowcase = $(this),
					singleImage = thisInteractiveLinkShowcase.find('.qode-ipl-right .qode-ipl-image'),
					singleLink = thisInteractiveLinkShowcase.find('.qode-ipl-left .qode-ipl-item');
				
				singleImage.eq(0).addClass('qode-active');
				singleLink.eq(0).addClass('qode-active');
				thisInteractiveLinkShowcase.find('.qode-ipl-left .qode-ipl-item[data-index="0"]').addClass('qode-active');
				
				singleLink.children().on('touchstart mouseenter', function () {
					var thisLink = $(this).parent(),
						index = parseInt(thisLink.data('index'), 10);
					
					singleImage.removeClass('qode-active').eq(index).addClass('qode-active');
					singleLink.removeClass('qode-active');
					thisInteractiveLinkShowcase.find('.qode-ipl-left .qode-ipl-item[data-index="' + index + '"]').addClass('qode-active');
				});
			});
		}
	}
	
	function qodeOutlineTextAnimation() {
		var interactiveShowcase = $('.qode-interactive-project-list');
		
		if (interactiveShowcase.length) {
			interactiveShowcase.each(function () {
				var thisShowcase = $(this);
				
				thisShowcase.find('.qode-ipl-item').each(function () {
					var thisItemTitle = $(this).find('.qode-ipl-title');
					var thisItemText = thisItemTitle.text();
					thisItemTitle.attr('data-title', thisItemText);
				});
			});
		}
	}
	
})(jQuery);
(function($) {
    'use strict';

    var elementorInterestRateCalculator = {};
    qode.modules.elementorInterestRateCalculator = elementorInterestRateCalculator;

    elementorInterestRateCalculator.qodeInitElementorInterestRateCalculator = qodeInitElementorInterestRateCalculator;


    elementorInterestRateCalculator.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorInterestRateCalculator();
    }

    function qodeInitElementorInterestRateCalculator(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_interest_rate_calculator.default', function() {
                qode.modules.interestRateCalculator.qodeInitInterestRateCalculator();
            } );
        });
    }

})(jQuery);

(function($) {
    'use strict';
	
	var interestRateCalculator = {};
	qode.modules.interestRateCalculator = interestRateCalculator;
	
	interestRateCalculator.qodeInitInterestRateCalculator = qodeInitInterestRateCalculator;
	
	
	interestRateCalculator.qodeOnWindowLoad = qodeOnWindowLoad;
	
	$(document).ready(qodeOnWindowLoad);
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function qodeOnWindowLoad() {
		qodeInitInterestRateCalculator();
	}


	function qodeInitInterestRateCalculator(){
		qodeInitRangeSlider();
	}

	function qodeInitRangeSlider(){

		var holder =  $('.qode-irc-holder');

		if(holder.length){		
			holder.each(function(){
				var holder1 = $(this);
				var slider = holder1.find('.irc-range-slider');
				var interestRate;

				if(holder1.data('rate')!=''){
					interestRate = parseFloat(holder1.data('rate'));
				}

				// Rangeslider initialization
				slider.rangeslider({
					polyfill: false,
					onInit: function(position, value) {
						if(holder1.data('active-color')!=''){
							var activeColor = holder1.data('active-color');
							holder1.find('.rangeslider__fill').css('background-color',activeColor);
							holder1.find('.rangeslider__handle').css('background-color',activeColor);
						}
						qodeInterestRateCalculate(holder1, interestRate);
					},
					onSlide: function(position, value) {
						qodeInterestRateCalculate(holder1, interestRate);
					}
				});
			})
		}

	}

	function qodeInterestRateCalculate(holder, interestRate){

		var loanSlider = holder.find('.irc-range-slider-loan');
		var periodSlider = holder.find('.irc-range-slider-period');
		var borrowHolder = holder.find('.qode-irc-borrow-row .qode-irc-value');
		var interestHolder = holder.find('.qode-irc-interest-row .qode-irc-value');
		var totalHolder = holder.find('.qode-irc-total-row .qode-irc-value');
		var currentLoanHolder = holder.find('.qode-irc-slider-loan-value.irc-current .irc-current-value');
		var currentPeriodHolder = holder.find('.qode-irc-slider-period-value.irc-current .irc-current-value');
		var loanValue, periodValue, interest, borrow, total;

		loanValue = parseFloat(loanSlider.val());
		periodValue = parseFloat(periodSlider.val());
		interest = loanValue * interestRate / 100;
		total = loanValue + interest;
		if(periodValue != 0){
			borrow = total / periodValue;
		}
		borrowHolder.html(Math.round(borrow*100)/100);
		interestHolder.html(Math.round(interest*100)/100);
		totalHolder.html(Math.round(total*100)/100);
		currentLoanHolder.html(loanValue);
		currentPeriodHolder.html(periodValue);

	}

})(jQuery);
(function($) {
    'use strict';

    var elementorItemShowcase = {};
    qode.modules.elementorItemShowcase = elementorItemShowcase;

    elementorItemShowcase.qodeInitElementorItemShowcase = qodeInitElementorItemShowcase;


    elementorItemShowcase.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorItemShowcase();
    }

    function qodeInitElementorItemShowcase(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_item_showcase.default', function() {
                qodeLazyImages();
                initItemShowcase();
            } );
        });
    }

})(jQuery);

(function($) {
    'use strict';
	
	var multiDeviceShowcase = {};
	qode.modules.multiDeviceShowcase = multiDeviceShowcase;
	
	multiDeviceShowcase.qodeInitMultiDeviceShowcase = qodeInitMultiDeviceShowcase;
	
	multiDeviceShowcase.qodeOnDocumentReady = qodeOnDocumentReady;

	$(document).ready(qodeOnDocumentReady);
	
	/*
	 ** All functions to be called on $(document).ready() should be in this function
	 */
	function qodeOnDocumentReady() {
		qodeInitMultiDeviceShowcase();
	}

	/*
	 ** Init Multi-Device Showcase shortcode
	 */
	function qodeInitMultiDeviceShowcase(){
		var mds = $('#qode-multi-device-showcase');

		if (mds.length) {
			var	shortcodeHeight = mds.height(),
				shortcodeOffset = mds.offset().top,
				shortcodeArea = shortcodeHeight - shortcodeOffset,
				laptopSlider = $('#qode-mds-laptop-slider'),
				laptopSlides = laptopSlider.find('.qode-mds-slide'),
				tabletSlider = $('#qode-mds-tablet-slider'),
				tabletSlides = tabletSlider.find('.qode-mds-slide'),
				phoneSlider = $('#qode-mds-phone-slider'),
				phoneSlides = phoneSlider.find('.qode-mds-slide'),
				spinner = $("#qode-mds-spinner"),
				prepped = false, //slides given active class
				initialized = false, //first scroll done
				readyToScroll = false; //flag for one scroll effect

			//fullscreen calcs
			var fullscreenCalcs = function() {
			    var heightVal = $window_height - mds.offset().top;
			    mds.css('height', heightVal);
			}

			//fix sizes to prevent flicker on slide animation
			var fixSizes = function(slider) {
				var slidesInnerHolders = slider.find('.qode-mds-slides-inner');

				slidesInnerHolders.each(function(){
					var slidesInnerHolder = $(this),
						heightVal = Math.round(slidesInnerHolder.parent().height() - 1),
						widthVal = Math.round(slidesInnerHolder.parent().width() - 1);

					slidesInnerHolder.css({
						'height': heightVal,
						'width': widthVal
					});
				});
			}

			//set active classes for first slides 
			var prepSlides = function(slides, slider, numberOfSliders, sliderIndex) {
				slides.first().addClass('qode-active qode-mds-no-animation');

				if (!prepped && (sliderIndex == numberOfSliders)) {
					prepped = true;
					$(document).trigger('qodeMDSSlidePrepped');
				}
			}

			//slideshow loop
			var nextSlide = function(slides) {
                if (slides.filter('.qode-active').next().index() > 0) { 
                	slides.removeClass('qode-remove qode-mds-no-animation');
                	slides.filter('.qode-active').removeClass('qode-active').addClass('qode-remove');
                	slides.filter('.qode-remove').next().addClass('qode-active');
                } else {
                	slides.removeClass('qode-active qode-remove qode-mds-no-animation');
                	slides.last().addClass('qode-remove');
                	slides.first().addClass('qode-active');
                }
			}

			var initDeviceSliders = function() {
				var sliders = laptopSlider.add(tabletSlider).add(phoneSlider),
					numberOfSliders = sliders.length,
					startDelay = mds.data('start-delay'), //slideshow start delay
					slideInterval = mds.data('slide-interval'); //slideshow repeat interval

				sliders.each(function(i){
					var slider = $(this),
						slides = slider.find('.qode-mds-slide'),
						numberOfSlides = slides.length;

					prepSlides(slides, slider, numberOfSliders, i+1);
				});
					
	 			qodeRequestAnimationFrame(); //init raf shim
				mds.addClass('qode-mds-animating'); //slideshow ready

				//to upgrade: not to require all sliders for slideshow
				//to upgrade: if one image set in slider, no slideshow
				var slideSequence = function() {
					//laptop, tablet, phone - all visible OR laptop visible only
					if (tabletSlider.is(':visible') && phoneSlider.is(':visible')) {
						//laptop slide
						nextSlide(laptopSlides);
						laptopSlider.one(qode.animationEnd, function(){
							//tablet slide
							nextSlide(tabletSlides);
							tabletSlider.one(qode.animationEnd, function(){
								//phone slide
								nextSlide(phoneSlides);
								phoneSlider.one(qode.animationEnd, function(){
									//repeat
									setTimeout(function(){
										requestAnimFrame(slideSequence);
									}, slideInterval);
								});
							});
						});
					} else {
						//laptop slide
						nextSlide(laptopSlides);
						laptopSlider.one(qode.animationEnd, function(){
							//repeat
							setTimeout(function(){
								requestAnimFrame(slideSequence);
							}, slideInterval);
						});
					}
				}

				//slideshow sequence start
				setTimeout(function(){
					slideSequence();
				}, startDelay);
			}

			//loading appear animation fx on non-touch devices
			var appearAnimation = function() {
				if (mds.hasClass('qode-mds-appear-effect') && !$('html').hasClass('touch')) {
					var deviceHolders = mds.find('.qode-mds-device-holder'),
						contentHolder = mds.find('.qode-mds-content-holder');

					mds.addClass('qode-mds-loading');

					spinner.fadeOut(300, function(){
						deviceHolders.addClass('qode-show-device');
						mds.one(qode.transitionEnd, function(){
							contentHolder.addClass('qode-show-item');
							contentHolder.last().one(qode.transitionEnd, function(){
								if (!readyToScroll) {
									readyToScroll = true;
									$(document).trigger('qodeMDSReadyToScroll');
								}
							});
						});
					});
				} else {
					spinner.fadeOut(300);
					if (!readyToScroll) {
						readyToScroll = true;
						$(document).trigger('qodeMDSReadyToScroll');
					}
				}
			}

			//mds scroll initialized
			var mdsScrollStart = function() {
				if (!initialized) {
					initialized = true;
					//if filter present blink fix if page scrolled initially
					if ($('.qode-demos-filter-holder').length) {
						$('.qode-demos-filter-holder').css('visibility','visible');
					}
				}
			}

			//perform one scroll effect
			var scrollWheelBehavior = function() {
				if (mds.hasClass('qode-mds-one-scroll-to-content') && !$('html').hasClass('touch')) {
					var shortcode = mds,
			            scrollingForward = false,
					    pageJump = false,
			            reInitOneScroll = false,
					    normalScroll = true,
					    fixScroll = false;

					var scrollHandler = function() {
					    if  ($(window).scrollTop() < shortcodeArea) {
					        normalScroll = false;
					    }

					    var qScrollTo = function() {
					    	mdsScrollStart();
					        pageJump = true;
					        $('html, body').stop(true).animate({
					            scrollTop: shortcodeArea 
					        }, 1000, 'easeInOutQuint', function() {
					            fixScroll = true;
            		            if (fixScroll) {
					            	$(window).scrollTop(shortcodeArea);
					            }
	            	            $(window).scroll(function(){
	            		            if (fixScroll) {
	            		            	$(window).scrollTop(shortcodeArea);
	            		            }
	            		        });
					            normalScroll = true;
					            reInitOneScroll = false;
					            setTimeout(function(){
						            pageJump = false;
						            fixScroll = false;
						            $(document).trigger('qodeMDSScrolled');
					            }, 200);
					        });
					    }

					    //update values
					    $(window).scroll(function(){
					    	if ($scroll < shortcodeArea) {
					    	    reInitOneScroll = true;

						    	if (scrollingForward) {
						    		normalScroll = false;
						    	}
					    	}
					    });

					    //wheel handle
					    window.addEventListener('wheel', function(event) {
					    	if ($scroll < shortcodeArea) {
					        	var wheelScroll = event.deltaY;

						        if (wheelScroll > 0) {
						            scrollingForward = true;
						        } else {
						            scrollingForward = false;
						        }

						        if (!pageJump && !normalScroll) {
						            if (scrollingForward) {
						                event.preventDefault();
						                qScrollTo();
						            }
						        } else {
						        	if (!normalScroll) {
						        	    event.preventDefault();
						        	}
						            if (normalScroll && !scrollingForward && reInitOneScroll) {
						                pageJump = false;
						                normalScroll = false;
						                event.preventDefault();
						            }	
							    }
							}

							if (pageJump) {
								event.preventDefault();
							}
					    }); 

					    //scrollbar click
					    $(document).on('mousedown', function(event){
					        if(($(window).outerWidth() <= event.pageX) && ($scroll <= shortcodeArea)) {
				                event.preventDefault();
				                qScrollTo();
					        }
					    });
					}

					//prevent mousewheel scroll
					window.addEventListener('wheel', function (event) {
					    if (!readyToScroll || !initialized) {
					        event.preventDefault();
					    }
					});

					//prevent scrollbar scroll
					window.addEventListener('scroll', function () {
					    if (!readyToScroll || !initialized) {
					        $(window).scrollTop(shortcodeOffset);
					    }
					})  

					//init scroll handler
				    $(document).on('qodeMDSReadyToScroll', function(){
				        scrollHandler();
				    });   
				}
			}

			//btn click, works on touch as well
			var scrollBtnBehavior = function() {
				if (mds.hasClass('qode-mds-btn-scroll-below')) {
					var	shortcode = mds,
						btn = mds.find('.qode-mds-button-holder .qbutton');

					btn.on('click', function(event) {
						event.preventDefault();
						
						if (readyToScroll) {
							mdsScrollStart();

							$('html, body').stop().animate({
							    scrollTop: shortcodeArea 
							}, 1000, 'easeInOutQuint', function() {
							    $(document).trigger('qodeMDSScrolled');
							});
						}

						return false;
					});
				}
			}

			//update shortcode height and offset
			var updateCoordinates = function() {
				shortcodeHeight = mds.height();
				shortcodeOffset = mds.offset().top;
				shortcodeArea = shortcodeHeight - shortcodeOffset;
			}

			//initialization
			scrollWheelBehavior();
			scrollBtnBehavior();

			mds.imagesLoaded({background: true}, function() {
			    fullscreenCalcs();
			   	initDeviceSliders();
			});

			$(document).on('qodeMDSSlidePrepped', function(){
	            appearAnimation();
			});

			$(window).load(function(){
                fixSizes(laptopSlider);
			});

			$(window).scroll(function(){
				updateCoordinates();
			});

			$(window).resize(function(){
			    fullscreenCalcs();
				updateCoordinates();
			    fixSizes(laptopSlider);
			});
		}	
	}
})(jQuery);
(function($) {
    'use strict';

    var elementorNumberedCarousel = {};
    qode.modules.elementorNumberedCarousel = elementorNumberedCarousel;

    elementorNumberedCarousel.qodeInitElementorNumberedCarousel = qodeInitElementorNumberedCarousel;


    elementorNumberedCarousel.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorNumberedCarousel();
    }

    function qodeInitElementorNumberedCarousel(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_numbered_carousel.default', function() {
                qode.modules.numberedCarousel.qodeNumberedCarousel().init();
            } );
        });
    }

})(jQuery);

(function ($) {
    'use strict';

    var numberedCarousel = {};
    qode.modules.numberedCarousel = numberedCarousel;

    numberedCarousel.qodeNumberedCarousel = qodeNumberedCarousel;
    numberedCarousel.qodeOnDocumentReady = qodeOnDocumentReady;

    $(document).ready(qodeOnDocumentReady);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function qodeOnDocumentReady() {
        qodeNumberedCarousel().init();
    }

    /**
     * Init Numbered Carousel Shortcode
     */
    function qodeNumberedCarousel() {
        //initial setup
        var setup = function (carousel) {
            var swiper = new Swiper(carousel, {
                speed: 800,
                centeredSlides: true,
                slidesPerView: 'auto',
                allowTouchMove: false,
                init: false
            });

            var holder = carousel.closest('.qode-numbered-carousel'),
                bgItems = holder.find('.qode-nc-bg-item'),
                indicators = holder.find('.qode-nc-indicator'),
                gridTrigger = holder.find('.qode-nc-grid-line:last-child'),
                ieFallback = qode_body.hasClass('qode-ms-explorer');

            swiper.on('init', function () {
                holder.data('items', bgItems.length);

                iterate(holder, carousel, bgItems, indicators, carousel.find('.swiper-wrapper'));
                changeActiveSlide(holder, swiper);

                //initial animation
                carousel
                    .addClass('qode-show')
                    .one(qode.transitionEnd, function () {
                        holder.addClass('qode-initialized');
                        gridTrigger.one(qode.transitionEnd, function () {
                            holder.data('idle', true);
                        });
                        ieFallback && holder.data('idle', true);
                    });
            });

            swiper.on('slideChangeTransitionEnd', function () {
                iterate(holder, carousel, bgItems, indicators, carousel.find('.swiper-wrapper'));

                //wait for last item to unmask
                holder.removeClass('qode-mask');
                gridTrigger.one(qode.transitionEnd, function () {
                    holder.data('idle', true);
                });
                ieFallback && holder.data('idle', true);
            });

            //initialize swiper
            carousel.waitForImages(swiper.init());
        }

        //toggle on every slide iteration
        var iterate = function (holder, carousel, bgItems, indicators, wrapper) {
            setActiveIndex(holder, carousel);
            changeActiveItem(holder, bgItems);
            changeActiveItem(holder, indicators);
            !qode_body.hasClass('qode-ms-explorer') && roundTransformVal(wrapper);
        }

        //fix swiper calcs for center layout type
        var roundTransformVal = function (wrapper) {
            var val = Math.round(wrapper.css('transform').split(',')[4]);
            
            wrapper.css('transform', 'matrix(1, 0, 0, 1, ' + val + ', 0)');
        }

        //sets active index to holder element
        var setActiveIndex = function (holder, carousel) {
            var activeIndex = carousel.find('.swiper-slide-active').data('index');
            holder.data('active-index', activeIndex);
        }

        //change css class
        var changeClass = function (holder, cssClass) {
            holder
                .removeClass('qode-next qode-prev')
                .addClass(cssClass);
        }

        //declarative item change - bg item, indicators
        var changeActiveItem = function (holder, items) {
            var activeItem = items.filter(function () {
                return $(this).data("index") == holder.data('active-index')
            });

            items.removeClass('qode-active');
            activeItem.addClass('qode-active');
        }

        //declarative slide change
        var changeActiveSlide = function (holder, swiper) {
            var delay = 500,
                speed = 800;

            var slideTo = function (holder, swiper, direction) {
                changeClass(holder, 'qode-' + direction);

                holder.data('idle', false);
                holder.addClass('qode-mask');

                if (direction == 'next') {
                    setTimeout(function () {
                        swiper.slideNext(speed);
                    }, delay);
                } else {
                    //fade before transition
                    holder.addClass('qode-fade-prev-content');
                    setTimeout(function () {
                        holder.removeClass('qode-fade-prev-content');
                        swiper.slidePrev(speed);
                    }, delay * 1.5);
                }
            }

            var clickHandler = function (e) {
                var item = $(e.currentTarget);

                if (item.hasClass('swiper-slide-next')) {
                    holder.data('idle') && slideTo(holder, swiper, 'next');
                } else if (item.hasClass('swiper-slide-prev')) {
                    holder.data('idle') && slideTo(holder, swiper, 'prev');
                }
            }

            var wheelHandler = function (e) {
                if (holder.data('idle')) {
                    var direction = e.deltaY > 0 ? 'next' : 'prev',
                        activeIndex = holder.data('active-index');

                    if (direction == 'next' && activeIndex < holder.data('items') ||
                        direction == 'prev' && activeIndex > 1) {
                        slideTo(holder, swiper, direction);
                    }
                }
            }

            var touchStart = function (e) {
                holder.data('touch-start', parseInt(e.changedTouches[0].clientX));
            }

            var touchMove = function (e) {
                holder.data('touch-move', parseInt(e.changedTouches[0].clientX));

                var delta = holder.data('touch-move') - holder.data('touch-start');

                if (holder.data('idle')) {
                    var direction = delta < 0 ? 'next' : 'prev',
                        activeIndex = holder.data('active-index');

                    if (direction == 'next' && activeIndex < holder.data('items') ||
                        direction == 'prev' && activeIndex > 1) {
                        slideTo(holder, swiper, direction);
                    }
                }
            }

            holder.on('click', '.swiper-slide', clickHandler);
            if (holder.hasClass('qode-change-on-scroll')) {
                holder[0].addEventListener('wheel', wheelHandler);
                Modernizr.touch && holder[0].addEventListener('touchstart', touchStart);
                Modernizr.touch && holder[0].addEventListener('touchmove', touchMove);
            }
        }

        return {
            init: function () {
                var carousels = $('.qode-numbered-carousel');

                if (carousels.length) {
                    carousels.each(function () {
                        var carousel = $(this).find('.swiper-container');

                        setup(carousel);
                    });
                }
            }
        }
    }
})(jQuery);
(function($) {
	'use strict';
	
	var elementorPortfolioListStacked = {};
	qode.modules.elementorPortfolioListStacked = elementorPortfolioListStacked;
	
	elementorPortfolioListStacked.qodeInitElementorPortfolioListStacked = qodeInitElementorPortfolioListStacked;
	
	
	elementorPortfolioListStacked.qodeOnWindowLoad = qodeOnWindowLoad;
	
	$(window).load(qodeOnWindowLoad);
	
	/*
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function qodeOnWindowLoad() {
		qodeInitElementorPortfolioListStacked();
	}
	
	function qodeInitElementorPortfolioListStacked(){
		$j(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_portfolio_list_stacked.default', function() {
				qode.modules.ptfListStacked.qodeInitPortfolioListStacked().init();
			} );
		});
	}
	
})(jQuery);

(function ($) {
    'use strict';

    var ptfListStacked = {};
    qode.modules.ptfListStacked = ptfListStacked;

    ptfListStacked.qodeOnWindowLoad = qodeOnWindowLoad;
    ptfListStacked.qodeOnWindowResize = qodeOnWindowResize;
	ptfListStacked.qodeInitPortfolioListStacked = qodeInitPortfolioListStacked;

    $(window).load(qodeOnWindowLoad);
    $(window).resize(qodeOnWindowResize);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitPortfolioListStacked().init();
    }

    /*
     All functions to be called on $(window).resize() should be in this function
     */
    function qodeOnWindowResize() {
        qodeInitPortfolioListStacked().resize();
    }

    /**
     * Initializes portfolio list stacked
     */
    function qodeInitPortfolioListStacked() {
        var holder = $('#qode-portfolio-list-stacked');
        
        if (holder.length) {
            //items
            holder.items = holder.find('.qode-pls-item');
            holder.total = holder.items.length;
            holder.textItems = holder.find('.qode-pls-text-item');
            holder.imgs = holder.find('img');
            holder.info = $('#qode-pls-info');
            holder.endOfScrollVisible = false;
            holder.endOfScroll = holder.find('.qode-pls-end-of-scroll');
            //state
            holder.activeIndex = 0;
            holder.activeText = holder.textItems.first();
            holder.direction = null;
            //move
            holder.deltaY = 0;
            //tilt
            holder.tilt = 30;
            holder.tX = 0;
            holder.tY = 0;
            //item move
            holder.items.each(function () {
                $(this).data('move', 0);
                $(this).data('buffer', 0);
            });
        }

        var setIndexes = function () {
            holder.items.each(function () {
                var item = $(this);

                item.css({
                    'z-index': holder.total - item.data('index')
                });
            })
        }

        var setWidth = function () {
            var c = 1;
            if (qode.windowWidth <= 1440 && qode.windowWidth > 1024) c = 0.65;
            if (qode.windowWidth <= 1024 && qode.windowWidth > 768) c = 0.5;
            if (qode.windowWidth <= 768 && qode.windowWidth > 414) c = 0.4;
            if (qode.windowWidth <= 414 && qode.windowWidth > 320) c = 0.25;
            if (qode.windowWidth <= 320) c = .2;

            holder.items.each(function () {
                var el = $(this),
                    w = (el.find('img')[0].naturalWidth / Math.min(qode.windowWidth, 1920) * 100).toFixed(2),
                    h = (el.find('img')[0].naturalHeight / Math.min(qode.windowHeight, 1080) * 100).toFixed(2);

                var css = {
                    'width': w * c + '%',
                    'height': h * c + '%'
                };
                el.css(css);
            })
        };

        var positionItems = function () {
            holder.items.each(function () {
                var item = $(this),
                    inner = item.find('.qode-pls-item-inner'),
                    x = qode.windowWidth >= 1200 ? parseInt(item.data('x')) : parseInt(item.data('x')) * .88,
                    y = qode.windowWidth > 1024 ? parseInt(item.data('y')) : parseInt(item.data('y')) + 20;

                var offsets = {
                    'top': (y || 50) + '%',
                    'left': (x || 50) + '%',
                }

                item.css(offsets);
                inner.css('transform', 'translateX(' + parseInt(isNaN(x) ? -50 : 0) + '%) translateY(' + parseInt(isNaN(y) ? -50 : 0) + '%)');
            });
        };

        var offScreen = function (item) {
            return item.offset().top <= -item.height() * 0.97
        }

        var showEndOfScroll = function () {
            holder.endOfScrollVisible = true;
            holder.endOfScroll.addClass('qode-visible');
            holder.addClass('qode-eos');
        };

        var hideEndOfScroll = function () {
            holder.endOfScrollVisible = false;
            holder.endOfScroll.removeClass('qode-visible');
            holder.removeClass('qode-eos');
        };

        var getActiveItem = function () {
            holder.items.removeClass('qode-active');
            return holder.items.filter(function () {
                return $(this).data('index') == holder.activeIndex
            });
        };

        var setActiveText = function () {
            holder.textItems.removeClass('qode-active');
            holder.activeText = holder.textItems.filter(function () {
                return $(this).data('index') == holder.activeIndex
            }).addClass('qode-active');
        };

        var movement = function () {
            var activeItem = holder.items.filter(function () {
                return $(this).data('index') == holder.activeIndex
            });

            if (holder.direction == 'next' && offScreen(activeItem.find('img'))) {
                holder.activeIndex++;
                if (holder.activeIndex == holder.total) holder.deltaY = 0;
                holder.activeIndex = Math.min(holder.activeIndex, holder.total - 1);
                activeItem = getActiveItem();
            } else if (holder.direction == 'prev') {
                if (activeItem.data('move') == 0) {
                    holder.endOfScrollVisible && hideEndOfScroll();
                    holder.activeIndex--;
                    holder.activeIndex = Math.max(holder.activeIndex, 0);
                    activeItem = getActiveItem();
                }
            }

            !holder.endOfScrollVisible &&
                holder.direction == 'next' &&
                holder.activeIndex == holder.total - 1 &&
                Math.abs(activeItem.data('move')) > activeItem.find('img').height() * 0.1 &&
                showEndOfScroll();

            holder.activeText.data('index') !== holder.activeIndex && setActiveText();

            activeItem
                .addClass('qode-active')
                .data('move', Math.min(activeItem.data('move') + holder.deltaY, 0))
                .css('transform', 'translate3d(0,' + Math.round(activeItem.data('move') - activeItem.data('buffer') * 0.2) + 'px,0)')
                .data('buffer', Math.abs(activeItem.data('move')));
        };

        var tiltImages = function () {
            holder.items.each(function (i) {
                var img = $(this).find('img'),
                    valX = Math.round(holder.tX * holder.tilt * (i + 1)),
                    valY = Math.round(holder.tY * holder.tilt * (i + 1));

                img.css('transform', 'translateX(' + valX + 'px) translateY(' + valY + 'px)');
            });
        };

        var mouseWheel = function (e) {
            holder.direction = -e.deltaY < 0 ? 'next' : 'prev';
            holder.deltaY = -e.deltaY;
            if (Math.abs(holder.deltaY) == 3) holder.deltaY = holder.deltaY * 10; //ffox
            requestAnimationFrame(movement);
        };

        var mouseMove = function (e) {
            holder.tX = 0.5 - e.screenX / qode.windowWidth;
            holder.tY = 0.5 - e.screenY / qode.windowHeight;
            requestAnimationFrame(tiltImages);
        };

        var touchStart = function (e) {
            holder.data('y-start', parseInt(e.changedTouches[0].clientY));
        };

        var touchMove = function (e) {
            holder.data('y-end', parseInt(e.changedTouches[0].clientY));
            holder.deltaY = holder.data('y-end') - holder.data('y-start');
            holder.direction = holder.deltaY < 0 ? 'next' : 'prev';
            holder.deltaY = Math.min(Math.max(holder.deltaY, -20), 100);
            requestAnimationFrame(movement);
        };

        var fixedInfo = function (e) {
            var moveInfo = function (x, y) {
                holder.info.css({
                    'transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)'
                });
            };

            var handleMove = function (e) {
                var x = e.clientX,
                    y = e.clientY;

                requestAnimationFrame(function () {
                    moveInfo(x, y);
                });
            };

            var changeInfo = function (e) {
                var index = $(e.currentTarget).closest(holder.items).data('index');
                if (holder.info.data('active') !== index) {
                    var activeItem = holder.textItems.filter(function () {
                            return $(this).data('index') == index
                        }),
                        titleText = activeItem.find('.qode-pls-title-holder').html();

                    holder.info
                        .data('active', index)
                        .addClass('qode-show');
                    holder.info
                        .find('.qode-pls-title-holder')
                        .html(titleText);
                }

                //custom
                $('.qode-page-header').css('pointer-events', 'none');
            };

            var hideInfo = function (e) {
                holder.info
                    .data('active', null)
                    .removeClass('qode-show');

                //custom
                $('.qode-page-header').css('pointer-events', 'auto');
            };

            holder.on('mousemove', handleMove);
            holder.on('mousemove', 'img', changeInfo);
            holder.on('mouseleave', 'img', hideInfo)
        };

        return {
            init: function () {
                if (holder.length) {
	                $('html').addClass('qode-overflow');
                    holder.items.first().addClass('qode-active');
                    holder.textItems.first().addClass('qode-active');
                    setWidth();
                    positionItems();
                    setIndexes();
                    holder.waitForImages(function () {
                        holder.addClass('qode-loaded');
                        //scroll support
                        if (!Modernizr.touch) {
                            document.body.addEventListener('wheel', mouseWheel);
                            document.body.addEventListener('mousemove', mouseMove);
                            fixedInfo();
                        }
                        //touch support 
                        if (Modernizr.touch) {
                            holder[0].addEventListener('touchstart', touchStart);
                            holder[0].addEventListener('touchmove', touchMove);
                        }
                    })
                }
            },
            resize: function () {
                if (holder.length) {
                    positionItems();
                    setWidth();
                }
            }
        };
    }
    
})(jQuery);
(function($) {
	'use strict';
	
	var elementorPortfolioProjectSlider = {};
	qode.modules.elementorPortfolioProjectSlider = elementorPortfolioProjectSlider;
	
	elementorPortfolioProjectSlider.qodeInitElementorPortfolioProjectSlider = qodeInitElementorPortfolioProjectSlider;
	
	
	elementorPortfolioProjectSlider.qodeOnWindowLoad = qodeOnWindowLoad;
	
	$(window).load(qodeOnWindowLoad);
	
	/*
	 ** All functions to be called on $(window).load() should be in this function
	 */
	function qodeOnWindowLoad() {
		qodeInitElementorPortfolioProjectSlider();
	}
	
	function qodeInitElementorPortfolioProjectSlider(){
		$j(window).on('elementor/frontend/init', function () {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_portfolio_project_slider.default', function() {
				qode.modules.portfolioProjectSlider.qodePortfolioProjectSlider();
			} );
		});
	}
	
})(jQuery);

(function ($) {
	'use strict';
	
	var portfolioProjectSlider = {};
	qode.modules.portfolioProjectSlider = portfolioProjectSlider;
	
	portfolioProjectSlider.qodePortfolioProjectSlider = qodePortfolioProjectSlider;
	portfolioProjectSlider.qodeOnDocumentReady = qodeOnDocumentReady;
	
	$(document).ready(qodeOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodeOnDocumentReady() {
		qodePortfolioProjectSlider();
	}
	
	
	function qodePortfolioProjectSlider() {
		
		var holder = $j('.qode-portfolio-project-slider');
		
		if (holder.length) {
			qode_body.addClass('qode-with-portfolio-project-slider');
			
			holder.each(function () {
				var sliderOptions = typeof $j(this).data('options') !== 'undefined' ? $j(this).data('options') : {},
					autoplay = sliderOptions.autoplay !== undefined && sliderOptions.autoplay !== '' ? sliderOptions.autoplay : true,
					mousewheel = sliderOptions.mousewheel !== undefined && sliderOptions.mousewheel !== '' ? sliderOptions.mousewheel : false,
					speed = sliderOptions.speed !== undefined && sliderOptions.speed !== '' ? parseInt(sliderOptions.speed, 10) : 5000,
					speedAnimation = sliderOptions.speedAnimation !== undefined && sliderOptions.speedAnimation !== '' ? parseInt(sliderOptions.speedAnimation, 10) : 800,
					loop = sliderOptions.loop !== undefined && sliderOptions.loop !== '' ? sliderOptions.loop : true,
					loopedSlides =  2,
					pagination = $j(this).find('.swiper-pagination');
				
				if (autoplay === true) {
					autoplay = {
						delay: speed,
						disableOnInteraction: false
					};
				}
				
				var mySwiper = new Swiper ('.swiper-container', {
					direction: 'horizontal',
					loop: loop,
					loopedSlides: loopedSlides,
					slidesPerView: 1.2,
					centeredSlides: false,
					autoplay: autoplay,
					spaceBetween: 0,
					mousewheel: mousewheel,
					speed: speedAnimation,
					pagination: {
						el: pagination,
						clickable: true,
						renderBullet: function (index, className) {
							var temp = (index + 1) < 10 ? 0 : '';
							return '<span class="' + className + '">' + temp + (index + 1) + '</span>';
						}
					},
					breakpoints: {
						// when window width is >= 1
						1: {
							slidesPerView: 1
						},
						// when window width is <= 480px
						480: {
							slidesPerView: 1
						},
						// when window width is <= 680px
						680: {
							slidesPerView: 1
						},
						// when window width is <= 768px
						768: {
							slidesPerView: 1
						},
						// when window width is <= 1024px
						1024: {
							slidesPerView: 1.15
						},
						// when window width is <= 1366px
						1366: {
							slidesPerView: 1.2
						},
						// when window width is <= 1440px
						1440: {
							slidesPerView: 1.2
						}
					}
				})
			})
		}
		
		
	}
	
	
	

})(jQuery);
(function($) {
    'use strict';

    var elementorPricingCalculator = {};
    qode.modules.elementorPricingCalculator = elementorPricingCalculator;

    elementorPricingCalculator.qodeInitElementorPricingCalculator = qodeInitElementorPricingCalculator;


    elementorPricingCalculator.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorPricingCalculator();
    }

    function qodeInitElementorPricingCalculator(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_pricing_calculator.default', function() {
                qodeInitPricingCalculator();
            } );
        });
    }

})(jQuery);

(function($) {
    'use strict';

    var elementorScrollingImage = {};
    qode.modules.elementorScrollingImage = elementorScrollingImage;

    elementorScrollingImage.qodeInitElementorScrollingImage = qodeInitElementorScrollingImage;


    elementorScrollingImage.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorScrollingImage();
    }

    function qodeInitElementorScrollingImage(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_scrolling_image.default', function() {
                qodeScrollingImage();
            } );
        });
    }

})(jQuery);
(function($) {
    'use strict';

    var elementorSlidingImageHolder = {};
    qode.modules.elementorSlidingImageHolder = elementorSlidingImageHolder;

    elementorSlidingImageHolder.qodeInitElementorSlidingImageHolder = qodeInitElementorSlidingImageHolder;


    elementorSlidingImageHolder.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorSlidingImageHolder();
    }

    function qodeInitElementorSlidingImageHolder(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_sliding_image_holder.default', function() {
                qodeSlidingImageHolder();
            } );
        });
    }

})(jQuery);
(function($) {
	'use strict';
	
	$(document).ready(function(){
		qodeInitSplitScrollingSection();
	});
	
	/*
	 **	Split Scrolling Section
	 */
	function qodeInitSplitScrollingSection() {}
	
})(jQuery);
(function($) {
    'use strict';

    var elementorWorkflow = {};
    qode.modules.elementorWorkflow = elementorWorkflow;

    elementorWorkflow.qodeInitElementorWorkflow = qodeInitElementorWorkflow;


    elementorWorkflow.qodeOnWindowLoad = qodeOnWindowLoad;

    $(window).load(qodeOnWindowLoad);

    /*
     ** All functions to be called on $(window).load() should be in this function
     */
    function qodeOnWindowLoad() {
        qodeInitElementorWorkflow();
    }

    function qodeInitElementorWorkflow(){
        $j(window).on('elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/bridge_workflow.default', function() {
                qodeWorkflow();
            } );
        });
    }

})(jQuery);