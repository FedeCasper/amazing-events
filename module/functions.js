export function imprimirNumeroCards (array){
     let div = document.createElement('div')
     let cantidadCards = array.length
     div.innerHTML = `<h5>Cantidad de cards ${cantidadCards}</h5>`
     contadorCards.appendChild(div)
}

export function renderizarCards (array, contenedor){
     contadorCards.innerHTML = ""
     let divAuxiliar = document.createElement('div')
     divAuxiliar.classList.add('d-flex', 'flex-wrap', 'gap-3', 'justify-content-center')
     let fragment = document.createDocumentFragment()
     array.forEach( element => { 
          divAuxiliar.innerHTML += 
          `<div class="card" style="width: 18rem;">
               <img src="${element.image}" class="card-img-top" alt="...">
               <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <h6 class="card-title">${element.category}</h6>
                    <p class="card-text">${element.description}</p>
                    <h6 class="card-text">Capacity: ${element.capacity} pers.</h6>
                    <h6 class="card-text">Assitance: $${element.assistance}</h6>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
               </div>
          </div>`
          fragment.appendChild(divAuxiliar)
     });
     contenedor.appendChild(fragment)
     imprimirNumeroCards(array)
}

export function renderizaChechboxs(array, contenedor){
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
     contenedor.appendChild(fragment)
}

export function filtraPorInputText(array, inputText){
     let filtro = array.filter(elemento => elemento.name.toLowerCase().includes(inputText.value.toLowerCase()))
     console.log(filtro);
     // renderizarCards(filtro, contenedorCards)
     return filtro
}

export function filtraPorCheckbox (nodeList, array){
     contenedorCards.innerHTML = ""
     let arrayDeValuesCheckbox = Array.from(nodeList).filter(checkbox => checkbox.checked).map(CheckboxCheked => CheckboxCheked.value)
     console.log(arrayDeValuesCheckbox);
     console.log(array);
     if(arrayDeValuesCheckbox.length === 0){
          renderizarCards(array, contenedorCards)
     }else{
          let arrayObjetosFiltradosPorCheckbox = array.filter(elemento => arrayDeValuesCheckbox.includes(elemento.category))
          console.log(arrayObjetosFiltradosPorCheckbox);
          renderizarCards(arrayObjetosFiltradosPorCheckbox, contenedorCards)
     }
}

export function filtraCruzado (nodeList, array, inputText){
     let filtro = filtraPorInputText(array, inputText)
     console.log(filtro);
     filtraPorCheckbox(nodeList, filtro)
}