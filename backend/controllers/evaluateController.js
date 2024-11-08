// evaluateController.js
const cloudinary = require('../config/cloudinaryConfig');
const Video = require('../models/Video');
const { runModel } = require('../utils/modelIntegration');

const evaluateVideo = async (req, res) => {
    try {
        console.log("Request received:", req.files);

        if (!req.files || !req.files.video) {
            return res.status(400).json({ msg: "No video file uploaded." });
        }

        const file = req.files.video;
        console.log("File object:", file);

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "video",
            folder: "deepfake-uploads"
        });

        console.log("Cloudinary Upload Result:", result);

        const video = new Video({
            cloudinaryUrl: result.secure_url,
            owner: req.user.id, // Assuming you're using authentication
        });

        const modelResult = await runModel(result.secure_url);

        video.fakeProbability = modelResult.fake_probability;
        await video.save();

        req.user.videos.push(video); // Associate with user (if using authentication)
        await req.user.save();

        res.status(200).json({ video: { fakeProbability: video.fakeProbability, url: result.secure_url } });

    } catch (error) {
        console.error("Error in evaluateVideo:", error);


        if (error.message && error.message.startsWith("Cannot read properties of undefined")) {
            return res.status(400).json({ msg: "Please upload a video file.", details: error.message });


        } else if (error.message && error.message.startsWith("Model evaluation failed")) {  // Check all model errors



            return res.status(500).json({


                msg: "Deepfake analysis failed. Please try again later or contact support.", //User-friendly message


                details: error.message || error //Detailed message


            });



        } else {


            return res.status(500).json({ msg: "Server error during video evaluation.", details: error.message || error });



        }

    }
};

module.exports = { evaluateVideo };