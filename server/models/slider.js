var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sliderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default:"active"
    },
    ordering:{
        type: Number,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})
var Slider = mongoose.model('Slider',sliderSchema);
module.exports = Slider;