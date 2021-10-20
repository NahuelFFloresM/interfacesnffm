class Tablero {
  #tablero=[];
  #tamanioX;
  #tamanioY;
  #pos_iniciox = 175;
  #pos_inicioy = 80;
  #tamanioCuadro = 100;
  #cantLinea;
  #pos_finalx;
  #pos_finaly;
  #ultima_ficha_colocada = {};

  constructor(tamanioX, tamanioY, cantLinea){
    this.#tamanioX = tamanioX;
    this.#tamanioY = tamanioY;
    this.#cantLinea = cantLinea;
    this.#tablero = new Array(tamanioX);
    for (let i = 0; i < tamanioX; i++) {
      this.#tablero[i] = new Array(tamanioY);
      for (let j = 0; j < tamanioY; j++) {
        this.#tablero[i][j] = 0; 
      }
    }
    this.#tamanioCuadro = 600/tamanioX;
    this.#pos_finalx = this.#pos_iniciox+(tamanioX*this.#tamanioCuadro);
    this.#pos_finaly = this.#pos_inicioy+(tamanioY*this.#tamanioCuadro);
    this.#ultima_ficha_colocada.x = -1;
    this.#ultima_ficha_colocada.y = -1;
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
    return this.#pos_finalx;
  }
  getPosFinalY(){
    return this.#pos_finaly;
  }

  getTablero(){
    return this.#tablero;
  }

  getUltimaFichaColocada(){
    return this.#ultima_ficha_colocada;
  }

  getTamanioCubo(){
    return this.#tamanioCuadro;
  }

  //recibe una posicion en X y devuelve a que columna corresponde
  getColumnaFicha(ficha){
    let i = 0;
    let posX = ficha.getPosx();
    let x = this.getPosInicialx();
    if ((ficha.getPosy()+ficha.getRadius() <= this.#pos_inicioy) && (posX > this.#pos_iniciox) && (posX <= this.#pos_finalx)){
      while (i < this.getTamanioX()){
        if (posX >= x+i*this.#tamanioCuadro && posX < x+(i+1)*this.#tamanioCuadro){
          return i;
        }
        i++; 
      }
    }
    return null;
  }

  //recibe numero de jugador y columna donde ingresar ficha. Chequea que pueda agregar la ficha y la agrega desde abajo
  insertarFicha(jugador, columna, ficha) {
    if (this.#tablero[columna][0] == 0){
      let fila = this.#tamanioY - 1;
      while (fila >= 0) {
        if (this.#tablero[columna][fila] == 0) {
          //asigna el numero correspondiente del jugador a la posicion de la matriz
          this.#tablero[columna][fila] = jugador;
          ficha.reDraw(this.#pos_iniciox+columna*(this.#tamanioCuadro)+(this.#tamanioCuadro/2),this.#pos_inicioy+fila*(this.#tamanioCuadro)+(this.#tamanioCuadro/2));
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
   * Crea una nueva ficha a dibujar. Rellena el color,setea posicion y dibuja.
   * 
   * @param columna 
   * @param fila 
   * @param color 
   */
  drawFicha(columna, fila, color) {
    let circulo = new Circulo(color);
    let x = this.#pos_iniciox;
    let y = this.#pos_inicioy;
    circulo.setPosition(x+columna*this.#tamanioCuadro + (this.#tamanioCuadro)/2, y+fila*this.#tamanioCuadro + (this.#tamanioCuadro)/2);
    circulo.draw();
  }

  condicionFin(jugador) {
    if (this.#ultima_ficha_colocada.x == -1) {
      return false;
    }
    let gano = this.enLineaHorizontal(jugador);
    if (!gano) {
      gano = this.enLineaVertical(jugador);
    }
    if (!gano) {
      gano = this.enLineaDiagonalArriba(jugador);
    }
    if (!gano) {
      gano = this.enLineaDiagonalAbajo(jugador);
    }
    return gano;
  }

  enLineaHorizontal(jugador) {
    let contador = 0;
    let corte = false;
    let pos = this.#ultima_ficha_colocada.x;
    while (pos < this.#tamanioX && !corte) {
      if (this.#tablero[pos][this.#ultima_ficha_colocada.y] == jugador) {
        contador++;
      }
      else {
        corte = true;
      }
      pos++;
    }
    corte = false;
    pos = this.#ultima_ficha_colocada.x - 1;
    while (pos >= 0 && !corte) {
      if (this.#tablero[pos][this.#ultima_ficha_colocada.y] == jugador) {
        contador++;
      }
      else {
        corte = true;
      }
      pos--;
    }
    return contador == this.#cantLinea;
  }

  enLineaVertical(jugador) {
    let contador = 0;
    let corte = false;
    let pos = this.#ultima_ficha_colocada.y;
    while (pos < this.#tamanioY && !corte) {
      if (this.#tablero[this.#ultima_ficha_colocada.x][pos] == jugador) {
        contador++;
      }
      else {
        corte = true;
      }
      pos++;
    }
    return contador == this.#cantLinea;
  }

  enLineaDiagonalArriba(jugador) {
    let contador = 0;
    let corte = false;
    let posX = this.#ultima_ficha_colocada.x;
    let posY = this.#ultima_ficha_colocada.y;
    while (posX < this.#tamanioX && posY >= 0 && !corte) {
      if (this.#tablero[posX][posY] == jugador) {
        contador++;
      }
      else {
        corte = true;
      }
      posX++;
      posY--;
    }
    corte = false;
    posX = this.#ultima_ficha_colocada.x - 1;
    posY = this.#ultima_ficha_colocada.y + 1;
    while (posX >= 0 && posY < this.#tamanioY && !corte) {
      if (this.#tablero[posX][posY] == jugador) {
        contador++;
      }
      else {
        corte = true;
      }
      posX--;
      posY++;
    }
    return contador == this.#cantLinea;
  }

  enLineaDiagonalAbajo(jugador) {
    let contador = 0;
    let corte = false;
    let posX = this.#ultima_ficha_colocada.x;
    let posY = this.#ultima_ficha_colocada.y;
    while (posX >= 0 && posY >= 0 && !corte) {
      if (this.#tablero[posX][posY] == jugador) {
        contador++;
      }
      else {
        corte = true;
      }
      posX--;
      posY--;
    }
    corte = false;
    posX = this.#ultima_ficha_colocada.x + 1;
    posY = this.#ultima_ficha_colocada.y + 1;
    while (posX < this.#tamanioX && posY < this.#tamanioY && !corte) {
      if (this.#tablero[posX][posY] == jugador) {
        contador++;
      }
      else {
        corte = true;
      }
      posX++;
      posY++;
    }
    return contador == this.#cantLinea;
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
      ctx_canvas.fillRect(x+i*this.getTamanioCubo(), y+j*this.getTamanioCubo(), this.getTamanioCubo(), this.getTamanioCubo());
      let circulo = new Circulo('white');
      circulo.setPosition(x+i*this.getTamanioCubo() + (this.getTamanioCubo()/2), y+j*this.getTamanioCubo() + (this.getTamanioCubo()/2));
      circulo.draw();
    }
  }
  ctx_canvas.stroke();
}