const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const redditArticle = new Schema({
    title: {
        type: String
    }
});

module.exports = mongoose.model('RedditArticle', redditArticle)