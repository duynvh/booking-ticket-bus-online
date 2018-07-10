var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var provinceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
var Province = mongoose.model('Province',provinceSchema);
module.exports = Province;