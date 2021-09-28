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
    for (let i = 0; i < tamanioX; i++) {
      this.#tablero[i] = new Array(tamanioY);
    }
    this.#pos_finalx = this.#pos_iniciox+tamanioX*100;
    this.#pos_finaly = this.#pos_iniciox+tamanioX*100;
    this.#tablero = new Array(tamanioX);
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

  getPosInicialx(){
    return this.#pos_iniciox;
  }
  getPosInicialy(){
    return this.#pos_inicioy;
  }
}

Tablero.prototype.draw = function(){
  console.log(canvas);
  ctx_canvas.beginPath();
  // Posicion tablero
  let x = this.getPosInicialx();
  let y = this.getPosInicialy();
  for (let i = 0; i < this.getTamanioX(); i++) {
    for (let j = 0; j < this.getTamanioY(); j++) {
      ctx_canvas.fillStyle = "green";
      ctx_canvas.fillRect(x+i*100, y+j*100, 99, 99);
      let circulo = new Circulo();
      circulo.setPosition(x+i*100 + (x+i)/2, y+j*100 + (y+j)/2);
      circulo.draw();
    }
  }
  ctx_canvas.stroke();
}