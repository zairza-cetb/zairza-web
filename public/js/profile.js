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
  // console.log(provider_name, state);

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
            showToast(200, `${provider_name} account disconnected 😞`);
            const token = await user.getIdToken(true);
            $.cookie("zToken", token);
          })
          .catch((error) => {
            // An error happened
            // ...
            setState("on", element);
            showToast(400, error.message);
          });
      } else {
        // console.log("error");
        window.location.replace("/auth#signin")
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
            // console.log(user);
            let element = $(
              `.connect[data-provider=${provider_name.toLowerCase()}]`
            );
            setState("on", element);
            showToast(200, `${provider_name} account connected 😎`);
            const token = await user.getIdToken(true);
            $.cookie("zToken", token);
            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            // ...
            setState("off", element);
            showToast(409, error.message);
            // console.log(error);
          });
      } else {
        // console.log("state = definitely signed out");
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
      window.location.replace("/me");
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
  const re2 = /^[0-9]{2}[A-Z]+[0-9]+$/; // For new registration numbers issued for 1st years
  return re.test(reg_no) || re2.test(reg_no);
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
  console.log($wing);
  $newsletter_subscription = $("#profile_form #newsletter_toggle").prop(
    "checked"
  );
  if ($name.length == 0) {
    showToast(401, "Please enter your name 🔐");
    return;
  }
  if (!validateEmail($email) || $email.length == 0) {
    showToast(401, "Please enter a valid email 🚫");
    return;
  }
  if (
    !validateRegistrationNumber($registration_no) ||
    $registration_no.length == 0
  ) {
    showToast(401, "Please enter a valid registration number 🔐");
    return;
  }
  if($branch == null) {
    showToast(401, "Please select your branch");
    return;
  }
  if($wing.length == 0) {
    showToast(401, "Please select your zairza wing");
    return;
  }

  $("#update-icon").hide();
  $("#update-btn span").text("");
  $("#update-btn").addClass("onclic", 50);

  let data = {
    email: $email,
    registrationNo: $registration_no,
    branch: $branch,
    wing: $wing,
    name: $name,
  };
  // console.log(data);
  $.ajax({
    type: "PUT",
    url: "/api/user/edit",
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

      // console.log($.cookie("zToken", null, { path: "/" }), "check");
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
      $($elToggle).prop("checked", false);
      $($elToggle).prop("readonly ", false);
      break;
    case "pending":
      $($elToggle).prop("readonly", true);
      $($elToggle).prop("indeterminate ", true);
      break;
    case "on":
      $($elToggle).prop("readonly", false);
      $($elToggle).prop("checked", true);
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
    newsletterSubscription: $newsletter_subscription
  };
  setState("pending", ele);
  $.ajax({
    type: "PUT",
    url: "/api/user/edit",
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

// Submit forms on click of 'ENTER' key
$("input").keypress(function (e) {
  if (e.keyCode === 13) {
    $("#update-btn").click();
  }
});

// Check if user directly came by clicking the magic popup
let params = window.location.href.split("#")[1];
let newsletterSubscription = $("#newsletter_toggle").prop("checked");
if (!newsletterSubscription && params) {
  $("#newsletter_toggle").click();
}


// fancy multiple selector
$(document).ready(function() {

  var select = $('select[multiple]');
  var options = select.find('option');

  var div = $('<div />').addClass('selectMultiple');
  var active = $('<div />');
  var list = $('<ul />');
  var placeholder = select.data('placeholder');

  var span = $('<span />').text(placeholder).appendTo(active);

  options.each(function() {
      var text = $(this).text();
      if($(this).is(':selected')) {
          active.append($('<a />').html('<em>' + text + '</em><i></i>'));
          span.addClass('hide');
      } else {
          list.append($('<li />').html(text));
      }
  });

  active.append($('<div />').addClass('arrow'));
  div.append(active).append(list);

  select.wrap(div);

  $(document).on('click', '.selectMultiple ul li', function(e) {
      var select = $(this).parent().parent();
      var li = $(this);
      if(!select.hasClass('clicked')) {
          select.addClass('clicked');
          li.prev().addClass('beforeRemove');
          li.next().addClass('afterRemove');
          li.addClass('remove');
          var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
          a.slideDown(400, function() {
              setTimeout(function() {
                  a.addClass('shown');
                  select.children('div').children('span').addClass('hide');
                  select.find('option:contains(' + li.text() + ')').prop('selected', true);
              }, 500);
          });
          setTimeout(function() {
              if(li.prev().is(':last-child')) {
                  li.prev().removeClass('beforeRemove');
              }
              if(li.next().is(':first-child')) {
                  li.next().removeClass('afterRemove');
              }
              setTimeout(function() {
                  li.prev().removeClass('beforeRemove');
                  li.next().removeClass('afterRemove');
              }, 200);

              li.slideUp(400, function() {
                  li.remove();
                  select.removeClass('clicked');
              });
          }, 600);
      }
  });

  $(document).on('click', '.selectMultiple > div a', function(e) {
      var select = $(this).parent().parent();
      var self = $(this);
      self.removeClass().addClass('remove');
      select.addClass('open');
      setTimeout(function() {
          self.addClass('disappear');
          setTimeout(function() {
              self.animate({
                  width: 0,
                  height: 0,
                  padding: 0,
                  margin: 0
              }, 300, function() {
                  var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                  li.slideDown(400, function() {
                      li.addClass('show');
                      setTimeout(function() {
                          select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                          if(!select.find('option:selected').length) {
                              select.children('div').children('span').removeClass('hide');
                          }
                          li.removeClass();
                      }, 400);
                  });
                  self.remove();
              })
          }, 300);
      }, 400);
  });

  $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function(e) {
      $(this).parent().parent().toggleClass('open');
  });

});
