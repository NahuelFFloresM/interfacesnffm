class Juego{

  constructor(){
    
  }
  iniciarJuego(){
    document.getElementById('player').classList = ('running');
    document.getElementById('background').classList.toggle('bg-running');
  }
}