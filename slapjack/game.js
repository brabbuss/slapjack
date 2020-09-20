class Game {
  constructor() {
    this.player1 = new Player("player1");
    this.player2 = new Player("player2");
    this.playerArray = [this.player1, this.player2]
    this.discardPile = [];
    this.gameOver = false;
    this.allCards = startingDeck;
  }

  setupNewRound() {
    this.player1.otherPlayer = this.player2;
    this.player2.otherPlayer = this.player1;
    // randomly select who goes first
    if (Math.floor(Math.random()*(2)) === 1) {
      this.player1.myTurn = true;
    } else {
      this.player2.myTurn = true;
    }
  }

  shuffleDeck(cardArray) {
    var totalCards = cardArray.length;
    while (totalCards !== 0) {
      var randomIndex = Math.floor(Math.random() * totalCards--);
      var pulledCard = cardArray[totalCards];
      cardArray[totalCards] = cardArray[randomIndex];
      cardArray[randomIndex] = pulledCard;
    }
    return cardArray
  }

  dealNewRound() {
    this.player1.myDeck = this.allCards.slice(0, 26);
    this.shuffleDeck(this.player1.myDeck);
    this.player2.myDeck = this.allCards.slice(26, 52);
    this.shuffleDeck(this.player2.myDeck);
    this.discardPile.unshift(this.allCards[52])
  }

  winCheck() {
    for (var i = 0; i < this.playerArray.length; i++) {
      if (this.playerArray[i].winner === true) {
        this.playerArray[i].wins++
        return true;
      }
    }
  }

  resetPlayerStats() {
    for (var i = 0; i < this.playerArray.length; i++) {
      var i = this.playerArray[i]
      i.player = i.player;
      i.otherPlayer = i.otherPlayer;
      i.myTurn = false;
      i.myDeck = [];
      i.wins = i.wins;
      i.winner = false;
      i.suddenDeathLeader = false;
      this.discardPile = [];
    }
  }
}
