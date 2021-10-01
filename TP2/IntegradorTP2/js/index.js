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
/**
* FICHAS
*/
let ficha_j1 = new Circulo('Red');
ficha_j1.setPosition(50,50);
ficha_j1.draw();

let ficha_j2 = new Circulo('Blue');
ficha_j2.setPosition(850,50);
ficha_j2.draw();

/*
 * JUEGO
 */
let juego = new Juego();
// juego.setInterval();

/**
 * TABLERO
 */
let tablero = juego.getTablero();

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
    let m = oMousePos(canvas, evt);
    if (punteroSobreFicha(evt,ficha_j1)){      
      arrastrando_ficha_j1 = true;
    }
    if (punteroSobreFicha(evt,ficha_j2)){
      arrastrando_ficha_j2 = true;
    }
  }, false);

  canvas.addEventListener('mouseup', function(evt) {
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
      if (juego.insertarFicha(1,columna)){
        juego.cambiarTurno();        
      }
    }
    else if (punteroSobreFicha(evt,ficha_j2) && punteroSobreTablero(evt)){
      console.log("Correcto - Ficha2");
      //obtiene la columna en la que se esta intentando agregar la ficha
      columna = tablero.getColumnaFicha(ficha_j2.getPosx());
      //inserta la ficha en caso de tener disponibilidad. devulve boolean
      if (juego.insertarFicha(2,columna)){
        juego.cambiarTurno();        
      }
    }
    // Reinicio de fichas a su posician actual
    posOriginalFicha(ficha_j1,50,50);
    posOriginalFicha(ficha_j2,850,50);
    juego.elJugadorGano();
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