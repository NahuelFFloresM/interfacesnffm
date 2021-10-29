
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
let cantidad_monedas = 0;
/**
 * Inicializacion de los valores usados durante el juego y comienzo a los intervalos de los enemigos y monedas, adema de los movimientos del jugador
 */
function juego_start(){
  juego.limpiarEnemigos();
  cantidad_monedas = 0;
  document.getElementById('cant_monedas').innerHTML = cantidad_monedas + " X";
  document.getElementById('menu').style.visibility = "hidden";
  document.getElementById("points").innerHTML = "00000";
  if (document.getElementById("game_over").classList == "game_over"){
    document.getElementById("game_over").classList = "invisible";
  }
  document.getElementById("game_victory").classList = "invisible";
  juego.iniciarBgParalax();

  /**
   *  Intervalo para detectar el estado de las entidades
   */
  gameLoopInterval = setInterval( function(){
    /** Actualizacion de posicion del jugador */
    player.renovarPosicion();
    /**Deteccion de la tecla apretada, se busca la barra de espacio y no cualquier otra */
    if (typeKeyDown == ' '){
      player_jump();
    }
  
    /// MOVIMIENTO DE ENEMIGOS
    enemigos.forEach(element => {
      element.move();
    });

    /// Movimiento de las monedas
    recoletables.forEach(element => {
      element.move();
    })
  
    // Deteccion de colision con los enemigos
    checkCollision();

    // Deteccion de colision con las monedas;
    checkCoins();

    checkWin();

  },10);

  /** Suma de puntos por tiempo jugado */
  pointsInterval = setInterval( () => sumScore(1),500);

  /**
   * Intervalo para spawnear enemigos
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
      enemigo = new Enemy('5%','20px',enemy_count++,"dragon");
    }
    if (type_entity == 4){
      enemigo = new Enemy('5%','20px',enemy_count++,"slime");
    }
    enemigo.spawn();
    enemigos.push(enemigo);
  },2000);

  /**
   * Intervalo2 para spawnear enemigos
   */
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
      enemigo = new Enemy('5%','20px','enemy'+enemy_count++,"dragon");
    }
    if (type_entity == 4){
      enemigo = new Enemy('5%','20px','enemy'+enemy_count++,"slime");
    }
    enemigo.spawn();
    enemigos.push(enemigo);
  },3000);

  /**
   * Intervalo para crear monedas
   */
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
/**
 * Deteccion de la tecla apretada
 */
window.addEventListener('keydown',(event) => {
  typeKeyDown = event.key;
});
window.addEventListener('keyup',() =>{typeKeyDown = '';});

/**
 * Cheque de colision del player con lso enemigos
 */
function checkCollision(){
  if (player.checkCollision(enemigos)){
    document.getElementById("game_over").classList = "game_over";
    juego.finJuego();
  }
}
/**
 * Chequeo de colison del player con las monedas
 */
function checkCoins(){
  if (player.checkCollisionCoin(recoletables)){
    deleteCoin(500);
  }
}
/**
 * Borra el enemigo del arreglo y suma el valor correspondiente al puntaje
 * 
 * @param {B} score int con el valor a aumentar el score
 */
function deleteEnemy( score = 0){
  let toDelete = enemigos.shift();
  sumScore(score);
  toDelete.delete();
  // document.body.removeChild(document.getElementById(toDelete.getId()));
}

/**
 * Borra la moneda y suma el valor al puntaje, en caso de pasarla de largo, el puntase a sumar es 0;
 * 
 * @param {*} score int con valor a aumentar el score
 */
function deleteCoin(score = 0){
  let toDelete = recoletables.shift();
  sumScore(score);
  document.getElementById('cant_monedas').innerHTML = ++cantidad_monedas + " X";
  document.getElementById(toDelete.getId()).classList = 'grab';
  setTimeout( function (){
    toDelete.delete();
  },300 );
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

function checkWin(){
  if (parseInt(document.getElementById("points").innerHTML) >= 999){
    document.getElementById("game_victory").classList = "game_victory";
    juego.limpiarEnemigos();
    juego.finJuego(true);
  }
}
