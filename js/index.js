// show nav bar at a certain breakpoint
$(window).scroll(function() {
    // -60 px to have nav show up before next section
    if ($(this).scrollTop() >= $(window).height() - 60) {
        $('.navbar-fixed-top').addClass('navbar-background');
    }
    else {
        $('.navbar-fixed-top').removeClass('navbar-background');
    }
});

// carousel on small screen devices
var isFlickity = false;

function initFlickityorIsotope(isFlickity) {
    if (!isFlickity && $(window).width() < 768) {
        $('.grid').isotope('destroy');
        $('.carousel').flickity({
            // options
            // cellAlign: 'center',
            imagesLoaded: true,
            prevNextButtons: true
        });
        isFlickity = true;
    }
    else if (isFlickity && $(window).width() >= 768) {
        $('.carousel').flickity('destroy');
        $('.grid').isotope({
            layoutMode: 'fitRows',
            itemSelector: '.grid-item',
            fitRows: {
                gutter: 10
            }
        });
        isFlickity = false;
    }
    return isFlickity;
}

isFlickity = initFlickityorIsotope(isFlickity);

function setCarouselHeight() {
    var width_percentage = .77;
    var THUMBNAIL_RATIO = 1.465;
    var height = $(window).width() * width_percentage * THUMBNAIL_RATIO + 5; // extra 5 px to compensate for decimals
    $('.carousel-cell').css('height', height);
}
setCarouselHeight();

// on resize do stuff
$(window).resize(function() {
    isFlickity = initFlickityorIsotope(isFlickity);
    setCarouselHeight();
});
