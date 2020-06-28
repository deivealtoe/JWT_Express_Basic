document.querySelector("#btn_update_email").addEventListener('click', () => {

  const email = document.querySelector("#input_email").value;

  if (email !== '') {

    updateEmail(email);

  } else {

    window.alert("Email field was left blank");

  }

});


async function updateEmail(email) {

  const response = await fetch('http://127.0.0.1:3000/api/users/email', {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("token"),
    },
    body: JSON.stringify({
      "email": email,
    }),
  });

  const responseJson = await response.json();

  informResponse(response.status, responseJson.msg);

}


function informResponse(responseStatus, responseMsg) {

  window.alert(responseMsg);

  if (responseStatus === 200) {

    window.location.href = "./update_info.html";

  }

}