document.querySelector("#btn_signin").addEventListener('click', () => {

  const email = document.querySelector("#input_email").value;
  const password = document.querySelector("#input_password").value;

  if (fieldsNotBlank(email, password)) {

    signIn(email, password);

  } else {

    window.alert("Fields are blank");

  }

});


function fieldsNotBlank(email, password) {

  return email !== '' && password !== '';

}


async function signIn(email, password) {

  const response = await fetch('http://127.0.0.1:3000/api/users/authenticate', {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    }),
  });

  const responseStatus = response.status;

  const responseJson = await response.json();
  const responseMsg = responseJson.msg;
  const responseToken = responseJson.token;

  informResponse(responseStatus, responseMsg, responseToken);

}


function informResponse(responseStatus, responseMessage, responseToken) {

  if (responseStatus === 200) {

    window.alert(responseMessage);

    sessionStorage.setItem("token", `Bearer ${responseToken}`);

    window.location.href = "./index.html";

  } else {
  
    window.alert(responseMessage);

  }

}