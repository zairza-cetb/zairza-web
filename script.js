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

// function scrollTo(element) {
//   $("body,html").animate(
//     {
//       scrollTop: $(element).offset().top
//     },
//     800
//   );
// }

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

  // let controller = new ScrollMagic.Controller({
  //   globalSceneOptions: {
  //     triggerHook: 'onEnter',
  //     duration: "90%"
  //   }
  // });

  // let sections = document.querySelectorAll("#sections section");

  $('#pagepiling').pagepiling({
    anchors: ['page1', 'page2', 'page3', 'page4'],
    sectionsColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    navigation: {
      'position': 'right',
       'tooltips': ['Page 1', 'Page 2', 'Page 3', 'Page 4']
     },
     navigation: false
});
})