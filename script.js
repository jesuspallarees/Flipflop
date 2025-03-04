/* BIBLIOGRAFÍA
      - CAMBIO DE TEMA - (https://carontestudio.com/blog/anadir-tema-oscuro-css-javascript/)
      - GUARDAR ÚLTIMO ESTADO DE UN OBJETO - (https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)
*/

let contadorTemas = 0;
let temas = ['tema1', 'tema2', 'tema3'];

let temaGuardado = localStorage.getItem("temaIndex");
if (temaGuardado !== null) {
    contadorTemas = parseInt(temaGuardado);
}

let comenzarPartida = document.getElementById("comenzarPartida").addEventListener("click", function (){
    console.log("Ronda empezada, configurando la partida.");
});

// -*- CONFIGURACIÓN DE TEMA -*-

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
    imgElemento.src = `img/tema${contadorTemas}.png`;
    imgElemento.alt = `Tema ${contadorTemas}`;
    console.log("Tema cambiado a:", temas[contadorTemas]);
});

