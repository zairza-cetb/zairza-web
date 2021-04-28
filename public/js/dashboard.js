// Toggle delete modal
function deleteModal() {
  $("#deleteModal").toggleClass("hidden");
}

//  Toggle delete modal
function confirmModal() {
  deleteModal();
  $("#confirmDeleteModal").toggleClass("hidden");
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
  $("#confirmDeleteButton svg").toggleClass("hidden");
  $("#confirmDeleteButton span").text("Processing");
  $("confirmDeleteButton").addClass("disabled");
  let token = $.cookie("zToken");
  $.ajax({
    type: "DELETE",
    url: "/api/user",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  })
    .done(function (data) {
      $("#confirmDeleteButton svg").toggleClass("hidden");
      $("#confirmDeleteModal").toggleClass("hidden");
      showToast(200, "Your account has been deleted!");
      $.removeCookie("zToken", { path: "/" });
      setTimeout(function () {
        window.location.replace("/");
      }, 1000);
    })
    .fail(function (err) {
      $("#confirmDeleteModal").toggleClass("hidden");
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
