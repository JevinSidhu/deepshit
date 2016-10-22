/* global Firebase*/
/* global votingFunction*/
/* global sortSetting*/
/* global userData*/
var approvedRef = new Firebase("https://deepshit.firebaseio.com/approved");
var pendingRef = new Firebase("https://deepshit.firebaseio.com/pending");


var accessAuthData;
var olderPost;
var newPost;
var newItems = false;
var sortSetting

if (sessionStorage.selection == "sortByDate") {
  $("#dates").attr("selected", "selected")
  sortSetting = "dates"
}

function votingFunction() {
 $(".votes").unbind().on("click",function() {
 if (localStorage.authDataName == undefined) {
     alert("sign in please.")
     return }
     var idOfPost = this.dataset.id
     var userPath = idOfPost + "/usersvoted" + "/" + localStorage.authDataName
     var voteValue = idOfPost + "/love";
      approvedRef.once('value', function(snapshot) {
      if(snapshot.hasChild(userPath) == true) {
        var removeThisPath = new Firebase('https://deepshit.firebaseio.com/' + userPath);
         removeThisPath.remove()
         approvedRef.child(voteValue).transaction(function(currentValue) {
                  var newValue = currentValue-1;
                  approvedRef.child(idOfPost).setPriority(-newValue);
                  return newValue;
              })}
              else {
                var voteList = approvedRef.child(idOfPost + "/usersvoted");
                var objectToUpdate = {};
                objectToUpdate[localStorage.authDataName] = "yes";
                voteList.update(objectToUpdate);
                approvedRef.child(voteValue).transaction(function(currentValue) {
                  var newValue = currentValue+1;
                  approvedRef.child(idOfPost).setPriority(-newValue);
                  return newValue;
                })}
          })})}
          
          
function loadPosts(snapshot) {
  
snapshot.forEach(function(childsnapshot){
          var key = childsnapshot.key();
          var childData = childsnapshot.val();
        
          var outerDiv = document.createElement('div');
          outerDiv.id = "outer";
          document.getElementsByClassName('content-display')[0].appendChild(outerDiv);
          
          var createPost = document.createElement('h2');
          // var createButton = document.createElement('button');
          var createAuthor = document.createElement('p');
          var createLove = document.createElement('p');
      
          createPost.id = "post";
          // createButton.className = "votes";
          // createButton.textContent = "Love";
          // createButton.dataset.id = key;
          createAuthor.className = "detail-author";
          // createLove.className = "detail-love";
          // createLove.dataset.id = key;
          
          createPost.innerHTML = childData.content;
          createAuthor.innerHTML = childData.author;
          // createLove.innerHTML = childData.love;
          
          outerDiv.appendChild(createAuthor);
          outerDiv.appendChild(createLove);
          outerDiv.appendChild(createPost);
          // outerDiv.appendChild(createButton);
          votingFunction();
        });}
          
          
window.onload = function() {
  
  // if (localStorage.authDataName == undefined) {
  //   $("#name").html("hello stranger");
  // }
  // else {
  //     $("#name").html("Welcome, " + localStorage.authDataName);
  // }
  
  approvedRef.authWithOAuthToken("twitter", {
  "user_id": localStorage.id,
  "oauth_token": localStorage.accessToken,
  "oauth_token_secret": localStorage.accessTokenSecret
  }, function(error, authData) {
   if (error) {
     console.log("Auth. failed", error);
   } 
   else {
     $("#name").html("@" + authData.twitter.username);
     $("#name").html("@" + authData.twitter.username);
     $("#login").html("");
   }
  })
  if ($("#sort-vote").val() == "sortByVotes") {
      approvedRef.orderByPriority().once("value", function(snapshot)
      {loadPosts(snapshot)
      })
    }
  else {
     approvedRef.orderByChild("date").once("value", function(snapshot)
      {loadPosts(snapshot)
      })
  }
};

$("#login").click(function(){
  
  // approvedRef.authWithOAuthPopup("twitter", function(error, authData) {
  //   if (error) {
  //     console.log("Login Failed!", error);
  //   } else {
  //     console.log(authData.twitter.username);
  //     localStorage.authDataName = "@" + authData.twitter.username;
  //     localStorage.authData = authData;
  //     $("#name").html("Welcome, " + "@" + authData.twitter.username);
  //   } 
  // }, {
  // });

  approvedRef.authWithOAuthPopup("twitter", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log(authData.twitter.username);
      localStorage.accessToken = authData.twitter.accessToken;
      localStorage.accessTokenSecret = authData.twitter.accessTokenSecret;
      localStorage.id = authData.twitter.id;
      $("#name").html("@" + authData.twitter.username);
      $("#login").html("");
    } 
  }, {
  });

});

$("#poster").click(function(){
  if(localStorage.accessToken & localStorage.accessTokenSecret == undefined) { 
   alert("sign in please");
  }
  else {
    alert("Your post has been submitted for review. We'll post it soon, if it isn't offensive!");
    var date = new Date;
    var newPostRef = pendingRef.push({
        author: approvedRef.getAuth().twitter.username,
        content: $("#content-input").val(),
        love: 0,
        date: -date.getTime()
    })
    newPostRef.setPriority(0)
  document.getElementById("content-input").value = "";
  
}});

approvedRef.on("value", function(snapshot) {
  var objectSnapshot = snapshot.val();
  for(key in objectSnapshot) {
    var loveToUpdate = $("p[data-id='" + key +"']");
    var targetObject = snapshot.child(key).val()
    loveToUpdate.html(targetObject.love);
  }
});

  approvedRef.orderByChild("date").limitToFirst(1).on("child_added", function(snapshot) {
    if (!newItems) return;
    newPost = snapshot.val();
    var newPostKey = snapshot.key();
    
    console.log(newPostKey);
    
    var outerDiv = document.createElement('div');
    outerDiv.id = "outer"
    if (sortSetting == "dates") {
      document.getElementsByClassName('content-display')[0].insertBefore(outerDiv, document.getElementsByClassName('content-display')[0].childNodes[0]);
      // this line is fucking stupid long but im lazy
    }
    else {
      document.getElementsByClassName('content-display')[0].appendChild(outerDiv);
    }
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
    
    votingFunction();
});

approvedRef.once('value', function(messages) {
  newItems = true;
});

$("#sort-vote").change(function() {
  sessionStorage.setItem("selection", $("#sort-vote").val())
  location.reload()
})

