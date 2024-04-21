import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CreateTask from "./CreateTask";
import Task from "./Task";
import './tasks.css';

const TaskList = () => {
    const searchRef = useRef();
    const viewRef = useRef();

    const [openCompleted, setOpenCompleted] = useState(false);
    const [openProgress, setOpenProgress] = useState(false);
    const [open, setOpen] = useState(false);
    const [taskType, setTaskType] = useState('');
    const [openSearch, setOpenSearch] = useState(false);
    const [input, setInput] = useState('');

    const state = useSelector(state => state.project);
    const tasks = state ? state.tasks || [] : [];

    const inProgress = tasks.filter(task => !task.isDone);
    const completedTask = tasks.filter(task => task.isDone);

    const allTasks = tasks.filter(task =>
        input === "" ||
        task.title.toLowerCase().includes(input.toLowerCase()) ||
        task.description.toLowerCase().includes(input.toLowerCase())
    );

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!viewRef.current.contains(e.target)) {
                setOpen(false);
            }
            if (!searchRef.current.contains(e.target)) {
                setOpenSearch(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleViewall = () => {
        setOpenCompleted(false);
        setOpenProgress(false);
        setTaskType(`All Tasks`);
        setInput('');
        setOpen(!open);
    };

    const handleCompleted = () => {
        setOpenCompleted(true);
        setOpenProgress(false);
        setTaskType(`Completed Tasks`);
        setInput('');
        setOpen(!open);
    };

    const handleProgress = () => {
        setOpenProgress(true);
        setOpenCompleted(false);
        setTaskType(`Pending Tasks`);
        setInput('');
        setOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setOpenSearch(!openSearch);
    };

    const openFilter = () => {
        setOpen(!open);
        setOpenSearch(false);
    };

    const search = () => {
        setOpenSearch(!openSearch);
        setOpen(false);
    };

    return (
        <>
            <div className='view-my-task'>
                <h2>Tasks</h2>
                <div className='user-info'>
                    <p>Completed ({completedTask.length})</p>
                    <p>Pending ({inProgress.length})</p>
                    <p>{new Date().toLocaleDateString()}</p>
                </div>
            </div>

            <section className='view-action-tab'>
                <CreateTask progress={handleProgress} />
                <div className='view-sorting-section'>
                    <div id='search' ref={searchRef}>
                        <p className="search-icon" onClick={search}><FontAwesomeIcon icon={faMagnifyingGlass} /></p>
                        {openSearch &&
                            <form className="search-task" onSubmit={handleSearch}>
                                <div className="search-bg"></div>
                                <input type="text" id='search' name='search' placeholder="Search tasks by title or description" value={input} onChange={e => setInput(e.target.value)} />
                                <button type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /> Search</button>
                            </form>
                        }
                    </div>

                    <div id='sort' ref={viewRef}>
                        <p className='sort' onClick={openFilter}>View {open ? <span><FontAwesomeIcon icon={faChevronUp} /></span> : <span><FontAwesomeIcon icon={faChevronDown} /></span>}</p>
                        {open &&
                            <div className="task-sortin-view">
                                <p onClick={handleCompleted}>Completed Tasks</p>
                                <p onClick={handleProgress}>Tasks in Progress</p>
                                <p onClick={handleViewall}>View All</p>
                            </div>
                        }
                    </div>
                </div>
            </section>

            <section className="task-sort-type">
                {taskType === `All Tasks` && <p>{taskType} ({tasks.length})</p>}
                {taskType === `Completed Tasks` && <p>{taskType} ({completedTask.length})</p>}
                {taskType === `Pending Tasks` && <p>{taskType} ({inProgress.length})</p>}
            </section>

            <div className="task-section-map">
                {(openCompleted && completedTask.length < 1) && <p className="empty-task">No completed projects</p>}
                {(openCompleted && completedTask.length >= 1) &&
                    (allTasks.length < 1 ?
                        <p className="empty-task">No project title or description matches found for <b>{input}</b></p> :
                        completedTask.map((task, index) => <Task key={index} {...task} />)
                    )
                }

                {(openProgress && inProgress.length < 1) && <p className="empty-task">No pending projects or tasks</p>}
                {(openProgress && inProgress.length >= 1) &&
                    (allTasks.length < 1 ?
                        <p className="empty-task">No project title or description matches found for <b>{input}</b></p> :
                        inProgress.map((task, index) => <Task key={index} {...task} />)
                    )
                }

                {!openCompleted && !openProgress && tasks.length < 1 &&
                    <p className="empty-task">No pending projects or tasks</p>
                }
                {!openCompleted && !openProgress && tasks.length >= 1 &&
                    (allTasks.length < 1 ?
                        <p className="empty-task">No project title or description matches found for <b>{input}</b></p> :
                        allTasks.map((task, index) => <Task key={index} {...task} />)
                    )
                }
            </div>
        </>
    );
};

export default TaskList;
