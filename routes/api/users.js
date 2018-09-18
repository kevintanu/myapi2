var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = mongoose.model('User');

router.post('/authenticate', function(req, res, next){
  if(!req.body.username){
    return res.status(422).json({errors: {username: "can't be blank"}});
  }

  if(!req.body.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({
        username: user.username,
        email: user.email,
        token: user.token
      });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function(req, res, next){
  var user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save().then(function(){
    return res.json({
      username: user.username,
      email: user.email,
      token: user.generateJWT()
    });
  }).catch(next);
});

module.exports = router;
