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
    if (this.myTurn === true && this.myDeck !== []) { // event listen for related keys in main
      // place on discard pile array
      game.discardPile.unshift(this.myDeck[0]);  // TODO add this to game class
      // pull card from my card
      this.myDeck.shift();
      if (this.myDeck === []) {
        return this.myTurn = false;
      }
    }
  }
  slapCard(game) {
    if (validBasicSlaps.includes(game.discardPile[0]) === true || validAdvancedSlaps.includes(game.discardPile[0]) === true) {
      // above do I compare array or do I compart whats in the deck at that moment, an array, and how?
      // jack [0], if [0] === [1], if [0] === [2]
      // [0] contains string jk or wild
      // game.discardPile[0].charAt(3) === game.discardPile[1].charAt(3)
      // game.discardPile[0].charAt(3) === game.discardPile[2].charAt(3)
      this.collectDiscardPile(game)
      this.myTurn = true
    } else {
      this.otherPlayer.myDeck.unshift(this.myDeck[0]);
      this.myDeck.shift()
      this.myturn = false;
    }
  }
  winCheck() {
    if (this.myDeck.length === 53) { // check win rules
      this.winner = true;
      this.wins++
      return          // check for lose mode (run out, one more chance)
    }
  }
  collectDiscardPile(game) {
    this.myDeck.concat(game.discardPile);
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
}
