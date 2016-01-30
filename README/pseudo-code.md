When user clicks button of the article
  Check the personal paper to see if the article id has been check-marked
  If there is no checkmark on the article id
    Add a checkmark on the article id on personal paper
    Increment the votes on the article
  If there is a checkmark on the article id on personal paper
    Remove the checkmark on the article id
    Decrement the votes on the article

When user clicks button of the Post
  Check cookie's value (true/false) for given post ID (key),
  If the value is false or is not defined
    Change the cookie's value to 'true' for the given post ID (key)
    Increment the post's number of votes by 1
  Else
    change the cookie's value to 'false' for the given post ID (key)
    decrement the post's number of votes by 1
