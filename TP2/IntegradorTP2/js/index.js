/**
 * Configuracion y seteado en general.
 */

/**
 * GLOBALES
 */
let image = null;
let canvas= document.getElementById("canvas");
let ctx_canvas = canvas.getContext('2d');
let arrastrando = false;
/**
* FICHAS
*/
let ficha_p1 = new Circulo();
ficha_p1.setPosition(50,50);
ficha_p1.draw();

/**
 * TABLERO
 */
let tablero = new Tablero(7, 6);
tablero.draw();



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
    if (punteroSobreFicha(evt)){      
      arrastrando = true;
    }
  }, false);

  canvas.addEventListener('mouseup', function(evt) {
    arrastrando = false;
  }, false);
  /**
   * Deja de dibujar cuando te salis del canvas
   */
   canvas.addEventListener("mouseout", function(evt) {
    arrastrando = false;
    // REINICIAR FICHAS
    ctx_canvas.closePath();
  }, false);

  canvas.addEventListener("mousemove", function(evt) {
    if (arrastrando) {
      let m = oMousePos(canvas, evt);
      let r = ficha_p1.getRadius()+1;
      let t = ficha_p1.getTamanio()*2+2;
      // Chequeo Colision sobre tablero
      // TO DO EJES e Identificacion de ficha jugando
      if (!pisaTablero(m.x,m.y)){
        ctx_canvas.clearRect(ficha_p1.getPosx()-r,ficha_p1.getPosy()-r,t,t);
        ficha_p1.reDraw(m.x,m.y);
      }
    }
  }, false);
});


function oMousePos(canvas, evt) {
  let ClientRect = canvas.getBoundingClientRect();
  return { 
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}

function punteroSobreFicha(evt){
  let m = oMousePos(canvas, evt);
  if (m.x > (ficha_p1.getPosx()-20) && m.x < (ficha_p1.getPosx()+20)){
    if (m.y > (ficha_p1.getPosy()-20) && m.y < (ficha_p1.getPosy()+20)){
      return true;
    }
  }
  return false;
}

function pisaTablero(x,y){
  let posTableroy = tablero.getPosInicialy();
  let posTablerox = tablero.getPosInicialx();
  let r = ficha_p1.getRadius();
  if ((y+r >= posTableroy) && (x+r >= posTablerox)){
    return true;
  }
  if ((x+r >= posTablerox) && (y+r >= posTableroy)){
    return true;
  }
  return false;
}