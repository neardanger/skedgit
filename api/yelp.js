// ----- Required Module ----- //
var Yelp = require('yelp')

// ----- Setup Keys for Yelp OATH ----- //
var yelp = new Yelp({
  consumer_key: 'tt-BmlOw8EPQHp0Tq-G7qg',
  consumer_secret: 'U2liHDQtVnUdKnYA9CqpyXAUZLc',
  token: 'gzfD3o3Y0nyCFnVhWz7wABm2NKLxOXR1',
  token_secret: 'HX3bd96TrwthQYNrw6GBFdiKqzc',
})

// ----- Export Yelp Object ----- //
module.exports = yelp
