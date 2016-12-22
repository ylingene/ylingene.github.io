// show nav bar at a certain breakpoint
$(window).scroll(function(){                           
    if ($(this).scrollTop() >= $(window).height()) {
        $('.navbar-fixed-top').addClass('navbar-background');
    }
    else {
        $('.navbar-fixed-top').removeClass('navbar-background');
    }
});