var ref = new Firebase("https://deepshit.firebaseio.com/");

$("#login").click(function(){
  ref.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      console.log(authData.twitter.displayName);
    }
  });
});



// document.getElementById("content-input").value = "";
