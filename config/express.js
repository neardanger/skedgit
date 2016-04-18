var
  express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  ejsLayouts = require('express-ejs-layouts'),
  bodyParser = require('body-parser'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  bcrypt = require('bcrypt-nodejs'),
  flash = require('connect-flash')
  userRoutes = require('../routes/users.js'),
  yelpRoutes = require('../routes/yelp.js'),
  scheduleRoutes = require('../routes/schedules.js'),
  passportConfig = require('../config/passport.js')


module.exports = function(app, config) {

  app.use(logger('dev'))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({extended:true}))
  app.set('view engine', 'ejs')
  app.use(flash());
  app.use(express.static(path.join(__dirname, './public')))
  //app.use(ejsLayouts)
  app.use(bodyParser.json())
  app.use(session({ secret: 'awesomepossum' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static('./public'))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())

//Routes
app.get('/', function(req,res){
  res.sendFile(__dirname, './index.html')
})
app.get('/undefined', function(req,res){
  res.json({})
})

app.use('/users', userRoutes)
app.use('/yelp', yelpRoutes)
app.use('/schedules', scheduleRoutes)

}
