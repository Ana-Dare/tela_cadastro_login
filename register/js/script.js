
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("storage", function (e) {
    if (e.key === "users") {
      location.reload(); // só recarrega se a chave 'users' foi alterada
    }
  });
  
  const form = document.getElementById("form-register");
  form.addEventListener("submit", function (e) {
  e.preventDefault(); 
  
  const email = document.getElementById("username-or-email").value;
  const username = document.getElementById("username-field").value;
  const number = document.getElementById("number-field").value;
  const password = document.getElementById("password-field").value;
  const photoInput = document.getElementById("photo-field");
  const file = photoInput.files[0]; 
  const users = JSON.parse(localStorage.getItem("users")) || []; 
  
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
    const reader = new FileReader(); 
    // Função que será chamada quando a imagem for lida
    reader.onload = function () {
      const img = new Image(); // Cria um objeto de imagem
  
      // Quando a imagem for carregada, ela será redimensionada
      img.onload = function () {
        // Criação de um canvas para redimensionar a imagem
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d'); 

        const maxWidth = 200;
        const maxHeight = 200;
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
  
        ctx.drawImage(img, 0, 0, width, height);
  
        const photoBase64 = canvas.toDataURL();
  
        const userData = {
          email,
          username,
          number,
          password,
          photo: photoBase64 
        };
 
        let users = JSON.parse(localStorage.getItem("users")) || [];
  
        // Adiciona o novo usuário à lista
        users.push(userData); 
  
        // Mantém no máximo os 3 últimos registros
        if (users.length > 3) { 
          users.shift(); // Remove o usuário mais antigo, mantendo 3
        }
  
        // Salva a lista atualizada de usuários no localStorage
        localStorage.setItem("users", JSON.stringify(users));
  
        // Redireciona para a página de login
        window.location.href = "../login/index.html";
        form.reset(); 
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
  