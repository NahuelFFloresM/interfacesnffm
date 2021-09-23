class Circulo extends Ficha{
  #radius = 20;

  constructor(){
    super('red');
    super.setFill('red');
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
}

Circulo.prototype.draw = function(){
  ctx_canvas.beginPath();
    // ctx_canvas.arc(this.getPosx(), this.getPosy(), this.#radius, 0, 2 * Math.PI);
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