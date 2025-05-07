document.addEventListener("DOMContentLoaded", function () {
  const profileContainer = document.querySelector(".account-profile");
  if (!profileContainer) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userData = JSON.parse(localStorage.getItem("userData"));
  const currentPage = window.location.pathname;
  const isEditPage = currentPage.includes("success"); 

  profileContainer.innerHTML = ""; // Limpa conteúdo atual

  if (isEditPage && userData) {
    // Exibe apenas o perfil logado na página de edição
    renderProfile(userData, false);
  } else {
    // Exibe os 3 últimos usuários nas outras páginas
    const lastThreeUsers = users.slice(-3).reverse();
    lastThreeUsers.forEach(user => {
      renderProfile(user, true);
    });
  }

  function renderProfile(user, canDelete) {
    const profileDiv = document.createElement("div");
    profileDiv.classList.add("saved-account-profile");

    profileDiv.innerHTML = `
      ${canDelete ? '<img src="../img/x-circle.svg" alt="delete" class="btn-delete" style="cursor: pointer;">' : ""}
      <img src="${user.photo}" alt="image-profile" class="profile-image">
      <div class="profile-name">${user.username}</div>
      <div class="profile-activity">Active just now</div>
    `;

    if (canDelete) {
      profileDiv.querySelector(".btn-delete").addEventListener("click", function () {
        const updatedUsers = users.filter(u => u.email !== user.email);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        if (userData && userData.email === user.email) {
          localStorage.removeItem("userData");
        }

        profileDiv.remove();
      });
    }

    profileContainer.appendChild(profileDiv);
  }
});
