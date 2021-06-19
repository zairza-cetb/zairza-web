const userData = new FormData();
const skillsData = new FormData();

function enableNext() {
    $("#nextBtn").removeClass("cursor-not-allowed").removeAttr("disabled");
}
$("#profileImg").on("change", function() {
  const profileImg = document.getElementById("profileImg").files[0];
  if(profileImg != undefined){
    enableNext();
    userData.append("profileImage",profileImg);
  }
})

$("#phone").on("change", function(){
    if($(this).val() != ""){
        enableNext();
        userData.append("phoneNo",$(this).val());
    }
})