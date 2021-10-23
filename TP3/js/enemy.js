class Enemy{
  #enemies = [];
  spawn(){
    let box = document.createElement('div');
    box.style.width='100px';
    box.style.height='100px';
    box.style.backgroundColor='red';
    box.style.position = 'absolute';
    box.style.right = '20px';
    box.style.bottom = '5%';
    document.body.appendChild(box);
    this.#enemies.push(box);
  }

  move(){
    let posx = window.getComputedStyle(this.#enemies[0]).right;
    this.#enemies[0].style.right = parseInt(posx)+4+"px";
  }
}