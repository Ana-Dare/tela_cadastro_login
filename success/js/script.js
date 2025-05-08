document.addEventListener("DOMContentLoaded", function () {
    const enterImageDiv = document.querySelector(".enter-image");
    const profileContainer = document.querySelector(".account-profile");
    const storedUser = JSON.parse(localStorage.getItem("userData")); 
    const userData = JSON.parse(localStorage.getItem("userData"));
    const logout = document.getElementById("btn-logout");

    if (!userData || Object.keys(userData).length === 0) {
        window.location.href = "../login/index.html";
    }

    function renderProfiles() {
        const updatedUserData = JSON.parse(localStorage.getItem("userData"));
        if (!updatedUserData || !profileContainer) return;
    
        profileContainer.innerHTML = "";
    
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("saved-account-profile");
    
        profileDiv.innerHTML = `
            <img src="../img/x-circle.svg" alt="delete" class="btn-delete" style="display:none">
            <img src="${updatedUserData.photo}" alt="image-profile" class="profile-image">
            <div class="profile-name">${updatedUserData.username}</div>
            <div class="profile-activity">Active jgggg now</div>
        `;
    
        profileContainer.appendChild(profileDiv);
    }

    // Função para atualizar um usuário no array
    function updateUserInUsersArray(updatedUser) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map(user => {
            return user.email === updatedUser.email ? updatedUser : user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        renderProfiles();  // Chama novamente renderProfiles para garantir que os dados atualizados sejam exibidos
    }

    // Se o usuário estiver logado, renderiza os perfis
    if (storedUser) {
        renderProfiles();

        document.getElementById("username-or-email").value = storedUser.email;
        document.getElementById("username-field").value = storedUser.username;
        document.getElementById("number-field").value = storedUser.number;
        document.getElementById("password-field").value = storedUser.password;

        // Atualiza a imagem do perfil no formulário
        function updateProfileImage(file) {
            const existingImage = enterImageDiv.querySelector("img");
            if (existingImage) existingImage.remove();

            const newImage = document.createElement("img");
            const reader = new FileReader();

            reader.onload = function (e) {
                newImage.src = e.target.result;
                newImage.alt = "Profile Image";
                newImage.classList.add("profile-image");
                enterImageDiv.appendChild(newImage);
            };

            reader.readAsDataURL(file);
        }

        if (storedUser.photo) {
            const profileImage = document.createElement("img");
            profileImage.src = storedUser.photo;
            profileImage.alt = "Profile Image";
            profileImage.classList.add("profile-image");
            document.querySelector(".enter-image")?.appendChild(profileImage);
        }

        document.getElementById("photo-field").addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) updateProfileImage(file);
        });
    }

    // Evento de envio do formulário
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
                const updatedUser = {
                    email,
                    username,
                    number,
                    password,
                    photo: storedUser.photo
                };

                if (file) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        updatedUser.photo = reader.result;
                        localStorage.setItem("userData", JSON.stringify(updatedUser));
                        updateUserInUsersArray(updatedUser);  // Atualiza o array de usuários
                        alert("Dados atualizados com sucesso!");
                    };
                    reader.readAsDataURL(file);
                } else {
                    localStorage.setItem("userData", JSON.stringify(updatedUser));
                    updateUserInUsersArray(updatedUser);  // Atualiza o array de usuários
                    alert("Dados atualizados com sucesso!");
                }
            } else {
                alert("Preencha todos os campos!");
            }
        });
    }

    logout.addEventListener("click", function () {
        localStorage.removeItem("userData");
        window.location.href = "../login/index.html";
    })
});

    
