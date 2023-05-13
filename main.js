// import { array } from "./module/functions"
import { imprimirNumeroCards, renderizarCards, renderizaChechboxs, filtraPorInputText, filtraPorCheckbox, filtraCruzado } from "./module/functions.js";

const url = "https://mindhub-xj03.onrender.com/api/amazing"
let contenedorCards = document.getElementById('contenedorCards');
let contadorCards = document.getElementById('contadorCards')
let contenedorPopulares = document.getElementById('contenedorPopulares')
let listIzquierdo = document.querySelector('.top3')
let listDerecho = document.querySelector('.top6')


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

     // let fiter = arrayEventos.map(elemento => elemento.assistance ? 
     //      {
     //           name: elemento.name,
     //           assistance: elemento.assistance} : 
     //      {name: elemento.name, estimate: elemento.estimate})
     // console.log(fiter);
     let fiterSorted = arrayEventos.sort((a,b) => (a.assistance ? a.assistance : a.estimate) - (b.assistance ? b.assistance : b.estimate))
     console.log(fiterSorted);
     let top6 = fiterSorted.slice(-6)
     console.log(top6);
     let top3 = top6.slice(-3)
     let topRest = top6.slice(0,3)
     console.log(topRest);
     console.log(top3);

     function printTop6 (){

          top3.forEach((elemento, indice) => 
               listIzquierdo.innerHTML +=
                    `
                    <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                         <h5 class="mb-1">#${indice} ${elemento.name}</h5>
                         <small>3 days ago</small>
                    </div>
                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                    <small class="date">${elemento.date}</small>
               </a>
                    `
          )

          topRest.forEach((elemento, indice) => 
          listDerecho.innerHTML +=
                    `
                    <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                         <h5 class="mb-1">#${indice} ${elemento.name}</h5>
                         <small>3 days ago</small>
                    </div>
                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                    <small class="date">${elemento.date}</small>
               </a>
                    `
          )
     }
     printTop6()
})
.catch(error => console.error(error))


