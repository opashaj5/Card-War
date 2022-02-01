const suit = ['♣', '♦', '♥', '♠']
const value = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

export default class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards
}

  get numOfCards() {
    return this.cards.length
}
  pop() {
    return this.cards.shift()
}
  push(card) {
    this.cards.push(card)
}
  shuffle() {
    for (let i = this.numOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      const oldValue = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = oldValue
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
}

  get color() {
    return this.suit === "♦" || this.suit === "♥" ? "red" : "black"
}
  getHTML() {
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}
function newDeck() {
  return suit.flatMap(suit => {
    return value.map(value => {
      return new Card(suit, value)
    })
  })
}