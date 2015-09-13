$(document).ready(function() {

    $(window).scroll(function(){                          
            if ($(this).scrollTop() >= $(window).height()) {
                $('#menu').stop().fadeIn(300);
            } else {
                $('#menu').stop().fadeOut(275);
            }
        });

//     $('.overlay').hover(function() {
//     $(this).find('img').fadeTo(500, 0.5);
// }, function() {
//     $(this).find('img').fadeTo(500, 1);
// });
    
});
