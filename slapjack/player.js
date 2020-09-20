class Player {
  constructor(player) {
    this.player = player;
    this.otherPlayer;
    this.myTurn = false;
    this.myDeck = [];
    this.wins = 0;
    this.winner = false;        // just in case
  }

  keepTurn() {
    this.myTurn = true
    this.otherPlayer.myTurn = false
  }

  loseTurn() {
    this.myTurn = false
    this.otherPlayer.myTurn = true
  }
}
