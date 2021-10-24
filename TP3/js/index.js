
let juego = new Juego();
let player = new Player();

let keydown = false;
let typeKeyDown = '';
let enemigos = [];

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
  player.checkCollision(enemigos);
  // console.log(enemigos);
  enemigos[0].move();
},50);

// let enemySpawnInterval = setInterval( function(){
  let enemigo = new Enemy('100px','100px','20px','5%');
  enemigo.spawn();
  enemigos.push(enemigo);
// },3000);