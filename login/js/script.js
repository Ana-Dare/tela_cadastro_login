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
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Obtém os usuários armazenados no localStorage
    
    const foundUser = users.find(user => 
      (user.username === loginUsername || user.email === loginUsername) &&
      user.password === loginPassword
    );
    
    if (foundUser) {
      users.forEach(function(user) {
        if (user.email === foundUser.email) {
          user.isLoggedIn = true;
        } else {
          user.isLoggedIn = false;
        }
      });
    
      // Salva os usuários atualizados no localStorage
      localStorage.setItem("users", JSON.stringify(users));
    
      // Salva o usuário logado no localStorage
      localStorage.setItem("userData", JSON.stringify(foundUser));
    
      // Redireciona para a página de sucesso
      window.location.href = "../success/index.html";
    } else {
      alert("Usuário ou senha incorretos.");
      loginForm.reset();
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
