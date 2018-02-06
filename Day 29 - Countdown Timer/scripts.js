timer(3)
function timer(secs = 0) {
    //UNIX time for start and end
    const now = Date.now();
    const endTime = now + (1000 * secs);

    //run display
    displayTimeLeft(Math.round(endTime - Date.now()));

    //set interval for displaying time
    let timer = setInterval(() => {
      //determine time left
      let timeLeft = Math.round(endTime - Date.now());
      //see if it needs to be stopped
      if (timeLeft < 0) {
        timeLeft = 0;
        clearTimeout(timer);
      }
      //display seconds left
      displayTimeLeft(timeLeft);
    }, 1000)
}


function displayTimeLeft(secs) {
  console.log(secs)

}
