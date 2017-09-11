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
            cellAlign: 'center',
            imagesLoaded: true,
            prevNextButtons: false
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

$(window).resize(function() {
    isFlickity = initFlickityorIsotope(isFlickity);
});
