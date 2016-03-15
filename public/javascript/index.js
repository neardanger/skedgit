v = document.getElementsByTagName("video")[0]

// run the video in the background and loops it
v.addEventListener('play', function() {
  console.log(this)
  v.currentTime = 13;
}, false);
v.addEventListener("timeupdate", function() {
    if (v.currentTime >= 136) {
        v.currentTime = 13
    }
}, false)
