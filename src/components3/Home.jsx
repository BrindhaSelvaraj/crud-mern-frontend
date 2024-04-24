import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../api/axios';
import Slides from './Slides';
import './home.css';

const Home = () => {
    const [user1, setUser1] = useState('');

    // useSelector to access the user's name dispatched to redux store when the user logs in to the app
    const state = useSelector(state => state.user);

    // useEffect to set the user's name when the home component loads in the browser.
    useEffect(() => {
        if (state?.name) {
            setUser1(state.name);
        }
    }, [state?.name]); // Update user1 whenever state.name changes

    // API call to logout the user from the home page
    useEffect(() => {
        axios.defaults.withCredentials = true;
    }, []); // Set axios configuration on component mount

    const handleLogout = () => {
        axios.get('/api/logout')
            .then(res => window.location.reload(true))
            .catch(err => console.error(err));
    };

    return (
        <main className="homePage">
            <header className="home-header">
                <h1>TaskHub</h1>
                <nav>
                    {user1 ? (
                        <>
                            <p>{user1}</p>
                            <div>
                                <Link to="/tasks" className="home-nav blink">
                                    Go to Projects/Tasks
                                </Link>
                            </div>
                            <div onClick={handleLogout} className="home-nav">
                                Logout
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <Link to="/signup" className="home-nav">
                                    Create a free account
                                </Link>
                            </div>
                            
                            <div>
                                <Link to="/login" className="home-nav">
                                    Login
                                </Link>
                            </div>
                        </>
                    )}
                </nav>
            </header>
            <main>
                <Slides />
                <section className="home-section-2">
                    <p>Prioritize and Plan</p>
                    <h2>Keep focus on your priorities</h2>
                    <p>
                        Plan with ease knowing you have visibility into your
                        project details and how they align to your daily
                        goals. Never lose sight of what's important.
                    </p>
                    <h3>Accelerate your productivity with task management.</h3>
                    <div>
                        <Link to="/signup" className="home-nav getStarted">
                            {user1 ? 'Go to Tasks' : 'Get Started'}
                        </Link>
                    </div>
                </section>
                <section className="getStarted-btn">
                    <div>
                        <Link
                            to="/signup"
                            className="home-nav-desktop getStarted"
                        >
                            {user1 ? 'Go to Tasks' : 'Get Started'}
                        </Link>
                    </div>
                </section>
            </main>
        </main>
    );
};


export default Home;
