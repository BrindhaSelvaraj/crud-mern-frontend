import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios'; // Assuming axios is imported correctly
import SidePanel from './SidePanel';

// Regular expressions
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const SignUp = () => {
    const userNameRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdVisibility, setPwdVisibility] = useState(false);
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(userEmail));
    }, [userEmail]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    const handleVisiblePwd = () => {
        setPwdVisibility(!pwdVisibility);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading indicator on form submission
        try {
            const response = await axios.post(
                '/api/signup',
                {
                    userName: user,
                    email: userEmail,
                    password: pwd
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response.data);
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            if (!error.response) {
                setErrMsg('No server response');
            } else if (error.response.status === 400) {
                setErrMsg('Email not available, try another');
            } else {
                setErrMsg('Registration failed');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        } finally {
            setLoading(false); // Stop loading indicator after signup attempt (success or error)
        }
    };

    const openEye = <FontAwesomeIcon icon={faEye} />;
    const closeEye = <FontAwesomeIcon icon={faEyeSlash} />;

    return (
        <>
            <header className='login-header'>
                <img src='/images/task.png' alt='logo'/>
            </header>

            <main className='login-main'>

                <section className='main-section sign-up'>
                    <h1>Welcome to TaskHub</h1>
                    <p className='heading-paragraph'>Manage Tasks effectively</p>

                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>

                    <h3 className='create-account-paragraph'>Create your free account</h3>

                    <div className='form-container'>
                        <form id='login-form' className='login-form' onSubmit={handleSubmit}>

                            {/* Username input */}
                            <input
                                type='text'
                                id={validName ? 'username' : !validName && user ? 'no-username' : 'iduser'}
                                ref={userNameRef}
                                placeholder='Choose a username'
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                autoComplete='off'
                                required
                            />
                            {/* Username input description */}
                            <p className={!validName && user ? 'input-description' : 'offscreen'}>
                                Username may be 4 to 32 characters & must begin with a letter <br/>
                                Letters, numbers, underscore, hyphens allowed.
                            </p>

                            {/* Email input */}
                            <input
                                type='email'
                                id={validEmail ? 'usermail' : !validEmail && userEmail ? 'no-usermail' : 'idemail'}
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder='Email'
                                required
                            />
                    
                            {/* Password input */}
                            <input
                                type={pwdVisibility ? 'text' : 'password'}
                                id={validPwd ? 'userpwd' : !validPwd && pwd ? 'no-userpwd' : 'idpwd'}
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                placeholder='Password'
                                required
                            />
                            {/* Password input description */}
                            <p className={!validPwd && pwd ? 'input-description' : 'offscreen'}>
                                Password should be 8 to 24 characters.<br />
                                Must include at least one uppercase, one lowercase, and a number.
                            </p>

                            {/* Confirm Password input */}
                            <input
                                type={pwdVisibility ? 'text' : 'password'}
                                id={validMatch && matchPwd ? 'usermatch' : !validMatch && matchPwd ? 'no-matchpwd' : 'idmatch'}
                                placeholder='Confirm Password'
                                value={matchPwd}
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                            />
                            {/* Confirm Password input description */}
                            <p className={!validMatch && matchPwd ? 'input-description' : 'offscreen'}>
                                Must match the first password
                            </p>
                            
                            {/* Toggle password visibility button */}
                            {pwd &&
                            (
                                !pwdVisibility ?
                                <p onClick={handleVisiblePwd} className='eyeclass'>{closeEye} Click to view password </p> : 
                                <p onClick={handleVisiblePwd} className='eyeclass'>{openEye} Click to hide password </p>
                            )}

                            {/* Submit button with loading indicator */}
                            <button type='submit'>{loading ? 'Creating Account...' : 'Create Account'}</button>

                        </form>

                        <p>Already have an account? <Link to='/login' className='login-span'>Sign in</Link></p>

                    </div>
                </section>
                
                <SidePanel />
            
            </main>
        </>
    );
};

export default SignUp;
