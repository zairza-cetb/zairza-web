// Toggle delete modal
function deleteModal() {
  $("#deleteModal").toggleClass("hidden");
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
function deleteAccount() {
  $("#accountDeleteButton svg").toggleClass("hidden");
  $("#accountDeleteButton span").text("Processing");
  $("#accountDeleteButton").addClass("disabled");
  let token = $.cookie("zToken");
  $.ajax({
    type: "DELETE",
    url: "/api/user",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  })
    .done(function (data) {
      deleteModal();
      showToast(200, "Your account has been deleted!");
      $.removeCookie("zToken", { path: "/" });
      setTimeout(function () {
        window.location.replace("/");
      }, 1000);
    })
    .fail(function (err) {
      $("#accountDeleteModal").toggleClass("hidden");
      showToast(400, err.message);
    });
}

// Add active to required nav link
link = window.location.pathname;
console.log(link);
$(".nav-item").each(function () {
  if ($(this).attr("href").indexOf(link) !== -1) {
    $(this).addClass("active-nav-link");
  }
});

// Fancy Box init
$(document).ready(function () {
  $("[data-fancybox='images']").fancybox({
    arrows: false,
    infobar: false,
    toolbar: false,
    clickContent: false
  });
});
