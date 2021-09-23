class Ficha{
  #posX;
  #posY;
  #fill;

  constructor(color){
    this.#fill = color;
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

  fillDraw(){
    // ctx_canvas.arc(this.#posX,this.#posY,this.#width,this.#height);
    // ctx_canvas.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx_canvas.fillStyle = this.#fill;
    // ctx_canvas.stroke();
  }
}