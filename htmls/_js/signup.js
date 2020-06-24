document.querySelector("#btn_done").addEventListener('click', () => {
  
  const email = document.querySelector("#input_email").value;
  const passwordOne = document.querySelector("#input_password_one").value;
  const passwordTwo = document.querySelector("#input_password_two").value;

  //window.alert(`${areFieldsBlank(emailInput, passwordOne, passwordTwo)}`);
  //window.alert(`${passwordsAreEquals(passwordOne, passwordTwo)}`);

  if (fieldsNotBlank(email, passwordOne, passwordTwo) && passwordsCombine(passwordOne, passwordTwo)) {
    
    if (makingPost(email, passwordOne)) {
      window.location.href = './index.html';
    }
    
  } else {

    console.log("There are some blank field in this form or passwords doesn't match");

  }

});


function fieldsNotBlank(email, pass1, pass2) {

  return email !== '' && pass1 !== '' && pass2 !== '';

}


function passwordsCombine(pass1, pass2) {

  return pass1 === pass2;

}


async function makingPost(email, password) {

  const response = await fetch("http://127.0.0.1:3000/api/users", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    }),
  });

  console.log(`Status code: ${response.status} - Ok: ${response.ok}`);

  const jsonData = await response.json();

  console.log(jsonData.msg);

  return response.ok;

}