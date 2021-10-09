class Juego{
  #tablero;
  // 0 Turno J1, 1 Turno J2
  #turno_jugador;
  #juego_iniciado = false;
  #nIntervTimer;
  #minutos = 59;
  #segundos = 59;
  #fichasJ1 = [];
  #fichasJ2 = [];
  
  constructor(columnas,filas,cantLineas){
    this.#tablero = new Tablero(columnas,filas,cantLineas);
    this.#tablero.draw();
    this.#turno_jugador = 1;
    let pos_inicio_fichaX_j1 = 25;
    let pos_inicio_fichaY_j1 = 40;
    let pos_inicio_fichaX_j2 = 850;
    let pos_inicio_fichaY_j2 = 40;
    let cant_fichas = (columnas*filas)/2
    for(let i = 1; i <= cant_fichas;i++){
      let new_ficha = new Circulo('red');
      new_ficha.setPosition(pos_inicio_fichaX_j1,pos_inicio_fichaY_j1);
      new_ficha.draw();
      this.#fichasJ1.push(new_ficha);
      if (i%3 > 0){
        pos_inicio_fichaX_j1 += 50;
      } else{
        pos_inicio_fichaX_j1 = 25;
        pos_inicio_fichaY_j1 += 50;
      }
    }
    for(let i = 1; i <= cant_fichas;i++){
      let new_ficha = new Circulo('blue');
      new_ficha.setPosition(pos_inicio_fichaX_j2,pos_inicio_fichaY_j2);
      new_ficha.draw();
      this.#fichasJ2.push(new_ficha);
      if (i%3 > 0){
        pos_inicio_fichaX_j2 += 50;
      } else{
        pos_inicio_fichaX_j2 = 850;
        pos_inicio_fichaY_j2 += 50;
      }
    }
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
      this.tiempoFuera();      
      // LLAMAR AFUNCION PARA MOSTRAR FIN DE JUEGO
    }
  }

  tiempoFuera(){
    this.#juego_iniciado = false;
    this.pararJuego();
    document.getElementById('message_label').innerHTML = "TIEMPO FUERA";
    document.getElementById('message_body').innerHTML = "Nadie gana, ¡intenten nuevamente! :D";
    mostrarModal();
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