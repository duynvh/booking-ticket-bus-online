var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String
    },
    link: {
        type: String
    },
    type: {
        type: String,
        default: 'Normal'
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
var Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;