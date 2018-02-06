
const timerDisplay = document.querySelector(".display__time-left");
timer(5)

function timer(secs = 0) {
    //UNIX time for start and end
    const now = Date.now();
    const endTime = now + (1000 * secs);

    //run display
    displayTimeLeft(Math.round(endTime - now));

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


function displayTimeLeft(milliseconds) {
  //convert ms to seconds
  const seconds = milliseconds / 1000;
  const minutesLeft = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secondsLeft = Math.round(seconds % 60).toString().padStart(2, "0");
  //display
  const display = `${minutesLeft}:${secondsLeft}`;
  document.title = display;
  document.querySelector(".display__time-left").textContent = display
}
