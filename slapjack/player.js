class Player {
  constructor(player1or2) {
    this.player = player1or2;
    this.otherPlayer = "";
    this.myTurn = false;
    this.myDeck = [];
    this.allCards = false;
    this.wins = 0;
    this.winner = false;
    if (this.player === "player1") {
      this.otherPlayer = player2;
    } else {
      this.otherPlayer = player1;
    }
  }
  dealCard(game) {
    if (this.myTurn === true && this.myDeck !== []) { // event listen for related key press in main
      // place on discard pile array
      game.discardPile.unshift(this.myDeck[0]);
      // pull card from my card
      this.myDeck.shift();
      if (this.myDeck === []) {
        return this.myTurn = false;
      }
    }
  }
  slapCard(game) {
    if (slapValidation() === true) {
      this.collectDiscardPile(game)
      this.myTurn = true
    } else {
      this.otherPlayer.myDeck.unshift(this.myDeck[0]);
      this.myDeck.shift()
      this.myturn = false;
    }
  }
  slapValidation() {
    if (validBasicSlaps.indexOf(game.discardPile[0]) !== -1) {  //  if the string at [0] is not included in basic slaps array, = -1 (void)
      return true;
    } else if (game.discardPile[0].charAt(3) === game.discardPile[1].charAt(3)) {  //  leveraging naming convention to match
      return true;
    } else if (game.discardPile[0].charAt(3) === game.discardPile[2].charAt(3)) {
      return true;
    } else {
      return false;
    }
  }
  collectDiscardPile(game) {
    this.myDeck.concat(game.discardPile);
    game.discardPile = [];
    this.shuffleDeck();
  }
  shuffleDeck() {
    var totalCards = this.myDeck.length;
    while (totalCards === true) {
      var randomChoice = Math.floor(Math.random() * totalCards--);
      var swappedCard = this.myDeck[totalCards];
      this.myDeck[totalCards] = this.myDeck[randomChoice];
      this.myDeck[randomChoice] = swappedCard
    }
    return this.myDeck;
  }
  // should this be a method of the game???
  winCheck() {
    if (this.myDeck.length === 53) { // check win rules
      this.winner = true;
      this.wins++
      return    // check for lose mode (run out, one more chance), check other player, and me
    }
  }
  //
}
