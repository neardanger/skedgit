module.exports = {
  profile: function(req,res){
    User.find({_id: req.params.id}, function(err,user){
      if(err) throw err
      res.render('/users/profile', user)
    })
  }
}
