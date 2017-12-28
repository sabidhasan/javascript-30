const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))

function numberWithCommas(num) {
  //taken from GitHub - this prettifies the number given
  return num.toString().replace(/^\B(?=(\d{3})+(?!\d))/g, ',')
}

function displayMatch() {
  const suggestions = document.querySelector(".suggestions")

  if (!this.value) {
    suggestions.innerHTML = ""
    return
  }

  const results = findMatches(this.value)
  let html = results.map(val => {

    const regexp = new RegExp(`(${this.value})`, "gi")
    const cityName = val.city.replace(regexp, `<span class="highlight">${this.value.toLowerCase()}</span>`)
    const stateName = val.state.replace(regexp, `<span class="highlight">${this.value.toLowerCase()}</span>`)

    return `<li>${cityName}, ${stateName} <span class="population">${numberWithCommas(val.population)} (${val.rank})</span></li>`
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
