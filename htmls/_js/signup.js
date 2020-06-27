document.querySelector("#btn_done").addEventListener('click', () => {
  
  const email = document.querySelector("#input_email").value;
  const password_one = document.querySelector("#input_password_one").value;
  const password_two = document.querySelector("#input_password_two").value;

  const verifiedFields = fieldsNotBlank(email, password_one, password_two);
  const verifiedPasswords = passwordsCombine(password_one, password_two);

  if (verifiedFields && verifiedPasswords) {

    registerUser(email, password_one);

  } else {

    window.alert("There are some blank field in this form or passwords doesn't match");

  }

});


function fieldsNotBlank(email, password_one, password_two) {

  return email !== '' && password_one !== '' && password_two !== '';

}


function passwordsCombine(password_one, password_two) {

  return password_one === password_two;

}


async function registerUser(email, password_one) {

  const response = await fetch("http://127.0.0.1:3000/api/users", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": password_one,
    }),
  });

  const responseStatus = response.status;

  const responseJson = await response.json();
  const responseMessage = responseJson.msg;

  informResponse(responseStatus, responseMessage);

}


function informResponse(responseStatus, responseMessage) {

  if (responseStatus === 201) {

    window.alert(responseMessage);

    window.location.href = "./index.html";

  } else {

    window.alert(responseMessage);

  }

}