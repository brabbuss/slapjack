var game = new Game()

document.addEventListener('keydown', function playerEvent(event) {
  if (event.keyCode === 81 || event.keyCode === 70) {
    if (event.keyCode === 81) { // q
      game.dealCard(game.player1);
    } else if (event.keyCode === 70) { // f
      game.slapCard(game.player1);
    }
    // updatePlayerStats(game.player1)
    updateGame(game.player1);
  } else if (event.keyCode === 80 || event.keyCode === 74) {
    if (event.keyCode === 80) {// p
      game.dealCard(game.player2);
    } else if (event.keyCode === 74) { // j
      game.slapCard(game.player2);
    }
    // updatePlayerStats(game.player2)
    updateGame(game.player2);
  }
})

function updateGame(player) {
  updatePlayerStats(player)
  updateDisplayedElements(player);
  checkWinStatus();
}

document.querySelector("#main__get-started__button").addEventListener('click', hideTutorialStartGame)

// Functions That Update HTML Visually

function hideTutorialStartGame() {
  document.querySelector("#main__get-started").classList.add("--goaway")
  startNewRound();
}

function updateDisplayedElements(player) {
  updateDiscardImage();
  updateTurnGlow();
  updateTotalCardsText();
  updatePlayerDeckImage(player);
}

function updateWinsText() {
  document.querySelector("#deck__player1__wins").innerText = `${game.player1.wins} WINS`
  document.querySelector("#deck__player2__wins").innerText = `${game.player2.wins} WINS`
}

function updateTotalCardsText() {
  document.querySelector("#deck__player1__cards").innerText = `CARDS x ${game.player1.myDeck.length}`
  document.querySelector("#deck__player2__cards").innerText = `CARDS x ${game.player2.myDeck.length}`
  document.querySelector("#deck__discard__cards").innerText = `CARDS x ${game.discardPile.length}`
}

function updateDiscardImage() {
  if (game.discardPile[0] !== undefined) {
    document.querySelector("#deck__discard__asset").src = `./assets/${game.discardPile[0]}.png`
    document.querySelector("#deck__discard__asset").classList.remove("--hidden")
  } else {
    document.querySelector("#deck__discard__asset").classList.add("--hidden")
  }
}

function updateTurnGlow() {
  if (game.player1.myTurn === true) {
    document.querySelector("#deck__discard-pile").classList.add("--glow1");
    document.querySelector("#deck__discard-pile").classList.remove("--glow2")
  } else {
    document.querySelector("#deck__discard-pile").classList.add("--glow2")
    document.querySelector("#deck__discard-pile").classList.remove("--glow1");
  }
}

function updatePlayerDeckImage(player) {
  if (player.myDeck.length === 0) {
    console.log("HIDE DECK");
    document.querySelector(`#deck__${player.player}__image__container`).classList.add("--hidden")
  } else if (player.myDeck.length !== 0) {
    document.querySelector(`#deck__${player.player}__image__container`).classList.remove("--hidden")
  }
};


//          Gameplay Functionality

function updatePlayerStats(player) {
  // console.log(game.referee[player.player]);
  if (game.referee[player.player] === "valid-slap") {
    game.collectDiscardPile(player);
    game.shuffleDeck(player.myDeck);
    player.keepTurn()
  } else if (game.referee[player.player] === "invalid-slap") {
    game.giveAwayCard(player)
    player.loseTurn();
  } else if (game.referee[player.player] === "normal-deal") {
    player.loseTurn();
  } else if (game.referee[player.player] === "no-more-cards-deal") {
    player.loseTurn();
  }
}

function checkWinStatus() {
  if (game.winCheck() === true) {
    updateWinsText();
    alert("game over, redeal?")
    startNewRound();
  }
}

function startNewRound() {
  game.resetPlayerStats();
  game.setupNewRound();
  game.shuffleDeck(game.allCards)
  game.dealNewRound();
  updateDisplayedElements();
}
