/* //rbc-wm.core.js */

$( function () {
	
	/* -- fancy scrollbar for navigation panel */
	createFancyScrollbarForNav();
	
	/* -- In-Menu search option */
	$( 'body' ).on( 'click', 'div.search-start a.btn-search', function () {
		if ( !$( this ).hasClass( 'search-active' ) ) {
			$( this ).addClass( 'search-active' );
			$( 'div.go-to-clients' ).addClass( 'goclients-off' );
			$( 'div.search-text-area' ).addClass( 'searchtext-on' );
			setTimeout(function(){
				$( 'div.search-text-area' ).find( '.search-input' ).focus();
			}, 350);
		} else {
			$( this ).removeClass( 'search-active' );
			$( 'div.go-to-clients' ).removeClass( 'goclients-off' );
			$( 'div.search-text-area' ).removeClass( 'searchtext-on' );
		}
	} );
	
	/* -- Nav show/hide */
	$( 'body' ).on( 'click', 'div.glmenu-icon>a.btn-glmenu-icon', function () {
		var contWidth = $( 'header.global-header div.container' ).width();
		if ( !$( this ).hasClass( 'menu-active' ) ) {
			$( this ).addClass( 'menu-active' );
			$( 'div.page-wrapper' ).addClass( 'shift-nav' );
			$( 'nav.global-nav' ).addClass( 'nav-showing' );
			$( 'header.global-header' ).addClass( 'shift-header' );
			// $( 'header.global-header div.container' ).width( contWidth - 300 );
		} else {
			$( this ).removeClass( 'menu-active' );
			$( 'div.page-wrapper' ).removeClass( 'shift-nav' );
			$( 'nav.global-nav' ).removeClass( 'nav-showing' );
			$( 'header.global-header' ).removeClass( 'shift-header' );
			// $( 'header.global-header div.container' ).width( contWidth + 300 );
		}
	});
	
	/* -- Logout modal show */
	$( 'body' ).on( 'click', 'a.btn-logout', function () {
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
		theme:"minimal-dark"
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
