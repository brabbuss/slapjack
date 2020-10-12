class Player {
  constructor(player) {
    this.player = player;
    this.otherPlayer;
    this.myTurn = false;
    this.myDeck = [];
    this.wins = 0;
    this.winner = false;
  }

  playCard(keyCode) {
    if (keyCode === 81) { // q
      game.dealCard(game.player1);
    } else if (keyCode === 70) { // f
      game.slapValidation(game.player1);
    }

    if (keyCode === 80) {// p
      game.dealCard(game.player2);
    } else if (keyCode === 74) { // j
      game.slapValidation(game.player2);
    }
  }

  keepTurn() {
    this.myTurn = true
    this.otherPlayer.myTurn = false
  }

  loseTurn() {
    this.myTurn = false
    this.otherPlayer.myTurn = true
  }

  saveWinsToStorage() {
    game.storedData.push(this.wins)
  }
}
