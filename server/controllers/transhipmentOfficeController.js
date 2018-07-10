var TranshipmentOffice = require('../models/transhipment_office');
var path = require('path');

exports.listTranshipmentOffice = function(req, res) {
    TranshipmentOffice
    .find()
    .populate('route_departure_id')
    .exec(function(err, articles) {
        if (err) res.send(err);
        res.json(articles);
    });
};

exports.createTranshipmentOffice = function(req, res) {
    var transhipmentOffice = new TranshipmentOffice(req.body);
    transhipmentOffice.save(function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
    });
};

exports.readTranshipmentOffice = function(req, res) {
    TranshipmentOffice.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
        res.json(data);
    });
};

exports.updateTranshipmentOffice = function(req, res) {
    TranshipmentOffice.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteTranshipmentOffice = function(req, res) {
    TranshipmentOffice.remove({
      _id: req.params.id
    }, function(err, data) {
        if (err)
        res.send(err);
        res.json({ message: 'Transhipment Office successfully deleted' });
    });
};
  
exports.listTranshipmentOfficeByRouteDeparture = function(req, res) {
    TranshipmentOffice
    .find({route_departure_id: req.params.id})
    .exec(function(err, offices) {
        if (err) res.send(err);
        res.json(offices);
    });
};