Parse.initialize("Usv6ZpfyiyVzDK4KST9ED9SPg15PRCa9xUs30vFy", "S5pBnTZfk2G0W27hjcQXvnHJxZlVeVTXKoGvcvMl");

var Post = Parse.Object.extend("Post");
var Upvote = Parse.Object.extend("Upvote");

if (Parse.User.current()) {
  document.getElementById("logout").onclick = function() {
    $("#logout").show()
  }
}
function createPost() {
  
  if (Parse.User.current()) {
  
    var post = new Post();
  
      post.set("content", $("#content-input").val());
      post.set("votes", 0);
      post.set("author", Parse.User.current().get("username"));
  
      post.save(null, {
        success: function(post) {
        // in case shit fucks up
        },
        error: function(post, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
  } else {
    alert("You are not logged in!")
  }

} 


document.onload = sortQueryDisplay();

function sortQueryDisplay() {
  for(var i = 0; i < 10; i++) {
    $("#outer").remove();
  }
var query = new Parse.Query(Post);

var posts;

if($("#sort-vote").val() == "sortByVotes") { query.descending("votes")}
  else { query.descending("createdAt")};

query.find({
  success: function(results) {
  posts = results;

  for (var i = 0; i < results.length; i++) {
      var resultObj = results[i];
      var parseResults = JSON.parse(JSON.stringify(results[i]));
      
      query.equalTo("results", results);

      var outerDiv = document.createElement('div');
      outerDiv.id = "outer";
      document.getElementsByClassName('content-display')[0].appendChild(outerDiv);
        
      var createPost = document.createElement('h2');
      var createButton = document.createElement('button');
      
      createPost.id = "post";
      createButton.className = "votes";
      createButton.dataset.id = JSON.stringify(resultObj.id);
      createButton.textContent = "Upvote";
      
      // createPost.innerHTML = JSON.stringify(results.content);
      createPost.innerHTML = parseResults.author + " -- " + parseResults.content;
      console.log(JSON.stringify(results[i]));
      outerDiv.appendChild(createPost);
      outerDiv.appendChild(createButton);
  }  
 
 $('.votes').click(function(){
    var dataId = this.dataset.id;

    for (var post of posts) {
      if (JSON.stringify(post.id) == dataId) {

        if($.cookie(dataId) == "false" || $.cookie(dataId) == undefined) {
          $.cookie(dataId, "true");
          post.increment("votes");
          
        } else {
          $.cookie(dataId, "false");
          post.increment("votes", -1);
        }
    
        post.save();
        break;
    }
  }
});
      
},
  
  error: function(object, error) {
    alert("shit hit the fan and your mouth was wide-open.");
  }
}
);}


  // When user clicks button of the Post
  // Check cookie's value (true/false) for given post ID (key), 
  // If the value is false or is not defined
  //   Change the cookie's value to 'true' for the given post ID (key)
  //   Increment the post's number of votes by 1
  // Else
  //   change the cookie's value to 'false' for the given post ID (key)
  //   decrement the post's number of votes by 1
    