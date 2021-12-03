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
    activeCamera.classList.add("invisible");
    camOffElement.classList.add("invisible");
  }
  else{
    camOffElement.classList.remove("invisible");
    camElement.classList.add("invisible");
    activeCamera.classList.remove("invisible");
  }
}