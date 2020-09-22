class Player {
  constructor(player) {
    this.player = player;
    this.otherPlayer;
    this.myTurn = false;
    this.myDeck = [];
    this.wins = 0;
    this.winner = false;
  }

  /* NOTE TO INSTRUCTOR:
  I want this method inside of the Game class - it adds an extra step inside Player -
  I inluded it here because of project guidelines requiring it! I feel similarly
  about the `saveWinsToStorage()` method. We could make that a Game method
  and easily save the entire state, but I want to follow guidelines! Just
  adding this note to let you know my thoughts around why I'm having these methods
  call one another in a roundabout way
  */

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
