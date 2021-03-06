class Circulo extends Ficha{
  #radius = 20;
  #background_image = null;
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

  getPosxOriginal(){
    return super.getPosxOriginal();
  }

  getPosyOriginal(){
    return super.getPosyOriginal();
  }

  getRadius(){
    return this.#radius;
  }

  getTamanio(){
    return super.getTamanio();
  }

  setFill(color){
    super.setFill(color);
  }

  async setBackgroundImage(image){
    this.#background_image = image;
  }

  getBackgroundImage(){
    return this.#background_image;
  }

  drawPosicionOriginal(){
    let x = super.getPosxOriginal();
    let y = super.getPosyOriginal();
    this.reDraw(x,y)
  }

  async draw(){
    if (this.#background_image != null){
      // let image = document.createElement('img');
      // image.src = this.#background_image;
      // await image.onload;
      ctx_canvas.save();
      ctx_canvas.beginPath();
      ctx_canvas.arc(this.getPosx(), this.getPosy(), this.getRadius(), 0, 2 * Math.PI);
      ctx_canvas.closePath();
      ctx_canvas.clip();
    
      ctx_canvas.drawImage(this.#background_image, this.getPosx()-this.#radius, this.getPosy()-this.#radius, this.#radius*2, this.#radius*2);
    
      ctx_canvas.beginPath();
      ctx_canvas.arc(this.getPosx(), this.getPosy(), this.getRadius(), 0, 2 * Math.PI);
      ctx_canvas.clip();
      ctx_canvas.closePath();
      ctx_canvas.restore();
    } else {
      ctx_canvas.beginPath();
      this.fillDraw();
      ctx_canvas.arc(this.getPosx(), this.getPosy(), this.getRadius(), 0, 2 * Math.PI);
      ctx_canvas.fill();
      ctx_canvas.stroke();
      ctx_canvas.closePath();
    }
  }

  devolverCopia(){
    let copia = new Circulo(this.getFill());
    copia.#radius = this.getRadius();
    copia.setTamanio = this.getTamanio();
    copia.#background_image = this.getBackgroundImage();
    return copia;
  }

  cleanBackGround(){
    let r = this.getRadius()+1;
    let t = this.getTamanio()*2+2;
    ctx_canvas.beginPath();
    ctx_canvas.clearRect(this.getPosx()-r,this.getPosy()-r,t,t);
    ctx_canvas.stroke();
    ctx_canvas.closePath();
  }
}

Circulo.prototype.reDraw = function(x,y){
  this.setPosx(x);
  this.setPosy(y);
  this.draw();
}