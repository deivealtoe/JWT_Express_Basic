document.querySelector("#sign_out").addEventListener('click', () => {

  sessionStorage.setItem("token", null);

  window.location.href = './index.html';

});