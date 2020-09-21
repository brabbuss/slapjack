class Player {
  constructor(player) {
    this.player = player;
    this.otherPlayer;
    this.myTurn = false;
    this.myDeck = [];
    this.wins = 0;
    this.winner = false;        // just in case
  }
  /* NOTE TO INSTRUCTOR:
  I didn't want this method inside of the Player class - it adds an extra step
  - the game Class could have this entire method inside of it. But, I
  inluded it here because of project guidelines requiring it. I feel similarly
  about the `saveWinsToStorage()` method. We could make that a Game method
  and easily save the entire state, but want to follow guidelines!!! just
  adding this note to let you know my thoughts around why I'm having these
  roundabout functions (that call another class method inside of them) */

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
