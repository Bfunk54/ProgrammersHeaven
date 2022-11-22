//Create a function to handle posting a new comment
const commentFormHandler = async function (event) {
  // Grab the value of the comment and the post's id
  const postId = document.querySelector(".post-id").textContent;
  const body = document.querySelector(".comment-body").value;

  if (body) {
    // Send a POST request with the comment and post's id
    const response = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ postId, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

// An event listener to the comment button
document
  .querySelector("#new-comment-form")
  .addEventListener("click", commentFormHandler);
