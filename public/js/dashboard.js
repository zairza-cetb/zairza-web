// Toggle delete modal
function deleteModal() {
  $("#deleteModal").toggleClass("hidden");
}

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

// Delete user
function deleteAccount() {
  $("#accountDeleteButton svg").toggleClass("hidden");
  $("#accountDeleteButton span").text("Processing");
  $("#accountDeleteButton").addClass("disabled");
  let token = $.cookie("zToken");
  $.ajax({
    type: "DELETE",
    url: "/api/user",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    },
  })
    .done(function (data) {
      deleteModal();
      showToast(200, "Your account has been deleted!");
      $.removeCookie("zToken", { path: "/" });
      setTimeout(function () {
        window.location.replace("/");
      }, 1000);
    })
    .fail(function (err) {
      $("#accountDeleteModal").toggleClass("hidden");
      showToast(400, err.message);
    });
}

// Add active to required nav link
link = window.location.pathname;
$(".nav-item").each(function () {
  if ($(this).attr("href").indexOf(link) !== -1) {
    $(this).addClass("active-nav-link");
  }
});

// Fancy Box init
$(document).ready(function () {
  $("[data-fancybox='images']").fancybox({
    arrows: false,
    infobar: false,
    toolbar: false,
    clickContent: false,
  });
});

//skill++
const tagContainer = document.querySelector('.tag-container');
const input = document.querySelector('.tag-container input');

let tags = [];

function createTag(label) {
  const div = document.createElement('div');
  div.setAttribute('class', 'tag');
  const span = document.createElement('span');
  span.innerHTML = label;
  const closeIcon = document.createElement('i');
  closeIcon.innerHTML = 'close';
  closeIcon.setAttribute('class', 'material-icons');
  closeIcon.setAttribute('data-item', label);
  div.appendChild(span);
  div.appendChild(closeIcon);
  return div;
}

function clearTags() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.parentElement.removeChild(tag);
  });
}

function addTags() {
  clearTags();
  tags.slice().reverse().forEach(tag => {
    tagContainer.prepend(createTag(tag));
  });
}

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.target.value.split(',').forEach(tag => {
        tags.push(tag);  
      });
      
      addTags();
      input.value = '';
    }
});
document.addEventListener('click', (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === 'I') {
    const tagLabel = e.target.getAttribute('data-item');
    const index = tags.indexOf(tagLabel);
    tags = [...tags.slice(0, index), ...tags.slice(index+1)];
    addTags();    
  }
})

input.focus();

