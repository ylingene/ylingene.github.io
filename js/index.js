// show nav bar at a certain breakpoint
$(window).scroll(function(){
    // -60 px to have nav show up before next section
    if ($(this).scrollTop() >= $(window).height() - 60) {
        $('.navbar-fixed-top').addClass('navbar-background');
    }
    else {
        $('.navbar-fixed-top').removeClass('navbar-background');
    }
});
