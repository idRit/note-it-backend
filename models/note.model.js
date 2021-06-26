const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    subject: String,
    transcript: String,
    tags: [String],
}, {
    timestamps: true    
});

module.exports = mongoose.model('note', schema);