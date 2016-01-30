var ref = new Firebase("https://deepshit.firebaseio.com/");

var accessAuthData;

$("#login").click(function(){
  ref.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log(authData.twitter.displayName);
      accessAuthData = authData;
    } }, {
      remember: "default"
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
  
  usersRef.child("post").on("value", function(snapshot) {
    
    var newPost = snapshot.val();
    
    var outerDiv = document.createElement('div');
    outerDiv.id = "outer";
    document.getElementsByClassName('content-display')[0].appendChild(outerDiv);
      
    var createPost = document.createElement('h2');
    var createButton = document.createElement('button');
    var createAuthor = document.createElement('p');

    createPost.id = "post";
    createButton.className = "votes";
    createButton.textContent = "Love";
    createAuthor.className = "detail-author";
    
    createPost.innerHTML = newPost.content;
    createAuthor.innerHTML = newPost.author;
    outerDiv.appendChild(createAuthor);
    outerDiv.appendChild(createPost);
    outerDiv.appendChild(createButton);
  
});
  
});






// document.getElementById("content-input").value = "";
