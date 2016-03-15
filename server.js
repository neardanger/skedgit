var
  express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  ejsLayouts = require('express-ejs-layouts'),
  // yelp = require('./api/yelp.js'),
  userRoutes = require('./routes/users.js'),
  bodyParser = require('body-parser'),
  yelpRoutes = require('./routes/yelp.js'),
  scheduleRoutes = require('./routes/schedules.js'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  bcrypt = require('bcrypt-nodejs'),
  flash = require('connect-flash')

// app config
mongoose.connect('mongodb://neardanger:magadan312@ds015289.mlab.com:15289/skedgit', function(err){
  if(err) throw err
    console.log('connected to mongo');
})
//middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
// app.use(session({
//   secret: "Steven",
//   cookie: {_expires: 8000000}
// }))
app.use(ejsLayouts)
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(bodyParser.json())
app.use(express.static('/public'))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//routes
app.get('/', function(req,res){
  res.sendFile(__dirname, '/index.html')
})
app.use('/', userRoutes)
app.use('/yelp', yelpRoutes)
app.use('/schedules', scheduleRoutes)


app.listen(3000, function(){
  console.log("Listening to port 3000");
})
