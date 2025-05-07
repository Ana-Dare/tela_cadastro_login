// Aguarda o carregamento total do DOM
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona o formulário de login
  const loginForm = document.getElementById("form-login");

  // Adiciona o evento de submit ao formulário
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário

    // Coleta os valores inseridos no formulário
    const loginUsername = document.getElementById("username-or-email").value;
    const loginPassword = document.getElementById("password-field").value;

    // Obtém os usuários armazenados no localStorage
    const users = JSON.parse(localStorage.getItem("users")) || []; //transforma os dados json em um array

    // Busca um usuário que tenha o mesmo nome de usuário ou e-mail e a senha correta
    const foundUser = users.find(user => //percorre o array users e retorna o primeiro elemento que satisfaça a condição informada.
      (user.username === loginUsername || user.email === loginUsername) &&
      user.password === loginPassword
    );

    // Verifica se o usuário foi encontrado
    if (foundUser) {
      localStorage.setItem("userData", JSON.stringify(foundUser));
      // Redireciona para a página de sucesso
      window.location.href = "../success/index.html";
    } else {
      // Exibe um alerta se o usuário ou a senha estiverem incorretos
      alert("Usuário ou senha incorretos.");
      loginForm.reset(); // Reseta o formulário
    }
  });

  // Verifica se o botão "Ir para cadastro" foi clicado
  const goToRegister = document.getElementById("go-to-register");

  if (goToRegister) {
    // Redireciona para a página de registro
    goToRegister.addEventListener("click", function () {
      window.location.href = "../register/index.html";
    });
  }
});