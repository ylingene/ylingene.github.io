// $(document).ready(function() {

//     $(window).scroll(function(){                          
//             if ($(this).scrollTop() >= $(window).height()) {
//                 $('#menu').stop().fadeIn(300);
//             } else {
//                 $('#menu').stop().fadeOut(275);
//             }
//         });

// //     $('.overlay').hover(function() {
// //     $(this).find('img').fadeTo(500, 0.5);
// // }, function() {
// //     $(this).find('img').fadeTo(500, 1);
// // });
    
// });

$(document).ready( function() {

  // show nav bar at a certain breakpoint depending on the window size (corresponds to the hero-div size)
  $(window).scroll(function(){                          
      if ($(window).width() <= 768) {
          if ($(this).scrollTop() >= $(window).height() * .75) {
            $('.hidden-nav').stop().fadeIn(300);
          // alert('less than or equal to 768')
          }
          else {
          $('.hidden-nav').stop().fadeOut(275);
          }
      } 
      else if ($(window).width() > 768) {
         if ($(this).scrollTop() >= $(window).height()) {
          $('.hidden-nav').stop().fadeIn(300);
        }
        else {
          $('.hidden-nav').stop().fadeOut(275);
        }
      }
      else {
          $('.hidden-nav').stop().fadeOut(275);
      }
  });
  
});