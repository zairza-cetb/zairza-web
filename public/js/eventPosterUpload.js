$(function () {
  $("#aks-file-upload").aksFileUpload({
    fileUpload: "#uploadfile",
    // File Format
    fileType: ["jpg", "jpeg", "png"],
    // File Format
    /* (default) - [ "pdf", "docx", "rtf", "jpg", "jpeg", "png", "txt", "mpa", "ogg", "aif", "cda", "mid", "midi", "mp3", "wav", "wma", "wpl", "7z", "arj", "deb", "pkg", "rar", "rpm", "tar.gz", "z", "zip", "csv", "dat", "db", "dbf", "log", "mdb", "sav", "sql", "tar", "xml", "apk", "exe", "jar", "py", "fnt", "fon", "otf", "ttf", "ai", "bmp", "gif", "ico", "jpeg", "jpg", "png", "ps", "psd", "svg", "tif", "tiff", "asp", "aspx", "css", "htm", "html", "js", "jsp", "php", "rss", "pps", "ppt", "pptx", "avi", "flv", "mov", "mp4", "mpg", "mpeg", "vob", "wmv", "doc", "rtf", "eps", "opus", "aep", "fig", "sketch" ] */
    multiple: false,
    maxSize: "100 KB",
  });
});

// API call to upload event poster
$("#aks-file-upload").on("change", function() {
  const poster = document.getElementById("aksfileupload").files[0];
  if(poster.size>110000){
    showToast(400, "File size limit is 100KB 😑");
  }
  $(".aks-file-upload-error").css("display","none");
})
function uploadPoster(){
  const poster = document.getElementById("aksfileupload").files[0];
  if(poster.size<11000){
    $("#uploadBtn svg").toggleClass("hidden");
    $("#uploadBtn span").text("Processing");
    $("#uploadBtn").addClass("disabled");
  }
  $eventName = $("#eventName").val();
  $eventStart = $("#eventStart").val();
  $eventEnd = $("#eventEnd").val();
  if(poster == undefined || $eventName == '' || $eventStart == '' || $eventEnd == ''){
    showToast(401, "Please provide all neccessary details!");
    return;
  }
  if(poster.size>110000){
    showToast(400, "File size limit is 100KB 😑");
    return;
  }
  const data = new FormData();
  data.append('name', $eventName);
  data.append('image',poster);
  data.append('startTime', $eventStart);
  data.append('endTime', $eventEnd);
  $.ajax({
    type: "POST",
    url: "/protected/api/create-event",
    data: data,
    processData: false, 
    contentType: false, 
  })
  .done(function (data) {
    $("#uploadBtn svg").toggleClass("hidden");
    $("#uploadBtn span").text("Uploaded");
    $("#uploadBtn").removeClass("disabled");
      showToast(200, `${data.event.name} event created successfully 🤗`)
  })
  .fail(function (err) {
    showToast(500, err.message)
  });
}