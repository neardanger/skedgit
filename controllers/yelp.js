// ----- Required Modules ----- //
var bodyParser = require('body-parser'), // needs boderParser for returning json
    yelp = require('../api/yelp.js')

// ----- Export Actions ----- //
module.exports = {
  // - search action - //
  search: function(req, res){
    // - pass an object populated with search terms to the yelp api - //
    yelp.search(req.body.query)
    // - return search result as json - //
    .then(function(result){
      res.json(result)
    })
    // - catch errors, if any - //
    .catch(function(err){
      console.error(err)
    })
  },
  // - business lookup action - //
  business: function(req,res){
    // - look up business by id passed in url - //
    yelp.business(req.params.id, function(err, business) {
      if (err) throw err
      // - return business data as json - //
      res.json(business)
    })
  }
}
