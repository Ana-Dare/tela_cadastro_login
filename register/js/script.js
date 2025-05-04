    const form = document.getElementById("form-register");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

    const email = document.getElementById("username-or-email").value;
    const username = document.getElementById("username-field").value;
    const number = document.getElementById("number-field").value;
    const password = document.getElementById("password-field").value;

    if (username && number && password) {
        // Cria um objeto com os dados
        const userData = {
          email, 
          username,
          number,
          password
        };

        localStorage.setItem("userData", JSON.stringify(userData));
      alert("Cadastro realizado com sucesso!");
      window.location.href = "./login/index.html"; // redireciona para a página de login
      form.reset(); // limpa o formulário
    } else {
      alert("Preencha todos os campos!");
    }
  });


