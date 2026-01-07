const check = document.getElementById("checkbox");
const accept = document.getElementById("accept__button");
const back = document.getElementById("return__button");

if(localStorage.getItem("cookiesAccepted") === "true") {
    window.location.href = "drivers.html";
}

accept.addEventListener("click", (event) => {
    event.preventDefault();
    if (!check.checked) {
        window.alert(`Necesitas aceptar las cookies para poder continuar`);
        return;
    }

    localStorage.setItem("cookiesAccepted", "true");

    window.location.href = "drivers.html";
});

back.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "index.html";
})
