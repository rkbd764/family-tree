const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePassword.innerText = 'Hide';
  } else {
    passwordInput.type = 'password';
    togglePassword.innerText = 'Show';
  }
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === 'russell' && password === 'R@12345') {
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid username or password');
  }
});
