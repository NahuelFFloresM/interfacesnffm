class Enemy{
  #width;
  #height;
  #background_sprite;
  #right_pos;
  #bottom_pos;
  #div_item;
  #id;
  #div_class;

  constructor(w,h,bs,rp,bp,id,div_class){
    this.#width = w;
    this.#height = h;
    this.#bottom_pos = bs;
    this.#right_pos = rp;
    this.#background_sprite = bp;
    this.#id = id;
    this.#div_class = div_class;
  }
  /**
   * Crea el div con sus parametros y hace "append" al documento
   */
  spawn(){
    console.log(this.#div_class);
    let box = document.createElement('div');
    this.#div_item = box;
    // box.style.width='100px';
    //box.style.width= this.#width;
    // box.style.height='100px';
    //box.style.height= this.#height;
    //box.style.backgroundColor='red';
    box.style.position = 'absolute';
    // box.style.right = '20px';
    box.style.right = this.#right_pos;
    // box.style.bottom = '5%';
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
    this.#div_item.style.right = parseInt(posx)+13+"px";
  }

  getId(){
    return this.#id;
  }

}