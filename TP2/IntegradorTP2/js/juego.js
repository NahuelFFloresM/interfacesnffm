class Juego{
  #tablero;
  // 0 Turno J1, 1 Turno J2
  #turno_jugador;
  #tiempo_limite;
  #nIntervTimer;
  
  constructor(){
    this.#tablero = new Tablero(7,6);
    this.#tablero.draw();
    this.#turno_jugador = 0;
  }

  cambiarTurno(){
    this.#turno_jugador = this.#turno_jugador == 0 ? 0:1;
  }

  colocarFicha(colN){
    // TO DO
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

}

// Juego.prototype.iniciarTiempo() = function(){
//   this.setInterval();
// }

// Juego.prototype.pararTiempo() = function(){
//   this.stopInterval();
// }