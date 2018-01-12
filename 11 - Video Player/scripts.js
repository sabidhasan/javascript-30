//Get elements from DOM
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const fullScreen = player.querySelector(".fullscreen");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
// Build functions for playback
function togglePlay() {
  //pausing and playing the video
  const method = video.paused ? "play" : "pause"
  video[method]()
}
function updateButton() {
  //update the text for the button if video is paused/played
  const play = {false: "❚❚", true: "▶"}
  toggle.textContent = play[this.paused]
}
function skip() {
  //called from buttons with data-skip of (-10, +25, etc.)
  video.currentTime += parseFloat(this.dataset.skip)
}
function handleRangeUpdate() {
  //Volume and playback rate
  video[this.name] = this.value;
}
function handleProgress() {
  //update progress bar - called by video timeupdate event listener
  const prog = video.currentTime / video.duration * 100
  progressBar.style.setProperty("flex-basis", `${prog}%`)
}
function scrub(e) {
  //Update progress
  //using "progress" rather than this, because arrow functions below are window-bound
  const prog = e.offsetX / progress.offsetWidth * video.duration
  //update time
  video.currentTime = prog
  //since this counts as a click too, must restart the video
  togglePlay;
}
function doFullScreen() {
  if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen()
  } else if (video.requestFullscreen) {
    video.requestFullscreen()
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen()
  }
}

//Hook event listeners
//play pause upon click
toggle.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach((button) => button.addEventListener("click", skip))

ranges.forEach(r => r.addEventListener("change", handleRangeUpdate))
ranges.forEach(r => r.addEventListener("mousemove", handleRangeUpdate))

let clicked = false;
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e) => clicked && scrub(e))
progress.addEventListener("mousedown", () => clicked = true)
progress.addEventListener("mouseup", () => clicked = false)

fullScreen.addEventListener("click", doFullScreen)
//Space bar press
document.addEventListener("keypress", (e) => {if (e.which === 32) togglePlay()})
