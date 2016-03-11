var
  express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  ejsLayouts = require('express-ejs-layouts'),
  // yelp = require('./api/yelp.js'),
  userRoutes = require('./routes/users.js'),
  bodyParser = require('body-parser')

// app config
mongoose.connect('mongodb://localhost/skedgit', function(err){
  if(err) throw err
    console.log('connected to mongo');
})
//middleware
app.use(ejsLayouts)
// app.use('view engine', 'ejs')
app.use(bodyParser.json())
app.use(express.static('/public'))

//routes
app.use('/users', userRoutes)



app.listen(3000, function(){
  console.log("Listening to port 3000");
})
