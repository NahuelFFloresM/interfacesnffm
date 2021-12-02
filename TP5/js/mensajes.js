document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function(){ document.querySelector('.loading-screen').style.opacity = 0; }, 2000);
  setTimeout(function(){ let elem = document.querySelector('.loading-screen'); elem.parentNode.removeChild(elem); }, 2500);
})

function showEmojis(){
  let emojiElement = document.getElementById("emoji");
  if (emojiElement.classList.contains("invisible")){
    emojiElement.classList.remove("invisible");
  }
  else{
    emojiElement.classList.add("invisible");
  }
}