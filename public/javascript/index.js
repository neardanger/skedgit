v = document.getElementsByTagName("video")[0]


v.addEventListener('play', function() {
  console.log(this)
  v.currentTime = 13;
}, false);
v.addEventListener("timeupdate", function() {
    if (v.currentTime >= 136) {
        v.currentTime = 13
    }
}, false)
