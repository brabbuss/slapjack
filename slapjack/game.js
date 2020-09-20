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
      if (game.gameOver === true && this.playerArray[i].myDeck[0] === undefined) {
        this.playerArray[i].otherPlayer.wins += 1;
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
      this.discardPile = [];
    }
  }

  dealCard(player) {
    if (player.myDeck[0] !== undefined) {
      if (player.myTurn === true) {
        this.discardPile.unshift(player.myDeck[0]);       // place on discard pile array
        player.myDeck.shift();      // pull card from my card
        player.loseTurn();
      } else {
        console.log(`not your turn ${player.player}`);
      }
    } else if (player.myDeck[0] === undefined) {  //sudden death
      player.loseTurn();
      console.log(`All out of cards ${player.player}`);
    }
  }
}

slapCard(game) {
  if (this.slapValidation(game) === true && this.otherPlayer.myDeck[0] === undefined) {
    this.collectDiscardPile(game)
    game.gameOver = true;
    alert("game over")
    //if you successfully slap as leader. you win
  } else if (this.slapValidation(game) === false && this.myDeck[0] === undefined) {
    alert("game over")
    game.gameOver = true;
  } else if (this.slapValidation(game) === true) {  // legal slap
    this.collectDiscardPile(game);
    console.log(game.player1.myDeck, game.player2.myDeck);
    return true
  } else if (this.slapValidation(game) === false) {
    this.otherPlayer.myDeck.unshift(this.myDeck[0]);  //illegal slap
    this.myDeck.shift()
    console.log(game.player1.myDeck, game.player2.myDeck);
    return false
  }
}
