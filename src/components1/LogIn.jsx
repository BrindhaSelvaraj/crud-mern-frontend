import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import SidePanel from './SidePanel';
import './styles.css';

const LogIn = () => {
    const userRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        // Focus on the email input field when the component mounts
        userRef.current.focus();
    }, []);

    useEffect(() => {
        // Clear error message when email or password changes
        setErrMsg('');
    }, [email, password]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Send login request to the backend API
            const response = await axios.post(
                '/api/login',
                { email, password }, // Request body with email and password
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );
             window.localStorage.setItem("email",email)
            // If login is successful, navigate to the tasks page
            navigate('/tasks');
        } catch (error) {
            // Handle login error based on response status
            if (!error.response) {
                setErrMsg('No server response');
            } else if (error.response.status === 401) {
                setErrMsg('Invalid email or password');
            } else {
                setErrMsg('Login failed');
            }
        }
    };

    return (
        <>
            <header className='login-header'>
                <img src='/images/task.png' alt='logo' />
            </header>

            <main className='login-main'>
                <section className='main-section'>
                    <h1>Welcome to TaskHub</h1>
                    <p className='heading-paragraph'>Manage Tasks Effectively</p>
                    <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                    <h3 className='create-account-paragraph'>Log into your account</h3>
                    <div className='form-container'>
                        <form id='login-form' className='login-form' onSubmit={handleLogin}>
                            <input
                                type='email'
                                id='login-email'
                                ref={userRef}
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type='password'
                                id='login-pwd'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type='submit'>Log in</button>
                        </form>
                        <p>
                            Don't have an account? <Link to='/signup' className='login-span'>Sign up</Link>
                        </p>
                    </div>
                </section>
                <SidePanel />
            </main>
        </>
    );
};

export default LogIn;
