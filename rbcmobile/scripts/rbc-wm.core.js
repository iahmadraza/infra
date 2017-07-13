/* //rbc-wm.core.js */

$( function () {
	
	/* -- fancy scrollbar for navigation panel */
	createFancyScrollbarForNav();
	//createFancyScrollbarForList();
	glHeaderHeight();
	
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
	$( 'body' ).on( 'click', 'div.glmenu-icon>a.btn-glmenu-icon', function () {
		var contWidth = $( 'header.global-header div.container' ).width();
		if ( !$( this ).hasClass( 'menu-active' ) ) {
			$( this ).addClass( 'menu-active' );
			$( 'div.page-wrapper' ).addClass( 'shift-nav' );
			$( 'nav.global-nav' ).addClass( 'nav-showing' );
			// $( 'header.global-header' ).addClass( 'shift-header' );
			$( 'div.wrapper-overlay' ).fadeIn( 300 );
			// $( 'header.global-header div.container' ).width( contWidth - 300 );
		} else {
			$( this ).removeClass( 'menu-active' );
			$( 'div.page-wrapper' ).removeClass( 'shift-nav' );
			$( 'nav.global-nav' ).removeClass( 'nav-showing' );
			$( 'div.wrapper-overlay' ).fadeOut( 200 );
			// $( 'header.global-header' ).removeClass( 'shift-header' );
			// $( 'header.global-header div.container' ).width( contWidth + 300 );
		}
	});
	
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

	/* -- modal show : privacy policy */
	showPrivacyModal();
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

	$( 'body' ).on( 'click', 'div.ux-input.ux-comp-box', function () {
		if ( !$( this ).hasClass( 'component-active' ) ) {
			$( this ).addClass( 'component-active' );
			$( this ).find( 'input.txtEnteredData' ).val( '' ).focus();
		}
	});

	$( 'body' ).on( 'click', 'div.ux-input div.enter-input u.btn-input-done', function ( event ) {
		event.stopPropagation();
		$( this ).siblings( 'input.txtEnteredData' ).focus();
		if ( $( this ).siblings( 'input.txtEnteredData' ).val().length !== 0 ) {
			var enteredValue = $( this ).siblings( 'input.txtEnteredData' ).val();
			$( this ).closest( 'div.ux-input' ).removeClass( 'component-active' ).addClass( 'ux-comp-selected' );
			$( this ).closest( 'div.ux-input' ).find( 'em.entered-data' ).html( enteredValue );
		}
	});

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
	//calendarOnPayment();

	/* //paging list - collpase/expand */
	$('body').on('click', '.main-pager .table-item .data-item a.di-more', function() {
		if (!$(this).hasClass('di-more-active')) {
			$(this).closest('div.table-data').find('a.di-more').removeClass('di-more-active');
			$(this).closest('div.table-data').find('div.data-content').removeClass('dc-expanded');
			$(this).addClass('di-more-active');
			$(this).closest('div.table-item').find('div.data-content').addClass('dc-expanded');
		} else {
			$(this).removeClass('di-more-active');
			$(this).closest('div.table-item').find('div.data-content').removeClass('dc-expanded');
		}
	});

	/* //paging list - item selection */
	$( 'body' ).on( 'click', '.main-pager .table-item .data-item a.di-heading', function() {
		$( this ).closest( 'div.table-data' ).find( 'div.data-item' ).removeClass( 'data-item-selected' );
		$( this ).closest( 'div.data-item' ).addClass( 'data-item-selected' );
	});

	$('.modal').on('shown.bs.modal', function (e) {
		// setModalHeight( $(this) );
	});

	/* Toast messages */
	//showToastMessage( 'Date is required', 'error', true );
	$( 'body' ).on( 'click', 'div.toast-messages div.msg-toast', function() {
		setTimeout(function () {
			$( 'div.toast-messages' ).find( '.msg-toast' ).removeClass( 'msg-showing' );
		}, 300);
	});

	/* //navigation tab setup */
	// navTabSetup();
	navBarTabSetup();

	$( 'body' ).on( 'click', 'div.navtabs-box ul.lst-navtabs-box li a', function() {
		if ( !$( this ).hasClass( 'navtab-active' ) ) {
			$( this ).closest( 'ul.lst-navtabs-box' ).find( 'a' ).removeClass( 'navtab-active' );
			$( this ).addClass( 'navtab-active' );
		}
		scrollToNavTab( $(this) );
	});

	//detect IE
	// detectIE();

	/* -- on window scroll */
	$( window ).on( 'scroll', function ( e ) {
		if ( $( window ).scrollTop() > 10 ) {
			$( 'header.global-header' ).addClass( 'tiny-header' );
		} else {
			$( 'header.global-header' ).removeClass( 'tiny-header' );
		}
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
	// alert( '$this ' + $element.html() );
	// .modal .modal-body
	var modHeaderHeight = $element.find( 'div.modal-header' ).height();
	var modFooterHeight = $element.find( 'div.modal-footer' ).height();

	$element.find( 'div.modal-content' ).css({
		// 'background': 'red',
		'padding-top' : modHeaderHeight,
		'padding-bottom' : modFooterHeight
	});
};

function glHeaderHeight () {
	$( 'div.sticky-header-spacer' ).height( $( 'header.global-header' ).height() );
}

function calendarOnPayment () {
	// var dateField = 
	$( 'div.calendar-inline' ).datepicker({
		dateFormat: 'dd-mm-yy', 
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
		theme: "dark-thin",
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
};

function scrollToNavTab ( elmItem ) {
	var scrollToElement = elmItem[0].offsetLeft - 5;
	// The 'div' before '#' is not necessary, but I want to keep some reference to Your selector
	$( 'div.navtabs-scroller' ).mCustomScrollbar( 'scrollTo', scrollToElement );
};
