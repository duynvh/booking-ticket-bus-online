var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    status: {
        type: String,
        default:"active"
    },
    ordering:{
        type: Number,
        required: true
    },
    category_article_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category_Article'
    }
}, {timestamps: true})
var Article = mongoose.model('Article',articleSchema);
module.exports = Article;