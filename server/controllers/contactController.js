var Contact = require('../models/contact');
var path = require('path');
var mail =  require('../utils/mail');
var nodemailer = require('nodemailer');
exports.listContact = function(req, res) {
    Contact.find({}, function(err, contact) {
      if (err)
        res.send(err);
      res.json(contact);
    });
};

exports.createContact = function(req, res) {
    var contact = new Contact(req.body);
    contact.save(function(err, result) {
      if (err)
        res.send(err);
        var transporter =  nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'thanghoang064@gmail.com',
                pass: 'eotzmfeyuycgblmi'
            }
        });
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: req.body.name,
            to: 'nguyenvohoangduy@gmail.com',
            subject: req.body.title,
            text: 'You recieved message from ' + req.body.email,
            html: '<p>You have got a new message</b><ul><li>Name:' + req.body.name + '</li><li>Phone:' + req.body.phone + '</li><li>Email:' + req.body.email + '</li><li>Message:' + req.body.content + '</li></ul>'
        }
        transporter.sendMail(mainOptions, function(err, info){
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' +  info.response);
                res.json({ message: 'Contact successfully created', result });
            }
        });
        //mail.sendMail(mainOptions.from, mainOptions.to, mainOptions.subject, mainOptions.html);
    });
};

exports.readContact = function(req, res) {
    Contact.findById(req.params.id, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};

exports.updateContact = function(req, res) {
    Contact.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};
  
  
exports.deleteContact = function(req, res) {
  Contact.remove({
      _id: req.params.id
    }, function(err, data) {
        if (err)
          res.send(err);
        res.json({ message: 'Contact successfully deleted' });
    });
};
  