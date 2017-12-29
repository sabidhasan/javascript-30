const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []
const currPos = {lat: null, lon: null}

navigator.geolocation.getCurrentPosition(pos => {
  currPos.lat = pos.coords.latitude
  currPos.lon = pos.coords.longitude
})

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))

function numberWithCommas(num) {
  //prettify numbers by adding commas
  return num
    .toString()
    .split("")
    .reverse()
    .map((val, index) => {
      return val + (index % 3 === 0 && index ? "," : "")
    })
    .reverse()
    .join("")
}

function distance(pos1, pos2) {
   if (!pos1.lat || !pos2.lat || !pos1.lon || !pos1.lat) return "";

    //Haversine distance between 2 points
    function deg2rad(degrees) {
      return degrees * (Math.PI / 180)
    }

    // Radius of the earth in km
    const R = 6371

    const dLat = deg2rad(pos1.lat - pos2.lat)
    const dLon = deg2rad(pos1.lon - pos2.lon)

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(pos1.lat))
      * Math.cos(deg2rad(pos2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
}


function displayMatch() {
  const suggestions = document.querySelector(".suggestions")

  if (!this.value) {
    suggestions.innerHTML = ""
    return null
  }

  const results = findMatches(this.value)
  let html = results
    .sort((a, b) => {
      return distance({lat: a.latitude, lon:a.longitude}, currPos) < distance({lat: b.latitude, lon: b.longitude}, currPos) ? -1 : 1
    })
    .map(val => {
      const regexp = new RegExp(`(${this.value})`, "gi")
      //use lowercase so CSS can make it "Title Case"
      const cityName = val.city.replace(regexp, `<span class="highlight">${this.value.toLowerCase()}</span>`)
      const stateName = val.state.replace(regexp, `<span class="highlight">${this.value.toLowerCase()}</span>`)

      let dist = Math.round(distance({lat: val.latitude, lon: val.longitude}, currPos)) || ""
      if (dist) dist = `(${dist} km)`
      // } else {
      //   dist = ""
      // }

      return `<li>${cityName}, ${stateName} <span class="population">${numberWithCommas(val.population)} ${dist}</span></li>`
    })
  suggestions.innerHTML = html.join("")
}

function findMatches(word) {
  const regexp = new RegExp(word, "gi")
  return cities.filter(val => {return val.city.match(regexp) || val.state.match(regexp)})
}


function toggleClass() {
  this.classList.toggle("inactive")
}
