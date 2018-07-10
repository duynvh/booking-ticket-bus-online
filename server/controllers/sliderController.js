var Slider = require('../models/slider');
var path = require('path');
const uuid = require('uuid');
exports.listSlider = function(req, res) {
    Slider.find({}, function(err, sliders) {
      if (err)
        res.send(err);
      res.json(sliders);
    });
};

exports.createSlider = function(req, res) {
    var slider = new Slider(req.body);
    let imageFile = req.files.file;
    data.image = 'slider_'+ uuid.v4() + '.png';
    imageFile.mv(`${__dirname}/public/slider/${data.image}.png`, function(err) {
        if (err) {
          return res.status(500).send(err);
        }
    });
    slider.save(function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
    });
};

exports.readSlider = function(req, res) {
    Slider.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateSlider = function(req, res) {
    Slider.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteSlider = function(req, res) {
    Slider.remove({
      _id: req.params.id
    }, function(err, data) {
        if (err)
        res.send(err);
        res.json({ message: 'Slider successfully deleted' });
    });
};
  