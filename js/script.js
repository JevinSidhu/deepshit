Parse.initialize("Usv6ZpfyiyVzDK4KST9ED9SPg15PRCa9xUs30vFy", "S5pBnTZfk2G0W27hjcQXvnHJxZlVeVTXKoGvcvMl");

var Post = Parse.Object.extend("Post");
var post = new Post();

function createPost() {

    post.set("content", $("#content-input").val());
    
    post.save(null, {
      success: function(post) {
      // in case shit fucks up
      },
      error: function(post, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });

}

var query = new Parse.Query(Post);

query.find({
  success: function(results) {
    
  for (var i = 0; i < results.length; i++) {
      
      var outerDiv = document.createElement('div');
      outerDiv.id = "outer";
      document.getElementsByClassName('content-display')[0].appendChild(outerDiv);
        
      var createPost = document.createElement('h2');
      var createButton = document.createElement('button');
      query.equalTo("results", results);
      createPost.id = "post";
      createPost.innerHTML = JSON.stringify(results.content);
      var parseResults = JSON.parse(JSON.stringify(results[i]))
      createPost.innerHTML = parseResults.content
      outerDiv.appendChild(createPost);
      outerDiv.appendChild(createButton);
      

      
      
  }  
  },
  
  error: function(object, error) {
    alert("shit hit the fan and your mouth was wide-open.");
  }
});