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
  switchTurns() {
    this.myTurn = !this.otherPlayer.myTurn
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
    if (game.suddenDeathMode !== true && this.myTurn === true) {
      game.discardPile.unshift(this.myDeck[0]);       // place on discard pile array
      this.myDeck.shift();      // pull card from my card
      this.loseTurn();
    } else if (this.suddenDeathLeader === true) {
      game.discardPile.unshift(this.myDeck[0]);
      this.myDeck.shift();
    } else {
      console.log(`not your turn ${this.player}`);
    }
  }
    slapCard(player, game) {
    if (this.slapValidation(game) === true && this.suddenDeathLeader === true) {
      this.collectDiscardPile(game)
      player.winner = true;
      game.gameOver = true;
      //if you successfully slap as leader. you win
    } else if (this.slapValidation(game) === false && this.suddenDeathLeader === false && game.suddenDeathMode === true) {
      alert("game over")
      game.gameOver = true;
    } else if (this.slapValidation(game) === true) {  // legal slap
      this.collectDiscardPile(game);
      return true
    } else if (this.slapValidation(game) === false) {
      if (game.discardPile === undefined) {
        alert("bad slap - no cards to give")
        // TODO slaps w/empty - might be way to skip suddendeath mode COMPLEXITIES!???
        game.gameOver = true;
      } else {
        this.otherPlayer.myDeck.unshift(this.myDeck[0]);  //illegal slap
        this.myDeck.shift()
        return false
      }
    }
  }
  slapValidation(game) {
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
