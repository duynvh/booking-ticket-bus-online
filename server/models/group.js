var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var groupSchema = new Schema({
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
        required: true,
        default:0
    }
}, {timestamps: true})
var Group = mongoose.model('Group', groupSchema);
module.exports = Group;