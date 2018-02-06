const endTime = document.querySelector(".display__end-time")
const timerDisplay = document.querySelector(".display__time-left");
timer(3000)

function timer(secs = 0) {
    //UNIX time for start and end
    const now = Date.now();
    const endTime = now + (1000 * secs);

    //run display
    displayTimeLeft(Math.round(endTime - now));
    displayEndTime(endTime);

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
  timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
  //get date from timestamp
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes().toString().padStart(2, "0");

  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes}`
}
