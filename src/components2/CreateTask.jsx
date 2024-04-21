import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { getTask } from '../redux/action/action';

const CreateTask = ({progress}) => {

    const dispatch = useDispatch();

    const [create, setCreate] = useState(false) 
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [time, setTime] = useState('')
    

    //this function submits the new task created and sends it to the backend
    /** upon successful submission, the response is gotten and dispatched to redux store 
     where it can be easily accessed and used in the tasklist component. 
     the setCreate, toggles the visibility of the create task box **/
    //the progress prop passed is a function which is called from the tasklist component where the CreateTask is been rendered.
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch('/api/tasks',
                JSON.stringify({
                    title: title,
                    description: description,
                    deadline: deadline + ", " + time,
                    isDone: false,
                    email:window.localStorage.getItem("email")
                }), 
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            dispatch(getTask(response.data.tasks))
            progress()
        }
        catch (error) {
            console.log(error)
        }

        setCreate(!create)
    }

    const openCreateTask = () => {
        setCreate(!create)
    }


    return(
        <>
            <p className='create' onClick={openCreateTask}> + Create New Task</p>
                { 
                    create && 
                    <>
                        <section className='create-task'>
                            <div className='creat-task-top'>
                                <h2>Create New Task</h2>
                                <p onClick={openCreateTask}>X</p>
                            </div>
                            <form onSubmit={handleSubmit} className='create-task-form'>
                                <label htmlFor='title'>Title</label>
                                <input type='text' id='title' name='title' onChange={ e => setTitle( e.target.value )} placeholder='Give your task a title' required/>
                                <label htmlFor='description'>Task Description</label>
                                <textarea id='description' name='description' onChange={ e => setDescription( e.target.value )} placeholder='You may optionally add a short descriptoin of your task/project'></textarea>
                                <label htmlFor='deadline'>Select Deadline
                                    <div className='deadline'>
                                        <input type='date' id='deadline' name='deadline' onChange={ e => setDeadline( e.target.value )} required />
                                        <input type='time' id='time' name='time' onChange={ e => setTime( e.target.value )} required/>
                                    </div>
                                </label>
                                <button type='submit' >Create Task</button>
                            </form>
                        </section>
                    </>
                }
        </>
    )
}

export default CreateTask