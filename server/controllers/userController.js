const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../configs/constants');
const path = require('path');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.listUser = function(req, res) {
    // User.find({}, function(err, user) {
    //   if (err)
    //     res.send(err);
    //   res.json(user);
    // });
    User
    .find()
    .populate('group_id')
    .exec(function(err, users) {
        if (err) res.send(err);
        res.json(users);
    });
};

exports.createUser = function(req, res) {
    if(!req.body.email || !req.body.password) {
      return res.status(422).send({error: 'You must provide email and password'});
    }

    User.findOne({email: req.body.email}, function(err, existingUser) {
        if(err) { return next(err); }

        if(existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

        var user = new User(req.body);
        user.save(function(err, result) {
          if (err)
            res.send(err);
          res.json({token: tokenForUser(user)});
        });
    });
};

exports.readUser = function(req, res) {
    User.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateUser = function(req, res) {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteUser = function(req, res) {
    User.remove({
      _id: req.params.id
    }, function(err, data) {
        if (err)
        res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};
  