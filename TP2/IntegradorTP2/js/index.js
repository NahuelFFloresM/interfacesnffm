/**
 * Configuracion y seteado en general.
 */

/**
 * GLOBALES
 */
let image = null;
let canvas= document.getElementById("canvas");
let ctx_canvas = canvas.getContext('2d');
let arrastrando_ficha_j1 = false;
let arrastrando_ficha_j2 = false;
// Variables para tener control en caso de que el usuario selecciono un tamanio de tablero
let columnas_tablero = 7;
let filas_tablero = 6;
/**
* FICHAS
*/
let ficha_j1 = new Circulo('Red');
ficha_j1.setPosition(50,50);
ficha_j1.setFill('red');
ficha_j1.setBackgroundImage('https://www.gravatar.com/avatar/4af2cdbaf02d97ba88d5d6daff94fbae/?default=&s=80');
ficha_j1.draw();



let ficha_j2 = new Circulo('Blue');
ficha_j2.setPosition(850,50);
ficha_j2.setFill('blue');
ficha_j2.setBackgroundImage('data:image/png;base64,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');
ficha_j2.draw();

/*
 * JUEGO
 */
let juego = new Juego(7,6);

/**
 * TABLERO
 */
let tablero = juego.getTablero();

/***** FICHA AUXILIAR PARA PROBAR POSICIONES */
// let ficha_aux = new Circulo('black');
// ficha_aux.setPosition(150,530);
// ficha_aux.draw();

document.addEventListener("DOMContentLoaded", function() {


  /**
   * Parmetros en secuncia
   * image = datos de la imagen
   * 1 y 2 -> posicion en donde empieza a leer la imagen
   * 3 y 4 -> tamaño de pixeles/datos que toma desde ese punto
   * 5 y 6 -> posicion x y en donde va a dibujar los datos
   * 7 y 8 -> tamaño en donde se va a dibujar los datos tomados
   */
  // ctx.drawImage(image,90,130,50,50,10,10,50,50);
  // ctx.drawImage(image,90,50,50,50,60,60,50,50);
  // ctx.drawImage(image,50,130,130,130,150,150,50,50);
  // ctx.drawImage(image,0,10,50,50,200,200,50,50);

  canvas.addEventListener('mousedown', function(evt) {
    // LLAMAR A FUNCION PARA SELECCIONAR FICHA
    if (juego.juegoIniciado()){
      let m = oMousePos(canvas, evt);
      if (punteroSobreFicha(evt,ficha_j1)){      
        arrastrando_ficha_j1 = true;
      }
      if (punteroSobreFicha(evt,ficha_j2)){
        arrastrando_ficha_j2 = true;
      }
    }
  }, false);

  canvas.addEventListener('mouseup', function(evt) {
    if (juego.juegoIniciado()){
      arrastrando_ficha_j1 = false;
      arrastrando_ficha_j2 = false;
      let m = oMousePos(canvas, evt);
      let columna;
      //******************* SECCION PARA DETECTAR POSICION DE LA FICHA ARRASTRADA*************************************
      if (punteroSobreFicha(evt,ficha_j1) && punteroSobreTablero(evt)){
        console.log("Correcto - Ficha1");
        //obtiene la columna en la que se esta intentando agregar la ficha
        columna = tablero.getColumnaFicha(ficha_j1.getPosx());
        //inserta la ficha en caso de tener disponibilidad. devulve boolean
        if (juego.insertarFicha(1,ficha_j1,columna) && !juego.elJugadorGano(1)){
          juego.cambiarTurno();
        }
      }
      else if (punteroSobreFicha(evt,ficha_j2) && punteroSobreTablero(evt)){
        console.log("Correcto - Ficha2");
        //obtiene la columna en la que se esta intentando agregar la ficha
        columna = tablero.getColumnaFicha(ficha_j2.getPosx());
        //inserta la ficha en caso de tener disponibilidad. devulve boolean
        if (juego.insertarFicha(2,ficha_j2,columna) && !juego.elJugadorGano(2)){
          juego.cambiarTurno();
        }
      }
      // Reinicio de fichas a su posician actual
      posOriginalFicha(ficha_j1,50,50);
      posOriginalFicha(ficha_j2,850,50);
      if (juego.elJugadorGano(1)) {
        document.getElementById('message_label').innerHTML = "VICTORIA";
        document.getElementById('message_body').innerHTML = "¡¡Felicidades Jugador "+1+ "!! GANASTE LA PARTIDA";
        mostrarModal();
      }
      if (juego.elJugadorGano(2)){
        document.getElementById('message_label').innerHTML = "VICTORIA";
        document.getElementById('message_body').innerHTML = "¡¡Felicidades Jugador "+2+ "!! GANASTE LA PARTIDA";
        mostrarModal();
      }
    }
  }, false);
  /**
   * Deja de dibujar cuando te salis del canvas
   */
   canvas.addEventListener("mouseout", function(evt) {
    arrastrando_ficha_j1 = false;
    arrastrando_ficha_j2 = false;
    posOriginalFicha(ficha_j1,50,50);
    posOriginalFicha(ficha_j2,850,50);
    ctx_canvas.closePath();
  }, false);

  canvas.addEventListener("mousemove", function(evt) {
    if (arrastrando_ficha_j1) {
      let m = oMousePos(canvas, evt);
      let r = ficha_j1.getRadius()+1;
      let t = ficha_j1.getTamanio()*2+2;
      // Chequeo Colision sobre tablero
      if (!pisaTablero(m.x,m.y)){
        ctx_canvas.clearRect(ficha_j1.getPosx()-r,ficha_j1.getPosy()-r,t,t);
        ficha_j1.reDraw(m.x,m.y);
      }
    }
    if (arrastrando_ficha_j2) {
      let m = oMousePos(canvas, evt);
      let r = ficha_j2.getRadius()+1;
      let t = ficha_j2.getTamanio()*2+2;
      // Chequeo Colision sobre tablero
      if (!pisaTablero(m.x,m.y)){
        ctx_canvas.clearRect(ficha_j2.getPosx()-r,ficha_j2.getPosy()-r,t,t);
        ficha_j2.reDraw(m.x,m.y);
      }
    }
  }, false);
});

// Lectura de la psocicion del puntero del mouse
function oMousePos(canvas, evt) {
  let ClientRect = canvas.getBoundingClientRect();
  return { 
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

//Verifica si el puntero se encuentra dentro de la ficha
function punteroSobreFicha(evt,ficha){
  if (ficha != null){
    let m = oMousePos(canvas, evt);
    if (m.x > (ficha.getPosx()-20) && m.x < (ficha.getPosx()+20)){
      if (m.y > (ficha.getPosy()-20) && m.y < (ficha.getPosy()+20)){
        return true;
      }
    }
  }
  return false;
}

//Verifica si el puntero se encuentra entre el inicio y fin de la posicion X del tablero
function punteroSobreTablero(evt){
  let m = oMousePos(canvas, evt);
  if (m.x > (tablero.getPosInicialx()) && m.x < (tablero.getPosFinalX())){
    return true;
  }
  return false;
}

function pisaTablero(x,y){
  let posTableroy = tablero.getPosInicialy();
  let posTablerox = tablero.getPosInicialx();
  let posTablerofinx = tablero.getPosFinalX();
  let posTablerofiny = tablero.getPosFinalY();
  let r = ficha_j1.getRadius();
  if ((y+r >= posTableroy) && (x+r >= posTablerox) && (y-r <= posTablerofiny) && (x- r <= posTablerofinx)){
    return true;
  }
  return false;
}

function posOriginalFicha(ficha,x,y){
  let r = ficha.getRadius()+1;
  let t = ficha.getTamanio()*2+2;
  ctx_canvas.clearRect(ficha.getPosx()-r,ficha.getPosy()-r,t,t);
  ficha.reDraw(x,y);
}

function reiniciarJuego(){
  juego.pararJuego();
  ctx_canvas.clearRect(0, 0, canvas.width, canvas.height)
  juego = new Juego(this.columnas_tablero,this.filas_tablero);
  tablero = juego.getTablero(); 
  ficha_j1.draw();
  ficha_j2.draw();
  document.getElementById('button_tiempo_juego').disabled = false;  
}

function mostrarModal(){
  var myModal = new bootstrap.Modal(document.getElementById('message_modal'), {
    keyboard: false
  })
  myModal.toggle();
}

function iniciarJuego(){
  juego.iniciarJuego();
  document.getElementById('button_tiempo_juego').disabled = true;
}

function setearTiempoJuego(){
  juego.setTiempoDeJuego(document.getElementById('input_tiempo_juego').value-1);
}

function setearTamanioTablero(x,y){
  if (!juego.juegoIniciado()){
    this.columnas_tablero = x;
    this.filas_tablero = y;
    reiniciarJuego(x,y)
  }
}