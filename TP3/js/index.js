
let juego = new Juego();
let player = new Player();

let keydown = false;
let typeKeyDown = '';
let enemigos = [];
let colision_player = document.getElementById('player').offsetLeft + document.getElementById('player').offsetWidth;
let enemy_count = 1;
let gameLoopInterval = null;
let enemySpawnInterval = null;

function juego_start(){
  juego.limpiarEnemigos();
  document.getElementById('menu').style.visibility = "hidden";
  if (document.getElementById("game_over").classList == "game_over"){
    document.getElementById("game_over").classList = "invisible";
  }
  juego.iniciarBgParalax();

  gameLoopInterval = setInterval( function(){
    // DETECCION DE TIPO DE TECLA APRETADA
    if (typeKeyDown == ' '){
      player_jump();
    }
  
    /// MOVIMIENTO DE ENEMIGOS
    enemigos.forEach(element => {
      element.move();
    });
  
    // DETECCION DE COLISION
    checkCollision(enemigos);
    
  },50);


  /**
   * Intervalo para spawnear objetos en el suelo
   */
  enemySpawnInterval = setInterval( function(){
    // 4 max, 1 min
    let type_entity = Math.floor(Math.random()*4) + 1;
    let enemigo;
    console.log(type_entity);
    if (type_entity == 1){
      enemigo = new Enemy('100px','100px','5%','5%','',enemy_count++,"cactus");    
    }
    if (type_entity == 2){
      enemigo = new Enemy('50px','50px','45%','5%','',enemy_count++,"crow");
    }
    if (type_entity == 3){
      enemigo = new Enemy('100px','100px','5%','5%','',enemy_count++,"dragon");
    }
    if (type_entity == 4){
      enemigo = new Enemy('50px','100px','1%','5%','',enemy_count++,"slime");
    }
    enemigo.spawn();
    enemigos.push(enemigo);
  },3000);
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



///// CALCULOS PARA LOCALIZAR SEGUN A LA IZQ
// p1.offsetLeft + p1.offsetWidth

function checkCollision(enemigos){
  let position = 0;
  enemigos.forEach(element => {
    console.log(element.getId());
    position = document.getElementById(element.getId()).offsetLeft;
    // DETECTAR COLISION VERTICAL
    if (position <= colision_player){
      document.getElementById("game_over").classList = "game_over";
      juego.finJuego();
    };
    if (position < -200){
      deleteEnemy();
    }
  });
  
}

function deleteEnemy(){
  let toDelete = enemigos.shift();
  document.body.removeChild(document.getElementById(toDelete.getId()));

}