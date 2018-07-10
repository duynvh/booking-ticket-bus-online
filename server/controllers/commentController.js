var Comment = require('../models/comment');
var path = require('path');

exports.listComment = function(req, res) {
    Comment.find({}, function(err, comment) {
      if (err)
        res.send(err);
      res.json(comment);
    });
};

exports.createComment = function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err, result) {
      if (err)
        res.send(err);
      res.json({ message: 'Comment successfully created', comment });
    });
};

exports.readComment = function(req, res) {
    Comment.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateComment = function(req, res) {
    Comment.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteComment = function(req, res) {
  Comment.remove({
      _id: req.params.id
    }, function(err, data) {
        if (err)
          res.send(err);
        res.json({ message: 'Comment successfully deleted' });
    });
};
  