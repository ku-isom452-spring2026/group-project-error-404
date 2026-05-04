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
});