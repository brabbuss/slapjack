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
    if (Math.floor(Math.random()*(2)) === 1) {
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
    var shuffledStartingDeck;
    while (totalCards !== 0) {
      var randomChoice = Math.floor(Math.random() * totalCards--);
      var pulledCard = startingDeck[totalCards];
      startingDeck[totalCards] = startingDeck[randomChoice];
      startingDeck[randomChoice] = pulledCard
    }
    // startingDeck
    this.player1.myDeck.unshift(startingDeck.slice(0, 27));
    this.player1.shuffleDeck();                    // for extra random
    this.player2.myDeck.unshift(startingDeck.slice(27, 53));
    this.player1.shuffleDeck();
  }
}

// validslap types and logic
// live in data or game class?
