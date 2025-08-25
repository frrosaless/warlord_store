const form = document.querySelector("form");
const campos = {
    fullname: {
        required: true,
        regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/,
        error: {
            required: "El nombre es obligatorio.",
            length: "El nombre debe tener entre 3 y 50 caracteres.",
            format: "Solo se permiten letras, espacios, eñes y tildes."
        }
    },
    username: {
        required: true,
        regex: /^[A-Za-z0-9_]{3,20}$/,
        error: {
            required: "El nombre de usuario es obligatorio.",
            length: "El nombre de usuario debe tener entre 3 y 20 caracteres.",
            format: "Solo se permiten letras, números y guiones bajos."
        }
    },
    email: {
        required: true,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        error: {
            required: "El correo electrónico es obligatorio.",
            format: "El correo electrónico no es válido."
        }
    },
    password: {
        required: true,
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/,
        error: {
            required: "La contraseña es obligatoria.",
            format: "La contraseña debe tener entre 8 y 16 caracteres, incluyendo una mayúscula, una minúscula y un número."
        }
    },
    confirmPassword: {
        required: true,
        matchField: "password",
        error: {
            required: "La confirmación de la contraseña es obligatoria.",
            match: "Las contraseñas no coinciden."
        }
    },
    birthdate: {
        required: true,
        error: {
            required: "La fecha de nacimiento es obligatoria.",
            age: "Debes tener al menos 13 años para registrarte."
        }
    },
    address: {
        required: false,
        regex: /^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ\s,.-]{0,100}$/,
        error: {
            length: "La dirección debe tener hasta 100 caracteres.",
            format: "La dirección contiene caracteres no permitidos."
        }
    }
};

function mostrarError(id, mensaje) {
    const input = document.getElementById(id);
    input.classList.add("is-invalid");
    document.getElementById("error-" + id).textContent = mensaje;
}

function limpiarError(id) {
    const input = document.getElementById(id);
    input.classList.remove("is-invalid");
    document.getElementById("error-" + id).textContent = "";
}        

form.addEventListener("submit", function(event) {
    let valido = true;

    Object.keys(campos).forEach(campo => limpiarError(campo));

    const fullname = form.fullname.value.trim();
    if(campos.fullname.required) {
        const fullname = form.fullname.value.trim();
        if(fullname === "") {
            mostrarError("fullname", campos.fullname.error.required);
            valido = false;
        } else if(fullname.length < 3 || fullname.length > 50) {
            mostrarError("fullname", campos.fullname.error.length);
            valido = false;
        } else if(!campos.fullname.regex.test(fullname)) {
            mostrarError("fullname", campos.fullname.error.format);
            valido = false;
        }
    }

    const username = form.username.value.trim();
    if(campos.username.required) {
        if(username === "") {
            mostrarError("username", campos.username.error.required);
            valido = false;
        } else if(username.length < 3 || username.length > 20) {
            mostrarError("username", campos.username.error.length);
            valido = false;
        } else if(!campos.username.regex.test(username)) {
            mostrarError("username", campos.username.error.format);
            valido = false;
        }
    }

    const email = form.email.value.trim();
    if(campos.email.required) {
        if(email === "") {
            mostrarError("email", campos.email.error.required);
            valido = false;
        } else if(!campos.email.regex.test(email)) {
            mostrarError("email", campos.email.error.format);
            valido = false;
        }
    }

    const password = form.password.value;
    if(campos.password.required) {
        if(password === "") {
            mostrarError("password", campos.password.error.required);
            valido = false;
        } else if(!campos.password.regex.test(password)) {
            mostrarError("password", campos.password.error.format);
            valido = false;
        }
    }

    const confirmPassword = form.confirmPassword.value;
    if(campos.confirmPassword.required) {   
        if(confirmPassword === "") {
            mostrarError("confirmPassword", campos.confirmPassword.error.required);
            valido = false;
        } else if(confirmPassword !== password) {
            mostrarError("confirmPassword", campos.confirmPassword.error.match);
            valido = false;
        }
    }

    const birthdate = form.birthdate.value;
    if(campos.birthdate.required) {
        if(birthdate === "") {
            mostrarError("birthdate", campos.birthdate.error.required);
            valido = false;
        } else {
            const fechaNacimiento = new Date(birthdate);
            const hoy = new Date();
            const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
            const mes = hoy.getMonth() - fechaNacimiento.getMonth();
            if(mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }
            if(edad < 13) {
                mostrarError("birthdate", campos.birthdate.error.age);
                valido = false;
            }
        }
    }

    const address = form.address.value.trim();
    if(address) {
        if(address.length > 100) {
            mostrarError("address", campos.address.error.length);
            valido = false;
        } else if(!campos.address.regex.test(address)) {
            mostrarError("address", campos.address.error.format);
            valido = false;
        }
    }

    if(!valido) {
        event.preventDefault();
    }

});

Object.keys(campos).forEach(campo => {
    const input = document.getElementById(campo);
    input.addEventListener("input", function() {
        limpiarError(campo);
    });
});