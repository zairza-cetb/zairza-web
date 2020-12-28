function toggleMenu() {
  let menu = document.getElementById('mob-menu');
  if(menu.classList.contains('hidden')){
    menu.classList.remove('hidden');
    menu.classList.add('block');
  }
  else{
    menu.classList.remove('block');
    menu.classList.add('hidden');
  }
}
(function () {
  let controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onEnter',
      duration: "100%"
    }
  });

  let pins = document.querySelectorAll("section.parallax-1");
  let slides = document.querySelectorAll("section.parallax-2");

  let n = Math.min(pins.length, slides.length);

  for (let i = 0; i < n; i++) {
    new ScrollMagic.Scene({
      triggerElement: slides[i]
    })
      .setPin(pins[i], { pushFollowers: false })
      .addTo(controller);
  }

})();
$(document).ready(function() {
  $('#mob-menu a').on('click', function() {
    if($('#mob-menu').hasClass('hidden')){
      $('#mob-menu').removeClass('hidden').addClass('block');
      $('.menu').toggleClass('opened');
    }else{
      $('#mob-menu').removeClass('block').addClass('hidden');
      $('.menu').toggleClass('opened');
    }
  })
  
  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      $('header').addClass('navbar-fixed');
    }
    if ($(window).scrollTop() < 1) {
      $('header').removeClass('navbar-fixed');
    }
  });
})