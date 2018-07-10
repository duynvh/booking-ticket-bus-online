var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
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
    article_id: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
}, {timestamps: true})
var Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;