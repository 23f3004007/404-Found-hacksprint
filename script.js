document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const userType = document.getElementById("user-type").value;
  
        if (!email || !password || !userType) {
          alert("Please fill in all fields!");
          return;
        }
  
        alert(`Welcome back, ${userType}!`);
        // Add actual login logic here.
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const userType = document.getElementById("register-user-type").value;
  
        if (!name || !email || !password || !userType) {
          alert("Please fill in all fields!");
          return;
        }
  
        alert(`Welcome, ${name}! You are registered as a ${userType}.`);
        // Add actual registration logic here.
      });
    }
  });
  