import Deck from "./deck.js"

// Object to signify each cards value
const cardLegend = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

// Elements
const compFaceCard = document.querySelector(".comp-card")
const playerFaceCard = document.querySelector(".player-card")
const compDeckEl = document.querySelector(".comp-deck")
const playerDeckEl = document.querySelector(".player-deck")
const message = document.querySelector(".message")

// Global variables
let playerDeck, compDeck, inGame, stop

// Function to run game at on click
document.addEventListener("click", () => {
  if (stop) {
    startGame()
    return
  }

// Flips cards during game and resets cards
  if (inGame) {
    resetDeck()
  } else {
    flipCards()
  }
})

// Start Game
startGame()
function startGame() {
  const deck = new Deck()
  deck.shuffle()

// Divides deck in half between two players
  const cutDeck = Math.ceil(deck.numOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, cutDeck))
  compDeck = new Deck(deck.cards.slice(cutDeck, deck.numOfCards))
  inGame = false
  stop = false
  resetDeck()
}

// Game default
function resetDeck() {
  inGame = false
  compFaceCard.innerHTML = ""
  playerFaceCard.innerHTML = ""
  message.innerText = ""
  updateCardCount()
}

// Function to show cards
function flipCards() {
  inGame = true

  const playerCard = playerDeck.pop()
  const compCard = compDeck.pop()

  playerFaceCard.appendChild(playerCard.getHTML())
  compFaceCard.appendChild(compCard.getHTML())
  updateCardCount()

// Messages received in game
  if (higherCard(playerCard, compCard)) {
    message.innerText = "You had the higher card"
    playerDeck.push(playerCard)
    playerDeck.push(compCard)
  } else if (higherCard(compCard, playerCard)) {
    message.innerText = "Bot had the higher card"
    compDeck.push(playerCard)
    compDeck.push(compCard)
  } else {
    message.innerText = "Draw"
    playerDeck.push(playerCard)
    compDeck.push(compCard)
  }

// Game over
  if (gameOver(playerDeck)) {
    message.innerText = "You lose..."
    stop = true
  } else if (gameOver(compDeck)) {
    message.innerText = "You Win!"
    stop = true
  }
}

// Updates the number of cards for each player
function updateCardCount() {
  compDeckEl.innerText = compDeck.numOfCards
  playerDeckEl.innerText = playerDeck.numOfCards
}

// Checks which card is higher during each round
function higherCard(cardOne, cardTwo) {
  return cardLegend[cardOne.value] > cardLegend[cardTwo.value]
}

// Game is over when there are 0 cards left
function gameOver(deck) {
  return deck.numOfCards === 0
}

//***MODAL***//

// Get the modal
let modal = document.getElementById("myModal");
// Get the button that opens the modal
let btn = document.getElementById("how-to");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the player clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
// When the player clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the player clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}