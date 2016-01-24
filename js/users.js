Parse.initialize("Usv6ZpfyiyVzDK4KST9ED9SPg15PRCa9xUs30vFy", "S5pBnTZfk2G0W27hjcQXvnHJxZlVeVTXKoGvcvMl");

function createUser() {

var user = new Parse.User();

user.set("username", $("#username-input").val());
user.set("password", $("#password-input").val());
user.set("email", $("#email-input").val());

user.signUp(null, {
  success: function(user) {
    document.write("<a href='index.html'> Goto Home </a>")
    document.write("<br> <p>Account creation successfull! Please check your email.</p>")
  },
  error: function(user, error) {
    $("#confirmation").html("Account creation failed. Please try again.")
      alert("Error: " + error.code + " " + error.message);
  }
});

}