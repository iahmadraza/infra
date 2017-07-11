/* //rbc-wm.core.js */

$( function () {
	
	/* -- fancy scrollbar for navigation panel */
	createFancyScrollbarForNav();
	//createFancyScrollbarForList();
	
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
		$(' .tiny-modal ').show(1);
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

	//.ux-component .ux-calendar img.btn-calendar
	$( 'body' ).on( 'click', 'div.ux-component div.ux-calendar', function ( event ) {
		// event.stopPropagation();
		// alert('uppiii');
		if ( !$( this ).hasClass( 'component-active' ) ) {
			$( this ).addClass( 'component-active' );
			$( this ).find( 'img.btn-calendar' ).addClass( 'btn-cal-active' );
		}
	});

	$( 'body' ).on( 'click', 'div.ux-component div.ux-calendar img.btn-calendar', function ( event ) {
		event.stopPropagation();
		if ( $( this ).hasClass( 'btn-cal-active' ) ) {
			$( this ).removeClass( 'btn-cal-active' );
			$( this ).closest( 'div.ux-calendar' ).removeClass( 'component-active' );
		}
	});

	// var dateField = 
	$( 'div.calendar-inline' ).datepicker({
		dateFormat: 'dd-mm-y', 
		altField: '#calValueDate',
		onSelect: function ( date ) {
			var selectedDate = date;
			$( this ).closest( 'div.ux-component' ).find( 'div.ux-calendar' ).find( 'div.enter-data-input' ).children( 'input.txtSelectDate' ).val( selectedDate );
			//alert( 'date = ' + date );
			//$('a.ui-state-default').removeClass('ui-state-highlight');
			//$(this).addClass('ui-state-highlight');
		}
	});

	//alert($( "div.calendar-inline" ).datepicker( "getDate" ));

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
