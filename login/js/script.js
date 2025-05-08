document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("storage", function (e) {
    if (e.key === "users") {
      location.reload(); // só recarrega se a chave 'users' foi alterada
    }
  });

  const loginForm = document.getElementById("form-login");
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    // Coleta os valores inseridos no formulário
    const loginUsername = document.getElementById("username-or-email").value;
    const loginPassword = document.getElementById("password-field").value;

    // Obtém os usuários armazenados no localStorage
    const users = JSON.parse(localStorage.getItem("users")) || []; //transforma os dados json em um array

    // Busca um usuário que tenha o mesmo nome de usuário ou e-mail e a senha correta
    const foundUser = users.find(user => 
      (user.username === loginUsername || user.email === loginUsername) &&
      user.password === loginPassword
    );

    // Verifica se o usuário foi encontrado
    if (foundUser) {
      localStorage.setItem("userData", JSON.stringify(foundUser));
      window.location.href = "../success/index.html";
    } else {
      alert("Usuário ou senha incorretos.");
      loginForm.reset(); // Reseta o formulário
    }
  });

  if (goToRegister) {
    goToRegister.addEventListener("click", function () {
      window.location.href = "../register/index.html";
    });
  }
});