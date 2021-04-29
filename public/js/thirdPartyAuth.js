// Auth popup
const request = window.location.href.split("#")[1];

if (request === "signup") {
  request_message = "signed up";
} else {
  request_message = "signed in";
}
// let authWindow;

// window.addEventListener("message", function (e) {

//   let redirect_url = JSON.parse(e.data).redirect_from;
//   let url = new URL(redirect_url);
//   let provider = url.searchParams.get("provider");
//   if (url.pathname === "/success_popup") {
//     showToast(200, `Successfully ${request_message} via ${provider} 🙌`);
//     setTimeout(function () {
//       window.location.replace("/me");
//     }, 2000);
//   } else if (url.pathname === "/failed_popup") {
//     showToast(409, "User with this email id already exists ⛔");
//     setTimeout(function () {
//       window.location.replace("/auth");
//     }, 2000);
//   }
// });

// ThirdParty Signin
function ThirdPartyAuthenticate(provider_name) {
  // var width = 1366,
  //   height = 768;
  let provider;
  if (provider_name === "Github") {
    provider = new firebase.auth.GithubAuthProvider();
  } else {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  // var w = window.outerWidth - width,
  //   h = window.outerHeight - height;
  // var left = Math.round(window.screenX + w / 2);
  // var top = Math.round(window.screenY + h / 2.5);

  // authWindow = window.open(
  //   link,
  //   "Authenticate",
  //   "width=" +
  //     width +
  //     ",height=" +
  //     height +
  //     ",left=" +
  //     left +
  //     ",top=" +
  //     top +
  //     ",toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0"
  // );

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      // var credential = result.credential;
      // console.log(credential);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = credential.accessToken;

      // The signed-in user info.
      var user = result.user;
      // console.log(user)
      showToast(200, `Successfully ${request_message} via ${provider_name} 🙌`);
      setTimeout(function () {
        if (nextPage) {
          window.location.replace(nextPage);
        } else {
          window.location.replace("/me");
        }
      }, 2000);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // console.log(email)
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // console.log(credential)
      // ...
      showToast(409, error.message);
      setTimeout(function () {
        window.location.replace("/auth");
      }, 2000);
    });
}
