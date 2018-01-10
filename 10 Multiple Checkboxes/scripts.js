let lastPressed = null
let cb = null;

function config() {
  cb = Array.from(document.querySelectorAll("input[type=checkbox]"))

  //add event listeners for each
  for (let i = 0; i < cb.length; i++) {
    cb[i].addEventListener("click", function(e) {
      //if shift is pressed and there was an initial selection, then loop
      if (e.shiftKey == true && lastPressed != null) {
        //get all the ones in the middle
        let copy = cb.slice(Math.min(lastPressed, i), Math.max(lastPressed, i))
        copy.forEach((val) => val.checked = true)
      }
      //update lastPressed
      lastPressed = cb[i].checked ? i : null
    })
  }
}
