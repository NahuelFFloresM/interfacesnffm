class Tablero {
  #tablero=[];
  #tamanioX;
  #tamanioY;
  #pos_iniciox = 100;
  #pos_inicioy = 100;
  #pos_finalx;
  #pos_finaly;
  #ultima_ficha_colocada = {};

  constructor(tamanioX, tamanioY){
    this.#tamanioX = tamanioX;
    this.#tamanioY = tamanioY;
    this.#tablero = new Array(tamanioX);
    for (let i = 0; i < tamanioX; i++) {
      this.#tablero[i] = new Array(tamanioY);
      for (let j = 0; j < tamanioY; j++) {
        this.#tablero[i][j] = 0; 
      }
    }
    this.#pos_finalx = this.#pos_iniciox+tamanioX*100;
    this.#pos_finaly = this.#pos_iniciox+tamanioX*100;
  }

  getTamanioX(){
    return this.#tamanioX;
  }

  getTamanioY(){
    return this.#tamanioY;
  }

  setTamanioY(tamanio){
    this.#tamanioY = tamanio;
  }

  setTamanioX(tamanio){
    this.#tamanioX = tamanio;
  }

  getPosInicialx(){
    return this.#pos_iniciox;
  }
  getPosInicialy(){
    return this.#pos_inicioy;
  }

  getPosFinalX(){
    return this.#pos_iniciox * (this.#tamanioX+1);
  }
  getPosFinalY(){
    return this.#pos_inicioy * (this.#tamanioY+1);
  }

  getTablero(){
    return this.#tablero;
  }

  getUltimaFichaColocada(){
    return this.#ultima_ficha_colocada;
  }

  //recibe una posicion en X y devuelve a que columna corresponde
  getColumnaFicha(posX){
    let i = 0;
    let x = this.getPosInicialx();
    while (i < this.getTamanioX()){
      if (posX > x+i*100 && posX < x+(i+1)*100){
        return i;
      }
      i++; 
    }
    return null;
  }

  //recibe numero de jugador y columna donde ingresar ficha. Chequea que pueda agregar la ficha y la agrega desde abajo
  insertarFicha(jugador, columna) {
    console.log(this.#tablero[columna][0]);
    if (this.#tablero[columna][0] == 0){
      let fila = this.#tamanioY - 1;
      while (fila >= 0) {
        if (this.#tablero[columna][fila] == 0) {
          this.#tablero[columna][fila] = jugador;
          this.dibujarFicha(columna,fila,jugador);
          this.#ultima_ficha_colocada.x = columna;
          this.#ultima_ficha_colocada.y = fila;
          return true;
        }
        fila--;
      }
    }
    return false;
  }

  /**
   * Crea una nueva ficha a dibujar segun el jugador en turno. Rellena el color,setea posicion y dibuja.
   * 
   * @param columna 
   * @param fila 
   * @param jugador 
   */
  dibujarFicha(columna,fila,jugador){
    let fichaAcolocar = new Circulo('white');
    if (jugador == 1){
      fichaAcolocar.setFill('red');
      // los "+50" son por el tamaño del bloque/2 en donde va la ficha
      fichaAcolocar.setPosition(this.#pos_iniciox+(columna*100)+50,this.#pos_inicioy+(fila*100)+50);
      fichaAcolocar.draw();
    } else {
      fichaAcolocar.setFill('blue');
      fichaAcolocar.setPosition(this.#pos_iniciox+(columna*100)+50,this.#pos_inicioy+(fila*100)+50);
      fichaAcolocar.draw();
    }
  }
}

Tablero.prototype.draw = function(){
  ctx_canvas.beginPath();
  // Posicion tablero
  let x = this.getPosInicialx();
  let y = this.getPosInicialy();
  for (let i = 0; i < this.getTamanioX(); i++) {
    for (let j = 0; j < this.getTamanioY(); j++) {
      ctx_canvas.fillStyle = "green";
      ctx_canvas.fillRect(x+i*100, y+j*100, 99, 99);
      let circulo = new Circulo('white');
      // los "+50" son por el tamaño del bloque/2 en donde va la ficha
      circulo.setPosition(x+i*100 + 50, y+j*100 +50);
      // circulo.setPosition(x+i*100 + (x+i)/2, y+j*100 + (y+j)/2);
      circulo.draw();
    }
  }
  ctx_canvas.stroke();
}