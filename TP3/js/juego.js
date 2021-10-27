class Juego{

  constructor(){
    
  }
  iniciarBgParalax(){
    document.getElementById('player').classList = ('running');
    document.getElementById('background').classList.toggle('bg-running');
  }

  finJuego(){
    document.getElementById('player').classList = ('dead');
    document.getElementById('background').classList = ('stop');
    clearInterval(gameLoopInterval);
    clearInterval(enemySpawnInterval);
    enemy_count = 1;
  }

  limpiarEnemigos(){
    enemigos.forEach(element => {
      document.getElementById(element.getId()).remove();
    });
    enemigos = [];
  }
}