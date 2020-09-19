class Game {
  constructor() {
    this.player1 = new Player("player1");
    this.player2 = new Player("player2");
    this.discardPile = [];
    this.suddenDeathMode = false;
    this.gameOver = false;
    this.allCards = startingDeck;
  }
  startGame() {
    this.player1.otherPlayer = this.player2;
    this.player2.otherPlayer = this.player1;
    this.dealStartingCards();
    if (Math.floor(Math.random()*(2)) === 1) {  // randomly select who goes first
      this.player1.myTurn = true;
    } else {
      this.player2.myTurn = true;
    }
  }
  dealStartingCards() {
    var totalCards = this.allCards.length;
    while (totalCards !== 0) {
      var randomIndex = Math.floor(Math.random() * totalCards--);
      var pulledCard = this.allCards[totalCards];
      this.allCards[totalCards] = this.allCards[randomIndex];
      this.allCards[randomIndex] = pulledCard
    }
    this.player1.myDeck = this.allCards.slice(0, 26);
    this.player1.shuffleDeck();                    // for extra random
    this.player2.myDeck = this.allCards.slice(26, 52);
    this.player1.shuffleDeck();
    this.discardPile.unshift(this.allCards[52])
  }

  checkSuddenDeath() {
    if (this.player1.myDeck[0] === undefined || this.player2.myDeck[0] === undefined) {
      this.suddenDeathMode = true;
      while (this.suddenDeathMode === true) {
        if (this.player1.myDeck[0] !== undefined) {
          this.player1.suddenDeathLeader = true; //who's leader?
        } else {
          this.player2.suddenDeathLeader = true;
        }
      };
    } else if (this.player1.myDeck[0] !== undefined && this.player2.myDeck[0] !== undefined) {
      game.suddenDeathMode === false;
    }
  }

  winCheck() {
    if (this.myDeck.length === 53) { // check win rules
      this.winner = true;
      this.wins++
      return
    }
  }
}
