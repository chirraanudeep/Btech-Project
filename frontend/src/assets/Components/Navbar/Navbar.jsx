// Navbar.jsx
import { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [menu, setMenu] = useState('home');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const currentPath = location.pathname;
        switch (currentPath) {
            case '/home':
                setMenu('home');
                break;
            case '/evaluate':
                setMenu('evaluate');
                break;
            case '/history':
                setMenu('history');
                break;
            case '/contactus':
                setMenu('contactus');
                break;
            default:
                setMenu('home');
                break;
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setMenu('home');
        navigate('/home');
    };

    return (
        <>
            <div className='navbar'>
                <div className='nav-left'>
                    <img className='logoImg' src="./logo.jpg" alt="logo" />
                </div>

                <div className='nav-right-section'>
                    <ul className='nav-right'>
                        <li className='n1' onClick={() => setMenu('home')}>
                            <Link style={{ textDecoration: 'none' }} to='/home'>Home</Link>
                            {menu === 'home' ? <hr /> : <></>}
                        </li>
                        <li className='n1' onClick={() => setMenu('evaluate')}>
                            <Link style={{ textDecoration: 'none' }} to='/evaluate'>Evaluate</Link>
                            {menu === 'evaluate' ? <hr /> : <></>}
                        </li>
                        <li className='n1' onClick={() => setMenu('history')}>
                            <Link style={{ textDecoration: 'none' }} to='/history'>History</Link>
                            {menu === 'history' ? <hr /> : <></>}
                        </li>
                        <li className='n1' onClick={() => setMenu('contactus')}>
                            <Link style={{ textDecoration: 'none' }} to='/contactus'>Contact Us</Link>
                            {menu === 'contactus' ? <hr /> : <></>}
                        </li>
                        <div className='login'>
                            {localStorage.getItem('token') ? (
                                <button onClick={handleLogout} className='button'>Logout</button>
                            ) : (
                                <>
                                    <Link to="/login" style={{ textDecoration: 'none' }}>
                                        <button className='button'>Login</button>
                                    </Link>
                                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                                        <button className='button'>Signup</button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
};