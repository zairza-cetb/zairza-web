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

const isHidden = [true, true, true]

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
  new fullpage('#fullpage', {
    onLeave : function(origin, destination, direction) {
      if(origin.index == 0 && direction == 'down') {
        $('header').addClass('navbar-fixed');
      }
      else if(origin.index == 1 && direction == 'up'){
        $('header').removeClass('navbar-fixed');
      }
    },
    sectionsColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    scrollOverflow: true
  });

  $(".showHide").each((index, element) => {
    const cards = $(`#grid${index} .card`);
  
    const numHidden = cards.length - 3;
    const hiddenCards = cards.slice(-numHidden);
    hiddenCards.hide();
    $(element).click(() => {
      if (isHidden[index]) {
        hiddenCards.show();
        $(element).text("Show less");
      } else {
        hiddenCards.hide();
        $(element).text("Show More");
      }
      isHidden[index] = !isHidden[index];

      fullpage_api.reBuild();
    });
  });

  const navSectionMap = [1, 2, 4, 6, 8];
  $("#mob-menu li").each((index, element) => {
    $(element).click(() => fullpage_api.moveTo(navSectionMap[index]));
  });
});