var
  express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  ejsLayouts = require('express-ejs-layouts'),
  yelp = require('/api/yelp.js'),
  userRoutes = require('/routes/user.js')

// app config
mongoose.connect('mongod://localhost/skedgit', function(err){
  if(err) throw console.error(
    console.log('connect to mongo');
  );
})
//middleware
app.use(ejsLayouts)
app.use('view engine', 'ejs')
app.use(boderParser.json())
app.use(express.static('/public'))

//routes
app.use('/users', userRoutes)



app.listen(3000, function(){
  console.log("Listening to port 3000");
})
