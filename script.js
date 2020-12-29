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

    new fullpage('#fullpage', {
      sectionsColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
      scrollOverflow: true
    });
  });
})