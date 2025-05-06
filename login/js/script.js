document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form-login");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

    const loginUsername = document.getElementById("username-or-email").value;
    const loginPassword = document.getElementById("password-field").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(user => 
      (user.username === loginUsername || user.email === loginUsername) &&
      user.password === loginPassword
    );
    
    if (foundUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userData", JSON.stringify(foundUser)); // salva o usuário logado
      window.location.href = "../success/index.html";
    } else {
      alert("Usuário ou senha incorretos.");
      loginForm.reset();
    }
  })
});

document.addEventListener("DOMContentLoaded", function () {
  const goToRegister = document.getElementById("go-to-register");

  if (goToRegister) {
    goToRegister.addEventListener("click", function () {
      window.location.href = "../register/index.html";
    });
  }
});
