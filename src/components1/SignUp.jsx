import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from '../api/axios';
import SidePanel from './SidePanel'
// import './styles.css'

//The following regex are defined for the various relevant fields USERNAME, USEREMAIL AND PASSWORD
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const SignUp = () => {

    const userNameRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    //in the following state declaration the initial value is captured, the validity is set and the focus is also defined.
    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [userEmail, setUserEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
    const [pwdVisibility, setPwdVisibility] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    //to set the focus of the input in the userName input fields.
    //the ref is assigned in the userName input field.
    useEffect(() => {
        userNameRef.current.focus();
    }, [])

    /** this hook is called when the userName is triggered in the user name input fields 
    and it instantly checks if the entry is valid based on the REGEX defined **/
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    /** this is called when the email field is filled and it checks it match with the REGEX
     defined above for the email field **/
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(userEmail));
    }, [userEmail])

    /** This checks the password match with the initial password entered in the first password field  **/
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd)
    }, [pwd, matchPwd])

    //this set an error message should incase there's any 
    useEffect(() => {
        setErrMsg('')
    }, [user, userEmail, pwd, matchPwd])

    //this function is called to toggle the visiblity of the password entered by user's
    const handleVisiblePwd = () => {
        setPwdVisibility(!pwdVisibility)
    }


    /** this function submits the user's details to the backend using axios and upon successful registration, 
    the user is navigated to the login page **/
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/signup',
                JSON.stringify({
                    userName: user,
                    email: userEmail,
                    password: pwd
                }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );

            console.log(response.data)
            console.log(JSON.stringify(response))

            navigate('/login')
        }
        catch (error) {
            if (!error?.response) {
                setErrMsg('No server response')
            } else if (error?.response.status === 400) {
                setErrMsg('Email not availabe, try another')
            } else {
                setErrMsg('Registration failed')
            }
            errRef.current.focus();
        }
    }

    //fontawesome Icon for eye used in the password field visibility
    const openEye = <FontAwesomeIcon icon={faEye} />
    const closeEye = <FontAwesomeIcon icon={faEyeSlash} />

    return (
        <>
        <header className='login-header'>
                <img src='/images/task.png' alt='logo'/>
        </header>

        <main className='login-main'>

            <section className='main-section sign-up'>
                <h1>Welcome to TaskHub</h1>
                <p className='heading-paragraph'>Manange Task effectively</p>

                <p ref={errRef} className={ errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>

                <h3 className='create-account-paragraph'>Create your free account</h3>

                <div className='form-container'>
                    <form id='login-form' className='login-form' onSubmit={handleSubmit}>

                        <input type='text' id={validName ? 'username' : !validName && user  ? 'no-username' : 'iduser'} ref={userNameRef} placeholder='Choose a username' value={user} onChange={ e => setUser(e.target.value)} onFocus={ () => setUserFocus(true)} onBlur={() => setUserFocus(false)} autoComplete='off' required/>
                        <p className={ !validName && user && userFocus ? 'input-description' : 'offscreen'}>
                            Username may be 4 to 32 characters & must begin with a letter <br/>
                            Letters, numbers, underscore, hypens allowed.
                        </p>

                        <input type='email' id={validEmail ? 'usermail' : !validEmail && userEmail  ? 'no-usermail' : 'idemail'} value={userEmail} onChange={ e => setUserEmail(e.target.value)} placeholder='Email' required/>
                    
                        <input type={ !pwdVisibility ? 'password' : 'text'} id={validPwd ? 'userpwd' : !validPwd && pwd  ? 'no-userpwd' : 'idpwd'} value={pwd} onChange={ e => setPwd(e.target.value)} placeholder='Password' onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} required/>
                        <p className={ !validPwd && pwd && pwdFocus ? 'input-description' : 'offscreen'}>
                            Password should be 8 to 24 characters.<br />
                            Must include at leat one uppercase, one lowercase and a number.
                        </p>

                        <input type={ !pwdVisibility ? 'password' : 'text'} id={ validMatch && matchPwd ? 'usermatch' : !validMatch && matchPwd  ? 'no-matchpwd' : 'idmatch'} placeholder='Confirm Password' value={matchPwd} onChange={e => setMatchPwd(e.target.value)} onFocus={ () => setMatchFocus(true) } onBlur={ () => setMatchFocus(false) } required/>
                        <p className={ !validMatch && matchFocus ? 'input-description' : 'offscreen'}>
                            Must match the first password
                        </p>
                        {   
                            pwd &&
                            (
                                !pwdVisibility ?
                                <p onClick={handleVisiblePwd} className='eyeclass'>{closeEye} Click to view password </p> : 
                                <p onClick={handleVisiblePwd} className='eyeclass'>{openEye} Click to hide password </p>
                            )
                        }

                        <button type='submit'>Create Account</button>

                    </form>

                    <p>Already have an account? <Link to='/login' className='login-span'>Sign in</Link></p>

                </div>
            </section>
            
            <SidePanel />
        
        </main>
        </>
    )
}

export default SignUp