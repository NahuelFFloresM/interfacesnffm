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
  insertarFicha(ficha,columna){
    if (ficha != null){
      //inserta la ficha en caso de tener disponibilidad. devulve boolean
      let result = this.#tablero.insertarFicha(this.#turno_jugador,columna,ficha);
      if (result){
        this.removerFicha(ficha,this.#turno_jugador);
      }
      return result;
    } else{
      console.log('TURNO EQUIVOCADO');
    }
  }

  elJugadorGano(jugador){
    return this.#tablero.condicionFin(jugador);
  }
/**
 * Devuelve la ficha pisada por el puntero, busca en los arreglos segun el turno del jugador
 * 
 * @param m OBJETO con las posiciones x e y del puntero on mousedown
 * @returns 
 */
  detectarFichaSeleccionada(m){
    if (this.#turno_jugador == 1){
      for(let i = 0; i < this.#fichasJ1.length;i++){
        if ((m.x-20 < this.#fichasJ1[i].getPosx() && m.x+20 > this.#fichasJ1[i].getPosx()) && (m.y-20 < this.#fichasJ1[i].getPosy()&& m.y+20 > this.#fichasJ1[i].getPosy())){
          return this.#fichasJ1[i];
        }
      }
    }
    if (this.#turno_jugador == 2){
      for(let i = 0; i < this.#fichasJ2.length;i++){
        if ((m.x-20 < this.#fichasJ2[i].getPosx() && m.x+20 > this.#fichasJ2[i].getPosx()) && (m.y-20 < this.#fichasJ2[i].getPosy()&& m.y+20 > this.#fichasJ2[i].getPosy())){
          return this.#fichasJ2[i];
        }
      }
    }
    return null;
  }
/**
 * Recibe la ficha a eliminar y el jugador para saber en que arreglo buscar 
 * 
 * @param ficha 
 * @param jugador 
 */
  removerFicha(ficha,jugador){
    if (jugador == 1){
      for(let i = 0; i < this.#fichasJ1.length;i++){
        if (this.#fichasJ1[i] == ficha){
          this.#fichasJ1.splice(i,1);
        }
      }
    } else {
      for(let i = 0; i < this.#fichasJ2.length;i++){
        if (this.#fichasJ2[i] == ficha){
          this.#fichasJ2.splice(i,1);
        }
      }
    }
  }
/**
 * 
 * @param ficha_actual 
 * @param lado de que lado del tablero esta para saber que lista redibujar de fichas.
 */
  redibujarFichas(ficha_actual,lado){
    if (lado == 1){
      for(let i = 0; i < this.#fichasJ1.length;i++){
        if (this.#fichasJ1[i] != ficha_actual){
          this.#fichasJ1[i].draw();
        }
      }
    } else {
      for(let i = 0; i < this.#fichasJ2.length;i++){
        if (this.#fichasJ2[i] != ficha_actual){
          this.#fichasJ2[i].draw();
        }
      }
    }
  }

/**
 * Recibe string con el fondo a asignar
 * 
 * @param fondo_f1 
 * @param fondo_f2 
 */
  asignarFondoFichas(fondo_f1,fondo_f2){
    if (!juego.juegoIniciado()){
      for(let i = 0; i < this.#fichasJ1.length;i++){
        this.#fichasJ1[i].setBackgroundImage(fondo_f1);
        this.#fichasJ1[i].drawPosicionOriginal();
      }
      for(let i = 0; i < this.#fichasJ2.length;i++){
        this.#fichasJ2[i].setBackgroundImage(fondo_f2);
        this.#fichasJ2[i].drawPosicionOriginal();
      }
    }
  }
}