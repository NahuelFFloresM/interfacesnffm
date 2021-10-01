class Juego{
  #tablero;
  // 0 Turno J1, 1 Turno J2
  #turno_jugador;
  #tiempo_limite;
  #nIntervTimer;
  
  constructor(){
    this.#tablero = new Tablero(7,6);
    this.#tablero.draw();
    this.#turno_jugador = 1;
  }

  cambiarTurno(){
    this.#turno_jugador = this.#turno_jugador == 1 ? 2:1;
  }

  getInterval(){
    return this.#nIntervTimer;
  }

  setInterval(){
    this.getInterval = setInterval(function(){
      console.log('tiempo');
    }, 1000);
  }

  stopInterval(){
    clearInterval(this.#nIntervTimer);
  }

  getTablero(){
    return this.#tablero;
  }
/**
 * 
 * @param jugador Entero con el jugador a insertar en la matriz, se lo compara con el turno actual guardado en la clase juego
 * @param columna 
 * @returns boolean si se coloco con exito
 */
  insertarFicha(jugador,columna){
    if (this.#turno_jugador == jugador){
      //inserta la ficha en caso de tener disponibilidad. devulve boolean
      return this.#tablero.insertarFicha(jugador, columna);
    } else{
      console.log('TURNO EQUIVOCADO');
    }
  }

  elJugadorGano(){
    //return this.#tablero.condicionFin();
  }



}

// Juego.prototype.iniciarTiempo() = function(){
//   this.setInterval();
// }

// Juego.prototype.pararTiempo() = function(){
//   this.stopInterval();
// }