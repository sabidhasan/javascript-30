const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


//webcam video is piped into video element
//every 16 ms, a screenshot is piped into canvas
//canvas is responsible for making funky effects
//audio is just a fun sound track

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play()
    })
}

getVideo()
