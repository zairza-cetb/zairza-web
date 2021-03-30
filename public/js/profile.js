// Read/Write Profile Field
function toggleFieldVisibility(ele) {
  $field = ele.parent().siblings();
  if ($field.is("[readonly]")) {
    // console.log('password')
    $field.attr("readonly", false);
    ele.children().removeClass("bxs-lock").addClass("bxs-lock-open");
    $field.focus();
  } else {
    // console.log('text')
    $field.attr("readonly", true);
    ele.children().removeClass("bxs-lock-open").addClass("bxs-lock");
  }
}

// Iterate over checkbox fields to connect/disconnect third_party_auth
let authWindow;

window.addEventListener("message", function (e) {
  // console.log("popup-done")
  if (e.data === "popup-done") {
    showToast(200, "Conected 😎");
  } else if (e.data === "popup-failed") {
    showToast(409, "User with this email id already exists");
  }
});
function ThirdPartyAuthenticate(provider_name, state) {
  // console.log(state)
  var width = 1366,
    height = 768;
  let link;
  if (provider_name === "Google" && state) {
    link = "/auth/google";
    console.log("google", state);
  } else if (provider_name === "github" && state) {
    link = "/auth/github";
    console.log("Github", state);
  } else if(!state){
    $.ajax({
      type: "GEt",
      url: `/unlink/${provider_name}`,
    })
      .done(function (data) {
        // console.log("success");
        showToast(200, `${provider_name} disconnected 😞`);
      })
      .fail(function (err) {
        // console.log("error");
        showToast(err.status, err.errResponse.message);
      });
  }
  var w = window.outerWidth - width,
    h = window.outerHeight - height;
  var left = Math.round(window.screenX + w / 2);
  var top = Math.round(window.screenY + h / 2.5);

  if (state) {
    authWindow = window.open(
      link,
      "Connect",
      "width=" +
        width +
        ",height=" +
        height +
        ",left=" +
        left +
        ",top=" +
        top +
        ",toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0"
    );
  }
}

function validate(res) {
  setTimeout(function () {
    $("#update-btn").removeClass("onclic");
    $("#update-btn").addClass("validate", 450, callback(res));
  }, 2250);
}

function callback(res) {
  if (res === "success") {
    showToast(200, "Profile updated successfully 🙌");
  } else {
    showToast(res.status, res.responseJSON.message);
  }
  setTimeout(function () {
    $("#update-btn").removeClass("validate");
    $("#update-icon").show();
    $("#update-btn span").text("Update Profile");
    if (res === "success") {
      window.location.replace("/me");
    }
  }, 1250);
}

// Update profile ajax request
function updateProfile() {
  $email = $("#profile_form input[type='email']").val();
  $registration_no = $("#profile_form #regno").val();
  $branch = $("#profile_form #branch").val();
  $wing = $("#profile_form #wing").val();
  $name = $("#profile_form #name").val();
  $newsletter_subscription = $("#profile_form #newsletter_toggle").prop("checked");

  $("#update-icon").hide();
  $("#update-btn span").text("");
  $("#update-btn").addClass("onclic", 50);

  let data = {
    email: $email,
    registration_no: $registration_no,
    branch: $branch,
    wing: $wing,
    name: $name,
    newsletter_subscription: {
      applied: $newsletter_subscription
    }
  };
  // console.log(data);
  $.ajax({
    type: "PUT",
    url: "/user/edit",
    data: data,
    dataType: "json",
  })
    .done(function (data) {
      // console.log("success");
      validate("success");
    })
    .fail(function (err) {
      // console.log("error");
      validate(err);
    });
}
