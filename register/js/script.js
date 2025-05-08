
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-register");
  window.addEventListener("storage", function (e) {
    if (e.key === "users") {
      location.reload(); // só recarrega se a chave 'users' foi alterada
    }
  });
  
  // Quando o formulário de registro for enviado
  form.addEventListener("submit", function (e) {
  e.preventDefault(); // Previne o envio padrão do formulário
  

  // Obtendo os valores dos campos do formulário
  const email = document.getElementById("username-or-email").value;
  const username = document.getElementById("username-field").value;
  const number = document.getElementById("number-field").value;
  const password = document.getElementById("password-field").value;
  const photoInput = document.getElementById("photo-field");
  const file = photoInput.files[0]; // Obtém o arquivo da imagem
  const users = JSON.parse(localStorage.getItem("users")) || []; 
  
  //função que verifica se o email digitado já
  function emailAvailable(email) {
    const emailExists = users.some(function(user) {
    return user.email === email;
    });
    return !emailExists;

  } if (!emailAvailable(email)) {
  alert("Este e-mail já está em uso. Por favor, use outro.");
  return;
  }
  
  // Verifica se todos os campos obrigatórios foram preenchidos
  if (username && number && password && email && file) {
    const reader = new FileReader(); // Usado para ler a imagem
  
    // Função que será chamada quando a imagem for lida
    reader.onload = function () {
      const img = new Image(); // Cria um objeto de imagem
  
      // Quando a imagem for carregada, ela será redimensionada
      img.onload = function () {
        // Criação de um canvas para redimensionar a imagem
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d'); // Contexto de 2D do canvas
  
        // Definição do tamanho máximo da imagem
        const maxWidth = 200;
        const maxHeight = 200;
        let width = img.width;
        let height = img.height;
  
        // Redimensiona a imagem para que ela não ultrapasse os limites
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
  
        // Define o tamanho do canvas para o novo tamanho da imagem
        canvas.width = width;
        canvas.height = height;
  
        // Desenha a imagem redimensionada no canvas
        ctx.drawImage(img, 0, 0, width, height);
  
        // Converte o canvas em uma imagem base64
        const photoBase64 = canvas.toDataURL();
  
        // Cria um objeto com os dados do usuário
        const userData = {
          email,
          username,
          number,
          password,
          photo: photoBase64 // Armazena a imagem como base64
        };
 
        let users = JSON.parse(localStorage.getItem("users")) || [];
  
        // Adiciona o novo usuário à lista
        users.push(userData); //adiciona userdata ao final do array users
  
        // Mantém no máximo os 3 últimos registros
        if (users.length > 3) { 
          users.shift(); // Remove o usuário mais antigo, mantendo 3
        }
  
        // Salva a lista atualizada de usuários no localStorage
        localStorage.setItem("users", JSON.stringify(users));
  
        // Redireciona para a página de login
        window.location.href = "../login/index.html";
        form.reset(); // Limpa o formulário após o envio
      };
  
      // Inicia o carregamento da imagem após a leitura do arquivo
      img.src = reader.result;
    };
  
    // Lê o arquivo da imagem e converte para base64
    reader.readAsDataURL(file);
  } else {
    // Se algum campo obrigatório não for preenchido, exibe uma mensagem de erro
    alert("Preencha todos os campos!");
  }
  });

          //exibir imagem 
          document.getElementById('photo-field').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const containerImg = document.querySelector(".enter-image");
      
                    const oldImage = containerImg.querySelector("img");
                    if (oldImage) containerImg.removeChild(oldImage);
      
                    const image = new Image();
                    image.src = e.target.result;
                    image.classList.add("profile-image");
                    containerImg.appendChild(image);
                };
                
                reader.readAsDataURL(file);
            }
        });

  
  // Redireciona para a página de login ao clicar no botão
  const goToLogin = document.getElementById("go-to-login");
  
  if (goToLogin) {
  goToLogin.addEventListener("click", function () {
    window.location.href = "../login/index.html";
  });
  }
  });
  