var game = new Game()

// Event Listener

document.addEventListener('keydown', playerKeyEvent)
document.querySelector("#main__get-started__button").addEventListener('click', hideTutorialStartGame)

// Functions That Update HTML Visually

function hideTutorialStartGame() {
  document.querySelector("#main__get-started").classList.add("--goaway")
  game.loadSavedGame();
  startNewRound();
  updateWinsText();
}

function updateDisplayedElements(player) {
  updateDiscardImage();
  updateTurnGlow();
  updateTotalCardsText();
  if (player !== undefined) {
    updatePlayerDeckImage(player);
    updateInDanger(player);
    updateWhatHappened(player);
  }
}

function updateWinsText() {
  document.querySelector("#deck__p1__wins").innerText = `${game.player1.wins} WINS`
  document.querySelector("#deck__p2__wins").innerText = `${game.player2.wins} WINS`
}

function updateTotalCardsText() {
  document.querySelector("#deck__p1__cards").innerText = `CARDS x ${game.player1.myDeck.length}`
  document.querySelector("#deck__p2__cards").innerText = `CARDS x ${game.player2.myDeck.length}`
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
  for (var i = 0; i < game.playerArray.length; i++) {
    if (game.playerArray[i].myDeck.length === 0) {
      document.querySelector(`#deck__${game.playerArray[i].player}__image__container`).classList.add("--hidden")
    } else if (game.playerArray[i].myDeck.length !== 0) {
      document.querySelector(`#deck__${game.playerArray[i].player}__image__container`).classList.remove("--hidden")
    }
  }
};

function updateInDanger(player) {
  for (var i = 0; i < game.playerArray.length; i++) {
    if (game.playerArray[i].myDeck.length < 5) {
      document.querySelector(`#deck__${game.playerArray[i].player}__cards`).classList.add("--danger-text")
    } else if (game.playerArray[i].myDeck.length > 4) {
      document.querySelector(`#deck__${game.playerArray[i].player}__cards`).classList.remove("--danger-text")
    }
  }
}

function updateWhatHappened(player) {
  if (game.referee[player.player] === "slap-trump-card") {
    document.querySelector(".cutout-text").innerText = `${[player.player].toString().toUpperCase()} TRUMP CARD`
  } else if (game.referee[player.player] === "slap-doubles") {
    document.querySelector(".cutout-text").innerText = `${[player.player].toString().toUpperCase()} DOUBLES`
  } else if (game.referee[player.player] === "slap-sandwich") {
    document.querySelector(".cutout-text").innerText = `${[player.player].toString().toUpperCase()} SANDWICH`
  } else if (game.referee[player.player] === "not-your-turn-deal" || game.referee[player.player] === "no-more-cards-deal") {
    document.querySelector(".cutout-text").innerText = `${[player.otherPlayer.player].toString().toUpperCase()} DEAL`
  } else if (game.referee[player.player] === "bad-slap") {
    document.querySelector(".cutout-text").innerText = `${[player.player].toString().toUpperCase()} LOSE A CARD`
  }
}

// Gameplay Functionality

function updateGame(player) {
  updatePlayerStats(player)
  updateDisplayedElements(player);
  checkWinStatus();
}

function playerKeyEvent(event) {
  if (event.keyCode === 81 || event.keyCode === 70) {
    game.player1.playCard(event.keyCode)
    game.endGameCheck(game.player1)
    updateGame(game.player1);
  } else if (event.keyCode === 80 || event.keyCode === 74) {
    game.player1.playCard(event.keyCode)
    game.endGameCheck(game.player2)
    updateGame(game.player2);
  }
}

function updatePlayerStats(player) {
  if (game.referee.validSlap === true) {
    game.collectDiscardPile(player);
    game.shuffleDeck(player.myDeck);
    player.keepTurn()
  } else if (game.referee.validSlap === false) {
    game.giveAwayCard(player)
    player.loseTurn();
  } else if (game.referee.loseDeal === false) {
    player.keepTurn()
  } else if (game.referee.loseDeal === true) {
    player.loseTurn();
  }
}

function checkWinStatus() {
  if (game.winCheck() === true) {
    updateWinsText();
    alert("game over, redeal?")
    startNewRound();
    game.saveGameToStorage();
  }
}

function startNewRound() {
  game.resetPlayerStats();
  game.setupNewRound();
  game.shuffleDeck(game.allCards)
  game.dealNewRound();
  updateDisplayedElements();
}
