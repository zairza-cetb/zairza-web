const toggleForm = () => {
  $container = $(".container");
  $container.toggleClass("active");
};

$(document).ready(()=>{
  const formType = window.location.href.split("#")[1];
  if (formType === "signup") {
    if (!$('.container').hasClass('active')) {
      $('.container').addClass('active');
    } else {
      $('.container').removeClass('active');
    }
  } else {
    $('.container').removeClass('active');
  }
})

// Email validate through regex
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

$("input[type='email']").on("change", function(){
  $response = validateEmail($(this).val());
  if(!$response){
    $(this).addClass("border-2 border-red-500");
    $(this).siblings("small.invalid_email").removeClass("hidden");
  }else{
    $(this).removeClass("border-2 border-red-500");
    $(this).siblings("small.invalid_email").addClass("hidden");
  }
})
// Confirm Password Validation
$("#confirm_password").on("change", function(){
  $password = $("#signup-password").val();
  $confirm_password = $(this).val();
  if($password != $confirm_password){
    $(this).addClass("border-2 border-red-500");
    $(this).parent().siblings("small.no_match").removeClass("hidden");
  }
  else{
    $(this).removeClass("border-2 border-red-500");
    $(this).parent().siblings("small.no_match").addClass("hidden");
  }
})

// Signup form submit
$("#signup-btn").on("click", function(){
  $email = $("#signup_form input[type='email']").val();
  $password = $("#signup_form input[type='password']").val();
  // console.log($email)
  let signupData = {
    email: $email,
    password: $password
  }
  $.ajax({
    type: "POST",
    url:"/signup",
    data:signupData,
    dataType: "json",

  })
  .done(function(data){
    // console.log(data)
    window.location.href='/me'
  })
  .fail(function(err){
    console.log(err.responseJSON.message)
  })
})
// Signin form submit
$("#signin-btn").on("click", function(){
  $email = $("#signin_form input[type='email']").val();
  $password = $("#signin_form input[type='password']").val();
  // console.log($email)
  let signinData = {
    email: $email,
    password: $password
  }
  $.ajax({
    type: "POST",
    url:"/login",
    data:signinData,
    dataType: "json",
  })
  .done(function(data){
    // console.log(data)
    window.location.href='/me'
  })
  .fail(function(err){
    console.log(err)
  })
})

// Show/Hide password
  function togglePasswordVisibility(ele){
    $password = ele.parent().siblings()
    if($password.attr('type') === 'password'){
      // console.log('password')
      $password.attr('type','text');
      ele.children().removeClass('bx-hide').addClass('bx-show');
    }else{
      // console.log('text')
      $password.attr('type','password');
      ele.children().removeClass('bx-show').addClass('bx-hide');
    }
  }

// ThirdParty Signin
// $('#signin_google, #signup_google').on('click', function(e) {
//   e.preventDefault();
//   window.location.href='/auth/google';
// })

// $('#signin_github, #signup_github').on('click', function(e) {
//   e.preventDefault();
//   window.location.href='/auth/github';
// })

// Auth popup
let loginWindow;

	window.addEventListener('message', function(e) {
		if (e.data !== 'popup-done') { return; }
		window.location.replace('/me');
	});


	$('.loginLink').each(function() {
		$(this).on('click', function(e) {
			e.preventDefault();
      // var url = link.getAttribute('href');
      let url = $(this).children('span').text().split(' ')[4]
      var width = 1366, height = 768;
      let link;
      console.log($(this).children('span').text().split(' ')[4])
			if (url === 'Github') {
				 link = '/auth/github'
      } else {
          link = '/auth/google'
      }
			var w = window.outerWidth - width, h = window.outerHeight - height;
			var left = Math.round(window.screenX + (w / 2));
			var top = Math.round(window.screenY + (h / 2.5));

			loginWindow = window.open(link, 'LogIn', 
				'width='+width+',height='+height+',left='+left+',top='+top+
				',toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0');
		});
	});