var Menu = require('../models/menu');
var path = require('path');

exports.listMenu = function(req, res) {
    Menu.find({status: 'active'}, function(err, menu) {
      if (err)
        res.send(err);
      res.json(menu);
    });
};

exports.listAllMenu = function(req, res) {
    Menu.find({}, function(err, menu) {
      if (err)
        res.send(err);
      res.json(menu);
    });
};

exports.createMenu = function(req, res) {
    Menu.findOne({name: req.body.name}, function(err, existingMenu) {
      if(existingMenu) {
        return res.json({ error: 'Menu name is in use', message: '' });
      }

      var menu = new Menu(req.body);
      menu.save(function(err, result) {
        if (err)
          res.send(err);
        res.json({ message: 'Menu successfully created', result });
      });
    })
    
};

exports.readMenu = function(req, res) {
    Menu.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateMenu = function(req, res) {
  Menu.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};
  
  
exports.deleteMenu = function(req, res) {
  req.body.status = 'inactive';
  Menu.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};
  