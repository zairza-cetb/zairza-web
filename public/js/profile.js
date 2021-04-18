// Read/Write Profile Field
function toggleFieldVisibility(ele) {
  $field = ele.parent().siblings();
  if ($field.is("[readonly]")) {
    $field.attr("readonly", false);
    ele.children().removeClass("bxs-lock").addClass("bxs-lock-open");
    $field.focus();
  } else {
    $field.attr("readonly", true);
    ele.children().removeClass("bxs-lock-open").addClass("bxs-lock");
  }
}

function ThirdPartyAuthenticate(provider_name, state, element) {
  console.log(provider_name, state);

  var provider, providerId;
  if (provider_name == "Google") {
    provider = new firebase.auth.GoogleAuthProvider();
    providerId = "google.com";
  } else if (provider_name == "Github") {
    provider = new firebase.auth.GithubAuthProvider();
    providerId = "github.com";
  }
  if (!state) {
    setState("pending", element);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .unlink(providerId)
          .then(async (result) => {
            // Auth provider unlinked from account
            // ...
            setState("off", element);
            showToast(200, `${provider_name} disconnected 😞`);
            const token = await user.getIdToken();
            $.cookie("zToken", token);
          })
          .catch((error) => {
            // An error happened
            // ...
            setState("on", element);
            showToast(400, error.message);
          });
      } else {
        console.log("error");
      }
    });
  } else if (state) {
    setState("pending", element);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .linkWithPopup(provider)
          .then(async (result) => {
            // Accounts successfully linked.
            var credential = result.credential;
            var user = result.user;
            console.log(user);
            let element = $(
              `.connect[data-provider=${provider_name.toLowerCase()}]`
            );
            setState("on", element);
            showToast(200, `${provider_name} conected 😎`);
            const token = await user.getIdToken();
            $.cookie("zToken", token);
            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            // ...
            setState("off", element);
            showToast(409, error.message);
            console.log(error);
          });
      } else {
        console.log("state = definitely signed out");
      }
    });
  }
}

function validate(res) {
  setTimeout(function () {
    $("#update-btn").removeClass("onclic");
    if (res == "success") {
      $("#update-btn").addClass("validate-success", 450, callback(res));
    } else {
      $("#update-btn").addClass("validate-fail", 450, callback(res));
    }
  }, 2250);
}

function callback(res) {
  if (res === "success") {
    showToast(200, "Profile updated successfully 🙌");
  } else {
    showToast(res.status, res.responseJSON.message);
  }
  setTimeout(function () {
    if (res === "success") {
      $("#update-btn").removeClass("validate-success");
    } else {
      $("#update-btn").removeClass("validate-fail");
    }
    $("#update-icon").show();
    $("#update-btn span").text("Update Profile");
    if (res === "success") {
      window.location.replace("/profile");
    }
  }, 1250);
}

// Email validate through regex
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//  Registration number validate
function validateRegistrationNumber(reg_no) {
  const re = /^[0-9]{10}$/;
  return re.test(reg_no);
}

$("input[type='email']").on("change", function () {
  $response = validateEmail($(this).val());
  if (!$response) {
    $(this).addClass("border-2 border-red-500");
    $("small.invalid_email").removeClass("hidden");
  } else {
    $(this).removeClass("border-2 border-red-500");
    $("small.invalid_email").addClass("hidden");
  }
});

// Update profile ajax request
function updateProfile() {
  $email = $("#profile_form input[type='email']").val();
  $registration_no = $("#profile_form #regno").val();
  $branch = $("#profile_form #branch").val();
  $wing = $("#profile_form #wing").val();
  $name = $("#profile_form #name").val();
  $newsletter_subscription = $("#profile_form #newsletter_toggle").prop(
    "checked"
  );
  if (!validateEmail($email) || $email.length == 0) {
    showToast(401, "Please enter a valid email 🚫");
    return;
  }
  if ($name.length == 0) {
    showToast(401, "Please enter your name 🔐");
    return;
  }
  if (
    !validateRegistrationNumber($registration_no) ||
    $registration_no.length == 0
  ) {
    showToast(401, "Please enter a valid registration number 🔐");
    return;
  }

  $("#update-icon").hide();
  $("#update-btn span").text("");
  $("#update-btn").addClass("onclic", 50);

  let data = {
    email: $email,
    registration_no: $registration_no,
    branch: $branch,
    wing: $wing,
    name: $name,
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

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.

      console.log($.cookie("zToken",null, { path: "/" }),"check");
      window.location.href = "/";
    })
    .catch((error) => {
      // An error happened.
      showToast(500, error.message);
    });
}

function setState(state, element) {
  // elApp.dataset.prevState = state;
  // current = state;
  // activate(state);

  $elApp = element;
  $elToggle = $elApp.find("input");

  $elApp.attr("data-state", state);
  element
    .find(`[data-active]`)
    .each((i, $el) => $($el).removeAttr("data-active"));
  element
    .find(`[data-for="${state}"]`)
    .each((i, $el) => $($el).attr("data-active", true));

  // elToggle = $elToggle.get(0);
  switch (state) {
    // case 'off':
    //   elToggle.indeterminate = false;
    //   elToggle.checked = false;
    //   elToggle.readOnly = false;
    //   break;
    // case 'pending':
    //   elToggle.readOnly = true;
    //   elToggle.indeterminate = true;

    //   break;
    // case 'on':
    //   elToggle.readOnly = false;
    //   elToggle.checked = true;
    //   elToggle.indeterminate = false;
    //   break;
    // default:
    //   break;
    case "off":
      $($elToggle).prop("indeterminate", false);
      $($elToggle).attr("checked", false);
      $($elToggle).prop("readonly ", false);
      break;
    case "pending":
      $($elToggle).prop("readonly", true);
      $($elToggle).prop("indeterminate ", true);
      break;
    case "on":
      $($elToggle).prop("readonly", false);
      $($elToggle).attr("checked", true);
      $($elToggle).prop("indeterminate", false);
      break;
    default:
      break;
  }
}

$(document).ready(function () {
  $(".connect").each(function (index, el) {
    setState($(el).attr("data-state"), $(el));
  });
});

// Subscribe to newsletter
function subscribe_newsletter(ele, state) {
  $newsletter_subscription = state;
  let data = {
    newsletter_subscription: {
      applied: $newsletter_subscription,
    },
  };
  setState("pending", ele);
  $.ajax({
    type: "PUT",
    url: "/user/edit",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json",
  })
    .done(function (data) {
      // console.log("success");
      if (state) {
        setState("on", ele);
        showToast(200, "Newsletter subscribed 👍");
      } else {
        setState("off", ele);
        showToast(200, "Newsletter unsubscribed 🥺");
      }
    })
    .fail(function (err) {
      // console.log("error");
      setState("off", ele);
      showToast(err.status, err.responseJSON.message);
    });
}
