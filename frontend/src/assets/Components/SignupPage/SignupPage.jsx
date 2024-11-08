import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

export const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/api/auth/register', {
                username,
                password,
            });

            console.log('Signup successful:', response.data);
            navigate('/login');
        } catch (error) {
            if (error.response) {
                if (error.response.data && error.response.data.msg) {
                    setError(error.response.data.msg);
                } else {
                    setError(`HTTP error ${error.response.status}: ${error.response.statusText}`);
                }
            } else if (error.request) {
                setError('No response received from server.');
            } else {
                setError('Error setting up request: ' + error.message);
            }
            console.error('Signup failed:', error);
        }
    };

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    return (
        <div className="signup-page-container">
            <form onSubmit={handleSubmit}>
                <h2 className="signup-heading">Sign Up</h2>

                {error && <div className="error-message">{error}</div>}

                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>

                <button type="submit" className="signup-button">
                    Sign Up
                </button>

                <p className="login-link">
                    Already have an account?{' '}
                    <span onClick={() => navigate('/login')}>Login</span>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;