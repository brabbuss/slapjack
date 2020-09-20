class Game {
  constructor() {
    this.player1 = new Player("player1");
    this.player2 = new Player("player2");
    this.playerArray = [this.player1, this.player2]
    this.discardPile = [];
    this.gameOver = false;
    this.allCards = startingDeck;
    this.referee;
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
        game.referee = {[player.player]: "normal-deal"}
      } else {
        console.log(`not your turn ${player.player}`);
        game.referee = {[player.player]: "not-your-turn-deal"}
      }
    } else if (player.myDeck[0] === undefined) {  //sudden death
      game.referee = {[player.player]: "no-more-cards-deal"}
      console.log(`All out of cards ${player.player}`);
    }
  }

  collectDiscardPile(player) {
    player.myDeck = player.myDeck.concat(this.discardPile);
    this.discardPile = [];
  }

  giveAwayCard(player) {
    player.otherPlayer.myDeck.unshift(player.myDeck[0]);  //illegal slap
    player.myDeck.shift()
  }

  slapCard(player) {
    if (this.slapValidation(player) === true && player.otherPlayer.myDeck.length === 0) { // endgame slap
      game.gameOver = true;
    } else if (this.slapValidation(player) === false && player.myDeck.length === 0) {  //endgame slap
      game.gameOver = true;
    } else if (this.slapValidation(player) === true) {  // legal slap
      game.referee = {[player.player]: "valid-slap"}
    } else if (this.slapValidation(player) === false) {
      game.referee = {[player.player]: "invalid-slap"}
    }
  }

  slapValidation(player) {
    if (this.discardPile[0] === undefined) { //empty deck
      console.log("empty deck");
      return false;
    } else if (this.discardPile.length === 1) {
      if (validBasicSlaps.indexOf(this.discardPile[0]) !== -1) {  //  if the string at [0] is not included in basic slaps array, = -1 (void)
        console.log("jack or trump");
        return true;
      } else if (validBasicSlaps.indexOf(this.discardPile[0]) === -1) {
        console.log("bad slap trump cascade");
        return false;
      }
    } else if (this.discardPile.length === 2) {
      if (this.discardPile[0].charAt(3) === this.discardPile[1].charAt(3) || validBasicSlaps.indexOf(this.discardPile[0]) !== -1) {  //  leveraging naming convention to match
        console.log("doubles");
        return true;
      } else {
        console.log("bad slap dbl cascade");
        return false;
      }
    } else if (this.discardPile.length > 2) {
      if (this.discardPile[0].charAt(3) === this.discardPile[2].charAt(3) || this.discardPile[0].charAt(3) === this.discardPile[1].charAt(3) || validBasicSlaps.indexOf(this.discardPile[0]) !== -1) {
        console.log("sandwich");
        return true;
      } else {
        console.log("bad slap sandwich cascade");
        return false;
      }
    }
  }
}
