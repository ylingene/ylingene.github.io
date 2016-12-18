/* Isotope fitrows and filter */
var $grid = $('.grid').isotope({
  layoutMode: 'fitRows',
  itemSelector: '.grid-item',
  fitRows: {
    gutter: 10
  }
});

// if($(window).width() <= 768) {
//   $grid.isotope({
//     layoutMode: 'fitRows',
//     itemSelector: '.grid-item',
//     fitRows: {
//       gutter: 0
//     }
//   });
// }

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

  // add photos of filter type to data-fancybox-group (slideshow only shows photos selected by the filter type)
  if(selector == "*") {
    $(".fancybox").attr("data-fancybox-group", "gallery");
  } 
  else { 
    $(selector).find(".fancybox").attr("data-fancybox-group", selector);
  }

  // filter thumbnails based on selector (filter)
  $grid.isotope({ filter: selector });

  $('#filters > button').removeClass('is-checked'); 
  $(this).addClass('is-checked'); 
  return false;
});

/* Fancybox initiation */
$(".fancybox").fancybox();
$(".fancybox").attr('rel', 'gallery').fancybox({
    beforeShow: function () {
        /* Disable right click */
        $.fancybox.wrap.bind("contextmenu", function (e) {
          return false; 
        });
    }
});


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

