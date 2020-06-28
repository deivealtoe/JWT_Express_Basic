const index = document.querySelector("#link_index");
const signup = document.querySelector("#link_sign_up");
const signin = document.querySelector("#link_sign_in");
const update = document.querySelector("#link_update");
const signout = document.querySelector("#link_sign_out");


if (sessionStorage.getItem("token") && sessionStorage.getItem("token") !== "null") {

  signup.style.display = "none";
  signin.style.display = "none";

} else {

  update.style.display = "none";
  signout.style.display = "none";

}