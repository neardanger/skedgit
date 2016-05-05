var

  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  TwitterStrategy = require('passport-twitter').Strategy,
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js'),
  configAuth = require('./auth.js')



passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id,done){
  User.findById(id, function (err,user){
    done(err, user)
  })
})

//Local users strategy; this is how you create a local users
//for skedj without social media

passport.use('local-signup', new LocalStrategy({
  usernameField:'email',
  passwordField: 'password',
  passReqToCallback: true},

   function(req,email,password,done){
  //This checks to see if the user exists
  User.findOne({'local.email':email}, function(err,user){
    if(err) return done(err)
    if(user) return done(null,false,req.flash('signupMessage','Someone is already using that emai'))
    var newUser = new User()
    newUser.local.name = req.body.name
    newUser.local.email = email
    newUser.local.password = newUser.generateHash(password)
    newUser.save(function(err){
      if(err) return console.log(err)
      return done(null,newUser,null)
    })
  })
}))

//How to login without using social network
passport.use('local-login', new LocalStrategy({
  usernameField:  'email',
  passwordField: 'password',
  passReqToCallback : true},

  function(req,email,password,done){
    User.findOne({'local.email':email}, function(err,user){
      if(err) return done(err)
      if(!user) return done(null,false,req.flash('loginMessage', 'No user found'))
      if(!user.validPassword(password)) return done (null,false,req.flash('loginMessage','That password is incorrect'))
      return done(null,user)
    })
}))

//////////Strategy for creating users via social media


passport.use(new FacebookStrategy({

  clientID: configAuth.facebook.clientID,
  clientSecret: configAuth.facebook.clientSecret,
  callbackURL: configAuth.facebook.callbackURL,
  profileFields: configAuth.facebook.profileFields
}, function(token,refreshToken,profile,done){
User.findOne({'facebook.id': profile.id},function(err,user){
if (err) return done(err)
if(user) return done(null,user)
var newUser = new User()
newUser.facebook.id = profile.id
newUser.facebook.token = token
newUser.facebook.name = profile.displayName
newUser.facebook.email = profile.emails[0].value
newUser.save(function(err){
  if(err) return console.log(err)
  return done(null,newUser)

    })
  })
}))

passport.use(new TwitterStrategy({
  consumerKey: configAuth.twitter.consumerKey,
  consumerSecret: configAuth.twitter.consumerSecret,
  callbackURL: configAuth.twitter.callbackURL
}, function(token, tokenSecret, profile, done){
  console.log(profile)
  User.findOne({'twitter.id': profile.id}, function(err, user){
    if(err) console.log(err)
    if(user) return done(null, user)
    var newUser = new User()
    newUser.twitter.id = profile.id
    newUser.twitter.token = token
    newUser.twitter.name = profile.displayName
    newUser.twitter.username = profile.username
    newUser.save(function(err){
      if(err) console.log(err)
      return done(null, newUser)
    })
  })
}))



module.exports = passport
