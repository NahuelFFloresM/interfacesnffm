class Juego{

  constructor(){
    
  }
  iniciarBgParalax(){
    document.getElementById('player').classList = 'running';
    // document.getElementById('background').classList = 'bg-running';
    // document.getElementById('piso_paralax').classList = 'floor-running';
    document.getElementById('background').classList.remove('stop');
    document.getElementById('background').classList.add('bg-running');
    document.getElementById('piso_paralax').classList.remove('stop');
    document.getElementById('piso_paralax').classList.add('bg-running');
  }

  finJuego(){
    document.getElementById('player').classList = 'dead';
    document.getElementById('background').classList.remove('bg-running');
    document.getElementById('background').classList.add('stop');
    document.getElementById('piso_paralax').classList.remove('bg-running');
    document.getElementById('piso_paralax').classList.add('stop');
    clearInterval(gameLoopInterval);
    clearInterval(enemySpawnInterval);
    clearInterval(enemySpawnInterval2);
    clearInterval(coinSpawnInterval);
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