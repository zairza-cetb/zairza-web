$("#taskSubmissionBtn").on("click", function () {
  $submission = $("#taskSubmission").val();
  $weekNo = $("#taskSubmissionBtn").attr("data-weekNo");
  console.log($weekNo);
  if ($submission.length == 0) {
    showToast(401, "Please submit your task!");
    return;
  }
  $("#taskSubmissionBtn svg").toggleClass("hidden");
  $("#taskSubmissionBtn span").text("Processing");
  $("#taskSubmissionBtn").addClass("cursor-not-allowed");
  const data = {
    weekNo: $weekNo,
    submissionLink: $submission,
  };
  $.ajax({
    method: "POST",
    url: "/skills/api/user-submit",
    data: data,
  })
    .done(function (data) {
      $("#taskSubmissionBtn svg").toggleClass("hidden");
      $("#taskSubmissionBtn span").text("Submitted");
      $("#taskSubmissionBtn").removeClass("cursor-not-allowed");
      showToast(200, "Submitted successfully!");
      self.location.reload();
    })
    .fail(function (err) {
      $("#taskSubmissionBtn svg").toggleClass("hidden");
      $("#taskSubmissionBtn span").text("Submit");
      $("#taskSubmissionBtn").removeClass("cursor-not-allowed");
      showToast(400, err.responseJSON.message);
    });
});
