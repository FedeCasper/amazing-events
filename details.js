const url = "https://mindhub-xj03.onrender.com/api/amazing"
const params = new URLSearchParams(location.search);
console.log(params);
let id = params.get('id');
console.log(id);
const cardDetails = document.getElementById('cardDetails')
console.log(cardDetails);
const relatedDiv = document.querySelector('.related')

fetch(url)
.then(response => response.json())
.then(data => {
     let arrayOriginal = data.events 
     let eventoCapturado = arrayOriginal.find( element => element._id == id);
     console.log(eventoCapturado);

     function imprimirCardDetails(){
          cardDetails.innerHTML =
          `
          <div class="card mb-3" style="max-width: 940px;">
               <div class="row g-0">
                    <div class="col-md-4">
                         <img src="${eventoCapturado.image}" class="rounded-start" alt="${eventoCapturado.name}"  style="max-width: 100%; height: 100%; object-fit:cover;">
                    </div>
                    <div class="col-md-8">
                         <div class="card-body">
                              <h3 id="cardTitleH3" class="card-title">${eventoCapturado.name}</h3>
                              <p class="card-text category">${eventoCapturado.category}</p>
                              <p class="card-text fst-italic">${eventoCapturado.description}</p>
                              <h6 class="card-text">Place: ${eventoCapturado.place}</p>
                              <h6 class="card-text">Date: ${eventoCapturado.date}</p>
                              <h6 class="card-text">Capacity: ${eventoCapturado.capacity}</p>
                              <h6 class="card-text">Price: $ ${eventoCapturado.price}</h6>
                              <h6 class="card-text">${eventoCapturado.assistance? `Assistance: ${eventoCapturado.assistance}` : `Estimated: ${eventoCapturado.estimate}`}</h6>
                              <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                         </div>
                    </div>
               </div>
          </div>
          `
     }
     imprimirCardDetails()

     let relatedEvents = arrayOriginal.filter( element => element.category == eventoCapturado.category )
     console.log(relatedEvents);

     function printRelated (){

          relatedEvents.forEach(element => {
               relatedDiv.innerHTML +=
               `
               <div class="col">
               <div class="card">
                    <img src="${element.image}" class="card-img-top" alt="..." style="max-width: 100%; height: 260px; object-fit:cover;">
                    <div class="card-body">
                         <h5 class="card-title">${element.name}</h5>
                         <p class="card-text">${element.category}</p>
                    </div>
               </div>
          </div>
               `
          });

     }
     printRelated()
})
.catch(error => console.error(error))