$(".submit-btn").on("click", function () {
  $review = $("#text-area").val();
  $approved = $(this).attr("approved");
  $weekNo = $(this).attr("weekNo");
  $regdId = $(this).attr("regdId");
  $presentDomain = $(this).attr("presentDomain");
  console.log($review);
  console.log($approved);
  console.log($weekNo);
  console.log($regdId);
  if ($review.length == 0) {
    showToast(401, "Please give some review!");
    return;
  }
  const data = {
    weekNo: $weekNo,
    registrationId: $regdId,
    approved: $approved,
    comment: $review,
    domainId: $presentDomain,
  };
  $.ajax({
    method: "POST",
    url: "/skills/api/mentor-submit",
    data: data,
  })
    .done(function (data) {
      showToast(200, "submitted successfully!");
      self.location.reload();
    })
    .fail(function (err) {
      showToast(400, err.responseJSON.message);
    });
});
$(".reject-btn").on("click", function () {
  $review = $("#text-space").val();
  $approved = $(this).attr("approved");
  $weekNo = $(this).attr("weekNo");
  $regdId = $(this).attr("regdId");
  $presentDomain = $(this).attr("presentDomain");
  console.log($review);
  console.log($approved);
  console.log($weekNo);
  console.log($regdId);
  if ($review.length == 0) {
    showToast(401, "Please give some review!");
    return;
  }
  const data = {
    weekNo: $weekNo,
    registrationId: $regdId,
    approved: $approved,
    comment: $review,
    domainId: $presentDomain,
  };
  $.ajax({
    method: "POST",
    url: "/skills/api/mentor-submit",
    data: data,
  })
    .done(function (data) {
      showToast(200, "submitted successfully!");
      self.location.reload();
    })
    .fail(function (err) {
      showToast(400, err.responseJSON.message);
    });
});
