const form = document.getElementById("form-register");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("username-or-email").value;
  const username = document.getElementById("username-field").value;
  const number = document.getElementById("number-field").value;
  const password = document.getElementById("password-field").value;
  const photoInput = document.getElementById("photo-field");
  const file = photoInput.files[0];

  if (username && number && password && email && file) {

    const reader = new FileReader();

    reader.onload = function () {
      const img = new Image();

      img.onload = function () {
        // Criar um canvas para redimensionar a imagem
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Define as dimensões da imagem redimensionada
        const maxWidth = 200; // Largura máxima
        const maxHeight = 200; // Altura máxima
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round(height * maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round(width * maxHeight / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Desenhar a imagem redimensionada no canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Converter o canvas em base64
        const photoBase64 = canvas.toDataURL();

        // Cria um objeto com os dados
        const userData = {
          email, 
          username,
          number,
          password,
          photo: photoBase64
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        alert("Cadastro realizado com sucesso, redirecionando para a página de login!");
        window.location.href = "../login/index.html"; // redireciona para a página de login
        form.reset(); // limpa o formulário
      };

      img.src = reader.result; // Carregar a imagem após a leitura do arquivo
    };

    reader.readAsDataURL(file); // lê a imagem como base64
  } else {
    alert("Preencha todos os campos e envie uma foto!");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const goToRegister = document.getElementById("go-to-login");

  if (goToRegister) {
      goToRegister.addEventListener("click", function () {
      window.location.href = "../login/index.html";
    });
  }
});