const url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
.then(response => response.json())
.then(data => {
     console.log(data)
     let arrayEventos = data.events
     console.log(arrayEventos)
     renderizarCards(arrayEventos)
     renderizaChechboxs(arrayEventos)

     let botonBuscar = document.getElementById('botonBuscar')
     let inputText = document.getElementById('inputText')
     botonBuscar.addEventListener('click', () => filtraPorInputText(arrayEventos, inputText))
     
     let checkboxs = document.querySelectorAll('input[type="checkbox"]')
     console.log(checkboxs);

     let aux = []
     checkboxs.forEach(checkbox => checkbox.addEventListener('change', () => {console.log("aux")}))


})
.catch(error => console.error(error))

let contenedorCards = document.getElementById('contenedorCards');
let contenedorCheckboxs = document.getElementById('contenedorCheckboxs');

function renderizarCards (array){
     let divAuxiliar = document.createElement('div')
     let fragment = document.createDocumentFragment()
     array.forEach( element => { 
          divAuxiliar.innerHTML += 
          `<div class="card" style="width: 18rem;">
               <img src="${element.image}" class="card-img-top" alt="...">
               <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
               </div>
          </div>`
          fragment.appendChild(divAuxiliar)
     });
     contenedorCards.appendChild(fragment)
}

function renderizaChechboxs(array){
     let arrayCategorias = [...new Set(array.map(elemento => elemento.category))]
     let fragment = document.createDocumentFragment()
     arrayCategorias.forEach(elemento => {
          let divAuxiliar = document.createElement('div')
          divAuxiliar.classList.add('w-25')
          divAuxiliar.innerHTML += 
          `<label>
               <input class="me-3" type="checkbox" name="" id="" value="${elemento}">${elemento}
          </label>`
          fragment.appendChild(divAuxiliar)
     })
     contenedorCheckboxs.appendChild(fragment)
}

function filtraPorInputText(array, inputText){
     let filtro = array.filter(elemento => elemento.name.toLowerCase().includes(inputText.value.toLowerCase()))
     console.log(filtro);
}

function filtraPorCheckbox(array, arrayCheckboxCheked){
     let array1 = array.filter(elemento => arrayCheckboxCheked.includes(elemento.category))
     console.log(array1);
}


