class Player{

  saltar(){
    document.getElementById('player').classList = ('jumping');
    setTimeout(() => {
      document.getElementById('player').classList = ('running');
    }, 2000);
  }
}