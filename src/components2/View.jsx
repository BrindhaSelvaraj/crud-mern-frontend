import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTask, userName1 } from '../redux/action/action';
import axios from '../api/axios';
import TaskList from './TaskLists';
import './tasks.css';

const View = () => {
    const [user, setUser] = useState('');
    const [userLength, setUserLength] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks',{params:{email:window.localStorage.getItem("email")}});
                console.log('API Response:', response);

                if (!response.data || typeof response.data.userName !== 'string' || !Array.isArray(response.data.tasks)) {
                    console.error('Invalid response from API:', response.data);
                    throw new Error('Invalid response or missing data from API');
                }

                const { userName, tasks } = response.data;
                setUser(userName);
                setUserLength(tasks.length);
                dispatch(getTask(tasks));
                dispatch(userName1(userName));
            } catch (error) {
                console.error('Error fetching data from API:', error.message);
                handleFetchError('Error fetching data from API');
            }
        };

        fetchData();
    }, [dispatch]);

    const handleFetchError = (errorMessage) => {
        console.error(errorMessage);
        setUser('');
        setUserLength(0);
        // Additional error handling logic can be added here, like displaying an error message
    };

    const handleLogout = async () => {
        try {
            await axios.get('/api/logout');
            window.location.reload(true); // Reload page after logout
        } catch (error) {
            console.error('Error logging out:', error.message);
            // Handle logout error
        }
    };

    // Function to create a new task (dummy example)
    const createTask = async () => {
        try {
            // Simulated new task creation request
            const newTask = { name: 'New Task', completed: false };
            // Send POST request to create task
            const response = await axios.post('/api/tasks', newTask);

            // Assuming the API responds with updated task list
            const updatedTasks = response.data.tasks;
            dispatch(getTask(updatedTasks)); // Update Redux store with new tasks
            setUserLength(updatedTasks.length); // Update user task length
        } catch (error) {
            console.error('Error creating task:', error.message);
            // Handle task creation error
            // Example: Display an error toast/message
        }
    };

    const initial = user ? user.charAt(0) : '';

    return (
        <div className='viewAction'>
            <header className='view-header'>
                <img src='/images/task.png' alt='logo' />
            </header>
            <main className='view-main'>
                <div className='user-actions'>
                    <div className='user-props'>
                        <p>{initial}</p>
                        <p>
                            {window.localStorage.getItem("email")},{' '}
                            <span className='user-note'>
                                {userLength > 0
                                    ? 'completing tasks you set for yourself is a great way to end your day'
                                    : 'Create a task, plan ahead and get it done'}
                            </span>
                        </p>
                    </div>
                    <div className='home-logout'>
                        <p className='view-home'>
                            <Link to='/' className='link'>
                                Home
                            </Link>
                        </p>
                        <div className='logout' >
                            <Link to='/login' clasname='link'>
                            Logout
                            </Link>
                        </div>
                    </div>
                </div>
                <section>
                    
                    <TaskList /> {/* Display tasks from Redux store */}
                </section>
            </main>
            <footer>
                <p>"Plans are only good intentions unless they immediately degenerate into hard work." ~ Peter Drucker</p>
            </footer>
        </div>
    );
};

export default View;

