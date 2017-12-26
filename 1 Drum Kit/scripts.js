const keys = [
  {name: "A", action: "clap", sound: "sounds/clap.wav", unicode: 65},
  {name: "S", action: "hihat", sound: "sounds/hihat.wav", unicode: 83},
  {name: "D", action: "kick", sound: "sounds/kick.wav", unicode: 68},
  {name: "F", action: "openhat", sound: "sounds/openhat.wav", unicode: 70},
  {name: "G", action: "boom", sound: "sounds/boom.wav", unicode: 71},
  {name: "H", action: "ride", sound: "sounds/ride.wav", unicode: 72},
  {name: "J", action: "snare", sound: "sounds/snare.wav", unicode: 74},
  {name: "K", action: "tom", sound: "sounds/tom.wav", unicode: 75},
  {name: "L", action: "tink", sound: "sounds/tink.wav", unicode: 76}
]

const handleKeyPress = (event) => {
  //if key pressed was one of the keys, then cause it to be highlighted
  for (let i in keys) {
    if (keys[i].unicode === event.which) {
      let c = document.querySelector("[data-key='" + i + "']")
      c.classList.add("playing")
      c.querySelector("audio").currentTime = 0
      c.querySelector("audio").play();
      break
    }
  }
}


const runApp = () => {
  //Select the parent node
  const parent = document.querySelector("#main")

  for (let item in keys) {
    let div = document.createElement("div")
    div.setAttribute("class", "key")
    div.setAttribute("data-key", item)

    let keySpan = document.createElement("span")
    keySpan.className = "key-text"
    keySpan.appendChild(document.createTextNode(keys[item].name))

    let soundSpan = document.createElement("span")
    soundSpan.className = "sound"
    soundSpan.appendChild(document.createTextNode(keys[item].action))

    let audioElement = document.createElement("audio")
    audioElement.setAttribute("data-key", item)
    audioElement.setAttribute("src", keys[item].sound)

    div.append(keySpan)
    div.append(soundSpan)
    div.append(audioElement)

    parent.appendChild(div)

    // add event listener for completed transition - when animation is done,
    // remove the playing class
    div.addEventListener("transitionend", function() {
      this.classList.remove("playing")
    })

    div.addEventListener("click", () => handleKeyPress({which: keys[item].unicode}))
  }

  document.addEventListener("keydown", (e) => handleKeyPress(e))

}
