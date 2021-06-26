const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    subject: String,
    tldr: String,
    tags: [String],
}, {
    timestamps: true    
});

module.exports = mongoose.model('tldr', schema);