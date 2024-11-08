// frontend/src/assets/Components/History/History.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';
import { useNavigate } from 'react-router-dom';

export const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // Handle missing token (e.g., redirect to login)
                    navigate('/login');
                    return;
                }

                const response = await axios.get('/api/history', {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                setHistoryData(response.data);
            } catch (error) {
                console.error("Error fetching history:", error.response ? error.response.data : error);
                setError(error.response ? error.response.data.msg : "An error occurred fetching history.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);


    if (loading) {
        return <div className="history-container">Loading history...</div>;
    }

    if (error) {
        return <div className="history-container error-message">{error}</div>;
    }


    return (
        <div className="history-container">
            <h2>Deep Fake Detection History</h2>

            {historyData.length === 0 ? (
                <p>No history found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Video Uploaded</th>
                            <th>Accuracy</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <a href={item.cloudinaryUrl} target="_blank" rel="noopener noreferrer">
                                        {item.cloudinaryUrl} {/* Or display a more user-friendly name or description */}
                                    </a>
                                </td>
                                <td>{item.accuracy}%</td>
                                <td>{new Date(item.dateTime).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default History;