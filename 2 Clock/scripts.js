window.setInterval(() => updateClock(), 500)

const updateClock = () => {
  // determine the hours
  const currTime = new Date()
  // get seconds rotation
  let secondsRotation = currTime.getSeconds() * 6
  let minRotation = (currTime.getMinutes() * 6) + (currTime.getSeconds() / 60)
  let hoursRotation = (currTime.getHours() * 30) + (currTime.getMinutes() / 60)

  document.querySelector(".sec-hand").style.transform = `rotate(${secondsRotation}deg)`
  document.querySelector(".min-hand").style.transform = `rotate(${minRotation}deg)`
  document.querySelector(".hr-hand").style.transform = `rotate(${hoursRotation}deg)`
}
