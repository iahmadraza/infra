/* //rbc-wm.core.js */

$( function () {
	
	/* -- fancy scrollbar for navigation panel */
	// createFancyScrollbarForNav();
	//createFancyScrollbarForList();
	// glHeaderHeight();
	// glActionsHeight();
	var iOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	
	/* -- In-Menu search option */
	$( 'body' ).on( 'click', 'div.search-start a.btn-search', function () {
		if ( !$( this ).hasClass( 'search-active' ) ) {
			$( this ).addClass( 'search-active' );
			$( 'div.go-to-clients' ).addClass( 'goclients-off' );
			$( 'div.search-text-area' ).addClass( 'searchtext-on' ).find( '.search-input' ).val( '' );
			$( 'div.search-text-area' ).find( 'a.searchtext-clear' ).hide();
			setTimeout(function(){
				$( 'div.search-text-area' ).find( '.search-input' ).focus();
			}, 350);
		} else {
			$( this ).removeClass( 'search-active' );
			$( 'div.go-to-clients' ).removeClass( 'goclients-off' );
			$( 'div.search-text-area' ).removeClass( 'searchtext-on' );
		}
	} );

	/* -- In-Tabular Data List search option */
	$( 'body' ).on( 'click', 'div.insearch-start a.dt-btn-insearch', function () {
		if ( !$( this ).hasClass( 'insearch-active' ) ) {
			$( this ).addClass( 'insearch-active' );
			$( this ).closest( 'div.dt-header' ).siblings( 'div.dt-search' ).slideDown( 200 ).find( 'input.txtinsearch' ).focus();
			// $( this ).closest( 'div.dt-header' ).siblings( 'div.dt-search' ).find( 'input.txtinsearch' ).focus();
			setTimeout(function(){
				//$( this ).closest( 'div.dt-header' ).siblings( 'div.dt-search' ).find( 'input.txtinsearch' ).css('background', 'red');
				// .tabular-data .dt-search .dt-inlist-search .txtinsearch
			}, 350);
		} else {
			$( this ).removeClass( 'insearch-active' );
			$( this ).closest( 'div.dt-header' ).siblings( 'div.dt-search' ).slideUp( 200 ).find( '.txtinsearch' ).val( '' );
		}
	} );
	/* -- clear search text button show/hide */
	$( 'body' ).on( 'keyup', 'div.dt-search div.dt-inlist-search .txtinsearch', function () {
		if ( $( this ).val().length > 0 ) {
			$( this ).siblings( 'a.inlistsearch-clear' ).fadeIn( 200 );
		} else {
			$( this ).siblings( 'a.inlistsearch-clear' ).fadeOut( 200 );
		}
	});
	$( 'body' ).on( 'click', 'div.dt-inlist-search a.inlistsearch-clear', function () {
		$( this ).siblings( 'input.txtinsearch' ).val( '' ).focus();
		$( this ).fadeOut( 250 );
	});
	$( 'body' ).on( 'click', 'div.dt-inlist-search', function () {
		$( this ).find( 'input.txtinsearch' ).focus();
	});
	
	/* -- Nav show/hide */
	globalNavigation();
	
	/* -- Logout modal show */
	$( 'body' ).on( 'click', 'a.btn-logout', function () {
		// $(' .tiny-modal ').show(1);
		$( 'div#tm-logout' ).show(1);
		$( 'div#tm-logout' ).addClass( 'tinymodal-showing' );
		/* -- Logout counter */
		//$('.logout-counter').stop();
		startLogoutCounter();
	});
	$( 'body' ).on( 'click', 'div#tm-logout a.tm-default', function () {
		//reset counter and stop timer
		clearInterval( logoutTimer );
		logoutCounter = 30;
		$( 'div#tm-logout' ).removeClass( 'tinymodal-showing' );
	});

	//cancelPaymentPopup();

	/* -- modal show : privacy policy */
	// showPrivacyModal();
	/*$( 'body' ).on( 'click', 'div#tm-privacy a.tm-default', function () {
		$( 'div#tm-privacy' ).removeClass( 'tinymodal-showing' );
	});*/
	
	/* -- clear search text button show/hide */
	$( 'body' ).on( 'keyup', 'div.search-text-area input.search-input', function () {
		if ( $( this ).val().length > 0 ) {
			$( this ).siblings( 'a.searchtext-clear' ).fadeIn( 200 );
		} else {
			$( this ).siblings( 'a.searchtext-clear' ).fadeOut( 200 );
		}
	});
	$( 'body' ).on( 'click', 'div.search-text-area a.searchtext-clear', function () {
		$( this ).siblings( 'input.search-input' ).val( '' ).focus();
		$( this ).fadeOut( 250 );
	});
	$( 'body' ).on( 'click', 'div.search-text-area', function () {
		$( this ).find( 'input.search-input' ).focus();
	});

	/* -- column sorting */
	$( 'body' ).on( 'click', 'div.table-data div.table-header em.tcol-sort', function () {
		$( this ).closest( 'div.table-data' ).find( '.progress-sorting' ).fadeIn( 100 );
		//$( this ).closest( 'div.table-header' ).find( 'em.tcol-sort' ).removeClass( 'sort-asc' );
		// $( this ).closest( 'div.table-header' ).find( 'em.tcol-sort' ).removeClass( 'sort-asc, sort-dsc' );
		
		// $( this ).closest( 'div.table-header' ).find( 'em.tcol-sort' ).removeClass( 'sort-asc' );
		// $( this ).closest( 'div.table-header' ).find( 'em.tcol-sort' ).removeClass( 'sort-dsc' );

		if ( $( this ).hasClass( 'sort-asc' ) ) {
			$( this ).closest( 'div.table-header' ).find( 'em.tcol-sort' ).removeClass( 'sort-asc sort-dsc' );
			$( this ).removeClass( 'sort-asc' ).addClass( 'sort-dsc' );
		} else if ( $( this ).hasClass( 'sort-dsc' ) ) {
			$( this ).closest( 'div.table-header' ).find( 'em.tcol-sort' ).removeClass( 'sort-asc sort-dsc' );
			$( this ).addClass( 'sort-asc' ).removeClass( 'sort-dsc' );
		} else {
			$( this ).closest( 'div.table-header' ).find( 'em.tcol-sort' ).removeClass( 'sort-asc sort-dsc' );
			$( this ).addClass( 'sort-asc' );
		}
		$( this ).closest( 'div.table-data' ).find( '.progress-sorting' ).fadeOut( 200 );
	});

	/* -- enter input - component  */ 
	$( 'body' ).on( 'click', 'div.ux-input.ux-comp-box', function () {
		if ( !$( this ).hasClass( 'ux-input-readonly' ) ) {
			if ( !$( this ).hasClass( 'component-active' ) ) {
				$( this ).addClass( 'component-active' );
				// $( this ).find( 'input.txtEnteredData' ).val( '' ).focus();
				$( this ).find( 'input.txtEnteredData' ).focus();
			}
		}
	});

	/* -- enter dropdown values - component (SS.) */
	$( 'body' ).on( 'click', 'div.ux-input-dropdown.ux-comp-box', function () {
		if ( !$( this ).hasClass( 'ux-input-readonly' ) ) {
			if ( !$( this ).hasClass( 'component-active' ) ) {
				$( this ).addClass( 'component-active' ).removeClass( 'ux-comp-selected' );
			}
		}
	});

	if ( iOSDevice ) {
		$( 'body' ).on( 'touchstart', 'div.ux-input-dropdown.ux-comp-box', function () {
			if ( !$( this ).hasClass( 'ux-input-readonly' ) ) {
				if ( !$( this ).hasClass( 'component-active' ) ) {
					$( this ).addClass( 'component-active' ).removeClass( 'ux-comp-selected' );
				}
			}
		});
	};

	/* //-- show drop down - component */
	$( 'body' ).on( 'click', 'div.ux-dropdown a.drp-enterdata', function () {
		if ( !$( this ).hasClass( 'ux-dropdown-readonly' ) ) {
			if ( !$( this ).closest( 'div.ux-dropdown' ).hasClass( 'dropdown-active' ) ) {
				$( this ).closest( 'div.ux-dropdown' ).addClass( 'dropdown-active' );
				$( this ).find( 'div.enter-input input[type="text"]' ).focus();
			}
		}
	});
	$( 'body' ).on( 'click', 'div.ux-dropdown a.drp-showcontent', function () {
		if ( !$( this ).closest( 'div.ux-dropdown' ).hasClass( 'dropdown-showing' ) ) {
			$( this ).closest( 'div.ux-dropdown' ).addClass( 'dropdown-showing dropdown-active' );
			// $( this ).search-input
		} else {
			$( this ).closest( 'div.ux-dropdown' ).removeClass( 'dropdown-showing dropdown-active' );
		}
	});

	/*$( 'body' ).on( 'click', 'div.ux-input div.enter-input u.btn-input-done', function ( event ) {
		event.stopPropagation();
		$( this ).siblings( 'input.txtEnteredData' ).focus();
		if ( $( this ).siblings( 'input.txtEnteredData' ).val().length !== 0 ) {
			var enteredValue = $( this ).siblings( 'input.txtEnteredData' ).val();
			$( this ).closest( 'div.ux-input' ).removeClass( 'component-active' ).addClass( 'ux-comp-selected' );
			$( this ).closest( 'div.ux-input' ).find( 'em.entered-data' ).html( enteredValue );
		}
	});*/

	$( 'body' ).on( 'click', 'div.ux-component div.ux-calendar div.cal-trigger', function ( event ) {
		if ( !$( this ).hasClass( 'cal-tri-active' ) ) {
			$( 'html, body' ).animate( {scrollTop : $( this ).offset().top - 100 }, 700 );
			$( this ).addClass( 'cal-tri-active' );
			// $( this ).closest( 'div.ux-calendar' ).addClass( 'ux-comp-selected' );
			$( this ).closest( 'div.ux-calendar' ).addClass( 'component-active' );
			$( this ).closest( 'div.ux-calendar' ).find( '.txtSelectDate' ).focus();
			// $( this ).closest( 'div.ux-component' ).addClass( 'component-active' );
		} else {
			$( this ).removeClass( 'cal-tri-active' );
			$( this ).closest( 'div.ux-calendar' ).removeClass( 'component-active' );
		}
	});

	$( 'body' ).on( 'change', 'div.ux-component div.ux-calendar div.cal-input input.txtSelectDate', function ( event ) {
		var selCalDate = $( this ).val();
		$( this ).closest( 'div.ux-calendar' ).find( 'div.cal-trigger' ).find( 'em.entered-data' ).html( selCalDate );
		// alert('selCalDate = ' + selCalDate);
	});

	//calendar on payment 1 of 2 page
	//-- enable for calendar page ONLY 
	// calendarOnPayment();

	/* //paging list - collpase/expand */
	$('body').on('click', '.main-pager .table-item .data-item a.di-more', function() {
		if ( !$( this ).closest( 'div.data-item' ).hasClass( 'item-disabled' ) ) {
			if (!$(this).hasClass('di-more-active')) {
				$( 'html, body' ).animate( {scrollTop : $( this ).offset().top }, 700 );
				$(this).closest('div.table-data').find('a.di-more').removeClass('di-more-active');
				$(this).closest('div.table-data').find('div.data-content').removeClass('dc-expanded');
				$(this).addClass('di-more-active');
				$(this).closest('div.table-item').find('div.data-content').addClass('dc-expanded');
			} else {
				$(this).removeClass('di-more-active');
				$(this).closest('div.table-item').find('div.data-content').removeClass('dc-expanded');
			}
		}
	});

	/* //paging list - item selection */
	$( 'body' ).on( 'click', '.main-pager .table-item .data-item a.di-heading', function() {
		if ( !$( this ).closest( 'div.data-item' ).hasClass( 'item-disabled' ) ) {
			$( this ).closest( 'div.table-data' ).find( 'div.data-item' ).removeClass( 'data-item-selected' );
			$( this ).closest( 'div.data-item' ).addClass( 'data-item-selected' );
		}
	});

	$('.modal').on('shown.bs.modal', function (e) {
		setModalHeight( $( this ) );
	});

	/* Toast messages */
	// showToastMessage( 'Date is required', 'error', true );
	// showToastMessage( 'Error occured', 'error', true );
	$( 'body' ).on( 'click', 'div.toast-messages div.msg-toast', function() {
		setTimeout(function () {
			$( 'div.toast-messages' ).find( '.msg-toast' ).removeClass( 'msg-showing' );
		}, 300);
	});

	/* //navigation tab setup */
	// navTabSetup();
	
	// navBarTabSetup();

	//setNavTabtoActivated();
	$( 'body' ).on( 'click', 'div.navtabs-box ul.lst-navtabs-box li a', function() {
		if ( !$( this ).hasClass( 'navtab-active' ) ) {
			var elemWidth = $( this ).parent( 'li' ).width();
			var elemLeft = $( this ).parent( 'li' ).position().left;
			// console.log( 'width = ' + elemWidth );
			// console.log( 'left = ' + elemLeft );
			$( this ).closest( 'ul.lst-navtabs-box' ).find( 'a' ).removeClass( 'navtab-active' );
			$( this ).addClass( 'navtab-active' );
			$( this ).closest( 'ul.lst-navtabs-box' ).find( 'li.navtab-selector' ).css({
				'width': parseInt( elemWidth ) + 'px', 
				'left' : parseInt( elemLeft ) + 'px'
			});
		}
		scrollToNavTab( $(this) );
	});

	// modeSelectorSetup();


	/* -- pagination */
	$( 'body' ).on( 'click', 'div.main-pager div.pagination-container div.pagination-nav span.page-item a.page-link', function() {
		var currentPage = $( this ).closest( 'div.main-pager' ).find( 'div.pages-content div.pages.page-selected' ).index();
		var lastPage = $( this ).closest( 'div.main-pager' ).find( 'div.pages-content div.pages' ).length;
		if ( !$( this ).parent( 'span.page-item' ).hasClass( 'disabled' ) ) {
			$( this ).closest( 'div.main-pager' ).children( 'div.progress-paging' ).fadeIn();
			if ( $( this ).hasClass( 'apage-next' ) ) {
				currentPage++;
				// $( this ).closest( 'div.main-pager' ).find( 'div.pagination-container em.page-counter' ).html( startRecord + ' - ' + endRecrod + ' of 30' );
				if ( currentPage == 1 ) {
					$( this ).closest( 'div.pagination-nav' ).find( 'span.page-item-prev' ).removeClass( 'disabled' );
				}
				$( this ).closest( 'div.main-pager' ).find( 'div.pages-content div.pages' ).removeClass( 'page-selected' );
				$( this ).closest( 'div.main-pager' ).find( 'div.pages-content div.pages' ).eq( currentPage ).addClass( 'page-selected' );
				if ( currentPage == lastPage - 1 ) {
					$( this ).parent( 'span.page-item' ).addClass( 'disabled' );
					$( this ).closest( 'div.main-pager' ).children( 'div.progress-paging' ).fadeOut();

					$( this ).closest( 'div.main-pager' ).find( 'div.pagination-container' ).find( 'div.indicator-box span.indicator' ).removeClass( 'active' );
					$( this ).closest( 'div.main-pager' ).find( 'div.pagination-container' ).find( 'div.indicator-box span.indicator' ).eq( currentPage ).addClass( 'active' );
					return false;
				}
			} else if ( $( this ).hasClass( 'apage-prev' ) ) {
				currentPage--;
				// $( this ).closest( 'div.main-pager' ).find( 'div.pagination-container em.page-counter' ).html( startRecord + ' - ' + endRecrod + ' of 30' );
				if ( currentPage == 0 ) {
					$( this ).parent( 'span.page-item' ).addClass( 'disabled' );
					$( this ).closest( 'div.main-pager' ).find( 'div.pages-content div.pages' ).removeClass( 'page-selected' );
					$( this ).closest( 'div.main-pager' ).find( 'div.pages-content div.pages' ).eq( currentPage ).addClass( 'page-selected' );
					$( this ).closest( 'div.main-pager' ).children( 'div.progress-paging' ).fadeOut();

					$( this ).closest( 'div.main-pager' ).find( 'div.pagination-container' ).find( 'div.indicator-box span.indicator' ).removeClass( 'active' );
					$( this ).closest( 'div.main-pager' ).find( 'div.pagination-container' ).find( 'div.indicator-box span.indicator' ).eq( currentPage ).addClass( 'active' );
					return false;
				}
				$( this ).closest( 'div.pagination-nav' ).find( 'span.page-item-next' ).removeClass( 'disabled' );
				$( this ).closest( 'div.main-pager' ).find( 'div.pages-content div.pages' ).removeClass( 'page-selected' );
				$( this ).closest( 'div.main-pager' ).find( 'div.pages-content div.pages' ).eq( currentPage ).addClass( 'page-selected' );
			}
			$( this ).closest( 'div.main-pager' ).find( 'div.pagination-container' ).find( 'div.indicator-box span.indicator' ).removeClass( 'active' );
			$( this ).closest( 'div.main-pager' ).find( 'div.pagination-container' ).find( 'div.indicator-box span.indicator' ).eq( currentPage ).addClass( 'active' );
		};
		$( this ).closest( 'div.main-pager' ).children( 'div.progress-paging' ).fadeOut();
	});

	// importantInfo();

	//detect IE
	// detectIE();

	/* -- on window scroll */
	$( window ).on( 'scroll', function ( e ) {
		// console.log( '$( window ).scrollTop() = ' + $( window ).scrollTop() );
		if ( $( window ).scrollTop() > 10 ) {
			$( 'header.global-header' ).addClass( 'tiny-header' );
		} else {
			$( 'header.global-header' ).removeClass( 'tiny-header' );
		}
	});

	$( window ).on( 'resize', function ( e ) {
		setModalHeight();
	});
});

function createFancyScrollbarForNav () {
	$( '.nav-box' ).mCustomScrollbar({
		theme: 'minimal-dark'
	});
	document.querySelector( '.nav-box' ).scrollIntoView({
		behavior: 'smooth'
	});
};

function createFancyScrollbarForList () {
	$( '.in-scroller' ).mCustomScrollbar({
		theme: 'minimal-dark'
	});
	document.querySelector( '.in-scroller' ).scrollIntoView({
		behavior: 'smooth'
	});
};

function startLogoutCounter2 () {
	//alert('logoutCounter = ' + logoutCounter);
	$( '.logout-counter' ).each( function () {
		$( this ).prop( 'logoutCounter', 30 ).animate({
			logoutCounter: $( this ).text()
		}, {
			duration: 30000,
			easing: 'linear',
			step: function ( now ) {
				$( this ).text( Math.ceil( now ) );
			}
		});
	});
};

var logoutTimer, logoutCounter = 30;
function startLogoutCounter() {
	$( '.logout-counter' ).html( logoutCounter );
	logoutTimer = setInterval( function () {
		logoutCounter--;
		changeCounter( logoutCounter );
	}, 1000 );
};
function changeCounter( lgCounter ) {
	$( '.logout-counter' ).html( lgCounter );
	if ( lgCounter <= 0 ) {
		clearInterval( logoutTimer );
		logoutCounter = 30;
	}
};
function setModalHeight ( $element ) {
// function setModalHeight () {
	// function(nodeBox, str) {
	if (typeof $element === "undefined" || $element === null) { 
		$element = $( '.modal' );
	}
	// alert( '$this ' + $element.html() );
	// .modal .modal-body
	// var modHeaderHeight = $element.find( 'div.modal-header' ).outerHeight();
	// var modFooterHeight = $element.find( 'div.modal-footer' ).outerHeight();
	var winHeight = $( window ).height();

	// alert( 'Hheight = ' + modHeaderHeight + '/nFheight = ' + modFooterHeight + '/nWindow = ' + winHeight);
	// console.log('window height = ' + winHeight);

	$element.find( 'div.modal-content' ).css({
		// 'background': 'red',
		'height' : winHeight,
		// 'padding-top' : '60px',//modHeaderHeight,
		// 'padding-bottom' : '70px'//modFooterHeight
	});
};

function glHeaderHeight () {
	$( 'div.sticky-header-spacer' ).height( $( 'header.global-header' ).height() );
};

function glActionsHeight () {
	$( 'div.sticky-actions-spacer' ).height( $( 'div.global-actions' ).height() );
};

function calendarOnPayment () {
	// var dateField = 
	$( 'div.calendar-inline' ).datepicker({
		dateFormat: 'MM d yy', 
		// changeMonth: true,
		changeYear: true,
		// altField: '#calValueDateRO',
		onSelect: function ( date ) {
			var selectedDate = date;
			$( this ).closest( 'div.ux-calendar' ).find( 'input.txtSelectDate' ).removeAttr( 'placeholder' ).val( selectedDate );
			$( this ).closest( 'div.ux-calendar' ).find( 'div.cal-trigger' ).find( 'em.entered-data' ).addClass( 'data-entered' ).html( selectedDate );
			$( this ).closest( 'div.ux-calendar' ).addClass( 'ux-comp-selected' );
			//$( this ).closest( 'div.ux-calendar' ).find( 'input.txtSelectDate' ).trigger( 'change' );
			//alert( 'date = ' + date );
			//$('a.ui-state-default').removeClass('ui-state-highlight');
			//$(this).addClass('ui-state-highlight');
		}
	});
};

function detectIE () {
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent) || navigator.userAgent.indexOf("Trident/") > -1 ){
		$( 'head' ).append( '<link rel="stylesheet" type="text/css" href="styles/rbc-wm.ie.css" />' );
	}
};

function showPrivacyModal () {
	$( 'div#tm-privacy' ).show(1);
	$( 'div#tm-privacy' ).addClass( 'tinymodal-showing' );
};

function showToastMessage (messageText, messageType, autoDismiss, messageDuration) {
	var messageHTML = '<div class="msg-toast msg-'+ messageType +'"><em>'+ messageText +'</em></div>';
	$( 'div.toast-messages' ).html( messageHTML );
	setTimeout(function () {
		$( 'div.toast-messages' ).find( '.msg-toast' ).addClass( 'msg-showing' );
	}, 300);
	
	if (typeof messageDuration === "undefined" || messageDuration === null) { 
		messageDuration = 5000;
	}

	if ( autoDismiss ) {
		setTimeout(function () {
			$( 'div.toast-messages' ).find( '.msg-toast' ).removeClass( 'msg-showing' );
		}, messageDuration);
		setTimeout(function () {
			$( 'div.toast-messages' ).html( '' );
		}, messageDuration + 400);
	} else {
		$( 'div.toast-messages' ).find( '.msg-toast' ).addClass( 'msg-close' );
	}
};

function navTabSetup () {
	var navWidth = 0;
	$( 'div.navtabs-box' ).find( 'ul.lst-navtabs-box' ).children( 'li' ).each(function () {
		navWidth += $( this ).width() + 20;
		// console.log( 'navWidth = ' + navWidth);
	});
	$( 'div.navtabs-box' ).find( 'ul.lst-navtabs-box' ).width( navWidth );
	// alert( 'navWidth = ' + navWidth );
};

function navBarTabSetup () {
	$( 'div.navtabs-scroller' ).mCustomScrollbar({
		/*theme: 'minimal-dark',
		axis: "x",
		advanced:{
			autoExpandHorizontalScroll:true
		},
		contentTouchScroll: true,
		documentTouchScroll: true*/
		scrollInertia: 1000,
		axis: "x",
		theme: "minimal",
		// autoExpandScrollbar: true,
		autoHideScrollbar: true,
		advanced:{ 
			autoExpandHorizontalScroll: true
		},
		contentTouchScroll: 50,
		documentTouchScroll: true
	});
	document.querySelector( 'div.navtabs-box' ).scrollIntoView({
		behavior: 'smooth'
	});
	$( window ).scrollTop(0);
};

function scrollToNavTab ( elmItem ) {
	var scrollToElement = elmItem[0].offsetLeft - 5;
	// The 'div' before '#' is not necessary, but I want to keep some reference to Your selector
	$( 'div.navtabs-scroller' ).mCustomScrollbar( 'scrollTo', scrollToElement );
};

function setNavTabtoActivated () {
	var ntSelWidth = $( 'div.navtabs-box ul.lst-navtabs-box li' ).find( 'a.navtab-active' ).parent( 'li' ).width();
	var ntSelLeft  = $( 'div.navtabs-box ul.lst-navtabs-box li' ).find( 'a.navtab-active' ).parent( 'li' ).position().left;
	$( 'div.navtabs-box ul.lst-navtabs-box li:last-child' ).css({
		'width': parseInt( ntSelWidth ) + 'px', 
		'left' : parseInt( ntSelLeft ) + 'px'
	});
	scrollToNavTab( $( 'div.navtabs-box ul.lst-navtabs-box li' ).find( 'a.navtab-active' ) );
};

function modeSelectorSetup () {
	// primary icons selection on main page - payment, transfer or service request
	var modeCount = $( 'div.mode-section div.in-mode-section div.mode-selectors>ul.lst-mode-selectors >li' ).length;
	$( 'div.mode-section div.in-mode-section div.mode-selectors>ul.lst-mode-selectors >li' ).width( 99 / modeCount + '%' );
};

function importantInfo () {
	$( 'body' ).off( 'click', 'div.important-info-box div.impinfo-trigger>a' );
	$( 'body' ).on( 'click', 'div.important-info-box div.impinfo-trigger>a', function() {
		if ( !$( this ).hasClass( 'info-active' ) ) {
			$( 'html, body' ).animate( {scrollTop : $( this ).offset().top - 100 }, 700 );
			$( this ).addClass( 'info-active' );
			$( this ).closest( 'div.important-info-box' ).find( 'div.impinfo-content' ).slideDown();
		} else {
			$( this ).removeClass( 'info-active' );
			$( this ).closest( 'div.important-info-box' ).find( 'div.impinfo-content' ).slideUp();
		}
	});
};

function cancelPaymentPopup () {
	/* -- cancel-payment modal show */
	$( 'body' ).on( 'click', '.btn-cancelpayment', function () {
		// $(' .tiny-modal ').show(1);
		$( 'div#tm-cancelpayment' ).show(1);
		$( 'div#tm-cancelpayment' ).addClass( 'tinymodal-showing' );
		/* -- Logout counter */
		//$('.logout-counter').stop();
		//startLogoutCounter();
	});
	$( 'body' ).on( 'click', 'div#tm-cancelpayment a.tm-cp-no', function () {
		$( 'div#tm-cancelpayment' ).removeClass( 'tinymodal-showing' );
	});
};


function switchOptionsInit () {
	$( 'body' ).on( 'click', 'div.ux-switch-tabs div.ux-switch>.lst-ux-switch>li>a', function () {
		if ( !$( this ).hasClass( 'switch-selected' ) ) {
			var switchIndex = $( this ).closest( 'ul.lst-ux-switch li' ).index();
			// alert(switchIndex);
			$( this ).closest( 'div.ux-switch-tabs' ).find( 'div.ux-switch-container div.ux-switch-content' ).removeClass( 'content-showing' );
			$( this ).closest( 'div.ux-switch-tabs' ).find( '.lst-ux-switch>li>a' ).removeClass( 'switch-selected' );
			$( this ).addClass( 'switch-selected' );
			$( this ).closest( 'div.ux-switch-tabs' ).find( 'div.ux-switch-container' ).children( 'div.ux-switch-content' ).eq( switchIndex ).addClass( 'content-showing' );
		}
	});
};

function nextModalShow () {
	$( 'body' ).on( 'click', '.btn-nextmodal', function () {
		$('#modal-selecttransferto').modal('hide')
		$('#modal-creditanotherrbcaccount').modal('show')
	});
};

function globalNavigation() {
	$( 'body' ).on( 'click', 'div.glmenu-icon>a.btn-glmenu-icon', function () {
		var contWidth = $( 'header.global-header div.container' ).width();
		if ( !$( this ).hasClass( 'menu-active' ) ) {
			$( this ).addClass( 'menu-active' );
			$( 'body' ).css( 'overflow', 'hidden' );
			$( 'div.page-wrapper' ).addClass( 'shift-nav' );
			$( 'nav.global-nav' ).addClass( 'nav-showing' );
			// $( 'header.global-header' ).addClass( 'shift-header' );
			$( 'div.wrapper-overlay' ).fadeIn( 300 );
			// $( 'header.global-header div.container' ).width( contWidth - 300 );
		} else {
			$( this ).removeClass( 'menu-active' );
			// $( 'body' ).removeAttr( 'style' );
			$( 'body' ).css( 'overflow', 'auto' );
			$( 'div.page-wrapper' ).removeClass( 'shift-nav' );
			$( 'nav.global-nav' ).removeClass( 'nav-showing' );
			$( 'div.wrapper-overlay' ).fadeOut( 200 );
			// $( 'header.global-header' ).removeClass( 'shift-header' );
			// $( 'header.global-header div.container' ).width( contWidth + 300 );
		}
	});
};

/* // */
function selectStatementType () {
	$( 'select.sel-account-statement' ).closest( 'div.statement-container' ).find( 'div.stmt-container' ).hide();
	$( 'select.sel-account-statement' ).closest( 'div.statement-container' ).find( 'div.stmt-container' ).eq( 0 ).show();
	$( 'body').on( 'change', 'div.statement-container select.sel-account-statement', function ( e ) {
		var selIndex = $( this ).find( 'option:selected' ).index();
		//alert( 'this selected = ' + selIndex );
		$( this ).closest( 'div.statement-container' ).find( 'div.stmt-container' ).hide();
		$( this ).closest( 'div.statement-container' ).find( 'div.stmt-container' ).eq( selIndex ).show();
	});

};

function globalClientSearchInit () {
	var clientListData = [
		"0511204 Abhishek",
		"0511204 Ahmad",
		"0512483 Agastya",
		"0888833 Ketan",
		"1061845 Prasad",
		"5000765 Pravin",
		"5000765 Sachin",
		"5000765 Shabari",
		"5000765 Sunny",
	];
	$( "#txtGlobalClientSearch" ).autocomplete({
		source: clientListData
	});
};
function accountSummaryChart () {
	var ctx = document.getElementById("accsumChart").getContext('2d');
	var myPieChart = new Chart(ctx,{
		type: 'doughnut',
		data: {
			labels: ["Fixed Income", "Cash", "Equities", "Fixed Income", "Cash", "Equities", "Fixed Income", "Cash", "Equities",  "Cash"],
			datasets: [{
				label: '# of Votes',
				data: [300,50,100,300,50,100,300,50,100,200],
				// backgroundColor:["#4472C4", "#5B9BD5", "#A5A5A5", "#6383BB", "#0051A5", "#4D6A89", "#8897A7", "#1C82EC", "#AFD6FF", "#95BBE2" ]
				backgroundColor: colorArrayBox()
				/*backgroundColor: [
					'rgba(39, 120, 188, .98)', 
					'rgba(39, 120, 188, .90)', 
					'rgba(39, 120, 188, .80)', 
					'rgba(39, 120, 188, .70)', 
					'rgba(39, 120, 188, .60)', 
					'rgba(39, 120, 188, .50)', 
					'rgba(39, 120, 188, .40)', 
					'rgba(39, 120, 188, .30)', 
					'rgba(39, 120, 188, .20)', 
					'rgba(39, 120, 188, .10)'
				]*/
			}]
		}, 
		options: {
			cutoutPercentage: 60,
			legend : false,
			// legend: {
				// labels: {
					// generateLabels: function(chart) {
						 // // Here
					// }
				// }
			// }
		}
	});
	document.getElementById("legendAccSummary").innerHTML = myPieChart.generateLegend();

	// myPieChart.data.datasets[0].backgroundColor = randomColorGenerator();
	// for (var i = 0; i < myPieChart.data.length; i++){
	// 	// myPieChart.data.datasets[0].backgroundColor[i] = randomColorGenerator();
	// 	myPieChart.data.datasets[0].backgroundColor = randomColorGenerator();
	// 	// myPieChart.update();
	// }

	// new Chart(document.getElementById("chartjs-4"),{
	// 	"type":"doughnut",
	// 	"data":{
	// 		"labels":["Red","Blue","Yellow"],
	// 		"datasets":[
	// 			{"label":"My First Dataset",
	// 			"data": [300,50,100],
	// 			"backgroundColor":["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)"]
	// 			}]
	// 		}
	// 	});
};
var randomColorGenerator = function () { 
	return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
};
// alert(colorArrayBox());
function colorArrayBox () {
	var colorArray = new Array();
	for (var i = 0; i < 100; i++) {
		colorArray[i] = randomColorGenerator();
		// console.log('colorArray[i] = ' + colorArray[i]);
	}
	return colorArray;
};

/* preferred time in service request */
function preferredTime() {
	$( 'body' ).on( 'click', '.ux-dropdown-content .checkbox.pref-time', function () {
		$( this ).find( 'input').show().focus();
	});
};

/* developers JS */
$(function () {
	/* ---- Note : sent by : "ramu.gade@rbc.com" on "Tue, Jul 25 6:03 PM" */
	/* -- on blur - component  */
	$('body').on('blur', 'div.ux-input.ux-comp-box', function () {
		if ($(this).hasClass('component-active')) {
			$(this).removeClass('component-active');
		}
	});
	$('body').on('click', 'div.calendar-control', function () {
		if ($(this).closest('div.ux-calendar').hasClass('component-active')) {
			$(this).closest('div.ux-calendar').find('div.cal-trigger').removeClass('cal-tri-active');
			$(this).closest('div.ux-calendar').removeClass('component-active');
		}
	});
});
