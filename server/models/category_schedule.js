var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoryScheduleSchema = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },
    province_id: {
        type: Schema.Types.ObjectId,
        ref: 'Province',
    },
    hotline: {
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
var categorySchedule = mongoose.model('Category_Schedule',categoryScheduleSchema);
module.exports = categorySchedule;