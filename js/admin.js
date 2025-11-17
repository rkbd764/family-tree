// js/admin.js

// ---------- Admin Login Info ----------
const ADMIN_USER = "russell";
const ADMIN_PASS = "R@12345";

// ---------- UI Elements ----------
const loginForm = document.getElementById("loginForm");
const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const rememberCheckbox = document.getElementById("rememberMe");


// ---------- Remember Me Restore ----------
if (localStorage.getItem("rememberAdmin") === "true") {
  usernameField.value = localStorage.getItem("adminUser") || "";
  passwordField.value = localStorage.getItem("adminPass") || "";
  rememberCheckbox.checked = true;
}


// ---------- Password Show / Hide ----------
togglePasswordBtn.addEventListener("click", function () {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePasswordBtn.innerText = "Hide";
  } else {
    passwordField.type = "password";
    togglePasswordBtn.innerText = "Show";
  }
});


// ---------- Login Form Submit ----------
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = usernameField.value.trim();
  const pass = passwordField.value.trim();

  if (user === ADMIN_USER && pass === ADMIN_PASS) {

    // Remember Me
    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberAdmin", "true");
      localStorage.setItem("adminUser", user);
      localStorage.setItem("adminPass", pass);
    } else {
      localStorage.removeItem("rememberAdmin");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("adminPass");
    }

    // Redirect to Dashboard
    window.location.href = "dashboard.html";

  } else {
    alert("⚠️ Wrong Username or Password");
  }
});
