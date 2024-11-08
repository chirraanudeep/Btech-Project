// modelIntegration.js
const axios = require('axios');

const runModel = async (videoUrl) => {
    try {
        const response = await axios.post('http://localhost:5001/predict', { videoUrl }, {
            timeout: 30000,
        });
        return response.data;
    } catch (error) {
        console.error("Error calling Python API:", error);

        if (error.code === 'ECONNABORTED') {
            throw new Error("Model evaluation timed out."); // More specific message
        } else if (error.response) {
            // Extract error message from Python API response (if available)


            const serverErrorMessage = error.response.data.error || error.response.data.msg || "Unknown server error";

            throw new Error(`Model evaluation failed: ${serverErrorMessage}`);


        } else {


            throw new Error("Model evaluation failed: " + error.message); //Generic message with details



        }


    }
};


module.exports = { runModel };