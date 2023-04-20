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
          let arrayUpcommingEvents =  [...new Set((arrayEvents.filter( element => (new Date(element.date) > currentDate))).map( element => element.category))]
          console.log(arrayUpcommingEvents);
          let arrayPastEvents = [...new Set((arrayEvents.filter( element => (new Date(element.date) < currentDate))).map( element => element.category))]
          console.log(arrayPastEvents);
          let varFiltredAssistanceSort = filterAssistanceSort(arrayEvents)
          console.log(varFiltredAssistanceSort);
          let varFilterPercentageAssistance = filterPercentageAssistance(varFiltredAssistanceSort)
          console.log(varFilterPercentageAssistance);
          let varEventsWithCapacitySorted = filterCapacitySort(arrayEvents)
          console.log(varEventsWithCapacitySorted);
          
          printTable1(varFilterPercentageAssistance, varEventsWithCapacitySorted)
          printTable2and3(arrayPastEvents, tbodyPastEvent)
          printTable2and3(arrayPastEvents, tbodyUpcomingEvent)

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

function printTable1(arrayA, arrayB) {
     console.log(arrayA);
     console.log(arrayA[1]);
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