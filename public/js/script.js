function toggleMenu() {
  let menu = document.getElementById("mob-menu");
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    menu.classList.add("block");
  } else {
    menu.classList.remove("block");
    menu.classList.add("hidden");
  }
}
function sendEmail() {
  window.location = "mailto:cet.sac.zairza@gmail.com";
}
const isHidden = [true, true, true];
const sections = [0, 1, 1, 2, 3, 3, 4, 4, 5, 6];

$(document).ready(function () {
  $("#mob-menu li").on("click", function () {
    if ($("#mob-menu").hasClass("hidden")) {
      $("#mob-menu").removeClass("hidden").addClass("block");
      $(".menu").toggleClass("opened");
    } else {
      $("#mob-menu").removeClass("block").addClass("hidden");
      $(".menu").toggleClass("opened");
    }
  });
  new fullpage("#fullpage", {
    licenseKey: "XaTw#PV$o2",
    afterLoad: function (origin, destination, direction) {
      navs = $("ul#mob-menu > li");
      if (origin.index != 11)
        navs.eq(sections[origin.index]).removeClass("bg-focus");
      if (destination.index != 11)
        navs.eq(sections[destination.index]).addClass("bg-focus");

      jQuery(".section.active [data-aos]").addClass("aos-animate");
    },
    onLeave: function (origin, destination, direction) {
      if (origin.index == 0 && direction == "down") {
        $("header").addClass("navbar-fixed");
      } else if (destination.index == 0 && direction == "up") {
        $("header").removeClass("navbar-fixed");
      }
      jQuery(".section [data-aos]").removeClass("aos-animate");
    },
    sectionsColor: [
      "white",
      "white",
      "white",
      "white",
      "white",
      "white",
      "white",
      "white",
      "white",
      "white",
      "white",
    ],
    scrollOverflow: true,
    scrollOverflowOptions: {
      scrollbars: false,
    },
    bigSectionsDestination: "top",
    fixedElements: "navbar",
    easingcss3: "ease-in-out",
  });

  $(".showHide").each((index, element) => {
    const cards = $(`#grid${index} .card`);
    let numHidden;
    if (index == 0) {
      numHidden = cards.length - 3;
    } else {
      numHidden = cards.length - 4;
    }

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

  const navSectionMap = [1, 2, 4, 5, 7, 9, 10];
  $("#mob-menu li").each((index, element) => {
    $(element).click(() => fullpage_api.moveTo(navSectionMap[index]));
  });

  // Newsletter cookie
  //   let visited = $.cookie("visited");
  //   if (visited != "yes") {
  //     $("#newsletter_pop").toggleClass("hidden");
  //     $("main").toggleClass("opacity-10");
  //   }
  //   $.cookie("visited", "yes", {
  //     expires: 1, // the number of days cookie  will be effective
  //   });

  //   $("#newsletter-close-icon").on("click", function () {
  //     $("#newsletter_pop").toggleClass("hidden");
  //     $("main").toggleClass("opacity-10");
  //   });
});
