function validate(res) {
  setTimeout(function () {
    $("#update-btn").removeClass("onclic");
    $("#update-btn").addClass("validate", 450, callback(res));
  }, 2250);
}

function callback(res) {
  if (res === "success") {
    showToast(200, "Magic link sent to this Email! 🙌");
  } else {
    showToast(res.status, res.responseJSON.message);
  }
  setTimeout(function () {
    $("#update-btn").removeClass("validate");
    $("#update-icon").show();
    $("#update-btn span").text("Reset Password");
  }, 1250);
}

// Email validate through regex
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function sendEmail() {
  $email = $('#form input[type="email"]').val();
  if (!validateEmail($email)) {
    $("#form input[type='email']").addClass("border-2 border-red-500");
      $("#form input[type='email']").siblings("small.invalid_email").removeClass("hidden");
      showToast(401, "Please enter a valid email");
    return;
  } else {
    $("#form input[type='email']").removeClass("border-2 border-red-500");
    $("#form input[type='email']").siblings("small.invalid_email").addClass("hidden");
  }
  $('#update-icon').hide();
  $('#update-btn span').text("");
  $('#update-btn').addClass("onclic", 50);
  // console.log($email);
  const data = {
    email: $email,
  };
  $.ajax({
    type: "POST",
    url: "/forgot",
    data: data,
    dataType: "json",
  })
    .done(function (data) {
      // console.log(data)
      validate("success");
    })
    .fail(function (err) {
      // console.log("error")
      validate(err);
    });
}
