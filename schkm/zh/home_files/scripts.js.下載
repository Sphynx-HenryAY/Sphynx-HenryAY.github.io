jQuery(document).ready(

	function() {
		
		// Language Tools reset
		$Q('#LanguageMenu_0_0').html('<span>English</span>');
		$Q('#LanguageMenu_0_1').html('<span>中文</span>');
		$Q('#language-tools').show();
		
		// Top Notifications 
		$Q('.ticker').marquee({  
		//speed in milliseconds of the marquee  
		speed: 15000,  
		//gap in pixels between the tickers  
		gap: 10,  
		//gap in pixels between the tickers  
		delayBeforeStart: 0,  
		//'left' or 'right'  
		direction: 'left',
		pauseOnHover: 'True'
		})
		
		// Search
		$Q('#search .ipf-PageSearch-TextField').focus(function()
		{
			/*to make this flexible, I'm storing the current width in an attribute*/
			$Q(this).attr('data-default', $Q(this).width());
			$Q(this).animate({ width: 100 }, 'slow');
		}).blur(function()
		{
			/* lookup the original width */
			var w = $Q(this).attr('data-default');
			$Q(this).animate({ width: w }, 'slow');
		});
		
		// Remove ACM Edit Button for Slideshow
		$Q("#hero-slideshow .ipf-editpagelet-icon-container").remove();
		
		// Top Slideshow		
		$Q('#hero-slideshow ul').carouFredSel({
					responsive: true,
					items: {
						visible: 1,
						width: 970,
						height: 270
					},
					scroll: {
						duration:500,
						timeoutDuration: 3000,
						pauseOnHover:false,
						fx: 'fade'
					
					},
					
					pagination: '#pager'
					
		});
		
/*******************************************************/
/* FAQ
/*******************************************************/

$Q('.faqAnswer').hide();
    $Q('.faqQuestion').hover(
  function () {
    $Q(this).addClass("faqHover");
  },
  function () {
    $Q(this).removeClass("faqHover");
  }
);
$Q('.faqQuestion').click(function() {
    $Q(this).next('.faqAnswer').animate({
height: 'toggle'
  }, 250, function() {
   //checkSideBar();
  });
});


/*******************************************************/
/* Expand/Collapse
/*******************************************************/
(function(a){"use strict";a.fn.clickOut=function(b,c){a(document).click(a.proxy(function(d){if(!a(d.target).is(this)&&this.has(d.target).length===0){d.delegateTarget=this.get();if(c===undefined){b.call(this,d)}else{c.call(this,d)}}},this))}}(jQuery));

  $Q(".expandcollapse li").click(function (event) {
      'use strict';
      $Q(this).children('ul').slideToggle(250, function () {
          $Q(this).find('ul').hide();
      });
      $Q(this).siblings().children('ul').each(function () {
          $Q(this).slideUp(250, function () {
              $Q(this).find('ul').hide();
          });
      });
      event.stopPropagation();
  }).clickOut(function () {
      'use strict';
      $Q(this).children('ul').slideUp(250, function () {
          $Q(this).find('ul').hide();
      });

  });

  $Q(".expandcollapse li a").click(function (e) {
     if ($Q(this).hasClass("heading")) {
     e.preventDefault();
     }
  });


/*******************************************************/
/* Dynamic select
/*******************************************************/
$Q(function(){
    // bind change event to select
    $Q('.selectanchor').bind('change', function () {
        var url = $Q(this).val(); // get selected value
        if (url) { // require a URL
            window.location = url; // redirect
        }
        return false;
    });
  });

	

	}

);


