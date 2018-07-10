var Province = require('../models/province');
var path = require('path');

exports.listProvince = function(req, res) {
    Province.find({}, function(err, province) {
      if (err)
        res.send(err);
      res.json(province);
    });
};

exports.createProvince = function(req, res) {
  Province.findOne({name: req.body.name}, function(err, existingProvince) {
      if(existingProvince) {
        return res.json({ error: 'Province is in use', message: '' });
      }

      var province = new Province(req.body);
      province.save(function(err, result) {
        if (err)
          res.send(err);
        res.json({ message: 'Province successfully created', province });
      });
    })
};

exports.readProvince = function(req, res) {
    Province.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateProvince = function(req, res) {
    Province.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteProvince = function(req, res) {
    Province.remove({
      _id: req.params.id
    }, function(err, data) {
        if (err)
        res.send(err);
        res.json({ message: 'Province successfully deleted' });
    });
};
  