// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({  // Call config only ONCE
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Config Object:", cloudinary.config()); // Log the config

module.exports = cloudinary;  // Export the configured cloudinary object