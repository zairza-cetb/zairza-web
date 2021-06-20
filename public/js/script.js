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
  // Show event poster
  const openModalButtons = document.querySelectorAll("[data-modal-target]");
  const closeModalButtons = document.querySelectorAll("[data-close-button]");
  const overlay = document.getElementById("overlay");

  // openModalButtons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     const modal = document.querySelector(button.dataset.modalTarget);
  //     openModal(modal);
  //   });
  // });
  if (sessionStorage.clickcount === undefined) {
    window.addEventListener("load", () => {
      openModalButtons.forEach((button) => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
        sessionStorage.clickcount++;
      });
    });
  }

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(
        openModalButtons[0].dataset.modalTarget
      );
      closeModal(modal);
    });
  });

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  }
  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
});
// Check user logged in or not
firebase.auth().onAuthStateChanged((user) => {
  let userRoute;
  const event = `<a href="/me"><li class="transition block text-white hover:text-black px-4 py-1 lg:py-2 lg:my-0 my-1 lg:ml-2 font-normal bg-zairza-orange duration-300 ease-in-out rounded-full lg:animate-bounce">Skill++</li></a>`;
  if (user) {
    // User is signed in
    userRoute = `<a href="/me" id="user"><li class="block hover:text-white px-2 py-1 lg:my-0 my-1 lg:ml-2 font-normal bg-blue rounded" id="authRoute">Dashboard</li></a>`;
    // ...
  } else {
    // User is signed out
    userRoute = `<a href="/auth#signin" id="user"><li class="block hover:text-white px-2 py-1 lg:my-0 my-1 lg:ml-2 font-normal bg-blue rounded" id="authRoute">Login</li></a>`;
  }
  $("#mob-menu").append(userRoute);
  $("#mob-menu").append(event);
});
