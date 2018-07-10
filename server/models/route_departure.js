var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeDepartureSchema = new Schema({
    category_schedule_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category_Schedule',
    },
    name: {
        type: String,
        required: true
    },
    hotline: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:"active"
    },
    ordering:{
        type: Number,
        required: true
    }
}, {timestamps: true})
var routeDeparture = mongoose.model('Route_Departure',routeDepartureSchema);
module.exports = routeDeparture;