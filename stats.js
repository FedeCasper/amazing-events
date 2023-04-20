const url = "https://mindhub-xj03.onrender.com/api/amazing"
let table1 = document.getElementById('table1')

fetch(url)
.then(response => response.json())
.then(data => {
     let arrayEvents = data.events
     console.log(arrayEvents);

     let eventsWithAssistance = arrayEvents.filter( element => element.assistance)
     let eventsWithAssistanceSorted = [...eventsWithAssistance].sort( (a,b) => a.assistance - b.assistance)
     console.log(eventsWithAssistanceSorted);
})

