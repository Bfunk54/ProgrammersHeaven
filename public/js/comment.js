const commentFormHandler = async function (event) {
//   event.preventDefault();

  const postId = document.querySelector('.post-id').textContent;
  const body = document.querySelector('.comment-body').value;
  console.log(body);
  console.log(postId);
  if (body) {
    
   const response = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ postId, body }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
    document.location.reload();
  }else {
    alert("Failed to create comment");
  }
    }
};

console.log(document.querySelector("#new-comment-form"));
document
  .querySelector("#new-comment-form")
  .addEventListener("click", commentFormHandler);
