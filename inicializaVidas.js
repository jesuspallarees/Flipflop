let vidas = document.querySelector(".vidas");
let numVidas = prompt(
  "❓💞 Ingresa el número de intentos permitidos para el siguiente juego: "
);

// ? FUNCIÓN PARA INICIALIZAR LAS VIDAS SEGÚN SI ES MAYOR O MENOR A 5 -
function inicializarVidas() {
  if (numVidas > 5) {
    contadorVidas.style.fontSize = "80px";
    contadorVidas.textContent = numVidas;
    vidas.appendChild(contadorVidas);
    let img = document.createElement("img");
    img.src = "img/vidas.png";
    img.alt = "vidas";
    img.width = 80;
    vidas.appendChild(img);
  } else {
    for (let i = 0; i < numVidas; i++) {
      let img = document.createElement("img");
      img.src = "img/vidas.png";
      img.alt = "vidas";
      img.width = 80;
      vidas.appendChild(img);
    }
  }
}

// ? FUNCIÓN PARA GUARDAR "GANAR" O "PERDER" EN LOCALSTORAGE -
function guardarEstadoJuego(resultado) {
  localStorage.setItem("estadoJuego", resultado);
}

// ? FUNCIÓN ACTUALIZAR LA INTERFAZ SEGÚN EL NÚMERO DE VIDAS -
const contenedorVidas = document.querySelector(".vidas");
let contadorVidas = document.createElement("h1");

function actualizarContadorVidas() {
  contenedorVidas.innerHTML = "";

  if (numVidas > 5) {
    contadorVidas.style.fontSize = "60px";
    contadorVidas.textContent = numVidas;
    contenedorVidas.appendChild(contadorVidas);
    let img = document.createElement("img");
    img.src = "img/vidas.png";
    img.alt = "vidas";
    img.width = 80;
    contenedorVidas.appendChild(img);
  } else {
    contadorVidas.textContent = "";
    for (let i = 0; i < numVidas; i++) {
      let img = document.createElement("img");
      img.src = "img/vidas.png";
      img.alt = "vida";
      img.width = 80;
      contenedorVidas.appendChild(img);
    }
  }
}

// ? FUNCIÓN QUITAR VIDAS -
function quitarVida() {
  if (numVidas > 0) {
    numVidas--;
    actualizarContadorVidas();
    console.log("Fallo. Vidas restantes: " + numVidas);

    if (numVidas === 0) {
      guardarEstadoJuego("perder");
      window.location.href = "win-lose.html";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorVidas();
});

export { vidas, numVidas, inicializarVidas, quitarVida, guardarEstadoJuego };
