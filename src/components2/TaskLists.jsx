import { useState,useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CreateTask from "./CreateTask";
import Task from "./Task";
import './tasks.css'

const TaskList = () => {

    //the following refs are defined to assess the ref of the search and view filter.
    const searchRef = useRef();
    const viewRef = useRef();


    const [openCompleted, setOpenCompleted] = useState(false)
    const [openProgress, setOpenProgress] = useState(false)
    const [open, setOpen] = useState(false)
    const [taskType, setTaskType] = useState('')
    const [openSearch, setOpenSearch] = useState(false)
    const [input, setInput] = useState('')

    //this effect is called or defined to close the search or View filter  when open and when the user clicks elsewhere on the page.
    useEffect(() => {
        let handler = (e) => {
            if(!viewRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        let handler2 = (e) => {
            if(!searchRef.current.contains(e.target)) {
                setOpenSearch(false)
            }
        }

        document.addEventListener('mousedown', handler);
        document.addEventListener('mousedown', handler2);

        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('mousedown', handler2);
        }
    })

    //useSelector to access the user's tasks gotten from the backend on load and stored in redux
    let state = useSelector( state => state.project );

    //all tasks that are still in progress.. not yet completed
    const inProgress = state.tasks.filter( tasks => tasks.isDone === false )

    //all tasks that are completed 
    const completedTask = state.tasks.filter( tasks => tasks.isDone === true )

    //this function makes it possible to display all tasks in the screen both completed and incompleted.
    //when both completed and inprogress state are set to false every tasks is displayed and the TaskType is set to ALL TASKS
    const handleViewall = () => {
        setOpenCompleted(false)
        setOpenProgress(false)
        setTaskType(`All Tasks`)
        setInput('')
        setOpen(!open)
    }

    //This function makes it possible to view only the completed task.
    //when the openProgress is set to false and openCompleted is set to True, Task type is set to COMPLETED TASK
    const handleCompleted = () => {
        setOpenCompleted(true)
        setOpenProgress(false)
        setTaskType(`Completed Tasks`)
        setInput('')
        setOpen(!open)
    }

    //This function opens only incompleted task or task still in progress
    //it sets the opencompleted to false and openprogress to true then TaskType to PENDING TASKS
    const handleProgress = () => {
        setOpenProgress(true)
        setOpenCompleted(false)
        setTaskType(`Pending Tasks`)
        setInput('')
        setOpen(false)
    }


    //this function simply closes the search box.
    const handleSearch = e => {
        e.preventDefault()
        setOpenSearch(!openSearch)
    }

    //this function makes closes the search box if it's open when the users clicks on the View Filter 
    //this is done so that both boxes would not be open at same time.
    const openFilter = () => {
        setOpen(!open)
        setOpenSearch(false)
    }
    
    //this function closes the view filter box and opens the search box so that only one is open at a time.
    const search = () => {
        setOpenSearch(!openSearch)
        setOpen(false)
    }

    //this filter function is defined to match user's input with all tasks still in progress and displays them.
    //If empty, all tasks in progress are displayed.
    const inProgressFilter = inProgress.filter( item => {
        return input.toLowerCase() === "" ? item : item.title.toLowerCase().includes(input.toLowerCase()) || item.description.toLowerCase().includes(input.toLowerCase())
    })

    //same funciton as above but for completed tasks.
    const completeTaskFilter = completedTask.filter( item => {
        return input.toLowerCase() === "" ? item : item.title.toLowerCase().includes(input.toLowerCase()) || item.description.toLowerCase().includes(input.toLowerCase())
    })

    //same function as above but for all Tasks.
    const allTasks = state.tasks.filter( item => {
        return input.toLowerCase() === "" ? item : item.title.toLowerCase().includes(input.toLowerCase()) || item.description.toLowerCase().includes(input.toLowerCase())
    })

    //defining fontawesome icon used within this component
    const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />
    const caret = <FontAwesomeIcon icon={faChevronUp} />
    const caretDown = <FontAwesomeIcon icon={faChevronDown} />
    const day = new Date().toLocaleDateString();

    //defining the lenght of each units of tasks (in progress, completed or allTasks.. this is set together with the tasktype)
    const inP = inProgress.length
    const comP = completedTask.length
    const allT = state.tasks.length

    return (
        <>
            <div className='view-my-task'>
                        <h2>Tasks</h2>
                        <div className='user-info'>
                            <p>Completed({comP})</p>
                            <p>Pending({inP})</p>
                            <p>{day}</p>
                        </div>  
            </div>
            
            {/* here the createTask component is rendered */}
            <section className='view-action-tab'>
                <CreateTask progress={handleProgress}/>
                <div className='view-sorting-section'>

                    <div id='search' ref={searchRef}>
                    <p className="search-icon" onClick={search}>{searchIcon} </p>
                    { 
                    openSearch &&
                    <form className="search-task" onSubmit={handleSearch}>
                        <div className="search-bg"></div>
                        <input type="text" id='search' name='search' placeholder="search tasks by title or description" value={input} onChange={ e => setInput(e.target.value)} />
                        <button type='submit'>{searchIcon} Search</button>
                    </form>
                    }
                    </div>

                    <div id='sort' ref={viewRef}>
                    <p className='sort' onClick={openFilter} >View { open ? <span>{caret}</span> : <span>{caretDown}</span>}</p>

                    {/* when the filter view is open, the user have options on which type of tasks to view */}
                    { 
                    open &&
                    <div className="task-sortin-view" >
                        <p onClick={handleCompleted}>Completed Tasks</p>
                        <p onClick={handleProgress}>Task in progress</p>
                        <p onClick={handleViewall}>View all</p>
                    </div>
                    }
                    </div>
                </div>
            </section>

            {/* this section simply displays the type of task selected by user. Either all tasks or completed or pending tasks and it is matched the length of available tasks in that category */}
            <section className="task-sort-type">
                { taskType === `All Tasks` && <p>{taskType} ({allT}) </p> }
                { taskType === `Completed Tasks` && <p>{taskType} ({comP}) </p> }
                { taskType === `Pending Tasks` && <p>{taskType} ({inP}) </p> }
            </section>
            

                    {/* in this section, the tasklist is conditionally rendered to display a paragraph if nothing is found
                    and to map through the defined tasks above if not empty */}
            <div className="task-section-map">

                { 
                    (openCompleted && completedTask.length < 1) && <p className="empty-task">No completed project</p>     
                }
                {
                    (openCompleted && completedTask.length >= 1) && (completeTaskFilter.length < 1 ? <p className="empty-task">No Project title or description match found for <b>{input}</b></p> : completeTaskFilter.map( (tasks, i) => <Task {...tasks} key={i} />)) 
                }


                {   
                    (openProgress &&  inProgress.length < 1) && <p className="empty-task">No pending project or Task</p>     
                }
                {
                    (openProgress && inProgress.length >= 1) && (inProgressFilter.length < 1 ? <p className="empty-task">No Project title or description match found for <b>{input}</b></p> : inProgressFilter.map( (tasks, i) => tasks.title.length > 0 && <Task {...tasks} key={i}/>) ) 
                }


                {
                    (openProgress === false && openCompleted === false) && (state.tasks.length < 1) && <p className="empty-task">No pending project or Task</p>
                }
                {
                    (openProgress === false && openCompleted === false) && (state.tasks.length >= 1) && (allTasks < 1 ? <p className="empty-task">No Project title or description match found for <b>{input}</b></p> : allTasks.map( (tasks, i) => tasks.title.length > 0 && <Task {...tasks} key={i}/> ) ) 
                }    
                    
            </div>
        </>
    )
}

export default TaskList;