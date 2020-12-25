function toogleMenu() {
    document.getElementById("mobile-menu__open").classList.toggle("hidden");
    document.getElementById("mobile-menu__close").classList.toggle("hidden");
    document.getElementById("mobile-menu__items").classList.toggle("hidden");
  }
  
  document.getElementById("mobile-menu__open").addEventListener(
    "click",
    () => {
      toogleMenu();
    },
    false
  );
  document.getElementById("mobile-menu__close").addEventListener(
    "click",
    () => {
      toogleMenu();
    },
    false
  );
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
  