class Game {
  constructor() {
    this.player1 = new Player("player1");
    this.player2 = new Player("player2");
    this.discardPile = [];
    this.suddenDeathMode = false;
    this.gameOver = false;
    // this.suddenDeathLeader = !this.otherPlayer.suddenDeathLeader;

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
  checkSuddenDeath() {
    // while
  }
  dealStartingCards() {
    var totalCards = startingDeck.length;
    while (totalCards !== 0) {
      var randomChoice = Math.floor(Math.random() * totalCards--);
      var pulledCard = startingDeck[totalCards];
      startingDeck[totalCards] = startingDeck[randomChoice];
      startingDeck[randomChoice] = pulledCard
    }
    //   if (Math.floor(Math.random()*(2)) === 1) {  // randomly select who goes first
    //   this.player1.myTurn = true;
    // } else {
    //   this.player2.myTurn = true;
    // }

    // startingDeck
    this.player1.myDeck = startingDeck.slice(0, 26);
    this.player1.shuffleDeck();                    // for extra random
    this.player2.myDeck = startingDeck.slice(26, 52);
    this.player1.shuffleDeck();
    this.discardPile.unshift(startingDeck[52])
  }
}

// validslap types and logic
// live in data or game class?
