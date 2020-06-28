async function getUserInfo() {

  const response = await fetch('http://127.0.0.1:3000/api/users', {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("token"),
    },
  });

  const responseJson = await response.json();

  if (response.status === 200) {

    setOldEmailOnLabel(responseJson.user.email);

  } else {

    setOldEmailOnLabel();

  }

}


function setOldEmailOnLabel(email) {

  const labelEmail = document.querySelector("#label_email");

  if (email) {

    labelEmail.textContent = 'Your old email is' + `: ${email}`;

  } else {

    labelEmail.textContent = "Not logged in";

  }

}


getUserInfo();