import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRotate, faChevronUp, faChevronDown  } from '@fortawesome/free-solid-svg-icons';
import { editTask, updateTask, deleteTask } from '../redux/action/action';

import axios from '../api/axios';
import './tasks.css'


//the Task component is also rendered in the Tasklist component where it receives it destructured props 
const Task = ({_id, title, description, deadline, isDone}) => {

    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editDeadline, setEditDeadline] = useState('')
    const [editTime, setEditTime] = useState('')
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const dispatch = useDispatch()

    //this function handles the edited tasks, submits it to the backend and if successful dispatches it to the redux store.
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.patch('api/tasks/edit',
                JSON.stringify({
                    _id,
                    title: editTitle,
                    description: editDescription,
                    deadline: editDeadline + ", " + editTime,
                    isDone: false,
                    email:window.localStorage.getItem("email")
                }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true,
                }
            )
            dispatch(editTask({
                _id: _id,
                title: editTitle,
                description: editDescription,
                deadline: editDeadline + ", " + editTime,
                isDone: false,
                email:window.localStorage.getItem("email")
            }))
        }
        catch (error){
            console.log(error)
        }

        setOpen(!open)
    }


    //this function handles the status update, the submits it to the backend and dispatches it to the Redux store.
    const handleUpdateStatus = async () => {
        
        try{
            const response = await axios.patch('http://localhost:5000/api/tasks/status',
                JSON.stringify({
                    _id,
                    isDone: !isDone,
                    email:window.localStorage.getItem("email")
                }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true,
                }
            )
            dispatch(updateTask({
                _id: _id,
                title,
                description,
                deadline,
                isDone: !isDone,
                email:window.localStorage.getItem("email"),
                
            }))
        }
        catch (error){
            console.log(error)
        }
        window.location.reload();
    }

    
    //this function handles deleting of tasks, it sends it to the backend and updates the redux store.
    const handleDeleteTask = async () => {
        try {
            const response = await axios.patch('http://localhost:5000/api/tasks/delete', 
                JSON.stringify({
                    title,
                    description,
                    deadline,
                    isDone,
                    _id,
                    email:window.localStorage.getItem("email")
                }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true,
                }
            );

            dispatch(deleteTask({
                _id: _id,
                title,
                description,
                deadline,
                isDone,
                email:window.localStorage.getItem("email")
            }))

        } catch (error) {
            console.log(error)
        }        

        setOpenDelete(!openDelete)
        window.location.reload();
    }

    //sets the title and description of the current task in the edit task inputs.
    const handleClick = () => {
        setEditTitle(title)
        setEditDescription(description)
        setOpen(!open)
    }

//fontawesome Icon used in the task display like trash, caret up and caret down
const trash = <FontAwesomeIcon icon={faTrash} />
const rotate = <FontAwesomeIcon icon={faRotate} />
const caret = <FontAwesomeIcon icon={faChevronUp} />
const caretDown = <FontAwesomeIcon icon={faChevronDown} />

    return (
        <>            
            <section className='task-section'>
                <div className='task-title-display'>
                    <h2 onClick={ () => setOpenDetails(!openDetails)}> { openDetails ? <span>{caret}</span> : <span>{caretDown}</span>} {title}</h2>
                    <p className={`${ isDone === true ? 'green' : 'normal'}`}><span>{rotate}</span> <span onClick={() => setOpenDelete(!openDelete)} className={`${ isDone === true ? 'task-trash' : 'task-trash2'}`}>{trash}</span></p>
                    
                    {/* when the delete icon is clicked, the delete promps opens */}

                    { openDelete &&
                        <div className='delete-prompt'>
                            <h3>-- {title} --</h3>
                            <p>Are you sure you want to delete this task? <br/>Note, this action cannot be undone</p>
                            <div className='delete-buttons'>
                                <div className='delete-task' onClick={handleDeleteTask}>Delete</div>
                                <div className='delete-cancel' onClick={() => setOpenDelete(!openDelete)}>Cancel</div>
                            </div>
                        </div>
                    }

                </div>

                {/* when the task title is clicked, the task destails such as description and status are made visible */}

                { 
                openDetails &&
                <div className='task-details-display'>
                    <p>{description}</p>
                    <div className='edit-task-button-repositioned'>
                        <p>Deadline: {deadline} - {isDone === false && <span>in progress - </span>} </p>
                        <div className='updateStatus-editTask' >
                            <div className={`${ isDone === true ? 'update2' : 'update'}`} onClick={handleUpdateStatus}>Update Status?</div>
                            { open === false && <div onClick={handleClick} className='edit-task-button2'>Edit Task</div>}
                        </div>
                    </div>
                </div>
                }

                {/* whend the edit button is clicked, the edit task field is set to be visible */}
                { open &&
                    <section className='edit-task-section'>
                        <form className='edit-task-form' onSubmit={handleEditSubmit}>
                            <input type='text' id='edit-title' name='edit-title' value={editTitle} onChange={ e => setEditTitle(e.target.value)} />
                            <textarea id='edit-description' name='edit-description' value={editDescription} onChange={ e => setEditDescription(e.target.value)} ></textarea>
                            <div className='edit-task2'>
                                <div className='edit-date'>
                                    <input type='date' id='edit-date' name='edit-date' onChange={ e => setEditDeadline(e.target.value)} required/>
                                    <input type='time' id='edit-time' name='edit-time' onChange={ e => setEditTime(e.target.value)} required/>
                                </div>
                                <button type='submit'>Save Changes</button>
                                <div onClick={ () => setOpen(!open)} className='edit-task-button discard'>Close</div>
                            </div>
                        </form>
                    </section>
                }
            </section>
        </>
    )
}

export default Task;