// Handle deleting a post
const delButtonHandler = async (event) => {
  // If the delete button is clicked, grab the id of that specific post
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    // Send a DELETE request to the API
    const response = await fetch(`/api/create-post/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

// An event listener to the delete button
document
  .querySelector(".project-list")
  .addEventListener("click", delButtonHandler);
