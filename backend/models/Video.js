const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    cloudinaryUrl: { type: String, required: true },
    accuracy: { type: Number },
    dateTime: { type: Date, default: Date.now },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Video', videoSchema);