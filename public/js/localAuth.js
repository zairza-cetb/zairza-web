function validate(req, res) {
  setTimeout(function () {
    $(`#${req}-btn`).removeClass("onclic");
    // $(`#${req}-btn`).addClass("validate", 450, callback(req, res));
    if (res == "success") {
      $(`#${req}-btn`).addClass("validate-success", 450, callback(req, res));
    } else {
      $(`#${req}-btn`).addClass("validate-fail", 450, callback(req, res));
    }
  }, 2250);
}

function callback(req, res) {
  if (res === "success") {
    if (req === "signin") {
      showToast(200, "Successfully signed in 🤝");
    } else if (req === "signup") {
      showToast(200, "Successfully signed up 🤝");
    }
  } else {
    showToast(res.status, res.responseJSON.message);
  }
  setTimeout(function () {
    // $(`#${req}-btn`).removeClass("validate");
    if (res === "success") {
      $(`#${req}-btn`).removeClass("validate-success");
    } else {
      $(`#${req}-btn`).removeClass("validate-fail");
    }
    $(`#${req}-svg`).show();
    if (req === "signin") {
      $(`#${req}-btn span`).text("Sign In");
    } else {
      $(`#${req}-btn span`).text("Sign Up");
    }
    if (res == "success") {
      window.location.replace("/me");
    }
  }, 1250);
}

// Confirm Password Validation
function matchPassword(password, confirm_password) {
  if (password != confirm_password) {
    $(this).addClass("border-2 border-red-500");
    $(this).parent().siblings("small.no_match").removeClass("hidden");
    showToast(401, "Passwords donot match ⛔");
    return false;
  } else {
    $(this).removeClass("border-2 border-red-500");
    $(this).parent().siblings("small.no_match").addClass("hidden");
    return true;
  }
}

// Email validate through regex
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function authenticate(req) {
  $email = $(`#${req}_form input[type='email']`).val();
  $password = $(`#${req}_form #${req}-password`).val();
  $confirm_password = $(`#${req}_form #confirm-password`).val();
  if (!validateEmail($email)) {
    showToast(401, "Please enter a valid email 🚫");
    return;
  }
  if (req === "signup") {
    if (!matchPassword($password, $confirm_password)) {
      return;
    }
  }
  $(`#${req}-svg`).hide();
  $(`#${req}-btn span`).text("");
  $(`#${req}-btn`).addClass("onclic", 50);
  // console.log($email)
  let data = {
    email: $email,
    password: $password,
  };
  $.ajax({
    type: "POST",
    url: `/${req}`,
    data: data,
    dataType: "json",
  })
    .done(function (data) {
      // console.log("success");
      validate(req, "success");
    })
    .fail(function (err) {
      // console.log("error");
      validate(req, err);
    });
}

// Submit forms on click of 'ENTER' key
$("#signup-btn").keypress(function (e) {
  if (e.keyCode === 13) {
    $(this).click();
  }
});

$("#signin-btn").keypress(function (e) {
  if (e.keyCode === 13) {
    $(this).click();
  }
});
