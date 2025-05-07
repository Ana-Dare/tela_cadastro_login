document.addEventListener("DOMContentLoaded", function () {
  const profileContainer = document.querySelector(".account-profile");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userData = JSON.parse(localStorage.getItem("userData")) || [];
  
  
  // Mostra os 3 últimos usuários (do final para o começo)
  const lastThreeUsers = users.slice(-4).reverse();

  profileContainer.innerHTML = ""; // Limpa conteúdo atual

  lastThreeUsers.forEach(user => {
    const profileDiv = document.createElement("div");
    profileDiv.classList.add("saved-account-profile");

    profileDiv.innerHTML = `
      <img src="../img/x-circle.svg" alt="delete" class="btn-delete" style="cursor: pointer;">
      <img src="${user.photo}" alt="image-profile" class="profile-image">
      <div class="profile-name">${user.username}</div>
      <div class="profile-activity">Active just now</div>
    `;

    // Remover usuário do localStorage ao clicar no botão de deletar
      profileDiv.querySelector(".btn-delete").addEventListener("click", function () {
      const updatedUsers = users.filter(u => u.email !== user.email);

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      if (userData && userData.email === user.email) {
        localStorage.removeItem("userData");
      }
     
      profileDiv.remove();
    });

    profileContainer.appendChild(profileDiv);

  });
});
