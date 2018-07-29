var Order = require('../models/order');
var CategorySchedule = require('../models/category_schedule');
var Schedule = require('../models/schedule');
var Contact = require('../models/contact');
var ScheduleDetail = require('../models/schedule_detail');
var path = require('path');
var moment = require('moment')
var mail =  require('../utils/mail');
var nodemailer = require('nodemailer');
const constants = require('../configs/constants');
const stripe = require('stripe')(constants.stripeSecretKey);
exports.listOrder = function(req, res) {
    Order
    .find({})
    .populate({
      path: 'schedule_detail_id',
      populate: {
        path: 'schedule_id',
      }
    })
    .exec(function(err, orders) {
        if (err) res.send(err);
        res.json(orders);
    });
};

exports.createOrder = function(req, res) {
  req.body.date_detail = formatDate(req.body.date);
  var order = new Order(req.body);
  ScheduleDetail
  .findById(req.body.schedule_detail_id)
  .populate('schedule_id')
  .exec(function(err, data) {
    console.log(data);
    if (err) res.send(err);
    order.save(function(err, order) {
    if (err)
      res.send(err);
      var transporter =  nodemailer.createTransport({ // config mail server
          service: 'Gmail',
          auth: {
              user: 'thanghoang064@gmail.com',
              pass: 'eotzmfeyuycgblmi'
          }
      });

      const paymentMethod = req.body.method_payment === 'offline' ? 'Chưa thanh toán' : 'Đã thanh toán';

      const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
          from: req.body.name,
          to: req.body.email,
          subject: 'Đặt vé xe khách thành công',
          text: 'Bạn đã nhận được email',
          html: '<p><strong>Bạn đã đặt vé xe khách thành công</strong></p><table style="width: 100%;border-collapse: collapse;"th"><tr><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Thông tin chuyến xe</th><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Thông tin khách hàng</th><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Số ghế</th><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Tổng tiền</th><th style="border: 1px solid #dddddd;text-align: left;padding: 8px;">Thanh toán</th></tr><tr><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;"><p>'+data.schedule_id.detail+'</p><p>'+data.start_time+'</p><p>'+req.body.date_detail+'</p></td><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;"><p>'+req.body.name+'</p><p>'+req.body.phone+'</p></td><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">'+req.body.seat.join(",")+'</td><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;">' + req.body.total + '</td><td style="border: 1px solid #dddddd;text-align: left;padding: 8px;"><b>' + paymentMethod + '</b></td></tr></table>'
          // '<ul><li>Chuyến xe:' + data.schedule_id.detail + '</li><li>Giờ chạy:' + data.start_time + '</li><li>Họ và tên khách hàng:' + req.body.name + '</li><li>Số điện thoại:' + req.body.phone + '</li><li>Số ghế:' + req.body.seat.join(",") + '</li><li>Tổng tiền:' + req.body.total + '</li></ul>'
      }
      transporter.sendMail(mainOptions, function(err, info){
          if (err) {
              console.log(err);
          } else {
              console.log('Message sent: ' +  info.response);
              res.json({ message: 'Order successfully created', order });
          }
      });
    });
  });
};


exports.getListOrderByScheduleDetailAndDate = function(req, res) {
  var fulldate = new Date(parseInt(req.params.date));
  var date = formatDate(fulldate);
  Order.find({schedule_detail_id: req.params.schedule_detail_id, date_detail: date}, function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};

exports.getListOrder = function(req, res) {
  var fulldate = new Date(parseInt(req.params.date));
  var date = formatDate(fulldate);
  Order.find({date_detail: date}, function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};

exports.createCharge =  async function(req, res) {
  const amount = Math.floor(req.body.total / 220);
  const charge = await stripe.charges.create({
    amount,
    currency: 'usd',
    source: req.body.id
  });
  res.send(charge);
}

exports.dashboard = async function(req, res) {
  var arrDashboard = {
      listOrder: 0,
      listCategorySchedule: 0,
      listSchedule: 0,
      listContact: 0
  };

  var listOrder = 0;

  arrDashboard.listOrder = await Order.count({});
  arrDashboard.listCategorySchedule = await CategorySchedule.count({});
  arrDashboard.listSchedule = await Schedule.count({});
  arrDashboard.listContact = await Order.count({});
  res.json(arrDashboard);
  // CategorySchedule.count({}, function(err, count){
  //   arrDashboard.listCategorySchedule = count;
  // })
  //
  // Contact.count({}, function(err, count) {
  //   arrDashboard.listSchedule = count;
  // })
  //
  // Schedule.count({}, function(err, count) {
  //   arrDashboard.listContact = count;
  // })
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function ISODateString(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
        + pad(d.getUTCMonth()+1)+'-'
        + pad(d.getUTCDate())+'T'
        + pad(d.getUTCHours())+':'
        + pad(d.getUTCMinutes())+':'
        + pad(d.getUTCSeconds())+'Z'
}
