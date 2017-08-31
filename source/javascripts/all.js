//= require jquery
//= require bootstrap-sprockets
//= require lunr.min
//= require jssocials.min

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
  $("#share").jsSocials({
    shares: ["email", "twitter", "facebook", "googleplus", "linkedin", "pinterest", "stumbleupon", "whatsapp"]
  });

});
