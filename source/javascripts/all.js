//= require jquery
//= require bootstrap-sprockets
//= require flexisel
//= require flexslider
//= require jssocials


var action = 'click';
var speed = "500";

WebFont.load({
   google: {
     families: ['Roboto:300,400,500']
   }
 });

if(navigator.userAgent.indexOf("Speed Insights") == -1) {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-93818918-1', 'auto');
  ga('send', 'pageview');
}

$(document).ready(function() {
  $('.slider-reg').css('display','block');

  $('#collapse').is(":visible");

  $('#collapse').on('show.bs.collapse', function () {
    $('.flex-control-paging').hide();
  })

  $('#collapse').on('hidden.bs.collapse', function () {
    $('.flex-control-paging').show();
  })

  $('.carousel-quote').carousel({
    interval: 15000
  })



  $(".share").jsSocials({
    showLabel: false,
    showCount: false,
              shares: ["facebook", "twitter", "linkedin", "email"]
          });

  $('.main-flex-slider').flexslider({
    slideshowSpeed: 10000,
    directionNav: false,
    animation: "fade",
    pauseOnHover: false,
    start: function(slider){
        $('.main-flex-slider').resize();
    }
  });


    $("#client-slider").flexisel({
        visibleItems: 5,
        itemsToScroll: 1,
        animationSpeed: 200,
        infinite: true,
        navigationTargetSelector: null,
        autoPlay: {
            enable: true,
            interval: 5000,
            pauseOnHover: true
        },
        responsiveBreakpoints: {
            portrait: {
                changePoint:480,
                visibleItems: 1,
                itemsToScroll: 1
            },
            landscape: {
                changePoint:640,
                visibleItems: 2,
                itemsToScroll: 2
            },
            tablet: {
                changePoint:768,
                visibleItems: 3,
                itemsToScroll: 3
            }
        },
        loaded: function(object) {
            console.log('Slider loaded...');
        },
        before: function(object){
            console.log('Before transition...');
        },
        after: function(object) {
            console.log('After transition...');
        }
    });

    $('li.q').on(action, function(){
      //gets next element
      //opens .a of selected question
    $(this).next().slideToggle(speed)
        //selects all other answers and slides up any open answer
        .siblings('li.a').slideUp();

      //Grab img from clicked question
    var img = $(this).children('img');
      //Remove Rotate class from all images except the active
      $('img').not(img).removeClass('rotate');
      //toggle rotate class
      img.toggleClass('rotate');

    });//End on click

});
