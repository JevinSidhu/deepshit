/* global Firebase*/
/* global votingFunction*/
/* global sortSetting*/
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
     alert("Please sign in!")
     return }
     var idOfPost = this.dataset.id
     var buttonType = this.textContent
     var removeThis = new Firebase(pendingRef + "/" + idOfPost)
 if (buttonType == "Approve") {
   pendingRef.on("value", function(snapshot) {
     var object = snapshot.val()
     var approved = object[idOfPost]
     approvedRef.push(approved, function(error) {
       if (error) {
         alert("Post failed to transfer!")
       }
       else {
         removeThis.remove()
         alert("approved!")
       }
     })
   })
 }
 else {
  removeThis.remove()
  alert("deleted!")
 }
 })}
          
          
function loadPosts(snapshot) {
  
snapshot.forEach(function(childsnapshot){
          var key = childsnapshot.key();
          var childData = childsnapshot.val();
        
          var outerDiv = document.createElement('div');
          outerDiv.id = "outer";
          document.getElementsByClassName('content-display')[0].appendChild(outerDiv);
          
          var createPost = document.createElement('h2');
          var createButtonA = document.createElement('button');
          var createButtonB = document.createElement('button');
          var createAuthor = document.createElement('p');

          createPost.id = "post";
          createButtonA.className = "votes";
          createButtonA.textContent = "Approve";
          createButtonA.dataset.id = key;
          createButtonB.className = "votes";
          createButtonB.textContent = "Deny";
          createButtonB.dataset.id = key;
          createAuthor.className = "detail-author";

          createPost.innerHTML = childData.content;
          createAuthor.innerHTML = childData.author;

          outerDiv.appendChild(createAuthor);
          outerDiv.appendChild(createPost);
          outerDiv.appendChild(createButtonA);
          outerDiv.appendChild(createButtonB);
          votingFunction();
        });}
          
          
window.onload = function() {
  
  if (localStorage.authDataName == "@NguyenBrian3" || localStorage.authDataName == "@uydesai" || localStorage.authDataName == "@parad0cks" || localStorage.authDataName == "@jevinsidhu" ) {
    $("#name").html("Welcome, " + localStorage.authDataName);
  }
  else {
      $("#name").html("fuck outta here");
  }
  if ($("#sort-vote").val() == "sortByVotes") {
      pendingRef.orderByPriority().once("value", function(snapshot)
      {loadPosts(snapshot)
      })
    }
  else {
     pendingRef.orderByChild("date").once("value", function(snapshot)
      {loadPosts(snapshot)
      })
  }
};

$("#login").click(function(){
  
  pendingRef.authWithOAuthPopup("twitter", function(error, authData) {
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


pendingRef.on("value", function(snapshot) {
  var objectSnapshot = snapshot.val();
  for(key in objectSnapshot) {
    var loveToUpdate = $("p[data-id='" + key +"']");
    var targetObject = snapshot.child(key).val()
    loveToUpdate.html(targetObject.love);
  }
});

  pendingRef.limitToLast(1).on("child_added", function(snapshot) {
    if (!newItems) return;
    newPost = snapshot.val();
    var newPostKey = snapshot.key();
    
    console.log(newPostKey);
    
     var outerDiv = document.createElement('div');
          outerDiv.id = "outer";
          document.getElementsByClassName('content-display')[0].appendChild(outerDiv);
          
          var createPost = document.createElement('h2');
          var createButtonA = document.createElement('button');
          var createButtonB = document.createElement('button');
          var createAuthor = document.createElement('p');

          createPost.id = "post";
          createButtonA.className = "votes";
          createButtonA.textContent = "Approve";
          createButtonA.dataset.id = key;
          createButtonB.className = "votes";
          createButtonB.textContent = "Deny";
          createButtonB.dataset.id = key;
          createAuthor.className = "detail-author";

          createPost.innerHTML = newPost.content;
          createAuthor.innerHTML = newPost.author;

          outerDiv.appendChild(createAuthor);
          outerDiv.appendChild(createPost);
          outerDiv.appendChild(createButtonA);
          outerDiv.appendChild(createButtonB);
          votingFunction();
});

pendingRef.once('value', function(messages) {
  newItems = true;
});


