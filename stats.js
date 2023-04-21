const url = "https://mindhub-xj03.onrender.com/api/amazing"
let table1 = document.getElementById('table1')
let tbodyPastEvent = document.getElementById('pastEventsTbody')
let tbodyUpcomingEvent = document.getElementById('upcommingEventsTbody')

fetch(url)
     .then(response => response.json())
     .then(data => {
          let currentDate = new Date(data.currentDate)
          console.log(data.currentDate);
          let arrayEvents = data.events
          // console.log(arrayEvents);
          let arrayUpcommingEvents =  arrayEvents.filter( element => (new Date(element.date) > currentDate))
          console.log("UPCOMMING EVENTS" , arrayUpcommingEvents);

          let arrayPastEvents =  arrayEvents.filter( element => (new Date(element.date) < currentDate))
          console.log("PAST EVENTS" , arrayPastEvents);

          let arrayUpcommingEventValues =  [...new Set((arrayEvents.filter( element => (new Date(element.date) > currentDate))).map( element => element.category))]
          console.log("UPCOMING VALUES", arrayUpcommingEventValues);

          let arrayPastEventsValues = [...new Set((arrayEvents.filter( element => (new Date(element.date) < currentDate))).map( element => element.category))]
          console.log("PAST VALUES",arrayPastEventsValues);

          let varFiltredAssistanceSort = filterAssistanceSort(arrayEvents)
          console.log(varFiltredAssistanceSort);

          let varFilterPercentageAssistance = filterPercentageAssistance(varFiltredAssistanceSort)
          console.log(varFilterPercentageAssistance);

          let varEventsWithCapacitySorted = filterCapacitySort(arrayEvents)
          console.log(varEventsWithCapacitySorted);
          
          let arraysByPastCategories = filterCreateArraybyCategories (arrayPastEventsValues, arrayPastEvents)
          console.log("ARRAY PAST CATEGORIES ARRAY", arraysByPastCategories);
          let arraysByUpcomingCategories = filterCreateArraybyCategories (arrayUpcommingEventValues, arrayUpcommingEvents)
          console.log("ARRAY UPCOMING CATEGORIES ARRAY", arraysByUpcomingCategories);

          

          printTable1(varFilterPercentageAssistance, varEventsWithCapacitySorted)
          printTable2and3(arrayPastEventsValues, tbodyPastEvent)
          printTable2and3(arrayPastEventsValues, tbodyUpcomingEvent)

     })


function filterAssistanceSort(array) {
     let eventsWithAssistance = array.filter(element => element.assistance)
     let eventsWithAssistanceSorted = [...eventsWithAssistance].sort((a, b) => a.assistance - b.assistance)
     return eventsWithAssistanceSorted
}

function filterPercentageAssistance(array){
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

function filterCapacitySort(array){
     return array.sort( (a,b) => a.capacity - b.capacity)
}

function filterCreateArraybyCategories (arrayA, arrayB){
     let arrayNodriz = []
     let acc = 0;
     for( let value of arrayA){
          let aux = arrayB.filter( element => element.category === value)
          console.log(`${value}` , aux);
          arrayNodriz.push(aux)
     }
     return arrayNodriz
}

function printTable1(arrayA, arrayB) {
     let eventWithLowestPercent = arrayA.shift()
     let eventWithHighestPercent = arrayA.pop()
     let eventWithHighestCapacity = arrayB.pop()
     console.log(eventWithLowestPercent);
     table1.innerHTML = `
     <th>Event statistics</th>
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

function printTable2and3(array,id){
     array.forEach(element => {
          id.innerHTML += `
          <tr>
               <td>${element}</td>
          </tr>
          `
     });
}