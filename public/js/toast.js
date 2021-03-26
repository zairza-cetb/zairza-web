$(document).ready(function () {
  $(".toast__close").click(function (e) {
    e.preventDefault();
    var parent = $(this).parent(".toast");
    parent.fadeOut("slow", function () {
      $(this).toggleClass("hidden");
    });
  });
});

// Show toast based on response message

function showToast(status_code, message) {
  if (status_code === 200) {
    $(".toast__icon").html(`<svg
    version="1.1"
    class="toast__svg"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
  >
    <g>
      <g>
        <path
          d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z"
        ></path>
      </g>
    </g>
  </svg>`);
    $(".toast__type").text(status_code);
    $(".toast__message").text(message);
    $("#toast").addClass("toast--green").removeClass("toast--yellow");
  } else {
    $(".toast__icon").html(
      `<img src="/images/auth/cancel.png"/>`
    );
    $(".toast__type").text(status_code);
    $(".toast__message").text(message);
    $("#toast").removeClass("toast--green").addClass("toast--yellow");
  }
  $("#toast").fadeIn("slow", () => {
    $(this).toggleClass("hidden");
  });
  setTimeout(() => {
    $("#toast").fadeOut("slow", function () {
      $(this).toggleClass("hidden");
    });
  }, 2000);
}

// showToast(400, 'lorem10asudhfuiewhfiuahdflaius')
