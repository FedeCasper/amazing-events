const url = "https://mindhub-xj03.onrender.com/api/amazing"
const params = new URLSearchParams(location.search);
console.log(params);
let id = params.get('id');
console.log(id);
const cardDetails = document.getElementById('cardDetails')
console.log(cardDetails);

fetch(url)
.then(response => response.json())
.then(data => {
     let eventoCapturado = data.events.find( element => element._id == id);
     console.log(eventoCapturado);

     function imprimirCardDetails(){
          cardDetails.innerHTML =
          `
          <div class="card mb-3" style="max-width: 540px;">
               <div class="row g-0">
                    <div class="col-md-4">
                         <img src="${eventoCapturado.image}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                         <div class="card-body">
                              <h5 class="card-title">${eventoCapturado.name}</h5>
                              <p class="card-text"></p>
                              <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                         </div>
                    </div>
               </div>
          </div>
          `
     }
     imprimirCardDetails()
})
.catch(error => console.error(error))