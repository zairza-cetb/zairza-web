function validate(res) {
  setTimeout(function () {
    $("#update-btn").removeClass("onclic");
    // $("#update-btn").addClass("validate", 450, callback(res));
    if (res == "success") {
      $("#update-btn").addClass("validate-success", 450, callback(res));
    } else {
      $("#update-btn").addClass("validate-fail", 450, callback(res));
    }
  }, 2250);
}

function callback(res) {
  if (res === "success") {
    showToast(200, "Magic link sent to this Email! 🙌");
  } else {
    // console.log(res)
    showToast(400, res.message);
  }
  setTimeout(function () {
    if (res === "success") {
      $("#update-btn").removeClass("validate-success");
    } else {
      $("#update-btn").removeClass("validate-fail");
    }
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
    $("#form input[type='email']")
      .siblings("small.invalid_email")
      .removeClass("hidden");
    showToast(401, "Please enter a valid email 🚫");
    return;
  } else {
    $("#form input[type='email']").removeClass("border-2 border-red-500");
    $("#form input[type='email']")
      .siblings("small.invalid_email")
      .addClass("hidden");
  }
  $("#update-icon").hide();
  $("#update-btn span").text("");
  $("#update-btn").addClass("onclic", 50);
  // console.log($email);
  // const data = {
  //   email: $email,
  // };
  // $.ajax({
  //   type: "POST",
  //   url: "/forgot",
  //   data: data,
  //   dataType: "json",
  // })
  //   .done(function (data) {
  //     // console.log(data)
  //     validate("success");
  //   })
  //   .fail(function (err) {
  //     // console.log("error")
  //     validate(err);
  //   });
  let auth = firebase.auth();

  auth
    .sendPasswordResetEmail($email)
    .then(function () {
      // Email sent.
      validate("success");
    })
    .catch(function (error) {
      // An error happened.
      validate(error)
    });
}

// Submit forms on click of 'ENTER' key
$("input").keypress(function (e) {
  if (e.keyCode === 13) {
    $("#update-btn").click();
  }
});