export function imprimirNumeroCards (array){
     let div = document.createElement('div')
     let cantidadCards = array.length
     div.innerHTML = `<h6 class="ms-2">Found <span class="accent">${cantidadCards}</span> events.</h6>`
     contadorCards.appendChild(div)
}

export function renderizarCards (array, contenedor){
     contadorCards.innerHTML = ""
     let divAuxiliar = document.createElement('div')
     divAuxiliar.classList.add('d-flex', 'flex-wrap', 'gap-3', 'justify-content-center')
     let fragment = document.createDocumentFragment()
     array.forEach( element => { 
          divAuxiliar.innerHTML += 
          `<div class="card shadow card-container" style="width: 18rem;">
               <img src="${element.image}" class="card-img-top image-card" alt="..." style="height: 12rem; object-fit:cover;">
               <div class="card-body d-flex flex-column justify-content-between flex-wrap card-body">
                    <div class="d-flex flex-column">
                         <h5 class="card-title">${element.name}</h5>
                         <h6 class="card-title category">${element.category}</h6>
                         <p class="card-text fst-italic">${element.description}</p>
                         <h6 class="card-text">Capacity: ${element.capacity} pers.</h6>
                         <h6 class="card-text">${element.assistance? `Assistance: ${element.assistance}` : `Estimated: ${element.estimate}`}</h6>
                         <h6 class="card-text">Price: $ ${element.price}</h6>
                    </div>
                    <div class="d-flex mt-3">
                         <a id="btn-goSomewhere" href="./details.html?id=${element._id}" class="btn btn-primary">Go somewhere</a>
                    </div>
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

// Stats Functions ------------------------//

export function filterAssistanceSort(array) {
     let eventsWithAssistance = array.filter(element => element.assistance)
     let eventsWithAssistanceSorted = [...eventsWithAssistance].sort((a, b) => a.assistance - b.assistance)
     return eventsWithAssistanceSorted
}

export function filterPercentageAssistance(array){
     let aux = []
     array.map( element => {
          let arrayElement = {
               event: element.name,
               percentage: ( element.assistance * 100 / element.capacity ).toFixed(2)
          }
     aux.push(arrayElement)
     }) 
     return aux.sort( (a,b) => a.percentage - b.percentage)
}

export function filterCapacitySort(array){
     return array.sort( (a,b) => a.capacity - b.capacity)
}

export function filterCreateArrayRevenues (arrayA, arrayB){
     let arrayObjectRevenues = []
     for( let value of arrayA){

          let aux = arrayB.filter( element => element.category === value)
          console.log(`${value}` , aux);
          let pastRevenuesTotal = aux.reduce( (acc, element) => acc + (element.assistance? element.assistance * element.price : element.estimate * element.price), 0,)
          let percentageTotal = (aux.reduce( (acc, element) => acc + ( (element.assistance? element.assistance * 100 / element.capacity : element.estimate * 100 / element.capacity) ), 0) / aux.length).toFixed(2)

          // console.log(`${value}`, pastRevenuesTotal);
          arrayObjectRevenues.push( {
               name: `${value}`,
               revenue: pastRevenuesTotal,
               assistancePercentage: percentageTotal
          })
     }
     console.log(arrayObjectRevenues);
     return arrayObjectRevenues
}

export function printTable1(arrayA, arrayB) {
     let eventWithLowestPercent = arrayA.shift()
     let eventWithHighestPercent = arrayA.pop()
     let eventWithHighestCapacity = arrayB.pop()
     // console.log(eventWithLowestPercent);
     table1.innerHTML = `
     <th colspan="3 class="tableHeaders"">Event statistics</th>
     <tr> 
          <td>Events with the highest % of assistance</td>
          <td>Events with the lowest % of assistance</td>
          <td>Event with larger capacity</td>
     </tr>
     <tr>
          <td>${eventWithHighestPercent.event} ${eventWithHighestPercent.percentage}%</td>
          <td>${eventWithHighestPercent.event} ${eventWithLowestPercent.percentage}%</td>
          <td>${eventWithHighestCapacity.name} ${eventWithHighestCapacity.capacity}</td>
     </tr>
     `
}

export function printTable2and3(array,id){
     array.forEach(element => {
          id.innerHTML += `
          <tr>
               <td>${element.name}</td>
               <td>${element.revenue}</td>
               <td>${element.assistancePercentage}%</td>
          </tr>
          `
     });
}