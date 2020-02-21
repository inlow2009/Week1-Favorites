let url = 'https://api.wheretheiss.at/v1/satellites/25544'


//find ele,ents on page to update with Data with API
let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let date = document.querySelector('#timeEl')
var icon = L.icon({
    iconUrl: 'https://i7.pngguru.com/preview/491/703/651/death-star-star-wars-leia-organa-palpatine-galactic-empire-star-wars.jpg',
    iconSize: [50, 50],
    iconAnchor: [25, 25]
})
var issMarker //
var update = 10000 

setInterval( () => {
    let date = Date()
    timeEl.innerHTML = date
}, 1000)

//lets make a map
var map = L.map('iss-map').setView([0, 0], 1) //center at 0,0 and max zoom out
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 7,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoicHJldHR5cGF0YXRvIiwiYSI6ImNrNnZoaXVyYjAxeTkzaG8ydXp1bjI3MjgifQ.ObvPPZznCfIXWiROMi_Rag'
}).addTo(map)


let max_failed_attempts = 3
iss(max_failed_attempts) //initial call to cunction once the fetch request has been mafe the iss function 
//will call again after a delpay of update miliseconds
//setInterval(iss, update)

//Make rewuest to API and return a promise
function iss(attempts) {
fetch(url)
    .then(res => res.json() ) //decode binary response
    .then( issData => {
    //we now have data
     console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long
    
   // let issMarker = L.marker([lat, long]).addTo(map)

    if (!issMarker) {
        issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
  } else {
      issMarker.setLatLng([lat, long]) //already exsists - move to new location
  }
  //Update the time element to the current date and time 
let date = Date()
date.innerHTML = date

})
.catch(err => {
    attempts--
        console.log(err) //to deal with errors
})

.finally( () => {
    setTimeout(iss, update, attempts)
})
}
//Make request wich returns a 