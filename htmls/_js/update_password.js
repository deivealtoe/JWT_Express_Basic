document.querySelector("#btn_update_password").addEventListener('click', () => {

  const password = document.querySelector("#input_password").value;

  if (password !== '') {

    updatePassword(password);

  } else {

    window.alert("Password field was left blank");

  }

});


async function updatePassword(password) {

  const response = await fetch('http://127.0.0.1:3000/api/users/password', {
    method: "put",
    headers: {
      "Authorization": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "password": password,
    }),
  });

  const responseJson = await response.json();

  informResponse(response.status, responseJson.msg);

}


function informResponse(responseStatus, responseMsg) {

  window.alert(responseMsg);

  if (responseStatus === 200) {

    window.location.href = './update_info.html';

  }

}