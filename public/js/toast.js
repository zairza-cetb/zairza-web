$(document).ready(function () {
  $(".toast__close").click(function (e) {
    e.preventDefault();
    var parent = $(this).parent(".toast");
    parent.fadeOut("slow", function () {
      $(this).toggleClass("hidden");
    });
  });
});

const errorCodes = {
  200: "OK — We’re cool.😎",
  201: "Created — I’ve created what you requested.👍",
  202: "Accepted — I acknowledged what you were saying.🤝",
  204: "No Content — 😞",
  301: "Moved Permanently — We moved! Please don’t visit here next time.🚫",
  302: "Found — We’re still here, but please follow the sign till we’re back➡️",
  304: "Not Modified — Please use cached data.😊",
  307: "Temporary Redirect 😞",
  308: "Permanent Redirect 😞",
  400: "Bad Request — I’m not sure what you meant.🥺",
  401: "Unauthorized — It failed to identify yourself.🚫",
  403: "Forbidden —You have no permission to do that.⛔",
  404: "Not Found — I can’t find what you’re looking for.🙅‍♂️",
  405: "Method Not Allowed—We don’t support your method.🙅‍♂️",
  429: "Too Many Request — Please slow down!✋",
  500: "Internal Server Error — There are something wrong with us.💔",
  503: "Service Unavailable — We are currently busy, can you try again sometime later?🔐",
};

// Show toast based on response message

function showToast(status_code, message) {
  // $(".toast__type").text(status_code);
  if (message) {
    $(".toast__message").text(message);
  } else {
    $(".toast__message").text(errorCodes[status_code]);
  }
  if (status_code >= 200 && status_code < 300) {
    $(".toast__icon").empty().html(`<svg
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
    $("#toast")
      .addClass("toast--green")
      .removeClass("toast--red")
      .removeClass("toast--blue")
      .removeClass("toast--violet");
  } else if (status_code >= 300 && status_code < 400) {
    $(".toast__icon").empty().html(
      `<img src="https://img.icons8.com/metro/52/ffffff/cancel.png"/>`
    );
    $("#toast")
      .removeClass("toast--green")
      .removeClass("toast--red")
      .removeClass("toast--violet")
      .addClass("toast--blue");
  } else if (status_code >= 400 && status_code < 500) {
    $(".toast__icon").empty().html(
      `<img src="/images/auth/cancel.png"/>`
    );
    $("#toast")
      .removeClass("toast--green")
      .removeClass("toast--blue")
      .removeClass("toast--violet")
      .addClass("toast--red");
  } else {
    $(".toast__icon").empty().html(
      `<img src="https://img.icons8.com/windows/32/ffffff/amazon-web-services.png"/>`
    );
    $("#toast")
      .removeClass("toast--green")
      .removeClass("toast--blue")
      .removeClass("toast--red")
      .addClass("toast--violet");
  }
  $("#toast").fadeIn("slow", () => {
    $(this).toggleClass("hidden");
  });
  setTimeout(() => {
    $("#toast").fadeOut("slow", function () {
      $(this).toggleClass("hidden");
    });
  }, 5000);
}

// showToast(400, 'lorem10asudhfuiewhfiuahdflaius')
