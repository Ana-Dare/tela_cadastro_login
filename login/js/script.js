document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("form-login");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

    const emailInput = document.getElementById("username-or-email").value;
    const passwordInput = document.getElementById("password-field").value;

    
    