var ScheduleDetail = require('../models/schedule_detail');
var Schedule = require('../models/schedule');
var path = require('path');

exports.listScheduleDetail = function(req, res) {
    ScheduleDetail
    .find()
    .populate('schedule_id')
    .exec(function(err, articles) {
        if (err) res.send(err);
        res.json(articles);
    });
};

exports.createScheduleDetail = function(req, res) {
    var schedule = new ScheduleDetail(req.body);
    schedule.save(function(err, result) {
      if (err)
        res.send(err);
      res.json({ message: 'Schedule Detail successfully created', result });
    });
};

exports.readScheduleDetail = function(req, res) {
    ScheduleDetail.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateScheduleDetail = function(req, res) {
    ScheduleDetail.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteScheduleDetail = function(req, res) {
  req.body.status = 'inactive';
  ScheduleDetail.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};
  
exports.listScheduleDetailBySlug = function(req, res) {
  Schedule.findOne({slug: req.params.slug}, function(err, data) {
    if (err) res.send(err);
    ScheduleDetail
    .find({schedule_id: data._id})
    .populate('schedule_id')
    .exec(function(err, articles) {
        if (err) res.send(err);
        res.json(articles);
    });
  });
};

exports.listScheduleDetailByScheduleID = function(req, res) {
  ScheduleDetail.find({schedule_id: req.params.id}, function(err, data) {
    if (err) res.send(err);
    res.json(data);
  });
};