// Toggle deactivate modal
function toggleModal() {
  $("#deactivateModal").toggleClass("hidden");
}

// Signout
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.

      // console.log($.cookie("zToken", null, { path: "/" }), "check");
      window.location.href = "/";
    })
    .catch((error) => {
      // An error happened.
      showToast(500, error.message);
    });
}

// Delete user
function deactivateAccount() {
  let token = $.cookie("zToken");
  $.ajax({
    type: "DELETE",
    url: "/api/user",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${token}`
      );
    },
  })
    .done(function (data) {
      toggleModal();
      showToast(200, "Your account has been deleted!");
      $.removeCookie("zToken", { path: '/' });
      setTimeout(function () {
        window.location.replace("/");
      }, 2000);
    })
    .fail(function (err) {
      toggleModal();
      showToast(400, err.message);
    });

  // let user = firebase.auth().currentUser;

  // user
  //   .delete()
  //   .then(function () {
  //     // User deleted.
  //     toggleModal();
  //     showToast(200, "User deleted successfully")
  //     setTimeout(function () {
  //       window.location.replace("/")
  //     },1000)
  //   })
  //   .catch(function (error) {
  //     // An error happened.
  //     toggleModal();
  //     showToast(500, error.message);
  //   });
}

// Add active to required nav link
link = window.location.pathname;
console.log(link);
$(".nav-item").each(function () {
  if ($(this).attr("href").indexOf(link) !== -1) {
    $(this).addClass("active-nav-link");
  }
});