var RouteDeparture = require('../models/route_departure');
var CategorySchedule = require('../models/category_schedule');
var path = require('path');

exports.listRouteDeparture = function(req, res) {
    RouteDeparture
    .find()
    .populate('category_schedule_id')
    .exec(function(err, articles) {
        if (err) res.send(err);
        res.json(articles);
    });
};

exports.createRouteDeparture = function(req, res) {
    var routeDeparture = new RouteDeparture(req.body);
    routeDeparture.save(function(err, result) {
      if (err)
        res.send(err);
        res.json({ message: 'Route Departure successfully created', result });
    });
};

exports.readRouteDeparture = function(req, res) {
    RouteDeparture.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateRouteDeparture = function(req, res) {
    RouteDeparture.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteRouteDeparture = function(req, res) {
    req.body.status = 'inactive';
    RouteDeparture.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
exports.listRouteDepartureBySlug = function(req, res) {
    CategorySchedule.findOne({slug: req.params.slug}, function(err, data) {
      if (err) res.send(err);
      RouteDeparture
      .find({category_schedule_id: data._id})
      .populate('category_schedule_id')
      .exec(function(err, routes) {
          if (err) res.send(err);
          res.json(routes);
      });
    });
};

exports.listRouteDepartureByCategoryScheduleID = function(req, res) {
  RouteDeparture.find({category_schedule_id: req.params.id}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  }); 
};