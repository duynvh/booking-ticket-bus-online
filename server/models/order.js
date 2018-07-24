var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    schedule_detail_id: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule_Detail',
    },
    seat: [String],
    total: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    date_detail: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default:"active"
    },
    method_payment: {
        type: String,
        required: true
    },
    route_departure_name: {
      type: String,
      required: true
    }
}, {timestamps: true})
var Order = mongoose.model('Order',orderSchema);
module.exports = Order;
