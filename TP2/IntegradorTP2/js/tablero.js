class Tablero {
  #tablero=[];
  #tamanioX;
  #tamanioY;
  #pos_iniciox = 100;
  #pos_inicioy = 100;
  #tamanioCuadro = 100;
  #cantLinea = 4;
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
    this.#pos_finalx = this.#pos_iniciox+tamanioX*this.#pos_iniciox;
    this.#pos_finaly = this.#pos_inicioy+tamanioY*this.#pos_inicioy;
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

  getTamanioCubo(){
    return this.#tamanioCuadro;
  }

  //recibe una posicion en X y devuelve a que columna corresponde
  getColumnaFicha(posX){
    let i = 0;
    let x = this.getPosInicialx();
    while (i < this.getTamanioX()){
      if (posX >= x+i*x && posX < x+(i+1)*x){
        return i;
      }
      i++; 
    }
    return null;
  }

  //recibe numero de jugador y columna donde ingresar ficha. Chequea que pueda agregar la ficha y la agrega desde abajo
  insertarFicha(jugador, columna, color) {
    if (this.#tablero[columna][0] == 0){
      let fila = this.#tamanioY - 1;
      while (fila >= 0) {
        if (this.#tablero[columna][fila] == 0) {
          //asigna el numero correspondiente del jugador a la posicion de la matriz
          this.#tablero[columna][fila] = jugador;
          //invoca para dibujar la ficha en el tablero
          this.drawFicha(columna,fila,color);
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
    circulo.setPosition(x+columna*this.getTamanioCubo() + (this.getTamanioCubo())/2, y+fila*this.getTamanioCubo() + (this.getTamanioCubo())/2);
    circulo.draw();
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

  condicionFin(jugador) {
    if (this.#ultima_ficha_colocada.x == -1) {
      return false;
    }
    let gano = this.enLineaHorizontal(jugador);
    if (!gano) {
      gano = this.enLineaVertical(jugador);
    }
    /*if (!gano) {
      gano = this.enLineaDiagonalDerecha(jugador);
    }
    /*if (!gano) {
      gano = enLineaDiagonalIzquierda(jugador);
    }*/
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

  enLineaDiagonalDerecha(jugador) {
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
    posY = this.#ultima_ficha_colocada.y - 1;
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
    console.log(contador);
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
      ctx_canvas.fillRect(x+i*this.getTamanioCubo(), y+j*this.getTamanioCubo(), this.getTamanioCubo()-1, this.getTamanioCubo()-1);
      let circulo = new Circulo('white');
      circulo.setPosition(x+i*this.getTamanioCubo() + (this.getTamanioCubo()/2), y+j*this.getTamanioCubo() + (this.getTamanioCubo()/2));
      circulo.draw();
    }
  }
  ctx_canvas.stroke();
}

/*Tablero.prototype.draw = function(){
  console.log(canvas);
  ctx_canvas.beginPath();
  // Posicion tablero
  let x = this.getPosFinalX();
  let y = this.getPosFinalY();
  for (let i = this.getTamanioX(); i > 0; i--) {
    for (let j = this.getTamanioY(); j > 0 ; j--) {
      ctx_canvas.fillStyle = "green";
      ctx_canvas.fillRect(x-i*100, y-j*100, 99, 99);
      let circulo = new Circulo('white');
      circulo.setPosition(x-i*100 + 50, y-j*100 + 50);
      // los "+50" son por el tamaño del bloque/2 en donde va la ficha
      circulo.setPosition(x+i*100 + 50, y+j*100 +50);
      // circulo.setPosition(x+i*100 + (x+i)/2, y+j*100 + (y+j)/2);
      circulo.draw();
    }
  }
  ctx_canvas.stroke();
}*/