
// Signout
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