Parse.initialize("Usv6ZpfyiyVzDK4KST9ED9SPg15PRCa9xUs30vFy", "S5pBnTZfk2G0W27hjcQXvnHJxZlVeVTXKoGvcvMl");


function createPost() {

    var Post = Parse.Object.extend("Post");
    var post = new Post();
    
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

