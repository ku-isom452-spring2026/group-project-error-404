document.addEventListener("DOMContentLoaded", () => {
  // Mobile Sidebar Toggle
  const menuToggles = document.querySelectorAll(".menu-toggle");
  const sidebar = document.getElementById("sidebar");

  if (sidebar) {
    menuToggles.forEach(toggle => {
      toggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });
    });
  }

  // Form Handling
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "homepage.html";
    });
  }

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }

  const createPostForm = document.getElementById("create-post-form");
  if (createPostForm) {
    createPostForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "homepage.html";
    });
  }

  const settingsForm = document.getElementById("settings-form");
  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Settings saved successfully!");
    });
  }
});