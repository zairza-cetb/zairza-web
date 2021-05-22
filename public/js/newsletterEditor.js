function app() {
  return {
    wysiwyg: null,
    init: function (el) {
      // Get el
      this.wysiwyg = el;
      // Add CSS
      // this.wysiwyg.contentDocument.querySelector('head').innerHTML += `<style>
      // *, ::after, ::before {box-sizing: border-box;}
      // :root {tab-size: 4;}
      // html {line-height: 1.15;text-size-adjust: 100%;}
      // body {margin: 0px; padding: 1rem 0.5rem;}
      // body {font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";}
      // </style>`;
      // this.wysiwyg.contentDocument.body.innerHTML += `
      // <h1>Hello World!</h1>
      // <p>Welcome to the pure AlpineJS and Tailwind WYSIWYG.</p>
      // `;
      // Make editable
      this.wysiwyg.contentDocument.designMode = "on";
    },
    format: function (cmd, param) {
      this.wysiwyg.contentDocument.execCommand(cmd, !1, param || null);
    },
  };
}

// Send Newsletter

function sendNewsletter() {
  $("#sendNewsletterBtn svg").toggleClass("hidden");
  $("#sendNewsletterBtn span").text("Sending");
  $("#sendNewsletterBtn")
    .addClass("disabled:opacity-50")
    .prop("disabled", true);
    let token = $.cookie("zToken");
    console.log(token);
  let data = {
    subject: "Test",
    templateId: "d-3d6e6167434a4b33b19119db21a6eb85"
  };
  $.ajax({
    type: "POST",
    url: "/protected/send-newsletter/",
    dataType: "json",
    data: data,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
  })
    .done(function (data) {
      showToast(200, "All newsletters sent successfully");
      $("#sendNewsletterBtn svg").toggleClass("hidden");
      $("#sendNewsletterBtn span").text("Newsletters sent");
    })
    .fail(function (err) {
      showToast(400, err.message);
      $("#sendNewsletterBtn svg").toggleClass("hidden");
      $("#sendNewsletterBtn span").text("Could not send");
    });
}
