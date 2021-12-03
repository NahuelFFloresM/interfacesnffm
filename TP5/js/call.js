var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

setTimeout(function(){ 
    document.getElementById("beater").classList.remove("beat");
}, 5000);

function activeMic(){
  let micElement = document.getElementById("mic");
  let micMuteElement = document.getElementById("micMute");
  if (micElement.classList.contains("invisible")){
    micElement.classList.remove("invisible");
    micMuteElement.classList.add("invisible");
  }
  else{
    micMuteElement.classList.remove("invisible");
    micElement.classList.add("invisible");
  }
}

function activeCam(){
  let camElement = document.getElementById("cam");
  let camOffElement = document.getElementById("camOff");
  let activeCamera = document.getElementById("webCam");
  if (camElement.classList.contains("invisible")){
    camElement.classList.remove("invisible");
    activeCamera.classList.remove("invisible");
    camOffElement.classList.add("invisible");
  }
  else{
    camOffElement.classList.remove("invisible");
    camElement.classList.add("invisible");
    activeCamera.classList.add("invisible");
  }
}