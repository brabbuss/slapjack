class Player {
  constructor(player) {
    this.player = player;
    this.otherPlayer;
    this.myTurn = false;
    this.myDeck = [];
    this.allCards = false;
    this.wins = 0;
    this.winner = false;        // just in case
    this.suddenDeathLeader = false
  }
  dealCard(game) {
    console.log(game.suddenDeathMode);
    if (game.suddenDeathMode !== true && this.myTurn === true) {
      game.discardPile.unshift(this.myDeck[0]);       // place on discard pile array
      this.myDeck.shift();      // pull card from my card
      this.myTurn = false;
      this.otherPlayer.myTurn = true;
      this.checkSuddenDeath(game)
    } else {
      console.log(`not your turn ${this.player}`);
      while (this.suddenDeathLeader === true) {
        Thread.sleep(0);
        game.discardPile.unshift(this.myDeck[0]);
        this.myDeck.shift();
        this.checkSuddenDeath(game)
      }
    }
  }
  slapCard(game) {
    if (this.slapValidation(game) === true && this.suddenDeathLeader === true) {
      this.collectDiscardPile(game)
      game.gameOver = true; //if you successfully slap as leader. you win
    } else if (this.slapValidation(game) === true) {  // legal slap
      this.collectDiscardPile(game)
      this.shuffleDeck();
      this.myTurn = true
      return true
    } else {
      this.otherPlayer.myDeck.unshift(this.myDeck[0]);  //illegal slap
      this.myDeck.shift()
      this.myTurn = false;
      return false
    }
  }
  slapValidation(game) {
    if (validBasicSlaps.indexOf(game.discardPile[0]) !== -1) {  //  if the string at [0] is not included in basic slaps array, = -1 (void)
      console.log("trump card");
      return true;
    } else if (game.discardPile.length === 2) {
      if (game.discardPile[0].charAt(3) === game.discardPile[1].charAt(3)) {  //  leveraging naming convention to match
        console.log("doubles");
        return true;
      }
    } else if (game.discardPile.length > 2) {
      if (game.discardPile[0].charAt(3) === game.discardPile[2].charAt(3) || game.discardPile[0].charAt(3) === game.discardPile[1].charAt(3)) {
        console.log("sandwich");
        return true;
      }
    } else {
      console.log("bad slap");
      return false;
    }
  }
  collectDiscardPile(game) {
    this.myDeck = this.myDeck.concat(game.discardPile);
    game.discardPile = [];
  }
  shuffleDeck() {
    var totalCards = this.myDeck.length;
    while (totalCards !== 0) {
      var randomIndex = Math.floor(Math.random() * totalCards--);
      var pulledCard = this.myDeck[totalCards];
      this.myDeck[totalCards] = this.myDeck[randomIndex];
      this.myDeck[randomIndex] = pulledCard
    }
    return this.myDeck;
  }
  // checkSuddenDeath(game) {
  //   if (this.myDeck === [] || this.otherPlayer.myDeck === []) {
  //     game.suddenDeathMode = true;
  //     while (game.suddenDeathMode === true) {
  //       if (this.myDeck !== []) {
  //         this.suddenDeathLeader = true; //who's leader?
  //       };
  //     };
  //   } else if (this.myDeck !== [] && this.otherPlayer.myDeck !== []) {
  //     game.suddenDeathMode === false;
  //   }
  // }
}
