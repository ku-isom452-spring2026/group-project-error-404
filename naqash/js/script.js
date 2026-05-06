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

  // Handle displaying logged in user
  const currentUser = localStorage.getItem("naqash_currentUser");
  const navLinksContainer = document.querySelector(".nav-links");
  
  if (currentUser && navLinksContainer) {
      navLinksContainer.innerHTML = `
          <span style="color: var(--text-color); font-weight: 500; margin-right: 15px;">Welcome, ${currentUser}</span>
          <a href="#" id="logout-btn" class="btn btn-outline">Logout</a>
      `;
      
      document.getElementById("logout-btn").addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("naqash_currentUser");
          window.location.reload();
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
        localStorage.setItem("naqash_currentUser", usernameInput.value.trim());
        showToast("Logging in...");
        setTimeout(() => window.location.href = "homepage.html", 1000);
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
        localStorage.setItem("naqash_currentUser", username.value.trim());
        showToast("Registration successful!");
        setTimeout(() => window.location.href = "homepage.html", 1000);
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
        const posts = JSON.parse(localStorage.getItem('naqash_posts') || '[]');
        
        let contentText = "";
        if (targetType === "text") {
            contentText = document.getElementById("content").value.trim();
        } else if (targetType === "image") {
            contentText = "[Image Post attached]";
        } else if (targetType === "video") {
            contentText = "[Video: " + document.getElementById("video-url").value.trim() + "]";
        } else if (targetType === "link") {
            contentText = "[Link: " + document.getElementById("link-url").value.trim() + "]";
        }
        
        const newPost = {
            id: Date.now().toString(),
            community: document.getElementById("community").value,
            title: title.value.trim(),
            content: contentText,
            timestamp: new Date().toISOString()
        };
        
        const urlParams = new URLSearchParams(window.location.search);
        const editId = urlParams.get('edit');
        if (editId) {
            const index = posts.findIndex(p => p.id === editId);
            if (index > -1) {
                newPost.id = editId;
                newPost.timestamp = posts[index].timestamp;
                posts[index] = newPost;
            } else {
                posts.unshift(newPost);
            }
        } else {
            posts.unshift(newPost);
        }
        
        localStorage.setItem('naqash_posts', JSON.stringify(posts));

        showToast(editId ? "Updating..." : "Posting...");
        setTimeout(() => window.location.href = editId ? "dashboard.html" : "homepage.html", 1000);
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
        showToast("Settings saved successfully!");
      }
    });
  }

  // Comment Form Validation
  const commentForm = document.getElementById("comment-form");
  if (commentForm) {
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const commentInput = document.getElementById("comment-input");
      clearError(commentInput);
      if (commentInput.value.trim() === "") {
        showError(commentInput, "Comment cannot be empty.");
      } else {
        const commentsList = document.getElementById("comments-list");
        const commentText = commentInput.value.trim();

        if (commentsList) {
          const comments = JSON.parse(localStorage.getItem('naqash_comments') || '[]');
          comments.unshift(commentText);
          localStorage.setItem('naqash_comments', JSON.stringify(comments));

          const newComment = document.createElement("div");
          newComment.className = "comment";
          
          const strong = document.createElement("strong");
          strong.textContent = "u/CurrentUser:";
          
          const p = document.createElement("p");
          p.textContent = commentText;
          
          newComment.appendChild(strong);
          newComment.appendChild(p);
          
          commentsList.insertBefore(newComment, commentsList.firstChild);
        }

        showToast("Comment posted successfully!");
        commentInput.value = "";
      }
    });
  }

  // Search Form Validation
  const searchForms = document.querySelectorAll(".search-form");
  searchForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      const searchInput = form.querySelector(".search-bar");
      if (searchInput) {
        clearError(searchInput);
        if (searchInput.value.trim() === "") {
          e.preventDefault();
          showError(searchInput, "Please enter a search term.");
        }
      }
    });
  });

  // Toast Notification System
  window.showToast = function(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
      if (container.childElementCount === 0) {
        container.remove();
      }
    }, 3000);
  };

  // Active Navigation State
  const currentPath = window.location.pathname.split("/").pop() || "homepage.html";
  const navLinks = document.querySelectorAll("#sidebar nav a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Password Visibility Toggle
  const togglePasswords = document.querySelectorAll(".toggle-password");
  togglePasswords.forEach(btn => {
    btn.addEventListener("click", () => {
      const input = btn.previousElementSibling;
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    });
  });

  // Dynamic Homepage Posts
  const isHomepage = window.location.pathname.endsWith("homepage.html") || window.location.pathname.endsWith("/") || window.location.pathname === "";
  if (isHomepage) {
    const feed = document.querySelector("main.feed");
    if (feed) {
      const posts = JSON.parse(localStorage.getItem('naqash_posts') || '[]');
      
      posts.slice().reverse().forEach(post => {
        const article = document.createElement("article");
        article.className = "card post-card";
        
        const mainContent = document.createElement("div");
        mainContent.className = "post-main-content";
        
        const header = document.createElement("div");
        header.className = "post-header";
        header.textContent = `${post.community} • Just now`;
        
        const titleLink = document.createElement("a");
        titleLink.href = "post.html";
        titleLink.className = "post-title";
        titleLink.textContent = post.title;
        
        const body = document.createElement("p");
        body.className = "post-body";
        body.textContent = post.content;
        
        mainContent.appendChild(header);
        mainContent.appendChild(titleLink);
        mainContent.appendChild(body);
        
        const voteSection = document.createElement("div");
        voteSection.className = "vote-section";
        
        const footerMeta = document.createElement("a");
        footerMeta.href = "post.html";
        footerMeta.style.textDecoration = "none";
        footerMeta.className = "footer-meta";
        footerMeta.innerHTML = `<img src="images/comment.png" alt="Comments" class="comment-icon" /> 0 Comments`;
        
        voteSection.appendChild(footerMeta);
        
        article.appendChild(mainContent);
        article.appendChild(voteSection);
        
        feed.insertBefore(article, feed.firstChild);
      });
    }
  }

  // Dynamic Post Comments
  const isPostPage = window.location.pathname.endsWith("post.html");
  if (isPostPage) {
    const commentsList = document.getElementById("comments-list");
    if (commentsList) {
      const comments = JSON.parse(localStorage.getItem('naqash_comments') || '[]');
      
      comments.slice().reverse().forEach(commentText => {
        const newComment = document.createElement("div");
        newComment.className = "comment";
        
        const strong = document.createElement("strong");
        strong.textContent = "u/CurrentUser:";
        
        const p = document.createElement("p");
        p.textContent = commentText;
        
        newComment.appendChild(strong);
        newComment.appendChild(p);
        
        commentsList.insertBefore(newComment, commentsList.firstChild);
      });
    }
  }

  // Pre-fill create-post form if editing
  const isCreatePost = window.location.pathname.endsWith("create-post.html");
  if (isCreatePost) {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
      const posts = JSON.parse(localStorage.getItem('naqash_posts') || '[]');
      const postToEdit = posts.find(p => p.id === editId);
      if (postToEdit) {
        const titleInput = document.getElementById("title");
        if (titleInput) titleInput.value = postToEdit.title;
        const contentInput = document.getElementById("content");
        if (contentInput) {
          contentInput.value = postToEdit.content;
        }
        const submitBtn = document.querySelector("#create-post-form button[type='submit']");
        if (submitBtn) submitBtn.textContent = "Save Changes";
        const pageTitle = document.querySelector(".create-post-box h2");
        if (pageTitle) pageTitle.textContent = "Edit Post";
      }
    }
  }

  // Dynamic Dashboard Posts
  const isDashboard = window.location.pathname.endsWith("dashboard.html");
  if (isDashboard) {
    const dashboardPostsList = document.getElementById("dashboard-posts-list");
    if (dashboardPostsList) {
      function renderDashboardPosts() {
        dashboardPostsList.innerHTML = "";
        const posts = JSON.parse(localStorage.getItem('naqash_posts') || '[]');
        
        if (posts.length === 0) {
            dashboardPostsList.innerHTML = "<p style='color: var(--text-muted);'>No posts yet. Create one!</p>";
            return;
        }

        posts.forEach((post, index) => {
          // ensure id exists for older posts
          if (!post.id) {
              post.id = Date.now().toString() + index;
              posts[index] = post;
              localStorage.setItem('naqash_posts', JSON.stringify(posts));
          }

          const article = document.createElement("article");
          article.className = "dashboard-post";
          
          const infoDiv = document.createElement("div");
          infoDiv.className = "dashboard-post-info";
          
          const titleLink = document.createElement("a");
          titleLink.href = "post.html";
          titleLink.className = "post-title";
          titleLink.textContent = post.title;
          
          const timeText = post.timestamp ? new Date(post.timestamp).toLocaleDateString() : "Just now";
          const headerP = document.createElement("p");
          headerP.className = "post-header";
          headerP.textContent = `${post.community} • ${timeText}`;
          
          infoDiv.appendChild(titleLink);
          infoDiv.appendChild(headerP);
          
          const actionsDiv = document.createElement("div");
          actionsDiv.className = "dashboard-post-actions";
          
          const editBtn = document.createElement("a");
          editBtn.href = `create-post.html?edit=${post.id}`;
          editBtn.className = "btn btn-outline";
          editBtn.textContent = "Edit";
          
          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-primary";
          deleteBtn.type = "button";
          deleteBtn.textContent = "Delete";
          deleteBtn.onclick = () => {
             if (confirm("Are you sure you want to delete this post?")) {
                 posts.splice(index, 1);
                 localStorage.setItem('naqash_posts', JSON.stringify(posts));
                 renderDashboardPosts();
                 showToast("Post deleted!");
             }
          };
          
          actionsDiv.appendChild(editBtn);
          actionsDiv.appendChild(deleteBtn);
          
          article.appendChild(infoDiv);
          article.appendChild(actionsDiv);
          
          dashboardPostsList.appendChild(article);
        });
      }
      
      renderDashboardPosts();
    }
  }
});