class Juego{

  constructor(){
    
  }
  iniciarBgParalax(){
    document.getElementById('player').classList = 'running';
    document.getElementById('background').classList = 'bg-running';
    document.getElementById('piso_paralax').classList = 'bg-running';
  }

  finJuego(){
    document.getElementById('player').classList = 'dead';
    document.getElementById('background').classList = 'stop';
    document.getElementById('piso_paralax').classList = 'stop';
    clearInterval(gameLoopInterval);
    clearInterval(enemySpawnInterval);
    clearInterval(pointsInterval);
    enemy_count = 1;
  }

  limpiarEnemigos(){
    enemigos.forEach(element => {
      document.getElementById(element.getId()).remove();
    });
    enemigos = [];
  }
}