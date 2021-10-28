class Player{

  #width = document.getElementById('player').offsetWidth;
  #height = document.getElementById('player').offsetHeight;
  #colision_playerWidth = document.getElementById('player').offsetLeft;
  #colision_playerHeight = document.getElementById('player').offsetTop;

  constructor(){}

  saltar(){
    document.getElementById('player').classList = ('jumping');
    setTimeout(() => {
      let status = document.getElementById('player').classList;
      if (status == 'jumping') document.getElementById('player').classList = ('running');
    }, 999,99);
  }

  checkCollision(enemigos){
    let positionX = 0;
    let positionY = 0;
    let positionXwidth = 0;
    let positionYheight = 0;
    let enemigo;
    let respuesta = false;
    enemigos.forEach(element => {
      enemigo = document.getElementById(element.getId())
      positionX = enemigo.offsetLeft;
      positionXwidth = positionX + enemigo.offsetWidth;
      positionY = enemigo.offsetTop;
      positionYheight = positionY + enemigo.offsetHeight;
      // BORRA ENEMIGO -------> CAMBIAR DE LUGAR
      if (positionX < -200){
        deleteEnemy();
      }
      // DETECTAR COLISION VERTICAL
      // (positionX <= this.#colision_playerWidth + this.#width) && (positionY >= this.#colision_playerHeight+this.#height)
      // &&
      // (positionX+positionXwidth >= this.#colision_playerWidth) && (positionY >= this.#colision_playerHeight + this.#height)
      console.log(this.#colision_playerWidth, positionX+positionXwidth);
      console.log(this.#colision_playerWidth+ this.#width, positionX);
      console.log(this.#colision_playerHeight, positionY+positionYheight);
      console.log(this.#colision_playerHeight+this.#height, positionY);
      console.log('////////////////////////');
      if ((
        (this.#colision_playerWidth <= positionX+positionXwidth)
        &&
        (this.#colision_playerWidth+ this.#width >= positionX)
        &&
        (this.#colision_playerHeight <= positionY+positionYheight)
        &&
        (this.#colision_playerHeight+this.#height >= positionY))
      ){
        respuesta = true;
      };
      
      // console.log("x"+positionX,"xf"+positionXwidth,"y"+positionY,"yf"+positionYheight,'enemigo');
      // console.log( "x"+this.#colision_playerWidth,"xf"+this.#width,"y"+this.#colision_playerHeight,"yf"+this.#height,'player');
      
    });
    return respuesta;
  }

  renovarPosicion(){
    this.#width = document.getElementById('player').offsetWidth;
    this.#height = document.getElementById('player').offsetHeight;
    this.#colision_playerWidth = document.getElementById('player').offsetLeft;
    this.#colision_playerHeight = document.getElementById('player').offsetTop;
  }

}