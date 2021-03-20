// Read/Write Profile Field
function toggleFieldVisibility(ele){
    $field = ele.parent().siblings()
    if($field.is('[readonly]')){
      // console.log('password')
        $field.attr('readonly', false);
        ele.children().removeClass('bxs-lock').addClass('bxs-lock-open');
    }else{
      // console.log('text')
      $field.attr('readonly', true);
      ele.children().removeClass('bxs-lock-open').addClass('bxs-lock');
    }
}
  

// Iterate over checkbox fields to connect/disconnect third_party_auth
function checkboxToggled(ele) {
    if (ele.prop('checked') == true) {
      $provider_name = ele.parent().siblings(".label").text().toLowerCase().split(" ")[2];
      if ($provider_name == "google") {
        window.location.href = '/auth/google'
      } else if ($provider_name == "github") {
        window.location.href = '/auth/github'
      } else {
        // console.log("newletter")
      }
    }
}
