// Edit User Profile
$("#fakeNextBtn").on("click", function () {
  const data = new FormData();
  const profileImg = document.getElementById("fileInput").files[0];
  $phoneNo = $("#phone").val();
  $regNo = $("#regNo").val();
  let skills = [];
  $(".tag-container .tag span").each(function (index, element) {
    skills.push(element.innerHTML);
  });
  // console.log(profileImg);
  if (profileImg == undefined || $phoneNo == "" || skills.length == 0 || $regNo == "" ) {
    showToast(400, "Please add your details!");
    return;
  }
  $("#fakeNextBtn svg").toggleClass("hidden");
  $("#fakeNextBtn span").text("Processing");
  $("#fakeNextBtn").addClass("cursor-not-allowed");
  data.append("profileImage", profileImg);
  skills.forEach((skill)=>{data.append("skills[]",skill)});
  data.append("phoneNo", $phoneNo);
  data.append("registrationNo", $regNo);
  $.ajax({
    type: "PUT",
    url: "/api/user/edit",
    data: data,
    processData: false,
    contentType: false,
  })
    .done(function (data) {
      $("#fakeNextBtn").addClass("hidden");
      $("#realNextBtn").removeClass("hidden");
    })
    .fail(function (err) {
      $("#fakeNextBtn svg").toggleClass("hidden");
      $("#fakeNextBtn span").text("Submit");
      $("#fakeNextBtn").removeClass("cursor-not-allowed");
      showToast(err.responseJSON.statusCode, err.responseJSON.message);
    });
});


// Domain Registration
$("#fakeCompleteBtn").on("click", function () {
  $domain = $("input[type='radio']:checked").val();
  if($domain.length == 0){
    showToast(400, "PLease choose a domain");
    return;
  }
  $("#fakeCompleteBtn svg").toggleClass("hidden");
  $("#fakeCompleteBtn span").text("Processing");
  $("#fakeCompleteBtn").addClass("cursor-not-allowed");
  const data = {
    domainId: $domain,
  }
  $.ajax({
    type: "POST",
    url: "/skills/api/register",
    data: data,
  })
    .done(function (data) {
      $("#fakeCompleteBtn").addClass("hidden");
      $("#realCompleteBtn").removeClass("hidden");
      $("#realCompleteBtn").click();
    })
    .fail(function (err) {
      console.log(err);
      $("#fakeCompleteBtn svg").toggleClass("hidden");
      $("#fakeCompleteBtn span").text("Complete");
      $("#fakeCompleteBtn").removeClass("cursor-not-allowed");
      showToast(err.status, err.responseJSON.message);
    });
});

// Event handler for previous button
$("#prevBtn").on("click", function (){
  self.location.reload();
})