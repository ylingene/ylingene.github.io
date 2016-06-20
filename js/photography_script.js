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

  /* Isotope fitrows and filter */

  $('.grid').isotope({
  	layoutMode: 'fitRows',
    itemSelector: '.grid-item',
    fitRows: {
      gutter: 10
    }
  });

  if($(window).width() <= 768) {
    $('.grid').isotope({
    layoutMode: 'fitRows',
    itemSelector: '.grid-item',
    fitRows: {
      gutter: 0
    }
  });
  }

var $grid = $('.grid').imagesLoaded( function() {
  // init Isotope after all images have loaded
  $grid.isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
  });
});

// init Isotope
  // var $grid = $('.grid').isotope({
  //   itemSelector: '.element-item',
  //   layoutMode: 'fitRows'
  // });
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
  
  // $('.grid').imagesLoaded( function(){
  //         $('.grid').isotope({
  //         itemSelector: '.item',
  //           isAnimated: true,
  //           isFitWidth: true
  //         });
  //     });

  // reveal all items after init
  var $items = $grid.find('.grid-item');
  $grid.addClass('is-showing-items').isotope( 'revealItemElements', $items );

  // var $container = $grid.find('#stuff');
  // console.log(container);
  // $container.imagesLoaded( function() {
  //     $container.isotope({itemSelector: '.grid-item'});
  // });

  // $('.fadein').fadeIn(1000);


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

});

