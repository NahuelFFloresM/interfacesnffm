document.addEventListener("DOMContentLoaded", () => {
    let bgIteration = 1;
    let bgs = ["./assets/bg_veterinaria1.jpg", "./assets/bg_veterinaria2.jpg", "./assets/bg_veterinaria3.png",
    "./assets/bg_veterinaria4.jpg", "./assets/bg_veterinaria5.jpg", "./assets/bg_veterinaria6.jpg"];
    let animationContainer = document.getElementById("sign-animation-container");
    animationContainer.style.backgroundImage = "url('./assets/bg_veterinaria1.jpg')";
    setInterval(() => {
        animationContainer.style.backgroundImage = "url('"+bgs[bgIteration]+"')";
        if (bgs.length == bgIteration+1)
            bgIteration = 0;
        else
            bgIteration++;
    }, 8000);
    
    document.getElementById("login-link").onclick = () => {
        // window.location.href = ""; // loading page
        window.location.href = "./login.html";
    }

    let inputs = document.querySelectorAll(".form-input");
    let tooltips = document.querySelectorAll(".form-text");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].onclick = () => {
            inputs[i].classList.remove("invalid-input");
            tooltips[i].classList.add("hidden");
        }
    }
    document.getElementById("register-btn").onclick = () => {
        let isComplete = true;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value == "") {
                inputs[i].classList.add("invalid-input");
                tooltips[i].classList.remove("hidden");
                isComplete = false;
            }
        }
        console.log(inputs[0].value != "" && !inputs[0].value.includes("@"))
        if (inputs[0].value != "" && !inputs[0].value.includes("@")) {
            isComplete = false;
            tooltips[0].innerHTML = "El email debe contener un @";
            tooltips[0].classList.remove("hidden");
            inputs[0].classList.add("invalid-input");
        } else
            tooltips[0].innerHTML = "El campo debe ser completado";
        if (isComplete) 
            window.location.href = "./index.html";
    }
});
