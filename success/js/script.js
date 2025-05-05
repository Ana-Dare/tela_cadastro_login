document.addEventListener("DOMContentLoaded", function () {
    const profileContainer = document.querySelector(".account-profile");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      profileContainer.innerHTML = "";

      const profileDiv = document.createElement("div");
      profileDiv.classList.add("saved-account-profile");

      profileDiv.innerHTML = `
        <img src="./img/x-circle.svg" alt="delete" class="btn-delete" style="cursor: pointer;">
        <img src="${userData.photo}" alt="image-profile" class="profile-image">
        <div class="profile-name">${userData.username}</div>
        <div class="profile-activity">Active just now</div>
      `;

      profileContainer.appendChild(profileDiv);

      // Adiciona o evento de clique para excluir
      profileDiv.querySelector(".btn-delete").addEventListener("click", function () {
        const confirmDelete = confirm("Deseja realmente excluir este perfil?");
        if (confirmDelete) {
          localStorage.removeItem("userData");
          profileDiv.remove();
          alert("Perfil removido com sucesso.");
        }
      });
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Carrega os dados armazenados no localStorage
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    // Verifica se os dados estão presentes no localStorage
    if (storedUser) {
        // Preenche os campos com os dados armazenados
        document.getElementById("username-or-email").value = storedUser.email;
        document.getElementById("username-field").value = storedUser.username;
        document.getElementById("number-field").value = storedUser.number;
        document.getElementById("password-field").value = storedUser.password;

        // Preenche a imagem do perfil, se houver
        if (storedUser.photo) {
            const profileImage = document.createElement("img");
            profileImage.src = storedUser.photo;
            profileImage.alt = "Profile Image";
            profileImage.classList.add("profile-image");
            document.querySelector(".enter-image").appendChild(profileImage);
        }
    }

    // Ouvinte para o envio do formulário
    const form = document.getElementById("form-success");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Recupera os valores dos campos
        const email = document.getElementById("username-or-email").value;
        const username = document.getElementById("username-field").value;
        const number = document.getElementById("number-field").value;
        const password = document.getElementById("password-field").value;
        const photoInput = document.getElementById("photo-field");
        const file = photoInput.files[0];

        // Valida os campos
        if (username && number && password && email) {
            let photoBase64 = null;

            if (file) {
                const reader = new FileReader();
                reader.onload = function () {
                    photoBase64 = reader.result;

                    // Cria um objeto com os dados atualizados
                    const updatedUser = {
                        email, 
                        username,
                        number,
                        password,
                        photo: photoBase64
                    };

                    // Atualiza os dados no localStorage
                    localStorage.setItem("userData", JSON.stringify(updatedUser));

                    alert("Dados atualizados com sucesso!");
                    // Opcional: redirecionar para a página de login ou sucesso
                    window.location.href = "../login/index.html";
                };

                reader.readAsDataURL(file); // Lê a imagem como base64
            } else {
                // Caso não haja alteração na foto, somente atualiza os outros dados
                const updatedUser = {
                    email, 
                    username,
                    number,
                    password,
                    photo: storedUser.photo // Mantém a foto anterior
                };

                localStorage.setItem("userData", JSON.stringify(updatedUser));
                alert("Dados atualizados com sucesso!");
                window.location.href = "../login/index.html";
            }
        } else {
            alert("Preencha todos os campos!");
        }
    });
});