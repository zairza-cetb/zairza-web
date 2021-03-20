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
// Auth loader 
// $(document).ajaxStart(function() {
//   $(".container").addClass("animate-pulse");
// });

// $(document).ajaxStop(function() {
//   setTimeout(function() {
//     $(".container").removeClass("animate-pulse");
//   },3000)
// });
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
$('#signin_google, #signup_google').on('click', function(e) {
  e.preventDefault();
  window.location.href='/auth/google';
})

$('#signin_github, #signup_github').on('click', function(e) {
  e.preventDefault();
  window.location.href='/auth/github';
})