Parse.initialize("Usv6ZpfyiyVzDK4KST9ED9SPg15PRCa9xUs30vFy", "S5pBnTZfk2G0W27hjcQXvnHJxZlVeVTXKoGvcvMl");

var Post = Parse.Object.extend("Post");
var Upvote = Parse.Object.extend("Upvote");

function createPost() {
  
  var post = new Post();

    post.set("content", $("#content-input").val());
    post.set("votes", 0);
    
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

var posts;

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
      createButton.id = "votes";
      createButton.className = JSON.stringify(resultObj.id);
      
      createPost.innerHTML = JSON.stringify(results.content);
      createPost.innerHTML = parseResults.content;
      console.log(JSON.stringify(results[i]));
      outerDiv.appendChild(createPost);
      outerDiv.appendChild(createButton);
  }  
  
  // var upvote = new Upvote();
  
 $('#votes').click(function(){
    var className = this.className;
    console.log(posts);
    for (var post of posts) {
      console.log(post.id)
      if (JSON.stringify(post.id) == className) {
        console.log("here");
        post.increment("votes");
        post.save();
        break;
      }
    }
    // upvote.increment("votes");
    // upvote.set("parent", post);
    // upvote.save();
  });
      
  },

  error: function(object, error) {
    alert("shit hit the fan and your mouth was wide-open.");
  }
  
}

);


