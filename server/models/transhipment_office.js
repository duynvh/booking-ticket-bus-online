var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transhipmentOfficeSchema = new Schema({
    route_departure_id: {
        type: Schema.Types.ObjectId,
        ref: 'Route_Departure',
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
var transhipmentOffice = mongoose.model('Transhipment_Office',transhipmentOfficeSchema);
module.exports = transhipmentOffice;