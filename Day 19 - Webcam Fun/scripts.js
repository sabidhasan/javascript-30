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
      //Make an URL of the video data
      const videoData = window.URL.createObjectURL(localMediaStream)
      //set video player srouce to this data
      video.src = videoData;
      //make video constantly play
      video.play();
    })
    .catch(err => {
      console.error("OH NO! Please allow it!");
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  //set canvas width and height
  canvas.width = width;
  canvas.height = height;

  //update canvas every 32 ms
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // for effects, we get image, then modify it and repaint it onto canvas
    let pixels = ctx.getImageData(0, 0, width, height);
    //apply effect
    pixels = redEffect(pixels);
    //draw
    ctx.putImageData(pixels, 0 , 0)
  }, 32);
}

function redEffect(pixels) {
  //filter for red effect
  for (let i = 0; i < pixels.data.length; i += 4) {
    //red channel
    pixels.data[i] += 0;
    //green channel
    pixels.data[i + 1] = 0;
    // //blue channel
    pixels.data[i + 2] = 0;
  }
  return pixels;
}
function takePhoto() {
  //play the audio
  snap.currentTime = 0;
  snap.play();

  //take photo out of canvas
  const photo = canvas.toDataURL("image/jpeg");
  //create link (for image), and set its properties
  const link = document.createElement("a");
  link.href = photo;
  link.setAttribute('download', 'me!');
  link.textContent = "Download Image";
  link.innerHTML = `<img src=${photo} alt="" />`;
  //insert into DOM
  strip.insertBefore(link, strip.firstChild)
}

//get webcam set up, start painting to canvas when ready
getVideo();
video.addEventListener('canplay', paintToCanvas)
