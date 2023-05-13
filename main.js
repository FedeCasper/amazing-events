// import { array } from "./module/functions"
import { imprimirNumeroCards, renderizarCards, renderizaChechboxs, filtraPorInputText, filtraPorCheckbox, filtraCruzado, printMostPopular } from "./module/functions.js";

const url = "https://mindhub-xj03.onrender.com/api/amazing"
let contenedorCards = document.getElementById('contenedorCards');
let contadorCards = document.getElementById('contadorCards')
let leftList = document.querySelector('.top3')
let rightList = document.querySelector('.top6')


fetch(url)
.then(response => response.json())
.then(data => {
     let arrayEventos = data.events
     renderizarCards(arrayEventos, contenedorCards)
     let contenedorCheckboxs = document.getElementById('contenedorCheckboxs');
     renderizaChechboxs(arrayEventos, contenedorCheckboxs )
     let botonBuscar = document.getElementById('botonBuscar')
     let inputText = document.getElementById('inputText')
     let checkboxs = document.querySelectorAll('input[type="checkbox"]')
     botonBuscar.addEventListener('click', () => filtraCruzado(checkboxs, arrayEventos, inputText))
     checkboxs.forEach(checkbox => checkbox.addEventListener('change', () => filtraCruzado(checkboxs, arrayEventos, inputText)))
     printMostPopular(arrayEventos, leftList, rightList)
})
.catch(error => console.error(error))


