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

//GET POSTS on DOM LOAD
document.addEventListener("DOMContentLoaded", getPosts);
//LISTEN BUTTON CLICK
document.querySelector(".post-submit").addEventListener("click", submitPost);
