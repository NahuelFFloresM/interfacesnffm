class Enemy{
  #right_pos;
  #bottom_pos;
  #div_item;
  #id;
  #div_class;

  constructor(rp,bp,id,div_class){
    this.#right_pos = rp;
    this.#bottom_pos = bp;
    this.#id = id;
    this.#div_class = div_class;
  }
  /**
   * Crea el div con sus parametros y hace "append" al documento
   */
  spawn(){
    let box = document.createElement('div');
    this.#div_item = box;
    box.style.position = 'absolute';
    box.style.right = this.#right_pos;
    box.style.bottom = this.#bottom_pos;
    box.id = this.#id;
    box.classList.add(this.#div_class);
    // ------------------------ DONDE LOS SPAWNEA EN LA VENTANA
    document.body.appendChild(box);
  }

  /**
   * Movimiento en X manejando la posicon del div
   */
  move(){
    let posx = window.getComputedStyle(this.#div_item).right;
    this.#div_item.style.right = parseInt(posx)+3+"px";
  }

  getId(){
    return this.#id;
  }

}