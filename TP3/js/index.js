
let juego = new Juego();
let player = new Player();

let keydown = false;
let typeKeyDown = '';

function juego_start(){
  juego.iniciarJuego();  
}

function player_jump(){
  player.saltar();
}
window.addEventListener('keydown',(event) => {
  typeKeyDown = event.key;
  keydown = true;
});
window.addEventListener('keyup',() =>{typeKeyDown = '';});

let gameLoopInterval = setInterval( function(){
  // DETECCION DE TIPO DE TECLA APRETADA
  if (typeKeyDown == ' '){
    player_jump();
  }
},50);