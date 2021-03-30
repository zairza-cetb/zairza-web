// Read/Write Profile Field
function toggleFieldVisibility(ele) {
  $field = ele.parent().siblings();
  if ($field.is("[readonly]")) {
    // console.log('password')
    $field.attr("readonly", false);
    ele.children().removeClass("bxs-lock").addClass("bxs-lock-open");
  } else {
    // console.log('text')
    $field.attr("readonly", true);
    ele.children().removeClass("bxs-lock-open").addClass("bxs-lock");
  }
}

// Iterate over checkbox fields to connect/disconnect third_party_auth
let loginWindow;

window.addEventListener("message", function (e) {
  if (e.data !== "popup-done") {
    return;
  }
  window.location.replace("/profile");
});
function connect(ele) {
  $provider_name = ele
    .siblings(".label")
    .text()
    .toLowerCase();
  var width = 1366,
    height = 768;
  let link;
  console.log($provider_name)
  if ($provider_name.indexOf("google") != -1) {
    link = "/auth/google";
    console.log("google");
  } else if ($provider_name.indexOf("github") != -1) {
    link = "/auth/github";
    console.log("github");
  } else {
    console.log("newletter");
  }
  var w = window.outerWidth - width,
    h = window.outerHeight - height;
  var left = Math.round(window.screenX + w / 2);
  var top = Math.round(window.screenY + h / 2.5);

  loginWindow = window.open(
    link,
    "LogIn",
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

const d = 40;

document.querySelectorAll(".rocket-button").forEach((elem) => {
  elem.querySelectorAll(".default, .success > div").forEach((text) => {
    charming(text);
    text.querySelectorAll("span").forEach((span, i) => {
      span.innerHTML = span.textContent == " " ? "&nbsp;" : span.textContent;
      span.style.setProperty("--d", i * d + "ms");
      span.style.setProperty(
        "--ds",
        text.querySelectorAll("span").length * d - d - i * d + "ms"
      );
    });
  });

  elem.addEventListener("click", (e) => {
    e.preventDefault();
    if (elem.classList.contains("animated")) {
      return;
    }
    elem.classList.add("animated");
    elem.classList.toggle("live");
    setTimeout(() => {
      elem.classList.remove("animated");
    }, 2400);
  });
});

// Update profile ajax request
function updateProfile() {
  $email = $("#profile_form input[type='email']").val();
  $registration_no = $("#profile_form #regno").val();
  $branch = $("#profile_form #branch").val();
  $wing = $("#profile_form #wing").val();

  let data = {
    email: $email,
    registration_no: $registration_no,
    branch: $branch,
    wing: $wing
  }
  $.ajax({
    type: "PUT",
    url: "/edit",
    data: data,
    dataType: "json",
  })
    .done(function (data) {
      console.log("success");
      // validate(req, "success");
    })
    .fail(function (err) {
      console.log("error");
      // validate(req, err);
    });
}
