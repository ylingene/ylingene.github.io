/* Isotope fitrows and filter */
var $grid = $('.grid').isotope({
    layoutMode: 'fitRows',
    itemSelector: '.grid-item',
    fitRows: {
        gutter: 10
    }
});

$grid.imagesLoaded().progress( function() {
    $grid.isotope('layout');
});

// filter functions
var filterFns = {}
// bind filter button click
$('.filters-button-group').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $grid.isotope({ filter: filterValue });
});
// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
    });
});
$('#filters button').click(function(){
    var selector = $(this).attr('data-filter');
    if($(this).hasClass('is-checked')) { return false; }

    // add photos of filter type to data-fancybox-group (slideshow only shows photos selected by the filter type)
    if(selector == "*") {
        // $(".fancybox").attr("data-fancybox-group", "gallery");
        photoGallery = photoswipe('.grid-item');
    } 
    else if(selector === '.portrait') { 
        // $(selector).find(".fancybox").attr("data-fancybox-group", selector);
        photoGallery = photoswipe('.portrait');
    }
    else {
        photoGallery = photoswipe('.landscape');
    }

    // filter thumbnails based on selector (filter)
    $grid.isotope({ filter: selector });

    $('#filters > button').removeClass('is-checked'); 
    $(this).addClass('is-checked'); 
    return false;
});

/* Fancybox initiation */
// $(".fancybox").fancybox();
// $(".fancybox").attr('rel', 'gallery').fancybox({
//     beforeShow: function () {
//         // Disable right click 
//         $.fancybox.wrap.bind("contextmenu", function (e) {
//           return false; 
//         });
//     }
// });

/* --------------- photoswipe --------------- */
// jQuery.fn.getParent = function(num) {
//     var last = this[0];
//     for (var i = 0; i < num; i++) {
//         last = last.parentNode;
//     }
//     return jQuery(last);
// };
  

var PIC_LONG_LENGTH = 1600;
var PIC_SHORT_LENGTH = 1067;

// closures!
function photoswipe(selector) {
    var items = [];
    var $pswpElement = $('.pswp')[0];
    var CustomUI = PhotoSwipeUI_Default; // removed share features in default
    var options = {
        index: 0, // start on first slide
        history: false,
        mainClass: 'pswp--minimal--dark',
        barsSize: {top:0,bottom:0},
        captionEl: false,
        fullscreenEl: false,
        shareEl: false,
        // bgOpacity: 0.85,
        tapToClose: true,
        tapToToggleControls: false,
        showHideOpacity: true,
        getThumbBoundsFn: false,
        // showAnimationDuration: 0//,
        // getThumbBoundsFn: function(index) {
        //     // See Options -> getThumbBoundsFn section of documentation for more info
        //     var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
        //         pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
        //         rect = thumbnail.getBoundingClientRect(); 

        //     return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        // }
    };

    // initilize index of each picture and build items array
    $(selector).each(function(index) {
        $a = $(this).find('a');
        $a.attr('data-ps-pic-index', index);

        var width = PIC_SHORT_LENGTH;
        var height = PIC_LONG_LENGTH;
        if($(this).hasClass('grid-item-long')) {
            width = PIC_LONG_LENGTH;
            height = PIC_SHORT_LENGTH;
        }

        var item = {
            src: $a.attr('href'),
            msrc: $a.children('img').attr('src'),
            w: width,
            h: height
        };

        items.push(item);
    });

    // return function to take in index and call Photoswipe object
    return function(index) {
        options.index = index;
        var gallery = new PhotoSwipe($pswpElement, CustomUI, items, options);
        gallery.init();
    }
};

var photoGallery = photoswipe('.grid-item');
$('.ps-click').click(function(e) {
    e.preventDefault();
    photoGallery(parseInt($(this).attr('data-ps-pic-index'), 10));
});

// prevent right click on items
$('.pswp .pswp__item').bind('contextmenu', function(e) {
    return false;
}); 