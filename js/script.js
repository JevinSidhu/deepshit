var ref = new Firebase("https://deepshit.firebaseio.com/");

var accessAuthData;

var olderPost;

window.onload = function() {
  
      ref.once("value", function(snapshot) {
      olderPost = snapshot.val();
    
      for(var key in olderPost){
        
        console.log(key);
          
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
        
        createPost.innerHTML = olderPost[key].content;
        createAuthor.innerHTML = olderPost[key].author;
        
        outerDiv.appendChild(createAuthor);
        outerDiv.appendChild(createPost);
        outerDiv.appendChild(createButton);
  
  }
        
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
        
}


$("#login").click(function(){
  ref.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log(authData.twitter.displayName);
      accessAuthData = authData;
      $("#name").html("Welcome, " + authData.twitter.displayName);
    } }, {
      remember: "default"
  });

});

$("#poster").click(function(){
  
  var newPostRef = ref.push({
      author: accessAuthData.twitter.displayName,
      content: $("#content-input").val()
  });
  
    ref.once("child_added", function(snapshot) {
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
