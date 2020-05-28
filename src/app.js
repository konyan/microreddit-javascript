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

  const data = {
    title,
    body,
  };

  http
    .post(URL, data)
    .then((data) => {
      console.log("DATA", data);
      ui.showAlert("Post Added", "alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch((error) => console.log(error));
}

function deletePost(e) {
  e.preventDefault();
  console.log("EVENT", e);
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    console.log(id);
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

//GET POSTS on DOM LOAD
document.addEventListener("DOMContentLoaded", getPosts);
//LISTEN BUTTON CLICK
document.querySelector(".post-submit").addEventListener("click", submitPost);
//DELETE LIST CLICK
document.querySelector("#posts").addEventListener("click", deletePost);
