/* BIBLIOGRAFÍA
      - DATASET.VALOR - (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
      - TIMEOUT - (https://developer.mozilla.org/es/docs/Web/API/Window/setTimeout)
      - VOLTEAR SIN PARPADEOS - (https://developer.mozilla.org/es/docs/Web/API/Element/transitionend_event)
      - INTERVAL (TEMPORIZADOR) - (https://es.javascript.info/settimeout-setinterval) 
*/

import {
  inicializarVidas,
  quitarVida,
  guardarEstadoJuego,
} from "./inicializaVidas.js";

class Carta {
  constructor(valor) {
    this.valor = valor; // Mi atributo a comparar por cada pareja será este. Un valor único con el que creo su par.
    this.volteada = false;
    this.encontrada = false;
  }

  voltear() {
    this.volteada = !this.volteada;
  }
}

let temas = ["tema1", "tema2", "tema3"];
let contadorTemas = parseInt(localStorage.getItem("temaIndex")) || 0;
document.documentElement.classList.add(temas[contadorTemas]);
let totalIntentos = 0;

window.addEventListener("DOMContentLoaded", function () {
  let temaGuardado = this.localStorage.getItem("temaIndex");
  if (temaGuardado !== null) {
    let temaActual = temas[parseInt(temaGuardado)];
    this.document.documentElement.classList.add(temaActual);
  }
});

// -*- FUNCIONES -*- //

// ? FUNCIÓN PARA REINICIAR LA WEB -
function reiniciarWeb() {
  location.reload(true);
}

// ? FUNCIÓN PARA GENERAR Y ALEATORIZAR LAS CARTAS -
function generarCartas(numParejas) {
  let cartas = [];
  for (let i = 1; i <= numParejas; i++) {
    cartas.push(new Carta(i), new Carta(i)); // Añado una carta con un índice, y la duplico.
  }
  return cartas.sort(() => Math.random() - 0.5);
}

// ? FUNCIÓN PARA VOLTEAR UNA CARTA -
let cartasSeleccionadas = [];
let aciertos = 0;

function voltearCarta(carta) {
  if (
    carta.classList.contains("encontrada") || 
    cartasSeleccionadas.length >= 2 ||
    cartasSeleccionadas.includes(carta)
  ) return;

  let temaUrl = temas[contadorTemas];
  let valorCarta = carta.dataset.valor;

  if (!carta.classList.contains("volteada")) {
    carta.classList.add("volteada");
    setTimeout(() => {
      carta.style.backgroundImage = `url(img/${temaUrl}/${valorCarta}.png)`;
    }, 125);
  }

  cartasSeleccionadas.push(carta);

  if (cartasSeleccionadas.length === 2) {
    setTimeout(() => {
      comprobarCartasVolteadas(cartasSeleccionadas[0], cartasSeleccionadas[1]);
      cartasSeleccionadas = [];
    }, 800);
  }
}


function comprobarCartasVolteadas(carta1, carta2) {
  totalIntentos++;
  if (carta1.dataset.valor === carta2.dataset.valor) {
    carta1.classList.add("encontrada");
    carta2.classList.add("encontrada");
    console.log(`Pareja encontrada: ${carta1.dataset.valor}`);
    aciertos++;

    if (aciertos === numParejas) {
      setTimeout(() => {
        guardarEstadoJuego("ganar");
        window.location.href = "win-lose.html";
      }, 500);
    }
  } else {
    setTimeout(() => {
      carta1.classList.remove("volteada");
      carta2.classList.remove("volteada");

      carta1.style.backgroundImage = "";
      carta2.style.backgroundImage = "";
      quitarVida();
    }, 400);
  }
  actualizarPorcentajeAciertos();
  actualizarParejasEncontradas();
}

// ? FUNCIÓN PARA GENERAR LOS DATOS DEL TABLERO SEGÚN OPCIONES DEL USUARIO -
function generarTablero(numCartas) {
  let cartasPorFila;
  let numFilas;

  if (numCartas === 12) {
    numFilas = 4;
    cartasPorFila = 3;
  } else if (numCartas === 16) {
    numFilas = 4;
    cartasPorFila = 4;
  } else {
    numFilas = 5;
    cartasPorFila = 4;
  }

  let cartas = generarCartas(numParejas);

  // - CREACIÓN DEL TABLERO -
  let indiceCarta = 0;
  for (let i = 0; i < numFilas; i++) {
    let nuevaFila = document.createElement("div");
    nuevaFila.classList.add("fila");

    for (let j = 0; j < cartasPorFila; j++) {
      if (indiceCarta >= cartas.length) break;

      let nuevaCarta = document.createElement("div");
      nuevaCarta.classList.add("carta");
      nuevaCarta.dataset.valor = cartas[indiceCarta].valor; // Asocio a cada carta su respectivo índice.
      nuevaCarta.addEventListener("click", () => voltearCarta(nuevaCarta));

      nuevaFila.appendChild(nuevaCarta);
      indiceCarta++;
    }
    contenedor.appendChild(nuevaFila);
  }
}

// -*- CONTENEDOR DE ABAJO "FOOTER" -*- //
document.getElementById("reiniciar").addEventListener("click", reiniciarWeb);
document.getElementById("elementoPorcentajeAciertos");
document.getElementById("elementoParejasEncontradas");
document.getElementById("elementoTiempoJuego");

// ? FUNCIÓN PARA ACTUALIZAR LA INFERFAZ DEL PORCENTAJE DE ACIERTOS -
function actualizarPorcentajeAciertos() {
  let porcentajeAciertos =
    totalIntentos === 0 ? 0 : (aciertos / totalIntentos) * 100;
  elementoPorcentajeAciertos.textContent = `${porcentajeAciertos.toFixed(2)}%`;
}

// ? FUNCIÓN PARA ACTUALIZAR LA INFERFAZ DE LAS PAREJAS ENCONTRADAS -
function actualizarParejasEncontradas() {
  elementoParejasEncontradas.textContent = `${aciertos}/${numParejas} encontradas`;
}

// ? FUNCIÓN PARA ADMINISTRAR EL TIEMPO DE JUEGO -
function actualizarTiempoJuego() {
  var tiempo = Number(
    prompt(
      "❓⌛ Seleccione el tiempo (en segundos) que desea establecer para la siguiente partida: "
    )
  );
  let temporizador = setInterval(() => {
    let minutos = Math.floor(tiempo / 60);
    let segundosRestantes = tiempo % 60;
    
    if(tiempo <= 15){
      elementoTiempoJuego.style.color = "tomato";
    }

    console.log(`Tiempo restante: ${minutos}:${segundosRestantes}`);
    if (segundosRestantes < 10) {
      elementoTiempoJuego.textContent = `${minutos}:0${segundosRestantes} restantes`;
    } else {
      elementoTiempoJuego.textContent = `${minutos}:${segundosRestantes} restantes`;
    }

    if (tiempo <= 0) {
      clearInterval(temporizador);
      guardarEstadoJuego("perder");
      window.location.href = "win-lose.html";
    }

    tiempo--;
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarPorcentajeAciertos();
  actualizarParejasEncontradas();
  actualizarTiempoJuego();
});

// -*- FLUJO DEL JUEGO -*- //
var numParejas = Number(
  prompt(
    "❓🃏 Seleccione el número de parejas con las que desea jugar:\n6 parejas (12 cartas)\n8 parejas (16 cartas)\n10 parejas (20 cartas)"
  )
);

inicializarVidas();

const parejasPosibles = [6, 8, 10];

try {
  if (!parejasPosibles.includes(numParejas)) {
    alert("Las únicas opciones permitidas son 6, 8 o 10 parejas.");
    throw new Error("Número de parejas no válido");
  }
} catch (error) {
  console.error(error);
  reiniciarWeb();
}

var numCartas = numParejas * 2;
let contenedor = document.querySelector("main");

generarTablero(numCartas);
