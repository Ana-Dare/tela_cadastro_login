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