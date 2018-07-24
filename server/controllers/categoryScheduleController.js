var CategorySchedule = require('../models/category_schedule');
var Province = require('../models/province');
var path = require('path');

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

exports.listCategorySchedule = function(req, res) {
    CategorySchedule
    .find()
    .populate('province_id')
    .exec(function(err, articles) {
        if (err) res.send(err);
        res.json(articles);
    });
};

exports.createCategorySchedule = function(req, res) {
    var categorySchedule = new CategorySchedule(req.body);
    var name = '';
    Province.findById(req.body.province_id, function(err, data) {
      if (err) res.send(err);
      categorySchedule.name = data.name;
      categorySchedule.slug = string_to_slug(categorySchedule.name);
      categorySchedule.save(function(err, result) {
      if (err)
          res.send(err);
        res.json({ message: 'Category Schedule successfully created', result });
      });
    });
};

exports.readCategorySchedule = function(req, res) {
    CategorySchedule.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateCategorySchedule = function(req, res) {
    Province.findOne(req.body.province_id, function(err, data) {
      if (err) res.send(err);
      req.body.name = data.name;
      req.body.slug = string_to_slug(req.body.name);
      CategorySchedule.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
        if (err)
          res.send(err);
        res.json(data);
      });
    });
    
};
  
  
exports.deleteCategorySchedule = function(req, res) {
  req.body.status = 'inactive';
  CategorySchedule.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.readCategoryScheduleBySlug = function(req, res) {
  CategorySchedule.findOne({slug: req.params.slug}, function(err, data) {
    if (err)
        res.send(err);
      res.json(data);
  });
};
  