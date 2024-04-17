import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from '../api/axios'
import Slides from './Slides'
import './home.css'


const Home = () => {

    const [user1, setUser1] = useState('')

    //useSelector to access the user's name dispatched to redux store when the user log's in to the app
    let state = useSelector( state => state.user )

    //useEffect to set the user's name when the home component loads in the browser.
    useEffect(() => {
        setUser1(state.name)
    },[])

    //api call to logout the user from the home page
    axios.defaults.withCredentials = true
    const handleLogout = () => {
        axios.get('/api/logout')
        .then( res => window.location.reload(true))
        .catch( err => console.error(err))
    }

    /** user1 is the username gotten from the redux store. If it exits, that means the user has an account and is logged in.
    If the user1 doesn't exist then the user will have the option to login or create an account in the homepage.
    The slides created in the Slides component is rendered here **/
    
    return(
        <>
            <main className='homePage'>
                <header className='home-header'>
                    <h1>TaskHub</h1>
                    
                        {
                            user1 ?
                            <nav>
                                <p>{user1}</p>
                                <div><Link to='/tasks' className='home-nav blink'>Go to Projects/Tasks</Link></div>
                                <div onClick={handleLogout} className='home-nav'>Logout</div>
                            </nav> :
                            <nav>
                                <div><Link to='/signup' className='home-nav'>Create a free account</Link></div>
                                <div><Link to='/tasks' className='home-nav'>Create Projects/Tasks</Link></div>
                                <div><Link to='/login' className='home-nav'>Login</Link></div>
                            </nav>
                        }
                        
                </header>

                <main>
                    <Slides />
                    <section className='home-section-2'>
                        <p>Prioritize and Plan</p>
                        <h2>Keep focus on your priorities</h2>
                        <p>Plan with ease knowing you have visibility into your project details and how they align to your daily goals. Never loose sight of what's important.</p>
                        <h3>Accelerate your productivity with task management.</h3>
                        <div><Link to='/signup' className='home-nav getStarted'>{ user1 ? 'Go to Tasks' : 'Get Started'}</Link></div>
                    </section>

                    <section className='getStarted-btn'>
                        <div><Link to='/signup' className='home-nav-desktop getStarted'>{ user1 ? 'Go to Tasks' : 'Get Started'}</Link></div>
                    </section>

                </main>
            </main>
        </>
    )
}

export default Home