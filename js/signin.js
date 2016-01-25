var currentUser = Parse.User.current();

$("#login-submit").click(function() {
    if (currentUser.emailVerified == "true") {
        window.location.href = "index.html";
    } else {
        alert("You must verify your account!");
    }
});

$("#login-register").click(function() {
  window.location.href = "signup.html";
});
