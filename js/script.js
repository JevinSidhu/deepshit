var ref = new Firebase("https://deepshit.firebaseio.com/");

var accessAuthData;

$("#login").click(function(){
  ref.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log(authData.twitter.displayName);
      accessAuthData = authData;
    }
  });
});


$("#poster").click(function(){
  
  var usersRef = ref.child("users");
  usersRef.set({
    post: {
      author: accessAuthData.twitter.displayName,
      content: $("#content-input").val()
    }

  });

});




// document.getElementById("content-input").value = "";
