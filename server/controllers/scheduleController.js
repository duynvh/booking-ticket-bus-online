var Schedule = require('../models/schedule');
var CategorySchedule = require('../models/category_schedule');
var path = require('path');
var slugify = require('slugify');

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();
  
  // remove accents, swap ñ for n, etc
  var from = "ẵàáạäâèéëêìíïîòóöôồơũùúüûñçđ·/_,:;";
  var to   = "aaaaaaeeeeiiiioooooouuuuuncd------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}


exports.listSchedule = function(req, res) {
    Schedule
    .find()
    .populate("category_schedule_id")
    .exec(function(err, schedules) {
        if (err) res.send(err);
        res.json(schedules);
    });
};

exports.listScheduleByCategorySchedule = function(req, res) {
    Schedule
    .find({category_schedule_id: req.params.id})
    .exec(function(err, schedules) {
        if (err) res.send(err);
        res.json(schedules);
    });
};

exports.createSchedule = function(req, res) {
    var schedule = new Schedule(req.body);
    CategorySchedule.findById(req.body.category_schedule_id, function(err, data) {
      if (err) res.send(err);
      schedule.detail = data.name + " - " + req.body.name;
      schedule.slug = string_to_slug(schedule.detail);
      schedule.save(function(err, result) {
        if (err) res.send(err);
        res.json({ message: 'Schedule successfully created', result });
      });
    });
};

exports.readSchedule = function(req, res) {
    Schedule.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.readScheduleBySlug = function(req, res) {
    Schedule.findOne({slug: req.params.slug}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateSchedule = function(req, res) {
    CategorySchedule.findById(req.body.category_schedule_id, function(err, data) {
      console.log(data);
      if (err) res.send(err);
      req.body.detail = data.name + " - " + req.body.name;
      req.body.slug = string_to_slug(req.body.detail);
      Schedule.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
        if (err)
          res.send(err);
        res.json(data);
      });
    });
};
  
  
exports.deleteSchedule = function(req, res) {
  req.body.status = 'inactive';
  Schedule.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};
  