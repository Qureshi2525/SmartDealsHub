const btn = document.getElementById("darkModeBtn");

// Previous setting load
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    btn.innerHTML = "☀️";
}

btn.addEventListener("click", ()=>{

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");
        btn.innerHTML = "☀️";

    }else{

        localStorage.setItem("theme","light");
        btn.innerHTML = "🌙";

    }

});