Parse.initialize("Usv6ZpfyiyVzDK4KST9ED9SPg15PRCa9xUs30vFy", "S5pBnTZfk2G0W27hjcQXvnHJxZlVeVTXKoGvcvMl");

var currentUser = Parse.User.current();
var User = Parse.Object.extend("User");
var userN = new User();

if (currentUser) {
    //go to site
} 

function signInUser() {
    
    Parse.User.logIn($("#username-input").val(), $("#password-input").val(), {
      success: function(user) {
          var stringData = JSON.stringify(currentUser)
          var parseData = JSON.parse(stringData)
        if (parseData.emailVerified == true) {
            document.write("Login successfull")
            document.write("<br> <a href='index.html'>Return to home</a>")
        } else {
            document.write("Login failed.")
            document.write("<br> <a href='login.html'>try again</a>")
        }
      },
      error: function(user, error) {
                    document.write("invalid")

      }
      
});

}

function gotoSignup() {
    window.location.href = "signup.html"
}

// function facebookSignin() {
//     Parse.FacebookUtils.logIn(null, {
//   success: function(user) {
//      alert("My name is " + Parse.User.current().save({name: user.name}))
//   },
//   error: function(user, error) {
//     alert("User cancelled the Facebook login or did not fully authorize.");
//   }
// })}; 
// 10/10 best code best code -gamspot