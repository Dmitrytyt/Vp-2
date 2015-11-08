/**
 * Created by Admin on 8.11.15.
 */

var actionList = (function(){

    var catalog = $( '.product-catalog' );

    var init = function (){
        _setUpListens();
    };

    // Listens for events
    var _setUpListens = function(){
        $( 'body' ).on( 'click', function(e){
            _setElem(e);
        });
    };

    // Set click elem
    var _setElem = function(e){
        e.preventDefault();

        var targetElem = $( e.target );

        if(targetElem.is( ".view-catalog__list .view-catalog__link" )){
            targetElem = targetElem.children();
        }

        if(targetElem.is( ".icon-full-list" )){
            _showFullList(e);
            return;
        }

        if(targetElem.is( ".icon-tile" )){
            _showTile(e);
            return;
        }

        if(targetElem.is( ".icon-list" )){
            _showShotList(e);
            return;
        }

    };

    // Show full list
    var _showFullList = function(e) {
        _resetState();
        _addState(e);

        catalog.addClass( 'product-catalog__full-list' );
    };

    // Show tile
    var _showTile = function(e){
        _resetState();
        _addState(e);

        catalog.addClass( 'product-catalog__full-list product-catalog__tile' );
    };

    var _showShotList = function(e){
        _resetState();
        _addState(e);
    };

    var _resetState = function(){
        catalog.removeClass( 'product-catalog__full-list product-catalog__tile' );
        var active = $( '.view-catalog__link_active', '.view-catalog__list');
        active.removeClass( 'view-catalog__link_active' );
    };

    var _addState = function(e){
        var targetElem = $( e.target );

        if(targetElem.is( ".icon" )){
            targetElem.closest( '.view-catalog__link' ).addClass( 'view-catalog__link_active' );
            return;
        }

        targetElem.addClass( 'view-catalog__link_active' );
    };

    // Return object (public methods)
    return {
      init: init
    }

})();


var resetFilter = (function(){
    var init = function (){
        _setUpListens();
    };

    // Listens for events
    var _setUpListens = function(){
        $( '.island__reset' ).on( 'click', function(e){
            _reset(e);
        });
    };

    // Reset
    var _reset = function(e){
        e.preventDefault();
        var targetElem = $( e.target );
        var wrapInputs = targetElem.prev( '.island__list' );

        $("input:checkbox:enabled", wrapInputs).removeAttr('checked');

    };

    // Return object (public methods)
    return {
      init: init
    }

})();


var Accordeon = (function(){

	var _openSection = function($this){
		var
			container = $this.closest('.island__item'),
			content = container.find('.island__content');

		if (!container.hasClass( 'island__item_closed' )) {
			container.addClass( 'island__item_closed' );
			content.stop(true, true).slideUp();
		} else {
			container.removeClass('island__item_closed');
			content.stop(true, true).slideDown();
		}
	};

	return {
		init: function(){
			$('.island__link').on('click', function(e){
                console.log('hi');
			    e.preventDefault();
				_openSection($(this));

			});
		}
	}

}());


var slideShow = (function(){

	var _changeSlide = function($this){
		var container = $this.closest( '.product-catalog__photos' ),
			path = $this.find('img').attr('data-img'),
			display = container.find('.main-photo');

		display.fadeOut(function(){
			$(this).attr('src', path).fadeIn();
		});
	}

    return {
	    init: function(){
			$( '.list-photo__link' ).on('click', function(e){
			    e.preventDefault();
				var $this = $(this);
				_changeSlide($this);

			});
	    }
    }
}());

slideShow.init();

$(function() {
    var sliderRange = $( '.slider-range__item' );
    sliderRange.slider({
    range: true,
    min: 0,
    max: 26000,
    values: [ 100, 13000 ],
    slide: function( event, ui ) {
        $( ".price__price-from" ).val( ui.values[ 0 ] );
        $( ".price__price-to" ).val( ui.values[ 1 ] );
    }
  });

    $( ".price__price-from" ).val( sliderRange.slider( "values", 0 ) );
    $( ".price__price-to" ).val( sliderRange.slider( "values", 1 ) );

    $( 'select' ).select2();
    $( '.seo-content' ).columnize( { columns: 2} );

    // Call module Reset
    if( $( '.island__reset' ).length ){
        resetFilter.init();
    }

    // Call module actionList
    if( $( '.view-catalog__list' ).length ){
        actionList.init();
    }

    if ( $( '.island__link' ).length) {
        Accordeon.init();
    }

});
