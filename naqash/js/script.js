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

  // Validation Helpers
  function showError(inputElement, message) {
    let errorDiv = inputElement.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains("error-message")) {
      errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    inputElement.classList.add("input-error");
  }

  function clearError(inputElement) {
    let errorDiv = inputElement.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains("error-message")) {
      errorDiv.style.display = "none";
      errorDiv.textContent = "";
    }
    inputElement.classList.remove("input-error");
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Form Handling
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      let isValid = true;

      [usernameInput, passwordInput].forEach(clearError);

      if (usernameInput.value.trim() === "") {
        showError(usernameInput, "Username is required.");
        isValid = false;
      }

      if (passwordInput.value.trim() === "") {
        showError(passwordInput, "Password is required.");
        isValid = false;
      }

      if (isValid) {
        window.location.href = "homepage.html";
      }
    });
  }

  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const username = document.getElementById("reg-username");
      const email = document.getElementById("reg-email");
      const password = document.getElementById("reg-password");
      const confirmPassword = document.getElementById("confirm-password");
      let isValid = true;

      [username, email, password, confirmPassword].forEach(clearError);

      if (username.value.trim() === "") {
        showError(username, "Username is required.");
        isValid = false;
      }
      
      if (email.value.trim() === "") {
        showError(email, "Email is required.");
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
      }

      if (password.value.trim().length < 6) {
        showError(password, "Password must be at least 6 characters.");
        isValid = false;
      }

      if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "Passwords do not match.");
        isValid = false;
      }

      if (isValid) {
        window.location.href = "login.html";
      }
    });
  }

  // Create Post Tabs
  const createPostTabs = document.getElementById("create-post-tabs");
  if (createPostTabs) {
    const buttons = createPostTabs.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".post-input-section");

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        sections.forEach(sec => sec.style.display = "none");

        const targetId = `input-section-${btn.getAttribute("data-target")}`;
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.style.display = "block";
        }
      });
    });
  }

  const createPostForm = document.getElementById("create-post-form");
  if (createPostForm) {
    createPostForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const title = document.getElementById("title");
      let isValid = true;

      clearError(title);

      if (title.value.trim() === "") {
        showError(title, "Title is required.");
        isValid = false;
      }

      const activeTab = document.querySelector("#create-post-tabs .is-active");
      const targetType = activeTab ? activeTab.getAttribute("data-target") : "text";

      if (targetType === "text") {
        const content = document.getElementById("content");
        clearError(content);
        if (content.value.trim() === "") {
          showError(content, "Post content cannot be empty.");
          isValid = false;
        }
      } else if (targetType === "image") {
        const imageUpload = document.getElementById("image-upload");
        clearError(imageUpload);
        if (imageUpload.files.length === 0) {
          showError(imageUpload, "Please select an image.");
          isValid = false;
        }
      } else if (targetType === "video") {
        const videoUrl = document.getElementById("video-url");
        clearError(videoUrl);
        if (videoUrl.value.trim() === "") {
          showError(videoUrl, "Video URL is required.");
          isValid = false;
        }
      } else if (targetType === "link") {
        const linkUrl = document.getElementById("link-url");
        clearError(linkUrl);
        if (linkUrl.value.trim() === "") {
          showError(linkUrl, "Link URL is required.");
          isValid = false;
        }
      }

      if (isValid) {
        window.location.href = "homepage.html";
      }
    });
  }

  const settingsForm = document.getElementById("settings-form");
  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const displayName = document.getElementById("display-name");
      const email = document.getElementById("email");
      let isValid = true;

      [displayName, email].forEach(clearError);

      if (displayName.value.trim() === "") {
        showError(displayName, "Display name is required.");
        isValid = false;
      }

      if (email.value.trim() !== "" && !isValidEmail(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
      }

      if (isValid) {
        alert("Settings saved successfully!");
      }
    });
  }
});