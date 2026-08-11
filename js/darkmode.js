// =====================================
// SmartDealsHub Dark Mode
// =====================================

const btn = document.getElementById("darkModeBtn");

// If dark mode button does not exist on this page,
// stop without causing a JavaScript error.
if (btn) {

    // Previous setting load
    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");
        btn.innerHTML = "☀️";

    } else {

        btn.innerHTML = "🌙";

    }

    // Dark mode button
    btn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");
            btn.innerHTML = "☀️";

        } else {

            localStorage.setItem("theme", "light");
            btn.innerHTML = "🌙";

        }

    });

}