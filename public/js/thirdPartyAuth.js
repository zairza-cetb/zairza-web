// Auth popup
const request = window.location.href.split('#')[1]
// console.log(request)
if (request === "signin") {
  request_message = "signed in"
} else {
  request_message = "signed up"
}
let authWindow;

window.addEventListener("message", function (e) {

  let redirect_url = JSON.parse(e.data).redirect_from;
  let url = new URL(redirect_url);
  let provider = url.searchParams.get("provider");
  if (url.pathname === "/success_popup") {
    showToast(200, `Successfully ${request_message} via ${provider} 🙌`);
    setTimeout(function () {
      window.location.replace("/me");
    }, 2000);
  } else if (url.pathname === "/failed_popup") {
    showToast(409, "User with this email id already exists ⛔");
    setTimeout(function () {
      window.location.replace("/auth");
    }, 2000);
  }
});

// ThirdParty Signin
function ThirdPartyAuthenticate(provider_name) {
  var width = 1366,
    height = 768;
  let link;
  if (provider_name === "github") {
    link = "/auth/github";
  } else {
    link = "/auth/google";
  }
  var w = window.outerWidth - width,
    h = window.outerHeight - height;
  var left = Math.round(window.screenX + w / 2);
  var top = Math.round(window.screenY + h / 2.5);

  authWindow = window.open(
    link,
    "Authenticate",
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
