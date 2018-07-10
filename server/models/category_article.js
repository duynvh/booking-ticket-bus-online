var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoryArticleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String
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
var CategoryArticle = mongoose.model('Category_Article',categoryArticleSchema);
module.exports = CategoryArticle;