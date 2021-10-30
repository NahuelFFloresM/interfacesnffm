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

  /**
   * 
   * @param enemigos arreglo con elementos a chequea la colision con el jugador
   * @returns boolean
   */
  checkCollision(enemigos){
    let positionX = 0;
    let positionY = 0;
    let positionXwidth = 0;
    let positionYheight = 0;
    let enemigo;
    let respuesta = false;
    enemigos.forEach(element => {
      enemigo = document.getElementById(element.getId());
      positionX = enemigo.offsetLeft;
      positionXwidth = enemigo.offsetWidth;
      positionY = enemigo.offsetTop;
      positionYheight = enemigo.offsetHeight;
      
      if (!(
        (this.#colision_playerWidth > positionX+positionXwidth)
        ||
        (this.#colision_playerWidth+this.#width < positionX)
        ||
        (this.#colision_playerHeight > positionY+positionYheight)
        ||
        (this.#colision_playerHeight+this.#height < positionY)
      )){
        // Hay un margen de error dado la velocidad en la que se mueven los enemigos y el proximo movimiento
        if ((this.#colision_playerHeight+this.#height >= positionY) && (this.#colision_playerHeight < positionY) && (this.#colision_playerWidth+this.#width-30 > positionX)){
          deleteEnemy(50);
        } else {
          respuesta = true;
        }
      };      
    });
    return respuesta;
  }

  checkCollisionCoin(recolectables){
    let positionX = 0;
    let positionY = 0;
    let positionXwidth = 0;
    let positionYheight = 0;
    let item;
    recolectables.forEach(element => {
      item = document.getElementById(element.getId());
      positionX = item.offsetLeft;
      positionXwidth = item.offsetWidth;
      positionY = item.offsetTop;
      positionYheight = item.offsetHeight;
      if (!(
        (this.#colision_playerWidth > positionX+positionXwidth)
        ||
        (this.#colision_playerWidth+this.#width < positionX)
        ||
        (this.#colision_playerHeight > positionY+positionYheight)
        ||
        (this.#colision_playerHeight+this.#height < positionY)
      )){
        // Hay un margen de error dado la velocidad en la que se mueven los items y el proximo movimiento
        if ((this.#colision_playerHeight+this.#height >= positionY) && (this.#colision_playerHeight < positionY) && (this.#colision_playerWidth+this.#width-30 > positionX)){
          deleteCoin(1);
        }
      };      
    });
  }
  /**
   * En cada tick del loop del juego se renueva la posicion segun el div en el documento
   */
  renovarPosicion(){
    this.#width = document.getElementById('player').offsetWidth;
    this.#height = document.getElementById('player').offsetHeight;
    this.#colision_playerWidth = document.getElementById('player').offsetLeft;
    this.#colision_playerHeight = document.getElementById('player').offsetTop;
  }

}