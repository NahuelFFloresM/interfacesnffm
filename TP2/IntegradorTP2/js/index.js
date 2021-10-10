/**
 * Configuracion y seteado en general.
 */

/**
 * GLOBALES
 */
let image = null;
let canvas= document.getElementById("canvas");
let ctx_canvas = canvas.getContext('2d');
// Variables para tener control en caso de que el usuario selecciono un tamanio de tablero
let columnas_tablero;
let filas_tablero;
let cant_lineas;

/**
* FICHAS
*/
let ficha_seleccion;

/*
 * JUEGO
 */
this.columnas_tablero = 7;
this.filas_tablero = 6;
this.cant_lineas = 4;
let juego = new Juego(this.columnas_tablero, this.filas_tablero, this.cant_lineas);

/**
 * TABLERO
 */
let tablero = juego.getTablero();

document.addEventListener("DOMContentLoaded", function() {

  canvas.addEventListener('mousedown', function(evt) {
    // LLAMAR A FUNCION PARA SELECCIONAR FICHA
    if (juego.juegoIniciado()){            
      let m = oMousePos(canvas, evt);
      ficha_seleccion = juego.detectarFichaSeleccionada(m);
    }
  }, false);

  canvas.addEventListener('mouseup', function(evt) {
    if (juego.juegoIniciado()){
      let m = oMousePos(canvas, evt);
      let columna;
      //******************* SECCION PARA DETECTAR POSICION DE LA FICHA ARRASTRADA*************************************
      if ((ficha_seleccion != null) && punteroSobreTablero(evt)){
        //Chequea si hubo ganador para no aplicar accion sobre el tablero
        if (juego.elJugadorGano(1) || juego.elJugadorGano(2)){
          ficha_seleccion.drawPosicionOriginal();
        }
        else{
          columna = tablero.getColumnaFicha(ficha_seleccion.getPosx());
          //inserta la ficha en caso de tener disponibilidad. devuelve boolean y cambia el turno de jugador
          if (juego.insertarFicha(ficha_seleccion,columna)){
            juego.cambiarTurno();
          }
        }
      } else {
        ficha_seleccion.drawPosicionOriginal();
        juego.redibujarFichas(ficha_seleccion,2);
        juego.redibujarFichas(ficha_seleccion,1);
      }
      //CHEQUEA SI HUBO GAANDOR Y MUESTRA MODAL INDICANDOLO
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
      ficha_seleccion = null;
    }
  }, false);
  /**
   * Deja de dibujar cuando te salis del canvas
   */
   canvas.addEventListener("mouseout", function(evt) {
    ctx_canvas.closePath();
  }, false);

  canvas.addEventListener("mousemove", function(evt) {
    if (ficha_seleccion != null) {
      let m = oMousePos(canvas, evt);      
      // Chequeo Colision sobre tablero
      if (!pisaTablero(m.x,m.y)){
        if (m.x < tablero.getPosInicialx()){
          juego.redibujarFichas(ficha_seleccion,1);
        }
        if (m.x > tablero.getPosFinalX()){
          juego.redibujarFichas(ficha_seleccion,2);
        }
        ficha_seleccion.reDraw(m.x,m.y);
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
  let r = ficha_seleccion.getRadius();
  if (((x+r >= posTablerox) && (y+r >= posTableroy) && (x-r <= posTablerofinx) && (y-r <= posTablerofiny)) ){
    return true;
  }
  return false;
}

//redibuja la posicion original donde se encontraba la ficha
function posOriginalFicha(ficha,x,y){
  let r = ficha.getRadius()+1;
  let t = ficha.getTamanio()*2+2;
  ctx_canvas.clearRect(ficha.getPosx()-r,ficha.getPosy()-r,t,t);
  ficha.reDraw(x,y);
}

//reinicia el juego, limpia el canvas y redibuja el tablero con las fichas. Vuelve a habilitar los botones de la izquierda
function reiniciarJuego(){
  juego.pararJuego();
  ctx_canvas.clearRect(0, 0, canvas.width, canvas.height);
  juego = new Juego(this.columnas_tablero,this.filas_tablero,this.cant_lineas);
  tablero = juego.getTablero();
  tablero.draw();
  let botones_tablero = document.getElementsByClassName('button_tiempo_juego');
  for (let i = 0; i < botones_tablero.length; i++) {
    botones_tablero[i].disabled = false;
  } 
}

//muestra modal de ganador de partida
function mostrarModal(){
  var myModal = new bootstrap.Modal(document.getElementById('message_modal'), {
    keyboard: false
  })
  myModal.toggle();
}

//inicia el juego y deshabilita los botones de la izquierda para no usarse durante la partida
function iniciarJuego(){
  juego.iniciarJuego();
  let botones_tablero = document.getElementsByClassName('button_tiempo_juego');
  for (let i = 0; i < botones_tablero.length; i++) {
    botones_tablero[i].disabled = true;
  }
}

//sete el tiempo de juego que indico el usuario para arrancar el temporizador al iniciar partida
function setearTiempoJuego(){
  juego.setTiempoDeJuego(document.getElementById('input_tiempo_juego').value-1);
}

//actualiza los datos del tablero y lineas para ganar al nuevo indicado en caso que no haya partida iniciada.
//reinicia el juego para actualizar visualizacion
function setearTamanioTablero(x,y,cantLineas){
  if (!juego.juegoIniciado()){
    this.columnas_tablero = x;
    this.filas_tablero = y;
    this.cant_lineas = cantLineas;
    reiniciarJuego(x,y,cantLineas);
  }
}