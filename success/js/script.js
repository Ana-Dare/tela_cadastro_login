document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("Faça o login para ter acesso");
        window.location.href = "../login/index.html";
    }

    const profileContainer = document.querySelector(".account-profile");
    const storedUser = JSON.parse(localStorage.getItem("userData"));

    // Função para renderizar os perfis
    function renderProfiles() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        profileContainer.innerHTML = ""; // Limpa o conteúdo atual

        if (users.length === 0) {
            // Se não houver perfis, exibe uma mensagem informando
            profileContainer.innerHTML = "<p>Nenhum perfil disponível</p>";
        } else {
            users.slice(-3).reverse().forEach(user => {
                const profileDiv = document.createElement("div");
                profileDiv.classList.add("saved-account-profile");

                profileDiv.innerHTML = `
                    <img src="./img/x-circle.svg" alt="delete" class="btn-delete" style="cursor: pointer;">
                    <img src="${user.photo}" alt="image-profile" class="profile-image">
                    <div class="profile-name">${user.username}</div>
                    <div class="profile-activity">Active just now</div>
                `;

                profileDiv.querySelector(".btn-delete").addEventListener("click", function () {
                    deleteUserFromLocalStorage(user.email);  // Atualiza para pegar o email correto
                    profileDiv.remove();  // Remove a div da tela
                });

                profileContainer.appendChild(profileDiv);
            });
        }
    }

    // Função para deletar o usuário da lista de usuários no localStorage
    function deleteUserFromLocalStorage(email) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        // Filtra o usuário a ser excluído
        const updatedUsers = users.filter(u => u.email !== email); 

        // Atualiza o localStorage com a nova lista
        localStorage.setItem("users", JSON.stringify(updatedUsers)); 

        // Se a lista de usuários ficou vazia, também excluímos o "userData" que contém o usuário logado
        if (updatedUsers.length === 0) {
            localStorage.removeItem("userData"); // Remove os dados do usuário logado
        }

        renderProfiles(); // Atualiza a lista de perfis na tela
    }

    // Função para atualizar o usuário no array de usuários no localStorage
    function updateUserInUsersArray(updatedUser) {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = users.map(user => {
            if (user.email === updatedUser.email) {
                return updatedUser;
            }
            return user;
        });

        localStorage.setItem("users", JSON.stringify(updatedUsers));

        renderProfiles(); // Atualiza a lista de perfis na tela
    }

    // Se o usuário existir, renderiza o perfil
    if (storedUser) {
        renderProfiles();  // Exibe todos os perfis ao invés de apenas um

        // Preenche os campos do formulário de atualização com os dados do usuário
        document.getElementById("username-or-email").value = storedUser.email;
        document.getElementById("username-field").value = storedUser.username;
        document.getElementById("number-field").value = storedUser.number;
        document.getElementById("password-field").value = storedUser.password;

        // Função para atualizar a imagem
        function updateProfileImage(file) {
            const enterImageDiv = document.querySelector(".enter-image"); // Seleciona a div onde a imagem será exibida
            const existingImage = enterImageDiv.querySelector("img"); // Procura por uma imagem já existente

            // Se já houver uma imagem, removemos ela
            if (existingImage) {
                existingImage.remove();
            }

            // Criar um novo elemento de imagem
            const newImage = document.createElement("img");
            const reader = new FileReader();

            reader.onload = function (e) {
                newImage.src = e.target.result; // Define a nova imagem com o arquivo selecionado
                newImage.alt = "Profile Image";
                newImage.classList.add("profile-image"); // Adiciona uma classe para estilo, se necessário

                // Adiciona a nova imagem à div
                enterImageDiv.appendChild(newImage);
            };

            // Lê o arquivo selecionado
            reader.readAsDataURL(file);
        }

        // Se o usuário tiver uma foto, exibe a foto do perfil
        if (storedUser.photo) {
            const profileImage = document.createElement("img");
            profileImage.src = storedUser.photo;
            profileImage.alt = "Profile Image";
            profileImage.classList.add("profile-image");
            document.querySelector(".enter-image")?.appendChild(profileImage);
        }

        // Adiciona o evento de mudança de arquivo para o input de imagem
        document.getElementById("photo-field").addEventListener("change", function (event) {
            const file = event.target.files[0]; // Pega o arquivo selecionado
            if (file) {
                updateProfileImage(file); // Chama a função para atualizar a imagem
            }
        });
    }

    // Envio do formulário para atualização do perfil
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
                        updatedUser.photo = reader.result;  // Atualiza a foto do perfil
                        localStorage.setItem("userData", JSON.stringify(updatedUser));
                        updateUserInUsersArray(updatedUser);  // Atualiza a lista de usuários
                        alert("Dados atualizados com sucesso!");
                        form.reset()
                        
                    };
                    reader.readAsDataURL(file);
                } else {
                    localStorage.setItem("userData", JSON.stringify(updatedUser));
                    updateUserInUsersArray(updatedUser);  // Atualiza a lista de usuários
                    alert("Dados atualizados com sucesso!");
                    form.reset()
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
