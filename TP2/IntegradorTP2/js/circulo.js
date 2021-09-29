class Circulo extends Ficha{
  #radius = 20;

  constructor(color){
    super(color);
    super.setTamanio(this.#radius);
  }

  getPosx(){
    return super.getPosx();
  }

  getPosy(){
    return super.getPosy();
  }

  getRadius(){
    return this.#radius;
  }

  getTamanio(){
    return super.getTamanio();
  }
}

Circulo.prototype.draw = function(){
  ctx_canvas.beginPath();
  this.fillDraw();
  ctx_canvas.arc(this.getPosx(), this.getPosy(), this.getRadius(), 0, 2 * Math.PI);
  ctx_canvas.fill();
  ctx_canvas.stroke();
}

Circulo.prototype.reDraw = function(x,y){
  this.setPosx(x);
  this.setPosy(y);
  this.draw();
}