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
