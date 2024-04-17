import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTask, userName1 } from '../redux/action/action';
import axios from '../api/axios';
import TaskList from './TaskLists';
import './tasks.css'

//in this component, the tasklist is being rendered.
//This View component is a child component to the protected Route.
//when this component loads, it means there have been a successful login and an api call gets the user's details from the backend and dispatches them to the redux store.
const View = () => {

    const [user, setUser] = useState('')
    const [userLength, setUserLength] = useState(0)
    const dispatch = useDispatch()

    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('/api/tasks')
        .then( res => {
            console.log(res.data)
            setUser(res.data.userName)
            setUserLength(res.data.tasks.length)
            dispatch(getTask(
                res.data.tasks
            ))
            dispatch(userName1(
                res.data.userName
            ))
        })
        .catch( err =>{ 
            console.error(err)
        })
    }, [])


    //this function logs out the user on click
    const handleLogout = () => {
        axios.get('/api/logout')
        .then( res => window.location.reload(true))
        .catch( err => console.error(err))
    }

    const initial = user[0]

    return (
        <>
            <main className='viewAction'>
                <div className='view-bg2'></div>
                <div className='view-bg1'></div>
                <header className='view-header'>
                    <img src='/images/task.png' alt='logo'/>
                </header>
                <main className='view-main'>
                    <div className='user-actions'>
                        <div className='user-props'>
                            <p>{initial} </p>
                            <p>{user}, <span className='user-note'>{userLength > 1 ? 'completing tasks you set for yourself is a great way to end your day' : 'Create a task, plan ahead and get it done' }</span> </p>
                        </div>
                        <div className='home-logout'>
                            <p className='view-home'><Link to='/' className='link'>Home</Link></p>
                            <div className='logout' onClick={handleLogout}>Logout</div>
                        </div>
                    </div>
        
                    <section>
                        <TaskList />
                    </section>
                    
                </main>
                <footer>
                        <p>Tough times never last, but tough people do. </p>
                </footer>
            </main>
        </>
    )
}

export default View;