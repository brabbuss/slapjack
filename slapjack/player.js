class Player {
  constructor(player) {
    this.player = player;
    this.otherPlayer;
    this.myTurn = false;
    this.myDeck = [];
    this.wins = 0;
    this.winner = false;        // just in case
    this.suddenDeathLeader = false
  }
  keepTurn() {
    this.myTurn = true
    this.otherPlayer.myTurn = false
  }
  loseTurn() {
    this.myTurn = false
    this.otherPlayer.myTurn = true
  }
  dealCard(game) {
    if (this.myTurn === true) {
      game.discardPile.unshift(this.myDeck[0]);       // place on discard pile array
      this.myDeck.shift();      // pull card from my card
      this.loseTurn();
    } else if (this.otherPlayer.myDeck === undefined) {  //sudden death
      game.discardPile.unshift(this.myDeck[0]);
      this.myDeck.shift();
    } else {
      console.log(`not your turn ${this.player}`);
    }
  }
  slapCard(game) {
  if (this.slapValidation(game) === true && this.otherPlayer.myDeck[0] === undefined) {
    this.collectDiscardPile(game)
    this.winner = true;
    game.gameOver = true;
    alert("game over")
    //if you successfully slap as leader. you win
  } else if (this.slapValidation(game) === false && this.myDeck[0]] === undefined) {
      alert("game over")
      game.gameOver = true;
    } else if (this.slapValidation(game) === true) {  // legal slap
      this.collectDiscardPile(game);
      console.log("good slap");
      console.log(game.player1.myDeck, game.player2.myDeck);
      return true
    } else if (this.slapValidation(game) === false) {
      this.otherPlayer.myDeck.unshift(this.myDeck[0]);  //illegal slap
      this.myDeck.shift()
      console.log("bad slap");
      console.log(game.player1.myDeck, game.player2.myDeck);
      return false
    }
  }
  slapValidation(game) {
    // if array = 1, then compare against the one rule
    // if array = 2, then two rules
    // if three or more, than all rules

    if (validBasicSlaps.indexOf(game.discardPile[0]) !== -1) {  //  if the string at [0] is not included in basic slaps array, = -1 (void)
      console.log("trump card");
      this.keepTurn()
      return true;
    } else if (game.discardPile.length < 3) {
      if (game.discardPile[0].charAt(3) === game.discardPile[1].charAt(3)) {  //  leveraging naming convention to match
        console.log("doubles");
        this.keepTurn()
        return true;
      }
    } else if (game.discardPile.length > 2) {
      if (game.discardPile[0].charAt(3) === game.discardPile[2].charAt(3) || game.discardPile[0].charAt(3) === game.discardPile[1].charAt(3)) {
        console.log("sandwich");
        this.keepTurn()
        return true;
      }
    } else {
      console.log("bad slap");
      this.loseTurn();
      return false;
    }
  }
  collectDiscardPile(game) {
    this.myDeck = this.myDeck.concat(game.discardPile);
    game.discardPile = [];
    game.shuffleDeck(this.myDeck);
  }
}
