class Collectable{
  #right_pos;
  #bottom_pos;
  #id;
  #div_item;

  constructor(rp,bp,id){
    this.#right_pos = rp;
    this.#bottom_pos = bp;
    this.#id = id;
  }

  spawn(){
    let box = document.createElement('div');
    this.#div_item = box;
    box.style.position = 'absolute';
    box.style.right = this.#right_pos;
    box.style.bottom = this.#bottom_pos;
    box.className = 'coin';
    box.id = this.#id;
    document.body.appendChild(box);
  }

  
  delete(){
    document.body.removeChild(document.getElementById(this.#id));
  }

  /**
   * Movimiento en X manejando la posicon del div
   */
  move(){
    let posx = window.getComputedStyle(this.#div_item).right;
    if (posx < -200){
      deleteCoin(0);
    } else {
      this.#div_item.style.right = parseInt(posx)+2+"px";
    }    
  }

  getId(){
    return this.#id;
  }

}