$(".taskSubmissionBtn").on("click", function (e) {
  $this = $(this)
  $submission = $this.siblings('input').val();
  $weekNo = $this.attr("data-weekNo");
  console.log($weekNo);
  if ($submission.length == 0) {
    showToast(401, "Please submit your task!");
    return;
  }
  $this.find('svg').toggleClass("hidden");
  $this.find('span').text("Processing");
  $this.addClass("cursor-not-allowed");
  const data = {
    weekNo: $weekNo,
    submissionLink: $submission,
  };
  console.log(data);
  $.ajax({
    method: "POST",
    url: "/skills/api/user-submit",
    data: data,
  })
    .done(function (data) {
      $this.find('svg').toggleClass("hidden");
      $this.find('span').text("Submitted");
      $this.removeClass("cursor-not-allowed");
      showToast(200, "Submitted successfully!");
      self.location.reload();
    })
    .fail(function (err) {
      $this.find('svg').toggleClass("hidden");
      $this.find('span').text("Submit");
      $this.removeClass("cursor-not-allowed");
      showToast(400, err.responseJSON.message);
    });
});
