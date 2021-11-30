const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, requird: true },
    content: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);