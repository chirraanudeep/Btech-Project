// Evaluate.jsx (Frontend)
import { useState } from 'react';
import axios from 'axios';
import './Evaluate.css';



export const Evaluate = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [result, setResult] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setUploadedVideo(event.target.files[0]);
    };

    const handleEvaluate = async () => {
        setError(null);
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            console.log("Token in Evaluate.jsx:", token); // Log the token
            if (!token) {
                setError("You must be logged in to evaluate a video.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('video', uploadedVideo);

            const response = await axios.post('/api/evaluate/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token,
                },
            });

            setResult(`Accuracy: ${response.data.video.accuracy}%`);
        } catch (error) {
            console.error("Evaluation error:", error.response ? error.response.data : error);

            if (error.response && error.response.data && error.response.data.msg) {
                setError(error.response.data.msg);
            } else if (error.response && error.response.status === 401) {
                setError("Unauthorized. Please log in again.");
            } else {
                setError("An error occurred during evaluation. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="evaluate-container">
            <div className="evaluate-left">
                <h2>How Deep Fake Detection Works</h2>
                <p>
                1. <b>Frontend Upload:</b> The user uploads a video on the website.<br/>
                2. <b>Upload to Cloudinary:</b> The video is uploaded to Cloudinary, which returns a URL.<br/>
                3. <b>Store URL in MongoDB:</b> The video URL is stored in MongoDB.<br/>
                4. <b>Model Processing:</b> The URL is retrieved from MongoDB, passed to the model for processing, and the model’s accuracy is calculated.<br/>
                5. <b>Save Accuracy in MongoDB:</b> The model’s accuracy is stored in MongoDB.<br/>
                6. <b>Frontend Display:</b> The accuracy is retrieved and displayed on the frontend.<br/>
                </p>
                
                
                 
            </div>



            <div className="evaluate-right">
                <input className='space' type="file" accept="video/*" onChange={handleFileChange} />

                {error && <div className="error-message">{error}</div>}

                <button className="button" onClick={handleEvaluate} disabled={!uploadedVideo || loading}>
                    {loading ? "Evaluating..." : "Evaluate"}
                </button>

                <div className="result-area">
                    {result}
                </div>
            </div>
        </div>
    );
};

export default Evaluate;