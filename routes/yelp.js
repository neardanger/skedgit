// ----- Required Modules ----- //
var express = require('express'),
    yelpRouter = express.Router(),
    yelpCtrl = require('../controllers/yelp.js')

// ----- Routes ----- //
// - search query - //
yelpRouter.post('/search', yelpCtrl.search)
// - business lookup - //
yelpRouter.get('/business/:id', yelpCtrl.business)

// ----- Export ----- //
module.exports = yelpRouter
