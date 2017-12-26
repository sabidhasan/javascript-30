const init = () => {
  document.querySelectorAll(`input`).forEach((input) => {
    input.addEventListener("change", update)
    input.addEventListener("mousemove", update)
  }
)}

function update() {
  // this should be teh input whose 'onchange' called this function
  // Compute the new value, with the suffix from HTML's data-ref
  const newVal = this.value + (this.dataset.suffix || '')
  document.documentElement.style.setProperty(`--${this.name}`, newVal)
}
