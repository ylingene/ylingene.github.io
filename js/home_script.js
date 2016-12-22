// show nav bar at a certain breakpoint depending on the window size (corresponds to the hero-div size)
$(window).scroll(function(){                          
    if ($(window).width() <= 768) {
        if ($(this).scrollTop() >= $(window).height() * .75) {
            // $('.navbar').addClass('hidden-nav');
            // $('.hidden-nav').stop().fadeIn(300);
            // alert('less than or equal to 768')
        }
        else {
            // $('.hidden-nav').stop().fadeOut(275);
        }
    } 
    else if ($(window).width() > 768) {
        if ($(this).scrollTop() >= $(window).height()) {
            console.log('hello')
            $('.navbar').animate({backgroundColor: '#292c31'}, 100);
        }
        else {
            $('.navbar').animate({backgroundColor: 'transparent'}, 100);
        }
    }
    else {
        $('.hidden-nav').stop().fadeOut(275);
    }
});