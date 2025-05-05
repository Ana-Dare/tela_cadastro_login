document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "../login/index.html"; 
      }
      
    const profileContainer = document.querySelector(".account-profile");
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    function renderProfile(user) {
        profileContainer.innerHTML = "";

        const profileDiv = document.createElement("div");
        profileDiv.classList.add("saved-account-profile");

        profileDiv.innerHTML = `
            <img src="./img/x-circle.svg" alt="delete" class="btn-delete" style="cursor: pointer;">
            <img src="${user.photo}" alt="image-profile" class="profile-image">
            <div class="profile-name">${user.username}</div>
            <div class="profile-activity">Active just now</div>
        `;

        profileContainer.appendChild(profileDiv);

        profileDiv.querySelector(".btn-delete").addEventListener("click", function () {
            const confirmDelete = confirm("Deseja realmente excluir este perfil?");
            if (confirmDelete) {
                localStorage.removeItem("userData");
                profileDiv.remove();
                alert("Perfil removido com sucesso.");
            }
        });
    }

    // Se o usuário existir, renderiza o perfil
    if (storedUser) {
        renderProfile(storedUser);

        // Preenche os campos
        document.getElementById("username-or-email").value = storedUser.email;
        document.getElementById("username-field").value = storedUser.username;
        document.getElementById("number-field").value = storedUser.number;
        document.getElementById("password-field").value = storedUser.password;

        // Imagem de perfil
        if (storedUser.photo) {
            const profileImage = document.createElement("img");
            profileImage.src = storedUser.photo;
            profileImage.alt = "Profile Image";
            profileImage.classList.add("profile-image");
            document.querySelector(".enter-image")?.appendChild(profileImage);
        }
    }

    // Envio do formulário
    const form = document.getElementById("form-success");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("username-or-email").value;
            const username = document.getElementById("username-field").value;
            const number = document.getElementById("number-field").value;
            const password = document.getElementById("password-field").value;
            const photoInput = document.getElementById("photo-field");
            const file = photoInput.files[0];

            if (username && number && password && email) {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        const photoBase64 = reader.result;

                        const updatedUser = {
                            email,
                            username,
                            number,
                            password,
                            photo: photoBase64
                        };

                        localStorage.setItem("userData", JSON.stringify(updatedUser));
                        alert("Dados atualizados com sucesso!");
                        renderProfile(updatedUser); // Atualiza a div sem recarregar
                    };
                    reader.readAsDataURL(file);
                } else {
                    const updatedUser = {
                        email,
                        username,
                        number,
                        password,
                        photo: storedUser.photo
                    };

                    localStorage.setItem("userData", JSON.stringify(updatedUser));
                    alert("Dados atualizados com sucesso!");
                    renderProfile(updatedUser); // Atualiza a div sem recarregar
                }
            } else {
                alert("Preencha todos os campos!");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const goToLogin = document.getElementById("go-to-register");
  
    if (goToLogin) {
      goToLogin.addEventListener("click", function () {
        window.location.href = "../register/index.html";
      });
    }
  });
