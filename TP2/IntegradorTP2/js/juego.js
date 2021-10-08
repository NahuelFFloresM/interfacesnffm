class Juego{
  #tablero;
  // 0 Turno J1, 1 Turno J2
  #turno_jugador;
  #juego_iniciado = false;
  #nIntervTimer;
  #minutos = 59;
  #segundos = 59;
  
  constructor(columnas,filas){
    this.#tablero = new Tablero(columnas,filas);
    this.#tablero.draw();
    this.#turno_jugador = 1;
  }

  cambiarTurno(){
    this.#turno_jugador = this.#turno_jugador == 1 ? 2:1;
    document.getElementById('turno_jugador').innerHTML = this.#turno_jugador;
  }

  getInterval(){
    return this.#nIntervTimer;
  }

  iniciarJuego(){
    if(!juego.juegoIniciado()){
      this.#nIntervTimer = setInterval(() => this.actualizarReloj(), 1000);    
      this.#juego_iniciado = true;
      document.getElementById('turno_jugador').innerHTML = 1;
    }
  }

  actualizarReloj(){
    if (this.#segundos == 0){
      this.#minutos--;
      this.#segundos = 60;
    }
    this.#segundos--;
    document.getElementById('reloj_juego').innerHTML= this.#minutos+":"+this.#segundos;
    if (this.#segundos == 0 && this.#minutos == 0){
      this.#juego_iniciado = false;
      // LLAMAR AFUNCION PARA MOSTRAR FIN DE JUEGO
    }
  }

  pararJuego(){
    clearInterval(this.#nIntervTimer);
    this.#minutos = 59;
    this.#segundos = 59;
    this.#juego_iniciado = false;
    document.getElementById('reloj_juego').innerHTML= "--:--";
    document.getElementById('turno_jugador').innerHTML = '>:D';
  }

  getTablero(){
    return this.#tablero;
  }

  juegoIniciado(){
    return this.#juego_iniciado;
  }

  setTiempoDeJuego(minutos){
    this.#minutos = minutos;
    this.#segundos = 60;
  }
/**
 * 
 * @param jugador Entero con el jugador a insertar en la matriz, se lo compara con el turno actual guardado en la clase juego
 * @param columna 
 * @returns boolean si se coloco con exito
 */
  insertarFicha(jugador,ficha,columna){
    if (this.#turno_jugador == jugador){
      //inserta la ficha en caso de tener disponibilidad. devulve boolean
      return this.#tablero.insertarFicha(jugador, columna,ficha);
    } else{
      console.log('TURNO EQUIVOCADO');
    }
  }

  elJugadorGano(jugador){
    return this.#tablero.condicionFin(jugador);
  }



}

// Juego.prototype.iniciarTiempo() = function(){
//   this.setInterval();
// }

// Juego.prototype.pararTiempo() = function(){
//   this.stopInterval();
// }