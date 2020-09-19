var game = new Game()

document.addEventListener('keydown', function dealOrSLap(event) {
  if (event.keyCode === 81) { // q
    game.player1.dealCard(game);
  }
  if (event.keyCode === 80) {// p
    game.player2.dealCard(game);
  }
  if (event.keyCode === 70) { // f
    game.player1.slapCard(game.player1, game);
  }
  if (event.keyCode === 74) { // j
    game.player1.slapCard(game.player2, game);
  }
  checkGameStatus();
  updateDisplayedElements();
})

document.querySelector("#main__get-started__button").addEventListener('click', hideTutorialStartGame)

// Functions That Update HTML Visually

function hideTutorialStartGame() {
  document.querySelector("#main__get-started").classList.add("--goaway")
  startNewRound();
}

function updateDisplayedElements() {
  displayCard();
  whosTurnGlow();
}

function updateWins() {
  document.querySelector("p").innerText = `${game.player1.wins} WINS`
  document.querySelector("p").innerText = `${game.player1.wins} WINS`
}

function displayCard() {
  if (game.discardPile[0] !== undefined) {
    document.querySelector("#deck__discard__asset").src = `./assets/${game.discardPile[0]}.png`
    document.querySelector("#deck__discard__asset").classList.remove("--hidden")
  } else {
    document.querySelector("#deck__discard__asset").classList.add("--hidden")
  }
}

function whosTurnGlow() {
  if (game.player1.myTurn === true) {
    document.querySelector("#deck__discard-pile").classList.add("--glow1");
    document.querySelector("#deck__discard-pile").classList.remove("--glow2")
  } else {
    document.querySelector("#deck__discard-pile").classList.add("--glow2")
    document.querySelector("#deck__discard-pile").classList.remove("--glow1");
  }
}

//          Gameplay Functionality

function checkGameStatus() {
  game.checkSuddenDeath();
  game.winCheck();
  if (game.winCheck() === true) {
    startNewRound();
    updateWins();
  }
}

function startNewRound() {
  game.resetPlayerStats();
  game.setupNewRound();
  game.shuffleDeck(game.allCards)
  game.dealNewRound();
  updateDisplayedElements();
}

// if my turn, highlight deck and card with pulse?
