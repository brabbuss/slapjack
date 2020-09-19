// document.onload = newGame()

function newGame() {
  var game = new Game();
  game.startGame()
}

document.addEventListener('keydown', function dealACard(event) {
  if (event.keyCode === 81) { // q
    game.player1.dealCard(game)
  }
  if (event.keyCode === 80) {// p
    game.player2.dealCard(game)
  }
  if (event.keyCode === 70) { // f
    game.player1.slapCard(game)
  }
  if (event.keyCode === 74) { // j
    game.player1.slapCard(game)
  }
  game.checkSuddenDeath()
})





// if my turn, highlight deck and card with pulse?
