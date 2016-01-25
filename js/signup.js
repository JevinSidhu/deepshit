function createUser() {

var user = new Parse.User();
user.set("username", $("#username-input").val());
user.set("password", $("#password-input").val());
user.set("email", $("#email-input").val());

user.signUp(null, {
  success: function(user) {
    alert("Account creation successfull! Please check your email.");
  },
  error: function(user, error) {
    alert("Error: " + error.code + " " + error.message);
  }
});

}