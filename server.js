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

// app.dynamicHelpers({
//     user: function(req, res){
//         var name, id, schedules
//
//         if (req.session && req.session.auth == true) {
//             name = req.session.user.facebook.name
//             id = req.session.user.facebook.id
//             schedules = req.session.user.schedules
//         }
//         else {
//             name = null
//             id = null
//             schedules = null
//         }
//
//         return {
//             name: name,
//             id: id,
//             schedules: schedules
//         }
//     }
// })

//routes
app.get('/', function(req,res){
  res.sendFile(__dirname, '/index.html')
})

app.use('/users', userRoutes)
app.use('/yelp', yelpRoutes)
app.use('/schedules', scheduleRoutes)



app.set('port', (process.env.PORT || 3000));
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
