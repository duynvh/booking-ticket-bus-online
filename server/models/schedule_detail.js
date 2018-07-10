var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleDetailSchema = new Schema({
    schedule_id: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
    },
    price: {
        type: Number,
        required: true
    },
    start_time: {
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
var scheduleDetail = mongoose.model('Schedule_Detail',scheduleDetailSchema);
module.exports = scheduleDetail;