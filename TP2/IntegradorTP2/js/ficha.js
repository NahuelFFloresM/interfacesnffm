class Ficha{
  #posX;
  #posY;
  #fill;
  #tamanio;

  constructor(color){
    this.#fill = color;
    this.#tamanio = 40;
    ctx_canvas.strokeStyle = color;
  }

  setFill(fill){
    this.#fill = fill;
  }

  setPosition(x,y){
    this.#posX = x;
    this.#posY = y;
  }

  getPosx(){
    return this.#posX;
  }

  getPosy(){
    return this.#posY;
  }

  setPosx(x){
    this.#posX = x;
  }

  setPosy(y){
    this.#posY = y;
  }

  getFill(){
    return this.#fill;
  }

  fillDraw(){
    ctx_canvas.fillStyle = this.#fill;
  }
  
  getTamanio(){
    return this.#tamanio;
  }

  setTamanio(tamanio){
    this.#tamanio = tamanio;
  }
}

Ficha.prototype.fillDraw = function(){
  ctx_canvas.fillStyle = this.getFill();
}