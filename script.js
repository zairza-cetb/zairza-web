function toggleMenu() {
  let menu = document.getElementById('mob-menu');
  let cross = document.getElementById('cross');
  let hamburger = document.getElementById('hamburger');
  if(menu.classList.contains('hidden')){
    menu.classList.remove('hidden');
    menu.classList.add('block');
    cross.classList.remove('hidden');
    cross.classList.add('block');
    hamburger.classList.add('hidden');
  }
  else{
    menu.classList.remove('block');
    menu.classList.add('hidden');
    cross.classList.remove('block');
    cross.classList.add('hidden');
    hamburger.classList.remove('hidden');
  }
}
(function () {
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onEnter',
      duration: "100%"
    }
  });

  var slides = document.querySelectorAll("section.parallax");

  new ScrollMagic.Scene({
    triggerElement: slides[1]
  })
    .setPin(slides[0], { pushFollowers: false })
    .addTo(controller)
    .on("progress", function(e) {
      slides[0].style.opacity =  1 - (e.progress)/(0.4);
      console.log(e.progress);
    });

})();
  