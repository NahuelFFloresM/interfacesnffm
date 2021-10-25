class Player{

  constructor(){}

  saltar(){
    document.getElementById('player').classList = ('jumping');
    setTimeout(() => {
      document.getElementById('player').classList = ('running');
    }, 999,99);
  }

  checkCollision(enemigos){
    // console.log(enemigos[0]);
  }
}