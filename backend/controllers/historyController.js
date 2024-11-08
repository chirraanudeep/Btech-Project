// backend/controllers/historyController.js
const Video = require('../models/Video');

const getHistory = async (req, res) => {
    try {
        const videos = await Video.find({ owner: req.user.id }).sort({ dateTime: -1 });
        res.json(videos);

    } catch (error) {
        console.error(error); // Log the full error for debugging
        res.status(500).json({ msg: 'Server error fetching history' });
    }
};

module.exports = { getHistory };