async function getUserInfo() {

  const response = await fetch('http://127.0.0.1:3000/api/users', {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("token"),
    },
  });

  console.log(response);

  const responseJson = await response.json();

  console.log(responseJson);

}

getUserInfo();