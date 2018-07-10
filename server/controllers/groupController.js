var Group = require('../models/group');
var path = require('path');

exports.listGroup = function(req, res) {
    Group.find({}, function(err, group) {
      if (err)
        res.send(err);
      res.json(group);
    });
};

exports.createGroup = function(req, res) {
    Group.findOne({name: req.body.name}, function(err, existingGroup) {
      if(existingGroup) {
        return res.json({ error: 'Group name is in use', message: '' });
      }

      var group = new Group(req.body);
      group.save(function(err, result) {
        if (err)
          res.send(err);
        res.json({ message: 'Group successfully created', group });
      });
    })
};

exports.readGroup = function(req, res) {
    Group.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateGroup = function(req, res) {
    Group.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteGroup = function(req, res) {
    Group.remove({
      _id: req.params.id
    }, function(err, data) {
        if (err)
          res.send(err);
        res.json({ message: 'Group successfully deleted' });
    });
};
  