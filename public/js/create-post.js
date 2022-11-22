// Handle submitting a new post
const newFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const name = document.querySelector("#post-name").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  
  // If there's a name and content, POST to the API
  if (name && content) {
    const response = await fetch(`/api/create-post`, {
      method: "POST",
      body: JSON.stringify({ name, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create project");
    }
  }
};

// An event listener to the new post button
document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
