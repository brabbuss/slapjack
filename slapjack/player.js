class Player {
  constructor(player1or2) {
    this.player = player1or2;
    this.myTurn = false;
    this.myDeck = [];
    this.allCards = false;
    this.wins = 0;
    this.winner = false;
  }
  dealCard(game) {
    if (this.myTurn === true) { // event listen for related keys in main
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
    // if top card is a valid card in the sequence to be slapped
    // starting with just a jack (add more rules later)
    if (validBasicSlaps.includes(game.discardPile[0]) === true || validAdvancedSlaps.includes(game.discardPile[0]) === true) {
      this.collectDiscardPile(game)
      this.myTurn = true
    } else {
      // wrong slap behavior
      // myturn = false
      // target other player
      game.player
    }
  }
  winCheck() {
    if (this.myDeck.length === 53) { // check win rules
      this.winner = true;
      this.wins++
      return
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
