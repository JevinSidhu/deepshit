Parse.initialize("Usv6ZpfyiyVzDK4KST9ED9SPg15PRCa9xUs30vFy", "S5pBnTZfk2G0W27hjcQXvnHJxZlVeVTXKoGvcvMl");

var Post = Parse.Object.extend("Post");

if (Parse.User.current()) {
   $("#logout").show();
} else {
   $("#login").show();
}

document.getElementById("logout").onclick = function() {
  Parse.User.logOut();
  window.location.href="index.html"
};

document.getElementById("login").onclick = function() {
  window.location.href = "login.html";
};;

$("")
function createPost() {
  
  if (Parse.User.current()) {
  
    var post = new Post();
  
      post.set("content", $("#content-input").val());
      post.set("votes", 0);
      post.set("author", Parse.User.current().get("username"));
  
      post.save(null, {
        success: function(post) {
          sortQueryDisplay();
          $.smoothScroll({
      scrollElement: $('document.body'),
      scrollTarget: $('#scrollTo')
    });;
        },
        error: function(post, error) {
          // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
        }
      });
  } else {
    alert("You are not logged in!")
  }
    document.getElementById("content-input").value = "";

  
} 

document.onload = sortQueryDisplay();

function sortQueryDisplay() {
  // This post may be jacky as fuck
  var post = new Post;
  var loopCount = post._objCount + 1;
  for(var i = 0; i < loopCount; i++) {
    $("#outer").remove();
  }
  var query = new Parse.Query(Post);

  var posts;

  if ($("#sort-vote").val() == "sortByVotes") { 
    query.descending("votes");
  } else { 
    query.descending("createdAt");
  }

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
      var createAuthor = document.createElement('p');
      var createImg = document.createElement('img');
      
      createPost.id = "post";
      createImg.id = "upvoteicon"
      createImg.src = "img/toiletpaper.svg"
      createButton.className = "votes";
      createButton.dataset.id = JSON.stringify(resultObj.id);
      createButton.textContent = "Paper";
      createAuthor.className = "detail-author"
      
      // createPost.innerHTML = JSON.stringify(results.content);
      createPost.innerHTML = parseResults.content;
      createAuthor.innerHTML = parseResults.author;
      console.log(JSON.stringify(results[i]));
      outerDiv.appendChild(createAuthor);
      outerDiv.appendChild(createPost);
      outerDiv.appendChild(createButton);
      outerDiv.appendChild(createImg);
  }  
 
 $('.votes').click(function(){
    var dataId = this.dataset.id;
    
    for (var post of posts) {
      if (JSON.stringify(post.id) == dataId) {

        if($.cookie(dataId) == "false" || $.cookie(dataId) == undefined) {
          $.cookie(dataId, "true");
          post.increment("votes");
          createButton.textContent = "Downvote";
          
        } else {
          $.cookie(dataId, "false");
          post.increment("votes", -1);
          createButton.textContent = "Upvote";
        }
        
        post.save();
        sortQueryDisplay();
        
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