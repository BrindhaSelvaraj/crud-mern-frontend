import { useEffect, useState } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import axios from '../api/axios';

const PrivateRoute = () => {

    const [auth, setAuth] = useState(true);

    //this private routes hides the tasks page from user's who are not registered and not logged in.
    //upon successful login, the task page is loaded else the user is navigated to the login page.
    axios.defaults.withCredentials = true
    useEffect(() => {
        axios.get('/api/tasks')
        .then( res => {
            if (res.data !== 'not-token') {
                setAuth(<Outlet/>)
            } else {
                setAuth(<Navigate to='/login' />)
            }
        })
        .catch( err =>{ 
            console.error(err)
            setAuth(<Navigate to='/login' />)
        })
    }, [])

    return (
         auth 
    )
}

export default PrivateRoute