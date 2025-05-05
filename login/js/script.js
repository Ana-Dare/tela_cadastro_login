document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form-login");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

    const loginUsername = document.getElementById("username-or-email").value;
    const loginPassword = document.getElementById("password-field").value;

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (storedUser) {
        if ((storedUser.username === loginUsername || storedUser.email === loginUsername) && storedUser.password === loginPassword) {

          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "../success/index.html"; // redireciona para a página de sucesso
        } else {
          alert("Usuário ou senha incorretos.");
          loginForm.reset();
        }
      } 
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const goToLogin = document.getElementById("go-to-register");

  if (goToLogin) {
    goToLogin.addEventListener("click", function () {
      window.location.href = "../register/index.html";
    });
  }
});