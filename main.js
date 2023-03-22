const url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
.then(response => response.json())
.then(data => {
     console.log(data)
     let arrayEventos = data.events
     console.log(arrayEventos);
     
     renderizarCards(arrayEventos)
})
.catch(error => console.error(error))

let contenedorCards = document.getElementById('contenedorCards');
console.log(contenedorCards);



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
     // div.appendChild.fragment
     
}

