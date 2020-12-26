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
  