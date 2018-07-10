var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
    slug: {
        type: String
    },
    detail: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:"active"
    },
    category_schedule_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category_Schedule',
    }
},
    {timestamps: true}
)

var Schedule = mongoose.model('Schedule',scheduleSchema);
module.exports = Schedule;