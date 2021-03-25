// Confirm Password Validation
$("#confirm_password").on("change", function () {
  $password = $("#new-password").val();
  $confirm_password = $(this).val();
  if ($password != $confirm_password) {
    $(this).addClass("border-2 border-red-500");
    $(this).parent().siblings("small.no_match").removeClass("hidden");
  } else {
    $(this).removeClass("border-2 border-red-500");
    $(this).parent().siblings("small.no_match").addClass("hidden");
  }
});

// Show/Hide password
function togglePasswordVisibility(ele) {
  $password = ele.parent().siblings();
  if ($password.attr("type") === "password") {
    // console.log('password')
    $password.attr("type", "text");
    ele.children().removeClass("bx-hide").addClass("bx-show");
  } else {
    // console.log('text')
    $password.attr("type", "password");
    ele.children().removeClass("bx-show").addClass("bx-hide");
  }
}

// Update password form submit
$("#update-btn").on("click", function () {
  $password = $("#update_form input[type='password']").val();
  // console.log($email)
  let updateData = {
    password: $password,
  };
  let url = window.location.pathname;
  // console.log(url)
  $.ajax({
    type: "POST",
    url: url,
    data: updateData,
    dataType: "json",
  })
    .done(function (data) {
      // console.log(data)
      showToast(200, "Password successfully changed 🙌");
      setTimeout(function () {
        window.location.replace("/auth");
      }, 2000);
    })
    .fail(function (err) {
      // console.log("error")
      showToast(err.status, err.responseJSON.message);
    });
});
