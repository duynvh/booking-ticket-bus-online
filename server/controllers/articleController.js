var Article = require('../models/article');
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

exports.listArticle = function(req, res) {
    Article
    .find()
    .populate('category_article_id')
    .exec(function(err, articles) {
        if (err) res.send(err);
        res.json(articles);
    });
};

exports.createArticle = function(req, res) {
    var article = new Article(req.body);
    article.slug = string_to_slug(article.title);
    article.save(function(err, result) {
        if (err)
          res.send(err);
        res.json({ message: 'Article successfully created', result });
      });
    
};

exports.readArticle = function(req, res) {
    Article.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateArticle = function(req, res) {
    req.body.slug = string_to_slug(req.body.title);
    Article.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteArticle = function(req, res) {
    Article.remove({
      _id: req.params.id
    }, function(err, data) {
        if (err)
          res.send(err);
        res.json({ message: 'Article successfully deleted' });
    });
};
  
exports.readArticleBySlug = function(req, res) {
    Article.findOne({slug: req.params.slug}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};