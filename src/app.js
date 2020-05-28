import { http } from "./http";
import { ui } from "./ui";

const URL = "http://localhost:3000/posts";

function getPosts() {
  http
    .get(URL)
    .then((data) => {
      ui.showPosts(data);
    })
    .catch((error) => console.log(error));
}

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const id = document.querySelector("#id").value;

  const data = {
    title,
    body,
  };

  if (title === "" || body === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    if (!id) {
      //create post
      http
        .post(URL, data)
        .then((data) => {
          console.log("DATA", data);
          ui.showAlert("Post Added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch((error) => console.log(error));
    } else {
      //update post
      http
        .put(URL + "/" + id, data)
        .then((data) => {
          console.log("DATA", data);
          ui.showAlert("Post Updated", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch((error) => console.log(error));
    }
  }
}

function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("ARE YOU SURE?")) {
      http
        .delete(URL + "/" + id)
        .then((data) => {
          ui.showAlert("Post removed", "alert alert-danger");
          getPosts();
        })
        .catch((error) => console.log(error));
    }
  }
}

function editPost(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    console.log("EVENT", e);

    if (title === "" || body === "") {
      ui.showAlert("Please fill in all fields", "alert alert-danger");
    } else {
      //Check for id
      const data = {
        id,
        title,
        body,
      };

      ui.fillForm(data);
    }
  }
  event.preventDefault();
}

function cancelPost(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
  e.preventDefault();
}

//GET POSTS on DOM LOAD
document.addEventListener("DOMContentLoaded", getPosts);
//LISTEN BUTTON CLICK
document.querySelector(".post-submit").addEventListener("click", submitPost);
//DELETE LIST CLICK
document.querySelector("#posts").addEventListener("click", deletePost);
//EDIT LISTEN CLICK
document.querySelector("#posts").addEventListener("click", editPost);
// CANCEL LISTEN CLICK
document.querySelector(".card-form").addEventListener("click", cancelPost);
