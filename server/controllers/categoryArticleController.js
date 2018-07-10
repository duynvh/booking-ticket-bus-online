var CategoryArticle = require('../models/category_article');
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

exports.listCategoryArticle = function(req, res) {
  CategoryArticle.find({}, function(err, categoryArticle) {
      if (err) res.send(err);
      res.json(categoryArticle);
    });
};

exports.createCategoryArticle = function(req, res) {
    CategoryArticle.findOne({name: req.body.name}, function(err, existingGroup) {
      if(existingGroup) {
        return res.json({ error: 'Category Article name is in use', message: '' });
      }

      var group = new CategoryArticle(req.body);
      group.slug = string_to_slug(group.name);
      group.save(function(err, result) {
        if (err)
          res.send(err);
        res.json({ message: 'Category Article successfully created', group });
      });
    })
};

exports.readCategoryArticle = function(req, res) {
    CategoryArticle.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateCategoryArticle = function(req, res) {
    req.body.slug = string_to_slug(req.body.name);
    CategoryArticle.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteCategoryArticle = function(req, res) {
  CategoryArticle.remove({
      _id: req.params.id
    }, function(err, data) {
        if (err)
        res.send(err);
        res.json({ message: 'Category Article successfully deleted' });
    });
};

exports.readCategoryArticleBySlug = function(req, res) {
    CategoryArticle.findOne({slug: req.params.slug}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  