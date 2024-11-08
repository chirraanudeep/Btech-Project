import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password,
            });

            localStorage.setItem('token', response.data.token);
            console.log("Login Successful:", response.data);
            navigate('/home');

        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data.msg : error.message);
            setError(error.response ? error.response.data.msg : "An error occurred during login.");
        }
    };

    const handleUsernameChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    return (
        <div className="login-page-container">
            <form onSubmit={handleSubmit}>
                <h2 className="login-heading">Login</h2>

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

                <button type="submit" className="login-button">
                    Login
                </button>

                <p className="signup-link">
                    If you want to create an new account{' '}
                    <span onClick={() => navigate('/signup')}>Sign Up</span>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;