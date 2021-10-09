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
let columnas_tablero;
let filas_tablero;
/**
* FICHAS
*/
let ficha_j1 = new Circulo('Red');
ficha_j1.setPosition(50,50);
ficha_j1.setBackgroundImage('data:image/jpeg;base64,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');
ficha_j1.draw();

//https://www.gravatar.com/avatar/4af2cdbaf02d97ba88d5d6daff94fbae/?default=&s=80


let ficha_j2 = new Circulo('Blue');
ficha_j2.setPosition(850,50);
ficha_j2.setFill('blue');
ficha_j2.setBackgroundImage('data:image/png;base64,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');
ficha_j2.draw();

/*
 * JUEGO
 */
this.columnas_tablero = 7;
this.filas_tablero = 6;
let juego = new Juego(this.columnas_tablero, this.filas_tablero);

/**
 * TABLERO
 */
let tablero = juego.getTablero();

/***** FICHA AUXILIAR PARA PROBAR POSICIONES */
let ficha_aux = new Circulo('black');
ficha_aux.setPosition(100,50);
ficha_aux.draw();

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
  ctx_canvas.clearRect(0, 0, canvas.width, canvas.height);
  juego = new Juego(this.columnas_tablero,this.filas_tablero);
  tablero = juego.getTablero();
  tablero.draw();
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