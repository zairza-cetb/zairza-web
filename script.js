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
const sections = [0,1,1,2,2,3,3,4,4]

$(document).ready(function() {
  // $.getJSON("assets/json/projects.json",(data)=>{
  //   console.log(data);
  //   data.forEach(e => {
  //     $(`<div class="card effect effect-one">
  //     <img src="/assets/images/Projects/${e.img}" />
  //     <div class="tab-text">
  //         <h2 class="pt-1">${e["Project name"]}</h2>
  //         <p>${e["desc"].slice(0,300)+" ..."}</p>
  //         <div class="icons-block">
  //             <a href="#" class="social-icon-1"><i class="bx bxl-chrome"></i></a> <a href="${e['github']}" class="social-icon-2"><i class="bx bxl-github"></i></a>
  //         </div>
  //     </div>
  // </div>`).appendTo("#grid0");
  //   });
  // })

  // $.getJSON("assets/json/members.json",(data)=>{
  //   console.log(data);
  //   data.forEach(e => {
    //   $(`<div class="card"> 
    //   <div class="imgBx fill"> 
    //     <img 
    //       src="${e["Upload Photo"]}" 
    //       alt=""
    //       style=""
    //     />
    //   </div>
    //   <div class="content">
    //     <div class="contentBx">
    //       <h3>${e.Name} <br /><span>${e.position}</span></h3>
    //     </div>
    //     <ul class="sci">
    //       <li style="--i: 1">
    //         <a href="${e["LinkedIn Profile"]}"><i class="bx bxl-linkedin" aria-hidden="true"></i></a>
    //       </li>
    //       <li style="--i: 2">
    //         <a href="${e["Twitter Handle"]}"><i class="bx bxl-twitter" aria-hidden="true"></i></a>
    //       </li>
    //       <li style="--i: 3">
    //         <a href="${e["Github Handle"]}"><i class="bx bxl-github" aria-hidden="true"></i></a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>`).appendTo("#grid2");
  //   });

  // })


  $('#mob-menu li').on('click', function() {
    if($('#mob-menu').hasClass('hidden')){
      $('#mob-menu').removeClass('hidden').addClass('block');
      $('.menu').toggleClass('opened');
    }else{
      $('#mob-menu').removeClass('block').addClass('hidden');
      $('.menu').toggleClass('opened');
    }
  })
  new fullpage('#fullpage', {
    afterLoad: function(origin, destination, direction){
        navs = $('ul#mob-menu > li');
        navs.eq(sections[origin.index]).removeClass("bg-focus");
        navs.eq(sections[destination.index]).addClass("bg-focus");
    },
    onLeave : function(origin, destination, direction) {
      if([2,4,6].includes(origin.index)){
        var index = Math.floor(origin.index/2) - 1;
        if(isHidden[index]==false){
          isHidden[index] = true;
          const cards = $(`#grid${index} .card`);
          const numHidden = cards.length - 4;
          const hiddenCards = cards.slice(-numHidden);
          hiddenCards.hide();
          $(".showHide").eq(index).text("Show More");
          fullpage_api.reBuild();
        }
      }

      if(origin.index == 0 && direction == 'down') {
        $('header').addClass('navbar-fixed');
      }
      else if(destination.index == 0 && direction == 'up'){
        $('header').removeClass('navbar-fixed');
      }
    },
    sectionsColor: ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    scrollOverflow: true,
    scrollOverflowOptions: {
      scrollbars: false
    }
  });

  $(".showHide").each((index, element) => {
    const cards = $(`#grid${index} .card`);
    
    const numHidden = cards.length - 4;
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