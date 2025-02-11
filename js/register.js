const correctLogin = "admin";
        const correctPassword = "1234";

        const loginInput = document.getElementById("login");
        const passwordInput = document.getElementById("password");
        const submitBtn = document.getElementById("submitBtn");

        function checkCredentials() {
            if (loginInput.value === correctLogin && passwordInput.value === correctPassword) {
                submitBtn.disabled = false;

                localStorage.setItem("savedLogin", loginInput.value);
                localStorage.setItem("savedPassword", passwordInput.value);
            } else {
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

        submitBtn.addEventListener("click", function() {
            window.open("main.html");
        });

        loadSavedCredentials();

// ============== animated form ================
    window.addEventListener("DOMContentLoaded", () => {
        const registerForm = document.getElementById("registerForm");
        setTimeout(() => {
          registerForm.classList.remove("scale-95", "opacity-0");
          registerForm.classList.add("scale-100", "opacity-100");
        }, 300);
      });