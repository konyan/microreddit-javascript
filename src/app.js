import { http } from "./http";
import { ui } from "./ui";

const URL = "http://localhost:3000/posts";

document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
  http
    .get(URL)
    .then((data) => {
      console.log("DATA", data);
      ui.showPosts(data);
    })
    .catch((error) => console.log(error));
}
