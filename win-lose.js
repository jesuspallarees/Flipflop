let contadorTemas = 0;
let temas = ['tema1', 'tema2', 'tema3'];
let temaGuardado = localStorage.getItem("temaIndex");
let ganarOPerder = document.querySelector("h1");
let estadoJuego = localStorage.getItem("estadoJuego");
if (temaGuardado !== null) {
    contadorTemas = parseInt(temaGuardado);
}

let otraPartida = document.getElementById("otraPartida").addEventListener("click", function (){
    console.log("Otra partida, cargando configuración.");
});

window.addEventListener("DOMContentLoaded", function () {
    let ultimoTema = localStorage.getItem("temaIndex");
    if (ultimoTema !== null) {
        contadorTemas = parseInt(ultimoTema);
        document.getElementById("temaImagen").src = `img/tema${contadorTemas}.png`;
        document.documentElement.classList.add(temas[contadorTemas]);
    }
});

document.documentElement.classList.add(temas[contadorTemas]);

document.getElementById("cambiarTema").addEventListener("click", function () {
    document.documentElement.classList.remove(temas[contadorTemas]);

    if (contadorTemas == 2)
        contadorTemas = 0;
    else
        contadorTemas++;

    document.documentElement.classList.add(temas[contadorTemas]);
    localStorage.setItem("temaIndex", contadorTemas);
    let imgElemento = document.getElementById("temaImagen");
    imgElemento.src = `./img/tema${contadorTemas}.png`;
    imgElemento.alt = `Tema ${contadorTemas}`;
    console.log("Tema cambiado a:", temas[contadorTemas]);
});

if (estadoJuego === "ganar") {
    ganarOPerder.textContent = "¡HAS GANADO!";
    console.log("El jugador ha ganado.");
} else if (estadoJuego === "perder") {
    ganarOPerder.textContent = "¡PERDISTE!";
    console.log("El jugador ha perdido.");
}
