window.addEventListener('load', inicio);

let palabra = "pelos";
let intentos = 6;
let letras = [];
let letrasCorrectas = [];
let letrasIncorrectas = [];
let filaActual = 0;

let seleccion = [];

// function cargarTablero() {
//     let tablero = document.querySelector(".tablero");

//     for (let i = 0; i < 6; i++) {
//         let row = document.createElement("div");
//         row.classList.add("row");
//         tablero.appendChild(row);
//         for (let j = 0; j < palabra.length; j++) {
//             let cell = document.createElement("div");
//             cell.classList.add("cell");
//             row.appendChild(cell);
//         }
//     }
// }

function inicio() {
    let botones = document.querySelectorAll("#letra");

    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            let letra = boton.textContent;

            if (seleccion.length >= 5) return;
            seleccion.push(letra);
            agregarLetraTablero(letra, boton);

        });
    });
}

function agregarLetraTablero(letra, boton) {
    let tablero = document.querySelector(".tablero");
    let row = tablero.children[filaActual];
    let cell = row.children[seleccion.length - 1];
    cell.innerHTML = letra;
}

function verificarPalabra() {
    let resultado = [];

    if (seleccion.length < 5) return;

    for (let i = 0; i < palabra.length; i++) {
        let letra = palabra[i];
        let letraSeleccionada = seleccion[i];

        if (letra === letraSeleccionada) {
            resultado.push({
                letraSeleccionada,
                estado: "correcto"
            })
        } else if (palabra.includes(letraSeleccionada)) {
            resultado.push({
                letraSeleccionada,
                lugarCorrecto: palabra.indexOf(letraSeleccionada),
                estado: "lugar"
            })
        } else {
            resultado.push({
                letraSeleccionada,
                estado: "incorrecto"
            })
        }
    }

    console.log(resultado)
}