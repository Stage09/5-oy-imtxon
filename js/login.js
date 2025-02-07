const correctLogin = "admin";
const correctPassword = "1234";

const loginInput = document.getElementById("login");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const errorMessage = document.createElement("p");

errorMessage.style.color = "red";
errorMessage.style.fontSize = "14px";
errorMessage.style.marginTop = "10px";
errorMessage.style.display = "none"; // Изначально скрыто
errorMessage.textContent = "Please fill out the form correctly.";
document.querySelector(".login-form").appendChild(errorMessage);

function checkCredentials() {
    if (!loginInput.value || !passwordInput.value) {
        errorMessage.textContent = "Fields cannot be empty.";
        errorMessage.style.display = "block";
        submitBtn.disabled = true;
        return;
    }

    if (loginInput.value === correctLogin && passwordInput.value === correctPassword) {
        errorMessage.style.display = "none";
        submitBtn.disabled = false;

        localStorage.setItem("savedLogin", loginInput.value);
        localStorage.setItem("savedPassword", passwordInput.value);
    } else {
        errorMessage.textContent = "Invalid login or password.";
        errorMessage.style.display = "block";
        submitBtn.disabled = true;
    }
}

function loadSavedCredentials() {
    const savedLogin = localStorage.getItem("savedLogin");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedLogin === correctLogin && savedPassword === correctPassword) {
        loginInput.value = savedLogin;
        passwordInput.value = savedPassword;
        submitBtn.disabled = false;
    }
}

loginInput.addEventListener("input", checkCredentials);
passwordInput.addEventListener("input", checkCredentials);

submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.open("register.html");
});

loadSavedCredentials();

// ============ form animated =================
window.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    setTimeout(() => {
        loginForm.classList.remove("scale-95", "opacity-0");
        loginForm.classList.add("scale-100", "opacity-100");
    }, 250);
});
