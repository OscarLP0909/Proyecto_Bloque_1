// ===============================
// VALIDACIÓN FORMULARIO CONTACTO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        clearErrors();

        let isValid = true;

        // EMAIL
        if (!emailInput.value.trim()) {
            showError(emailInput, "El correo electrónico es obligatorio");
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, "El formato del correo no es válido");
            isValid = false;
        }

        // ASUNTO
        if (!subjectInput.value.trim()) {
            showError(subjectInput, "El asunto es obligatorio");
            isValid = false;
        } else if (subjectInput.value.length < 3) {
            showError(subjectInput, "El asunto debe tener al menos 3 caracteres");
            isValid = false;
        }

        // MENSAJE
        if (!messageInput.value.trim()) {
            showError(messageInput, "El mensaje es obligatorio");
            isValid = false;
        } else if (messageInput.value.length < 10) {
            showError(messageInput, "El mensaje debe tener al menos 10 caracteres");
            isValid = false;
        }

        // RESULTADO FINAL
        if (isValid) {
            alert("Formulario enviado correctamente ✔");

            form.reset();
        }
    });
});

// ===============================
// FUNCIONES AUXILIARES
// ===============================

function showError(input, message) {
    const formGroup = input.closest(".form__group");

    const error = document.createElement("small");
    error.classList.add("form-error");
    error.innerText = message;

    input.classList.add("input-error");
    formGroup.appendChild(error);
}

function clearErrors() {
    document.querySelectorAll(".form-error").forEach(error => error.remove());
    document.querySelectorAll(".input-error").forEach(input => {
        input.classList.remove("input-error");
    });
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
