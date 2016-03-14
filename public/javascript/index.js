video = document.getElementById('#bgvid')


video.addEventListener('loadedmetadata', function() {
  this.currentTime = 13;
}, false);
video.addEventListener("timeupdate", function() {
    if (video.currentTime >= 138) {
        this.currentTime = 13
    }
}, false)
