class Game {
  constructor() {
    this.player1 = new Player("p1");
    this.player2 = new Player("p2");
    this.playerArray = [this.player1, this.player2]
    this.discardPile = [];
    this.gameOver = false;
    this.allCards = startingDeck;
    this.referee;
    this.storedData = []
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

  resetPlayerStats() {
    for (var i = 0; i < this.playerArray.length; i++) {
      var i = this.playerArray[i]
      i.myTurn = false;
      i.myDeck = [];
      i.winner = false;
    }
    this.discardPile = [];
    this.gameOver = false;
  }

  dealNewRound() {
    this.player1.myDeck = this.allCards.slice(0, 26);
    this.shuffleDeck(this.player1.myDeck);
    this.player2.myDeck = this.allCards.slice(26, 52);
    this.shuffleDeck(this.player2.myDeck);
    this.discardPile.unshift(this.allCards[52])
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

  dealCard(player) {
    if (player.myDeck[0] !== undefined) {
      if (player.myTurn === true && player.otherPlayer.myDeck[0] === undefined) {
        this.discardPile.unshift(player.myDeck[0]);
        player.myDeck.shift();
        game.referee = {[player.player]: "endgame-deal", loseDeal: false}
      } else if (player.myTurn === true) {
        this.discardPile.unshift(player.myDeck[0]);
        player.myDeck.shift();
        game.referee = {[player.player]: "normal-deal", loseDeal: true}
      } else {
        game.referee = {[player.player]: "not-your-turn-deal", loseDeal: true}
      }
    } else if (player.myDeck[0] === undefined) {
      game.referee = {[player.player]: "no-more-cards-deal", loseDeal: true}
    }
  }

  slapValidation(player) {
    if (this.discardPile[0] === undefined) {
      game.referee = {[player.player]: "bad-slap", validSlap: false}
    } else if (validBasicSlaps.indexOf(this.discardPile[0]) !== -1) {  //  if the string at [0] is not included in basic slaps array, = -1 (void)
      game.referee = {[player.player]: "slap-trump-card", validSlap: true}
    } else if (this.discardPile[1] !== undefined && this.discardPile[0].charAt(3) === this.discardPile[1].charAt(3)) {
      game.referee = {[player.player]: "slap-doubles", validSlap: true}
    } else if (this.discardPile[2] !== undefined && this.discardPile[0].charAt(3) === this.discardPile[2].charAt(3)) {
      game.referee = {[player.player]: "slap-sandwich", validSlap: true}
    } else {
      game.referee = {[player.player]: "bad-slap", validSlap: false}
    }
  }

  collectDiscardPile(player) {
    player.myDeck = player.myDeck.concat(this.discardPile);
    this.discardPile = [];
  }

  giveAwayCard(player) {
    player.otherPlayer.myDeck.push(player.myDeck[0]);
    player.myDeck.shift()
  }

  winCheck() {
    for (var i = 0; i < this.playerArray.length; i++) {
      if (this.gameOver === true && this.playerArray[i].myDeck[0] === undefined) {
        this.playerArray[i].otherPlayer.wins += 1;
        return true;
      }
    }
  }

  endGameCheck(player) {
    if (game.referee.validSlap === true && player.otherPlayer.myDeck.length === 0) { // endgame slap
      game.gameOver = true;
    } else if (game.referee.validSlap === false && player.myDeck.length === 0) {  //endgame slap
      game.gameOver = true;
    }
  }

  saveGameToStorage() {
    this.storedData = [];
    game.player1.saveWinsToStorage();
    game.player2.saveWinsToStorage();
    localStorage.setItem('savedWins', JSON.stringify(this.storedData));
  }

  loadSavedGame() {
    if (localStorage.getItem("savedWins") !== null) {
      this.storedData = JSON.parse(localStorage.getItem("savedWins"));
      this.player1.wins = this.storedData[0]
      this.player2.wins = this.storedData[1]
    }
  }
}
