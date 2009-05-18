Suit = function(name, color) {
  this.name = name
  this.color = color
  this.toString = function() {
    return "Suit[" + this.name + "," + this.color + "]"
  }
}

Value = function(value, name, shortName) {
  this.value = value
  this.name = name
  this.shortName = shortName
  if (!name) {
    this.shortName = this.name = value.toString()
  } else if (!shortName) {
    this.shortName = this.name.substring(0,1)
  }
  this.toString = function() {
    return "Value[" + this.value + "," + this.name + "," + this.shortName + "]"
  }
}

Deck = function() {
  this.values = [
    this.ACE, this.TWO, this.THREE, this.FOUR, this.FIVE, this.SIX, this.SEVEN,
    this.EIGHT, this.NINE, this.TEN, this.JACK, this.QUEEN, this.KING
  ]
  this.suits = [this.SPADE, this.CLUB, this.DIAMOND, this.HEART]
  for(var i = 0; i < this.suits.length; i++) {
    var suit = this.suits[i]
    for(var j = 0; j < this.values.length; j++) {
      var value = this.values[j]
      this.cards.push(new Card(this, value, suit))
    }
  }
}
Deck.prototype = {
  SPADE: new Suit("Spade", "black"),
  CLUB: new Suit("Club", "black"),
  DIAMOND: new Suit("Diamond", "red"),
  HEART: new Suit("Heart", "red"),

  TWO: new Value(2),
  THREE: new Value(3),
  FOUR: new Value(4),
  FIVE: new Value(5),
  SIX: new Value(6),
  SEVEN: new Value(7),
  EIGHT: new Value(8),
  NINE: new Value(9),
  TEN: new Value(10),
  JACK: new Value(11, "Jack"),
  QUEEN: new Value(12, "Queen"),
  KING: new Value(13, "King"),
  ACE: new Value(14, "Ace"),

  shuffle_count: 4,
  cards: [],
  drawn: [],

  shuffle: function() {
    for(var i = 0; i < this.shuffle_count; i++) {
      this.cards.sort(function() {
        return Math.round(Math.random(1)) || -1
      })
    }
  },

  draw: function(number) {
    number = number || 1
    var result = []
    for(var i = 0; i < number; i++) {
      var card = this.cards.pop()
      result.push(card)
      this.drawn.push(card)
    }
    return (number > 1) ? result : result[0]
  },

  collect: function() {
    while(this.drawn.length > 0) {
      var card = this.drawn.pop()
      card.removeView()
      card.show()
      this.cards.push(card)
    }
  },

  toString: function() {
    return this.cards.toString()
  }
}

Card = function(deck, value, suit) {
  this.deck = deck
  this.suit = suit
  this.value = value
}
Card.prototype = {
  toString: function() {
    return this.value.name + " of " + this.suit.name + "s"
  },

  hide: function() {
    var view = this.createView()
    view.className += ' hidden'
  },

  show: function() {
    var view = this.createView()
    var className = view.className
    if (className.indexOf(' hidden') >= 0) {
      view.className = className.replace(/ hidden/, '')
    }
  },

  removeView: function() {
    if (this.view && this.view.parentNode) {
      this.view.parentNode.removeChild(this.view)
    }
  },

  createView: function() {
    if (this.view) return this.view
    var view = document.createElement('div')
    view.className = 'card ' + this.suit.color + ' ' + this.suit.name.toLowerCase() + ' ' + this.value.name.toLowerCase()

    var valueTop = view.appendChild(document.createElement('span'))
    valueTop.className = 'value top'
    valueTop.appendChild(document.createTextNode(this.value.shortName))

    var valueBottom = view.appendChild(document.createElement('span'))
    valueBottom.className = 'value bottom'
    valueBottom.appendChild(document.createTextNode(this.value.shortName))

    var suit = view.appendChild(document.createElement('span'))
    suit.className = 'suit'

    this.view = view
    return view
  }
}
