document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form-login");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

    const loginUsername = document.getElementById("username-or-email").value;
    const loginPassword = document.getElementById("password-field").value;

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (storedUser) {
        if ((storedUser.username === loginUsername || storedUser.email === loginUsername) && storedUser.password === loginPassword) {
          alert("Login bem-sucedido!");
          window.location.href = "../success/index.html"; // redireciona para a página de sucesso
        } else {
          alert("Usuário ou senha incorretos.");
          loginForm.reset();
        }
      } 
    });
});