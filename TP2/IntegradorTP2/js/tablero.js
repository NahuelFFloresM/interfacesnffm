class Tablero{
  #tablero=[];
  #tamanio;
  #pos_iniciox = 100;
  #pos_inicioy = 100;

  constructor(tamanio){
    this.#tamanio = tamanio;
    for (let i = 0; i < tamanio; i++) {
      this.#tablero[i] = new Array(tamanio);
    }
    this.#tablero = new Array(tamanio);
  }

  getTamanio(){
    return this.#tamanio;
  }

  setTamanio(tamanio){
    this.#tamanio = tamanio;
  }

  getPosInicialx(){
    return this.#pos_iniciox;
  }
  getPosInicialy(){
    return this.#pos_inicioy;
  }
}

Tablero.prototype.draw = function(){
  ctx_canvas.beginPath();
  // Posicion tablero
  let x = this.getPosInicialx();
  let y = this.getPosInicialy();
  for (let i = 1; i < this.getTamanio()+1; i++) {
    for (let j = 1; j < this.getTamanio()+1; j++) {
      ctx_canvas.fillStyle = "green";
      ctx_canvas.fillRect(i*x, j*y, 99, 99);
    }
  }
  ctx_canvas.stroke();
}