class Game {
  constructor() {
    this.player1 = new Person("player1");
    this.player2 = new Person("player2", player1);
    this.discardPile = [];
    this.suddenDeathMode = false;
    this.gameOver = false;
    // this.suddenDeathLeader = !this.otherPlayer.suddenDeathLeader;

  }
  startGame() {
    this.player1.otherPlayer = player2;
    this.player2.otherPlayer = player1;
    this.dealStartingCards();
    // choose random for first person

  }
  checkSuddenDeath() {
    // while
  }
  dealStartingCards() {
    var totalCards = startingDeck.length;
    while (totalCards === true) {
      var randomChoice = Math.floor(Math.random() * totalCards--);
      var swappedCard = startingDeck[totalCards];
      startingDeck[totalCards] = startingDeck[randomChoice];
      startingDeck[randomChoice] = swappedCard
    }
    return this.myDeck;
  }
}

// validslap types and logic
// live in data or game class?
