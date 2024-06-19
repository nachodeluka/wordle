window.addEventListener('load', inicio);

let palabra = "pelos";
let intentos = 6;
let filasTablero = [];
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
    let botones = document.querySelectorAll(".letra");

    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            let letra = boton.textContent;

            if (seleccion.length >= 5) return;
            seleccion.push(letra);
            agregarLetraTablero(letra, boton);

        });
    });

    document.getElementById("borrar").addEventListener("click", borrar);
    document.getElementById("enviar").addEventListener("click", enviar);
}

function agregarLetraTablero(letra, boton) {
    let tablero = document.querySelector(".tablero");
    let row = tablero.children[filaActual];
    let cell = row.children[seleccion.length - 1];
    cell.id = letra;
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

    return resultado;
}

function borrar() {
    if (seleccion.length == 0) return;
    let tablero = document.querySelector(".tablero");
    let row = tablero.children[filaActual];
    let cell = row.children[seleccion.length - 1];
    cell.innerHTML = "";
    seleccion.pop();
}

function enviar() {
    let verif = verificarPalabra();

    if (!verif) {
        return alert("Debes completar la fila antes de enviar.")
    }

    let contadorCorrectas = 0;
    for (let letra of verif) {
        let elementos = document.querySelectorAll(`#${letra.letraSeleccionada}`);

        let colores = { correcto: "#43a047", lugar: "#e4a81d", incorrecto: "#757575" }

        verif.color = colores[letra.estado];

        for (let tecla of elementos) {
            tecla.style.backgroundColor = colores[letra.estado];
        }

        if (letra.estado == "correcto") {
            contadorCorrectas++;
        }
    }

    filasTablero.push(verif)
    filaActual++;
    intentos--;
    seleccion = [];

    if (contadorCorrectas == 5) {
        return alert(`Ganaste!!!!! Intentos usados: ${6 - intentos}/6.`)
    }
}