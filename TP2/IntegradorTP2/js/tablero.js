class Tablero {
  #tablero=[];
  #tamanioX;
  #tamanioY;
  #pos_iniciox = 100;
  #pos_inicioy = 100;
  #pos_finalx;
  #pos_finaly;

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
  insertarFicha(ficha, columna, color) {
    if (this.#tablero[columna][0] == 0){
      let fila = this.#tamanioY - 1;
      while (fila >= 0) {
        if (this.#tablero[columna][fila] == 0) {
          //asigna el numero correspondiente del jugador a la posicion de la matriz
          this.#tablero[columna][fila] = ficha;
          //invoca para dibujar la ficha en el tablero
          this.drawFicha(columna, fila, color);
          /*this.#tablero[columna][fila] = jugador;
          this.dibujarFicha(columna,fila,jugador);*/
          return true;
        }
        fila--;
      }
    }
    return false;
  }

  //recibe fila, columna y color de ficha y la dibuja en la posicion dentro de la matriz
  drawFicha(columna, fila, color) {
    let circulo = new Circulo(color);
    let x = this.#pos_iniciox;
    let y = this.#pos_inicioy;
    circulo.setPosition(x+columna*x + (x+columna)/2, y+fila*y + (y+fila)/2);
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
}

Tablero.prototype.draw = function(){
  ctx_canvas.beginPath();
  // Posicion tablero
  let x = this.getPosInicialx();
  let y = this.getPosInicialy();
  for (let i = 0; i < this.getTamanioX(); i++) {
    for (let j = 0; j < this.getTamanioY(); j++) {
      ctx_canvas.fillStyle = "green";
      ctx_canvas.fillRect(x+i*x, y+j*y, x-1, y-1);
      let circulo = new Circulo('white');
      circulo.setPosition(x+i*x + (x+i)/2, y+j*y + (y+j)/2);
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