/* global Firebase*/
var ref = new Firebase("https://deepshit.firebaseio.com/");

var accessAuthData;
var olderPost;
var newPost;
var newItems = false;

window.onload = function() {
  
  if (localStorage.authDataName == undefined) {
    $("#name").html("hello stranger");
  }
  else {
      $("#name").html("Welcome, " + localStorage.authDataName);
  }
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
          var createLove = document.createElement('p');
      
          createPost.id = "post";
          createButton.className = "votes";
          createButton.textContent = "Love";
          createButton.dataset.id = key;
          createAuthor.className = "detail-author";
          createLove.className = "detail-love";
          createLove.dataset.id = key;
          
          createPost.innerHTML = olderPost[key].content;
          createAuthor.innerHTML = olderPost[key].author;
          createLove.innerHTML = olderPost[key].love;
          
          outerDiv.appendChild(createAuthor);
          outerDiv.appendChild(createLove);
          outerDiv.appendChild(createPost);
          outerDiv.appendChild(createButton);
          
          $(".votes").unbind().on("click",function() {
            if (localStorage.authDataName == undefined) {
              console.log("fuck outta here")
              return}
            var idOfPost = this.dataset.id
            ref.once('value', function(snapshot) {
              if(snapshot.hasChild(idOfPost + "/usersvoted" + "/" + localStorage.authDataName) == true) {
                console.log("Already voted!")
              } 
              else {
                var voteList = ref.child(idOfPost + "/usersvoted");
                var objectToUpdate = {}
                objectToUpdate[localStorage.authDataName] = "yes"
                voteList.update(objectToUpdate);
                var voteValue = idOfPost + "/love";
                ref.child(voteValue).transaction(function(currentValue) {
                  return currentValue+1;
                })};
          })});
      }
        
      },function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
};

$("#login").click(function(){
  
  ref.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log(authData.twitter.username);
      localStorage.authDataName = "@" + authData.twitter.username;
      localStorage.authData = authData;
      $("#name").html("Welcome, " + "@" + authData.twitter.username);
    } 
  }, {
      remember: "default"
  });


});

$("#poster").click(function(){
  
  var newPostRef = ref.push({
      author: localStorage.authDataName,
      content: $("#content-input").val(),
      love: 0
  });
  
  document.getElementById("content-input").value = "";
  
});

ref.on("value", function(snapshot) {
  var objectSnapshot = snapshot.val();
  for(key in objectSnapshot) {
    var loveToUpdate = $("p[data-id='" + key +"']");
    var targetObject = snapshot.child(key).val()
    loveToUpdate.html(targetObject.love)
  }
});

  ref.limitToLast(1).on("child_added", function(snapshot) {
    if (!newItems) return;
    newPost = snapshot.val();
    var newPostKey = snapshot.key();
    
    console.log(newPostKey);
    
    var outerDiv = document.createElement('div');
    outerDiv.id = "outer";
    document.getElementsByClassName('content-display')[0].appendChild(outerDiv);
      
    var createPost = document.createElement('h2');
    var createButton = document.createElement('button');
    var createAuthor = document.createElement('p');
    var createLove = document.createElement('p');
    
    createPost.id = "post";
    createButton.className = "votes";
    createButton.textContent = "Love";
    createButton.dataset.id = newPostKey;
    createAuthor.className = "detail-author";
    createLove.className = "detail-love";
    createLove.dataset.id = newPostKey;
    
    createPost.innerHTML = newPost.content;
    createAuthor.innerHTML = newPost.author;
    createLove.innerHTML = newPost.love;
    outerDiv.appendChild(createAuthor);
    outerDiv.appendChild(createLove);
    outerDiv.appendChild(createPost);
    outerDiv.appendChild(createButton);
    
    $(".votes").unbind().on("click",function() {
            var voteValue = this.dataset.id + "/love";
            
            ref.child(voteValue).transaction(function(currentValue) {
              return currentValue+1;
            });
          });
});

ref.once('value', function(messages) {
  newItems = true;
});
// Messing up the clean code with your shit.
// Fix something, break something else; sick.

// var testRef = new Firebase("https://deepshit.firebaseio.com/-KB18yV92Dpn39DySFoV/usersvoted");
// testRef.set({
//   nguyenbrian: {
//   voted: "yes"    
//   }
// })