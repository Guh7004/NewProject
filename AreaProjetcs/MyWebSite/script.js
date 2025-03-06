document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Verifica se há preferência salva
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }
    
    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            themeToggle.textContent = "🌙";
        }
    });
});
