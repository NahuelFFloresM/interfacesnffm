
let juego = new Juego();
let player = new Player();

let keydown = false;
let typeKeyDown = '';
let enemigos = [];
let recoletables = [];
let enemy_count = 1;
let collectable_count = 1;
let gameLoopInterval = null;
let enemySpawnInterval = null;
let enemySpawnInterval2 = null;
let pointsInterval = null;
function juego_start(){
  juego.limpiarEnemigos();
  document.getElementById('menu').style.visibility = "hidden";
  document.getElementById("points").innerHTML = "00000";
  if (document.getElementById("game_over").classList == "game_over"){
    document.getElementById("game_over").classList = "invisible";
  }
  juego.iniciarBgParalax();

  gameLoopInterval = setInterval( function(){
    player.renovarPosicion();
    // DETECCION DE TIPO DE TECLA APRETADA
    if (typeKeyDown == ' '){
      player_jump();
    }
  
    /// MOVIMIENTO DE ENEMIGOS
    enemigos.forEach(element => {
      element.move();
    });

    recoletables.forEach(element => {
      element.move();
    })
  
    // DETECCION DE COLISION
    checkCollision();
    // Deteccion de monedas;
    checkCoins();

  },10);

  /** Suma de puntos por tiempo jugado */
  pointsInterval = setInterval( () => sumScore(1),500);

  /**
   * Intervalo para spawnear objetos en el suelo
   */
  enemySpawnInterval = setInterval( function(){
    // 4 max, 1 min
    let type_entity = Math.floor(Math.random()*4) + 1;
    let enemigo;
    if (type_entity == 1){
      enemigo = new Enemy('5%','30px',enemy_count++,"cactus");    
    }
    if (type_entity == 2){
      enemigo = new Enemy('5%','400px',enemy_count++,"crow");
    }
    if (type_entity == 3){
      enemigo = new Enemy('5%','30px',enemy_count++,"dragon");
    }
    if (type_entity == 4){
      enemigo = new Enemy('5%','30px',enemy_count++,"slime");
    }
    enemigo.spawn();
    enemigos.push(enemigo);
  },2000);

  enemySpawnInterval2 = setInterval( function(){
    // 4 max, 1 min
    let type_entity = Math.floor(Math.random()*4) + 1;
    let enemigo;
    if (type_entity == 1){
      enemigo = new Enemy('5%','30px','enemy'+enemy_count++,"cactus");    
    }
    if (type_entity == 2){
      enemigo = new Enemy('5%','450px','enemy'+enemy_count++,"crow");
    }
    if (type_entity == 3){
      enemigo = new Enemy('5%','30px','enemy'+enemy_count++,"dragon");
    }
    if (type_entity == 4){
      enemigo = new Enemy('5%','30px','enemy'+enemy_count++,"slime");
    }
    enemigo.spawn();
    enemigos.push(enemigo);
  },3000);

  coinSpawnInterval = setInterval( function(){
    let item;
    item = new Collectable('5%',(Math.floor(Math.random()*300) + 30)+'px','coin'+collectable_count++);
    item.spawn();
    recoletables.push(item);
  },3500);
}

function player_jump(){
  if (document.getElementById('player').classList == "running") {
    player.saltar();
  }
}
window.addEventListener('keydown',(event) => {
  typeKeyDown = event.key;
});
window.addEventListener('keyup',() =>{typeKeyDown = '';});


function checkCollision(){
  if (player.checkCollision(enemigos)){
    document.getElementById("game_over").classList = "game_over";
    juego.finJuego();
  }
}

function checkCoins(){
  if (player.checkCollision(recoletables)){
    deleteCoin(500);
  }
}

function deleteEnemy( score = 0){
  let toDelete = enemigos.shift();
  sumScore(score);
  toDelete.delete();
  // document.body.removeChild(document.getElementById(toDelete.getId()));
}

function deleteCoin(score = 0){
  let toDelete = recoletables.shift();
  sumScore(score);
  toDelete.delete();
  // document.body.removeChild(document.getElementById(toDelete.getId()));
}

function pad_with_zeroes(number, length) {

  var my_string = '' + number;
  while (my_string.length < length) {
      my_string = '0' + my_string;
  }
  return my_string;
}

function sumScore(number = 1){
  let points = parseInt(document.getElementById("points").innerHTML);
  //suma puntos al esquivar obstaculo. invoca autogeneracion de 0 para tener 4 digitos
  document.getElementById("points").innerHTML = pad_with_zeroes(points + number, 5);
}

function cambia_fondo(fondo){
  //elimina las clases del fondo y piso para sustituir
  document.getElementById('background').classList.remove(document.getElementById('background').classList[1]);
  document.getElementById('piso_paralax').classList.remove(document.getElementById('piso_paralax').classList[1]);

  switch (fondo) {
    case 1:
      document.getElementById('background').classList.add('fondo-default');
      document.getElementById('piso_paralax').classList.add('piso-default');
      changeTextColor(1);
      break;
    case 2:
      document.getElementById('background').classList.add('fondo-city');
      document.getElementById('piso_paralax').classList.add('piso-city');
      changeTextColor(1);
      break
    case 3:
      document.getElementById('background').classList.add('fondo-night');
      document.getElementById('piso_paralax').classList.add('piso-night');
      changeTextColor(2);
      break
    case 4:
      document.getElementById('background').classList.add('fondo-mountain');
      document.getElementById('piso_paralax').classList.add('piso-mountain');
      changeTextColor(1);
      break
    case 5:
      document.getElementById('background').classList.add('fondo-desert');
      document.getElementById('piso_paralax').classList.add('piso-desert');
      changeTextColor(1);
      break
  }
}

function changeTextColor(color){
  if (color == 1) {
    let whiteElements = document.querySelectorAll(".color-white");
    for (let i = 0; i < whiteElements.length; i++) {
      whiteElements[i].classList.replace("color-white", "color-black");
    }
  }
  if (color == 2) {
    let blackElements = document.querySelectorAll(".color-black");
    for (let i = 0; i < blackElements.length; i++) {
      blackElements[i].classList.replace("color-black", "color-white");
    }
  }
}

function back(){
  document.getElementById("howToPlay").classList = "invisible";
  document.getElementById("menu").classList = "game_menu";
}

function juego_guide(){
  document.getElementById("menu").classList = "invisible";
  document.getElementById("howToPlay").classList = "game_menu";
}