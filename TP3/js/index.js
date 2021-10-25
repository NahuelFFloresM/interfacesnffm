
let juego = new Juego();
let player = new Player();

let keydown = false;
let typeKeyDown = '';
let enemigos = [];
let colision_player = document.getElementById('player').offsetLeft + document.getElementById('player').offsetWidth;

function juego_start(){
  document.getElementById('menu').style.visibility = "hidden";
  juego.iniciarJuego();
}

function player_jump(){
  if (document.getElementById('player').classList == "running") {
    player.saltar();
  }
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
  checkCollision(enemigos);
  // console.log(enemigos);
  enemigos[0].move();
},50);

// let enemySpawnInterval = setInterval( function(){
  let enemigo = new Enemy('100px','100px','20px','5%');
  enemigo.spawn();
  enemigos.push(enemigo);
// },3000);
///// CALCULOS PARA LOCALIZAR SEGUN A LA IZQ
// p1.offsetLeft + p1.offsetWidth

function checkCollision(enemigos){
  let e1 = enemigos[0];
  
  if (document.getElementById(e1.getId()).offsetLeft <= colision_player){
    console.log('colision');
  };
}